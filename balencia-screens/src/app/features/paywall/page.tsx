'use client'

import { useState } from 'react'
import { Check, Lock } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { paywallPrompt } from '@/data/mock'

// Screen 43 of 78: Paywall / upgrade prompt
// Spec: /Users/hamza/yHealth/app_design 3/43-paywall-upgrade-prompt.md

function BlurredPreview() {
  return (
    <div className="relative h-[128px] overflow-hidden rounded-xl border border-white/[0.08] bg-ink-900">
      <div className="absolute inset-0 p-4 blur-[5px]" aria-hidden="true">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-small font-semibold uppercase tracking-[0.12em] text-brand-orange">Insight</span>
          <span className="h-6 w-16 rounded-pill bg-white/10" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="h-10 rounded-md bg-brand-orange/20" />
          <span className="h-10 rounded-md bg-white/10" />
          <span className="h-10 rounded-md bg-royal-purple/15" />
        </div>
        <div className="mt-4 space-y-2">
          <span className="block h-3 w-4/5 rounded-pill bg-white/15" />
          <span className="block h-3 w-3/5 rounded-pill bg-white/10" />
          <span className="block h-3 w-2/3 rounded-pill bg-white/10" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink-brown-800/70" aria-hidden="true" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-ink-brown-800 text-white/70">
          <Lock size={18} strokeWidth={2.2} />
        </div>
        <p className="text-caption font-semibold leading-[18px] text-white/70">{paywallPrompt.previewLabel}</p>
      </div>
    </div>
  )
}

