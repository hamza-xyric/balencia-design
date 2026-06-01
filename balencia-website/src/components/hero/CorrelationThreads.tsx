"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { buildThreadGeometry } from "./constellation-layout";
import { introT, smooth, useAnim } from "./constellation-context";

const VERT = /* glsl */ `
  attribute float aWeight;
  attribute float aStagger;
  attribute float aSeed;
  varying vec2 vUv;
  varying float vWeight;
  varying float vStagger;
  varying float vSeed;
  void main() {
    vUv = uv;
    vWeight = aWeight;
    vStagger = aStagger;
    vSeed = aSeed;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform float uReveal;   // 0..1 global draw-in
  uniform float uTime;
  uniform vec3  uGold;     // base correlation gold
  uniform vec3  uHot;      // bright crest of the energy pulse
  uniform float uStatic;   // 1.0 = freeze flow (reduced motion)
  varying vec2 vUv;
  varying float vWeight;
  varying float vStagger;
  varying float vSeed;

  void main() {
    // Strongest-first draw-in: each thread's reveal window is offset by its rank.
    float span = 0.55;
    float local = clamp((uReveal - vStagger * span) / (1.0 - span), 0.0, 1.0);
    if (vUv.x > local) discard;

    // Bright growing head at the tip of the draw-in.
    float tip = smoothstep(local - 0.07, local, vUv.x);

    // Flowing energy pulse travelling along the thread.
    float speed = mix(0.18, 0.55, vWeight) * (1.0 - uStatic);
    float phase = vSeed * 6.2831;
    float flow = fract(vUv.x * 2.0 - uTime * speed + phase);
    float pulse = exp(-pow((flow - 0.5) * 6.0, 2.0));

    // Cross-section: brightest down the centre line of the tube.
    float around = sin(vUv.y * 3.14159);

    float base = 0.3 + vWeight * 0.6;
    vec3 col = mix(uGold, uHot, clamp(pulse * 0.7 + tip * 0.6, 0.0, 1.0));
    float alpha = base * (0.42 + 0.58 * pulse) * (0.55 + 0.45 * around) + tip * 0.8;
    alpha *= 0.25 + 0.75 * vWeight;

    // Raw (untone-mapped) brightness so the bloom pass catches the crests — kept
    // restrained so threads stay gold instead of blowing out to white.
    vec3 outColor = col * (0.9 + pulse * 1.05 + tip * 1.25);
    gl_FragColor = vec4(outColor, alpha);
  }
`;

/**
 * All 45 correlation threads in one draw call. A merged tube geometry carries
 * per-edge weight / reveal-rank / phase as vertex attributes; the shader draws
 * each thread in strongest-first, then runs a gold energy pulse along it.
 */
export function CorrelationThreads() {
  const anim = useAnim();
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => buildThreadGeometry(anim.tier === "lite"), [anim.tier]);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          uReveal: { value: anim.reduced ? 1 : 0 },
          uTime: { value: 0 },
          uGold: { value: new THREE.Color("#F59E0B") },
          uHot: { value: new THREE.Color("#FFCB5E") },
          uStatic: { value: anim.reduced ? 1 : 0 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [anim.reduced]
  );

  useFrame((state) => {
    const m = matRef.current;
    if (!m) return;
    const intro = introT(state.clock, anim);
    // Threads weave in over the back half of the intro, after nodes emerge.
    m.uniforms.uReveal.value = anim.reduced ? 1 : smooth(0.42, 1, intro);
    m.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh geometry={geometry} frustumCulled={false}>
      <primitive object={material} attach="material" ref={matRef} />
    </mesh>
  );
}
