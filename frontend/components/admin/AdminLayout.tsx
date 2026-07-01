"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Newspaper,
  Image as ImageIcon,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  MapPin,
  Mountain,
} from "lucide-react";
import { cn } from "@/lib/cn";
import logo1 from "@/assets/logo/logo1.png";
import Breadcrumbs from "@/components/admin/ui/Breadcrumbs";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "News", href: "/admin/news", icon: Newspaper },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Dojo Locations", href: "/admin/dojos", icon: MapPin },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Instructors", href: "/admin/instructors", icon: Users },
  { name: "Adventures", href: "/admin/adventures", icon: Mountain },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function AdminLayout({ children, breadcrumbs }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin/login";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-hdki-gray-light">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform bg-hdki-ink transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <Image src={logo1} alt="HDKI Kenya" className="h-8 w-auto" />
            <span className="font-display text-sm font-medium text-white">Admin Panel</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-white lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex h-[calc(100%-4rem)] flex-col">
          <div className="mb-4 px-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
            >
              <Home className="h-4 w-4" />
              Back to Website
            </Link>
          </div>

          <div className="flex-1 space-y-0.5 overflow-y-auto px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-hdki-red text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-10 border-b border-hdki-border bg-white">
          <div className="flex h-16 items-center justify-between px-6">
            <button onClick={() => setSidebarOpen(true)} className="text-hdki-ink lg:hidden">
              <Menu className="h-6 w-6" />
            </button>

            <div className="ml-auto flex items-center gap-4">
              <span className="hidden text-sm text-hdki-gray-mid sm:inline">Welcome back, Admin</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-hdki-red text-xs font-bold text-white">
                A
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-hdki-gray-mid transition-colors hover:text-hdki-red"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          {children}
        </main>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
