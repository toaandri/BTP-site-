"use client";

import { useState } from "react";
import Link from "next/link";
import { projects, projectCategories } from "@/data/content";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";

export default function ProjetsPage() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<typeof projects[number] | null>(null);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <main className="min-h-screen bg-[var(--ink-deep)] px-5 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-[var(--accent)] hover:text-[var(--sand)]">
          ← Retour
        </Link>
        <h1 className="mt-6 font-display text-5xl text-[var(--sand)] md:text-7xl">Projets</h1>
        <p className="mt-4 max-w-lg text-[var(--mist)]">
          Une sélection de projets réalisés : architecture, études, offshore et réhabilitation.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`px-3 py-1.5 text-xs uppercase tracking-[0.12em] transition ${
                filter === cat.id
                  ? "bg-[var(--accent)] text-[var(--ink)]"
                  : "border border-white/20 text-[var(--mist)] hover:border-[var(--accent)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Card
              key={p.id}
              as="a"
              href="#"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                setSelected(p);
              }}
            >
              <p className="text-[10px] uppercase tracking-wider text-[var(--accent)]">
                {p.type} · {p.year}
              </p>
              <p className="mt-2 font-display text-lg text-[var(--sand)]">{p.title}</p>
              <p className="mt-2 text-sm text-[var(--mist)]">{p.summary}</p>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-[var(--mist)]">Aucun projet dans cette catégorie.</p>
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--accent)]">
              {selected.type} · {selected.year}
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--sand)]">{selected.title}</h2>
            <p className="mt-4 text-[var(--mist)]">{selected.summary}</p>
            <p className="mt-6 text-sm text-[var(--mist)]">
              <span className="block border border-dashed border-white/10 p-10 text-center">
                Visuel du projet à venir
              </span>
            </p>
          </div>
        )}
      </Modal>
    </main>
  );
}
