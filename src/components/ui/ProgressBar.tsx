"use client";

type Section = {
  id: string;
  label: string;
  range: readonly [number, number];
};

type ProgressBarProps = {
  sections: Section[];
  current: number;
};

export function ProgressBar({ sections, current }: ProgressBarProps) {
  const activeIndex = sections.findIndex(
    (s) => current >= s.range[0] && current < s.range[1],
  );

  return (
    <div className="progress-rail max-md:hidden" aria-hidden>
      {sections.map((s, i) => (
        <span
          key={s.id}
          className={`progress-rail-label ${i === activeIndex ? "active" : ""}`}
        >
          {s.label}
        </span>
      ))}
      <div className="progress-rail-track">
        <div
          className="progress-rail-fill"
          style={{ height: `${Math.min(100, (current / 0.95) * 100)}%` }}
        />
      </div>
    </div>
  );
}
