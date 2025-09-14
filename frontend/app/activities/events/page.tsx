"use client";

import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '@/lib/graphql/queries';
import Layout from "@/components/Layout";
import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight, Ticket } from "lucide-react";

export default function Events() {
  const { data, loading, error } = useQuery(GET_EVENTS);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hdki-red mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading events: {error.message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const events = data?.events || [];

  return (
    <Layout>
      {/* Header */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              HDKI Kenya Events
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us for exciting tournaments, training camps, seminars, and adventure programs. 
              From local competitions to international expeditions, there's something for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {events.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-light text-gray-900 mb-4">No Upcoming Events</h3>
              <p className="text-gray-600">Check back later for new events and programs.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event: any) => (
                <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {event.cover_image && (
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={event.cover_image}
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
                      
                      {event.max_participants && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2 text-hdki-red" />
                          <span>
                            {event.current_registrations || 0} / {event.max_participants} registered
                          </span>
                        </div>
                      )}

                      <div className="flex items-center text-sm text-gray-600">
                        <Ticket className="h-4 w-4 mr-2 text-hdki-red" />
                        <span className="font-semibold text-hdki-red">
                          {event.fee > 0 ? `KSh ${event.fee}` : 'Free'}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {event.description}
                    </p>

                    <div className="flex space-x-3">
                      <Link
                        href={`/activities/events/${event.id}`}
                        className="flex-1 bg-hdki-red hover:bg-hdki-red-dark text-white px-4 py-2 text-sm font-medium text-center transition-colors duration-200"
                      >
                        View Details
                      </Link>
                        <Link
                        href={`/activities/events/register?event=${event.id}`}
                        className="flex-1 border border-hdki-red text-hdki-red hover:bg-hdki-red hover:text-white px-4 py-2 text-sm font-medium text-center transition-all duration-200"
                        >
                        Register
                        </Link>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            Don't Miss Out on Our Events
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Stay updated with the latest events and programs. Follow us on social media 
            and subscribe to our newsletter to never miss an opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/activities/news"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-3 font-semibold transition-colors duration-300"
            >
              Read Latest News
            </Link>
            <Link
              href="/content/contact"
              className="border-2 border-hdki-red text-hdki-red hover:bg-hdki-red hover:text-white px-8 py-3 font-semibold transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}