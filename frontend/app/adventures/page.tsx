import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { itemListSchema } from "@/lib/seo/schema";
import { fetchGraphQL } from "@/lib/seo/fetchGraphQL";
import AdventuresPageClient from "./AdventuresPageClient";

export const metadata: Metadata = {
  title: "Karate Adventures | Martial Arts Sports Tourism in Kenya",
  description:
    "Join HDKI Kenya's Karate Adventures — Shotokan karate training camps combined with Kenya's wildlife safaris and cultural experiences. The world's first martial arts sports tourism program.",
  alternates: { canonical: "/adventures" },
  openGraph: { url: "/adventures", title: "Karate Adventures | Martial Arts Sports Tourism in Kenya" },
};

interface AdventureListResponse {
  karateAdventures?: { id: string; title: string }[];
}

const ADVENTURE_LIST_QUERY = `
  query AdventureListForSchema {
    karateAdventures { id title }
  }
`;

export default async function AdventuresPage() {
  const data = await fetchGraphQL<AdventureListResponse>(ADVENTURE_LIST_QUERY, {});
  const adventures = data?.karateAdventures || [];

  return (
    <>
      {adventures.length > 0 && (
        <JsonLd
          data={itemListSchema(
            "HDKI Kenya Karate Adventures",
            adventures.map((a) => ({ name: a.title, path: `/adventures/${a.id}` }))
          )}
        />
      )}
      <AdventuresPageClient />
    </>
  );
}
