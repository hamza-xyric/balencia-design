"use client";

import { useMemo } from "react";
import { DOMAINS, type DomainKey } from "@/lib/lcm";

/**
 * The 10-axis life wheel. Ported from balencia-screens RadarChart.tsx, scaled up
 * for the web and wired to the shared graph selection (selecting a graph node
 * pulses its radar axis — one instrument, not two widgets).
 */

// Example "average user" Domain Stats (0–99). Illustrative, not a product claim.
const AVERAGE_STATS: Record<DomainKey, number> = {
  fitness: 62,
  sleep: 54,
  career: 71,
  nutrition: 58,
  finance: 66,
  faith: 41,
  productivity: 68,
  relationships: 60,
  wellbeing: 57,
  meditation: 46,
};

const SIZE = 380;
const CENTER = SIZE / 2;
const RADIUS = 132;
const LABEL_RADIUS = 165;

function pointFor(index: number, value: number, maxRadius = RADIUS) {
  const angle = (Math.PI * 2 * index) / DOMAINS.length - Math.PI / 2;
  const r = maxRadius * (value / 99);
  return { x: CENTER + Math.cos(angle) * r, y: CENTER + Math.sin(angle) * r };
}

export function LifeRadar({
  highlight,
  onSelectAxis,
  className = "",
}: {
  highlight: DomainKey | null;
  onSelectAxis?: (key: DomainKey) => void;
  className?: string;
}) {
  const dataPoints = useMemo(
    () => DOMAINS.map((d, i) => pointFor(i, AVERAGE_STATS[d.key])),
    []
  );
  const polygonPoints = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className={`flex justify-center ${className}`} aria-label="Life areas radar chart — example average user">
      <svg width="100%" viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" className="max-w-[380px]">
        <title>Life wheel — ten domain stats for an example user</title>

        {[20, 40, 60, 80, 99].map((ring) => (
          <polygon
            key={ring}
            points={DOMAINS.map((_, i) => {
              const p = pointFor(i, ring);
              return `${p.x},${p.y}`;
            }).join(" ")}
            fill="none"
            stroke="currentColor"
            className="text-white/5"
            strokeWidth="1"
          />
        ))}

        {DOMAINS.map((d, i) => {
          const axisEnd = pointFor(i, 99);
          const labelPoint = pointFor(i, 99, LABEL_RADIUS);
          const anchor =
            Math.abs(labelPoint.x - CENTER) < 10 ? "middle" : labelPoint.x > CENTER ? "start" : "end";
          const active = highlight === d.key;
          return (
            <g key={d.key}>
              <line
                x1={CENTER}
                y1={CENTER}
                x2={axisEnd.x}
                y2={axisEnd.y}
                stroke="currentColor"
                className={active ? "text-white/35" : "text-white/10"}
                strokeWidth="1"
              />
              <text
                x={labelPoint.x}
                y={labelPoint.y + 4}
                textAnchor={anchor}
                onClick={onSelectAxis ? () => onSelectAxis(d.key) : undefined}
                className={[
                  "text-[12px] font-semibold transition-colors",
                  active ? "fill-white" : "fill-white/55",
                  onSelectAxis ? "cursor-pointer" : "",
                ].join(" ")}
              >
                {d.short}
              </text>
            </g>
          );
        })}

        <g className="radar-grow">
          <polygon
            points={polygonPoints}
            fill="var(--color-brand-orange)"
            fillOpacity="0.14"
            stroke="var(--color-brand-orange)"
            strokeOpacity="0.85"
            strokeWidth="2"
          />
          {DOMAINS.map((d, i) => {
            const p = dataPoints[i];
            const active = highlight === d.key;
            return (
              <circle
                key={d.key}
                cx={p.x}
                cy={p.y}
                r={active ? 7 : 4}
                fill={`var(${d.token})`}
                className="radar-dot transition-all"
                style={{
                  animationDelay: `${420 + i * 40}ms`,
                  filter: active ? `drop-shadow(0 0 8px ${d.accent})` : undefined,
                }}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
