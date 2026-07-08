import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { itemListSchema } from "@/lib/seo/schema";
import { fetchGraphQL } from "@/lib/seo/fetchGraphQL";
import NewsPageClient from "./NewsPageClient";

export const metadata: Metadata = {
  title: "Karate News in Kenya",
  description:
    "Read the latest news from HDKI Kenya — tournament results, grading ceremonies, new dojo openings, and karate community updates from across Kenya.",
  alternates: { canonical: "/activities/news" },
  openGraph: { url: "/activities/news", title: "Karate News in Kenya | HDKI Kenya" },
};

interface NewsListResponse {
  news?: { id: string; title: string; isPublished?: boolean }[];
}

const NEWS_LIST_QUERY = `
  query NewsListForSchema {
    news { id title isPublished }
  }
`;

export default async function NewsPage() {
  const data = await fetchGraphQL<NewsListResponse>(NEWS_LIST_QUERY, {});
  const news = (data?.news || []).filter((n) => n.isPublished !== false);

  return (
    <>
      {news.length > 0 && (
        <JsonLd
          data={itemListSchema(
            "HDKI Kenya News",
            news.map((n) => ({ name: n.title, path: `/activities/news/${n.id}` }))
          )}
        />
      )}
      <NewsPageClient />
    </>
  );
}
