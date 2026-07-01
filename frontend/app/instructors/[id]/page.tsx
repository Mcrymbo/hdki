"use client";

import { useQuery } from '@apollo/client';
import { GET_INSTRUCTOR } from '@/lib/graphql/queries';
import { useParams } from 'next/navigation';
import Image from "next/image";
import Layout from '@/components/Layout';
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import { MapPin, ExternalLink, ArrowLeft, Users } from 'lucide-react';

export default function InstructorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error, refetch } = useQuery(GET_INSTRUCTOR, { variables: { id }, skip: !id });

  if (loading) {
    return (
      <Layout>
        <LoadingState label="Loading instructor..." />
      </Layout>
    );
  }

  if (error || !data?.instructor) {
    return (
      <Layout>
        <ErrorState
          message={error ? error.message : "The instructor you are looking for does not exist."}
          onRetry={error ? () => refetch() : undefined}
        />
      </Layout>
    );
  }

  const ins = data.instructor;
  const dojo = ins.dojoLocation;

  return (
    <Layout>
      <section className="bg-hdki-gray-light py-6">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Button href="/instructors" variant="ghost" size="sm" icon={<ArrowLeft />} iconPosition="left">
            Back to Instructors
          </Button>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <Reveal direction="right" className="lg:col-span-1">
              <div className="relative aspect-square overflow-hidden rounded-sm bg-hdki-gray-light">
                {ins.photo ? (
                  <Image src={ins.photo} alt={ins.name} fill unoptimized sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-hdki-gray-mid">
                    <Users className="h-12 w-12" />
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal className="lg:col-span-2">
              <h1 className="mb-2 font-display text-3xl font-medium text-hdki-ink sm:text-4xl">{ins.name}</h1>
              {ins.rank && <p className="mb-4 text-lg text-hdki-red">{ins.rank}</p>}

              {dojo && (
                <div className="mb-6 flex items-center gap-2 text-sm text-hdki-gray-mid">
                  <MapPin className="h-4 w-4 shrink-0 text-hdki-red" />
                  <span>
                    {dojo.name} — {dojo.city}, {dojo.country}
                  </span>
                </div>
              )}

              {ins.bio && <p className="mb-8 leading-relaxed text-hdki-ink">{ins.bio}</p>}

              {dojo && (
                <div className="rounded-sm border border-hdki-border bg-hdki-gray-light p-6">
                  <h3 className="mb-4 font-display text-lg font-medium text-hdki-ink">Their Dojo</h3>
                  <div className="mb-5 space-y-2 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-hdki-red" />
                      <span className="text-hdki-ink">
                        {dojo.name}
                        {dojo.address ? `, ${dojo.address}` : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button href={`/dojos/${dojo.id}`} variant="primary" size="sm">
                      View Dojo
                    </Button>
                    {dojo.mapLink && (
                      <Button href={dojo.mapLink} variant="outline" size="sm" target="_blank" rel="noopener noreferrer" icon={<ExternalLink />}>
                        Open in Maps
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
