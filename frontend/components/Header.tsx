"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, User, LogOut, Settings } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/content/about" },
    { name: "Karate Adventures", href: "/content/karate-adventures" },
    { name: "Dojo Locations", href: "/content/dojo-locations" },
    { name: "Instructors", href: "/content/instructors" },
    { name: "Events", href: "/activities/events" },
    { name: "News", href: "/activities/news" },
    { name: "Gallery", href: "/content/gallery" },
    { name: "Contact Us", href: "/content/contact" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-12 h-12 bg-hdki-red border-2 border-hdki-red flex items-center justify-center">
                <span className="text-white font-bold text-lg tracking-tight">
                  HD<br />KI
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-hdki-red px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-gray-700 hover:text-hdki-red px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/auth/profile"
                  className="flex items-center text-gray-700 hover:text-hdki-red px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  <User className="h-4 w-4 mr-1" />
                  {user?.first_name || user?.username}
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center text-gray-700 hover:text-hdki-red px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="bg-hdki-red hover:bg-hdki-red-dark text-white px-4 py-2 text-sm font-medium transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-hdki-red p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-hdki-red block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="text-gray-700 hover:text-hdki-red block px-3 py-2 text-base font-medium transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/auth/profile"
                      className="flex items-center text-gray-700 hover:text-hdki-red px-3 py-2 text-base font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center text-gray-700 hover:text-hdki-red px-3 py-2 text-base font-medium transition-colors duration-200 w-full text-left"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="bg-hdki-red hover:bg-hdki-red-dark text-white block px-3 py-2 text-base font-medium transition-colors duration-200 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
