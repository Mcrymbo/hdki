"use client";

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENTS } from '@/lib/graphql/queries';
import { DELETE_EVENT } from '@/lib/graphql/mutations';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, Calendar, MapPin, Users, DollarSign } from 'lucide-react';

export default function AdminEvents() {
  const { isAdmin } = useAuth();
  
  const { data, loading, error, refetch } = useQuery(GET_EVENTS);
  const [deleteEvent] = useMutation(DELETE_EVENT);

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

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent({
          variables: { id },
          update: (cache) => {
            cache.modify({
              fields: {
                events(existingEvents = []) {
                  return existingEvents.filter((event: any) => event.__ref !== `Event:${id}`);
                }
              }
            });
          }
        });
        refetch();
      } catch (err) {
        console.error('Error deleting event:', err);
        alert('Failed to delete event');
      }
    }
  };

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
          <p className="text-red-600 mb-4">Error loading events: {error.message}</p>
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

  const events = data?.events || [];

  return (
    <AdminLayout>
    <div className="space-y-6">
      {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light text-gray-900">Events Management</h1>
            <p className="text-gray-600 mt-2">Manage events, tournaments, and programs</p>
          </div>
          <Link
            href="/admin/events/create"
            className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300 flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Event
          </Link>
      </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 mb-4">No events found</p>
              <Link
                href="/admin/events/create"
                className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300"
              >
                Create First Event
              </Link>
          </div>
          ) : (
            events.map((event: any) => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {event.coverImage && (
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={event.coverImage}
                        alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                        </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-hdki-red" />
                      <time dateTime={event.date}>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-hdki-red" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2 text-hdki-red" />
                      <span className="font-semibold text-hdki-red">
                        {event.fee > 0 ? `KSh ${event.fee}` : 'Free'}
                      </span>
                    </div>

                    {event.maxParticipants && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-hdki-red" />
                        <span>
                          {event.currentRegistrations || 0} / {event.maxParticipants} registered
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      event.isPublished 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.isPublished ? 'Published' : 'Draft'}
                    </span>

                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/activities/events/${event.id}`}
                        className="text-gray-400 hover:text-gray-600"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/events/${event.id}/edit`}
                        className="text-gray-400 hover:text-blue-600"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="text-gray-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
          </div>
      </div>
              </div>
            ))
          )}
        </div>
    </div>
    </AdminLayout>
  );
}