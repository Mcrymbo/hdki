"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = true,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onCancel}
          />
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-sm rounded-sm bg-white p-6 shadow-xl"
          >
            <div className="flex items-start gap-3">
              {danger && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                </div>
              )}
              <div>
                <h2 id="confirm-dialog-title" className="font-display text-lg font-medium text-hdki-ink">
                  {title}
                </h2>
                {description && <p className="mt-1 text-sm text-hdki-gray-mid">{description}</p>}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" size="sm" onClick={onCancel}>
                {cancelLabel}
              </Button>
              <Button
                variant={danger ? "primary" : "secondary"}
                size="sm"
                onClick={onConfirm}
                loading={loading}
              >
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
