"use client";

import { useQuery } from '@apollo/client';
import { GET_GALLERY_ITEMS } from '@/lib/graphql/queries';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';

export default function GalleryPage() {
  const { data, loading, error } = useQuery(GET_GALLERY_ITEMS);
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightbox(null);
    }
    if (lightbox) {
      document.addEventListener('keydown', onKey);
    }
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hdki-red mx-auto mb-4"></div>
            <p className="text-gray-600">Loading gallery...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading gallery: {error.message}</p>
            <button onClick={() => window.location.reload()} className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-3 font-semibold transition-colors duration-300">Try Again</button>
          </div>
        </div>
      </Layout>
    );
  }

  const items = data?.galleryItems || [];

  return (
    <Layout>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Gallery</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Explore moments from HDKI Kenya activities.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-light text-gray-900 mb-4">No Images Yet</h3>
              <p className="text-gray-600">Check back later.</p>
            </div>
          ) : (
            <>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
                {items.map((it: any) => (
                  <figure key={it.id} className="mb-6 break-inside-avoid bg-white rounded-lg shadow overflow-hidden group cursor-zoom-in" onClick={() => setLightbox({ src: it.image, title: it.title })}>
                    <img src={it.image} alt={it.title} className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                    <figcaption className="p-4">
                      <p className="text-sm font-medium text-gray-900">{it.title}</p>
                      {it.description && <p className="text-xs text-gray-600 mt-1">{it.description}</p>}
                    </figcaption>
                  </figure>
                ))}
              </div>

              {lightbox && (
                <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
                  <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                    <button aria-label="Close" onClick={() => setLightbox(null)} className="absolute -top-3 -right-3 bg-white text-gray-700 rounded-full shadow p-2 hover:text-hdki-red transition">
                      ✕
                    </button>
                    <img src={lightbox.src} alt={lightbox.title} className="w-full h-auto rounded shadow-lg" />
                    <p className="mt-3 text-sm text-gray-200 text-center">{lightbox.title}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}


