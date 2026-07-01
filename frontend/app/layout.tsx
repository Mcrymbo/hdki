import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HDKI Kenya | Traditional Karate & Adventure Tourism",
  description:
    "HDKI Kenya blends traditional Shotokan karate training with Kenya's world-class adventure tourism. Official affiliate of HDKI International.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
