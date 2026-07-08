"use client";

import { useQuery } from "@apollo/client";
import { GET_KARATE_ADVENTURES } from "@/lib/graphql/queries";
import Image from "next/image";
import heroImg from "@/assets/images/img1.jpeg";
import rhinoImg from "@/assets/images/img2.jpeg";
import cafeImg from "@/assets/images/img5.jpeg";
import giraffeImg from "@/assets/images/img6.jpeg";
import Layout from "@/components/Layout";
import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Card, { CardImage, CardBody } from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { MapPin, Calendar, ArrowRight, Compass } from "lucide-react";

const adventureMoments = [
  {
    src: giraffeImg,
    alt: "HDKI Kenya group photo at the Giraffe Centre, Nairobi",
    title: "Nairobi's Wild Side",
    caption: "Giraffe Centre, Nairobi",
  },
  {
    src: rhinoImg,
    alt: "A mother and calf white rhino grazing on the savanna",
    title: "Face to Face with the Big Five",
    caption: "Ol Pejeta Conservancy",
  },
  {
    src: cafeImg,
    alt: "HDKI Kenya members sharing a conversation outside a countryside cafe",
    title: "Culture, Coffee & Community",
    caption: "Nyeri Countryside",
  },
];

interface KarateAdventure {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  coverImage?: string;
}

export default function AdventuresPageClient() {
  const { data, loading, error, refetch } = useQuery(GET_KARATE_ADVENTURES);
  const adventures: KarateAdventure[] = data?.karateAdventures || [];

  return (
    <Layout>
      <Breadcrumbs items={[{ name: "Karate Adventures", path: "/adventures" }]} />
      <HeroSection
        image={heroImg}
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

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Beyond The Dojo"
            title="Kenya, Up Close"
            subtitle="Every karate adventure is bookended by real Kenyan experiences — wildlife encounters, local culture, and the friendships that make the journey unforgettable."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {adventureMoments.map((moment, i) => (
              <Reveal key={moment.title} delay={i * 0.1} direction="fade">
                <div className="group relative aspect-[4/3] overflow-hidden rounded-sm">
                  <Image
                    src={moment.src}
                    alt={moment.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-sm font-semibold text-white">{moment.title}</p>
                    <p className="text-xs text-gray-300">{moment.caption}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
