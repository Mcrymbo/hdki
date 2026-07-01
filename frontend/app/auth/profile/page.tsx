"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { User, Mail, Phone, Calendar, Shield, LogOut, ShieldAlert } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import Button from "@/components/ui/Button";
import IconCircle from "@/components/ui/IconCircle";

export default function ProfilePage() {
  const { user, logout, isAdmin } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!user) {
    return (
      <AuthShell>
        <div className="rounded-sm border border-hdki-border bg-white p-8 text-center shadow-sm">
          <IconCircle icon={<ShieldAlert />} size="lg" className="mx-auto mb-4" />
          <h1 className="font-display text-2xl font-medium text-hdki-ink sm:text-3xl">Access Denied</h1>
          <p className="mt-2 text-sm text-hdki-gray-mid">You need to be logged in to view this page.</p>
          <Button href="/auth/login" variant="primary" size="md" className="mt-6">
            Go to Login
          </Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell maxWidth="max-w-3xl">
      <div className="rounded-sm border border-hdki-border bg-white p-8 shadow-sm">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <IconCircle icon={<User />} size="lg" />
            <div>
              <h1 className="font-display text-2xl font-medium text-hdki-ink sm:text-3xl">
                {user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username}
              </h1>
              <p className="text-sm text-hdki-gray-mid">Profile Information</p>
            </div>
          </div>
          <Button variant="outline" size="sm" icon={<LogOut />} onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 shrink-0 text-hdki-red" />
              <div>
                <p className="text-sm font-medium text-hdki-gray-mid">Username</p>
                <p className="text-lg text-hdki-ink">{user.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-hdki-red" />
              <div>
                <p className="text-sm font-medium text-hdki-gray-mid">Email</p>
                <p className="text-lg text-hdki-ink">{user.email}</p>
              </div>
            </div>

            {user.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-hdki-red" />
                <div>
                  <p className="text-sm font-medium text-hdki-gray-mid">Phone</p>
                  <p className="text-lg text-hdki-ink">{user.phone}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 shrink-0 text-hdki-red" />
              <div>
                <p className="text-sm font-medium text-hdki-gray-mid">Member Since</p>
                <p className="text-lg text-hdki-ink">
                  {new Date(user.date_joined).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {isAdmin && (
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 shrink-0 text-hdki-red" />
                <div>
                  <p className="text-sm font-medium text-hdki-gray-mid">Role</p>
                  <p className="text-lg text-hdki-ink">Administrator</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-sm border border-hdki-border bg-hdki-gray-light p-6">
              <h3 className="mb-4 font-display text-lg font-medium text-hdki-ink">Quick Actions</h3>
              <div className="space-y-1">
                <Link
                  href="/activities/events"
                  className="block w-full rounded-sm px-4 py-2 text-left text-sm font-medium text-hdki-ink transition-colors duration-200 hover:bg-white"
                >
                  Browse Events
                </Link>
                <Link
                  href="/activities/news"
                  className="block w-full rounded-sm px-4 py-2 text-left text-sm font-medium text-hdki-ink transition-colors duration-200 hover:bg-white"
                >
                  Read News
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="block w-full rounded-sm px-4 py-2 text-left text-sm font-medium text-hdki-ink transition-colors duration-200 hover:bg-white"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </div>

            <div className="rounded-sm border border-hdki-border bg-white p-6">
              <h3 className="mb-2 font-display text-lg font-medium text-hdki-ink">Need Help?</h3>
              <p className="mb-4 text-sm text-hdki-gray-mid">
                If you have any questions or need assistance, our support team is here to help.
              </p>
              <Link href="/content/contact" className="text-sm font-medium text-hdki-red hover:text-hdki-red-dark">
                Contact Support &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthShell>
  );
}
