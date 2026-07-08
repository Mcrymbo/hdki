"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EVENT } from "@/lib/graphql/queries";
import { REGISTER_FOR_EVENT } from "@/lib/graphql/mutations";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import Reveal from "@/components/ui/Reveal";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import IconCircle from "@/components/ui/IconCircle";
import { Calendar, MapPin, Ticket, Users, Send, ArrowLeft, CheckCircle2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventName: string;
  additionalNotes: string;
}

export default function EventRegistrationClient() {
  return (
    <Suspense
      fallback={
        <Layout>
          <LoadingState label="Loading..." />
        </Layout>
      }
    >
      <EventRegistrationContent />
    </Suspense>
  );
}

function EventRegistrationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    name: user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : "",
    email: user?.email || "",
    phone: user?.phone || "",
    eventName: "",
    additionalNotes: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const eventId = searchParams.get("event");

  const { data: eventData, loading: eventLoading, error: eventError } = useQuery(GET_EVENT, {
    variables: { id: eventId },
    skip: !eventId,
  });

  const [registerForEvent] = useMutation(REGISTER_FOR_EVENT);

  const event = eventData?.event;

  useEffect(() => {
    if (event) {
      setFormData((prev) => ({ ...prev, eventName: event.title }));
    }
  }, [event]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (eventId) {
        const { data } = await registerForEvent({
          variables: {
            eventId: eventId,
            additionalNotes: formData.additionalNotes,
          },
        });

        if (data?.registerForEvent?.success) {
          setSubmitted(true);
        } else {
          setError(data?.registerForEvent?.message || "Registration failed");
        }
      } else {
        setError("No event selected for registration");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <LoadingState label="Please log in to register — redirecting..." />
      </Layout>
    );
  }

  if (eventLoading) {
    return (
      <Layout>
        <LoadingState label="Loading event details..." />
      </Layout>
    );
  }

  if (eventError || !event) {
    return (
      <Layout>
        <ErrorState message={eventError ? eventError.message : "The event you're looking for doesn't exist."} />
      </Layout>
    );
  }

  if (submitted) {
    return (
      <Layout>
        <section className="flex min-h-[70vh] items-center bg-white py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <Reveal>
              <IconCircle icon={<CheckCircle2 />} size="lg" className="mx-auto mb-6 bg-green-100 text-green-600" />
              <h1 className="mb-6 font-display text-4xl font-medium text-hdki-ink">Registration Successful!</h1>
              <p className="mb-8 text-lg text-hdki-gray-mid">
                Thank you for registering for {event.title}. We have received your registration and will contact you
                shortly with further details and payment instructions.
              </p>
              <p className="mb-6 text-hdki-gray-mid">
                A confirmation email has been sent to <strong className="text-hdki-ink">{formData.email}</strong>
              </p>
              <div className="mb-8 rounded-sm bg-hdki-gray-light p-6 text-left">
                <h3 className="mb-2 font-display text-lg font-medium text-hdki-ink">Event Details</h3>
                <p className="text-hdki-gray-mid">
                  <strong className="text-hdki-ink">{event.title}</strong>
                  <br />
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  <br />
                  {event.location}
                </p>
              </div>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button href={`/activities/events/${event.id}`} variant="primary" size="md">
                  View Event Details
                </Button>
                <Button href="/activities/events" variant="outline" size="md">
                  Browse More Events
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-hdki-gray-light py-6">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-sm font-medium text-hdki-red hover:text-hdki-red-dark"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </button>
        </div>
      </section>

      <section className="bg-white py-14 text-center md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 font-display text-4xl font-medium text-hdki-ink md:text-5xl">Event Registration</h1>
          <p className="text-lg text-hdki-gray-mid">Register for {event.title}</p>
        </div>
      </section>

      <section className="bg-hdki-gray-light py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-sm border border-hdki-border bg-white">
            <div className="md:flex">
              {event.coverImage && (
                <div className="relative h-48 md:h-auto md:w-1/3">
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    unoptimized
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className={`${event.coverImage ? "md:w-2/3" : "w-full"} p-6`}>
                <h3 className="mb-4 font-display text-xl font-medium text-hdki-ink">{event.title}</h3>
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-hdki-red" />
                    <div className="text-sm">
                      <p className="font-medium text-hdki-ink">Date</p>
                      <p className="text-hdki-gray-mid">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-hdki-red" />
                    <div className="text-sm">
                      <p className="font-medium text-hdki-ink">Location</p>
                      <p className="text-hdki-gray-mid">{event.location}</p>
                    </div>
                  </div>
                </div>

                <p className="mb-4 text-sm text-hdki-gray-mid">{event.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-1.5 font-medium text-hdki-red">
                    <Ticket className="h-4 w-4" />
                    {event.fee > 0 ? `KSh ${event.fee}` : "Free"}
                  </span>
                  {event.maxParticipants && (
                    <span className="inline-flex items-center gap-1.5 text-hdki-gray-mid">
                      <Users className="h-4 w-4" />
                      {event.currentRegistrations || 0} / {event.maxParticipants} registered
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Full Name *"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your full name"
              />
              <Input
                label="Email Address *"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Phone Number *"
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="+254 xxx xxx xxx"
              />
              <Input
                label="Event Name *"
                type="text"
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
                required
                readOnly
                className="bg-hdki-gray-light"
                placeholder="Event you want to register for"
              />
            </div>

            <Textarea
              label="Additional Notes"
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              rows={4}
              placeholder="Any additional information, dietary requirements, special needs, or questions..."
            />

            <div className="rounded-sm bg-hdki-gray-light p-6">
              <h3 className="mb-4 font-display text-lg font-medium text-hdki-ink">Registration Terms</h3>
              <ul className="space-y-2 text-sm text-hdki-gray-mid">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hdki-red" />
                  Registration is subject to availability and payment confirmation
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hdki-red" />
                  Full payment is required to secure your spot
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hdki-red" />
                  Cancellation policy applies as per event terms
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hdki-red" />
                  Participants must have current insurance coverage
                </li>
              </ul>
            </div>

            <Button type="submit" variant="primary" size="lg" loading={loading} icon={<Send />} className="w-full">
              Submit Registration
            </Button>
          </form>
        </div>
      </section>

      <section className="bg-hdki-gray-light py-14 text-center md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-display text-3xl font-medium text-hdki-ink">Need Help?</h2>
          <p className="mb-8 text-lg text-hdki-gray-mid">
            If you have any questions about registration or need assistance, our team is here to help you every step
            of the way.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/content/contact" variant="outline" size="md">
              Contact Support
            </Button>
            <Button href="/activities/events" variant="outline" size="md">
              Browse All Events
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
