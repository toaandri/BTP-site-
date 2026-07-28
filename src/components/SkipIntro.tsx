"use client";

import { scrollToContact } from "@/hooks/useScrollProgress";

type Props = { visible: boolean };

export function SkipIntro({ visible }: Props) {
  if (!visible) return null;
  return (
    <button
      type="button"
      onClick={scrollToContact}
      className="fixed bottom-24 right-5 z-30 text-xs uppercase tracking-[0.18em] text-[var(--accent)] transition hover:text-[var(--sand)] md:bottom-8"
    >
      Aller au contact →
    </button>
  );
}
