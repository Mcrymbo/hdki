import { ShieldAlert } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AccessDenied() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-hdki-red">
        <ShieldAlert className="h-8 w-8" />
      </div>
      <h1 className="font-display text-2xl font-medium text-hdki-ink">Access Denied</h1>
      <p className="mt-2 max-w-sm text-hdki-gray-mid">
        You need admin privileges to view this page. Contact an administrator if you believe this is a mistake.
      </p>
      <Button href="/" variant="primary" size="md" className="mt-6">
        Go to Home
      </Button>
    </div>
  );
}
