"use client";

import { useQuery } from "@apollo/client";
import { GET_DOJO_LOCATION } from "@/lib/graphql/queries";
import { useParams } from "next/navigation";
import Image from "next/image";
import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";
import Card, { CardImage, CardBody } from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import { DEFAULT_TRAINING_SCHEDULE, DEFAULT_DOJO_FACILITIES } from "@/lib/placeholderContent";
import { MapPin, Phone, Clock, Users, ExternalLink, ArrowRight, CheckCircle2 } from "lucide-react";

interface Instructor {
  id: string;
  name: string;
  rank?: string;
  photo?: string;
}

export default function DojoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error, refetch } = useQuery(GET_DOJO_LOCATION, { variables: { id }, skip: !id });

  if (loading) {
    return (
      <Layout>
        <LoadingState label="Loading dojo..." />
      </Layout>
    );
  }

  if (error || !data?.dojoLocation) {
    return (
      <Layout>
        <ErrorState
          message={error ? error.message : "The dojo you are looking for does not exist."}
          onRetry={error ? () => refetch() : undefined}
        />
      </Layout>
    );
  }

  const dojo = data.dojoLocation;
  const instructors: Instructor[] = dojo.instructors || [];

  return (
    <Layout>
      <section className="relative flex h-80 items-end overflow-hidden bg-hdki-ink md:h-96">
        {dojo.coverImage ? (
          <Image src={dojo.coverImage} alt={dojo.name} fill priority unoptimized sizes="100vw" className="object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-hdki-red">
            <span className="h-px w-6 bg-hdki-red" />
            {dojo.city}, {dojo.country}
          </span>
          <h1 className="font-display text-3xl font-medium text-white sm:text-4xl md:text-5xl">{dojo.name}</h1>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Reveal>
                {dojo.description && <p className="mb-10 text-lg leading-relaxed text-hdki-ink">{dojo.description}</p>}

                <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-medium text-hdki-ink">
                  <Clock className="h-5 w-5 text-hdki-red" />
                  Training Schedule
                </h2>
                <div className="mb-10 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {DEFAULT_TRAINING_SCHEDULE.map((session) => (
                    <div
                      key={session.day}
                      className="flex items-center justify-between rounded-sm bg-hdki-gray-light px-4 py-3"
                    >
                      <span className="font-medium text-hdki-ink">{session.day}</span>
                      <span className="text-sm text-hdki-gray-mid">{session.times}</span>
                    </div>
                  ))}
                </div>

                <h2 className="mb-4 font-display text-xl font-medium text-hdki-ink">Facilities</h2>
                <ul className="mb-10 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {DEFAULT_DOJO_FACILITIES.map((facility) => (
                    <li key={facility} className="flex items-center gap-2.5 text-sm text-hdki-gray-mid">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-hdki-red" />
                      {facility}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal direction="left" className="lg:col-span-1">
              <div className="rounded-sm border border-hdki-border bg-hdki-gray-light p-6">
                <h3 className="mb-4 font-display text-lg font-medium text-hdki-ink">Contact This Dojo</h3>
                <div className="mb-6 space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-hdki-red" />
                    <span className="text-hdki-ink">{dojo.address}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-hdki-red" />
                    <span className="text-hdki-ink">+254 700 123 456</span>
                  </div>
                  {instructors[0] && (
                    <div className="flex items-start gap-3">
                      <Users className="mt-0.5 h-4 w-4 shrink-0 text-hdki-red" />
                      <span className="text-hdki-ink">Lead: {instructors[0].name}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <Button href="/content/contact" variant="primary" size="sm" icon={<ArrowRight />}>
                    Contact This Dojo
                  </Button>
                  {dojo.mapLink && (
                    <Button href={dojo.mapLink} variant="outline" size="sm" target="_blank" rel="noopener noreferrer" icon={<ExternalLink />}>
                      Open in Maps
                    </Button>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {instructors.length > 0 && (
        <section className="bg-hdki-gray-light py-14 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-center font-display text-3xl font-medium text-hdki-ink">Instructors</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {instructors.map((ins, i) => (
                <Reveal key={ins.id} delay={i * 0.08}>
                  <Card variant="bordered" hover="lift">
                    {ins.photo ? (
                      <CardImage src={ins.photo} alt={ins.name} ratio="aspect-square" unoptimized />
                    ) : (
                      <div className="flex aspect-square items-center justify-center bg-white text-hdki-gray-mid">
                        <Users className="h-10 w-10" />
                      </div>
                    )}
                    <CardBody>
                      <h3 className="font-display text-lg font-medium text-hdki-ink">{ins.name}</h3>
                      {ins.rank && <p className="text-sm text-hdki-red">{ins.rank}</p>}
                    </CardBody>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
