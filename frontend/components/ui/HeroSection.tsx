"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface HeroSectionProps {
  image: string | StaticImageData;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  height?: "sm" | "md" | "lg" | "full";
  align?: "center" | "left";
  children?: React.ReactNode;
  className?: string;
}

const heightClasses: Record<NonNullable<HeroSectionProps["height"]>, string> = {
  sm: "h-64 md:h-80",
  md: "h-96",
  lg: "h-[32rem]",
  full: "min-h-screen min-h-[100svh] py-28",
};

export default function HeroSection({
  image,
  title,
  subtitle,
  eyebrow,
  height = "md",
  align = "center",
  children,
  className,
}: HeroSectionProps) {
  return (
    <section className={cn("relative flex items-center overflow-hidden bg-hdki-ink", heightClasses[height], className)}>
      <Image
        src={image}
        alt=""
        fill
        priority
        unoptimized={typeof image === "string"}
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/40" />

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
          align === "center" ? "text-center" : "text-left"
        )}
      >
        <div className={cn(align === "center" && "mx-auto max-w-3xl")}>
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={cn(
                "mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-hdki-red drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]",
                align === "center" && "justify-center"
              )}
            >
              <span className="h-px w-6 bg-hdki-red" />
              {eyebrow}
            </motion.span>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl font-medium tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)] sm:text-5xl md:text-6xl"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-lg font-light text-gray-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] md:text-xl"
            >
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={cn(
                "mt-8 flex flex-col items-center gap-4 sm:flex-row",
                align === "center" ? "justify-center" : "items-start"
              )}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
