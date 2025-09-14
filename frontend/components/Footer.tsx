import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-hdki-gray-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About HDKI Kenya */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-hdki-red border-2 border-hdki-red flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">
                  HD<br />KI
                </span>
              </div>
              <h3 className="text-lg font-semibold">HDKI Kenya</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Experience the perfect blend of traditional martial arts training and Kenya's breathtaking adventure tourism. Join us for Karate Adventures that combine discipline, culture, and exploration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/content/about" className="text-gray-300 hover:text-hdki-red transition-colors duration-200 text-sm">
                  About HDKI Kenya
                </Link>
              </li>
              <li>
                <Link href="/content/karate-adventures" className="text-gray-300 hover:text-hdki-red transition-colors duration-200 text-sm">
                  Karate Adventures
                </Link>
              </li>
              <li>
                <Link href="/content/dojo-locations" className="text-gray-300 hover:text-hdki-red transition-colors duration-200 text-sm">
                  Dojo Locations
                </Link>
              </li>
              <li>
                <Link href="/content/events" className="text-gray-300 hover:text-hdki-red transition-colors duration-200 text-sm">
                  Upcoming Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-hdki-red mr-3" />
                <span className="text-gray-300 text-sm">info@hdkikenya.org</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-hdki-red mr-3" />
                <span className="text-gray-300 text-sm">+254 700 123 456</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-hdki-red mr-3" />
                <span className="text-gray-300 text-sm">Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Social & HDKI Affiliation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-300 hover:text-hdki-red transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-hdki-red transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-hdki-red transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <div className="text-sm text-gray-300">
              <p className="mb-2">Official Affiliate of</p>
              <a 
                href="https://hdki.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-hdki-red hover:text-red-400 transition-colors duration-200 font-semibold"
              >
                HDKI International
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 HDKI Kenya. All rights reserved. | 
            <span className="mx-2">•</span>
            Proudly affiliated with <a href="https://hdki.org/" target="_blank" rel="noopener noreferrer" className="text-hdki-red hover:text-red-400">HDKI.org</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
