"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { StoryOverlays } from "@/components/StoryOverlays";
import { ContactSection } from "@/components/ContactSection";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { brand } from "@/data/content";

const HouseCanvas = dynamic(
  () => import("@/components/scene/HouseCanvas").then((m) => m.HouseCanvas),
  { ssr: false },
);

export function HomeExperience() {
  const { progress, reducedMotion } = useScrollProgress();
  const canvasVisible = progress < 0.96 && !reducedMotion;
  const showHint = progress < 0.06;

  return (
    <div id="top" className="relative">
      <Header />

      {!reducedMotion && <HouseCanvas scrollProgress={progress} visible={canvasVisible} />}

      {reducedMotion && (
        <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_30%_20%,#243746_0%,#0f1c28_55%,#0a1218_100%)]" />
      )}

      {/* Contenu fixe synchronisé au scroll */}
      <div className="pointer-events-none fixed inset-0 z-10 flex flex-col justify-end px-5 pb-20 pt-28 md:justify-center md:px-10 md:pb-10">
        <div
          className="max-w-3xl transition-opacity duration-500"
          style={{ opacity: progress < 0.1 ? 1 - progress * 6 : 0 }}
        >
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
            BTP · Plans · Offshore
          </p>
          <h1 className="mt-3 font-display text-5xl leading-[0.95] text-[var(--sand)] md:text-7xl lg:text-8xl">
            {brand.name}
          </h1>
          <p className="mt-5 max-w-md text-lg text-[var(--mist)]">{brand.tagline}</p>
        </div>

        <StoryOverlays progress={progress} />
      </div>

      {showHint && (
        <p className="pointer-events-none fixed bottom-6 left-1/2 z-40 -translate-x-1/2 animate-pulse text-xs uppercase tracking-[0.2em] text-[var(--mist)]">
          Scroller pour entrer dans la maison
        </p>
      )}

      {/* Piste de scroll pour piloter la 3D */}
      <div className="relative z-[1] h-[520vh]" aria-hidden />

      <div className="relative z-20">
        <ContactSection />
      </div>
    </div>
  );
}
