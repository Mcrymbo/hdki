"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "@/lib/graphql/mutations";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle, UserPlus } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface FieldErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [registerUser] = useMutation(REGISTER_USER);
  const router = useRouter();

  const validate = () => {
    const next: FieldErrors = {};
    if (!formData.username.trim()) next.username = "Username is required";
    if (!formData.email.trim()) next.email = "Email is required";
    else if (!EMAIL_REGEX.test(formData.email)) next.email = "Enter a valid email address";
    if (!formData.password) next.password = "Password is required";
    else if (formData.password.length < 8) next.password = "Password must be at least 8 characters long";
    if (!formData.confirmPassword) next.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) next.confirmPassword = "Passwords do not match";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await registerUser({
        variables: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
        },
      });

      if (data?.registerUser?.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else {
        setError(data?.registerUser?.message || "Registration failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  if (success) {
    return (
      <AuthShell>
        <div className="rounded-sm border border-hdki-border bg-white p-8 text-center shadow-sm">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <h1 className="font-display text-2xl font-medium text-hdki-ink sm:text-3xl">Registration Successful!</h1>
          <p className="mt-4 text-sm text-hdki-gray-mid">
            Please check your email for an activation link to complete your registration.
          </p>
          <p className="mt-2 text-sm text-hdki-gray-mid">Redirecting you to login...</p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="rounded-sm border border-hdki-border bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-medium text-hdki-ink sm:text-3xl">Create your account</h1>
          <p className="mt-2 text-sm text-hdki-gray-mid">Join the HDKI Kenya community</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First name"
            />
            <Input
              label="Last Name"
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last name"
            />
          </div>

          <Input
            label="Username"
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            error={fieldErrors.username}
            placeholder="Choose a username"
          />

          <Input
            label="Email Address"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={fieldErrors.email}
            placeholder="Enter your email"
          />

          <Input
            label="Phone Number"
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone number (optional)"
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
              hint={fieldErrors.password ? undefined : "Must be at least 8 characters long"}
              placeholder="Create a password"
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

          <div className="relative">
            <Input
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={fieldErrors.confirmPassword}
              placeholder="Confirm your password"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-hdki-gray-mid hover:text-hdki-ink"
              onClick={() => setShowConfirmPassword((s) => !s)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            icon={<UserPlus />}
            className="w-full"
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="mt-6 border-t border-hdki-border pt-6 text-center">
          <span className="text-sm text-hdki-gray-mid">Already have an account? </span>
          <Link href="/auth/login" className="text-sm font-medium text-hdki-red hover:text-hdki-red-dark">
            Sign in instead
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
