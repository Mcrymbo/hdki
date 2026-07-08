import type { Metadata } from "next";

// Admin CRUD screens carry no SEO value and must never be indexed.
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
