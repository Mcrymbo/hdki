"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { GET_KARATE_ADVENTURE } from "@/lib/graphql/queries";
import { UPDATE_KARATE_ADVENTURE } from "@/lib/graphql/mutations";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function EditAdventurePage() {
  const router = useRouter();
  const params = useParams();
  const { isAdmin } = useAuth();
  const id = String(params?.id || "");

  const { data, loading: loadingQuery } = useQuery(GET_KARATE_ADVENTURE, { variables: { id }, skip: !id });
  const [file, setFile] = useState<File | null>(null);
  const [updateAdventure, { loading }] = useMutation(UPDATE_KARATE_ADVENTURE, {
    onCompleted: () => { alert("Adventure updated"); router.push("/admin/adventures"); },
    onError: (e) => alert(e.message),
  });

  const [form, setForm] = useState({ title: "", description: "", startDate: "", endDate: "", location: "", coverImage: "" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  useEffect(() => {
    const adv = data?.karateAdventure;
    if (adv) {
      setForm({
        title: adv.title || "",
        description: adv.description || "",
        startDate: adv.startDate ? adv.startDate.substring(0, 10) : "",
        endDate: adv.endDate ? adv.endDate.substring(0, 10) : "",
        location: adv.location || "",
        coverImage: adv.coverImage || "",
      });
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
    if (!form.startDate) next.startDate = "Start date is required";
    if (!form.endDate) next.endDate = "End date is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await updateAdventure({ variables: { id, ...form, coverImageFile: file || undefined, startDate: new Date(form.startDate).toISOString(), endDate: new Date(form.endDate).toISOString() } });
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-white shadow p-6">
        <h1 className="text-2xl font-light text-gray-900 mb-6">Edit Adventure</h1>
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
                <label className="block text-sm text-gray-700 mb-1">Start Date</label>
                <input type="date" className="w-full border px-3 py-2" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
                {errors.startDate && <p className="text-sm text-red-600">{errors.startDate}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">End Date</label>
                <input type="date" className="w-full border px-3 py-2" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
                {errors.endDate && <p className="text-sm text-red-600">{errors.endDate}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Location</label>
              <input className="w-full border px-3 py-2" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              {errors.location && <p className="text-sm text-red-600">{errors.location}</p>}
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
              <textarea className="w-full border px-3 py-2" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-2 font-semibold disabled:opacity-60">{loading ? "Saving..." : "Save Changes"}</button>
              <button type="button" onClick={() => router.push("/admin/adventures")} className="border px-6 py-2">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}


