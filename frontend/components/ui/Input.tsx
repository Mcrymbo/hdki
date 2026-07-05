"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

interface FieldChrome {
  label?: string;
  error?: string;
  hint?: string;
}

const fieldClasses = (error?: string, className?: string) =>
  cn(
    "block w-full rounded-sm border px-3 py-2.5 text-sm text-hdki-ink placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-hdki-red/20",
    error ? "border-red-400 focus:border-red-500" : "border-hdki-border focus:border-hdki-red",
    className
  );

function FieldMessage({ error, hint }: { error?: string; hint?: string }) {
  if (error) return <p className="mt-1.5 text-sm text-red-600">{error}</p>;
  if (hint) return <p className="mt-1.5 text-sm text-hdki-gray-mid">{hint}</p>;
  return null;
}

export const Input = forwardRef<HTMLInputElement, FieldChrome & React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ label, error, hint, className, id, ...props }, ref) {
    const inputId = id || props.name;
    return (
      <div>
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-hdki-ink">
            {label}
          </label>
        )}
        <input ref={ref} id={inputId} className={fieldClasses(error, className)} {...props} />
        <FieldMessage error={error} hint={hint} />
      </div>
    );
  }
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  FieldChrome & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ label, error, hint, className, id, ...props }, ref) {
  const inputId = id || props.name;
  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-hdki-ink">
          {label}
        </label>
      )}
      <textarea ref={ref} id={inputId} className={fieldClasses(error, className)} {...props} />
      <FieldMessage error={error} hint={hint} />
    </div>
  );
});
