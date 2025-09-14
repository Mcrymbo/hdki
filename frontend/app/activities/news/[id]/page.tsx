import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import { Calendar, User, Tag, Eye, ArrowRight, ArrowLeft, Share2 } from "lucide-react";
import { NewsArticle } from "@/shared/mockData";

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/news/${id}`);
        if (!response.ok) {
          throw new Error("Article not found");
        }
        const articleData = await response.json();
        setArticle(articleData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

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

  if (error || !article) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">{error || "The article you're looking for doesn't exist."}</p>
            <Link
              href="/activities/news"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300 inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tournament Results": return "bg-yellow-500";
      case "Program Launch": return "bg-green-500";
      case "Adventure Report": return "bg-blue-500";
      case "Community Impact": return "bg-purple-500";
      case "International Exchange": return "bg-red-500";
      case "Cultural Exchange": return "bg-indigo-500";
      default: return "bg-gray-500";
    }
  };

  const shareArticle = (platform: string) => {
    const url = window.location.href;
    const title = article.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        // You could add a toast notification here
        break;
    }
  };

  return (
    <Layout>
      {/* Back Navigation */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category and Status */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`${getCategoryColor(article.category)} text-white px-4 py-2 text-sm font-semibold rounded-full`}>
              {article.category}
            </span>
            {article.featured && (
              <span className="bg-hdki-red text-white px-4 py-2 text-sm font-semibold rounded-full">
                Featured
              </span>
            )}
            <span className="bg-gray-100 text-gray-700 px-4 py-2 text-sm font-semibold rounded-full">
              {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{new Date(article.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{article.author}</span>
            </div>
            
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              <span>{article.views.toLocaleString()} views</span>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
            <span className="text-gray-600 font-medium">Share this article:</span>
            <div className="flex gap-2">
              <button 
                onClick={() => shareArticle('facebook')}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors"
                title="Share on Facebook"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button 
                onClick={() => shareArticle('twitter')}
                className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded transition-colors"
                title="Share on Twitter"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button 
                onClick={() => shareArticle('linkedin')}
                className="bg-blue-800 hover:bg-blue-900 text-white p-2 rounded transition-colors"
                title="Share on LinkedIn"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button 
                onClick={() => shareArticle('copy')}
                className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded transition-colors"
                title="Copy link"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Excerpt */}
          <div className="text-xl text-gray-700 leading-relaxed mb-8 p-6 bg-gray-50 rounded-lg border-l-4 border-hdki-red">
            {article.excerpt}
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {/* Article Gallery */}
          {article.gallery && article.gallery.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-6">Photo Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {article.gallery.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={image}
                      alt={`${article.title} gallery ${index + 1}`}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 text-sm rounded-full transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-gray-600">
                  Published on {new Date(article.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                {article.updatedAt !== article.createdAt && (
                  <p className="text-gray-500 text-sm">
                    Last updated: {new Date(article.updatedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-gray-600 text-sm">
                  {article.views.toLocaleString()} views
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => shareArticle('facebook')}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => shareArticle('twitter')}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-center text-gray-900 mb-12">
            More News & Updates
          </h2>
          <div className="text-center">
            <Link
              href="/activities/news"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-4 text-lg font-semibold transition-colors duration-300 inline-flex items-center group"
            >
              View All News
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-hdki-gray-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light mb-6">Stay Updated</h2>
          <p className="text-xl mb-8 text-gray-300">
            Subscribe to our newsletter to receive the latest news and updates from HDKI Kenya.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 text-gray-900 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-hdki-red focus:border-transparent"
              />
              <button className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold rounded-r-lg transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
