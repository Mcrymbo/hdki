import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "lucide-react";

interface CTA {
  label: string;
  href: string;
}

interface CTABandProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta: CTA;
  secondaryCta?: CTA;
}

export default function CTABand({ eyebrow, title, subtitle, primaryCta, secondaryCta }: CTABandProps) {
  return (
    <section className="bg-hdki-ink py-16 md:py-24 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          {eyebrow && (
            <span className="mb-3 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-hdki-red">
              <span className="h-px w-6 bg-hdki-red" />
              {eyebrow}
            </span>
          )}
          <h2 className="font-display text-3xl font-medium tracking-tight md:text-5xl">{title}</h2>
          {subtitle && <p className="mt-5 text-lg text-gray-300 md:text-xl">{subtitle}</p>}
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href={primaryCta.href} variant="primary" size="lg" icon={<ArrowRight />}>
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="outline-white" size="lg">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
