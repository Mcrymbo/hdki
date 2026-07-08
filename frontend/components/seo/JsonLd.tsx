import type { JsonLdObject } from "@/lib/seo/schema";

export default function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output here is never user-controlled at render time (all callers pass
      // trusted server-fetched/static data), so this is not an XSS vector.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
