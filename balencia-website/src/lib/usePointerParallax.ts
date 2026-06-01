"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

export interface PointerParallax {
  /** Normalized horizontal pointer/tilt position in [-1, 1] (spring-smoothed). */
  x: MotionValue<number>;
  /** Normalized vertical pointer/tilt position in [-1, 1] (spring-smoothed). */
  y: MotionValue<number>;
}

const SPRING = { stiffness: 120, damping: 30, mass: 0.6 } as const;

/**
 * Hydration-safe shared pointer + device-orientation parallax.
 *
 * Returns two spring MotionValues in [-1, 1]. Under reduced motion it attaches no
 * listeners and the values stay pinned at 0, so every dependent layer renders static.
 * A single rAF-throttled listener set is shared by all parallax layers (planes, sky
 * traffic, embers) — they read these MVs rather than each adding their own listeners.
 */
export function usePointerParallax(reduced: boolean): PointerParallax {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  useEffect(() => {
    if (reduced) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    let frame = 0;
    let scheduled = false;
    let nextX = 0;
    let nextY = 0;

    const flush = () => {
      scheduled = false;
      rawX.set(nextX);
      rawY.set(nextY);
    };
    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      frame = requestAnimationFrame(flush);
    };

    const clamp = (v: number) => (v < -1 ? -1 : v > 1 ? 1 : v);

    const onPointer = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      nextX = clamp((e.clientX / w) * 2 - 1);
      nextY = clamp((e.clientY / h) * 2 - 1);
      schedule();
    };

    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      // gamma: left-right tilt; beta: front-back tilt (rest ~45° when held up).
      nextX = clamp(e.gamma / 30);
      nextY = clamp((e.beta - 45) / 30);
      schedule();
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    // Listen for tilt where the platform delivers it without an explicit permission
    // gesture (Android, older iOS). If it never fires, pointer still works — no error.
    const hasOrientation = typeof window.DeviceOrientationEvent !== "undefined";
    if (hasOrientation) {
      window.addEventListener("deviceorientation", onOrient, { passive: true });
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      if (hasOrientation) window.removeEventListener("deviceorientation", onOrient);
    };
  }, [reduced, rawX, rawY]);

  return { x, y };
}
