"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "@/lib/graphql/mutations";
import AdminLayout from "@/components/admin/AdminLayout";
import AccessDenied from "@/components/admin/ui/AccessDenied";
import { useToast } from "@/components/admin/ui/Toast";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Save } from "lucide-react";

export default function CreateUserPage() {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    isAdmin: false,
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      if (data?.createUser?.success) {
        toast("User created successfully", "success");
        router.push("/admin/users");
      } else {
        toast(data?.createUser?.message || "Failed to create user", "error");
      }
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
    if (!form.username.trim()) next.username = "Username is required";
    if (!form.email.trim()) next.email = "Email is required";
    if (!form.password) next.password = "Password is required";
    else if (form.password.length < 8) next.password = "Password must be at least 8 characters long";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await createUser({
      variables: {
        username: form.username,
        email: form.email,
        password: form.password,
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
        is_admin: form.isAdmin,
      },
    });
  };

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Users", href: "/admin/users" },
        { label: "Create" },
      ]}
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-display text-2xl font-medium text-hdki-ink">Add User</h1>
        <form onSubmit={handleSubmit} className="space-y-5 rounded-sm border border-hdki-border bg-white p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              label="First Name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              placeholder="First name"
            />
            <Input
              label="Last Name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              placeholder="Last name"
            />
          </div>
          <Input
            label="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="Choose a username"
            error={errors.username}
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="user@example.com"
            error={errors.email}
          />
          <Input
            label="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone number (optional)"
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Create a password"
            error={errors.password}
            hint={errors.password ? undefined : "Must be at least 8 characters long"}
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
              Create
            </Button>
            <Button type="button" variant="outline" size="md" onClick={() => router.push("/admin/users")}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
