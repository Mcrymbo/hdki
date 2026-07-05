"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "outline-white" | "ghost";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  /** Pass a rendered icon element, e.g. `icon={<ArrowRight className="h-4 w-4" />}` — not a bare
   * component reference, which can't cross the server/client boundary when this is used from a
   * Server Component. */
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.ComponentProps<typeof Link>, "className" | "children"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<Variant, string> = {
  primary: "bg-hdki-red text-white hover:bg-hdki-red-dark",
  secondary: "bg-hdki-ink text-white hover:bg-hdki-gray-dark",
  outline: "border-2 border-hdki-ink text-hdki-ink hover:bg-hdki-ink hover:text-white",
  "outline-white": "border-2 border-white text-white hover:bg-white hover:text-hdki-ink",
  ghost: "text-hdki-ink hover:text-hdki-red",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm",
  md: "px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base",
  lg: "px-5 py-2.5 text-sm sm:px-8 sm:py-4 sm:text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "right",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-sm font-semibold tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const iconSpanClasses = "inline-flex [&>svg]:h-4 [&>svg]:w-4";

  const content = loading ? (
    <>
      <Loader2 className="h-4 w-4 animate-spin" />
      {children}
    </>
  ) : (
    <>
      {icon && iconPosition === "left" && <span className={iconSpanClasses}>{icon}</span>}
      {children}
      {icon && iconPosition === "right" && (
        <span className={cn(iconSpanClasses, "transition-transform duration-200 group-hover:translate-x-1")}>
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">)}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

  return (
    <button className={classes} disabled={loading || buttonProps.disabled} {...buttonProps}>
      {content}
    </button>
  );
}
