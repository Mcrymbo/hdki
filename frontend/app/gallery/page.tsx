"use client";

import { useQuery } from '@apollo/client';
import { GET_GALLERY_ITEMS } from '@/lib/graphql/queries';
import Layout from '@/components/Layout';
import HeroSection from "@/components/ui/HeroSection";
import Reveal from "@/components/ui/Reveal";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import Lightbox from "@/components/Lightbox";
import Image from "next/image";
import { useState } from 'react';
import { ImageIcon } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  description?: string;
  uploadedAt?: string;
}

export default function GalleryPage() {
  const { data, loading, error, refetch } = useQuery(GET_GALLERY_ITEMS);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items: GalleryItem[] = data?.galleryItems || [];
  const lightboxImages = items.map((it) => ({ src: it.image, alt: it.title, title: it.title }));

  return (
    <Layout>
      <HeroSection
        image="https://images.unsplash.com/photo-1555597408-26bc8e548a46?q=80&w=2000&auto=format&fit=crop"
        eyebrow="Moments"
        title="Gallery"
        subtitle="Explore moments from HDKI Kenya activities, training sessions, and adventures."
      />

      <section className="bg-hdki-gray-light py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingState label="Loading gallery..." />
          ) : error ? (
            <ErrorState message={`Error loading gallery: ${error.message}`} onRetry={() => refetch()} />
          ) : items.length === 0 ? (
            <EmptyState icon={<ImageIcon />} title="No images yet" description="Check back soon for photos from our events and training sessions." />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => (
                <Reveal key={item.id} delay={(i % 6) * 0.06} direction="fade">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="group relative block aspect-[4/3] w-full overflow-hidden rounded-sm bg-hdki-gray-light"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      {item.description && <p className="line-clamp-1 text-xs text-gray-300">{item.description}</p>}
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox images={lightboxImages} currentIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </Layout>
  );
}
