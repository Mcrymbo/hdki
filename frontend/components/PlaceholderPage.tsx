import Layout from "./Layout";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <Layout>
      <section className="py-20 bg-white min-h-[60vh] flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-hdki-red rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-light text-gray-900 mb-6">{title}</h1>
          <p className="text-xl text-gray-600 mb-8">{description}</p>
          <p className="text-gray-500">
            This page is currently under development. Please check back soon for more content, 
            or feel free to continue exploring other sections of our website.
          </p>
        </div>
      </section>
    </Layout>
  );
}
