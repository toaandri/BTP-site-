"use client";

import { type TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function Textarea({ label, error, id, className = "", ...props }: TextareaProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="text-xs uppercase tracking-[0.15em] text-[var(--mist)]">
        {label}
      </label>
      <textarea
        id={inputId}
        className={`w-full border bg-transparent px-3 py-2.5 text-sm text-[var(--sand)] placeholder:text-[var(--mist)] transition focus:border-[var(--accent)] focus:outline-none resize-y min-h-[100px] ${
          error ? "border-red-500" : "border-white/20"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
