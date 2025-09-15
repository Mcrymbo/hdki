"use client";

import { useQuery } from '@apollo/client';
import { GET_NEWS } from '@/lib/graphql/queries';
import Layout from "@/components/Layout";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function News() {
  const { data, loading, error } = useQuery(GET_NEWS);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hdki-red mx-auto mb-4"></div>
            <p className="text-gray-600">Loading news...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading news: {error.message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const newsArticles = data?.news || [];

  return (
    <Layout>
      {/* Header */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              HDKI Kenya News
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest news, achievements, and developments from HDKI Kenya. 
              From tournament victories to new programs and community initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {newsArticles.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-light text-gray-900 mb-4">No News Articles</h3>
              <p className="text-gray-600">Check back later for the latest updates.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map((article: any) => (
                <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {article.coverImage && (
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      <time dateTime={article.publishedAt}>
                        {new Date(article.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>

                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <User className="h-4 w-4 mr-2" />
                      <span>
                        {article.author?.firstName && article.author?.lastName
                          ? `${article.author.firstName} ${article.author.lastName}`
                          : article.author?.username || 'HDKI Kenya'
                        }
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.content?.substring(0, 150)}...
                    </p>

                    <Link
                      href={`/activities/news/${article.id}`}
                      className="inline-flex items-center text-hdki-red hover:text-hdki-red-dark font-medium transition-colors duration-200"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            Stay Connected with HDKI Kenya
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Don't miss out on the latest news, events, and opportunities. 
            Follow us on social media and subscribe to our newsletter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/activities/events"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-3 font-semibold transition-colors duration-300"
            >
              View Upcoming Events
            </Link>
            <Link
              href="/content/contact"
              className="border-2 border-hdki-red text-hdki-red hover:bg-hdki-red hover:text-white px-8 py-3 font-semibold transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}