"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_GALLERY_ITEMS } from "@/lib/graphql/queries";
import { DELETE_GALLERY_ITEM } from "@/lib/graphql/mutations";
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
import { Plus, Eye, Pencil, Trash2, Image as ImageIcon } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  description?: string;
  uploadedAt: string;
}

export default function AdminGallery() {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [pendingDelete, setPendingDelete] = useState<GalleryItem | null>(null);

  const { data, loading, error, refetch } = useQuery(GET_GALLERY_ITEMS);
  const [deleteGalleryItem, { loading: deleting }] = useMutation(DELETE_GALLERY_ITEM);

  if (!isAdmin) {
    return (
      <AdminLayout>
        <AccessDenied />
      </AdminLayout>
    );
  }

  const items: GalleryItem[] = data?.galleryItems || [];

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteGalleryItem({
        variables: { id: pendingDelete.id },
        update: (cache) => {
          cache.modify({
            fields: {
              galleryItems(existingItems = []) {
                return existingItems.filter((item: { __ref: string }) => item.__ref !== `Gallery:${pendingDelete.id}`);
              },
            },
          });
        },
      });
      toast("Gallery item deleted", "success");
      setPendingDelete(null);
      refetch();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to delete gallery item", "error");
    }
  };

  const columns: DataTableColumn<GalleryItem>[] = [
    {
      key: "title",
      label: "Image",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm bg-hdki-gray-light">
            {item.image && <Image src={item.image} alt={item.title} fill unoptimized sizes="40px" className="object-cover" />}
          </div>
          <span className="font-medium text-hdki-ink">{item.title}</span>
        </div>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (item) => <span className="line-clamp-2 text-hdki-gray-mid">{item.description || "—"}</span>,
    },
    {
      key: "uploadedAt",
      label: "Uploaded",
      render: (item) => <span className="text-hdki-gray-mid">{new Date(item.uploadedAt).toLocaleDateString()}</span>,
    },
    {
      key: "actions",
      label: "",
      className: "text-right",
      render: (item) => (
        <div className="flex items-center justify-end gap-3">
          <Link href="/gallery" className="text-hdki-gray-mid hover:text-hdki-ink" title="View">
            <Eye className="h-4 w-4" />
          </Link>
          <Link href={`/admin/gallery/${item.id}/edit`} className="text-hdki-gray-mid hover:text-hdki-red" title="Edit">
            <Pencil className="h-4 w-4" />
          </Link>
          <button onClick={() => setPendingDelete(item)} className="text-hdki-gray-mid hover:text-red-600" title="Delete">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Gallery" }]}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-hdki-ink">Gallery</h1>
          <p className="mt-1 text-sm text-hdki-gray-mid">Manage gallery images and content</p>
        </div>
        <Button href="/admin/gallery/create" variant="primary" size="sm" icon={<Plus />} iconPosition="left">
          Add Image
        </Button>
      </div>

      {loading ? (
        <LoadingState label="Loading gallery..." />
      ) : error ? (
        <ErrorState message={`Error loading gallery: ${error.message}`} onRetry={() => refetch()} />
      ) : items.length === 0 ? (
        <EmptyState icon={<ImageIcon />} title="No gallery items yet" action={{ label: "Add First Image", href: "/admin/gallery/create" }} />
      ) : (
        <DataTable columns={columns} rows={items} rowKey={(item) => item.id} />
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete gallery item?"
        description={pendingDelete ? `"${pendingDelete.title}" will be permanently removed.` : undefined}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </AdminLayout>
  );
}
