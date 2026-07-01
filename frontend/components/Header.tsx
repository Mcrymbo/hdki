"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import logo1 from "@/assets/logo/logo1.png";

const navGroups = [
  {
    label: "About",
    items: [
      { name: "About Us", href: "/content/about" },
      { name: "Dojo Locations", href: "/dojos" },
      { name: "Instructors", href: "/instructors" },
    ],
  },
  {
    label: "Activities",
    items: [
      { name: "Events", href: "/activities/events" },
      { name: "News", href: "/activities/news" },
      { name: "Karate Adventures", href: "/adventures" },
    ],
  },
  {
    label: "Resources",
    items: [
      { name: "Gallery", href: "/gallery" },
      { name: "Contact Us", href: "/content/contact" },
    ],
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const headerRef = useRef<HTMLElement | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setIsMenuOpen(false);
      }
    }
    function handleScroll() {
      setScrolled(window.scrollY > 12);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm transition-shadow duration-300",
        scrolled ? "border-hdki-border shadow-sm" : "border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between transition-[height] duration-300",
            scrolled ? "h-16" : "h-16 sm:h-20"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image src={logo1} alt="HDKI Kenya" className="h-11 w-auto sm:h-12" priority />
            <span className="hidden font-display text-lg font-medium tracking-tight text-hdki-ink sm:block">
              HDKI <span className="text-hdki-red">Kenya</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium uppercase tracking-wide text-hdki-ink transition-colors hover:text-hdki-red"
            >
              Home
            </Link>

            {navGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(group.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => toggleDropdown(group.label)}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === group.label}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium uppercase tracking-wide text-hdki-ink transition-colors hover:text-hdki-red"
                >
                  {group.label}
                  <ChevronDown
                    className={cn("h-3.5 w-3.5 transition-transform", openDropdown === group.label && "rotate-180")}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown === group.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      role="menu"
                      className="absolute left-0 top-full mt-1 w-56 rounded-sm border border-hdki-border bg-white py-1 shadow-lg"
                    >
                      {group.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => {
                            setOpenDropdown(null);
                            setIsMenuOpen(false);
                          }}
                          className="block px-4 py-2.5 text-sm text-hdki-ink transition-colors hover:bg-hdki-gray-light hover:text-hdki-red"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            {isAuthenticated ? (
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("profile")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => toggleDropdown("profile")}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === "profile"}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-hdki-ink transition-colors hover:text-hdki-red"
                >
                  <User className="h-4 w-4" />
                  {user?.first_name || user?.username}
                  <ChevronDown
                    className={cn("h-3.5 w-3.5 transition-transform", openDropdown === "profile" && "rotate-180")}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown === "profile" && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 w-44 rounded-sm border border-hdki-border bg-white py-1 shadow-lg"
                    >
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2.5 text-sm text-hdki-ink hover:bg-hdki-gray-light hover:text-hdki-red"
                        >
                          Admin
                        </Link>
                      )}
                      <Link
                        href="/auth/profile"
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2.5 text-sm text-hdki-ink hover:bg-hdki-gray-light hover:text-hdki-red"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setOpenDropdown(null);
                        }}
                        className="flex w-full items-center gap-1.5 px-4 py-2.5 text-left text-sm text-hdki-ink hover:bg-hdki-gray-light hover:text-hdki-red"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="bg-hdki-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-hdki-red-dark"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen((s) => !s)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            className="p-2 text-hdki-ink hover:text-hdki-red lg:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-hdki-border bg-white lg:hidden"
          >
            <div className="space-y-1 px-4 pb-4 pt-3">
              <Link
                href="/"
                className="block px-2 py-2 text-base font-medium text-hdki-ink hover:text-hdki-red"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {navGroups.map((group) => (
                <div key={group.label} className="pt-2">
                  <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-hdki-gray-mid">
                    {group.label}
                  </p>
                  {group.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-base font-medium text-hdki-ink hover:text-hdki-red"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              ))}

              <div className="mt-4 border-t border-hdki-border pt-4">
                {isAuthenticated ? (
                  <div className="space-y-1">
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="block px-2 py-2 text-base font-medium text-hdki-ink hover:text-hdki-red"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin
                      </Link>
                    )}
                    <Link
                      href="/auth/profile"
                      className="block px-2 py-2 text-base font-medium text-hdki-ink hover:text-hdki-red"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full px-2 py-2 text-left text-base font-medium text-hdki-ink hover:text-hdki-red"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="block bg-hdki-red px-4 py-3 text-center text-base font-semibold text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
