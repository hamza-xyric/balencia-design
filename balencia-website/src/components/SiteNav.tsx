"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";

/** Minimal marketing nav — transparent over the hero, warm-dark after the first viewport. */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--dur-slow)]",
        scrolled
          ? "border-b border-[var(--glass-border)] bg-ink-900/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <Wordmark size="sm" />
        <div className="hidden items-center gap-7 text-[13px] text-white/55 md:flex">
          <a href="#matrix" className="transition-colors hover:text-white/90">how it works</a>
          <a href="#matrix" className="transition-colors hover:text-white/90">the science</a>
          <span className="text-white/30">pricing</span>
        </div>
        <a
          href="#matrix"
          className="rounded-pill bg-brand-orange px-4 py-2 text-[13px] font-semibold text-paper-100 shadow-[var(--glow-orange)] transition-transform duration-[var(--dur-fast)] hover:scale-[1.03] active:scale-[0.98]"
        >
          see your life connected
        </a>
      </nav>
    </header>
  );
}
