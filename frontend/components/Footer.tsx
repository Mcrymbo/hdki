import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import logo1 from "@/assets/logo/logo1.png";

const quickLinks = [
  { name: "About HDKI Kenya", href: "/content/about" },
  { name: "Karate Adventures", href: "/adventures" },
  { name: "Dojo Locations", href: "/dojos" },
  { name: "Upcoming Events", href: "/activities/events" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="bg-hdki-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* About HDKI Kenya */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image src={logo1} alt="HDKI Kenya" className="h-10 w-auto" />
              <h3 className="font-display text-lg font-medium">HDKI Kenya</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Experience the perfect blend of traditional martial arts training and Kenya&apos;s breathtaking
              adventure tourism. Join us for Karate Adventures that combine discipline, culture, and exploration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 transition-colors hover:text-hdki-red">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-hdki-red" />
                <span className="text-sm text-gray-400">info@hdkikenya.org</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-hdki-red" />
                <span className="text-sm text-gray-400">+254 700 123 456</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-hdki-red" />
                <span className="text-sm text-gray-400">Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Social & HDKI Affiliation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Connect With Us</h3>
            <div className="mb-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-gray-400 transition-colors hover:border-hdki-red hover:text-hdki-red"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="text-sm text-gray-400">
              <p className="mb-1.5">Official Affiliate of</p>
              <a
                href="https://hdki.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-hdki-red transition-colors hover:text-red-400"
              >
                HDKI International
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} HDKI Kenya. All rights reserved.
            <span className="mx-2">•</span>
            Proudly affiliated with{" "}
            <a href="https://hdki.org/" target="_blank" rel="noopener noreferrer" className="text-hdki-red hover:text-red-400">
              HDKI.org
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
