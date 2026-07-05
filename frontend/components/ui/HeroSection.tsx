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
  imagePosition?: "center" | "top" | "bottom";
  contentPosition?: "center" | "bottom";
  hideSubtitleOnMobile?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const imagePositionClasses: Record<NonNullable<HeroSectionProps["imagePosition"]>, string> = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
};

const heightClasses: Record<NonNullable<HeroSectionProps["height"]>, string> = {
  sm: "h-64 md:h-80",
  md: "h-96",
  lg: "h-[32rem]",
  full: "min-h-screen min-h-[100svh] pb-16 pt-28 sm:pb-24",
};

export default function HeroSection({
  image,
  title,
  subtitle,
  eyebrow,
  height = "md",
  align = "center",
  imagePosition = "center",
  contentPosition = "center",
  hideSubtitleOnMobile = false,
  children,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative flex overflow-hidden bg-hdki-ink",
        contentPosition === "bottom" ? "items-end" : "items-center",
        heightClasses[height],
        className
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        unoptimized={typeof image === "string"}
        sizes="100vw"
        className={cn("object-cover", imagePositionClasses[imagePosition])}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
      <div
        className={cn(
          "absolute inset-0",
          contentPosition === "bottom"
            ? "bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.15)_50%,transparent_75%)]"
            : "bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.15)_55%,transparent_80%)]"
        )}
      />

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
          align === "center" ? "text-center" : "text-left"
        )}
      >
        <div className={cn("mt-12 sm:mt-0", align === "center" && "mx-auto max-w-3xl")}>
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={cn(
                "mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-hdki-red [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.9))_drop-shadow(0_2px_10px_rgba(0,0,0,0.6))]",
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
            className="font-display text-3xl font-medium tracking-tight text-white [filter:drop-shadow(0_1px_4px_rgba(0,0,0,0.95))_drop-shadow(0_4px_24px_rgba(0,0,0,0.65))] sm:text-5xl md:text-6xl"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={cn(
                "mt-5 text-base font-light text-white [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.95))_drop-shadow(0_3px_16px_rgba(0,0,0,0.7))] sm:text-lg md:text-xl",
                hideSubtitleOnMobile && "hidden sm:block"
              )}
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
                "mt-10 flex flex-col items-center gap-4 sm:mt-14 sm:flex-row",
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
