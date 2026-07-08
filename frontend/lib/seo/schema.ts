import { absoluteUrl, ORGANIZATION, SITE_NAME, SITE_URL } from "./config";

/** Minimal JSON-LD value shape — avoids pulling in a schema-dts dependency for this. */
export type JsonLdObject = Record<string, unknown>;

const context = "https://schema.org";

export function organizationSchema(): JsonLdObject {
  return {
    "@context": context,
    "@type": ["SportsOrganization", "LocalBusiness"],
    "@id": absoluteUrl("/#organization"),
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    alternateName: "HDKI Kenya Shotokan Karate",
    url: SITE_URL,
    logo: absoluteUrl("/android-chrome-512x512.png"),
    image: absoluteUrl("/opengraph-image"),
    description:
      "HDKI Kenya teaches traditional Shotokan karate to children and adults across Nairobi, Kiambu, and dojos nationwide, as the official Kenyan affiliate of HDKI International.",
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.telephone,
    foundingDate: ORGANIZATION.foundingDate,
    sport: "Karate",
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION.streetAddress,
      addressLocality: ORGANIZATION.addressLocality,
      addressRegion: ORGANIZATION.addressRegion,
      postalCode: ORGANIZATION.postalCode,
      addressCountry: ORGANIZATION.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: ORGANIZATION.latitude,
      longitude: ORGANIZATION.longitude,
    },
    areaServed: {
      "@type": "Country",
      name: "Kenya",
    },
    memberOf: {
      "@type": "SportsOrganization",
      name: ORGANIZATION.parentOrganization.name,
      url: ORGANIZATION.parentOrganization.url,
    },
    sameAs: [ORGANIZATION.parentOrganization.url],
  };
}

export function websiteSchema(): JsonLdObject {
  return {
    "@context": context,
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: SITE_URL,
    name: SITE_NAME,
    description:
      "Official website of HDKI Kenya — traditional Shotokan karate classes, dojo locations, instructors, events, and grading in Kenya.",
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: "en-KE",
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": context,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FaqItem[]): JsonLdObject {
  return {
    "@context": context,
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export interface DojoForSchema {
  id: string;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  description?: string;
  coverImage?: string;
}

export function dojoSchema(dojo: DojoForSchema): JsonLdObject {
  return {
    "@context": context,
    "@type": ["SportsActivityLocation", "LocalBusiness"],
    "@id": absoluteUrl(`/dojos/${dojo.id}#dojo`),
    name: `${dojo.name} — HDKI Kenya Karate Dojo`,
    description: dojo.description || `HDKI Kenya Shotokan karate dojo in ${dojo.city || "Kenya"}.`,
    url: absoluteUrl(`/dojos/${dojo.id}`),
    image: dojo.coverImage,
    telephone: ORGANIZATION.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: dojo.address,
      addressLocality: dojo.city,
      addressCountry: dojo.country || "Kenya",
    },
    sport: "Karate",
    parentOrganization: { "@id": absoluteUrl("/#organization") },
  };
}

export interface PersonForSchema {
  id: string;
  name: string;
  rank?: string;
  bio?: string;
  photo?: string;
  dojoName?: string;
}

export function instructorSchema(person: PersonForSchema): JsonLdObject {
  return {
    "@context": context,
    "@type": "Person",
    "@id": absoluteUrl(`/instructors/${person.id}#person`),
    name: person.name,
    jobTitle: person.rank ? `Karate Instructor — ${person.rank}` : "Karate Instructor",
    description: person.bio,
    image: person.photo,
    url: absoluteUrl(`/instructors/${person.id}`),
    worksFor: { "@id": absoluteUrl("/#organization") },
    memberOf: { "@id": absoluteUrl("/#organization") },
    knowsAbout: ["Shotokan Karate", "Martial Arts Instruction", "Self-Defence"],
    ...(person.dojoName ? { affiliation: person.dojoName } : {}),
  };
}

export interface EventForSchema {
  id: string;
  title: string;
  description?: string;
  date: string;
  location?: string;
  coverImage?: string;
  fee?: number;
  path: string;
  kind?: "Event" | "SportsEvent" | "ExerciseEvent";
}

export function eventSchema(event: EventForSchema): JsonLdObject {
  return {
    "@context": context,
    "@type": event.kind || "SportsEvent",
    name: event.title,
    description: event.description,
    startDate: event.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: event.coverImage ? [event.coverImage] : undefined,
    url: absoluteUrl(event.path),
    location: {
      "@type": "Place",
      name: event.location || ORGANIZATION.addressLocality,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.location || ORGANIZATION.addressLocality,
        addressCountry: ORGANIZATION.addressCountry,
      },
    },
    organizer: { "@id": absoluteUrl("/#organization") },
    offers:
      typeof event.fee === "number"
        ? {
            "@type": "Offer",
            price: event.fee,
            priceCurrency: "KES",
            availability: "https://schema.org/InStock",
            url: absoluteUrl(event.path),
          }
        : undefined,
  };
}

export interface ArticleForSchema {
  id: string;
  title: string;
  content?: string;
  coverImage?: string;
  authorName?: string;
  publishedAt: string;
  updatedAt?: string;
  path: string;
}

export function newsArticleSchema(article: ArticleForSchema): JsonLdObject {
  return {
    "@context": context,
    "@type": "NewsArticle",
    headline: article.title,
    description: article.content ? article.content.slice(0, 200) : undefined,
    image: article.coverImage ? [article.coverImage] : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    url: absoluteUrl(article.path),
    author: {
      "@type": "Person",
      name: article.authorName || SITE_NAME,
    },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: absoluteUrl(article.path),
  };
}

export interface ItemListEntry {
  name: string;
  path: string;
}

export function itemListSchema(name: string, items: ItemListEntry[]): JsonLdObject {
  return {
    "@context": context,
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
