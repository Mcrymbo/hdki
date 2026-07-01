import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center mx-auto max-w-3xl" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-hdki-red">
          <span className="h-px w-6 bg-hdki-red" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-4xl md:text-5xl font-medium tracking-tight",
          light ? "text-white" : "text-hdki-ink"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-lg md:text-xl font-light", light ? "text-gray-300" : "text-hdki-gray-mid")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
