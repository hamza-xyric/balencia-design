"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import {
  CLUSTERS,
  DOMAIN_BY_KEY,
  EDGES,
  FEATURED,
  MAX_HUB,
  MIN_HUB,
  RING_ORDER,
  edgesFor,
  type ClusterKey,
  type DomainKey,
} from "@/lib/lcm";

type ClusterFilter = "all" | "physical" | "professional" | "inner";
type Layer = "base" | "personal";

const VB = 760;
const C = VB / 2;
const RING = 248;

export function CorrelationGraph({
  selected,
  onSelect,
}: {
  selected: DomainKey | null;
  onSelect: (k: DomainKey | null) => void;
}) {
  const reduced = useReducedMotionSafe();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.3 });
  const drawn = inView || !!reduced;

  const [cluster, setCluster] = useState<ClusterFilter>("all");
  const [layer, setLayer] = useState<Layer>("base");
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Deterministic radial layout (clusters contiguous; node size ∝ hub strength).
  const layout = useMemo(() => {
    const m = new Map<DomainKey, { x: number; y: number; r: number }>();
    RING_ORDER.forEach((k, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / RING_ORDER.length;
      const d = DOMAIN_BY_KEY[k];
      const r = 17 + (30 - 17) * ((d.hubAvg - MIN_HUB) / (MAX_HUB - MIN_HUB));
      m.set(k, { x: C + Math.cos(a) * RING, y: C + Math.sin(a) * RING, r });
    });
    return m;
  }, []);

  const edgePaths = useMemo(
    () =>
      EDGES.map((e) => {
        const p1 = layout.get(e.a)!;
        const p2 = layout.get(e.b)!;
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        const cx = mx + (C - mx) * 0.16;
        const cy = my + (C - my) * 0.16;
        return { ...e, d: `M${p1.x},${p1.y} Q${cx},${cy} ${p2.x},${p2.y}` };
      }),
    [layout]
  );

  const members = cluster !== "all" ? new Set(CLUSTERS[cluster as Exclude<ClusterKey, "bridge">].members) : null;

  function edgeStyle(e: { a: DomainKey; b: DomainKey; w: number }) {
    const base = e.w < 0.35 ? 0.07 : 0.14 + e.w * 0.5;
    const bw = 0.7 + e.w * 2.6;
    if (selected) {
      const incident = e.a === selected || e.b === selected;
      return incident
        ? { opacity: 0.92, width: bw * 1.5 + 0.5, glow: true }
        : { opacity: 0.05, width: bw * 0.7, glow: false };
    }
    if (members) {
      const inC = members.has(e.a) && members.has(e.b);
      return inC
        ? { opacity: 0.82, width: bw * 1.4, glow: true }
        : { opacity: 0.05, width: bw * 0.7, glow: false };
    }
    return { opacity: base, width: bw, glow: false };
  }

  function nodeOpacity(k: DomainKey) {
    if (selected) return k === selected ? 1 : 0.5;
    if (members) return members.has(k) ? 1 : 0.28;
    return 0.95;
  }

  // Featured personal-layer edge (meditation ↔ finance): base 0.20 → personal 0.55.
  const featuredPath = useMemo(() => {
    const p1 = layout.get(FEATURED.a)!;
    const p2 = layout.get(FEATURED.b)!;
    const mx = (p1.x + p2.x) / 2;
    const my = (p1.y + p2.y) / 2;
    const cx = mx + (C - mx) * 0.16;
    const cy = my + (C - my) * 0.16;
    return `M${p1.x},${p1.y} Q${cx},${cy} ${p2.x},${p2.y}`;
  }, [layout]);

  // Live "connections" counter — the breadth device for the one-of-many constraint.
  // Init deterministically (0) so SSR and first client render agree; populate via rAF
  // (setState lives in the animation callback, never synchronously in the effect body).
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView && !reduced) return;
    const target = 1248;
    const dur = reduced ? 0 : 1600;
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = dur === 0 ? 1 : Math.min(1, (t - start) / dur);
      setCount(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  function onNodeKey(e: React.KeyboardEvent, idx: number) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = RING_ORDER[(idx + 1) % RING_ORDER.length];
      nodeRefs.current[next]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = RING_ORDER[(idx - 1 + RING_ORDER.length) % RING_ORDER.length];
      nodeRefs.current[prev]?.focus();
    } else if (e.key === "Escape") {
      onSelect(null);
    }
  }

  const conns = selected ? edgesFor(selected) : [];

  return (
    <div ref={wrapRef} className="w-full">
      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div
          className="inline-flex rounded-pill border border-[var(--glass-border)] bg-ink-brown-800/70 p-1"
          role="tablist"
          aria-label="Filter by cluster"
        >
          {([
            ["all", "All"],
            ["physical", "Physical"],
            ["professional", "Professional"],
            ["inner", "Inner life"],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={cluster === key}
              onClick={() => {
                setCluster(key);
                onSelect(null);
              }}
              className={[
                "rounded-pill px-3.5 py-1.5 text-[12px] font-semibold transition-colors duration-[var(--dur-base)]",
                cluster === key ? "bg-brand-orange text-paper-100" : "text-white/55 hover:text-white/85",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setLayer((l) => (l === "base" ? "personal" : "base"))}
          aria-pressed={layer === "personal"}
          className="inline-flex items-center gap-2 rounded-pill border border-[var(--glass-border-strong)] px-3.5 py-1.5 text-[12px] font-semibold text-white/75 transition-colors hover:bg-white/5"
        >
          <span
            className={[
              "h-2 w-2 rounded-full transition-colors",
              layer === "personal" ? "bg-royal-purple" : "bg-connection-gold",
            ].join(" ")}
          />
          {layer === "base" ? "showing: the average human" : "showing: as SIA learns you"}
        </button>
      </div>

      <div className="grid items-center gap-7 lg:grid-cols-[1.25fr_1fr]">
        {/* Graph */}
        <div className="relative mx-auto aspect-square w-full max-w-[620px] [container-type:inline-size]">
          <svg viewBox={`0 0 ${VB} ${VB}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="edgeGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF5E00" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
              <radialGradient id="siaCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFB066" />
                <stop offset="55%" stopColor="#FF5E00" />
                <stop offset="100%" stopColor="rgba(255,94,0,0)" />
              </radialGradient>
            </defs>

            {/* Faint spokes: SIA powering each domain */}
            {RING_ORDER.map((k) => {
              const p = layout.get(k)!;
              return (
                <line
                  key={`spoke-${k}`}
                  x1={C}
                  y1={C}
                  x2={p.x}
                  y2={p.y}
                  stroke="#FF5E00"
                  strokeWidth={0.6}
                  style={{ opacity: selected || members ? 0.04 : 0.08 }}
                />
              );
            })}

            {/* The 45 correlation edges */}
            {edgePaths.map((e) => {
              const s = edgeStyle(e);
              const delay = drawn ? (1 - e.w) * 650 : 0;
              return (
                <path
                  key={`${e.a}-${e.b}`}
                  d={e.d}
                  pathLength={1}
                  fill="none"
                  stroke="url(#edgeGold)"
                  strokeWidth={s.width}
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: drawn ? 0 : 1,
                    opacity: drawn ? s.opacity : 0,
                    filter: s.glow ? "drop-shadow(0 0 5px rgba(245,158,11,0.7))" : undefined,
                    transition: `stroke-dashoffset var(--dur-flow) var(--ease-flow) ${delay}ms, opacity var(--dur-base) var(--ease-out-soft), stroke-width var(--dur-base) var(--ease-out-soft)`,
                  }}
                />
              );
            })}

            {/* Personal-layer featured edge */}
            {layer === "personal" && (
              <path
                d={featuredPath}
                pathLength={1}
                fill="none"
                stroke="#7F24FF"
                strokeWidth={3.4}
                strokeLinecap="round"
                strokeDasharray="6 7"
                className="node-pulse"
                style={{ filter: "drop-shadow(0 0 6px rgba(127,36,255,0.7))" }}
              />
            )}

            {/* SIA core glow */}
            <circle cx={C} cy={C} r={70} fill="url(#siaCore)" opacity={0.55} />
          </svg>

          {/* Domain nodes — real buttons (keyboard + a11y) */}
          {RING_ORDER.map((k, idx) => {
            const d = DOMAIN_BY_KEY[k];
            const p = layout.get(k)!;
            const sizePct = ((p.r * 2) / VB) * 100;
            const isSel = selected === k;
            return (
              <button
                key={k}
                ref={(el) => {
                  nodeRefs.current[k] = el;
                }}
                onClick={() => onSelect(isSel ? null : k)}
                onMouseEnter={() => onSelect(k)}
                onFocus={() => onSelect(k)}
                onKeyDown={(e) => onNodeKey(e, idx)}
                aria-pressed={isSel}
                aria-label={`${d.label}, ${Math.round(d.hubAvg * 100)} percent average correlation. ${isSel ? "selected" : "show connections"}`}
                className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
                style={{ left: `${(p.x / VB) * 100}%`, top: `${(p.y / VB) * 100}%`, opacity: nodeOpacity(k), transition: "opacity var(--dur-base) var(--ease-out-soft)" }}
              >
                <span
                  className={[
                    "block rounded-full border transition-transform duration-[var(--dur-base)]",
                    isSel ? "scale-110 border-white" : "border-white/15 group-hover:scale-110 group-focus-visible:scale-110",
                  ].join(" ")}
                  style={{
                    width: `${sizePct}cqw`,
                    height: `${sizePct}cqw`,
                    backgroundColor: d.accent,
                    boxShadow: isSel ? `0 0 22px ${d.accent}` : "0 2px 8px rgba(0,0,0,0.4)",
                  }}
                />
                <span
                  className={[
                    "pointer-events-none absolute left-1/2 top-[calc(100%+4px)] -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold leading-none transition-colors",
                    isSel ? "text-white" : "text-white/65",
                  ].join(" ")}
                >
                  {d.label}
                </span>
              </button>
            );
          })}

          {/* SIA center label */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            aria-hidden="true"
          >
            <span className="text-[13px] font-bold tracking-[0.12em] text-paper-100">SIA</span>
          </div>
        </div>

        {/* Readout / framing panel */}
        <div className="min-w-0">
          <p className="eyebrow mb-2">connections SIA is mapping for you</p>
          <p className="mb-5 text-[34px] font-extrabold leading-none tracking-[-0.02em] text-paper-100">
            {count.toLocaleString()}
            <span className="text-brand-orange">+</span>
          </p>

          {selected ? (
            <div className="glass-card animate-fade-up p-5">
              <div className="flex items-center gap-2.5">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: DOMAIN_BY_KEY[selected].accent }} />
                <h3 className="text-[17px] font-semibold text-paper-100">{DOMAIN_BY_KEY[selected].label}</h3>
              </div>
              <p className="mt-3 text-[13px] leading-[19px] text-white/55">Connected to</p>
              <div className="mt-2 space-y-2.5">
                {conns.slice(0, 5).map(({ other, w }) => (
                  <div key={other.key}>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: other.accent }} />
                      <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-white/90">{other.label}</span>
                      <span className="text-[13px] font-semibold text-white/60">{Math.round(w * 100)}%</span>
                    </div>
                    <div className="mt-1 h-1 overflow-hidden rounded-pill bg-white/[0.06]">
                      <div className="h-full rounded-pill" style={{ width: `${w * 100}%`, background: "linear-gradient(90deg,#FF5E00,#F59E0B)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-card p-5">
              <p className="text-[15px] leading-[23px] text-white/75">
                {members
                  ? `${CLUSTERS[cluster as Exclude<ClusterKey, "bridge">].label} cluster — these domains ${CLUSTERS[cluster as Exclude<ClusterKey, "bridge">].note}.`
                  : "Each line is a connection. The brighter it glows, the more these two parts of your life move together. Hover or tap a domain to trace its web."}
              </p>
              <p className="mt-4 text-[13px] leading-[19px] text-white/45">
                This is the average human — every connection backed by research, true from day one.
                As SIA learns you, your matrix quietly rewires. Yours becomes one of a kind.
              </p>
            </div>
          )}

          {layer === "personal" && (
            <p className="mt-4 flex items-center gap-2 text-[13px] leading-[19px] text-white/65">
              <span className="h-2 w-6 shrink-0 rounded-pill" style={{ background: "repeating-linear-gradient(90deg,#7F24FF 0 6px,transparent 6px 11px)" }} />
              Meditation ↔ Finance: average <span className="text-white/45">0.20</span> → this person <span className="font-semibold text-royal-purple">0.55</span>.
            </p>
          )}
        </div>
      </div>

      {/* Visually-hidden text-equivalent table of all 45 pairs */}
      <table className="sr-only">
        <caption>Life Correlation Matrix — base correlation weight for every domain pair (0 to 1).</caption>
        <thead>
          <tr>
            <th scope="col">Domain A</th>
            <th scope="col">Domain B</th>
            <th scope="col">Weight</th>
          </tr>
        </thead>
        <tbody>
          {EDGES.map((e) => (
            <tr key={`t-${e.a}-${e.b}`}>
              <td>{DOMAIN_BY_KEY[e.a].label}</td>
              <td>{DOMAIN_BY_KEY[e.b].label}</td>
              <td>{e.w.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="sr-only" aria-live="polite">
        {selected
          ? `${DOMAIN_BY_KEY[selected].label} connections: ${edgesFor(selected).map((c) => `${c.other.label} ${Math.round(c.w * 100)}%`).join(", ")}.`
          : "No domain selected."}
      </p>
    </div>
  );
}
