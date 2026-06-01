"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { DOMAIN_BY_KEY, INSIGHTS } from "@/lib/lcm";

/** Example cross-domain insights. Numbers are illustrative — see the footnote. */
export function InsightCards() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {INSIGHTS.map((ins, i) => {
          const a = DOMAIN_BY_KEY[ins.a];
          const b = DOMAIN_BY_KEY[ins.b];
          return (
            <motion.div
              key={`${ins.a}-${ins.b}-${i}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1], delay: i * 0.06 }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: a.accent }} />
                  <span className="text-[12px] font-semibold text-white/70">{a.label}</span>
                  <span className="text-white/30">↔</span>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: b.accent }} />
                  <span className="text-[12px] font-semibold text-white/70">{b.label}</span>
                </div>
                {ins.stat && (
                  <span className="rounded-pill bg-royal-purple/15 px-2.5 py-1 text-[11px] font-semibold text-royal-purple">
                    {ins.stat}
                  </span>
                )}
              </div>
              <p className="mt-3 text-[15px] leading-[22px] text-paper-100/90">{ins.text}</p>
              <div className="mt-3 flex items-center gap-1.5 text-[12px] text-royal-purple/80">
                <Sparkles size={13} />
                <span>SIA spotted this</span>
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-4 text-[12px] leading-[17px] text-white/40">
        Example figures shown to illustrate the kind of connection SIA finds — not product claims.
      </p>
    </div>
  );
}
