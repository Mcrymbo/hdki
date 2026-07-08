import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { itemListSchema } from "@/lib/seo/schema";
import { fetchGraphQL } from "@/lib/seo/fetchGraphQL";
import EventsPageClient from "./EventsPageClient";

export const metadata: Metadata = {
  title: "Karate Events & Tournaments in Kenya",
  description:
    "See upcoming HDKI Kenya karate tournaments, gradings, seminars, and training camps. Register online for karate events across Nairobi and Kenya.",
  alternates: { canonical: "/activities/events" },
  openGraph: { url: "/activities/events", title: "Karate Events & Tournaments in Kenya | HDKI Kenya" },
};

interface EventListResponse {
  events?: { id: string; title: string }[];
}

const EVENT_LIST_QUERY = `
  query EventListForSchema {
    events { id title }
  }
`;

export default async function EventsPage() {
  const data = await fetchGraphQL<EventListResponse>(EVENT_LIST_QUERY, {});
  const events = data?.events || [];

  return (
    <>
      {events.length > 0 && (
        <JsonLd
          data={itemListSchema(
            "HDKI Kenya Karate Events",
            events.map((e) => ({ name: e.title, path: `/activities/events/${e.id}` }))
          )}
        />
      )}
      <EventsPageClient />
    </>
  );
}
