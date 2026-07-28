"use client";

import { type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, id, className = "", ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="text-xs uppercase tracking-[0.15em] text-[var(--mist)]">
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full border bg-transparent px-3 py-2.5 text-sm text-[var(--sand)] placeholder:text-[var(--mist)] transition focus:border-[var(--accent)] focus:outline-none ${
          error ? "border-red-500" : "border-white/20"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
