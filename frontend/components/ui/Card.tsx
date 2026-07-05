import Image from "next/image";
import { cn } from "@/lib/cn";

interface CardProps {
  variant?: "default" | "elevated" | "bordered";
  hover?: "lift" | "none";
  className?: string;
  children: React.ReactNode;
}

const variantClasses = {
  default: "bg-white",
  elevated: "bg-white shadow-md",
  bordered: "bg-white border border-hdki-border",
};

export default function Card({ variant = "bordered", hover = "lift", className, children }: CardProps) {
  return (
    <div
      className={cn(
        "group rounded-sm overflow-hidden transition-all duration-300",
        variantClasses[variant],
        hover === "lift" && "hover:-translate-y-1 hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  /** Set for images from unconfigured/dynamic remote hosts (e.g. backend-uploaded media)
   * where Next's image optimizer's domain allowlist can't cover the host in advance. */
  unoptimized?: boolean;
}

export function CardImage({
  src,
  alt,
  ratio = "aspect-[4/3]",
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  unoptimized = false,
}: CardImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-hdki-gray-light", ratio)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        unoptimized={unoptimized}
        className={cn("object-cover transition-transform duration-500 group-hover:scale-105", className)}
      />
    </div>
  );
}

export function CardBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-6", className)}>{children}</div>;
}
