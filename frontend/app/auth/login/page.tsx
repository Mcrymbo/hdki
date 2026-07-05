"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [formData, setFormData] = useState({ usernameOrEmail: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<{ usernameOrEmail?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const validate = () => {
    const next: typeof fieldErrors = {};
    if (!formData.usernameOrEmail.trim()) next.usernameOrEmail = "Username or email is required";
    if (!formData.password) next.password = "Password is required";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await login(formData.usernameOrEmail, formData.password);
      if (result.success) {
        router.push("/");
      } else {
        setError(result.message);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <AuthShell>
      <div className="rounded-sm border border-hdki-border bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-medium text-hdki-ink sm:text-3xl">Sign in to your account</h1>
          <p className="mt-2 text-sm text-hdki-gray-mid">Access the HDKI Kenya portal</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <Input
            label="Username or Email"
            id="usernameOrEmail"
            name="usernameOrEmail"
            type="text"
            value={formData.usernameOrEmail}
            onChange={handleInputChange}
            error={fieldErrors.usernameOrEmail}
            placeholder="Enter your username or email"
          />

          <div className="relative">
            <Input
              label="Password"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              error={fieldErrors.password}
              placeholder="Enter your password"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-hdki-gray-mid hover:text-hdki-ink"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <Button type="submit" variant="primary" size="md" loading={loading} icon={<LogIn />} className="w-full">
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/auth/reset-password" className="text-sm text-hdki-red hover:text-hdki-red-dark">
            Forgot your password?
          </Link>
        </div>

        <div className="mt-6 border-t border-hdki-border pt-6 text-center">
          <span className="text-sm text-hdki-gray-mid">New to HDKI? </span>
          <Link href="/auth/register" className="text-sm font-medium text-hdki-red hover:text-hdki-red-dark">
            Create an account
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
