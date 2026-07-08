import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { itemListSchema } from "@/lib/seo/schema";
import { fetchGraphQL } from "@/lib/seo/fetchGraphQL";
import InstructorsPageClient from "./InstructorsPageClient";

export const metadata: Metadata = {
  title: "Karate Instructors in Kenya",
  description:
    "Meet HDKI Kenya's certified Shotokan karate instructors and Sensei, teaching traditional kihon, kata, and kumite at dojos across Kenya.",
  alternates: { canonical: "/instructors" },
  openGraph: { url: "/instructors", title: "Karate Instructors in Kenya | HDKI Kenya" },
};

interface InstructorListResponse {
  instructors?: { id: string; name: string }[];
}

const INSTRUCTOR_LIST_QUERY = `
  query InstructorListForSchema {
    instructors { id name }
  }
`;

export default async function InstructorsPage() {
  const data = await fetchGraphQL<InstructorListResponse>(INSTRUCTOR_LIST_QUERY, {});
  const instructors = data?.instructors || [];

  return (
    <>
      {instructors.length > 0 && (
        <JsonLd
          data={itemListSchema(
            "HDKI Kenya Karate Instructors",
            instructors.map((i) => ({ name: i.name, path: `/instructors/${i.id}` }))
          )}
        />
      )}
      <InstructorsPageClient />
    </>
  );
}
