"use client";

import { useQuery } from '@apollo/client';
import { GET_EVENT } from '@/lib/graphql/queries';
import Link from "next/link";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import { Calendar, MapPin, Users, Trophy, Clock, ArrowLeft, Ticket } from "lucide-react";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { id },
    skip: !id,
  });

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-hdki-red border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading event details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !data?.event) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-8">
              {error ? error.message : "The event you're looking for doesn't exist."}
            </p>
            <Link
              href="/activities/events"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300"
            >
              Back to Events
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const event = data.event;

  return (
    <Layout>
      {/* Back Navigation */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/activities/events"
            className="text-hdki-red hover:text-hdki-red-dark inline-flex items-center text-sm font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </div>
      </section>

      {/* Event Header */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
                {event.title}
              </h1>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-lg text-gray-600">
                  <Calendar className="h-5 w-5 mr-3 text-hdki-red" />
                  <time dateTime={event.date}>
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                
                <div className="flex items-center text-lg text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-hdki-red" />
                  <span>{event.location}</span>
                </div>

                <div className="flex items-center text-lg text-gray-600">
                  <Ticket className="h-5 w-5 mr-3 text-hdki-red" />
                  <span className="font-semibold text-hdki-red">
                    {event.fee > 0 ? `KSh ${event.fee}` : 'Free Event'}
                  </span>
                </div>

                {event.max_participants && (
                  <div className="flex items-center text-lg text-gray-600">
                    <Users className="h-5 w-5 mr-3 text-hdki-red" />
                    <span>
                      {event.current_registrations || 0} / {event.max_participants} registered
                    </span>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <Link
                  href={`/activities/events/register?event=${event.id}`}
                  className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-3 font-semibold transition-colors duration-300"
                >
                  Register Now
                </Link>
                <Link
                  href="/activities/events"
                  className="border-2 border-hdki-red text-hdki-red hover:bg-hdki-red hover:text-white px-8 py-3 font-semibold transition-all duration-300"
                >
                  View All Events
                </Link>
              </div>
            </div>

            {event.cover_image && (
              <div className="order-first lg:order-last">
                <img
                  src={event.cover_image}
                  alt={event.title}
                  className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Event Description</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Event Info Card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-hdki-red" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p>{new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-hdki-red" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p>{new Date(event.date).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-hdki-red" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p>{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Ticket className="h-4 w-4 mr-2 text-hdki-red" />
                    <div>
                      <p className="font-medium">Fee</p>
                      <p className="font-semibold text-hdki-red">
                        {event.fee > 0 ? `KSh ${event.fee}` : 'Free'}
                      </p>
                    </div>
                  </div>

                  {event.max_participants && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-hdki-red" />
                      <div>
                        <p className="font-medium">Capacity</p>
                        <p>{event.current_registrations || 0} / {event.max_participants}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Registration Card */}
              <div className="bg-hdki-red text-white rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Ready to Join?</h3>
                <p className="text-sm mb-4">
                  Don't miss out on this exciting event. Register now to secure your spot.
                </p>
                <Link
                  href={`/activities/events/register?event=${event.id}`}
                  className="block w-full bg-white text-hdki-red hover:bg-gray-100 text-center px-4 py-2 font-semibold transition-colors duration-200"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            Explore More Events
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Discover other exciting events and programs offered by HDKI Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/activities/events"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-3 font-semibold transition-colors duration-300"
            >
              View All Events
            </Link>
            <Link
              href="/activities/news"
              className="border-2 border-hdki-red text-hdki-red hover:bg-hdki-red hover:text-white px-8 py-3 font-semibold transition-all duration-300"
            >
              Read Latest News
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}