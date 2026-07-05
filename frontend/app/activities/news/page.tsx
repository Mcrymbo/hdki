"use client";

import { useQuery } from "@apollo/client";
import { GET_NEWS } from "@/lib/graphql/queries";
import heroImg from "@/assets/images/im5.jpeg";
import Layout from "@/components/Layout";
import HeroSection from "@/components/ui/HeroSection";
import Card, { CardImage, CardBody } from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import { Calendar, User, ArrowRight, Newspaper } from "lucide-react";

interface Author {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  coverImage?: string;
  author?: Author;
  publishedAt: string;
  updatedAt: string;
  isPublished: boolean;
}

function authorName(author?: Author) {
  if (!author) return "HDKI Kenya";
  return author.firstName && author.lastName ? `${author.firstName} ${author.lastName}` : author.username || "HDKI Kenya";
}

export default function News() {
  const { data, loading, error, refetch } = useQuery(GET_NEWS);
  const newsArticles: NewsArticle[] = data?.news || [];

  return (
    <Layout>
      <HeroSection
        image={heroImg}
        eyebrow="Latest Updates"
        title="HDKI Kenya News"
        subtitle="Stay updated with the latest news, achievements, and developments from HDKI Kenya. From tournament victories to new programs and community initiatives."
      />

      <section className="bg-hdki-gray-light py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingState label="Loading news..." />
          ) : error ? (
            <ErrorState message={`Error loading news: ${error.message}`} onRetry={() => refetch()} />
          ) : newsArticles.length === 0 ? (
            <EmptyState icon={<Newspaper />} title="No News Articles" description="Check back later for the latest updates." />
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {newsArticles.map((article, i) => (
                <Reveal key={article.id} delay={(i % 3) * 0.1}>
                  <Card variant="bordered" hover="lift" className="h-full">
                    {article.coverImage ? (
                      <CardImage src={article.coverImage} alt={article.title} ratio="aspect-[4/3]" unoptimized />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center bg-hdki-gray-light text-hdki-gray-mid">
                        <Newspaper className="h-10 w-10" />
                      </div>
                    )}
                    <CardBody>
                      <p className="mb-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-hdki-gray-mid">
                        <Calendar className="h-3.5 w-3.5 text-hdki-red" />
                        {new Date(article.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <h3 className="mb-3 font-display text-xl font-medium text-hdki-ink transition-colors group-hover:text-hdki-red line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="mb-3 flex items-center gap-1.5 text-sm text-hdki-gray-mid">
                        <User className="h-3.5 w-3.5 text-hdki-red" />
                        {authorName(article.author)}
                      </p>
                      <p className="mb-5 line-clamp-3 text-sm text-hdki-gray-mid">
                        {article.content?.substring(0, 150)}...
                      </p>
                      <Button href={`/activities/news/${article.id}`} variant="primary" size="sm" icon={<ArrowRight />}>
                        Read More
                      </Button>
                    </CardBody>
                  </Card>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 font-display text-3xl font-medium text-hdki-ink">Stay Connected with HDKI Kenya</h2>
          <p className="mb-8 text-lg text-hdki-gray-mid">
            Don&apos;t miss out on the latest news, events, and opportunities. Follow us on social media and
            subscribe to our newsletter.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/activities/events" variant="primary" size="md" icon={<ArrowRight />}>
              View Upcoming Events
            </Button>
            <Button href="/content/contact" variant="outline" size="md">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
