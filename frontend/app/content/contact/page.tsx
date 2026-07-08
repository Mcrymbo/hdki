import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema, organizationSchema } from "@/lib/seo/schema";
import { CONTACT_FAQS } from "@/lib/content/contactFaq";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us | Karate Classes in Nairobi, Kenya",
  description:
    "Get in touch with HDKI Kenya to start Shotokan karate training. Visit our Nairobi headquarters, call, or send a message to book a trial class at a dojo near you.",
  alternates: { canonical: "/content/contact" },
  openGraph: { url: "/content/contact", title: "Contact HDKI Kenya | Karate Classes in Nairobi, Kenya" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          faqSchema(CONTACT_FAQS.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <ContactPageClient />
    </>
  );
}
