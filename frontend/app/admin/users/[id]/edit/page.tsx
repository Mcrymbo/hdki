"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS } from "@/lib/graphql/queries";
import { UPDATE_USER } from "@/lib/graphql/mutations";
import AdminLayout from "@/components/admin/AdminLayout";
import AccessDenied from "@/components/admin/ui/AccessDenied";
import { useToast } from "@/components/admin/ui/Toast";
import LoadingState from "@/components/ui/LoadingState";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Save } from "lucide-react";

interface AdminUser {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  isAdmin: boolean;
}

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const id = String(params?.id || "");

  // There is no singular GET_USER query, so fetch the full list and find the matching user client-side.
  const { data, loading: loadingQuery } = useQuery(GET_USERS);
  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    onCompleted: (result) => {
      if (result?.updateUser?.success) {
        toast("User updated successfully", "success");
        router.push("/admin/users");
      } else {
        toast(result?.updateUser?.message || "Failed to update user", "error");
      }
    },
    onError: (e) => toast(e.message, "error"),
  });

  const [form, setForm] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    isAdmin: false,
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const user: AdminUser | undefined = useMemo(
    () => (data?.users || []).find((u: AdminUser) => u.id === id),
    [data, id]
  );

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        isAdmin: !!user.isAdmin,
      });
    }
  }, [user]);

  if (!isAdmin) {
    return (
      <AdminLayout>
        <AccessDenied />
      </AdminLayout>
    );
  }

  const validate = () => {
    const next: { [k: string]: string } = {};
    if (!form.username.trim()) next.username = "Username is required";
    if (!form.email.trim()) next.email = "Email is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await updateUser({ variables: { id, ...form } });
  };

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Users", href: "/admin/users" },
        { label: "Edit" },
      ]}
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-display text-2xl font-medium text-hdki-ink">Edit User</h1>
        {loadingQuery ? (
          <LoadingState label="Loading user..." />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 rounded-sm border border-hdki-border bg-white p-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                label="First Name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
              <Input
                label="Last Name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
            <Input
              label="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              error={errors.username}
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
            <Input
              label="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <div className="flex items-center gap-2">
              <input
                id="isAdmin"
                type="checkbox"
                checked={form.isAdmin}
                onChange={(e) => setForm({ ...form, isAdmin: e.target.checked })}
                className="h-4 w-4 rounded-sm border-hdki-border text-hdki-red focus:ring-hdki-red/20"
              />
              <label htmlFor="isAdmin" className="text-sm text-hdki-ink">
                Grant admin privileges
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="primary" size="md" loading={loading} icon={<Save />}>
                Save Changes
              </Button>
              <Button type="button" variant="outline" size="md" onClick={() => router.push("/admin/users")}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
