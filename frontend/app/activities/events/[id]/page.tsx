"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import { Calendar, MapPin, Users, Trophy, Clock, Tag, ArrowRight, ArrowLeft } from "lucide-react";
import { Event } from "@/shared/mockData";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${id}`);
        if (!response.ok) {
          throw new Error("Event not found");
        }
        const eventData = await response.json();
        setEvent(eventData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

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

  if (error || !event) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-6">{error || "The event you're looking for doesn't exist."}</p>
            <Link
              href="/activities/events"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300 inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Major Event": return "bg-yellow-500";
      case "Karate Adventure": return "bg-green-500";
      case "Special Program": return "bg-purple-500";
      case "International Event": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-green-100 text-green-800";
      case "ongoing": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-gray-100 text-gray-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-black/70 to-black/50 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${event.image})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-4">
            <span className={`${getCategoryColor(event.category)} text-white px-4 py-2 text-sm font-semibold rounded-full mr-3`}>
              {event.category}
            </span>
            <span className={`${getStatusColor(event.status)} px-4 py-2 text-sm font-semibold rounded-full`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-6">
            {event.title}
          </h1>
          <p className="text-xl md:text-2xl font-light">
            {event.description}
          </p>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: event.fullContent }} />
              </div>

              {/* Event Gallery */}
              {event.gallery && event.gallery.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-semibold mb-6">Event Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {event.gallery.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img
                          src={image}
                          alt={`${event.title} gallery ${index + 1}`}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Highlights */}
              <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-6">Event Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg">
                      <Trophy className="h-5 w-5 text-hdki-red mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-8 sticky top-8">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Event Information</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-hdki-red mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Date</p>
                      <p className="text-gray-600">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                        {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-hdki-red mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Location</p>
                      <p className="text-gray-600">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-hdki-red mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Participants</p>
                      <p className="text-gray-600">{event.participants}</p>
                      {event.maxParticipants && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-hdki-red h-2 rounded-full" 
                              style={{ 
                                width: `${((event.currentRegistrations || 0) / event.maxParticipants) * 100}%` 
                              }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {event.currentRegistrations || 0} of {event.maxParticipants} registered
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-hdki-red mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Registration Deadline</p>
                      <p className="text-gray-600">
                        {new Date(event.registrationDeadline).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Trophy className="h-5 w-5 text-hdki-red mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Registration Fee</p>
                      <p className="text-gray-600">{event.fee}</p>
                    </div>
                  </div>

                  {event.instructor && (
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-hdki-red mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Lead Instructor</p>
                        <p className="text-gray-600">{event.instructor}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Tag className="h-4 w-4 mr-2" />
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Registration Button */}
                {event.status === "upcoming" && (
                  <Link
                    href={`/activities/events/register?event=${event.id}&name=${encodeURIComponent(event.title)}`}
                    className="w-full bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-4 font-semibold transition-colors duration-300 inline-flex items-center justify-center group"
                  >
                    Register for this Event
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}

                {event.status === "completed" && (
                  <div className="w-full bg-gray-100 text-gray-600 px-6 py-4 font-semibold text-center">
                    Event Completed
                  </div>
                )}

                {event.status === "cancelled" && (
                  <div className="w-full bg-red-100 text-red-600 px-6 py-4 font-semibold text-center">
                    Event Cancelled
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-center text-gray-900 mb-12">
            More Events You Might Like
          </h2>
          <div className="text-center">
            <Link
              href="/activities/events"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-4 text-lg font-semibold transition-colors duration-300 inline-flex items-center group"
            >
              View All Events
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
