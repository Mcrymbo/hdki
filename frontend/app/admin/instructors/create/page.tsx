"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { GET_DOJO_LOCATIONS } from "@/lib/graphql/queries";
import { CREATE_INSTRUCTOR } from "@/lib/graphql/mutations";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function CreateInstructorPage() {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const { data } = useQuery(GET_DOJO_LOCATIONS);
  const dojos = data?.dojoLocations || [];

  const [form, setForm] = useState({ name: "", rank: "", bio: "", photo: "", dojoLocationId: "" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [file, setFile] = useState<File | null>(null);
  const [createInstructor, { loading }] = useMutation(CREATE_INSTRUCTOR, {
    onCompleted: () => { alert("Instructor created"); router.push("/admin/instructors"); },
    onError: (e) => alert(e.message),
  });

  useEffect(() => {
    if (!form.dojoLocationId && dojos[0]) {
      setForm((f) => ({ ...f, dojoLocationId: dojos[0].id }));
    }
  }, [dojos]);

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
    if (!form.rank.trim()) next.rank = "Rank is required";
    if (!form.dojoLocationId) next.dojoLocationId = "Select a dojo";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await createInstructor({ variables: { ...form, photoFile: file || undefined } });
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto bg-white shadow p-6">
        <h1 className="text-2xl font-light text-gray-900 mb-6">Add Instructor</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input className="w-full border px-3 py-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Rank</label>
            <input className="w-full border px-3 py-2" value={form.rank} onChange={(e) => setForm({ ...form, rank: e.target.value })} />
            {errors.rank && <p className="text-sm text-red-600">{errors.rank}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Photo URL</label>
            <input className="w-full border px-3 py-2" value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} />
            <div className="mt-2">
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Dojo Location</label>
            <select className="w-full border px-3 py-2" value={form.dojoLocationId} onChange={(e) => setForm({ ...form, dojoLocationId: e.target.value })}>
              {dojos.map((d: any) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            {errors.dojoLocationId && <p className="text-sm text-red-600">{errors.dojoLocationId}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Bio</label>
            <textarea className="w-full border px-3 py-2" rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="bg-hdki-red hover:bg-hdki-red-dark text-white px-6 py-2 font-semibold disabled:opacity-60">{loading ? "Creating..." : "Create"}</button>
            <button type="button" onClick={() => router.push("/admin/instructors")} className="border px-6 py-2">Cancel</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}


