"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EVENT } from "@/lib/graphql/queries";
import { UPDATE_EVENT } from "@/lib/graphql/mutations";
import AdminLayout from "@/components/admin/AdminLayout";
import AccessDenied from "@/components/admin/ui/AccessDenied";
import { useToast } from "@/components/admin/ui/Toast";
import LoadingState from "@/components/ui/LoadingState";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Save } from "lucide-react";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const id = String(params?.id || "");

  const { data, loading: loadingQuery } = useQuery(GET_EVENT, { variables: { id }, skip: !id });
  const [updateEvent, { loading }] = useMutation(UPDATE_EVENT, {
    onCompleted: () => {
      toast("Event updated successfully", "success");
      router.push("/admin/events");
    },
    onError: (e) => toast(e.message, "error"),
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    coverImage: "",
    fee: "",
    maxParticipants: "",
    isPublished: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  useEffect(() => {
    const ev = data?.event;
    if (ev) {
      setForm({
        title: ev.title || "",
        description: ev.description || "",
        date: ev.date ? new Date(ev.date).toISOString().slice(0, 16) : "",
        location: ev.location || "",
        coverImage: ev.coverImage || "",
        fee: ev.fee ?? "",
        maxParticipants: ev.maxParticipants ?? "",
        isPublished: !!ev.isPublished,
      });
    }
  }, [data]);

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
    if (!form.date) next.date = "Date is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await updateEvent({
      variables: {
        id,
        title: form.title,
        description: form.description,
        date: form.date ? new Date(form.date).toISOString() : undefined,
        location: form.location,
        coverImageFile: file || undefined,
        fee: form.fee === "" ? null : parseFloat(String(form.fee)),
        maxParticipants: form.maxParticipants === "" ? null : parseInt(String(form.maxParticipants), 10),
        isPublished: form.isPublished,
      },
    });
  };

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Events", href: "/admin/events" },
        { label: "Edit" },
      ]}
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-display text-2xl font-medium text-hdki-ink">Edit Event</h1>
        {loadingQuery ? (
          <LoadingState label="Loading event..." />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 rounded-sm border border-hdki-border bg-white p-6">
            <Input
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              error={errors.title}
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                label="Date"
                type="datetime-local"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                error={errors.date}
              />
              <Input
                label="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                error={errors.location}
              />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                label="Fee (optional)"
                value={String(form.fee)}
                onChange={(e) => setForm({ ...form, fee: e.target.value })}
              />
              <Input
                label="Max Participants (optional)"
                value={String(form.maxParticipants)}
                onChange={(e) => setForm({ ...form, maxParticipants: e.target.value })}
              />
            </div>
            <div>
              <Input
                label="Cover Image URL"
                value={form.coverImage}
                onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
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
              rows={6}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              error={errors.description}
            />
            <label className="flex items-center gap-2 text-sm text-hdki-ink">
              <input
                id="published"
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                className="h-4 w-4 rounded-sm border-hdki-border text-hdki-red focus:ring-hdki-red/20"
              />
              Published
            </label>
            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="primary" size="md" loading={loading} icon={<Save />}>
                Save Changes
              </Button>
              <Button type="button" variant="outline" size="md" onClick={() => router.push("/admin/events")}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
