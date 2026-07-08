import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { itemListSchema } from "@/lib/seo/schema";
import { fetchGraphQL } from "@/lib/seo/fetchGraphQL";
import DojosPageClient from "./DojosPageClient";

export const metadata: Metadata = {
  title: "Karate Dojo Locations in Kenya",
  description:
    "Find an HDKI Kenya Shotokan karate dojo near you. Certified instructors teach traditional karate classes for kids and adults across Nairobi, Kiambu, and other locations in Kenya.",
  alternates: { canonical: "/dojos" },
  openGraph: { url: "/dojos", title: "Karate Dojo Locations in Kenya | HDKI Kenya" },
};

interface DojoListResponse {
  dojoLocations?: { id: string; name: string }[];
}

const DOJO_LIST_QUERY = `
  query DojoListForSchema {
    dojoLocations { id name }
  }
`;

export default async function DojosPage() {
  const data = await fetchGraphQL<DojoListResponse>(DOJO_LIST_QUERY, {});
  const dojos = data?.dojoLocations || [];

  return (
    <>
      {dojos.length > 0 && (
        <JsonLd
          data={itemListSchema(
            "HDKI Kenya Dojo Locations",
            dojos.map((d) => ({ name: d.name, path: `/dojos/${d.id}` }))
          )}
        />
      )}
      <DojosPageClient />
    </>
  );
}
