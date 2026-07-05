import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import logo1 from "@/assets/logo/logo1.png";

interface AuthShellProps {
  children: React.ReactNode;
  /** Tailwind max-width class for the content area. Defaults to a narrow form width;
   * pass a wider one (e.g. "max-w-3xl") for content-heavy pages like profile. */
  maxWidth?: string;
}

export default function AuthShell({ children, maxWidth = "max-w-md" }: AuthShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-hdki-gray-light">
      <div className="flex items-center justify-between px-4 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src={logo1} alt="HDKI Kenya" className="h-9 w-auto" />
          <span className="font-display text-base font-medium text-hdki-ink">
            HDKI <span className="text-hdki-red">Kenya</span>
          </span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-hdki-gray-mid transition-colors hover:text-hdki-red"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className={`w-full ${maxWidth}`}>{children}</div>
      </div>
    </div>
  );
}