function FeatureHighlights() {
  return (
    <section className="mt-4">
      <h2 className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/50">
        what you&apos;ll get
      </h2>
      <div className="mt-2.5 space-y-2.5">
        {paywallPrompt.highlights.map((item) => (
          <div key={item} className="flex items-center gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
              <Check size={13} strokeWidth={2.6} />
            </span>
            <span className="text-[15px] leading-5 text-white">{item}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

const paywallPlans = [
  {
    id: 'plus-monthly',
    name: 'Plus monthly',
    price: '$20/mo',
    detail: 'Full SIA coaching with monthly renewal after a 7-day trial.',
    renewal: 'Renews Jun 3, 2026 at $20/mo after trial unless cancelled in the store.',
    cta: 'Start Plus trial',
  },
  {
    id: 'pro-monthly',
    name: 'Pro monthly',
    price: '$60/mo',
    detail: 'Advanced analytics and higher SIA limits for active planning.',
    renewal: 'Renews Jun 3, 2026 at $60/mo after trial unless cancelled in the store.',
    cta: 'Start Pro trial',
  },
  {
    id: 'plus-annual',
    name: 'Plus annual',
    price: '$192/yr',
    detail: 'Same Plus access with annual billing and two months saved.',
    renewal: 'Renews Jun 3, 2027 at $192/yr after trial unless cancelled in the store.',
    cta: 'Start annual trial',
  },
]

function TierCard() {
  return (
    <section className="mt-4 rounded-xl border border-brand-orange/30 bg-ink-900 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-brand-orange">
            {paywallPrompt.tier}
          </div>
          <div className="mt-1.5 text-[24px] font-bold leading-8 text-white">{paywallPrompt.price}</div>
          <p className="text-[15px] leading-5 text-white/70">{paywallPrompt.description}</p>
        </div>
        <span className="rounded-pill bg-brand-orange px-3 py-1 text-small font-semibold uppercase leading-[14px] text-white">
          Recommended
        </span>
      </div>
    </section>
  )
}

export default function PaywallScreen() {
  const [accent, ...rest] = paywallPrompt.headline.split(' ')
  const [state, setState] = useState<'offer' | 'processing' | 'success' | 'error' | 'plans' | 'dismissed'>('offer')
  const [selectedPlanId, setSelectedPlanId] = useState(paywallPlans[0].id)
  const selectedPlan = paywallPlans.find((plan) => plan.id === selectedPlanId) ?? paywallPlans[0]
  const startPurchase = () => {
    setState('processing')
    window.setTimeout(() => setState('success'), 700)
  }

  if (state === 'dismissed') {
    return (
      <PhoneFrame>
        <ScreenShell showTabBar={false}>
          <main className="flex min-h-full flex-col items-center justify-center bg-ink-900 px-6 text-center">
            <h1 className="text-h2 font-semibold leading-[26px] text-white">Upgrade dismissed</h1>
            <p className="mt-2 text-caption leading-[18px] text-white/55">Returned to the gated feature trigger.</p>
            <button type="button" onClick={() => setState('offer')} className="mt-5 h-11 rounded-pill bg-brand-orange px-5 text-[15px] font-semibold leading-5 text-white">Show paywall again</button>
          </main>
        </ScreenShell>
      </PhoneFrame>
    )
  }

  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <main className="relative flex min-h-full flex-col justify-end overflow-hidden bg-ink-900">
          <div className="absolute inset-0 px-4 pt-8 opacity-70 blur-[2px]" aria-hidden="true">
            <div className="rounded-xl border border-white/[0.06] bg-ink-brown-800 p-5 shadow-1">
              <div className="h-5 w-36 rounded-pill bg-white/10" />
              <div className="mt-4 h-28 rounded-xl bg-brand-orange/10" />
              <div className="mt-4 h-4 w-52 rounded-pill bg-white/10" />
              <div className="mt-2 h-4 w-40 rounded-pill bg-white/10" />
            </div>
          </div>

          <button type="button" className="absolute inset-0 bg-ink-900/60" aria-label="Dismiss upgrade prompt" onClick={() => setState('dismissed')} />

          <section className="relative z-10 max-h-[660px] overflow-y-auto overscroll-contain rounded-t-2xl border border-b-0 border-white/[0.08] bg-ink-brown-800 px-4 pb-0 pt-4 shadow-3 hide-scrollbar animate-fade-up" role="dialog" aria-modal="true" aria-label="Upgrade to Pro">
            <div className="mx-auto h-1 w-10 rounded-pill bg-white/20" />

            <div className="mt-5 px-1">
              <h1 className="text-[24px] font-bold leading-[31px] text-white">
                <span className="text-brand-orange">{accent}</span> {rest.join(' ')}
              </h1>
            </div>

            <div className="mt-4 px-1">
              <BlurredPreview />
            </div>

            <div className="px-1">
              <FeatureHighlights />
              {state === 'plans' ? (
                <div className="mt-4 grid gap-2">
                  {paywallPlans.map((plan) => {
                    const selected = selectedPlanId === plan.id
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={[
                          'min-h-[72px] rounded-md border px-4 py-3 text-left transition-colors duration-[var(--dur-fast)]',
                          selected ? 'border-brand-orange bg-brand-orange/10' : 'border-white/10 bg-ink-900',
                        ].join(' ')}
                      >
                        <span className="flex items-center justify-between gap-3 text-[15px] font-semibold leading-5 text-white">
                          <span>{plan.name}</span>
                          <span className="text-brand-orange">{plan.price}</span>
                        </span>
                        <span className="mt-1 block text-[12px] leading-4 text-white/50">{plan.detail}</span>
                        {selected && (
                          <span className="mt-2 inline-flex h-6 items-center rounded-pill bg-brand-orange px-2.5 text-[11px] font-semibold leading-[14px] text-white">
                            Selected
                          </span>
                        )}
                      </button>
                    )
                  })}
                  <p className="rounded-md bg-white/[0.04] p-3 text-[12px] leading-4 text-white/55">
                    Selected: {selectedPlan.name}. {selectedPlan.renewal} Final purchase, cancellation, and restore happen through the App Store or Google Play sheet.
                  </p>
                </div>
              ) : (
                <TierCard />
              )}
            </div>

            <div className="sticky bottom-0 z-20 -mx-4 mt-4 border-t border-white/[0.06] bg-ink-brown-800 px-5 pb-3 pt-3">
              <div className="px-1">
                <Button fullWidth size="auth" onClick={startPurchase} disabled={state === 'processing' || state === 'success'}>
                  {state === 'processing' ? 'Opening purchase...' : state === 'success' ? 'Unlocked' : state === 'plans' ? selectedPlan.cta : paywallPrompt.cta}
                </Button>
              </div>

              {state === 'success' && (
                <p className="mt-3 rounded-md bg-forest-green/15 p-3 text-center text-caption font-semibold leading-[18px] text-forest-green" role="status">
                  Trial active for {selectedPlan.name}. Store receipt synced; cancellation remains available through subscription settings.
                </p>
              )}

              {state === 'error' && (
                <p className="mt-3 rounded-md bg-error-red/15 p-3 text-center text-caption font-semibold leading-[18px] text-error-red" role="alert">
                  Purchase could not complete. Try again or restore purchases.
                </p>
              )}

              <button type="button" onClick={() => setState('dismissed')} className="mt-1 flex h-11 w-full items-center justify-center text-[15px] leading-5 text-white/50">
                Maybe later
              </button>
              <button type="button" onClick={() => setState(state === 'plans' ? 'offer' : 'plans')} className="flex h-11 w-full items-center justify-center text-[15px] font-semibold leading-5 text-brand-orange">
                {state === 'plans' ? 'Back to recommended plan' : 'See all plans'}
              </button>
              <button type="button" onClick={() => setState('success')} className="flex h-11 w-full items-center justify-center text-[15px] font-semibold leading-5 text-white/60">
                Restore purchases
              </button>
              <button type="button" onClick={() => setState('error')} className="flex h-11 w-full items-center justify-center text-[15px] font-semibold leading-5 text-white/50">
                Payment did not complete
              </button>
            </div>
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
