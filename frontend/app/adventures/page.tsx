"use client";

import { useQuery } from '@apollo/client';
import { GET_KARATE_ADVENTURES } from '@/lib/graphql/queries';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';

export default function AdventuresPage() {
  const { data, loading, error } = useQuery(GET_KARATE_ADVENTURES);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hdki-red mx-auto mb-4"></div>
            <p className="text-gray-600">Loading adventures...</p>
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
            <p className="text-red-600 mb-4">Error loading adventures: {error.message}</p>
            <button onClick={() => window.location.reload()} className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300">Try Again</button>
          </div>
        </div>
      </Layout>
    );
  }

  const adventures = data?.karateAdventures || [];

  return (
    <Layout>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Karate Adventures</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Upcoming and past adventure programs.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {adventures.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-light text-gray-900 mb-4">No Adventures</h3>
              <p className="text-gray-600">Check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {adventures.map((adv: any) => (
                <div key={adv.id} className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    {adv.coverImage ? (
                      <img src={adv.coverImage} alt={adv.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    ) : (
                      <div className="w-full h-48 bg-gray-100" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-hdki-red transition-colors">{adv.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-2 text-hdki-red" /> {adv.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Calendar className="h-4 w-4 mr-2 text-hdki-red" />
                      {new Date(adv.startDate).toLocaleDateString()} - {new Date(adv.endDate).toLocaleDateString()}
                    </div>
                    <p className="text-gray-600 line-clamp-3 mb-4">{adv.description}</p>
                    <Link href={`/adventures/${adv.id}`} className="inline-flex items-center bg-hdki-red hover:bg-hdki-red-dark text-white px-4 py-2 text-sm font-medium rounded transition-colors duration-200">View Details</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}


