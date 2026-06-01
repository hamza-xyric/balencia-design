import { SiteNav } from "./SiteNav";
import { Wordmark } from "./Wordmark";
import { CinematicHero } from "./hero/CinematicHero";
import { MatrixSection } from "./lcm/MatrixSection";

/**
 * The design-first vertical slice: cinematic hero beat (scroll-scrub shell) →
 * the live Life Correlation Matrix (the one interactive moment) → closing.
 * Phase 2 expands this to the full 12-beat scroll (see brief/WEBSITE-VISION.md).
 */
export function Experience() {
  return (
    <>
      <SiteNav />
      <main>
        <CinematicHero />
        <MatrixSection />

        {/* Closing beat (abbreviated for the PoC) */}
        <section className="relative overflow-hidden bg-ink-900">
          <div className="atmosphere-warm aurora-drift absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="relative mx-auto flex max-w-[820px] flex-col items-center px-5 py-32 text-center">
            <p className="text-balance font-semibold leading-[1.2] text-white/80 [font-size:var(--text-display-m)]">
              Welcome to your civilization. Let us begin.
            </p>
            <p className="mt-8 text-balance font-extrabold leading-[1.05] tracking-[-0.02em] text-paper-100 [font-size:var(--text-display-l)]">
              Find your <span className="italic text-brand-orange">balance</span>.
            </p>
            <div className="mt-10">
              <Wordmark size="lg" />
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#matrix"
                className="rounded-pill bg-brand-orange px-7 py-3.5 text-[15px] font-semibold text-paper-100 shadow-[var(--glow-orange)] transition-transform duration-[var(--dur-fast)] hover:scale-[1.03] active:scale-[0.98]"
              >
                begin
              </a>
              <span className="rounded-pill border border-[var(--glass-border-strong)] px-7 py-3.5 text-[15px] font-semibold text-white/60">
                join the waitlist
              </span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[var(--glass-border)] bg-ink-900">
          <div className="mx-auto flex max-w-[1080px] flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center gap-3">
              <Wordmark size="sm" />
              <span className="text-[13px] text-white/45">A coach. In your corner.</span>
            </div>
            <p className="text-[12px] text-white/35">
              Proof of concept · Phase 1 vertical slice · cinematic frames are placeholders.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
