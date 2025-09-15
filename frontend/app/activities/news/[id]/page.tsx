"use client";

import { useQuery } from '@apollo/client';
import { GET_NEWS_ARTICLE } from '@/lib/graphql/queries';
import Link from "next/link";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data, loading, error } = useQuery(GET_NEWS_ARTICLE, {
    variables: { id },
    skip: !id,
  });

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-hdki-red border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading article...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !data?.newsArticle) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">
              {error ? error.message : "The article you're looking for doesn't exist."}
            </p>
            <Link
              href="/activities/news"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300"
            >
              Back to News
            </Link>
          </div>
        </div>
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
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <Layout>
      {/* Back Navigation */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/activities/news"
            className="text-hdki-red hover:text-hdki-red-dark inline-flex items-center text-sm font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
              {article?.title}
            </h1>
            
            <div className="flex items-center justify-center text-gray-600 mb-6">
              <div className="flex items-center mr-6">
                <Calendar className="h-5 w-5 mr-2" />
                <time dateTime={article?.publishedAt}>
                  {new Date(article?.publishedAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>
                  {article?.author?.firstName && article?.author?.lastName
                    ? `${article?.author.firstName} ${article?.author.lastName}`
                    : article?.author?.username || 'HDKI Kenya'
                  }
                </span>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center text-hdki-red hover:text-hdki-red-dark font-medium transition-colors duration-200"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Article
            </button>
          </div>

          {article?.coverImage && (
            <div className="mb-8">
              <img
                src={article?.coverImage}
                alt={article?.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: article?.content?.replace(/\n/g, '<br />') || '' 
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              More News Articles
            </h2>
            <p className="text-lg text-gray-600">
              Explore more stories from HDKI Kenya
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/activities/news"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-3 font-semibold transition-colors duration-300"
            >
              View All News
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}