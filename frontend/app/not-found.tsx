import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <span className="font-display text-[7rem] font-medium leading-none text-hdki-red sm:text-[9rem]">404</span>
        <h1 className="mt-4 font-display text-3xl font-medium text-hdki-ink sm:text-4xl">Off the mat, out of bounds</h1>
        <p className="mt-3 max-w-md text-hdki-gray-mid">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
        </p>
        <Button href="/" variant="primary" size="lg" icon={<Home />} iconPosition="left" className="mt-8">
          Return Home
        </Button>
      </section>
    </Layout>
  );
}
