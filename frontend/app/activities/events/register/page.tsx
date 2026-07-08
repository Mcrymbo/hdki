import type { Metadata } from "next";
import EventRegistrationClient from "./EventRegistrationClient";

// Personalized, auth-gated transactional form — no search intent, keep out of the index.
export const metadata: Metadata = {
  title: "Event Registration",
  robots: { index: false, follow: true },
};

export default function EventRegistrationPage() {
  return <EventRegistrationClient />;
}
