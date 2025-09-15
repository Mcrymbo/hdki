"use client";

import { useQuery } from '@apollo/client';
import { GET_KARATE_ADVENTURE } from '@/lib/graphql/queries';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';

export default function AdventureDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_KARATE_ADVENTURE, { variables: { id }, skip: !id });

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hdki-red mx-auto mb-4"></div>
            <p className="text-gray-600">Loading adventure...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !data?.karateAdventure) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Adventure Not Found</h1>
            <p className="text-gray-600">{error ? error.message : 'The adventure you are looking for does not exist.'}</p>
          </div>
        </div>
      </Layout>
    );
  }

  const adv = data.karateAdventure;

  return (
    <Layout>
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {adv.coverImage && (
            <img src={adv.coverImage} alt={adv.title} className="w-full h-64 object-cover rounded-lg shadow" />
          )}
          <div className="mt-6">
            <h1 className="text-4xl font-light text-gray-900 mb-4">{adv.title}</h1>
            <p className="text-gray-700 mb-2">{adv.location}</p>
            <p className="text-gray-700 mb-4">{new Date(adv.startDate).toLocaleDateString()} - {new Date(adv.endDate).toLocaleDateString()}</p>
            <p className="text-gray-700">
              {adv.description}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}


