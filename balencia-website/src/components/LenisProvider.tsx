"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth-scroll provider (Lenis). The cinematic scrub feel depends on this.
 * Respects prefers-reduced-motion: when reduced, Lenis is not started and the
 * page uses native scrolling, so the scroll-coupled hero falls back to its
 * static key state.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
