"use client";

import { useQuery } from '@apollo/client';
import { GET_DOJO_LOCATION } from '@/lib/graphql/queries';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';

export default function DojoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_DOJO_LOCATION, { variables: { id }, skip: !id });

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hdki-red mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dojo...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !data?.dojoLocation) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Dojo Not Found</h1>
            <p className="text-gray-600">{error ? error.message : 'The dojo you are looking for does not exist.'}</p>
          </div>
        </div>
      </Layout>
    );
  }

  const dojo = data.dojoLocation;

  return (
    <Layout>
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {dojo.coverImage && (
            <img src={dojo.coverImage} alt={dojo.name} className="w-full h-64 object-cover rounded-lg shadow" />
          )}
          <div className="mt-6">
            <h1 className="text-4xl font-light text-gray-900 mb-4">{dojo.name}</h1>
            <p className="text-gray-700 mb-2">{dojo.address}</p>
            <p className="text-gray-700 mb-4">{dojo.city}, {dojo.country}</p>
            <p className="text-gray-700">{dojo.description}</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Instructors</h2>
          {dojo.instructors.length === 0 ? (
            <p className="text-gray-600">No instructors listed.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dojo.instructors.map((ins: any) => (
                <div key={ins.id} className="bg-white rounded-lg shadow p-6">
                  {ins.photo && <img src={ins.photo} alt={ins.name} className="w-full h-48 object-cover rounded-md mb-4" />}
                  <h3 className="text-lg font-semibold text-gray-900">{ins.name}</h3>
                  <p className="text-sm text-gray-600">{ins.rank}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}


