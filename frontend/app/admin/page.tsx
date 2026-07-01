"use client";

import { useQuery } from "@apollo/client";
import { GET_NEWS, GET_EVENTS, GET_CONTACT_MESSAGES } from "@/lib/graphql/queries";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import AccessDenied from "@/components/admin/ui/AccessDenied";
import StatCard from "@/components/admin/ui/StatCard";
import { Calendar, Newspaper, Mail, UserPlus, Settings, ArrowRight } from "lucide-react";
import Link from "next/link";

interface NewsArticle {
  id: string;
  title: string;
  publishedAt: string;
}

interface EventItem {
  id: string;
  title: string;
  date: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

const quickActions = [
  { label: "Create News Article", href: "/admin/news/create", icon: <Newspaper /> },
  { label: "Create Event", href: "/admin/events/create", icon: <Calendar /> },
  { label: "Add User", href: "/admin/users/create", icon: <UserPlus /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings /> },
];

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const { data: newsData } = useQuery(GET_NEWS);
  const { data: eventsData } = useQuery(GET_EVENTS);
  const { data: contactData } = useQuery(GET_CONTACT_MESSAGES);

  if (!isAdmin) {
    return (
      <AdminLayout>
        <AccessDenied />
      </AdminLayout>
    );
  }

  const news: NewsArticle[] = newsData?.news || [];
  const events: EventItem[] = eventsData?.events || [];
  const messages: ContactMessage[] = contactData?.contactMessages || [];

  const recentSections = [
    {
      title: "Recent News",
      href: "/admin/news",
      icon: Newspaper,
      items: news.slice(0, 5).map((a) => ({ id: a.id, primary: a.title, secondary: new Date(a.publishedAt).toLocaleDateString() })),
      empty: "No news articles yet",
    },
    {
      title: "Recent Events",
      href: "/admin/events",
      icon: Calendar,
      items: events.slice(0, 5).map((e) => ({ id: e.id, primary: e.title, secondary: new Date(e.date).toLocaleDateString() })),
      empty: "No events yet",
    },
    {
      title: "Recent Messages",
      href: "/admin/contact",
      icon: Mail,
      items: messages.slice(0, 5).map((m) => ({ id: m.id, primary: m.name, secondary: m.email })),
      empty: "No messages yet",
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-medium text-hdki-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-hdki-gray-mid">
          Welcome back, {user?.first_name || user?.username}. Here&apos;s what&apos;s happening with HDKI Kenya.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="News Articles" value={news.length} icon={<Newspaper />} />
        <StatCard label="Upcoming Events" value={events.length} icon={<Calendar />} />
        <StatCard label="Contact Messages" value={messages.length} icon={<Mail />} />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {recentSections.map((section) => (
          <div key={section.title} className="rounded-sm border border-hdki-border bg-white">
            <div className="flex items-center justify-between border-b border-hdki-border px-6 py-4">
              <h3 className="font-display text-base font-medium text-hdki-ink">{section.title}</h3>
              <Link href={section.href} className="text-sm font-medium text-hdki-red hover:text-hdki-red-dark">
                View all
              </Link>
            </div>
            <div className="p-6">
              {section.items.length === 0 ? (
                <p className="text-sm text-hdki-gray-mid">{section.empty}</p>
              ) : (
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <section.icon className="mt-0.5 h-4 w-4 shrink-0 text-hdki-gray-mid" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-hdki-ink">{item.primary}</p>
                        <p className="text-sm text-hdki-gray-mid">{item.secondary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-sm border border-hdki-border bg-white p-6">
        <h3 className="mb-4 font-display text-base font-medium text-hdki-ink">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 rounded-sm border border-hdki-border p-4 transition-colors hover:bg-hdki-gray-light"
            >
              <span className="text-hdki-red [&>svg]:h-5 [&>svg]:w-5">{action.icon}</span>
              <span className="flex-1 text-sm font-medium text-hdki-ink">{action.label}</span>
              <ArrowRight className="h-4 w-4 text-hdki-gray-mid" />
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
