/**
 * Constellation layout — turns the Life Correlation Matrix (src/lib/lcm.ts) into
 * a deterministic 3D scene. This is the single source of truth the hero's core,
 * nodes, threads, and labels all read from, so the spatial graph stays honest to
 * the data: RING_ORDER → node angle, CLUSTERS → elevation, hubAvg → node size +
 * inward pull (Wellbeing largest/closest), accent → colour, EDGES → 45 weighted
 * threads that bow through the core.
 *
 * Pure + deterministic (no Math.random at call sites): a fixed seed per node keeps
 * the layout stable across renders and the reduced-motion static frame.
 */
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import {
  DOMAIN_BY_KEY,
  EDGES,
  MAX_HUB,
  MIN_HUB,
  RING_ORDER,
  type ClusterKey,
  type DomainKey,
} from "@/lib/lcm";

/** Base radius of the domain ring around the SIA core (world units). */
export const RING_RADIUS = 5.4;
/** SIA core radius. */
export const CORE_RADIUS = 1.18;

/** Depth (camera-axis Z) per cluster. The ring faces the camera — core centred,
 *  domains around it, like the 2D matrix wheel — but each cluster lives at a
 *  different depth, so the constellation has real dimensionality: physical sits
 *  forward (sharp), inner life recedes behind the core (soft), professional mid,
 *  the relationship bridge lifted toward the viewer between them. */
const CLUSTER_Z: Record<ClusterKey, number> = {
  physical: 2.0,
  professional: 0.0,
  inner: -2.1,
  bridge: 1.1,
};

/** Deterministic 0..1 hash for per-node jitter / pulse phase. */
function frac(n: number): number {
  const x = Math.sin(n * 127.1 + 11.7) * 43758.5453;
  return x - Math.floor(x);
}

export interface NodeLayout {
  key: DomainKey;
  label: string;
  accent: string;
  /** Resting world position on the ring. */
  pos: THREE.Vector3;
  /** Visual radius of the glass node (∝ hubAvg). */
  radius: number;
  /** 0..1 hub strength, normalised across the ten domains. */
  hubNorm: number;
  /** Index in RING_ORDER (drives emergence stagger). */
  ringIndex: number;
  /** Stable per-node seed for ambient phase + jitter. */
  seed: number;
}

/** Camera-facing ring is slightly wider than tall — sits well in a widescreen hero. */
const RX = RING_RADIUS * 1.18;
const RY = RING_RADIUS * 0.82;

export const NODES: NodeLayout[] = RING_ORDER.map((key, i) => {
  const d = DOMAIN_BY_KEY[key];
  const hubNorm = (d.hubAvg - MIN_HUB) / (MAX_HUB - MIN_HUB);
  const seed = frac(i + 1);
  const seed2 = frac(i * 2.3 + 4.1);

  // Start at the top, walk clockwise — same ordering as the 2D matrix wheel.
  const angle = -Math.PI / 2 + (i * Math.PI * 2) / RING_ORDER.length;
  // Stronger hubs pull slightly inward (more central); gentle per-node jitter.
  const pull = 1 - hubNorm * 0.07;
  const x = Math.cos(angle) * RX * pull + (seed - 0.5) * 0.5;
  const y = Math.sin(angle) * RY * pull + (seed2 - 0.5) * 0.5;
  const z = CLUSTER_Z[d.cluster] + (seed - 0.5) * 0.9;

  const pos = new THREE.Vector3(x, y, z);
  const radius = 0.34 + hubNorm * 0.3; // Finance smallest → Wellbeing largest.

  return { key, label: d.label, accent: d.accent, pos, radius, hubNorm, ringIndex: i, seed };
});

export const NODE_BY_KEY = new Map(NODES.map((n) => [n.key, n]));

/** Smooth, slightly-arced cubic curve from A to B that bows in through the core
 *  volume — every correlation visibly routes through SIA. */
function threadCurve(a: THREE.Vector3, b: THREE.Vector3): THREE.CubicBezierCurve3 {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  // Pull the midpoint toward the core, then bow it toward the viewer (+z) so the
  // thread arches in front of / around the core instead of cutting straight through.
  const towardCore = mid.clone().multiplyScalar(0.5);
  const arc = 1.0 + mid.length() * 0.16;
  towardCore.z += arc;
  const c1 = a.clone().lerp(towardCore, 0.55);
  const c2 = b.clone().lerp(towardCore, 0.55);
  return new THREE.CubicBezierCurve3(a, c1, c2, b);
}

/**
 * Build a single merged tube geometry for all 45 edges, carrying per-vertex
 * attributes so one draw call + one shader can render every weighted, flowing,
 * strongest-first-revealing thread:
 *  - aWeight  : correlation weight (brightness / flow speed)
 *  - aStagger : 0..1 reveal order (0 = strongest, drawn first)
 *  - aSeed    : per-edge phase offset for the energy pulse
 *  uv.x already runs 0→1 along each tube's length (the draw-in axis).
 */
export function buildThreadGeometry(lite: boolean): THREE.BufferGeometry {
  const tubular = lite ? 26 : 54;
  const radial = lite ? 4 : 7;

  // Rank edges by weight (descending) → strongest reveals first.
  const ranked = [...EDGES].sort((x, y) => y.w - x.w);
  const lastIndex = Math.max(1, ranked.length - 1);

  const geos: THREE.BufferGeometry[] = ranked.map((e, rank) => {
    const a = NODE_BY_KEY.get(e.a)!.pos;
    const b = NODE_BY_KEY.get(e.b)!.pos;
    const curve = threadCurve(a, b);
    // Thicker tube for stronger correlations.
    const tubeRadius = 0.009 + e.w * 0.036;
    const geo = new THREE.TubeGeometry(curve, tubular, tubeRadius, radial, false);

    const count = geo.attributes.position.count;
    const w = new Float32Array(count).fill(e.w);
    const stagger = new Float32Array(count).fill(rank / lastIndex);
    const seed = new Float32Array(count).fill(frac(rank * 5.7 + 2.2));
    geo.setAttribute("aWeight", new THREE.BufferAttribute(w, 1));
    geo.setAttribute("aStagger", new THREE.BufferAttribute(stagger, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return geo;
  });

  const merged = mergeGeometries(geos, false);
  geos.forEach((g) => g.dispose());
  if (!merged) throw new Error("constellation: failed to merge thread geometry");
  return merged;
}
