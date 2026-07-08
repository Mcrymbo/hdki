import type { Metadata } from "next";
import Image from "next/image";
import heroImg from "@/assets/images/im3.jpeg";
import storyImg from "@/assets/images/im8.jpeg";
import Layout from "@/components/Layout";
import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import IconCircle from "@/components/ui/IconCircle";
import Card, { CardBody } from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import CTABand from "@/components/ui/CTABand";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Calendar, Users, Trophy, Target, Heart, Globe, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About HDKI Kenya | Our Shotokan Karate History & Mission",
  description:
    "HDKI Kenya has trained Shotokan karateka nationwide since 2023, registered with the Kenya Karate Federation (KKF) and affiliated with HDKI International. Learn our history, mission, and training philosophy.",
  alternates: { canonical: "/content/about" },
  openGraph: { url: "/content/about", title: "About HDKI Kenya | Our Shotokan Karate History & Mission" },
};

const missionValues = [
  {
    icon: <Target />,
    title: "Our Mission",
    body: "To promote traditional martial arts excellence while showcasing Kenya's natural beauty and rich culture through innovative sports tourism experiences that transform both body and spirit.",
  },
  {
    icon: <Heart />,
    title: "Our Values",
    list: [
      "Respect and humility",
      "Discipline and patience",
      "Cultural appreciation",
      "Leadership development",
      "Community engagement",
    ],
  },
  {
    icon: <Globe />,
    title: "Our Vision",
    body: "To become the world's leading destination for martial arts sports tourism, creating transformative experiences that connect practitioners with Kenya's incredible landscapes and vibrant culture.",
  },
];

const philosophy = [
  {
    title: "Kihon (Basics)",
    body: "Fundamental techniques practiced with precision and power, building the foundation for all advanced training.",
  },
  {
    title: "Kata (Forms)",
    body: "Traditional sequences that preserve ancient wisdom and develop perfect technique, timing, and spiritual focus.",
  },
  {
    title: "Kumite (Sparring)",
    body: "Controlled combat practice that develops timing, distance, and the practical application of martial arts principles.",
  },
];

const affiliationPoints = [
  { icon: <Trophy />, text: "Internationally recognized ranking system" },
  { icon: <Users />, text: "Access to global seminars and events" },
  { icon: <Globe />, text: "Connection to worldwide HDKI community" },
  { icon: <Calendar />, text: "Ongoing instructor development programs" },
];

const programBenefits = [
  "Self-defense and personal safety training",
  "Confidence building and leadership development",
  "Physical fitness and mental wellness",
  "Supportive community of women practitioners",
];

const specialPrograms = [
  "Youth development programs for girls",
  "Women-only training sessions",
  "Female instructor development track",
  "Adventure camps designed for women",
];

