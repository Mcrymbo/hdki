"use client";

import { useQuery } from '@apollo/client';
import { GET_INSTRUCTOR } from '@/lib/graphql/queries';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { MapPin, ArrowLeft } from 'lucide-react';

export default function InstructorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_INSTRUCTOR, { variables: { id }, skip: !id });

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-hdki-red border-t-transparent rounded-full" />
        </div>
      </Layout>
    );
  }

  if (error || !data?.instructor) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Instructor Not Found</h1>
            <p className="text-gray-600">{error ? error.message : 'The instructor you are looking for does not exist.'}</p>
          </div>
        </div>
      </Layout>
    );
  }

  const ins = data.instructor;

  return (
    <Layout>
      <section className="py-6 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/instructors" className="text-hdki-red hover:text-hdki-red-dark inline-flex items-center text-sm font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Instructors
          </Link>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1">
            {ins.photo ? (
              <img src={ins.photo} alt={ins.name} className="w-full h-80 object-cover rounded-lg shadow" />
            ) : (
              <div className="w-full h-80 bg-gray-100 rounded-lg" />
            )}
          </div>

          <div className="lg:col-span-2">
            <h1 className="text-4xl font-light text-gray-900 mb-2">{ins.name}</h1>
            <p className="text-lg text-gray-700 mb-4">{ins.rank}</p>

            {ins.dojoLocation && (
              <div className="flex items-center text-sm text-gray-600 mb-6">
                <MapPin className="h-4 w-4 mr-2 text-hdki-red" />
                <span>{ins.dojoLocation.name} — {ins.dojoLocation.city}, {ins.dojoLocation.country}</span>
              </div>
            )}

            {ins.bio && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{ins.bio}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}


