"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_DOJO_LOCATIONS } from "@/lib/graphql/queries";
import { DELETE_DOJO_LOCATION } from "@/lib/graphql/mutations";
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
import { Plus, Eye, Pencil, Trash2, MapPin } from "lucide-react";

interface DojoLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  coverImage?: string;
}

export default function AdminDojos() {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [pendingDelete, setPendingDelete] = useState<DojoLocation | null>(null);

  const { data, loading, error, refetch } = useQuery(GET_DOJO_LOCATIONS);
  const [deleteDojo, { loading: deleting }] = useMutation(DELETE_DOJO_LOCATION);

  if (!isAdmin) {
    return (
      <AdminLayout>
        <AccessDenied />
      </AdminLayout>
    );
  }

  const dojos: DojoLocation[] = data?.dojoLocations || [];

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteDojo({
        variables: { id: pendingDelete.id },
        update: (cache) => {
          cache.modify({
            fields: {
              dojoLocations(existingDojos = []) {
                return existingDojos.filter((d: { __ref: string }) => d.__ref !== `DojoLocation:${pendingDelete.id}`);
              },
            },
          });
        },
      });
      toast("Dojo location deleted", "success");
      setPendingDelete(null);
      refetch();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to delete dojo location", "error");
    }
  };

  const columns: DataTableColumn<DojoLocation>[] = [
    {
      key: "name",
      label: "Dojo",
      render: (dojo) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm bg-hdki-gray-light">
            {dojo.coverImage && (
              <Image src={dojo.coverImage} alt={dojo.name} fill unoptimized sizes="40px" className="object-cover" />
            )}
          </div>
          <span className="font-medium text-hdki-ink">{dojo.name}</span>
        </div>
      ),
    },
    {
      key: "address",
      label: "Address",
      render: (dojo) => (
        <span className="flex items-center gap-1.5 text-hdki-gray-mid">
          <MapPin className="h-3.5 w-3.5 text-hdki-red" />
          {dojo.address}
        </span>
      ),
    },
    { key: "location", label: "City / Country", render: (dojo) => `${dojo.city}, ${dojo.country}` },
    {
      key: "actions",
      label: "",
      className: "text-right",
      render: (dojo) => (
        <div className="flex items-center justify-end gap-3">
          <Link href={`/dojos/${dojo.id}`} className="text-hdki-gray-mid hover:text-hdki-ink" title="View">
            <Eye className="h-4 w-4" />
          </Link>
          <Link href={`/admin/dojos/${dojo.id}/edit`} className="text-hdki-gray-mid hover:text-hdki-red" title="Edit">
            <Pencil className="h-4 w-4" />
          </Link>
          <button onClick={() => setPendingDelete(dojo)} className="text-hdki-gray-mid hover:text-red-600" title="Delete">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Dojo Locations" }]}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-hdki-ink">Dojo Locations</h1>
          <p className="mt-1 text-sm text-hdki-gray-mid">Manage dojo locations and facilities</p>
        </div>
        <Button href="/admin/dojos/create" variant="primary" size="sm" icon={<Plus />} iconPosition="left">
          Add Dojo
        </Button>
      </div>

      {loading ? (
        <LoadingState label="Loading dojos..." />
      ) : error ? (
        <ErrorState message={`Error loading dojos: ${error.message}`} onRetry={() => refetch()} />
      ) : dojos.length === 0 ? (
        <EmptyState icon={<MapPin />} title="No dojo locations yet" action={{ label: "Add First Dojo", href: "/admin/dojos/create" }} />
      ) : (
        <DataTable columns={columns} rows={dojos} rowKey={(dojo) => dojo.id} />
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete dojo location?"
        description={pendingDelete ? `"${pendingDelete.name}" will be permanently removed.` : undefined}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </AdminLayout>
  );
}
