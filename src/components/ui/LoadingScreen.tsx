"use client";

import { useEffect, useState } from "react";

type LoadingScreenProps = {
  onLoaded: () => void;
};

export function LoadingScreen({ onLoaded }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const p = Math.min(1, frame / 30);
      setProgress(p);
      if (p >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          setHidden(true);
          onLoaded();
        }, 500);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [onLoaded]);

  if (hidden) return null;

  return (
    <div className={`loading-screen ${hidden ? "hidden" : ""}`}>
      <h1 className="font-display text-4xl text-[var(--sand)] md:text-6xl">
        Atelier Plans Offshore
      </h1>
      <p className="mt-3 text-sm text-[var(--mist)]">Chargement de l&apos;expérience</p>
      <div className="loading-bar">
        <div className="loading-bar-fill" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}
