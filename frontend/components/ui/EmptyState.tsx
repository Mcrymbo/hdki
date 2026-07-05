import { Inbox } from "lucide-react";
import Button from "@/components/ui/Button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; href: string };
}

export default function EmptyState({ icon = <Inbox />, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-hdki-border py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-hdki-gray-light text-hdki-gray-mid [&>svg]:h-6 [&>svg]:w-6">
        {icon}
      </div>
      <h3 className="font-display text-lg font-medium text-hdki-ink">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-hdki-gray-mid">{description}</p>}
      {action && (
        <Button href={action.href} variant="primary" size="sm" className="mt-5">
          {action.label}
        </Button>
      )}
    </div>
  );
}
