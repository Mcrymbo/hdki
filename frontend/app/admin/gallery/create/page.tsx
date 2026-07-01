"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { CREATE_GALLERY_ITEM } from "@/lib/graphql/mutations";
import AdminLayout from "@/components/admin/AdminLayout";
import AccessDenied from "@/components/admin/ui/AccessDenied";
import { useToast } from "@/components/admin/ui/Toast";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Save } from "lucide-react";

export default function CreateGalleryItemPage() {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  const [form, setForm] = useState({ title: "", image: "", description: "" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [file, setFile] = useState<File | null>(null);

  const [createItem, { loading }] = useMutation(CREATE_GALLERY_ITEM, {
    onCompleted: () => {
      toast("Gallery item created successfully", "success");
      router.push("/admin/gallery");
    },
    onError: (e) => toast(e.message, "error"),
  });

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
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await createItem({ variables: { ...form, imageFile: file || undefined } });
  };

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Gallery", href: "/admin/gallery" },
        { label: "Create" },
      ]}
    >
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 font-display text-2xl font-medium text-hdki-ink">Add Gallery Item</h1>
        <form onSubmit={handleSubmit} className="space-y-5 rounded-sm border border-hdki-border bg-white p-6">
          <Input
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Summer Training Camp"
            error={errors.title}
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-hdki-ink">Image File</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-hdki-gray-mid file:mr-3 file:rounded-sm file:border-0 file:bg-hdki-gray-light file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-hdki-ink hover:file:bg-hdki-border"
            />
          </div>
          <Textarea
            label="Description"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="About this photo..."
          />
          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" size="md" loading={loading} icon={<Save />}>
              Create
            </Button>
            <Button type="button" variant="outline" size="md" onClick={() => router.push("/admin/gallery")}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
