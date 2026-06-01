"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Bloom, DepthOfField, EffectComposer, ToneMapping, Vignette } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { type MotionValue } from "framer-motion";
import * as THREE from "three";
import { type Tier } from "./constellation-context";
import { Constellation } from "./Constellation";

function detectTier(): Tier {
  if (typeof window === "undefined") return "full";
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 820;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const lowMem = typeof mem === "number" && mem <= 4;
  const cores = navigator.hardwareConcurrency;
  const fewCores = typeof cores === "number" && cores <= 4;
  return coarse || narrow || lowMem || fewCores ? "lite" : "full";
}

/** In reduced-motion (demand) mode, paint a handful of frames once so the
 *  environment bakes, transmission buffers settle, and the static composed
 *  frame is correct — then stop. */
function DemandPainter({ enabled }: { enabled: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    if (!enabled) return;
    let n = 0;
    let raf = requestAnimationFrame(function tick() {
      invalidate();
      if (++n < 6) raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [enabled, invalidate]);
  return null;
}

export default function HeroCanvas({
  progress,
  pointer,
  reduced,
}: {
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  reduced: boolean;
}) {
  const [tier] = useState<Tier>(detectTier);
  const lite = tier === "lite";

  // Pause the render loop whenever the hero scrolls fully out of view.
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const frameloop = reduced ? "demand" : inView ? "always" : "never";

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 h-full w-full"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 38%, #1c1020 0%, #120a16 45%, #0b0712 100%)",
      }}
    >
      <Canvas
        frameloop={frameloop}
        dpr={lite ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: !lite,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.NoToneMapping,
        }}
        camera={{ position: [0, 0.8, lite ? 18.5 : 13.5], fov: 40, near: 0.1, far: 100 }}
      >
        <Suspense fallback={null}>
          <Constellation progress={progress} pointer={pointer} reduced={reduced} tier={tier} />
        </Suspense>

        <DemandPainter enabled={reduced} />

        <EffectComposer multisampling={lite ? 0 : 4}>
          <Bloom
            mipmapBlur
            intensity={lite ? 0.62 : 0.85}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.22}
            radius={0.7}
          />
          {lite ? (
            <></>
          ) : (
            <DepthOfField target={[0, 0, 0]} focalLength={0.05} bokehScale={2.6} height={480} />
          )}
          <Vignette offset={0.3} darkness={0.82} eskil={false} />
          <ToneMapping mode={ToneMappingMode.AGX} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
