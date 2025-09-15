"use client";

import { useQuery } from '@apollo/client';
import { GET_ME, GET_NEWS, GET_EVENTS, GET_CONTACT_MESSAGES } from '@/lib/graphql/queries';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Calendar, Newspaper, Mail, Users, TrendingUp, Activity } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const { data: newsData } = useQuery(GET_NEWS);
  const { data: eventsData } = useQuery(GET_EVENTS);
  const { data: contactData } = useQuery(GET_CONTACT_MESSAGES);

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

  const stats = [
    {
      name: 'Total News Articles',
      value: newsData?.news?.length || 0,
      icon: Newspaper,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      href: '/admin/news'
    },
    {
      name: 'Upcoming Events',
      value: eventsData?.events?.length || 0,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      href: '/admin/events'
    },
    {
      name: 'Contact Messages',
      value: contactData?.contact_messages?.length || 0,
      icon: Mail,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      href: '/admin/contact'
    },
    {
      name: 'Total Users',
      value: 0, // This would need a separate query
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      href: '/admin/users'
    }
  ];

  const recentNews = newsData?.news?.slice(0, 5) || [];
  const recentEvents = eventsData?.events?.slice(0, 5) || [];
  const recentMessages = contactData?.contact_messages?.slice(0, 5) || [];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-light text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.first_name || user?.username}. Here's what's happening with HDKI Kenya.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent News */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent News</h3>
                <Link
                  href="/admin/news"
                  className="text-sm text-hdki-red hover:text-hdki-red-dark font-medium"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentNews.length === 0 ? (
                <p className="text-gray-500 text-sm">No news articles yet</p>
              ) : (
                <div className="space-y-4">
                  {recentNews.map((article: any) => (
                    <div key={article.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <Newspaper className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {article.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(article.published_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Events */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Events</h3>
                <Link
                  href="/admin/events"
                  className="text-sm text-hdki-red hover:text-hdki-red-dark font-medium"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentEvents.length === 0 ? (
                <p className="text-gray-500 text-sm">No events yet</p>
              ) : (
                <div className="space-y-4">
                  {recentEvents.map((event: any) => (
                    <div key={event.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {event.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
                <Link
                  href="/admin/contact"
                  className="text-sm text-hdki-red hover:text-hdki-red-dark font-medium"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentMessages.length === 0 ? (
                <p className="text-gray-500 text-sm">No messages yet</p>
              ) : (
                <div className="space-y-4">
                  {recentMessages.map((message: any) => (
                    <div key={message.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {message.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {message.email}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(message.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/news/create"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Newspaper className="h-5 w-5 text-hdki-red mr-3" />
              <span className="text-sm font-medium text-gray-900">Create News Article</span>
            </Link>
            <Link
              href="/admin/events/create"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Calendar className="h-5 w-5 text-hdki-red mr-3" />
              <span className="text-sm font-medium text-gray-900">Create Event</span>
            </Link>
            <Link
              href="/admin/users/create"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Users className="h-5 w-5 text-hdki-red mr-3" />
              <span className="text-sm font-medium text-gray-900">Add User</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Activity className="h-5 w-5 text-hdki-red mr-3" />
              <span className="text-sm font-medium text-gray-900">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}



