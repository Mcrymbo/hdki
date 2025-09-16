"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { CREATE_DOJO_LOCATION } from "@/lib/graphql/mutations";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function CreateDojoPage() {
  const router = useRouter();
  const { isAdmin } = useAuth();

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    mapLink: "",
    description: "",
    coverImage: "",
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [file, setFile] = useState<File | null>(null);

  const [createDojo, { loading }] = useMutation(CREATE_DOJO_LOCATION, {
    onCompleted: () => {
      alert("Dojo created successfully");
      router.push("/admin/dojos");
    },
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
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.address.trim()) next.address = "Address is required";
    if (!form.city.trim()) next.city = "City is required";
    if (!form.country.trim()) next.country = "Country is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await createDojo({ variables: { ...form, coverImageFile: file || undefined } });
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-white shadow p-6">
        <h1 className="text-2xl font-light text-gray-900 mb-6">Create Dojo Location</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              className="w-full border px-3 py-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="HDKI Nairobi"
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Address</label>
            <input
              className="w-full border px-3 py-2"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="123 Main St"
            />
            {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">City</label>
              <input
                className="w-full border px-3 py-2"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Nairobi"
              />
              {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Country</label>
              <input
                className="w-full border px-3 py-2"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                placeholder="Kenya"
              />
              {errors.country && <p className="text-sm text-red-600">{errors.country}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Google Map Link</label>
            <input
              className="w-full border px-3 py-2"
              value={form.mapLink}
              onChange={(e) => setForm({ ...form, mapLink: e.target.value })}
              placeholder="https://maps.google.com/..."
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Cover Image URL</label>
            <input
              className="w-full border px-3 py-2"
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              placeholder="https://...jpg"
            />
            <div className="mt-2">
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full border px-3 py-2"
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="About this dojo..."
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-2 font-semibold disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/dojos")}
              className="border px-6 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}


