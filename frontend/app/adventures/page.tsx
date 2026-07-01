"use client";

import { useQuery } from "@apollo/client";
import { GET_KARATE_ADVENTURES } from "@/lib/graphql/queries";
import Layout from "@/components/Layout";
import HeroSection from "@/components/ui/HeroSection";
import Card, { CardImage, CardBody } from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import { MapPin, Calendar, ArrowRight, Compass } from "lucide-react";

interface KarateAdventure {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  coverImage?: string;
}

export default function AdventuresPage() {
  const { data, loading, error, refetch } = useQuery(GET_KARATE_ADVENTURES);
  const adventures: KarateAdventure[] = data?.karateAdventures || [];

  return (
    <Layout>
      <HeroSection
        image="https://images.unsplash.com/photo-1529630218527-7df22fc2d4ee?q=80&w=2000&auto=format&fit=crop"
        eyebrow="Karate Adventures"
        title="Where Martial Arts Meets Adventure"
        subtitle="The world's first martial arts sports tourism experience — serious karate training set against Kenya's most spectacular landscapes."
      />

      <section className="bg-hdki-gray-light py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingState label="Loading adventures..." />
          ) : error ? (
            <ErrorState message={`Error loading adventures: ${error.message}`} onRetry={() => refetch()} />
          ) : adventures.length === 0 ? (
            <EmptyState icon={<Compass />} title="No adventures scheduled yet" description="Check back soon for upcoming trips." />
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {adventures.map((adv, i) => (
                <Reveal key={adv.id} delay={(i % 3) * 0.1}>
                  <Card variant="bordered" hover="lift" className="h-full">
                    {adv.coverImage ? (
                      <CardImage src={adv.coverImage} alt={adv.title} ratio="aspect-[4/3]" unoptimized />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center bg-hdki-gray-light text-hdki-gray-mid">
                        <Compass className="h-10 w-10" />
                      </div>
                    )}
                    <CardBody>
                      <h3 className="mb-2 font-display text-xl font-medium text-hdki-ink transition-colors group-hover:text-hdki-red">
                        {adv.title}
                      </h3>
                      <div className="mb-1.5 flex items-center gap-2 text-sm text-hdki-gray-mid">
                        <MapPin className="h-4 w-4 text-hdki-red" />
                        {adv.location}
                      </div>
                      <div className="mb-4 flex items-center gap-2 text-sm text-hdki-gray-mid">
                        <Calendar className="h-4 w-4 text-hdki-red" />
                        {new Date(adv.startDate).toLocaleDateString()} – {new Date(adv.endDate).toLocaleDateString()}
                      </div>
                      <p className="mb-5 line-clamp-3 text-sm text-hdki-gray-mid">{adv.description}</p>
                      <Button href={`/adventures/${adv.id}`} variant="primary" size="sm" icon={<ArrowRight />}>
                        View Details
                      </Button>
                    </CardBody>
                  </Card>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
