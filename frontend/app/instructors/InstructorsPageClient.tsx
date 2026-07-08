"use client";

import { useQuery } from '@apollo/client';
import { GET_INSTRUCTORS } from '@/lib/graphql/queries';
import heroImg from "@/assets/images/im7.jpeg";
import Layout from '@/components/Layout';
import HeroSection from "@/components/ui/HeroSection";
import Card, { CardImage, CardBody } from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { MapPin, ArrowRight, Users } from "lucide-react";

interface DojoLocation {
  id: string;
  name: string;
  city: string;
  country: string;
}

interface Instructor {
  id: string;
  name: string;
  rank?: string;
  bio?: string;
  photo?: string;
  dojoLocation?: DojoLocation;
}

export default function InstructorsPageClient() {
  const { data, loading, error, refetch } = useQuery(GET_INSTRUCTORS);
  const instructors: Instructor[] = data?.instructors || [];

  return (
    <Layout>
      <Breadcrumbs items={[{ name: "Instructors", path: "/instructors" }]} />
      <HeroSection
        image={heroImg}
        eyebrow="Meet The Team"
        title="Instructors"
        subtitle="Meet our certified HDKI instructors and the dojos they lead across Kenya."
      />

      <section className="bg-hdki-gray-light py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingState label="Loading instructors..." />
          ) : error ? (
            <ErrorState message={`Error loading instructors: ${error.message}`} onRetry={() => refetch()} />
          ) : instructors.length === 0 ? (
            <EmptyState icon={<Users />} title="No instructors yet" description="Check back soon for instructor profiles." />
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {instructors.map((ins, i) => (
                <Reveal key={ins.id} delay={(i % 3) * 0.1}>
                  <Card variant="bordered" hover="lift" className="h-full">
                    {ins.photo ? (
                      <CardImage src={ins.photo} alt={ins.name} ratio="aspect-square" unoptimized />
                    ) : (
                      <div className="flex aspect-square items-center justify-center bg-hdki-gray-light text-hdki-gray-mid">
                        <Users className="h-10 w-10" />
                      </div>
                    )}
                    <CardBody>
                      <h3 className="mb-1 font-display text-xl font-medium text-hdki-ink">{ins.name}</h3>
                      {ins.rank && <p className="mb-3 text-sm text-hdki-red">{ins.rank}</p>}
                      {ins.dojoLocation && (
                        <p className="mb-5 flex items-center gap-2 text-sm text-hdki-gray-mid">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-hdki-red" />
                          {ins.dojoLocation.name} — {ins.dojoLocation.city}, {ins.dojoLocation.country}
                        </p>
                      )}
                      <Button href={`/instructors/${ins.id}`} variant="primary" size="sm" className="w-full" icon={<ArrowRight />}>
                        View Profile
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
