import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { newsArticleSchema } from "@/lib/seo/schema";
import { fetchGraphQL } from "@/lib/seo/fetchGraphQL";
import NewsDetailClient from "./NewsDetailClient";

interface NewsResponse {
  newsArticle?: {
    id: string;
    title: string;
    content?: string;
    coverImage?: string;
    author?: { username?: string; firstName?: string; lastName?: string };
    publishedAt: string;
    updatedAt?: string;
  };
}

const NEWS_QUERY = `
  query NewsArticleForMetadata($id: ID!) {
    newsArticle(id: $id) {
      id
      title
      content
      coverImage
      author { username firstName lastName }
      publishedAt
      updatedAt
    }
  }
`;

function authorName(author?: { username?: string; firstName?: string; lastName?: string }) {
  if (!author) return "HDKI Kenya";
  return author.firstName && author.lastName ? `${author.firstName} ${author.lastName}` : author.username || "HDKI Kenya";
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = await fetchGraphQL<NewsResponse>(NEWS_QUERY, { id });
  const article = data?.newsArticle;

  if (!article) {
    return { title: "News Article", alternates: { canonical: `/activities/news/${id}` } };
  }

  const description = article.content ? `${article.content.slice(0, 155).trim()}...` : `Latest karate news from HDKI Kenya: ${article.title}.`;

  return {
    title: article.title,
    description,
    alternates: { canonical: `/activities/news/${article.id}` },
    openGraph: {
      url: `/activities/news/${article.id}`,
      title: article.title,
      description,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      images: article.coverImage ? [article.coverImage] : undefined,
    },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetchGraphQL<NewsResponse>(NEWS_QUERY, { id });
  const article = data?.newsArticle;

  return (
    <>
      {article && (
        <JsonLd
          data={newsArticleSchema({
            id: article.id,
            title: article.title,
            content: article.content,
            coverImage: article.coverImage,
            authorName: authorName(article.author),
            publishedAt: article.publishedAt,
            updatedAt: article.updatedAt,
            path: `/activities/news/${article.id}`,
          })}
        />
      )}
      <NewsDetailClient />
    </>
  );
}
