import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { instructorSchema } from "@/lib/seo/schema";
import { fetchGraphQL } from "@/lib/seo/fetchGraphQL";
import InstructorDetailClient from "./InstructorDetailClient";

interface InstructorResponse {
  instructor?: {
    id: string;
    name: string;
    rank?: string;
    bio?: string;
    photo?: string;
    dojoLocation?: { name: string };
  };
}

const INSTRUCTOR_QUERY = `
  query InstructorForMetadata($id: ID!) {
    instructor(id: $id) {
      id
      name
      rank
      bio
      photo
      dojoLocation { name }
    }
  }
`;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = await fetchGraphQL<InstructorResponse>(INSTRUCTOR_QUERY, { id });
  const ins = data?.instructor;

  if (!ins) {
    return { title: "Instructor", alternates: { canonical: `/instructors/${id}` } };
  }

  const title = ins.rank ? `${ins.name} — ${ins.rank}` : ins.name;
  const description =
    ins.bio ||
    `${ins.name} is a certified Shotokan karate instructor with HDKI Kenya${ins.dojoLocation ? `, teaching at ${ins.dojoLocation.name}` : ""}.`;

  return {
    title,
    description,
    alternates: { canonical: `/instructors/${ins.id}` },
    openGraph: { url: `/instructors/${ins.id}`, title, description, images: ins.photo ? [ins.photo] : undefined },
  };
}

export default async function InstructorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetchGraphQL<InstructorResponse>(INSTRUCTOR_QUERY, { id });
  const ins = data?.instructor;

  return (
    <>
      {ins && (
        <JsonLd
          data={instructorSchema({
            id: ins.id,
            name: ins.name,
            rank: ins.rank,
            bio: ins.bio,
            photo: ins.photo,
            dojoName: ins.dojoLocation?.name,
          })}
        />
      )}
      <InstructorDetailClient />
    </>
  );
}
