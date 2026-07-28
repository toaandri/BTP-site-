"use client";

import { scrollSections, experience, projects } from "@/data/content";

type Props = {
  progress: number;
};

export function StoryOverlays({ progress }: Props) {
  return (
    <div className="absolute inset-x-5 bottom-20 top-28 flex items-end md:inset-x-10 md:items-center md:bottom-10">
      {scrollSections
        .filter((s) => s.id !== "hero")
        .map((section) => {
          const [a, b] = section.range;
          const mid = (a + b) / 2;
          const half = (b - a) / 2;
          const fade = Math.max(0, 1 - Math.abs(progress - mid) / (half * 1.15));
          if (fade < 0.05) return null;

          return (
            <div
              key={section.id}
              className="absolute max-w-xl transition-transform duration-300"
              style={{
                opacity: fade,
                transform: `translateY(${(1 - fade) * 18}px)`,
              }}
            >
              <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[var(--accent)]">Parcours</p>
              <h2 className="font-display text-4xl leading-[1.05] text-[var(--sand)] md:text-6xl">
                {section.title}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--mist)] md:text-lg">
                {section.body}
              </p>

              {section.id === "experience" && fade > 0.35 && (
                <ul className="pointer-events-auto mt-8 grid gap-4 sm:grid-cols-3">
                  {experience.map((item) => (
                    <li key={item.label} className="border-l border-[var(--steel)] pl-3">
                      <p className="font-display text-2xl text-[var(--sand)]">{item.years}</p>
                      <p className="text-sm text-[var(--accent)]">{item.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--mist)]">{item.detail}</p>
                    </li>
                  ))}
                </ul>
              )}

              {section.id === "projects" && fade > 0.35 && (
                <ul className="pointer-events-auto mt-8 grid gap-3 sm:grid-cols-2">
                  {projects.slice(0, 4).map((p) => (
                    <li
                      key={p.id}
                      className="border border-white/10 bg-black/30 px-3 py-3 backdrop-blur-sm"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-[var(--accent)]">
                        {p.type} · {p.year}
                      </p>
                      <p className="mt-1 text-sm text-[var(--sand)]">{p.title}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
    </div>
  );
}
