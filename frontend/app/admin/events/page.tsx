"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EVENTS } from "@/lib/graphql/queries";
import { DELETE_EVENT } from "@/lib/graphql/mutations";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable, { type DataTableColumn } from "@/components/admin/ui/DataTable";
import AccessDenied from "@/components/admin/ui/AccessDenied";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import { useToast } from "@/components/admin/ui/Toast";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import Image from "next/image";
import Link from "next/link";
import { Plus, Eye, Pencil, Trash2, Calendar, MapPin, Users, Coins } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  coverImage?: string;
  fee?: number | null;
  maxParticipants?: number | null;
  currentRegistrations?: number | null;
  isPublished: boolean;
}

export default function AdminEvents() {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [pendingDelete, setPendingDelete] = useState<Event | null>(null);

  const { data, loading, error, refetch } = useQuery(GET_EVENTS);
  const [deleteEvent, { loading: deleting }] = useMutation(DELETE_EVENT);

  if (!isAdmin) {
    return (
      <AdminLayout>
        <AccessDenied />
      </AdminLayout>
    );
  }

  const events: Event[] = data?.events || [];

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteEvent({
        variables: { id: pendingDelete.id },
        update: (cache) => {
          cache.modify({
            fields: {
              events(existingEvents = []) {
                return existingEvents.filter((e: { __ref: string }) => e.__ref !== `Event:${pendingDelete.id}`);
              },
            },
          });
        },
      });
      toast("Event deleted", "success");
      setPendingDelete(null);
      refetch();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to delete event", "error");
    }
  };

  const columns: DataTableColumn<Event>[] = [
    {
      key: "title",
      label: "Event",
      render: (event) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm bg-hdki-gray-light">
            {event.coverImage && (
              <Image src={event.coverImage} alt={event.title} fill unoptimized sizes="40px" className="object-cover" />
            )}
          </div>
          <span className="font-medium text-hdki-ink">{event.title}</span>
        </div>
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (event) => (
        <span className="flex items-center gap-1.5 text-hdki-gray-mid">
          <Calendar className="h-3.5 w-3.5 text-hdki-red" />
          {new Date(event.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
        </span>
      ),
    },
    {
      key: "location",
      label: "Location",
      render: (event) => (
        <span className="flex items-center gap-1.5 text-hdki-gray-mid">
          <MapPin className="h-3.5 w-3.5 text-hdki-red" />
          {event.location}
        </span>
      ),
    },
    {
      key: "fee",
      label: "Fee",
      render: (event) => (
        <span className="flex items-center gap-1.5 font-medium text-hdki-ink">
          <Coins className="h-3.5 w-3.5 text-hdki-red" />
          {event.fee && event.fee > 0 ? `KSh ${event.fee}` : "Free"}
        </span>
      ),
    },
    {
      key: "participants",
      label: "Participants",
      render: (event) =>
        event.maxParticipants ? (
          <span className="flex items-center gap-1.5 text-hdki-gray-mid">
            <Users className="h-3.5 w-3.5 text-hdki-red" />
            {event.currentRegistrations || 0} / {event.maxParticipants}
          </span>
        ) : (
          <span className="text-hdki-gray-mid">—</span>
        ),
    },
    {
      key: "status",
      label: "Status",
      render: (event) => (
        <span
          className={cn(
            "inline-flex rounded-full px-2 py-1 text-xs font-semibold",
            event.isPublished ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          )}
        >
          {event.isPublished ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      className: "text-right",
      render: (event) => (
        <div className="flex items-center justify-end gap-3">
          <Link href={`/activities/events/${event.id}`} className="text-hdki-gray-mid hover:text-hdki-ink" title="View">
            <Eye className="h-4 w-4" />
          </Link>
          <Link href={`/admin/events/${event.id}/edit`} className="text-hdki-gray-mid hover:text-hdki-red" title="Edit">
            <Pencil className="h-4 w-4" />
          </Link>
          <button onClick={() => setPendingDelete(event)} className="text-hdki-gray-mid hover:text-red-600" title="Delete">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Events" }]}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-hdki-ink">Events Management</h1>
          <p className="mt-1 text-sm text-hdki-gray-mid">Manage events, tournaments, and programs</p>
        </div>
        <Button href="/admin/events/create" variant="primary" size="sm" icon={<Plus />} iconPosition="left">
          Create Event
        </Button>
      </div>

      {loading ? (
        <LoadingState label="Loading events..." />
      ) : error ? (
        <ErrorState message={`Error loading events: ${error.message}`} onRetry={() => refetch()} />
      ) : events.length === 0 ? (
        <EmptyState icon={<Calendar />} title="No events yet" action={{ label: "Create First Event", href: "/admin/events/create" }} />
      ) : (
        <DataTable columns={columns} rows={events} rowKey={(event) => event.id} />
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete event?"
        description={pendingDelete ? `"${pendingDelete.title}" will be permanently removed.` : undefined}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </AdminLayout>
  );
}
