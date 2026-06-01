"use client";

import { useMemo } from "react";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useAnim } from "./constellation-context";

/** A large inward-facing sphere with a vertical dusk gradient — keeps the
 *  backdrop warm (deep indigo overhead → ember low) instead of pure black. */
function DuskBackdrop() {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uTop: { value: new THREE.Color("#070611") },
        uMid: { value: new THREE.Color("#160d18") },
        uBottom: { value: new THREE.Color("#2a1207") },
      },
      vertexShader: /* glsl */ `
        varying vec3 vWorld;
        void main() {
          vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uTop;
        uniform vec3 uMid;
        uniform vec3 uBottom;
        varying vec3 vWorld;
        void main() {
          float h = clamp(vWorld.y / 30.0 + 0.5, 0.0, 1.0);
          vec3 col = h < 0.5
            ? mix(uBottom, uMid, smoothstep(0.0, 0.5, h))
            : mix(uMid, uTop, smoothstep(0.5, 1.0, h));
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
  }, []);

  return (
    <mesh scale={48} frustumCulled={false}>
      <sphereGeometry args={[1, 32, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

/** Lighting, environment, fog and dust — the warm-dark dusk envelope. */
export function Atmosphere() {
  const { tier, reduced } = useAnim();
  const lite = tier === "lite";

  return (
    <>
      <color attach="background" args={["#0b0712"]} />
      <fogExp2 attach="fog" args={["#160b16", 0.05]} />

      <DuskBackdrop />

      {/* Shaping lights for the glass + physical materials. */}
      <ambientLight intensity={0.14} color="#FFE3C0" />
      <directionalLight position={[6, 9, 5]} intensity={1.15} color="#FFD7A6" />
      <pointLight position={[0, 0, 0]} intensity={9} distance={16} decay={2} color="#FF7A2B" />
      <pointLight position={[-7, -2, -5]} intensity={5} distance={22} decay={2} color="#7F24FF" />

      {/* Baked warm-dusk environment for refraction / reflections. */}
      <Environment resolution={lite ? 128 : 256} frames={1} environmentIntensity={0.55}>
        <Lightformer form="rect" intensity={2.2} color="#FFB877" scale={[14, 10, 1]} position={[0, 5, -9]} />
        <Lightformer form="rect" intensity={1.6} color="#FF6A1A" scale={[10, 8, 1]} position={[-9, 1, 5]} rotation={[0, Math.PI / 3, 0]} />
        <Lightformer form="circle" intensity={1.3} color="#8A3DFF" scale={[8, 8, 1]} position={[9, 2, 5]} rotation={[0, -Math.PI / 3, 0]} />
        <Lightformer form="ring" intensity={0.7} color="#46306e" scale={[10, 10, 1]} position={[0, 9, 2]} rotation={[Math.PI / 2, 0, 0]} />
      </Environment>

      {/* Floating gold dust. */}
      <Sparkles
        count={lite ? 28 : 64}
        scale={[20, 11, 20]}
        size={2.6}
        speed={reduced ? 0 : 0.28}
        opacity={0.7}
        color="#F7C56B"
        noise={1.2}
      />
    </>
  );
}
