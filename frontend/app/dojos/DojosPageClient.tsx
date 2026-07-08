"use client";

import { useQuery } from "@apollo/client";
import { GET_DOJO_LOCATIONS } from "@/lib/graphql/queries";
import heroImg from "@/assets/images/joshua.png";
import Layout from "@/components/Layout";
import HeroSection from "@/components/ui/HeroSection";
import Card, { CardImage, CardBody } from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { MapPin, Globe2, ArrowRight, Building2 } from "lucide-react";

interface DojoLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  mapLink?: string;
  description?: string;
  coverImage?: string;
}

export default function DojosPageClient() {
  const { data, loading, error, refetch } = useQuery(GET_DOJO_LOCATIONS);
  const dojos: DojoLocation[] = data?.dojoLocations || [];

  return (
    <Layout>
      <Breadcrumbs items={[{ name: "Dojo Locations", path: "/dojos" }]} />
      <HeroSection
        image={heroImg}
        eyebrow="Find Your Dojo"
        title="Dojo Locations"
        subtitle="HDKI Kenya operates training centers across the country, each offering authentic martial arts instruction from certified instructors."
      />

      <section className="bg-hdki-gray-light py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingState label="Loading dojos..." />
          ) : error ? (
            <ErrorState message={`Error loading dojos: ${error.message}`} onRetry={() => refetch()} />
          ) : dojos.length === 0 ? (
            <EmptyState icon={<Building2 />} title="No dojo locations yet" description="Check back soon for new training centers." />
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {dojos.map((dojo, i) => (
                <Reveal key={dojo.id} delay={(i % 3) * 0.1}>
                  <Card variant="bordered" hover="lift" className="h-full">
                    <div className="relative">
                      {dojo.coverImage ? (
                        <CardImage src={dojo.coverImage} alt={dojo.name} ratio="aspect-[4/3]" unoptimized />
                      ) : (
                        <div className="flex aspect-[4/3] items-center justify-center bg-hdki-gray-light text-hdki-gray-mid">
                          <Building2 className="h-10 w-10" />
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 rounded-sm bg-white/95 px-2.5 py-1 text-xs font-medium text-hdki-ink shadow">
                          <MapPin className="h-3.5 w-3.5 text-hdki-red" />
                          {dojo.city}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-sm bg-white/95 px-2.5 py-1 text-xs font-medium text-hdki-ink shadow">
                          <Globe2 className="h-3.5 w-3.5 text-hdki-red" />
                          {dojo.country}
                        </span>
                      </div>
                    </div>
                    <CardBody>
                      <h3 className="mb-2 font-display text-xl font-medium text-hdki-ink transition-colors group-hover:text-hdki-red">
                        {dojo.name}
                      </h3>
                      <p className="mb-3 line-clamp-1 text-sm text-hdki-gray-mid">{dojo.address}</p>
                      {dojo.description && (
                        <p className="mb-5 line-clamp-2 text-sm text-hdki-gray-mid">{dojo.description}</p>
                      )}
                      <div className="flex gap-3">
                        <Button href={`/dojos/${dojo.id}`} variant="primary" size="sm" className="flex-1" icon={<ArrowRight />}>
                          View Details
                        </Button>
                        {dojo.mapLink && (
                          <Button href={dojo.mapLink} variant="outline" size="sm" target="_blank" rel="noopener noreferrer">
                            Map
                          </Button>
                        )}
                      </div>
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