export default function About() {
  return (
    <Layout>
      <Breadcrumbs items={[{ name: "About", path: "/content/about" }]} />
      <HeroSection
        image={heroImg}
        eyebrow="About Us"
        title="About HDKI Kenya"
        subtitle="Preserving Tradition, Pioneering Adventure"
        height="sm"
      />

      {/* Our Story */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <Reveal direction="right">
              <SectionHeading eyebrow="Since 2023" title="Our Story" align="left" />
              <p className="mb-8 text-xl leading-relaxed text-hdki-ink">
                HDKI Kenya has been active in Kenya since January 2023, evolving from
                Shotokan United Kenya, which grew out of JKA Kenya under the leadership
                of Sensei Joshua Oude. Founded by Sensei George in the early 2000s,
                the organization has expanded into today&apos;s HDKI Kenya, promoting karate
                nationwide through dojos, schools, universities, and young karatekas.
                Registered with the country&apos;s governing body (KKF), HDKI Kenya is led
                technically by Musoga Goodric as Technical Director and Sensei Joshua
                Oude as Chief Instructor.
              </p>
              <p className="text-lg leading-relaxed text-hdki-gray-mid">
                As an official affiliate of{" "}
                <a
                  href="https://hdki.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-hdki-red hover:underline"
                >
                  HDKI International
                </a>
                , we honor the traditional values of martial arts while pioneering innovative approaches to training
                and cultural exchange. Our unique position allows us to combine serious martial arts education with
                Kenya&apos;s incredible natural beauty and tourism potential.
              </p>
            </Reveal>
            <Reveal direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={storyImg}
                  alt="HDKI Kenya karateka training together outdoors"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-hdki-gray-light py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What Drives Us" title="Mission & Values" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {missionValues.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1} className="text-center">
                <IconCircle icon={item.icon} size="lg" className="mx-auto mb-5" />
                <h3 className="mb-4 font-display text-xl font-medium text-hdki-ink">{item.title}</h3>
                {item.body && <p className="text-hdki-gray-mid">{item.body}</p>}
                {item.list && (
                  <ul className="space-y-2 text-left">
                    {item.list.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-hdki-gray-mid">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-hdki-red" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Training Philosophy */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How We Train" title="Training Philosophy" />
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {philosophy.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1} className="text-center">
                <h3 className="mb-3 font-display text-xl font-medium text-hdki-red">{item.title}</h3>
                <p className="text-hdki-gray-mid">{item.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center">
            <p className="text-xl leading-relaxed text-hdki-ink">
              Our holistic approach encompasses physical, mental, and spiritual growth. We believe martial arts
              training should develop not just fighting ability, but character, confidence, and leadership skills
              that serve practitioners throughout their lives.
            </p>
          </Reveal>
        </div>
      </section>

      {/* HDKI Affiliation */}
      <section className="bg-hdki-gray-light py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Global Network" title="HDKI International Affiliation" />
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <Reveal direction="right">
              <p className="mb-6 text-lg leading-relaxed text-hdki-ink">
                As an official affiliate of HDKI International, we are part of a global network of martial arts
                schools committed to preserving traditional values while embracing innovation. This affiliation
                ensures our training standards meet the highest international criteria.
              </p>
              <ul className="space-y-3">
                {affiliationPoints.map((point) => (
                  <li key={point.text} className="flex items-center gap-3">
                    <IconCircle icon={point.icon} size="sm" />
                    <span className="text-hdki-ink">{point.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal direction="left">
              <Card variant="bordered">
                <CardBody className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border-2 border-hdki-red bg-hdki-red">
                    <span className="text-lg font-bold leading-none tracking-tight text-white">
                      HD
                      <br />
                      KI
                    </span>
                  </div>
                  <h3 className="mb-4 font-display text-xl font-medium text-hdki-ink">Global Network</h3>
                  <p className="mb-6 text-hdki-gray-mid">
                    Connect with HDKI schools worldwide and participate in international training camps,
                    competitions, and cultural exchange programs.
                  </p>
                  <a
                    href="https://hdki.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-hdki-red hover:underline"
                  >
                    Visit HDKI International &rarr;
                  </a>
                </CardBody>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Women in Karate Program */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Empowerment"
            title="Women in Karate Program"
            subtitle="HDKI Kenya is proud to continue the tradition of empowering women through martial arts. Our dedicated “Women in Karate” program provides a supportive environment for women and girls to develop confidence, self-defense skills, and leadership abilities."
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Reveal>
              <h3 className="mb-4 font-display text-xl font-medium text-hdki-red">Program Benefits</h3>
              <ul className="space-y-3">
                {programBenefits.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-hdki-red" />
                    <span className="text-hdki-gray-mid">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="mb-4 font-display text-xl font-medium text-hdki-red">Special Programs</h3>
              <ul className="space-y-3">
                {specialPrograms.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-hdki-red" />
                    <span className="text-hdki-gray-mid">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Get Started"
        title="Ready to Begin Your Journey?"
        subtitle="Join our community of martial artists and experience the unique combination of traditional training and Kenya's incredible adventure opportunities."
        primaryCta={{ label: "Explore Karate Adventures", href: "/adventures" }}
        secondaryCta={{ label: "Contact Us Today", href: "/content/contact" }}
      />
    </Layout>
  );
}
