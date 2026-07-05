"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS } from "@/lib/graphql/queries";
import { DELETE_USER } from "@/lib/graphql/mutations";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable, { type DataTableColumn } from "@/components/admin/ui/DataTable";
import AccessDenied from "@/components/admin/ui/AccessDenied";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import { useToast } from "@/components/admin/ui/Toast";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Plus, Pencil, Trash2, Mail, Phone, Shield, User as UserIcon, Users } from "lucide-react";
import { cn } from "@/lib/cn";

interface AdminUser {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  isAdmin: boolean;
  dateJoined: string;
}

export default function AdminUsers() {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [pendingDelete, setPendingDelete] = useState<AdminUser | null>(null);

  const { data, loading, error, refetch } = useQuery(GET_USERS);
  const [deleteUser, { loading: deleting }] = useMutation(DELETE_USER);

  if (!isAdmin) {
    return (
      <AdminLayout>
        <AccessDenied />
      </AdminLayout>
    );
  }

  const users: AdminUser[] = data?.users || [];

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteUser({
        variables: { id: pendingDelete.id },
        update: (cache) => {
          cache.modify({
            fields: {
              users(existingUsers = []) {
                return existingUsers.filter((u: { __ref: string }) => u.__ref !== `User:${pendingDelete.id}`);
              },
            },
          });
        },
      });
      toast("User deleted", "success");
      setPendingDelete(null);
      refetch();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to delete user", "error");
    }
  };

  const columns: DataTableColumn<AdminUser>[] = [
    {
      key: "user",
      label: "User",
      render: (user) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hdki-red text-sm font-medium text-white">
            {user.firstName ? user.firstName[0] : user.username[0]?.toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-hdki-ink">
              {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username}
            </div>
            <div className="text-xs text-hdki-gray-mid">@{user.username}</div>
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      label: "Contact",
      render: (user) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-hdki-ink">
            <Mail className="h-3.5 w-3.5 text-hdki-gray-mid" />
            {user.email}
          </div>
          {user.phone && (
            <div className="flex items-center gap-1.5 text-hdki-gray-mid">
              <Phone className="h-3.5 w-3.5 text-hdki-gray-mid" />
              {user.phone}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (user) => (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs font-semibold",
            user.isAdmin ? "bg-red-100 text-red-800" : "bg-hdki-gray-light text-hdki-gray-mid"
          )}
        >
          {user.isAdmin ? <Shield className="h-3.5 w-3.5" /> : <UserIcon className="h-3.5 w-3.5" />}
          {user.isAdmin ? "Admin" : "User"}
        </span>
      ),
    },
    {
      key: "joined",
      label: "Joined",
      render: (user) => (user.dateJoined ? new Date(user.dateJoined).toLocaleDateString() : "—"),
    },
    {
      key: "actions",
      label: "",
      className: "text-right",
      render: (user) => (
        <div className="flex items-center justify-end gap-3">
          <Link href={`/admin/users/${user.id}/edit`} className="text-hdki-gray-mid hover:text-hdki-red" title="Edit">
            <Pencil className="h-4 w-4" />
          </Link>
          <button onClick={() => setPendingDelete(user)} className="text-hdki-gray-mid hover:text-red-600" title="Delete">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Users" }]}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-hdki-ink">Users Management</h1>
          <p className="mt-1 text-sm text-hdki-gray-mid">Manage user accounts and permissions</p>
        </div>
        <Button href="/admin/users/create" variant="primary" size="sm" icon={<Plus />} iconPosition="left">
          Add User
        </Button>
      </div>

      {loading ? (
        <LoadingState label="Loading users..." />
      ) : error ? (
        <ErrorState message={`Error loading users: ${error.message}`} onRetry={() => refetch()} />
      ) : users.length === 0 ? (
        <EmptyState icon={<Users />} title="No users found" action={{ label: "Add First User", href: "/admin/users/create" }} />
      ) : (
        <DataTable columns={columns} rows={users} rowKey={(user) => user.id} />
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete user?"
        description={pendingDelete ? `"${pendingDelete.username}" will be permanently removed.` : undefined}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </AdminLayout>
  );
}
