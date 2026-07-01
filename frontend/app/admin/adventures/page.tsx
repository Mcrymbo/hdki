"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_KARATE_ADVENTURES } from "@/lib/graphql/queries";
import { DELETE_KARATE_ADVENTURE } from "@/lib/graphql/mutations";
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
import Image from "next/image";
import Link from "next/link";
import { Plus, Eye, Pencil, Trash2, MapPin, Calendar, Mountain } from "lucide-react";

interface Adventure {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  coverImage?: string;
}

export default function AdminAdventures() {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [pendingDelete, setPendingDelete] = useState<Adventure | null>(null);

  const { data, loading, error, refetch } = useQuery(GET_KARATE_ADVENTURES);
  const [deleteAdventure, { loading: deleting }] = useMutation(DELETE_KARATE_ADVENTURE);

  if (!isAdmin) {
    return (
      <AdminLayout>
        <AccessDenied />
      </AdminLayout>
    );
  }

  const adventures: Adventure[] = data?.karateAdventures || [];

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteAdventure({
        variables: { id: pendingDelete.id },
        update: (cache) => {
          cache.modify({
            fields: {
              karateAdventures(existingAdventures = []) {
                return existingAdventures.filter(
                  (a: { __ref: string }) => a.__ref !== `KarateAdventure:${pendingDelete.id}`
                );
              },
            },
          });
        },
      });
      toast("Adventure deleted", "success");
      setPendingDelete(null);
      refetch();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to delete adventure", "error");
    }
  };

  const columns: DataTableColumn<Adventure>[] = [
    {
      key: "title",
      label: "Adventure",
      render: (adventure) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm bg-hdki-gray-light">
            {adventure.coverImage && (
              <Image src={adventure.coverImage} alt={adventure.title} fill unoptimized sizes="40px" className="object-cover" />
            )}
          </div>
          <span className="font-medium text-hdki-ink">{adventure.title}</span>
        </div>
      ),
    },
    {
      key: "location",
      label: "Location",
      render: (adventure) => (
        <span className="flex items-center gap-1.5 text-hdki-gray-mid">
          <MapPin className="h-3.5 w-3.5 text-hdki-red" />
          {adventure.location}
        </span>
      ),
    },
    {
      key: "dates",
      label: "Dates",
      render: (adventure) => (
        <span className="flex items-center gap-1.5 text-hdki-gray-mid">
          <Calendar className="h-3.5 w-3.5 text-hdki-red" />
          {new Date(adventure.startDate).toLocaleDateString()} - {new Date(adventure.endDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      className: "text-right",
      render: (adventure) => (
        <div className="flex items-center justify-end gap-3">
          <Link href={`/adventures/${adventure.id}`} className="text-hdki-gray-mid hover:text-hdki-ink" title="View">
            <Eye className="h-4 w-4" />
          </Link>
          <Link href={`/admin/adventures/${adventure.id}/edit`} className="text-hdki-gray-mid hover:text-hdki-red" title="Edit">
            <Pencil className="h-4 w-4" />
          </Link>
          <button onClick={() => setPendingDelete(adventure)} className="text-hdki-gray-mid hover:text-red-600" title="Delete">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Adventures" }]}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-hdki-ink">Karate Adventures</h1>
          <p className="mt-1 text-sm text-hdki-gray-mid">Manage adventure programs and expeditions</p>
        </div>
        <Button href="/admin/adventures/create" variant="primary" size="sm" icon={<Plus />} iconPosition="left">
          Add Adventure
        </Button>
      </div>

      {loading ? (
        <LoadingState label="Loading adventures..." />
      ) : error ? (
        <ErrorState message={`Error loading adventures: ${error.message}`} onRetry={() => refetch()} />
      ) : adventures.length === 0 ? (
        <EmptyState icon={<Mountain />} title="No adventures yet" action={{ label: "Add First Adventure", href: "/admin/adventures/create" }} />
      ) : (
        <DataTable columns={columns} rows={adventures} rowKey={(adventure) => adventure.id} />
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete adventure?"
        description={pendingDelete ? `"${pendingDelete.title}" will be permanently removed.` : undefined}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </AdminLayout>
  );
}
