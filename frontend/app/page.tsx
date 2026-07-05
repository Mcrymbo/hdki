import Image from "next/image";
import heroImg from "@/assets/images/im12.jpeg";
import missionImg from "@/assets/images/im13.jpeg";
import Layout from "@/components/Layout";
import TrainingSessions from "@/components/TrainingHolder";
import Button from "@/components/ui/Button";
import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import IconCircle from "@/components/ui/IconCircle";
import Card, { CardBody } from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import CTABand from "@/components/ui/CTABand";
import { ArrowRight, MapPin, Users, Trophy, Star, Quote } from "lucide-react";

const features = [
  {
    icon: <Trophy />,
    title: "World-Class Training",
    description: "Train with certified HDKI instructors in stunning locations from Mombasa beaches to Maasai Mara camps.",
  },
  {
    icon: <MapPin />,
    title: "Cultural Immersion",
    description: "Experience authentic Kenyan culture, cuisine, music, and traditions alongside your martial arts journey.",
  },
  {
    icon: <Users />,
    title: "Adventure Tourism",
    description: "Safari excursions, mountain climbing, beach training, and wildlife experiences integrated with karate camps.",
  },
];

const testimonials = [
  {
    quote:
      "Training on the shores of Lake Nakuru while watching flamingos was a once-in-a-lifetime experience. The instructors were phenomenal and the cultural immersion was incredible.",
    name: "Sarah Mitchell",
    detail: "Black Belt, Nairobi",
  },
  {
    quote:
      "HDKI Kenya's adventure program exceeded all expectations. The combination of serious martial arts training and authentic safari experiences was perfectly balanced.",
    name: "Rose Stewart",
    detail: "Instructor, HDKI Ireland",
  },
  {
    quote:
      "The cultural exchange with local Kenyan martial artists and the mountain training camps created memories that will last forever. Highly recommend to any serious practitioner.",
    name: "Simon Bligh",
    detail: "Instructor, HDKI, UK",
  },
];

export default function Index() {
  return (
    <Layout>
      <HeroSection
        image={heroImg}
        eyebrow="HDKI Kenya"
        title="Tradition Meets Adventure"
        subtitle="Shotokan karate training meets Kenya's world-class adventure tourism."
        height="full"
        imagePosition="top"
      >
        <Button href="/adventures" variant="primary" size="lg" icon={<ArrowRight />}>
          Explore Karate Adventures
        </Button>
        <Button href="/content/about" variant="outline-white" size="lg">
          Learn About HDKI Kenya
        </Button>
      </HeroSection>

      {/* Karate Adventures Highlight */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Offer"
            title="Karate Adventures in Kenya"
            subtitle="The world's first martial arts sports tourism experience. Train with world-class instructors while exploring Kenya's incredible landscapes, wildlife, and culture."
          />

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.1} className="text-center">
                <IconCircle icon={feature.icon} size="lg" className="mx-auto mb-5" />
                <h3 className="mb-3 font-display text-xl font-medium text-hdki-ink">{feature.title}</h3>
                <p className="text-hdki-gray-mid">{feature.description}</p>
              </Reveal>
            ))}
          </div>

          <div className="text-center">
            <Button href="/adventures" variant="outline" size="lg" icon={<ArrowRight />}>
              Discover All Adventures
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-hdki-gray-light py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <Reveal direction="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={missionImg}
                  alt="HDKI Kenya karateka executing a focused turning technique in the dojo"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal direction="left">
              <SectionHeading eyebrow="Our Mission" title="Built on Tradition, Driven by Excellence" align="left" />
              <p className="text-lg leading-relaxed text-hdki-ink">
                HDKI Kenya is dedicated to promoting the traditional values and techniques of martial arts while
                showcasing the natural beauty and rich culture of Kenya. We create transformative experiences that
                combine physical discipline, mental growth, and cultural appreciation.
              </p>
              <p className="mt-6 text-hdki-gray-mid">
                As an official affiliate of{" "}
                <a
                  href="https://hdki.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-hdki-red hover:underline"
                >
                  HDKI International
                </a>
                , we uphold the highest standards of martial arts excellence while pioneering the future of sports
                tourism.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Training Sessions Grid */}
      <TrainingSessions />

      {/* Testimonials */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Testimonials" title="What Our Adventurers Say" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <Card variant="bordered" hover="lift" className="h-full">
                  <CardBody className="flex h-full flex-col">
                    <Quote className="mb-3 h-6 w-6 text-hdki-red-light" fill="currentColor" strokeWidth={0} />
                    <div className="mb-4 flex gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="h-4 w-4 fill-current text-hdki-red" />
                      ))}
                    </div>
                    <p className="mb-6 flex-1 text-hdki-ink">&ldquo;{t.quote}&rdquo;</p>
                    <div>
                      <div className="font-semibold text-hdki-ink">{t.name}</div>
                      <div className="text-sm text-hdki-gray-mid">{t.detail}</div>
                    </div>
                  </CardBody>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Join Us"
        title="Ready to Begin Your Adventure?"
        subtitle="Join us for an unforgettable journey that combines martial arts excellence with Kenya's natural wonders."
        primaryCta={{ label: "Contact Us Today", href: "/content/contact" }}
        secondaryCta={{ label: "View Upcoming Events", href: "/activities/events" }}
      />
    </Layout>
  );
}
