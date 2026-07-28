"use client";

import { useEffect, useState } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lowPerformance] = useState(
    () => typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 4,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMq = () => setReducedMotion(mq.matches);
    syncMq();
    mq.addEventListener("change", syncMq);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      mq.removeEventListener("change", syncMq);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { progress, reducedMotion, lowPerformance };
}

export function scrollToContact() {
  const el = document.getElementById("contact");
  el?.scrollIntoView({ behavior: "smooth" });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
