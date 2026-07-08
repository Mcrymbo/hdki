/**
 * Server-only GraphQL fetch used exclusively for generateMetadata() and JSON-LD
 * on dynamic detail pages. Content rendering still goes through the existing
 * client-side Apollo `useQuery` in the page's client component — this fetch
 * just gives crawlers a real <title>/<meta description> and structured data
 * in the initial HTML instead of a generic fallback, without touching the
 * existing data-fetching/auth architecture.
 *
 * Fails soft: any network/GraphQL error returns null so a page never 500s
 * because the backend was briefly unreachable at request time.
 */
export async function fetchGraphQL<T>(query: string, variables: Record<string, unknown>): Promise<T | null> {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL;
  if (!endpoint) return null;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    if (json.errors) return null;

    return json.data as T;
  } catch {
    return null;
  }
}
