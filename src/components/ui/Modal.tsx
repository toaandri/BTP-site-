"use client";

import { useEffect, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-h-[85vh] max-w-2xl overflow-y-auto border border-white/10 bg-[var(--ink)] p-6 md:p-10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[var(--mist)] transition hover:text-[var(--sand)]"
          aria-label="Fermer"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
