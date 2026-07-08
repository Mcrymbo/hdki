/**
 * Single source of truth for site-wide SEO/NAP facts. Every metadata export
 * and JSON-LD builder should read from here instead of hardcoding strings,
 * so the domain, address, and phone stay consistent across the site.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://hdkikenya.co.ke").replace(/\/$/, "");

export const SITE_NAME = "HDKI Kenya";

export const SITE_TITLE_DEFAULT = "HDKI Kenya | Shotokan Karate Classes & Dojos in Nairobi & Kenya";

export const SITE_DESCRIPTION =
  "HDKI Kenya is the official Kenyan affiliate of HDKI International, teaching traditional Shotokan karate in Nairobi, Kiambu, and dojos nationwide. Kids and adult karate classes, self-defence training, gradings, and tournaments led by certified Sensei.";

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: "HDKI Kenya (Hombu Dojo Karate International Kenya)",
  foundingDate: "2023-01-01",
  email: "info@hdkikenya.co.ke",
  telephone: "+254700123456",
  telephoneDisplay: "+254 700 123 456",
  streetAddress: "Valley Road, Upper Hill",
  addressLocality: "Nairobi",
  addressRegion: "Nairobi County",
  postalCode: "00100",
  addressCountry: "KE",
  // Coordinates match the Google Maps embed on the Contact page (Valley Road, Nairobi).
  latitude: -1.2884574,
  longitude: 36.7949373,
  parentOrganization: {
    name: "HDKI International",
    url: "https://hdki.org/",
  },
} as const;

/**
 * Real, working profile URLs. The current Footer links to "#" placeholders —
 * replace these once HDKI Kenya's actual social profiles are confirmed, then
 * wire them into both Footer.tsx and the Organization JSON-LD sameAs array.
 */
export const SOCIAL_PROFILES: string[] = [
  // "https://www.facebook.com/hdkikenya",
  // "https://www.instagram.com/hdkikenya",
];

export const KEYWORDS_CORE = [
  "karate Kenya",
  "Shotokan karate Kenya",
  "karate classes Nairobi",
  "karate dojo Kenya",
  "martial arts Kenya",
  "self defence classes Kenya",
  "HDKI Kenya",
  "karate lessons Kenya",
  "kids karate Kenya",
  "adult karate Kenya",
];

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
