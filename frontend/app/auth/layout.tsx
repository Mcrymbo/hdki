import type { Metadata } from "next";

// Login/register/profile/reset-password are personalized or duplicate-content
// screens with no search intent behind them — keep them out of the index.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
