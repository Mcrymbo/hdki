"use client";

import { useState } from "react";
import Image from "next/image";
import teamImg from "@/assets/images/img4.jpeg";
import bagKickImg from "@/assets/images/im14.jpeg";
import padsImg from "@/assets/images/im1.png";
import judgesImg from "@/assets/images/im9.jpeg";
import medalImg from "@/assets/images/im6.jpeg";
import mentorshipImg from "@/assets/images/img3.jpeg";
import familyImg from "@/assets/images/im4.png";
import flagImg from "@/assets/images/im11.jpeg";
import gradingImg from "@/assets/images/im7.jpeg";
import Lightbox from "./Lightbox";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

const trainingImages = [
  {
    src: teamImg,
    alt: "HDKI Kenya squad posing together after a training session",
    title: "Team Spirit & Unity",
    location: "HDKI Kenya, Nairobi",
    span: "col-span-12 md:col-span-6 row-span-1 md:row-span-2 h-64 md:h-full",
  },
  {
    src: bagKickImg,
    alt: "Karateka delivering a strong front kick to a heavy bag",
    title: "Striking Power & Precision",
    location: "HDKI Kenya Dojo",
    span: "col-span-6 md:col-span-3 h-32 md:h-48",
  },
  {
    src: padsImg,
    alt: "Students posing with a free-standing punch bag in the training gym",
    title: "Strength & Conditioning",
    location: "Nairobi Training Gym",
    span: "col-span-6 md:col-span-3 h-32 md:h-48",
  },
  {
    src: judgesImg,
    alt: "Kata judges seated with signal flags at a tournament",
    title: "Tournament Officiating",
    location: "National Championships",
    span: "col-span-4 md:col-span-2 h-24 md:h-32",
  },
  {
    src: medalImg,
    alt: "Competitor smiling and holding his medal after a match",
    title: "Podium Moments",
    location: "National Karate Championships",
    span: "col-span-4 md:col-span-2 h-24 md:h-32",
  },
  {
    src: mentorshipImg,
    alt: "A senior instructor and student sharing a warm moment in the dojo",
    title: "Mentorship Across Generations",
    location: "HDKI Kenya Dojo",
    span: "col-span-4 md:col-span-2 h-24 md:h-32",
  },
  {
    src: familyImg,
    alt: "HDKI Kenya members celebrating together indoors",
    title: "One HDKI Family",
    location: "HDKI Kenya Community",
    span: "col-span-6 md:col-span-4 h-32 md:h-40",
  },
  {
    src: flagImg,
    alt: "HDKI Kenya members holding the national flag outside the Paralympic Gymnasium",
    title: "Representing Kenya",
    location: "Paralympic Gymnasium, Nairobi",
    span: "col-span-6 md:col-span-4 h-32 md:h-40",
  },
  {
    src: gradingImg,
    alt: "Instructor receiving his ceremonial haori during a grading ceremony",
    title: "Belt Ceremony & Progression",
    location: "HDKI Kenya Grading",
    span: "col-span-12 md:col-span-4 h-32 md:h-40",
  },
];

const lightboxImages = trainingImages.map((image) => ({
  src: image.src.src,
  alt: image.alt,
  title: image.title,
}));

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
        <Lightbox images={lightboxImages} currentIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />
      )}
    </section>
  );
}
