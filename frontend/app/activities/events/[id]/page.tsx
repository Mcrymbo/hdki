import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { eventSchema } from "@/lib/seo/schema";
import { fetchGraphQL } from "@/lib/seo/fetchGraphQL";
import EventDetailClient from "./EventDetailClient";

interface EventResponse {
  event?: {
    id: string;
    title: string;
    description?: string;
    date: string;
    location?: string;
    coverImage?: string;
    fee?: number;
  };
}

const EVENT_QUERY = `
  query EventForMetadata($id: ID!) {
    event(id: $id) {
      id
      title
      description
      date
      location
      coverImage
      fee
    }
  }
`;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = await fetchGraphQL<EventResponse>(EVENT_QUERY, { id });
  const event = data?.event;

  if (!event) {
    return { title: "Event", alternates: { canonical: `/activities/events/${id}` } };
  }

  const title = `${event.title} | Karate Event in ${event.location || "Kenya"}`;
  const description =
    event.description ||
    `${event.title} — an HDKI Kenya karate event in ${event.location || "Kenya"}. See dates, fees, and how to register.`;

  return {
    title,
    description,
    alternates: { canonical: `/activities/events/${event.id}` },
    openGraph: { url: `/activities/events/${event.id}`, title, description, images: event.coverImage ? [event.coverImage] : undefined },
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetchGraphQL<EventResponse>(EVENT_QUERY, { id });
  const event = data?.event;

  return (
    <>
      {event && (
        <JsonLd
          data={eventSchema({
            id: event.id,
            title: event.title,
            description: event.description,
            date: event.date,
            location: event.location,
            coverImage: event.coverImage,
            fee: event.fee,
            path: `/activities/events/${event.id}`,
            kind: "SportsEvent",
          })}
        />
      )}
      <EventDetailClient />
    </>
  );
}
