"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { FEATURED } from "@/lib/lcm";

// Personal-layer climb: meditation ↔ finance, base 0.20 → personal 0.55 over 6 weeks.
const VALUES = [0.2, 0.21, 0.26, 0.34, 0.43, 0.5, 0.55];
const X0 = 52;
const X1 = 576;
const Y0 = 28;
const Y1 = 244;
const DOMAIN_MAX = 0.7;

const x = (i: number) => X0 + (i / (VALUES.length - 1)) * (X1 - X0);
const y = (v: number) => Y1 - (v / DOMAIN_MAX) * (Y1 - Y0);

const risingPath = VALUES.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");

export function ExampleStory() {
  const reduced = useReducedMotionSafe();
  return (
    <div className="mx-auto max-w-[840px]">
      <p className="eyebrow mb-3">one connection, out of thousands</p>
      <h3 className="text-balance font-extrabold leading-[1.05] tracking-[-0.02em] text-paper-100 [font-size:var(--text-display-m)]">
        Here is one, followed all the way through.
      </h3>
      <p className="mt-4 max-w-[620px] text-[16px] leading-[24px] text-white/65">
        SIA quietly tracks how all forty-five of your life-connections move together.
        Most are faint. This one started at almost nothing — and grew.
      </p>

      <div className="mt-8 grid gap-7 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        {/* The drawn chart */}
        <div className="glass-card p-5">
          <div className="mb-3 flex items-center justify-between text-[12px]">
            <span className="font-semibold text-white/70">meditation ↔ finance, over six weeks</span>
            <span className="text-white/40">correlation strength</span>
          </div>
          <svg viewBox="0 0 600 280" className="w-full" role="img" aria-label="A line chart: the average person's meditation-to-finance correlation stays flat at 0.20, while this user's climbs to 0.55 over six weeks.">
            {/* gridlines */}
            {[0.2, 0.4, 0.6].map((g) => (
              <g key={g}>
                <line x1={X0} y1={y(g)} x2={X1} y2={y(g)} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
                <text x={X0 - 10} y={y(g) + 4} textAnchor="end" className="fill-white/35 text-[11px]">{g.toFixed(1)}</text>
              </g>
            ))}
            {/* week labels */}
            {VALUES.map((_, i) => (
              <text key={i} x={x(i)} y={268} textAnchor="middle" className="fill-white/30 text-[10px]">{`w${i}`}</text>
            ))}

            {/* flat "average person" baseline at 0.20 (solid orange = population/base) */}
            <line x1={X0} y1={y(0.2)} x2={X1} y2={y(0.2)} stroke="#FF5E00" strokeWidth={2} strokeOpacity={0.55} strokeDasharray="2 5" />
            <text x={X1} y={y(0.2) + 16} textAnchor="end" className="fill-white/45 text-[11px]">average person · 0.20</text>

            {/* this person's rising personal line (dashed purple = AI/personal projection) */}
            <motion.path
              d={risingPath}
              fill="none"
              stroke="#7F24FF"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduced ? false : { pathLength: 0 }}
              whileInView={reduced ? undefined : { pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, ease: [0.65, 0.05, 0.36, 1] }}
              style={{ filter: "drop-shadow(0 0 6px rgba(127,36,255,0.5))" }}
            />

            {/* green milestone dots (confidence crossings) */}
            {[2, 5].map((wk) => (
              <motion.circle
                key={wk}
                cx={x(wk)}
                cy={y(VALUES[wk])}
                r={4.5}
                fill="#34A853"
                initial={reduced ? false : { opacity: 0, scale: 0 }}
                whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + wk * 0.06, duration: 0.3 }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            ))}

            {/* endpoint label */}
            <circle cx={x(6)} cy={y(0.55)} r={5} fill="#A78BFA" />
            <text x={x(6) - 8} y={y(0.55) - 10} textAnchor="end" className="fill-white text-[12px] font-semibold">you · 0.55</text>
          </svg>
        </div>

        {/* SIA surfaces it */}
        <div>
          <div className="glass-card p-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="sia-thinking-dot h-2.5 w-2.5 rounded-full bg-royal-purple" />
              <span className="text-[12px] font-semibold tracking-[0.08em] text-royal-purple">SIA</span>
            </div>
            <p className="text-[16px] leading-[24px] text-paper-100/95">
              {FEATURED.quote.replace(" Want to explore this?", "")}
            </p>
            <button className="mt-4 rounded-pill bg-royal-purple/15 px-4 py-2 text-[13px] font-semibold text-royal-purple transition-colors hover:bg-royal-purple/25">
              want to explore this?
            </button>
          </div>
          <p className="mt-5 text-[15px] leading-[23px] text-white/70">
            Base correlation for meditation and spending is just <span className="text-white/45">0.20</span> — almost nothing.
            For this person it climbed to <span className="font-semibold text-royal-purple">0.55</span>.
            An insight no single-purpose app could ever see.
          </p>
        </div>
      </div>

      {/* The "one of thousands" pay-off — the owner's constraint */}
      <div className="mt-9 rounded-2xl border border-[var(--glass-border)] bg-gradient-to-b from-white/[0.03] to-transparent p-6 text-center">
        <p className="mx-auto max-w-[680px] text-balance text-[18px] leading-[27px] text-paper-100/90">
          This is one of <span className="italic font-semibold text-brand-orange">thousands</span> of connections SIA
          maps for you — every day, quietly, in the background. You only ever see the one that matters most this morning.
        </p>
        <a href="#insights" className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-white/70 transition-colors hover:text-white">
          see five more →
        </a>
      </div>
    </div>
  );
}
