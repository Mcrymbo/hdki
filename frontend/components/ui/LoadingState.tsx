import { Loader2 } from "lucide-react";

export default function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-hdki-gray-mid">
      <Loader2 className="h-8 w-8 animate-spin text-hdki-red" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
