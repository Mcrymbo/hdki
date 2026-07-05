"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REQUEST_PASSWORD_RESET } from "@/lib/graphql/mutations";
import Link from "next/link";
import { ArrowLeft, Mail, Send } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import IconCircle from "@/components/ui/IconCircle";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [requestPasswordReset] = useMutation(REQUEST_PASSWORD_RESET);

  const validate = () => {
    if (!email.trim()) {
      setFieldError("Email is required");
      return false;
    }
    if (!EMAIL_REGEX.test(email)) {
      setFieldError("Enter a valid email address");
      return false;
    }
    setFieldError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await requestPasswordReset({
        variables: { email },
      });

      if (data?.requestPasswordReset?.success) {
        setSuccess(true);
      } else {
        setError(data?.requestPasswordReset?.message || "Failed to send reset email");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setFieldError("");
  };

  if (success) {
    return (
      <AuthShell>
        <div className="rounded-sm border border-hdki-border bg-white p-8 text-center shadow-sm">
          <IconCircle icon={<Mail />} size="lg" className="mx-auto mb-4" />
          <h1 className="font-display text-2xl font-medium text-hdki-ink sm:text-3xl">Check Your Email</h1>
          <p className="mt-4 text-sm text-hdki-gray-mid">
            We&apos;ve sent a password reset link to <strong className="text-hdki-ink">{email}</strong>
          </p>
          <p className="mt-2 text-sm text-hdki-gray-mid">
            Please check your email and click the link to reset your password.
          </p>
          <Link
            href="/auth/login"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-hdki-red hover:text-hdki-red-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="rounded-sm border border-hdki-border bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-medium text-hdki-ink sm:text-3xl">Reset your password</h1>
          <p className="mt-2 text-sm text-hdki-gray-mid">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <Input
            label="Email Address"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            error={fieldError}
            placeholder="Enter your email address"
          />

          <Button type="submit" variant="primary" size="md" loading={loading} icon={<Send />} className="w-full">
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/auth/login" className="text-sm text-hdki-red hover:text-hdki-red-dark">
            Remember your password? Sign in
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
