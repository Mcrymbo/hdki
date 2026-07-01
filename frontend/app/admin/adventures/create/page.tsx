"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { CREATE_KARATE_ADVENTURE } from "@/lib/graphql/mutations";
import AdminLayout from "@/components/admin/AdminLayout";
import AccessDenied from "@/components/admin/ui/AccessDenied";
import { useToast } from "@/components/admin/ui/Toast";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Save } from "lucide-react";

export default function CreateAdventurePage() {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  const [form, setForm] = useState({ title: "", description: "", startDate: "", endDate: "", location: "", coverImage: "" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [file, setFile] = useState<File | null>(null);

  const [createAdventure, { loading }] = useMutation(CREATE_KARATE_ADVENTURE, {
    onCompleted: () => {
      toast("Adventure created successfully", "success");
      router.push("/admin/adventures");
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
    if (!form.description.trim()) next.description = "Description is required";
    if (!form.location.trim()) next.location = "Location is required";
    if (!form.startDate) next.startDate = "Start date is required";
    if (!form.endDate) next.endDate = "End date is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await createAdventure({
      variables: {
        ...form,
        coverImageFile: file || undefined,
        startDate: new Date(form.startDate).toISOString(),
        endDate: new Date(form.endDate).toISOString(),
      },
    });
  };

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Adventures", href: "/admin/adventures" },
        { label: "Create" },
      ]}
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-display text-2xl font-medium text-hdki-ink">Create Adventure</h1>
        <form onSubmit={handleSubmit} className="space-y-5 rounded-sm border border-hdki-border bg-white p-6">
          <Input
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Mount Kenya Karate Expedition"
            error={errors.title}
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              label="Start Date"
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              error={errors.startDate}
            />
            <Input
              label="End Date"
              type="date"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              error={errors.endDate}
            />
          </div>
          <Input
            label="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Mount Kenya, Kenya"
            error={errors.location}
          />
          <div>
            <Input
              label="Cover Image URL"
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              placeholder="https://...jpg"
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
            placeholder="About this adventure..."
            error={errors.description}
          />
          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" size="md" loading={loading} icon={<Save />}>
              Create
            </Button>
            <Button type="button" variant="outline" size="md" onClick={() => router.push("/admin/adventures")}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
