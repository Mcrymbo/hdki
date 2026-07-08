import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { dojoSchema } from "@/lib/seo/schema";
import { fetchGraphQL } from "@/lib/seo/fetchGraphQL";
import DojoDetailClient from "./DojoDetailClient";

interface DojoResponse {
  dojoLocation?: {
    id: string;
    name: string;
    address?: string;
    city?: string;
    country?: string;
    description?: string;
    coverImage?: string;
  };
}

const DOJO_QUERY = `
  query DojoForMetadata($id: ID!) {
    dojoLocation(id: $id) {
      id
      name
      address
      city
      country
      description
      coverImage
    }
  }
`;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = await fetchGraphQL<DojoResponse>(DOJO_QUERY, { id });
  const dojo = data?.dojoLocation;

  if (!dojo) {
    return {
      title: "Dojo Location",
      alternates: { canonical: `/dojos/${id}` },
    };
  }

  const title = `${dojo.name} | Karate Dojo in ${dojo.city || "Kenya"}`;
  const description =
    dojo.description ||
    `Train Shotokan karate at ${dojo.name} in ${dojo.city || "Kenya"}${dojo.country ? `, ${dojo.country}` : ""}. Kids and adult classes with certified HDKI Kenya instructors.`;

  return {
    title,
    description,
    alternates: { canonical: `/dojos/${dojo.id}` },
    openGraph: { url: `/dojos/${dojo.id}`, title, description, images: dojo.coverImage ? [dojo.coverImage] : undefined },
  };
}

export default async function DojoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetchGraphQL<DojoResponse>(DOJO_QUERY, { id });
  const dojo = data?.dojoLocation;

  return (
    <>
      {dojo && (
        <JsonLd
          data={dojoSchema({
            id: dojo.id,
            name: dojo.name,
            address: dojo.address,
            city: dojo.city,
            country: dojo.country,
            description: dojo.description,
            coverImage: dojo.coverImage,
          })}
        />
      )}
      <DojoDetailClient />
    </>
  );
}
