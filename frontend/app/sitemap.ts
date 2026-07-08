import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/config";
import { fetchGraphQL } from "@/lib/seo/fetchGraphQL";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/content/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/dojos", priority: 0.9, changeFrequency: "weekly" },
  { path: "/instructors", priority: 0.7, changeFrequency: "monthly" },
  { path: "/adventures", priority: 0.8, changeFrequency: "weekly" },
  { path: "/activities/events", priority: 0.8, changeFrequency: "daily" },
  { path: "/activities/news", priority: 0.7, changeFrequency: "daily" },
  { path: "/gallery", priority: 0.5, changeFrequency: "weekly" },
  { path: "/content/contact", priority: 0.6, changeFrequency: "yearly" },
];

interface ListResponse {
  dojoLocations?: { id: string }[];
  instructors?: { id: string }[];
  karateAdventures?: { id: string; endDate?: string }[];
  events?: { id: string; updatedAt?: string }[];
  news?: { id: string; updatedAt?: string; isPublished?: boolean }[];
}

const SITEMAP_QUERY = `
  query SitemapData {
    dojoLocations { id }
    instructors { id }
    karateAdventures { id endDate }
    events { id updatedAt }
    news { id updatedAt isPublished }
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const data = await fetchGraphQL<ListResponse>(SITEMAP_QUERY, {});
  if (!data) return staticEntries;

  const dynamicEntries: MetadataRoute.Sitemap = [
    ...(data.dojoLocations || []).map((d) => ({
      url: `${SITE_URL}/dojos/${d.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...(data.instructors || []).map((i) => ({
      url: `${SITE_URL}/instructors/${i.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...(data.karateAdventures || []).map((a) => ({
      url: `${SITE_URL}/adventures/${a.id}`,
      lastModified: a.endDate ? new Date(a.endDate) : now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...(data.events || []).map((e) => ({
      url: `${SITE_URL}/activities/events/${e.id}`,
      lastModified: e.updatedAt ? new Date(e.updatedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...(data.news || [])
      .filter((n) => n.isPublished !== false)
      .map((n) => ({
        url: `${SITE_URL}/activities/news/${n.id}`,
        lastModified: n.updatedAt ? new Date(n.updatedAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ];

  return [...staticEntries, ...dynamicEntries];
}
