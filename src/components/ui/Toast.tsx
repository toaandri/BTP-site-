"use client";

import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  duration?: number;
};

export function Toast({ message, type = "success", onClose, duration = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 max-w-sm border px-5 py-3 text-sm transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${type === "success" ? "border-[var(--accent)] bg-[var(--ink)] text-[var(--sand)]" : "border-red-500 bg-[var(--ink)] text-red-300"}`}
    >
      {message}
    </div>
  );
}
