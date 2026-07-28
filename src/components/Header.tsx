"use client";

import { brand, contacts } from "@/data/content";
import { scrollToContact } from "@/hooks/useScrollProgress";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-display text-xl tracking-wide text-[var(--sand)] md:text-2xl">
            {brand.shortName}
          </span>
          <span className="hidden text-xs uppercase tracking-[0.18em] text-[var(--mist)] sm:inline">
            {brand.name}
          </span>
        </a>
        <nav className="flex items-center gap-3 md:gap-5">
          <a
            href="/projets"
            className="hidden text-sm text-[var(--mist)] transition hover:text-[var(--sand)] md:inline"
          >
            Projets
          </a>
          <a
            href="/faq"
            className="hidden text-sm text-[var(--mist)] transition hover:text-[var(--sand)] md:inline"
          >
            FAQ
          </a>
          <a
            href={contacts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm text-[var(--mist)] transition hover:text-[var(--sand)] md:inline"
          >
            LinkedIn
          </a>
          <button
            type="button"
            onClick={scrollToContact}
            className="border border-[var(--steel)] bg-[var(--steel)] px-4 py-2 text-sm font-medium text-[var(--sand)] transition hover:bg-[var(--steel-bright)]"
          >
            Me contacter
          </button>
        </nav>
      </div>
    </header>
  );
}
