import type { Metadata } from "next";
import GalleryPageClient from "./GalleryPageClient";

export const metadata: Metadata = {
  title: "Karate Training Gallery",
  description:
    "Photos from HDKI Kenya's Shotokan karate training sessions, gradings, tournaments, and karate adventures across Kenya.",
  alternates: { canonical: "/gallery" },
  openGraph: { url: "/gallery", title: "Karate Training Gallery | HDKI Kenya" },
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}
