"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { GET_GALLERY_ITEMS } from "@/lib/graphql/queries";
import { UPDATE_GALLERY_ITEM } from "@/lib/graphql/mutations";
import AdminLayout from "@/components/admin/AdminLayout";
import AccessDenied from "@/components/admin/ui/AccessDenied";
import { useToast } from "@/components/admin/ui/Toast";
import LoadingState from "@/components/ui/LoadingState";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Save } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  description?: string;
}

export default function EditGalleryItemPage() {
  const router = useRouter();
  const params = useParams();
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const id = String(params?.id || "");

  // There is no single-item query; fetch list and select
  const { data, loading: loadingQuery } = useQuery(GET_GALLERY_ITEMS);
  const [updateItem, { loading }] = useMutation(UPDATE_GALLERY_ITEM, {
    onCompleted: () => {
      toast("Gallery item updated successfully", "success");
      router.push("/admin/gallery");
    },
    onError: (e) => toast(e.message, "error"),
  });

  const [form, setForm] = useState({ title: "", image: "", description: "" });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  useEffect(() => {
    const item = data?.galleryItems?.find((x: GalleryItem) => x.id === id);
    if (item) {
      setForm({ title: item.title || "", image: item.image || "", description: item.description || "" });
    }
  }, [data, id]);

  if (!isAdmin) {
    return (
      <AdminLayout>
        <AccessDenied />
      </AdminLayout>
    );
  }

  const validate = () => {
    const next: { [k: string]: string } = {};
    if (!form.title.trim()) next.title = "Title is required";
    if (!form.image.trim()) next.image = "Image URL is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await updateItem({ variables: { id, ...form, imageFile: file || undefined } });
  };

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Gallery", href: "/admin/gallery" },
        { label: "Edit" },
      ]}
    >
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 font-display text-2xl font-medium text-hdki-ink">Edit Gallery Item</h1>
        {loadingQuery ? (
          <LoadingState label="Loading gallery item..." />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 rounded-sm border border-hdki-border bg-white p-6">
            <Input
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              error={errors.title}
            />
            <div>
              <Input
                label="Image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                error={errors.image}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mt-2 block w-full text-sm text-hdki-gray-mid file:mr-3 file:rounded-sm file:border-0 file:bg-hdki-gray-light file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-hdki-ink hover:file:bg-hdki-border"
              />
            </div>
            <Textarea
              label="Description"
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="primary" size="md" loading={loading} icon={<Save />}>
                Save Changes
              </Button>
              <Button type="button" variant="outline" size="md" onClick={() => router.push("/admin/gallery")}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
