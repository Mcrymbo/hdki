"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Lightbox from "./Lightbox";

export default function TrainingSessions() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const trainingImages = [
    {
      src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
      alt: "Beach training session at Diani Beach",
      title: "Beach Training - Diani Beach",
      location: "Mombasa Coastal Dojo"
    },
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
      alt: "Indoor dojo training session",
      title: "Traditional Dojo Training",
      location: "HDKI Kenya Headquarters"
    },
    {
      src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
      alt: "Mountain training session at Mount Kenya",
      title: "High-Altitude Conditioning",
      location: "Mount Kenya Training Center"
    },
    {
      src: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop",
      alt: "Competition training session",
      title: "Tournament Preparation",
      location: "Nairobi Competition Dojo"
    },
    {
      src: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?q=80&w=800&auto=format&fit=crop",
      alt: "Group kata practice session",
      title: "Group Kata Practice",
      location: "Nakuru Training Center"
    },
    {
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop",
      alt: "Outdoor cultural training session",
      title: "Cultural Immersion Training",
      location: "Maasai Mara Adventure Camp"
    },
    {
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
      alt: "Youth training program",
      title: "Youth Development Program",
      location: "Community Outreach Center"
    },
    {
      src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=800&auto=format&fit=crop",
      alt: "Lakeside meditation session",
      title: "Meditation & Philosophy",
      location: "Lake Nakuru Retreat"
    },
    {
      src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=800&auto=format&fit=crop",
      alt: "Women in Karate training session",
      title: "Women's Empowerment Class",
      location: "Women's Training Center"
    }
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-light text-center text-gray-900 mb-6">
          Training Sessions Across Kenya
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          Experience authentic martial arts training in diverse and inspiring locations. 
          From traditional dojos to breathtaking natural settings, every session is designed 
          to challenge your skills while connecting you with Kenya's beauty.
        </p>

        {/* Puzzle-style Grid */}
        <div className="grid grid-cols-12 gap-4 mb-12">
          {/* Large featured image - spans 6 columns and 2 rows */}
          <div 
            className="col-span-12 md:col-span-6 row-span-1 md:row-span-2 h-64 md:h-auto relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => openLightbox(0)}
          >
            <img
              src={trainingImages[0].src}
              alt={trainingImages[0].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                <h3 className="text-xl font-semibold mb-2">{trainingImages[0].title}</h3>
                <p className="text-sm">{trainingImages[0].location}</p>
              </div>
            </div>
          </div>

          {/* Medium images - span 3 columns each */}
          <div 
            className="col-span-6 md:col-span-3 h-32 md:h-48 relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => openLightbox(1)}
          >
            <img
              src={trainingImages[1].src}
              alt={trainingImages[1].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                <h3 className="text-lg font-semibold mb-1">{trainingImages[1].title}</h3>
                <p className="text-xs">{trainingImages[1].location}</p>
              </div>
            </div>
          </div>

          <div 
            className="col-span-6 md:col-span-3 h-32 md:h-48 relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => openLightbox(2)}
          >
            <img
              src={trainingImages[2].src}
              alt={trainingImages[2].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                <h3 className="text-lg font-semibold mb-1">{trainingImages[2].title}</h3>
                <p className="text-xs">{trainingImages[2].location}</p>
              </div>
            </div>
          </div>

          {/* Small images - span 2 columns each, 3 in a row */}
          <div 
            className="col-span-4 md:col-span-2 h-24 md:h-32 relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => openLightbox(3)}
          >
            <img
              src={trainingImages[3].src}
              alt={trainingImages[3].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                <h3 className="text-sm font-semibold">{trainingImages[3].title}</h3>
              </div>
            </div>
          </div>

          <div 
            className="col-span-4 md:col-span-2 h-24 md:h-32 relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => openLightbox(4)}
          >
            <img
              src={trainingImages[4].src}
              alt={trainingImages[4].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                <h3 className="text-sm font-semibold">{trainingImages[4].title}</h3>
              </div>
            </div>
          </div>

          <div 
            className="col-span-4 md:col-span-2 h-24 md:h-32 relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => openLightbox(5)}
          >
            <img
              src={trainingImages[5].src}
              alt={trainingImages[5].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                <h3 className="text-sm font-semibold">{trainingImages[5].title}</h3>
              </div>
            </div>
          </div>

          {/* More medium images */}
          <div 
            className="col-span-6 md:col-span-4 h-32 md:h-40 relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => openLightbox(6)}
          >
            <img
              src={trainingImages[6].src}
              alt={trainingImages[6].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                <h3 className="text-lg font-semibold mb-1">{trainingImages[6].title}</h3>
                <p className="text-xs">{trainingImages[6].location}</p>
              </div>
            </div>
          </div>

          <div 
            className="col-span-6 md:col-span-4 h-32 md:h-40 relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => openLightbox(7)}
          >
            <img
              src={trainingImages[7].src}
              alt={trainingImages[7].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                <h3 className="text-lg font-semibold mb-1">{trainingImages[7].title}</h3>
                <p className="text-xs">{trainingImages[7].location}</p>
              </div>
            </div>
          </div>

          <div 
            className="col-span-12 md:col-span-4 h-32 md:h-40 relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => openLightbox(8)}
          >
            <img
              src={trainingImages[8].src}
              alt={trainingImages[8].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                <h3 className="text-lg font-semibold mb-1">{trainingImages[8].title}</h3>
                <p className="text-xs">{trainingImages[8].location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-8">
            Ready to experience training in these incredible locations?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/content/dojo-locations"
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-8 py-4 text-lg font-semibold transition-colors duration-300 inline-flex items-center justify-center group"
            >
              Find a Dojo Near You
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/content/karate-adventures"
              className="border-2 border-hdki-red text-hdki-red hover:bg-hdki-red hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Explore Adventure Programs
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={trainingImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}
