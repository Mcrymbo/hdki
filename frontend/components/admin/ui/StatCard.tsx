import { cn } from "@/lib/cn";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: string; direction: "up" | "down" };
}

export default function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="rounded-sm border border-hdki-border bg-white p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-hdki-gray-mid">{label}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-hdki-red-light text-hdki-red [&>svg]:h-5 [&>svg]:w-5">
          {icon}
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-display text-3xl font-medium text-hdki-ink">{value}</span>
        {trend && (
          <span className={cn("text-xs font-semibold", trend.direction === "up" ? "text-green-600" : "text-red-600")}>
            {trend.direction === "up" ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}
