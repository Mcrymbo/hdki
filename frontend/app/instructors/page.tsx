"use client";

import { useQuery } from '@apollo/client';
import { GET_INSTRUCTORS } from '@/lib/graphql/queries';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function InstructorsPage() {
  const { data, loading, error } = useQuery(GET_INSTRUCTORS);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hdki-red mx-auto mb-4"></div>
            <p className="text-gray-600">Loading instructors...</p>
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
            <p className="text-red-600 mb-4">Error loading instructors: {error.message}</p>
            <button onClick={() => window.location.reload()} className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300">Try Again</button>
          </div>
        </div>
      </Layout>
    );
  }

  const instructors = data?.instructors || [];

  return (
    <Layout>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Instructors</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Meet our instructors and their dojos.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {instructors.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-light text-gray-900 mb-4">No Instructors</h3>
              <p className="text-gray-600">Check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructors.map((ins: any) => (
                <Link key={ins.id} href={`/instructors/${ins.id}`} className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  {ins.photo ? (
                    <img src={ins.photo} alt={ins.name} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  ) : (
                    <div className="w-full h-56 bg-gray-100" />
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-hdki-red transition-colors">{ins.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{ins.rank}</p>
                    <p className="text-sm text-gray-600">{ins.dojoLocation?.name} — {ins.dojoLocation?.city}, {ins.dojoLocation?.country}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}


