"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { usePointerParallax } from "@/lib/usePointerParallax";

/** Warm-dark placeholder shown while the 3D bundle lazy-loads (and as the
 *  opaque canvas backdrop), so there is never a black flash. */
function CanvasPlaceholder() {
  return (
    <div
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 38%, #1c1020 0%, #120a16 45%, #0b0712 100%)",
      }}
    />
  );
}

// The R3F constellation is client-only and lazy-loaded; the rest of the page is SSR.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => <CanvasPlaceholder />,
});

export function CinematicHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const pointer = usePointerParallax(reduced);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // In reduced motion, hold a static "settled" key frame instead of scroll-coupling.
  const staticProgress = useMotionValue(0.55);
  const progress = reduced ? staticProgress : scrollYProgress;

  // Copy is present on load (strong first paint) and parallaxes / fades as you descend.
  const copyFade = useTransform(progress, [0.4, 0.7], [1, 0]);
  const copyY = useTransform(progress, [0, 0.7], [0, -70]);
  const hintOpacity = useTransform(progress, [0, 0.06, 0.24], [0.75, 0.75, 0]);
  // The constellation gracefully recedes/dims as the matrix section takes over.
  const canvasOpacity = useTransform(progress, [0.6, 0.95], [1, 0]);

  return (
    <section ref={ref} className="relative h-[230vh]" aria-label="Arrival">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink-900">
        {/* Real-time R3F constellation — the Life Correlation Matrix, spatialized. */}
        <motion.div
          className="absolute inset-0 h-full w-full"
          style={reduced ? undefined : { opacity: canvasOpacity }}
        >
          <HeroCanvas progress={progress} pointer={pointer} reduced={reduced} />
        </motion.div>

        {/* Legibility scrims — keep the copy readable over the bright scene. */}
        <div className="scrim-top pointer-events-none absolute inset-x-0 top-0 h-40" aria-hidden="true" />
        <div className="scrim-bottom pointer-events-none absolute inset-x-0 bottom-0 h-2/3" aria-hidden="true" />

        {/* Copy overlay — real DOM (SEO + a11y) */}
        <div className="absolute inset-0 flex items-end justify-center px-5 pb-[14vh] sm:pb-[12vh]">
          <motion.div
            className="w-full max-w-[920px] text-center"
            style={reduced ? undefined : { opacity: copyFade, y: copyY }}
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 26 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1], delay: 0.15 }}
            >
              <p className="eyebrow mb-5">balencia</p>
              <h1 className="text-balance font-extrabold leading-[0.98] tracking-[-0.03em] text-paper-100 [font-size:var(--text-display-2xl)] [text-shadow:0_2px_40px_rgba(10,10,15,0.6)]">
                A <span className="italic font-bold text-brand-orange">living</span> intelligence
                <br className="hidden sm:block" /> powering every dimension of your life.
              </h1>
              <p className="mx-auto mt-6 max-w-[560px] text-pretty text-white/70 [font-size:var(--text-lead)]">
                One app that sees the whole of you — not one slice. Meet SIA, the
                coach in your corner.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#matrix"
                  className="rounded-pill bg-brand-orange px-6 py-3.5 text-[15px] font-semibold text-paper-100 shadow-[var(--glow-orange)] transition-transform duration-[var(--dur-fast)] hover:scale-[1.03] active:scale-[0.98]"
                >
                  see your life connected
                </a>
                <a
                  href="#matrix"
                  className="rounded-pill border border-[var(--glass-border-strong)] px-6 py-3.5 text-[15px] font-semibold text-white/80 transition-colors hover:bg-white/5"
                >
                  how it works
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-7 flex flex-col items-center gap-2 text-white/55"
          aria-hidden="true"
        >
          <span className="text-[12px] tracking-[0.14em]">scroll to descend</span>
          <ArrowDown size={16} className="ambient-drift" />
        </motion.div>
      </div>
    </section>
  );
}
