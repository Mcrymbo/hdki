"use client";

import { useQuery } from '@apollo/client';
import { GET_DOJO_LOCATIONS } from '@/lib/graphql/queries';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { MapPin, Globe2, ExternalLink } from 'lucide-react';

export default function DojosPage() {
  const { data, loading, error } = useQuery(GET_DOJO_LOCATIONS);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hdki-red mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dojos...</p>
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
            <p className="text-red-600 mb-4">Error loading dojos: {error.message}</p>
            <button onClick={() => window.location.reload()} className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300">Try Again</button>
          </div>
        </div>
      </Layout>
    );
  }

  const dojos = data?.dojoLocations || [];

  return (
    <Layout>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Dojo Locations</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Find HDKI Kenya dojos across cities and countries.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {dojos.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-light text-gray-900 mb-4">No Dojos Found</h3>
              <p className="text-gray-600">Check back later for new locations.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dojos.map((dojo: any) => (
                <div key={dojo.id} className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    {dojo.coverImage ? (
                      <img src={dojo.coverImage} alt={dojo.name} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    ) : (
                      <div className="w-full h-48 bg-gray-100" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 shadow">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-hdki-red" />{dojo.city}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 shadow">
                        <Globe2 className="h-3.5 w-3.5 mr-1 text-hdki-red" />{dojo.country}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-hdki-red transition-colors">{dojo.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{dojo.address}</p>
                    {dojo.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{dojo.description}</p>
                    )}
                    <div className="flex gap-3">
                      <Link href={`/dojos/${dojo.id}`} className="flex-1 bg-hdki-red hover:bg-hdki-red-dark text-white px-4 py-2 text-sm font-medium text-center rounded transition-colors duration-200">View Details</Link>
                      {dojo.mapLink && (
                        <a href={dojo.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 hover:border-hdki-red hover:text-hdki-red rounded transition-colors">
                          Map <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      )}
                    </div>
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


