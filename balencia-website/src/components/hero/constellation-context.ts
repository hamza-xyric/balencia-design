"use client";

import { createContext, useContext, type RefObject } from "react";
import { type MotionValue } from "framer-motion";
import { type Clock } from "three";

export type Tier = "full" | "lite";

/** How long the one-time "assemble & connect" intro takes (seconds). */
export const INTRO_DURATION = 3.0;

export interface AnimState {
  /** Scroll progress 0→1 through the hero section (drives the matrix hand-off). */
  progress: MotionValue<number>;
  /** Spring-smoothed pointer/tilt parallax in [-1, 1]. */
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  reduced: boolean;
  tier: Tier;
  /** Shared clock-time of the first rendered frame, so every component derives the
   *  same intro timeline. Null until the first frame sets it. */
  startRef: RefObject<number | null>;
}

export const AnimContext = createContext<AnimState | null>(null);

export function useAnim(): AnimState {
  const ctx = useContext(AnimContext);
  if (!ctx) throw new Error("useAnim must be used within an AnimContext provider");
  return ctx;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
/** smoothstep ease, matches the soft easings used elsewhere. */
export const smooth = (e0: number, e1: number, x: number) => {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

/**
 * The intro timeline value 0→1, shared by all scene components for the frame.
 * Reduced motion pins it to 1 (fully assembled). The first caller in a frame
 * stamps startRef; everyone reads the same clock.elapsedTime that frame, so the
 * timeline stays in lock-step across components.
 */
export function introT(clock: Clock, anim: AnimState): number {
  if (anim.reduced) return 1;
  if (anim.startRef.current == null) anim.startRef.current = clock.elapsedTime;
  const t = (clock.elapsedTime - anim.startRef.current) / INTRO_DURATION;
  // easeOutCubic for a confident settle.
  const c = clamp01(t);
  return 1 - Math.pow(1 - c, 3);
}
