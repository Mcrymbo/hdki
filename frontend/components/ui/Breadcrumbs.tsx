import Link from "next/link";
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";

/**
 * Emits a BreadcrumbList JSON-LD block plus a matching screen-reader-only nav
 * from one list of items, so the two never drift out of sync. Visually hidden
 * (sr-only) by design — the site's visible design has no breadcrumb trail, so
 * this stays out of layout entirely while still giving assistive tech and
 * search engines an accurate page hierarchy. `items` should NOT include the
 * homepage — it's always prepended.
 */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const allItems: BreadcrumbItem[] = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <nav aria-label="Breadcrumb" className="sr-only">
        <ol>
          {allItems.map((item, i) => {
            const isLast = i === allItems.length - 1;
            return (
              <li key={item.path}>
                {isLast ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <Link href={item.path}>{item.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(allItems)} />
    </>
  );
}
