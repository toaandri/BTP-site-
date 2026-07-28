"use client";

import { brand, contacts, projects } from "@/data/content";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-20 min-h-[100svh] bg-[var(--ink)] px-5 py-24 md:px-10"
    >
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">Contact</p>
          <h2 className="mt-3 font-display text-5xl text-[var(--sand)] md:text-7xl">
            Parlons de votre projet
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[var(--mist)]">
            Basé sur une expérience longue en entreprise et en freelance, je collabore avec des
            clients et partenaires — notamment en France. Écrivez-moi ou rejoignez-moi sur les
            réseaux.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`mailto:${contacts.email}`}
              className="border border-[var(--steel)] bg-[var(--steel)] px-5 py-3 text-sm font-medium text-[var(--sand)] transition hover:bg-[var(--steel-bright)]"
            >
              {contacts.email}
            </a>
            <a
              href={contacts.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 px-5 py-3 text-sm text-[var(--sand)] transition hover:border-[var(--accent)]"
            >
              LinkedIn
            </a>
            <a
              href={contacts.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 px-5 py-3 text-sm text-[var(--sand)] transition hover:border-[var(--accent)]"
            >
              Facebook
            </a>
          </div>
        </div>

        <div id="projets">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">Portfolio</p>
          <h3 className="mt-3 font-display text-3xl text-[var(--sand)]">Tous les projets</h3>
          <ul className="mt-6 space-y-4">
            {projects.map((p) => (
              <li key={p.id} className="border-t border-white/10 pt-4">
                <p className="text-[10px] uppercase tracking-wider text-[var(--accent)]">
                  {p.type} · {p.year}
                </p>
                <p className="mt-1 text-[var(--sand)]">{p.title}</p>
                <p className="mt-1 text-sm text-[var(--mist)]">{p.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="mx-auto mt-20 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-8 text-sm text-[var(--mist)] md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {brand.name}
        </p>
        <a href="/mentions-legales" className="hover:text-[var(--sand)]">
          Mentions légales
        </a>
      </footer>
    </section>
  );
}
