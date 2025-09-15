"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, REFRESH_TOKEN, VERIFY_TOKEN } from '@/lib/graphql/mutations';

interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  is_admin: boolean;
  date_joined: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [loginMutation] = useMutation(LOGIN_USER);
  const [refreshTokenMutation] = useMutation(REFRESH_TOKEN);
  const [verifyTokenMutation] = useMutation(VERIFY_TOKEN);

  const isAuthenticated = !!user;
  const isAdmin = user?.is_admin || false;

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const { data } = await verifyTokenMutation({
            variables: { token }
          });
          
          if (data?.verifyToken?.payload) {
            // Token is valid, but we need to get user data
            // For now, we'll just set a basic user object
            // In a real app, you'd fetch the user data from the token payload
            setUser({
              id: data.verifyToken.payload.user_id,
              username: data.verifyToken.payload.username,
              email: data.verifyToken.payload.email,
              first_name: data.verifyToken.payload.first_name || '',
              last_name: data.verifyToken.payload.last_name || '',
              phone: data.verifyToken.payload.phone || '',
              is_admin: data.verifyToken.payload.is_admin || false,
              date_joined: data.verifyToken.payload.date_joined || '',
            });
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [verifyTokenMutation]);

  const login = async (usernameOrEmail: string, password: string) => {
    try {
      const { data } = await loginMutation({
        variables: { usernameOrEmail, password }
      });

      if (data?.loginUser?.success && data?.loginUser?.payload) {
        const { token, refreshToken, user } = data.loginUser.payload;

        localStorage.setItem('access_token', token);
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken);
        }

        // Map backend camelCase user to our context's snake_case User interface
        const mappedUser: User = {
          id: user.id,
          username: user.username,
          email: user.email,
          first_name: user.firstName ?? '',
          last_name: user.lastName ?? '',
          phone: user.phone ?? '',
          is_admin: user.isAdmin ?? false,
          date_joined: user.dateJoined ?? ''
        };
        setUser(mappedUser);

        return { success: true, message: data.loginUser.message };
      } else {
        return { success: false, message: data?.loginUser?.message || 'Login failed' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

