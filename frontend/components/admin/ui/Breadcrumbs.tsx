import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center text-sm text-hdki-gray-mid">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center">
          {i > 0 && <ChevronRight className="mx-1.5 h-3.5 w-3.5" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-hdki-red">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-hdki-ink">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
