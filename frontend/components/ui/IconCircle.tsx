import { cn } from "@/lib/cn";

interface IconCircleProps {
  /** Pass a rendered icon element, e.g. `icon={<Trophy />}` — not a bare component reference. */
  icon: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
  className?: string;
}

const sizeClasses = {
  sm: { wrap: "w-10 h-10", svg: "[&>svg]:h-4 [&>svg]:w-4" },
  md: { wrap: "w-14 h-14", svg: "[&>svg]:h-6 [&>svg]:w-6" },
  lg: { wrap: "w-16 h-16", svg: "[&>svg]:h-8 [&>svg]:w-8" },
};

export default function IconCircle({ icon, size = "md", variant = "solid", className }: IconCircleProps) {
  const s = sizeClasses[size];
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full",
        s.wrap,
        s.svg,
        variant === "solid" ? "bg-hdki-red text-white" : "border-2 border-hdki-red text-hdki-red bg-transparent",
        className
      )}
    >
      {icon}
    </div>
  );
}
