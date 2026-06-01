"use client";

import { useRef, type ComponentRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { CORE_RADIUS } from "./constellation-layout";
import { introT, smooth, useAnim } from "./constellation-context";

/**
 * The SIA core — the living intelligence everything orbits. A molten-glass
 * distorted icosahedron (lit by the warm environment, so it keeps real 3D form)
 * around a hot purple-orange heart that ignites first in the intro and blooms.
 */
export function SiaCore() {
  const anim = useAnim();
  const group = useRef<THREE.Group>(null);
  const shell = useRef<ComponentRef<typeof MeshDistortMaterial>>(null);
  const heart = useRef<THREE.MeshStandardMaterial>(null);
  const corona = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const intro = introT(state.clock, anim);
    const ignite = smooth(0, 0.22, intro);
    const breathe = anim.reduced ? 0.5 : Math.sin(t * 0.9) * 0.5 + 0.5;

    const s = (0.55 + ignite * 0.45) * (1 + breathe * 0.04);
    if (group.current) group.current.scale.setScalar(s);

    // Low shell emissive keeps the lit glass form readable (not a blown-out disc).
    if (shell.current) shell.current.emissiveIntensity = 0.25 + ignite * 0.5 + breathe * 0.18;
    if (heart.current) heart.current.emissiveIntensity = ignite * (5.4 + breathe * 2.4);
    if (corona.current) corona.current.emissiveIntensity = ignite * (1.6 + breathe * 0.7);
  });

  return (
    <group ref={group}>
      {/* Molten-glass distorted shell */}
      <mesh>
        <icosahedronGeometry args={[CORE_RADIUS, 6]} />
        <MeshDistortMaterial
          ref={shell}
          color="#D8431A"
          emissive="#FF5E00"
          emissiveIntensity={0.4}
          roughness={0.12}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.22}
          distort={anim.reduced ? 0.18 : 0.32}
          speed={anim.reduced ? 0 : 1.5}
          transmission={0.62}
          thickness={1.1}
          ior={1.35}
        />
      </mesh>

      {/* Warm corona shell — a thin emissive layer that gives the orb a glowing
          rim and feeds the bloom without flattening into a disc. */}
      <mesh scale={0.82}>
        <icosahedronGeometry args={[CORE_RADIUS, 4]} />
        <meshStandardMaterial
          ref={corona}
          color="#1a0a06"
          emissive="#FF7A2B"
          emissiveIntensity={1}
          roughness={0.4}
          transparent
          opacity={0.7}
          toneMapped={false}
        />
      </mesh>

      {/* Hot inner heart — purple→white, the central bloom source. */}
      <mesh scale={0.46}>
        <icosahedronGeometry args={[CORE_RADIUS, 3]} />
        <meshStandardMaterial
          ref={heart}
          color="#160616"
          emissive="#A864FF"
          emissiveIntensity={4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
