"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const headerRef = useRef<HTMLElement | null>(null);

  const navGroups = [
    {
      label: "About",
      items: [
        { name: "About Us", href: "/content/about" },
        { name: "Dojo Locations", href: "/content/dojo-locations" },
        { name: "Instructors", href: "/content/instructors" },
      ],
    },
    {
      label: "Activities",
      items: [
        { name: "Events", href: "/activities/events" },
        { name: "News", href: "/activities/news" },
        { name: "Karate Adventures", href: "/content/karate-adventures" },
      ],
    },
    {
      label: "Resources",
      items: [
        { name: "Gallery", href: "/content/gallery" },
        { name: "Contact Us", href: "/content/contact" },
      ],
    },
  ];

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  // Close dropdown if clicked outside the header
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
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <header ref={headerRef} className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16 sm:h-24">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/apple-touch-icon.png"
              alt="HDKI Kenya"
              width={96}  // logical pixel size
              height={96}
              className="w-12 h-12 sm:w-20 sm:h-20 object-contain"
              priority
            />
          </Link>
        </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 items-center">
            <Link
              href="/"
              className="text-gray-700 hover:text-hdki-red px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>

            {navGroups.map((group) => (
              // wrapper contains both button and submenu so mouse enters/leaves this wrapper only
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
                  className="flex items-center text-gray-700 hover:text-hdki-red px-3 py-2 text-sm font-medium"
                >
                  {group.label}
                  <ChevronDown
                    className={`h-4 w-4 ml-1 transition-transform ${
                      openDropdown === group.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown positioned directly below (no gap) */}
                {openDropdown === group.label && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full mt-0 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-30"
                  >
                    <ul className="py-1">
                      {group.items.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            onClick={() => {
                              setOpenDropdown(null);
                              setIsMenuOpen(false);
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-hdki-red"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
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
                  className="flex items-center text-gray-700 hover:text-hdki-red px-3 py-2 text-sm font-medium"
                >
                  <User className="h-4 w-4 mr-1" />
                  {user?.first_name || user?.username}
                  <ChevronDown
                    className={`h-4 w-4 ml-1 transition-transform ${
                      openDropdown === "profile" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdown === "profile" && (
                  <div className="absolute right-0 top-full mt-0 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-30">
                    <ul className="py-1">
                      {isAdmin && (
                        <li>
                          <Link
                            href="/admin"
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-hdki-red"
                          >
                            Admin
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link
                          href="/auth/profile"
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-hdki-red"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            logout();
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-hdki-red"
                        >
                          <LogOut className="h-4 w-4 inline mr-1" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="bg-hdki-red hover:bg-hdki-red-dark text-white px-4 py-2 text-sm font-medium rounded transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen((s) => !s)}
              aria-expanded={isMenuOpen}
              className="text-gray-700 hover:text-hdki-red p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-hdki-red"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {navGroups.map((group) => (
                <div key={group.label}>
                  <p className="px-3 py-2 text-sm font-semibold text-gray-500">
                    {group.label}
                  </p>
                  {group.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-6 py-2 text-base font-medium text-gray-700 hover:text-hdki-red"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              ))}

              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-hdki-red"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin
                      </Link>
                    )}
                    <Link
                      href="/auth/profile"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-hdki-red"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-hdki-red"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="bg-hdki-red hover:bg-hdki-red-dark text-white block px-3 py-2 text-base font-medium text-center rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
