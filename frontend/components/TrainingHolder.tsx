"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

const trainingImages = [
  {
    src: "https://images.unsplash.com/photo-1476525223214-c31ff100e1ae?q=80&w=800&auto=format&fit=crop",
    alt: "Karate practitioner training on the beach at sunset",
    title: "Beach Training at Sunset",
    location: "Mombasa Coastal Dojo",
    span: "col-span-12 md:col-span-6 row-span-1 md:row-span-2 h-64 md:h-full",
  },
  {
    src: "https://images.unsplash.com/photo-1598300606161-4019d0dfec28?q=80&w=800&auto=format&fit=crop",
    alt: "Karateka training inside a traditional dojo",
    title: "Traditional Dojo Training",
    location: "HDKI Kenya Headquarters",
    span: "col-span-6 md:col-span-3 h-32 md:h-48",
  },
  {
    src: "https://images.unsplash.com/photo-1529630218527-7df22fc2d4ee?q=80&w=800&auto=format&fit=crop",
    alt: "Outdoor sparring session with a flying kick",
    title: "Outdoor Conditioning & Sparring",
    location: "Mount Kenya Training Camp",
    span: "col-span-6 md:col-span-3 h-32 md:h-48",
  },
  {
    src: "https://images.unsplash.com/photo-1514050566906-8d077bae7046?q=80&w=800&auto=format&fit=crop",
    alt: "Competitor performing a flying kick during tournament training",
    title: "Tournament Preparation",
    location: "Nairobi Competition Dojo",
    span: "col-span-4 md:col-span-2 h-24 md:h-32",
  },
  {
    src: "https://images.unsplash.com/photo-1656653121526-a1458317b790?q=80&w=800&auto=format&fit=crop",
    alt: "Close-up of a focused karate punch",
    title: "Focused Technique Training",
    location: "Nakuru Training Center",
    span: "col-span-4 md:col-span-2 h-24 md:h-32",
  },
  {
    src: "https://images.unsplash.com/photo-1577998555981-6e798325914e?q=80&w=800&auto=format&fit=crop",
    alt: "Silhouette of a karate punch at sunset",
    title: "Sunset Discipline Session",
    location: "Maasai Mara Adventure Camp",
    span: "col-span-4 md:col-span-2 h-24 md:h-32",
  },
  {
    src: "https://images.unsplash.com/photo-1583668023935-b79e1c1af0a2?q=80&w=800&auto=format&fit=crop",
    alt: "Young students practicing karate outdoors",
    title: "Youth Development Program",
    location: "Community Outreach Center",
    span: "col-span-6 md:col-span-4 h-32 md:h-40",
  },
  {
    src: "https://images.unsplash.com/photo-1529566193698-bc394165d541?q=80&w=800&auto=format&fit=crop",
    alt: "Group of karateka meditating together outdoors",
    title: "Meditation & Philosophy",
    location: "Lake Nakuru Retreat",
    span: "col-span-6 md:col-span-4 h-32 md:h-40",
  },
  {
    src: "https://images.unsplash.com/photo-1603210185246-b1662978ea37?q=80&w=800&auto=format&fit=crop",
    alt: "Hands tying a karate belt",
    title: "Belt Ceremony & Progression",
    location: "HDKI Kenya Dojo",
    span: "col-span-12 md:col-span-4 h-32 md:h-40",
  },
];

export default function TrainingSessions() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Where We Train"
          title="Training Sessions Across Kenya"
          subtitle="Experience authentic martial arts training in diverse and inspiring locations. From traditional dojos to breathtaking natural settings, every session is designed to challenge your skills while connecting you with Kenya's beauty."
        />

        <div className="mb-12 grid grid-cols-12 gap-3 md:gap-4">
          {trainingImages.map((image, index) => (
            <Reveal key={image.title} delay={(index % 6) * 0.06} direction="fade" className={cn("relative", image.span)}>
              <button
                type="button"
                onClick={() => openLightbox(index)}
                className="group relative block h-full w-full overflow-hidden rounded-sm"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  unoptimized
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-semibold text-white">{image.title}</p>
                  <p className="text-xs text-gray-300">{image.location}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <div className="text-center">
          <p className="mb-8 text-lg text-hdki-gray-mid">
            Ready to experience training in these incredible locations?
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/dojos" variant="primary" size="lg" icon={<ArrowRight />}>
              Find a Dojo Near You
            </Button>
            <Button href="/adventures" variant="outline" size="lg">
              Explore Adventure Programs
            </Button>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox images={trainingImages} currentIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />
      )}
    </section>
  );
}
