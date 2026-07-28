"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Header } from "@/components/Header";
import { StoryOverlays } from "@/components/StoryOverlays";
import { ContactSection } from "@/components/ContactSection";
import { SkipIntro } from "@/components/SkipIntro";
import { useScrollProgress, scrollToContact } from "@/hooks/useScrollProgress";
import { brand, progressLabels } from "@/data/content";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

const HouseCanvas = dynamic(
  () => import("@/components/scene/HouseCanvas").then((m) => m.HouseCanvas),
  { ssr: false },
);

export function HomeExperience() {
  const { progress, reducedMotion, lowPerformance } = useScrollProgress();
  const [canvasReady, setCanvasReady] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const showLoading = !loadingDone && !reducedMotion;
  const canvasVisible = progress < 0.96 && !reducedMotion;
  const showHint = progress < 0.06;
  const showSkip = progress > 0.1 && progress < 0.9;

  const handleCanvasReady = () => {
    setCanvasReady(true);
  };

  if (showLoading) {
    return (
      <>
        <LoadingScreen onLoaded={() => setLoadingDone(true)} />
        <div className="opacity-0 pointer-events-none" style={{ height: "520vh" }} />
      </>
    );
  }

  return (
    <div id="top" className="relative">
      <Header />

      {!reducedMotion && (
        <HouseCanvas
          scrollProgress={progress}
          visible={canvasVisible}
          onReady={handleCanvasReady}
        />
      )}

      {reducedMotion && (
        <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_30%_20%,#243746_0%,#0f1c28_55%,#0a1218_100%)]" />
      )}

      <div className="pointer-events-none fixed inset-0 z-10 flex flex-col justify-end px-5 pb-20 pt-28 md:justify-center md:px-10 md:pb-10">
        <div
          className={`max-w-3xl transition-opacity duration-500 ${!canvasReady && !reducedMotion ? "opacity-0" : ""}`}
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

      <SkipIntro visible={showSkip} />

      {!lowPerformance && <ProgressBar sections={progressLabels} current={progress} />}

      <div className="relative z-[1] h-[520vh]" aria-hidden />

      <div className="relative z-20">
        <ContactSection />
      </div>

      <button
        type="button"
        onClick={scrollToContact}
        className="fixed bottom-0 inset-x-0 z-30 bg-[var(--steel)] py-3 text-sm font-medium text-[var(--sand)] transition hover:bg-[var(--steel-bright)] md:hidden"
      >
        Me contacter
      </button>
    </div>
  );
}
