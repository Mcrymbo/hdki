"use client";

import { useQuery } from "@apollo/client";
import { GET_KARATE_ADVENTURE } from "@/lib/graphql/queries";
import { useParams } from "next/navigation";
import Image from "next/image";
import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import { DEFAULT_ADVENTURE_HIGHLIGHTS } from "@/lib/placeholderContent";
import { MapPin, Calendar, ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

export default function AdventureDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error, refetch } = useQuery(GET_KARATE_ADVENTURE, { variables: { id }, skip: !id });

  if (loading) {
    return (
      <Layout>
        <LoadingState label="Loading adventure..." />
      </Layout>
    );
  }

  if (error || !data?.karateAdventure) {
    return (
      <Layout>
        <ErrorState
          message={error ? error.message : "The adventure you are looking for does not exist."}
          onRetry={error ? () => refetch() : undefined}
        />
      </Layout>
    );
  }

  const adv = data.karateAdventure;

  return (
    <Layout>
      <section className="relative flex h-80 items-end overflow-hidden bg-hdki-ink md:h-96">
        {adv.coverImage ? (
          <Image src={adv.coverImage} alt={adv.title} fill priority unoptimized sizes="100vw" className="object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-hdki-red">
            <span className="h-px w-6 bg-hdki-red" />
            {adv.location}
          </span>
          <h1 className="font-display text-3xl font-medium text-white sm:text-4xl md:text-5xl">{adv.title}</h1>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Reveal>
                <p className="mb-10 text-lg leading-relaxed text-hdki-ink">{adv.description}</p>

                <h2 className="mb-4 font-display text-xl font-medium text-hdki-ink">Trip Highlights</h2>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {DEFAULT_ADVENTURE_HIGHLIGHTS.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5 text-sm text-hdki-gray-mid">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-hdki-red" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal direction="left" className="lg:col-span-1">
              <div className="rounded-sm border border-hdki-border bg-hdki-gray-light p-6">
                <h3 className="mb-4 font-display text-lg font-medium text-hdki-ink">Trip Details</h3>
                <div className="mb-6 space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-hdki-red" />
                    <span className="text-hdki-ink">{adv.location}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-hdki-red" />
                    <span className="text-hdki-ink">
                      {new Date(adv.startDate).toLocaleDateString()} – {new Date(adv.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Button href="/activities/events/register" variant="primary" size="sm" icon={<ArrowRight />}>
                    Reserve Your Spot
                  </Button>
                  <Button href="/content/contact" variant="outline" size="sm" icon={<MessageCircle />}>
                    Ask a Question
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
