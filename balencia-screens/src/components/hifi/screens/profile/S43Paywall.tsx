'use client'

import { useState } from 'react'
import { BarChart3, X } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  Chip,
  ConsentRail,
  FULL_DATA_CONTROLS,
  HifiShell,
  IconButton,
  PaywallLock,
  Provenance,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

const planRows = [
  { feature: 'Active missions', free: '2', plus: 'Unlimited', pro: 'Unlimited' },
  { feature: 'Weekly insight', free: 'Basic', plus: 'Projected', pro: 'Projected+' },
  { feature: 'Mission models', free: 'Not included', plus: 'Included', pro: 'Included' },
]

export function S43Paywall() {
  const [status, setStatus] = useState('')
  const closeUpgrade = () => {
    if (window.history.length > 1) window.history.back()
    else window.location.assign('/screens/12')
  }
  const startUpgrade = () => setStatus('Plus selected. App Store confirmation would open next.')

  return (
    <HifiShell
      header={
        <TopBar
          title="Upgrade"
          eyebrow="Balencia Plus"
          back
          titleLevel="div"
          right={
            <IconButton label="Close upgrade" onClick={closeUpgrade}>
              <X className="h-5 w-5" />
            </IconButton>
          }
        />
      }
      atmosphere="cia"
      showTabBar={false}
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <section className="space-y-2 pt-2 text-center">
          <p className="text-[13px] uppercase tracking-[0.18em] text-paper-100/65">Balencia Plus</p>
          <h1 className="text-2xl leading-tight text-paper-100">
            Unlock CIA&apos;s <span className="text-emphasis">intelligence</span>
          </h1>
          <p className="mx-auto max-w-[320px] text-[15px] leading-snug text-paper-100/70">
            Projected reads, weekly mission models, and deeper trends across your Amira persona.
          </p>
        </section>

        <PaywallLock
          title="Weekly mission model"
          description="Upgrade to reveal projected effort, recovery alignment, and deeper trends."
          action={<BtnPrimary className="w-full" onClick={startUpgrade}>Upgrade to Plus</BtnPrimary>}
          className="min-h-[270px]"
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-paper-100/60">
                  Amira · weekly outlook
                </p>
                <h2 className="mt-1 text-lg font-semibold text-paper-100">Run progression model</h2>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cta-ember/20 text-brand-orange">
                <BarChart3 className="h-5 w-5" />
              </span>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <div className="flex items-center justify-between text-[11px] text-paper-100/65">
                <span>Planned missions</span>
                <span>7-day view</span>
              </div>
              <svg viewBox="0 0 260 58" className="mt-2 h-14 w-full" role="img" aria-label="Projected mission trend">
                <path d="M2 46H258M2 28H258M2 10H258" fill="none" stroke="currentColor" strokeOpacity="0.12" />
                <path
                  d="M2 44C28 42 31 31 56 34C84 38 91 18 116 23C143 29 153 12 179 17C205 22 218 8 258 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-brand-orange"
                />
              </svg>
              <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] text-paper-100/65">
                <span>Effort curve</span>
                <span>Recovery fit</span>
                <span>Trend read</span>
              </div>
            </div>
          </div>
        </PaywallLock>

        <SolidCard className="overflow-hidden">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-[15px] font-semibold text-paper-100">Plan comparison</h2>
              <p className="mt-0.5 text-[12px] text-paper-100/65">Plan entitlements</p>
            </div>
            <span className="rounded-full border border-brand-orange/30 bg-cta-ember/15 px-2.5 py-1 text-[11px] font-semibold text-brand-orange">
              Plus
            </span>
          </div>

          <div className="-mx-1 overflow-hidden">
            <table className="w-full table-fixed border-collapse text-left">
              <caption className="sr-only">Free, Plus, and Pro plan feature comparison</caption>
              <colgroup>
                <col className="w-[40%]" />
                <col className="w-[20%]" />
                <col className="w-[20%]" />
                <col className="w-[20%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-white/10 text-[11px] uppercase tracking-[0.06em] text-paper-100/65">
                  <th scope="col" className="px-1 py-2 font-semibold">Feature</th>
                  <th scope="col" className="px-1 py-2 text-center font-semibold">Free</th>
                  <th scope="col" className="bg-cta-ember/10 px-1 py-2 text-center font-semibold text-brand-orange">Plus</th>
                  <th scope="col" className="px-1 py-2 text-center font-semibold">Pro</th>
                </tr>
              </thead>
              <tbody>
                {planRows.map((row) => (
                  <tr key={row.feature} className="border-b border-white/[0.06] last:border-b-0">
                    <th scope="row" className="px-1 py-2.5 text-[12px] font-medium leading-4 text-paper-100/80">
                      {row.feature}
                    </th>
                    <td className="px-1 py-2.5 text-center text-[11px] leading-4 text-paper-100/65">{row.free}</td>
                    <td className="bg-cta-ember/10 px-1 py-2.5 text-center text-[11px] font-semibold leading-4 text-paper-100">{row.plus}</td>
                    <td className="px-1 py-2.5 text-center text-[11px] leading-4 text-paper-100/65">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SolidCard>

        <section className="space-y-3 pt-1" aria-labelledby="plus-price">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p id="plus-price" className="text-[12px] font-semibold uppercase tracking-[0.08em] text-paper-100/65">
                Balencia Plus
              </p>
              <p className="mt-1 tabular-nums text-paper-100">
                <span className="text-xl font-semibold">$20</span>
                <span className="ml-1 text-[13px] text-paper-100/65">/ month</span>
              </p>
            </div>
            <Provenance items={['Via app store']} />
          </div>
          <p className="text-[12px] leading-4 text-paper-100/65">
            Storefront price shown. Eligibility and the final amount are confirmed before purchase.
          </p>
          <p className="text-center text-[12px] leading-4 text-paper-100/65">
            Cancel anytime. Manage or cancel from your account settings.
          </p>
        </section>

        <div className="grid gap-1 pt-1">
          <BtnGhost quiet className="w-full" onClick={() => setStatus('Plan comparison opened in this prototype.')}>Compare all plans</BtnGhost>
          <BtnGhost quiet className="w-full" onClick={closeUpgrade}>Maybe later</BtnGhost>
        </div>

        {status && (
          <p className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-[12px] leading-4 text-paper-100/75" role="status">
            {status}
          </p>
        )}

        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <Chip tone="muted">Category · billing</Chip>
            <Chip tone="muted">Scope · this device</Chip>
          </div>
          <ConsentRail compact controls={FULL_DATA_CONTROLS} />
        </div>
      </main>
    </HifiShell>
  )
}
