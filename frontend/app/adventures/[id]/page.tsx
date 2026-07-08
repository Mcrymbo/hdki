import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { eventSchema } from "@/lib/seo/schema";
import { fetchGraphQL } from "@/lib/seo/fetchGraphQL";
import AdventureDetailClient from "./AdventureDetailClient";

interface AdventureResponse {
  karateAdventure?: {
    id: string;
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    location?: string;
    coverImage?: string;
  };
}

const ADVENTURE_QUERY = `
  query AdventureForMetadata($id: ID!) {
    karateAdventure(id: $id) {
      id
      title
      description
      startDate
      endDate
      location
      coverImage
    }
  }
`;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = await fetchGraphQL<AdventureResponse>(ADVENTURE_QUERY, { id });
  const adv = data?.karateAdventure;

  if (!adv) {
    return { title: "Karate Adventure", alternates: { canonical: `/adventures/${id}` } };
  }

  const title = `${adv.title} | Karate Adventure in ${adv.location || "Kenya"}`;
  const description =
    adv.description ||
    `Join HDKI Kenya's ${adv.title} karate adventure in ${adv.location || "Kenya"} — Shotokan training combined with Kenyan wildlife and culture.`;

  return {
    title,
    description,
    alternates: { canonical: `/adventures/${adv.id}` },
    openGraph: { url: `/adventures/${adv.id}`, title, description, images: adv.coverImage ? [adv.coverImage] : undefined },
  };
}

export default async function AdventureDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetchGraphQL<AdventureResponse>(ADVENTURE_QUERY, { id });
  const adv = data?.karateAdventure;

  return (
    <>
      {adv && (
        <JsonLd
          data={eventSchema({
            id: adv.id,
            title: adv.title,
            description: adv.description,
            date: adv.startDate,
            location: adv.location,
            coverImage: adv.coverImage,
            path: `/adventures/${adv.id}`,
            kind: "Event",
          })}
        />
      )}
      <AdventureDetailClient />
    </>
  );
}
