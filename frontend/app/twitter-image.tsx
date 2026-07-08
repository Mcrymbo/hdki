import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgImageTemplate } from "@/lib/seo/ogImage";

export const alt = "HDKI Kenya — Shotokan Karate Classes & Dojos in Kenya";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(<OgImageTemplate title="HDKI KENYA" subtitle="Traditional Shotokan Karate in Kenya" />, size);
}
