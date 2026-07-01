"use client";

import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "@/lib/graphql/queries";
import Layout from "@/components/Layout";
import HeroSection from "@/components/ui/HeroSection";
import Card, { CardImage, CardBody } from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import { Calendar, MapPin, Users, ArrowRight, Ticket, CalendarDays } from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  coverImage?: string;
  fee: number;
  maxParticipants?: number;
  currentRegistrations?: number;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

function formatEventDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Events() {
  const { data, loading, error, refetch } = useQuery(GET_EVENTS);
  const events: EventItem[] = data?.events || [];

  return (
    <Layout>
      <HeroSection
        image="https://images.unsplash.com/photo-1514050566906-8d077bae7046?q=80&w=2000&auto=format&fit=crop"
        eyebrow="Activities"
        title="HDKI Kenya Events"
        subtitle="Join us for exciting tournaments, training camps, seminars, and adventure programs. From local competitions to international expeditions, there's something for everyone."
      />

      <section className="bg-hdki-gray-light py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingState label="Loading events..." />
          ) : error ? (
            <ErrorState message={`Error loading events: ${error.message}`} onRetry={() => refetch()} />
          ) : events.length === 0 ? (
            <EmptyState
              icon={<CalendarDays />}
              title="No Upcoming Events"
              description="Check back later for new events and programs."
            />
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event, i) => {
                const spotsLimited = typeof event.maxParticipants === "number" && event.maxParticipants > 0;
                const registered = event.currentRegistrations || 0;
                return (
                  <Reveal key={event.id} delay={(i % 3) * 0.1}>
                    <Card variant="bordered" hover="lift" className="h-full">
                      <div className="relative">
                        {event.coverImage ? (
                          <CardImage src={event.coverImage} alt={event.title} ratio="aspect-[4/3]" unoptimized />
                        ) : (
                          <div className="flex aspect-[4/3] items-center justify-center bg-hdki-gray-light text-hdki-gray-mid">
                            <CalendarDays className="h-10 w-10" />
                          </div>
                        )}
                        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 rounded-sm bg-white/95 px-2.5 py-1 text-xs font-medium text-hdki-ink shadow">
                            <Calendar className="h-3.5 w-3.5 text-hdki-red" />
                            {formatEventDate(event.date)}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-sm bg-white/95 px-2.5 py-1 text-xs font-medium text-hdki-ink shadow">
                            <Ticket className="h-3.5 w-3.5 text-hdki-red" />
                            {event.fee > 0 ? `KSh ${event.fee}` : "Free"}
                          </span>
                        </div>
                      </div>
                      <CardBody>
                        <h3 className="mb-2 font-display text-xl font-medium text-hdki-ink transition-colors group-hover:text-hdki-red">
                          {event.title}
                        </h3>
                        <p className="mb-3 flex items-center gap-1.5 text-sm text-hdki-gray-mid">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-hdki-red" />
                          <span className="line-clamp-1">{event.location}</span>
                        </p>
                        <p className="mb-3 line-clamp-2 text-sm text-hdki-gray-mid">{event.description}</p>
                        {spotsLimited && (
                          <div className="mb-5">
                            <p className="mb-1.5 flex items-center gap-1.5 text-xs text-hdki-gray-mid">
                              <Users className="h-3.5 w-3.5 text-hdki-red" />
                              {registered} / {event.maxParticipants} registered
                            </p>
                            <div className="h-1.5 w-full overflow-hidden rounded-sm bg-hdki-border">
                              <div
                                className="h-full bg-hdki-red"
                                style={{
                                  width: `${Math.min(100, (registered / (event.maxParticipants as number)) * 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex gap-3">
                          <Button
                            href={`/activities/events/${event.id}`}
                            variant="primary"
                            size="sm"
                            className="flex-1"
                            icon={<ArrowRight />}
                          >
                            View Details
                          </Button>
                          <Button
                            href={`/activities/events/register?event=${event.id}`}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            Register
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 font-display text-3xl font-medium text-hdki-ink">Don&apos;t Miss Out on Our Events</h2>
          <p className="mb-8 text-lg text-hdki-gray-mid">
            Stay updated with the latest events and programs. Follow us on social media and subscribe to our
            newsletter to never miss an opportunity.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/activities/news" variant="primary" size="md" icon={<ArrowRight />}>
              Read Latest News
            </Button>
            <Button href="/content/contact" variant="outline" size="md">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
