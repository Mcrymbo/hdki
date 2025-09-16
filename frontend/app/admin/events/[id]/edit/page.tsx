"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EVENT } from "@/lib/graphql/queries";
import { UPDATE_EVENT } from "@/lib/graphql/mutations";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const { isAdmin } = useAuth();
  const id = String(params?.id || "");

  const { data, loading: loadingQuery } = useQuery(GET_EVENT, { variables: { id }, skip: !id });
  const [updateEvent, { loading }] = useMutation(UPDATE_EVENT, {
    onCompleted: () => { alert("Event updated"); router.push("/admin/events"); },
    onError: (e) => alert(e.message),
  });

  const [form, setForm] = useState({ title: "", description: "", date: "", location: "", coverImage: "", fee: "", maxParticipants: "", isPublished: false });
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
      } as any);
    }
  }, [data]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You need admin privileges to access this page.</p>
        </div>
      </div>
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
    await updateEvent({ variables: {
      id,
      title: form.title,
      description: form.description,
      date: form.date ? new Date(form.date).toISOString() : undefined,
      location: form.location,
      coverImageFile: file || undefined,
      fee: form.fee === "" ? null : parseFloat(String(form.fee)),
      maxParticipants: form.maxParticipants === "" ? null : parseInt(String(form.maxParticipants), 10),
      isPublished: form.isPublished,
    }});
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-white shadow p-6">
        <h1 className="text-2xl font-light text-gray-900 mb-6">Edit Event</h1>
        {loadingQuery ? (
          <div className="py-12 text-center">Loading...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Title</label>
              <input className="w-full border px-3 py-2" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Date</label>
                <input type="datetime-local" className="w-full border px-3 py-2" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                {errors.date && <p className="text-sm text-red-600">{errors.date}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Location</label>
                <input className="w-full border px-3 py-2" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                {errors.location && <p className="text-sm text-red-600">{errors.location}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Fee (optional)</label>
                <input className="w-full border px-3 py-2" value={String(form.fee)} onChange={(e) => setForm({ ...form, fee: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Max Participants (optional)</label>
                <input className="w-full border px-3 py-2" value={String(form.maxParticipants)} onChange={(e) => setForm({ ...form, maxParticipants: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Cover Image URL</label>
              <input className="w-full border px-3 py-2" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} />
              <div className="mt-2">
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Description</label>
              <textarea className="w-full border px-3 py-2" rows={6} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
            </div>
            <div className="flex items-center gap-2">
              <input id="published" type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
              <label htmlFor="published" className="text-sm text-gray-700">Published</label>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-2 font-semibold disabled:opacity-60">{loading ? "Saving..." : "Save Changes"}</button>
              <button type="button" onClick={() => router.push("/admin/events")} className="border px-6 py-2">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}



