"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Layout from "@/components/Layout";
import { Calendar, MapPin, Send, ArrowLeft, CheckCircle } from "lucide-react";
import { Event } from "@/shared/mockData";

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventName: string;
  additionalNotes: string;
}

export default function EventRegistration() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    eventName: searchParams.get("name") || "",
    additionalNotes: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [eventLoading, setEventLoading] = useState(true);

  const eventId = searchParams.get("event");

  useEffect(() => {
    const fetchEvent = async () => {
      if (eventId) {
        try {
          const response = await fetch(`/api/events/${eventId}`);
          if (response.ok) {
            const eventData = await response.json();
            setEvent(eventData);
            setFormData(prev => ({ ...prev, eventName: eventData.title }));
          }
        } catch (err) {
          console.error("Failed to fetch event:", err);
        }
      }
      setEventLoading(false);
    };

    fetchEvent();
  }, [eventId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let response;
      
      if (eventId) {
        // Register for specific event
        response = await fetch(`/api/events/${eventId}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            additionalNotes: formData.additionalNotes
          }),
        });
      } else {
        // General registration inquiry
        response = await fetch('/api/contact/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="py-20 bg-white min-h-screen flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-light text-gray-900 mb-6">Registration Successful!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for registering{event ? ` for ${event.title}` : ''}. We have received your registration 
              and will contact you shortly with further details and payment instructions.
            </p>
            <div className="space-y-4">
              <p className="text-gray-600">
                A confirmation email has been sent to <strong>{formData.email}</strong>
              </p>
              {event && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Event Details:</h3>
                  <p className="text-gray-600">
                    <strong>{event.title}</strong><br />
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}<br />
                    {event.location}
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              {event && (
                <Link
                  href={`/activities/events/${event.id}`}
                  className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300"
                >
                  View Event Details
                </Link>
              )}
              <Link
                href="/activities/events"
                className="border-2 border-hdki-red text-hdki-red hover:bg-hdki-red hover:text-white px-6 py-3 font-semibold transition-all duration-300"
              >
                Browse More Events
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Back Navigation */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="text-hdki-red hover:text-hdki-red-dark inline-flex items-center text-sm font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </button>
        </div>
      </section>

      {/* Header */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Event Registration
          </h1>
          <p className="text-xl text-gray-600">
            {event ? `Register for ${event.title}` : 'Register for HDKI Kenya Events'}
          </p>
        </div>
      </section>

      {/* Event Information */}
      {event && !eventLoading && (
        <section className="py-10 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{event.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-hdki-red mr-3" />
                      <div>
                        <p className="font-semibold text-gray-900">Date</p>
                        <p className="text-gray-600">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-hdki-red mr-3" />
                      <div>
                        <p className="font-semibold text-gray-900">Location</p>
                        <p className="text-gray-600">{event.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-hdki-red">{event.fee}</span>
                    {event.maxParticipants && (
                      <span className="text-sm text-gray-600">
                        {event.currentRegistrations || 0} / {event.maxParticipants} registered
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Registration Form */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hdki-red focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hdki-red focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hdki-red focus:border-transparent"
                  placeholder="+254 xxx xxx xxx"
                />
              </div>
              
              <div>
                <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Name *
                </label>
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  required
                  readOnly={!!event}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hdki-red focus:border-transparent ${!!event ? 'bg-gray-50' : ''}`}
                  placeholder="Event you want to register for"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hdki-red focus:border-transparent"
                placeholder="Any additional information, dietary requirements, special needs, or questions..."
              />
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Terms</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  Registration is subject to availability and payment confirmation
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  Full payment is required to secure your spot
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  Cancellation policy applies as per event terms
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                  Participants must have current insurance coverage
                </li>
              </ul>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-4 font-semibold transition-colors duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Processing Registration...
                </>
              ) : (
                <>
                  Submit Registration
                  <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-8">Need Help?</h2>
          <p className="text-lg text-gray-600 mb-8">
            If you have any questions about registration or need assistance, 
            our team is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/content/contact"
              className="bg-white border-2 border-hdki-red text-hdki-red hover:bg-hdki-red hover:text-white px-6 py-3 font-semibold transition-all duration-300"
            >
              Contact Support
            </Link>
            <Link
              href="/activities/events"
              className="bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 font-semibold transition-all duration-300"
            >
              Browse All Events
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
