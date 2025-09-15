"use client";

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONTACT_MESSAGES } from '@/lib/graphql/queries';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { Mail, Calendar, User, Phone, MessageSquare } from 'lucide-react';

export default function AdminContact() {
  const { isAdmin } = useAuth();
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
  
  const { data, loading, error, refetch } = useQuery(GET_CONTACT_MESSAGES);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-8">You need admin privileges to access this page.</p>
          <Link
            href="/"
            className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hdki-red"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Error loading messages: {error.message}</p>
          <button 
            onClick={() => refetch()}
            className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </AdminLayout>
    );
  }

  const allMessages = data?.contact_messages || [];
  const filteredMessages = allMessages.filter((message: any) => {
    if (filter === 'read') return message.is_read;
    if (filter === 'unread') return !message.is_read;
    return true;
  });

  const unreadCount = allMessages.filter((message: any) => !message.is_read).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light text-gray-900">Contact Messages</h1>
            <p className="text-gray-600 mt-2">Manage incoming contact messages and inquiries</p>
          </div>
          <div className="flex items-center space-x-4">
            {unreadCount > 0 && (
              <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                {unreadCount} unread
              </span>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setFilter('all')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                filter === 'all'
                  ? 'border-hdki-red text-hdki-red'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Messages ({allMessages.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                filter === 'unread'
                  ? 'border-hdki-red text-hdki-red'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                filter === 'read'
                  ? 'border-hdki-red text-hdki-red'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Read ({allMessages.length - unreadCount})
            </button>
          </nav>
        </div>

        {/* Messages List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">
                {filter === 'all' 
                  ? 'No messages found' 
                  : filter === 'unread' 
                    ? 'No unread messages' 
                    : 'No read messages'
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredMessages.map((message: any) => (
                <div key={message.id} className={`p-6 hover:bg-gray-50 ${!message.is_read ? 'bg-blue-50' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-hdki-red flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {message.name[0].toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-medium text-gray-900">
                              {message.name}
                            </h3>
                            {!message.is_read && (
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                New
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {message.email}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(message.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <a
                        href={`mailto:${message.email}`}
                        className="inline-flex items-center text-sm text-hdki-red hover:text-hdki-red-dark font-medium"
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        Reply
                      </a>
                    </div>
                    <div className="text-sm text-gray-500">
                      {message.is_read ? 'Read' : 'Unread'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}



