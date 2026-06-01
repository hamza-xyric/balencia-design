"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, MeshTransmissionMaterial, Text } from "@react-three/drei";
import * as THREE from "three";
import { NODES, type NodeLayout } from "./constellation-layout";
import { introT, smooth, useAnim } from "./constellation-context";

/** A single life-domain: glass shell + emissive heart + billboarded label, all
 *  emerging together from the core (the group scales 0→1, so the label rides it). */
function DomainNode({ node }: { node: NodeLayout }) {
  const anim = useAnim();
  const group = useRef<THREE.Group>(null);
  const heart = useRef<THREE.MeshStandardMaterial>(null);

  // Strongest hubs / earliest in the ring emerge first.
  const start = 0.16 + (node.ringIndex / NODES.length) * 0.34;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const intro = introT(state.clock, anim);
    const reveal = smooth(start, start + 0.28, intro);

    // Fly out from the core to the resting ring position (lerp from origin = pos * reveal).
    const pos = group.current.position;
    pos.copy(node.pos).multiplyScalar(reveal);
    // Ambient float once settled.
    if (!anim.reduced) {
      pos.y += Math.sin(t * 0.6 + node.seed * 6.28) * 0.12 * reveal;
      pos.x += Math.sin(t * 0.4 + node.seed * 4.1) * 0.07 * reveal;
    }
    group.current.scale.setScalar(reveal);

    if (heart.current) {
      const breathe = anim.reduced ? 0.5 : Math.sin(t * 1.1 + node.seed * 6.28) * 0.5 + 0.5;
      heart.current.emissiveIntensity = reveal * (1.6 + breathe * 1.4 + node.hubNorm * 1.0);
    }
  });

  const labelY = node.radius + 0.62;

  return (
    <group ref={group}>
      {/* Glass shell — refracts the warm environment, tinted by the domain accent. */}
      <mesh>
        <icosahedronGeometry args={[node.radius, anim.tier === "lite" ? 1 : 3]} />
        {anim.tier === "lite" ? (
          <meshStandardMaterial
            color={node.accent}
            emissive={node.accent}
            emissiveIntensity={0.6}
            roughness={0.25}
            metalness={0.1}
            transparent
            opacity={0.55}
          />
        ) : (
          <MeshTransmissionMaterial
            color={node.accent}
            attenuationColor={node.accent}
            attenuationDistance={0.6}
            transmission={1}
            thickness={node.radius * 1.6}
            roughness={0.12}
            ior={1.32}
            chromaticAberration={0.04}
            anisotropicBlur={0.2}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.05}
            resolution={64}
            samples={4}
          />
        )}
      </mesh>

      {/* Emissive heart — the glow that blooms through the glass. */}
      <mesh scale={0.5}>
        <icosahedronGeometry args={[node.radius, 2]} />
        <meshStandardMaterial
          ref={heart}
          color="#0a0a0f"
          emissive={node.accent}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Label — billboarded so it always faces the camera as the rig orbits. */}
      <Billboard position={[0, labelY, 0]}>
        <Text
          fontSize={0.42}
          color="#FEFAF3"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.02}
          outlineWidth={0.012}
          outlineColor="#0A0A0F"
          outlineOpacity={0.7}
        >
          {node.label}
        </Text>
      </Billboard>
    </group>
  );
}

export function DomainNodes() {
  return (
    <>
      {NODES.map((node) => (
        <DomainNode key={node.key} node={node} />
      ))}
    </>
  );
}
