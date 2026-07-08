"use client";

import { useQuery } from "@apollo/client";
import { GET_NEWS_ARTICLE } from "@/lib/graphql/queries";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useToast } from "@/components/admin/ui/Toast";
import { Calendar, User, ArrowLeft, ArrowRight, Share2 } from "lucide-react";

function authorName(author?: { username?: string; firstName?: string; lastName?: string }) {
  if (!author) return "HDKI Kenya";
  return author.firstName && author.lastName ? `${author.firstName} ${author.lastName}` : author.username || "HDKI Kenya";
}

export default function NewsDetailClient() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { data, loading, error, refetch } = useQuery(GET_NEWS_ARTICLE, { variables: { id }, skip: !id });

  if (loading) {
    return (
      <Layout>
        <LoadingState label="Loading article..." />
      </Layout>
    );
  }

  if (error || !data?.newsArticle) {
    return (
      <Layout>
        <ErrorState
          message={error ? error.message : "The article you're looking for doesn't exist."}
          onRetry={error ? () => refetch() : undefined}
        />
      </Layout>
    );
  }

  const article = data.newsArticle;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.content?.substring(0, 200),
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast("Link copied to clipboard!", "success");
    }
  };

  const publishedLabel = new Date(article.publishedAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Layout>
      <Breadcrumbs items={[{ name: "News", path: "/activities/news" }, { name: article.title, path: `/activities/news/${article.id}` }]} />
      <section className="bg-hdki-gray-light py-6">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/activities/news"
            className="inline-flex items-center text-sm font-medium text-hdki-red hover:text-hdki-red-dark"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Link>
        </div>
      </section>

      {article.coverImage ? (
        <section className="relative flex h-80 items-end overflow-hidden bg-hdki-ink md:h-96">
          <Image src={article.coverImage} alt={article.title} fill priority unoptimized sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-8 sm:px-6 lg:px-8">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-hdki-red">
              <span className="h-px w-6 bg-hdki-red" />
              {publishedLabel}
            </span>
            <h1 className="font-display text-3xl font-medium text-white sm:text-4xl md:text-5xl">{article.title}</h1>
          </div>
        </section>
      ) : (
        <section className="bg-white pt-14 md:pt-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <span className="mb-3 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-hdki-red">
              <span className="h-px w-6 bg-hdki-red" />
              {publishedLabel}
            </span>
            <h1 className="font-display text-4xl font-medium text-hdki-ink sm:text-5xl">{article.title}</h1>
          </div>
        </section>
      )}

      <section className="border-b border-hdki-border bg-white py-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 px-4 text-center sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 text-sm text-hdki-gray-mid">
            <User className="h-4 w-4 text-hdki-red" />
            {authorName(article.author)}
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-hdki-gray-mid sm:hidden">
            <Calendar className="h-4 w-4 text-hdki-red" />
            {publishedLabel}
          </span>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-sm font-medium text-hdki-red hover:text-hdki-red-dark"
          >
            <Share2 className="h-4 w-4" />
            Share Article
          </button>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div
              className="text-lg leading-loose text-hdki-ink [&_br]:content-['']"
              dangerouslySetInnerHTML={{ __html: article.content?.replace(/\n/g, "<br /><br />") || "" }}
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-hdki-gray-light py-14 text-center md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 font-display text-3xl font-medium text-hdki-ink">More News Articles</h2>
          <p className="mb-8 text-lg text-hdki-gray-mid">Explore more stories from HDKI Kenya</p>
          <Button href="/activities/news" variant="primary" size="md" icon={<ArrowRight />}>
            View All News
          </Button>
        </div>
      </section>
    </Layout>
  );
}
