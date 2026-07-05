"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_INSTRUCTORS } from "@/lib/graphql/queries";
import { DELETE_INSTRUCTOR } from "@/lib/graphql/mutations";
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
import { Plus, Eye, Pencil, Trash2, Users, MapPin } from "lucide-react";

interface Instructor {
  id: string;
  name: string;
  rank: string;
  bio?: string;
  photo?: string;
  dojoLocation?: { id: string; name: string; city: string; country: string };
}

export default function AdminInstructors() {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [pendingDelete, setPendingDelete] = useState<Instructor | null>(null);

  const { data, loading, error, refetch } = useQuery(GET_INSTRUCTORS);
  const [deleteInstructor, { loading: deleting }] = useMutation(DELETE_INSTRUCTOR);

  if (!isAdmin) {
    return (
      <AdminLayout>
        <AccessDenied />
      </AdminLayout>
    );
  }

  const instructors: Instructor[] = data?.instructors || [];

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteInstructor({
        variables: { id: pendingDelete.id },
        update: (cache) => {
          cache.modify({
            fields: {
              instructors(existingInstructors = []) {
                return existingInstructors.filter(
                  (i: { __ref: string }) => i.__ref !== `Instructor:${pendingDelete.id}`
                );
              },
            },
          });
        },
      });
      toast("Instructor deleted", "success");
      setPendingDelete(null);
      refetch();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to delete instructor", "error");
    }
  };

  const columns: DataTableColumn<Instructor>[] = [
    {
      key: "name",
      label: "Instructor",
      render: (instructor) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm bg-hdki-gray-light">
            {instructor.photo && (
              <Image
                src={instructor.photo}
                alt={instructor.name}
                fill
                unoptimized
                sizes="40px"
                className="object-cover"
              />
            )}
          </div>
          <span className="font-medium text-hdki-ink">{instructor.name}</span>
        </div>
      ),
    },
    { key: "rank", label: "Rank" },
    {
      key: "dojo",
      label: "Dojo Location",
      render: (instructor) =>
        instructor.dojoLocation ? (
          <span className="flex items-center gap-1.5 text-hdki-gray-mid">
            <MapPin className="h-3.5 w-3.5 text-hdki-red" />
            {instructor.dojoLocation.name}
          </span>
        ) : (
          <span className="text-hdki-gray-mid">—</span>
        ),
    },
    {
      key: "actions",
      label: "",
      className: "text-right",
      render: (instructor) => (
        <div className="flex items-center justify-end gap-3">
          <Link
            href={`/instructors/${instructor.id}`}
            className="text-hdki-gray-mid hover:text-hdki-ink"
            title="View"
          >
            <Eye className="h-4 w-4" />
          </Link>
          <Link
            href={`/admin/instructors/${instructor.id}/edit`}
            className="text-hdki-gray-mid hover:text-hdki-red"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setPendingDelete(instructor)}
            className="text-hdki-gray-mid hover:text-red-600"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Instructors" }]}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-hdki-ink">Instructors</h1>
          <p className="mt-1 text-sm text-hdki-gray-mid">Manage instructors and their profiles</p>
        </div>
        <Button href="/admin/instructors/create" variant="primary" size="sm" icon={<Plus />} iconPosition="left">
          Add Instructor
        </Button>
      </div>

      {loading ? (
        <LoadingState label="Loading instructors..." />
      ) : error ? (
        <ErrorState message={`Error loading instructors: ${error.message}`} onRetry={() => refetch()} />
      ) : instructors.length === 0 ? (
        <EmptyState
          icon={<Users />}
          title="No instructors yet"
          action={{ label: "Add First Instructor", href: "/admin/instructors/create" }}
        />
      ) : (
        <DataTable columns={columns} rows={instructors} rowKey={(instructor) => instructor.id} />
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete instructor?"
        description={pendingDelete ? `"${pendingDelete.name}" will be permanently removed.` : undefined}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </AdminLayout>
  );
}
