"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { GET_DOJO_LOCATION } from "@/lib/graphql/queries";
import { UPDATE_DOJO_LOCATION } from "@/lib/graphql/mutations";
import AdminLayout from "@/components/admin/AdminLayout";
import AccessDenied from "@/components/admin/ui/AccessDenied";
import { useToast } from "@/components/admin/ui/Toast";
import LoadingState from "@/components/ui/LoadingState";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Save } from "lucide-react";

export default function EditDojoPage() {
  const router = useRouter();
  const params = useParams();
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const id = String(params?.id || "");

  const { data, loading: loadingQuery } = useQuery(GET_DOJO_LOCATION, { variables: { id }, skip: !id });
  const [updateDojo, { loading }] = useMutation(UPDATE_DOJO_LOCATION, {
    onCompleted: () => {
      toast("Dojo updated successfully", "success");
      router.push("/admin/dojos");
    },
    onError: (e) => toast(e.message, "error"),
  });

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

  useEffect(() => {
    const dojo = data?.dojoLocation;
    if (dojo) {
      setForm({
        name: dojo.name || "",
        address: dojo.address || "",
        city: dojo.city || "",
        country: dojo.country || "",
        mapLink: dojo.mapLink || "",
        description: dojo.description || "",
        coverImage: dojo.coverImage || "",
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
    await updateDojo({ variables: { id, ...form, coverImageFile: file || undefined } });
  };

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Dojo Locations", href: "/admin/dojos" },
        { label: "Edit" },
      ]}
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-display text-2xl font-medium text-hdki-ink">Edit Dojo Location</h1>
        {loadingQuery ? (
          <LoadingState label="Loading dojo..." />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 rounded-sm border border-hdki-border bg-white p-6">
            <Input
              label="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={errors.name}
            />
            <Input
              label="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              error={errors.address}
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                label="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                error={errors.city}
              />
              <Input
                label="Country"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                error={errors.country}
              />
            </div>
            <Input
              label="Google Map Link"
              value={form.mapLink}
              onChange={(e) => setForm({ ...form, mapLink: e.target.value })}
            />
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
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="primary" size="md" loading={loading} icon={<Save />}>
                Save Changes
              </Button>
              <Button type="button" variant="outline" size="md" onClick={() => router.push("/admin/dojos")}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
