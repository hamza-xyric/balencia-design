"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { type MotionValue } from "framer-motion";
import * as THREE from "three";
import { AnimContext, type AnimState, type Tier } from "./constellation-context";
import { Atmosphere } from "./Atmosphere";
import { SiaCore } from "./SiaCore";
import { DomainNodes } from "./DomainNodes";
import { CorrelationThreads } from "./CorrelationThreads";

const LOOK_AT = new THREE.Vector3(0, 0, 0);

/** Master rig: aims the camera, drives the slow ambient orbit, applies pointer
 *  parallax, and runs the scroll hand-off (the constellation rises and recedes
 *  into the fog as the matrix section takes over). */
function Rig({ children, anim }: { children: React.ReactNode; anim: AnimState }) {
  const rig = useRef<THREE.Group>(null);

  useFrame((state) => {
    state.camera.lookAt(LOOK_AT);
    const g = rig.current;
    if (!g) return;

    const t = state.clock.elapsedTime;
    const reduced = anim.reduced;
    const px = anim.pointer.x.get();
    const py = anim.pointer.y.get();
    const p = reduced ? 0 : anim.progress.get();

    // The ring faces the camera, so we sway it gently (never edge-on) and hold a
    // slight 3/4 tilt — a living constellation, not a spinning coin.
    const BASE_TILT = -0.16;
    const sway = reduced ? 0 : Math.sin(t * 0.13) * 0.13;
    const bob = reduced ? 0 : Math.sin(t * 0.1 + 1.3) * 0.05;
    const targetRotY = sway + px * 0.3;
    const targetRotX = BASE_TILT + bob - py * 0.12 + p * 0.12;
    const targetY = p * 2.6;
    const targetZ = -p * 3.6;

    if (reduced) {
      // Demand-mode paints only a few frames — snap straight to the composed pose.
      g.rotation.set(BASE_TILT, 0, 0);
      g.position.set(0, 0, 0);
      return;
    }

    g.rotation.y += (targetRotY - g.rotation.y) * 0.06;
    g.rotation.x += (targetRotX - g.rotation.x) * 0.06;
    // Scroll hand-off: lift + push back toward the matrix reveal.
    g.position.y += (targetY - g.position.y) * 0.08;
    g.position.z += (targetZ - g.position.z) * 0.08;
  });

  return <group ref={rig}>{children}</group>;
}

export function Constellation({
  progress,
  pointer,
  reduced,
  tier,
}: {
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  reduced: boolean;
  tier: Tier;
}) {
  const startRef = useRef<number | null>(reduced ? 0 : null);
  const anim: AnimState = { progress, pointer, reduced, tier, startRef };

  return (
    <AnimContext.Provider value={anim}>
      {/* World-fixed envelope (sky, fog, lights, dust) stays put under parallax. */}
      <Atmosphere />
      {/* The constellation itself orbits / parallaxes / hands off. */}
      <Rig anim={anim}>
        <SiaCore />
        <DomainNodes />
        <CorrelationThreads />
      </Rig>
    </AnimContext.Provider>
  );
}
