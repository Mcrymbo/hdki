"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { CREATE_GALLERY_ITEM } from "@/lib/graphql/mutations";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function CreateGalleryItemPage() {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const [form, setForm] = useState({ title: "", image: "", description: "" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [file, setFile] = useState<File | null>(null);
  const [createItem, { loading }] = useMutation(CREATE_GALLERY_ITEM, {
    onCompleted: () => { alert("Gallery item created"); router.push("/admin/gallery"); },
    onError: (e) => alert(e.message),
  });

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
    // if (!form.image.trim()) next.image = "Image URL is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await createItem({ variables: { ...form, imageFile: file || undefined } });
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto bg-white shadow p-6">
        <h1 className="text-2xl font-light text-gray-900 mb-6">Add Gallery Item</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Title</label>
            <input className="w-full border px-3 py-2" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Image File</label>
            {/* <input className="w-full border px-3 py-2" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            {errors.image && <p className="text-sm text-red-600">{errors.image}</p>} */}
            <div className="mt-2">
              <input type="file" accept="image/*" className="w-full border px-3 py-2" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Description</label>
            <textarea className="w-full border px-3 py-2" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-2 font-semibold disabled:opacity-60">{loading ? "Creating..." : "Create"}</button>
            <button type="button" onClick={() => router.push("/admin/gallery")} className="border px-6 py-2">Cancel</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}


