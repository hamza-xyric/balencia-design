"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { type DomainKey } from "@/lib/lcm";
import { CorrelationGraph } from "./CorrelationGraph";
import { LifeRadar } from "./LifeRadar";
import { ExampleStory } from "./ExampleStory";
import { InsightCards } from "./InsightCards";

const REVELATION = [
  "This is the complete picture.",
  "Most apps see one building. I see the entire civilization.",
  "Your sleep affects your career. Your meals shape your mood. Your relationships drive your recovery.",
];

export function MatrixSection() {
  // Shared selection — graph and radar are one instrument.
  const [selected, setSelected] = useState<DomainKey | null>(null);

  return (
    <section id="matrix" className="relative scroll-mt-16 bg-ink-900">
      {/* soft warm divider from the hero */}
      <div className="atmosphere-warm pointer-events-none absolute inset-x-0 top-0 h-64 opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1080px] px-5 py-24 sm:px-8 sm:py-32">
        {/* 7a — the revelation */}
        <div className="mx-auto max-w-[820px] text-center">
          <p className="eyebrow mb-6">the life correlation matrix</p>
          <div className="space-y-5">
            {REVELATION.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: i * 0.08 }}
                className={[
                  "text-balance leading-[1.15] tracking-[-0.02em]",
                  i === 1
                    ? "font-extrabold text-paper-100 [font-size:var(--text-display-l)]"
                    : "font-semibold text-white/75 [font-size:var(--text-display-m)]",
                ].join(" ")}
              >
                {line}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.24 }}
              className="text-balance pt-2 font-extrabold leading-[1.15] tracking-[-0.02em] text-paper-100 [font-size:var(--text-display-l)]"
            >
              Every dimension of human life becomes{" "}
              <span className="italic text-brand-orange">stronger</span> when powered by intelligent AI.
            </motion.p>
          </div>
        </div>

        {/* 7b — the live instrument */}
        <div className="mt-24">
          <div className="mx-auto mb-12 max-w-[720px] text-center">
            <h2 className="text-balance font-extrabold leading-[1.08] tracking-[-0.02em] text-paper-100 [font-size:var(--text-display-m)]">
              I do not just track your ten domains. I map how they move each other.
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-[24px] text-white/65">
              Every line is a connection I have found between two parts of your life.
              Pull one thread, and you can see what moves with it.
            </p>
          </div>

          <CorrelationGraph selected={selected} onSelect={setSelected} />

          {/* the radar — the shape of it all (shares the selection) */}
          <div className="mt-20 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="eyebrow mb-3">the shape of it all</p>
              <h3 className="text-balance font-extrabold leading-[1.1] tracking-[-0.02em] text-paper-100 [font-size:var(--text-display-m)]">
                Your ten domains, at a glance.
              </h3>
              <p className="mt-4 max-w-[440px] text-[16px] leading-[24px] text-white/65">
                Each domain earns a score from 0 to 99. Together they form your life wheel,
                and one number — your Life Power. Balance is its own kind of strength.
              </p>
              <p className="mt-4 text-[13px] leading-[19px] text-white/40">
                Hover a domain in the web above and watch its axis light up here. One instrument, two views.
              </p>
            </div>
            <LifeRadar highlight={selected} onSelectAxis={setSelected} />
          </div>
        </div>

        {/* 7c — one example, framed as one of many */}
        <div className="mt-28">
          <ExampleStory />
        </div>

        {/* breadth — five more */}
        <div id="insights" className="mt-24 scroll-mt-24">
          <div className="mx-auto mb-8 max-w-[640px] text-center">
            <p className="eyebrow mb-3">a few more, out of thousands</p>
            <h3 className="text-balance font-extrabold leading-[1.1] tracking-[-0.02em] text-paper-100 [font-size:var(--text-display-m)]">
              The connections single-purpose apps never see.
            </h3>
          </div>
          <InsightCards />
        </div>
      </div>
    </section>
  );
}
