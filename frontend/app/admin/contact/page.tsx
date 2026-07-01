"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CONTACT_MESSAGES } from "@/lib/graphql/queries";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import AccessDenied from "@/components/admin/ui/AccessDenied";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import { Mail, Calendar, MessageSquare } from "lucide-react";
import { cn } from "@/lib/cn";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

type Filter = "all" | "read" | "unread";

export default function AdminContact() {
  const { isAdmin } = useAuth();
  const [filter, setFilter] = useState<Filter>("all");

  const { data, loading, error, refetch } = useQuery(GET_CONTACT_MESSAGES);

  if (!isAdmin) {
    return (
      <AdminLayout>
        <AccessDenied />
      </AdminLayout>
    );
  }

  const allMessages: ContactMessage[] = data?.contactMessages || [];
  const filteredMessages = allMessages.filter((message) => {
    if (filter === "read") return message.isRead;
    if (filter === "unread") return !message.isRead;
    return true;
  });
  const unreadCount = allMessages.filter((message) => !message.isRead).length;

  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All Messages", count: allMessages.length },
    { key: "unread", label: "Unread", count: unreadCount },
    { key: "read", label: "Read", count: allMessages.length - unreadCount },
  ];

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Contact Messages" }]}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-hdki-ink">Contact Messages</h1>
          <p className="mt-1 text-sm text-hdki-gray-mid">Manage incoming contact messages and inquiries</p>
        </div>
        {unreadCount > 0 && (
          <span className="rounded-sm bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
            {unreadCount} unread
          </span>
        )}
      </div>

      <div className="mb-6 border-b border-hdki-border">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={cn(
                "border-b-2 px-1 py-2 text-sm font-medium transition-colors",
                filter === tab.key
                  ? "border-hdki-red text-hdki-red"
                  : "border-transparent text-hdki-gray-mid hover:border-hdki-border hover:text-hdki-ink"
              )}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {loading ? (
        <LoadingState label="Loading messages..." />
      ) : error ? (
        <ErrorState message={`Error loading messages: ${error.message}`} onRetry={() => refetch()} />
      ) : filteredMessages.length === 0 ? (
        <EmptyState
          icon={<MessageSquare />}
          title={
            filter === "all" ? "No messages found" : filter === "unread" ? "No unread messages" : "No read messages"
          }
        />
      ) : (
        <div className="divide-y divide-hdki-border rounded-sm border border-hdki-border bg-white">
          {filteredMessages.map((message) => (
            <div key={message.id} className={cn("p-6", !message.isRead && "bg-red-50/40")}>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hdki-red text-sm font-medium text-white">
                  {message.name[0]?.toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-medium text-hdki-ink">{message.name}</h3>
                    {!message.isRead && (
                      <span className="inline-flex rounded-sm bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                        New
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-hdki-gray-mid">
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" />
                      {message.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(message.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="mt-4 whitespace-pre-wrap text-sm text-hdki-ink">{message.message}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <a
                  href={`mailto:${message.email}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-hdki-red hover:text-hdki-red-dark"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Reply
                </a>
                <span className="text-sm text-hdki-gray-mid">{message.isRead ? "Read" : "Unread"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
