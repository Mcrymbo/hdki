"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { GET_DOJO_LOCATIONS } from "@/lib/graphql/queries";
import { CREATE_INSTRUCTOR } from "@/lib/graphql/mutations";
import AdminLayout from "@/components/admin/AdminLayout";
import AccessDenied from "@/components/admin/ui/AccessDenied";
import { useToast } from "@/components/admin/ui/Toast";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Save } from "lucide-react";

interface DojoLocation {
  id: string;
  name: string;
}

export default function CreateInstructorPage() {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const { data } = useQuery(GET_DOJO_LOCATIONS);
  const dojos: DojoLocation[] = data?.dojoLocations || [];

  const [form, setForm] = useState({ name: "", rank: "", bio: "", photo: "", dojoLocationId: "" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [file, setFile] = useState<File | null>(null);
  const [createInstructor, { loading }] = useMutation(CREATE_INSTRUCTOR, {
    onCompleted: () => {
      toast("Instructor created successfully", "success");
      router.push("/admin/instructors");
    },
    onError: (e) => toast(e.message, "error"),
  });

  useEffect(() => {
    if (!form.dojoLocationId && dojos[0]) {
      setForm((f) => ({ ...f, dojoLocationId: dojos[0].id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dojos]);

  if (!isAdmin) {
    return (
      <AdminLayout>
        <AccessDenied />
      </AdminLayout>
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
    <AdminLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Instructors", href: "/admin/instructors" },
        { label: "Create" },
      ]}
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-display text-2xl font-medium text-hdki-ink">Add Instructor</h1>
        <form onSubmit={handleSubmit} className="space-y-5 rounded-sm border border-hdki-border bg-white p-6">
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Sensei Jane Doe"
            error={errors.name}
          />
          <Input
            label="Rank"
            value={form.rank}
            onChange={(e) => setForm({ ...form, rank: e.target.value })}
            placeholder="4th Dan Black Belt"
            error={errors.rank}
          />
          <div>
            <label htmlFor="dojoLocationId" className="mb-1.5 block text-sm font-medium text-hdki-ink">
              Dojo Location
            </label>
            <select
              id="dojoLocationId"
              value={form.dojoLocationId}
              onChange={(e) => setForm({ ...form, dojoLocationId: e.target.value })}
              className="block w-full rounded-sm border border-hdki-border px-3 py-2.5 text-sm text-hdki-ink transition-colors focus:border-hdki-red focus:outline-none focus:ring-2 focus:ring-hdki-red/20"
            >
              {dojos.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            {errors.dojoLocationId && <p className="mt-1.5 text-sm text-red-600">{errors.dojoLocationId}</p>}
          </div>
          <div>
            <Input
              label="Photo URL"
              value={form.photo}
              onChange={(e) => setForm({ ...form, photo: e.target.value })}
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
            label="Bio"
            rows={4}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            placeholder="About this instructor..."
          />
          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" size="md" loading={loading} icon={<Save />}>
              Create
            </Button>
            <Button type="button" variant="outline" size="md" onClick={() => router.push("/admin/instructors")}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
