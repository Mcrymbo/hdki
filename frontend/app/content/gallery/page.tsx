"use client";

import Layout from "@/components/Layout";
import Link from "next/link";
import { Search, Filter, Play, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { GalleryItem } from "@/shared/mockData";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [newItemsAnimation, setNewItemsAnimation] = useState<number[]>([]);

  const categories = ["All", "Training", "Adventures", "Competitions", "Culture"];

  // Initial load
  useEffect(() => {
    loadInitialItems();
  }, []);

  // Filter change
  useEffect(() => {
    if (galleryItems.length > 0) {
      loadInitialItems();
    }
  }, [activeFilter, searchTerm]);

  const loadInitialItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: "12",
        offset: "0"
      });
      
      if (activeFilter !== "All") {
        params.append("category", activeFilter);
      }
      
      if (searchTerm) {
        params.append("search", searchTerm);
      }

      const response = await fetch(`/api/gallery?${params}`);
      const data = await response.json();
      
      setGalleryItems(data.items);
      setHasMore(data.hasMore);
      
      // Trigger animation for initial items
      const initialIndexes = data.items.map((_: any, index: number) => index);
      setNewItemsAnimation(initialIndexes);
      setTimeout(() => setNewItemsAnimation([]), 1000);
      
    } catch (error) {
      console.error("Failed to load gallery items:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreItems = async () => {
    if (!hasMore || loadingMore) return;
    
    setLoadingMore(true);
    try {
      const lastItem = galleryItems[galleryItems.length - 1];
      const response = await fetch('/api/gallery/load-more', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lastId: lastItem?.id,
          category: activeFilter !== "All" ? activeFilter : undefined,
          limit: 12
        }),
      });

      const data = await response.json();
      
      if (data.items.length > 0) {
        const currentLength = galleryItems.length;
        setGalleryItems(prev => [...prev, ...data.items]);
        setHasMore(data.hasMore);
        
        // Trigger slide-in animation for new items
        const newIndexes = data.items.map((_: any, index: number) => currentLength + index);
        setNewItemsAnimation(newIndexes);
        setTimeout(() => setNewItemsAnimation([]), 1000);
      }
    } catch (error) {
      console.error("Failed to load more items:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is automatically triggered by useEffect
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-hdki-red border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading gallery...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-black/70 to-black/50 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-light tracking-wide mb-6">
            Photo Gallery
          </h1>
          <p className="text-xl md:text-2xl font-light">
            Capturing Moments of Excellence and Adventure
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-8">
            Our Visual Journey
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Explore our collection of photographs and videos that capture the spirit, dedication, and adventures 
            that define HDKI Kenya. From intense training sessions and tournament victories to breathtaking 
            adventure experiences across Kenya's diverse landscapes.
          </p>
          <p className="text-lg text-gray-600">
            Each image tells a story of personal growth, cultural exchange, and the unique fusion 
            of traditional martial arts with Kenya's natural beauty.
          </p>
        </div>
      </section>

      {/* Filter and Search */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-semibold mr-4">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeFilter === category
                        ? "bg-hdki-red text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {category}
                    <span className="ml-2 text-sm">
                      ({category === "All" ? galleryItems.length : galleryItems.filter(item => item.category === category).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search gallery..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hdki-red focus:border-transparent"
              />
            </form>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  newItemsAnimation.includes(index) 
                    ? 'animate-slide-in-up opacity-0' 
                    : 'opacity-100'
                }`}
                style={{
                  animationDelay: newItemsAnimation.includes(index) ? `${(index % 12) * 100}ms` : '0ms'
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Video Indicator */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-50 rounded-full p-4">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-hdki-red text-white px-2 py-1 text-xs font-semibold rounded">
                      {item.category}
                    </span>
                  </div>
                  
                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-yellow-500 text-white px-2 py-1 text-xs font-semibold rounded">
                        Featured
                      </span>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-hdki-red transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                    {item.photographer && (
                      <span>by {item.photographer}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-12">
              <button 
                onClick={loadMoreItems}
                disabled={loadingMore}
                className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-3 font-semibold transition-colors duration-300 inline-flex items-center group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Loading More...
                  </>
                ) : (
                  <>
                    Load More Images
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          )}
          
          {/* No more items message */}
          {!hasMore && galleryItems.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-gray-600">You've reached the end of our gallery!</p>
            </div>
          )}
          
          {/* No items found */}
          {galleryItems.length === 0 && !loading && (
            <div className="text-center mt-12">
              <p className="text-gray-600 text-xl mb-4">No images found</p>
              <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Photo Stats */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">
            Gallery Statistics
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-hdki-red mb-2">500+</div>
              <div className="text-gray-600">Training Photos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-hdki-red mb-2">200+</div>
              <div className="text-gray-600">Adventure Images</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-hdki-red mb-2">150+</div>
              <div className="text-gray-600">Competition Shots</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-hdki-red mb-2">50+</div>
              <div className="text-gray-600">Video Content</div>
            </div>
          </div>
        </div>
      </section>

      {/* Submit Photos */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-8">Share Your Photos</h2>
          <p className="text-xl text-gray-700 mb-8">
            Have photos from HDKI Kenya events or adventures? We'd love to feature them in our gallery! 
            Share your memories with the community.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-6 text-hdki-red">Submission Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-3">Photo Requirements:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                    High resolution (minimum 1920x1080)
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                    Clear, well-lit images
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                    HDKI Kenya events or activities
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                    Consent from all recognizable people
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">How to Submit:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                    Email photos to gallery@hdkikenya.org
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                    Include event details and date
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                    Provide photo credits/attribution
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-hdki-red rounded-full mt-2 mr-3 flex-shrink-0" />
                    Grant permission for website use
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8">
              <Link
                href="/content/contact"
                className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-3 font-semibold transition-colors duration-300 inline-flex items-center group"
              >
                Submit Your Photos
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hdki-gray-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light mb-6">Create Your Own Adventure Story</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join us for upcoming events and adventures. Be part of the next collection of amazing 
            photographs and memories that showcase the HDKI Kenya experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/content/karate-adventures"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-4 text-lg font-semibold transition-colors duration-300 inline-flex items-center justify-center group"
            >
              Join Our Adventures
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/content/events"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              View Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes slide-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </Layout>
  );
}
