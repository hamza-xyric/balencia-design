'use client'

import { ChevronLeft, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'

type PolicySection = {
  title: string
  body: string
}

type LegalPolicyPageProps = {
  title: string
  eyebrow: string
  intro: string
  sections: PolicySection[]
}

export function LegalPolicyPage({ title, eyebrow, intro, sections }: LegalPolicyPageProps) {
  const router = useRouter()

  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <main className="min-h-full px-6 pb-8 pt-2">
          <div className="flex h-11 items-center justify-between">
            <button
              type="button"
              aria-label="Back"
              onClick={() => (window.history.length > 1 ? router.back() : router.push('/auth/consent'))}
              className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-[var(--dur-fast)] hover:bg-white/5"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
            <BrandSymbol size={32} />
          </div>

          <section className="mt-6 animate-fade-up">
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange">
              <ShieldCheck size={20} strokeWidth={1.8} />
            </div>
            <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/40">
              {eyebrow}
            </p>
            <h1 className="mt-2 text-[28px] font-bold leading-9 text-white">
              {title}
            </h1>
            <p className="mt-3 text-[15px] leading-[22px] text-white/60">
              {intro}
            </p>
          </section>

          <section className="mt-6 space-y-3">
            {sections.map((section, index) => (
              <article
                key={section.title}
                className="animate-fade-up rounded-xl border border-white/[0.06] bg-ink-brown-800 p-4 shadow-1"
                style={{ animationDelay: `${120 + index * 60}ms` }}
              >
                <h2 className="text-[16px] font-semibold leading-6 text-white">
                  {section.title}
                </h2>
                <p className="mt-2 text-[14px] leading-5 text-white/60">
                  {section.body}
                </p>
              </article>
            ))}
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
