'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, Check, CreditCard, FileText, RefreshCw, ShieldAlert, Sparkles, WifiOff, X } from 'lucide-react'
import {
  BtnDestructive,
  BtnPrimary,
  BtnSecondary,
  ChargeMeter,
  ComplianceFooter,
  GlassCard,
  HifiShell,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

const BILLING_STATES = [
  'default',
  'skeleton',
  'empty',
  'error',
  'offline',
  'success',
  'disabled',
  'payment-final-day',
  'payment-post-grace',
] as const

const BILLING_PANELS = ['closed', 'compare', 'cancel', 'update', 'credits'] as const
const BILLING_CONTROLS = ['Category', 'Source', 'Scope', 'Freshness', 'Retention', 'Export', 'Revoke', 'Delete'] as const

type BillingState = (typeof BILLING_STATES)[number]
type BillingPanel = (typeof BILLING_PANELS)[number]
type CreditsView = 'balance' | 'ledger' | 'history'

const BILLING_STATE_STATUS: Record<BillingState, string> = {
  default: 'Billing values are bundled visual fixtures. No live billing service is connected.',
  skeleton: 'Loading the bundled billing preview. No payment or network request is running.',
  empty: 'No paid plan, metered usage, credits, payment method, or billing history is available in this honest-null fixture.',
  error: 'The bundled billing fixture failed to load. No billing service was contacted.',
  offline: 'Offline preview. Cached billing values remain visible; no transaction can be attempted.',
  success: 'Billing preview completed locally. No purchase, payment, entitlement, credit, or cancellation changed.',
  disabled: 'Billing transactions are disabled in this fixture. Data controls and legal exits remain available.',
  'payment-final-day': 'Payment grace ends today in this bundled fixture. No charge or suspension occurred.',
  'payment-post-grace': 'Post-grace access is paused only in this visual fixture. No account changed.',
}

const plans = [
  { name: 'Free', price: '$0', note: 'Essentials' },
  { name: 'Plus', price: '$25', note: 'More coaching' },
  { name: 'Pro', price: '$60', note: 'Advanced coaching' },
  { name: 'Max', price: '$120', note: 'Unlimited messages' },
] as const

const featureRows = [
  { feature: 'CIA coaching', Free: true, Plus: true, Pro: true, Max: true },
  { feature: 'Voice calls', Free: false, Plus: false, Pro: true, Max: true },
  { feature: 'Mission builder', Free: true, Plus: true, Pro: true, Max: true },
  { feature: 'Unlimited journals', Free: false, Plus: true, Pro: true, Max: true },
] as const

function isBillingState(value: string | null): value is BillingState {
  return BILLING_STATES.includes(value as BillingState)
}

function isBillingPanel(value: string | null): value is BillingPanel {
  return BILLING_PANELS.includes(value as BillingPanel)
}

function SourceStrip({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2" aria-label={items.join('. ')}>
      {items.map(item => (
        <span key={item} className="inline-flex min-h-8 items-center rounded-pill border border-white/10 bg-white/[0.04] px-3 text-[12px] leading-4 text-paper-100/70">
          {item}
        </span>
      ))}
    </div>
  )
}

function SkeletonBilling() {
  return (
    <div className="space-y-4" aria-label="Loading billing preview">
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">Loading the bundled billing preview. No payment or network request is running.</p>
      <div className="skeleton-block h-16 rounded-2xl" />
      <div className="skeleton-block h-64 rounded-xl" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, index) => <div key={index} className="skeleton-block h-28 rounded-xl" />)}
      </div>
      <div className="skeleton-block h-72 rounded-xl" />
    </div>
  )
}

function BillingOverlay({
  panel,
  selectedPlan,
  creditsView,
  onClose,
  onConfirm,
}: {
  panel: Exclude<BillingPanel, 'closed'>
  selectedPlan: string
  creditsView: CreditsView
  onClose: () => void
  onConfirm: (message: string) => void
}) {
  const dialogRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLButtonElement>('[data-safe-exit]')?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key !== 'Tab') return
    const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), [href], input:not(:disabled)') ?? [])]
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const title = panel === 'cancel'
    ? 'Preview cancellation'
    : panel === 'update'
      ? 'Update payment preview'
      : panel === 'compare'
        ? `Compare ${selectedPlan}`
        : creditsView === 'history'
          ? 'Billing history'
          : creditsView === 'ledger'
            ? 'Credits ledger'
            : 'Credits balance'

  return (
    <div className="absolute inset-0 z-[70] flex items-end bg-ink-900/85 px-3 pb-[76px]" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
      <section
        ref={dialogRef}
        role={panel === 'cancel' ? 'alertdialog' : 'dialog'}
        aria-modal="true"
        aria-labelledby="billing-overlay-title"
        aria-describedby="billing-overlay-description"
        className="action-sheet-surface glass-card relative isolate w-full p-5 shadow-3"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-paper-100/65">Billing preview</p>
            <h2 id="billing-overlay-title" className="mt-1 text-[19px] font-semibold text-paper-100">{title}</h2>
          </div>
          <button type="button" className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper-100/70" aria-label={`Close ${title.toLowerCase()}`} onClick={onClose}>
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <div id="billing-overlay-description" className="mt-4 space-y-3 text-[13px] leading-5 text-paper-100/75">
          {panel === 'cancel' && (
            <>
              <p>This preview keeps cancellation reachable without urgency. Your Pro fixture remains active through Jun 15, 2026.</p>
              <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3">No subscription, renewal, payment, or account state will change.</p>
            </>
          )}
          {panel === 'update' && (
            <>
              <p>Review the payment-method handoff for Visa ending 4242.</p>
              <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3">This visual prototype cannot open a payment sheet, charge a card, or store payment details.</p>
            </>
          )}
          {panel === 'compare' && (
            <>
              <p>{selectedPlan} is selected for comparison. The table behind this sheet remains the bundled tier-matrix fixture.</p>
              <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3">Previewing a plan does not purchase, downgrade, upgrade, or change entitlement.</p>
            </>
          )}
          {panel === 'credits' && (
            <>
              <p>{creditsView === 'history' ? 'One bundled charge row is available for review.' : creditsView === 'ledger' ? 'The bundled ledger shows grants and local usage fixtures.' : 'The bundled balance is 420 credits.'}</p>
              <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3">No credits will be bought, exported, downloaded, or changed.</p>
              {creditsView === 'history' ? (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3" role="group" aria-label="Bundled billing history row">
                  <div className="flex items-start justify-between gap-3">
                    <div><p className="font-medium text-paper-100">Pro monthly renewal</p><p className="mt-1 text-[12px] text-paper-100/70">Visa ending 4242 · Jun 15, 2026 · bundled charge fixture</p></div>
                    <p className="font-semibold tabular-nums text-paper-100">$60.00</p>
                  </div>
                  <button type="button" className="focus-ring mt-3 min-h-11 rounded-pill border border-white/15 px-4 text-[12px] font-semibold text-paper-100" onClick={() => onConfirm('Receipt-detail preview complete. No receipt was downloaded or billing record changed.')}>Preview receipt details</button>
                </div>
              ) : creditsView === 'ledger' ? (
                <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/[0.03]" aria-label="Bundled credits ledger rows">
                  <div className="flex min-h-12 items-center justify-between px-3"><span>Monthly grant · Aug 2026 expiry</span><span className="font-semibold text-forest-green">+500</span></div>
                  <div className="flex min-h-12 items-center justify-between px-3"><span>CIA synthesis · current cycle</span><span className="font-semibold text-brand-orange">−12</span></div>
                </div>
              ) : (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3"><p className="text-[12px] uppercase tracking-wide text-paper-100/70">Available balance</p><p className="mt-1 text-[24px] font-semibold tabular-nums text-paper-100">420 credits</p><p className="mt-1 text-[12px] text-paper-100/70">Source: bundled credits ledger · current cycle</p></div>
              )}
            </>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <BtnSecondary data-safe-exit className="!h-[52px] w-full px-2" onClick={onClose}>
            {panel === 'cancel' ? 'Keep plan' : 'Not now'}
          </BtnSecondary>
          {panel === 'cancel' ? (
            <BtnDestructive className="w-full px-2" onClick={() => onConfirm('Cancellation preview complete. No subscription was cancelled.')}>Preview cancel</BtnDestructive>
          ) : (
            <BtnPrimary
              className="w-full px-2"
              onClick={() => onConfirm(
                panel === 'update'
                  ? 'Payment update preview complete. No payment method changed.'
                  : panel === 'compare'
                    ? `${selectedPlan} plan preview complete. No purchase or entitlement change occurred.`
                    : 'Credits preview complete. No credits or billing records changed.',
              )}
            >
              Preview only
            </BtnPrimary>
          )}
        </div>
      </section>
    </div>
  )
}

export function S23SubscriptionBilling() {
  const [billingState, setBillingState] = useState<BillingState>('default')
  const [panel, setPanel] = useState<BillingPanel>('closed')
  const [selectedPlan, setSelectedPlan] = useState('Pro')
  const [creditsView, setCreditsView] = useState<CreditsView>('balance')
  const [status, setStatus] = useState(BILLING_STATE_STATUS.default)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedState = params.get('state')
    const requestedPanel = params.get('panel')
    const requestedPlan = params.get('plan')
    const requestedCreditsView = params.get('credits')
    const frame = window.requestAnimationFrame(() => {
      if (isBillingState(requestedState)) {
        setBillingState(requestedState)
        setStatus(BILLING_STATE_STATUS[requestedState])
      }
      if (isBillingPanel(requestedPanel)) setPanel(requestedPanel)
      if (plans.some(plan => plan.name === requestedPlan)) setSelectedPlan(requestedPlan ?? 'Pro')
      if (requestedCreditsView === 'ledger' || requestedCreditsView === 'history' || requestedCreditsView === 'balance') setCreditsView(requestedCreditsView)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const openPanel = (nextPanel: Exclude<BillingPanel, 'closed'>, options?: { plan?: string; credits?: CreditsView }) => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    if (options?.plan) setSelectedPlan(options.plan)
    if (options?.credits) setCreditsView(options.credits)
    setPanel(nextPanel)
  }

  const closePanel = () => {
    setPanel('closed')
    window.requestAnimationFrame(() => returnFocusRef.current?.focus())
  }

  const completePanel = (message: string) => {
    setStatus(message)
    setBillingState('success')
    closePanel()
  }

  const isOffline = billingState === 'offline'
  const isDisabled = billingState === 'disabled'
  const isEmpty = billingState === 'empty'
  const transactionsDisabled = isOffline || isDisabled || billingState === 'error' || billingState === 'skeleton'
  const planManagementDisabled = transactionsDisabled || isEmpty
  const freshness = isOffline ? 'Freshness: cached fixture' : 'Freshness: bundled 11 Jul 2026'
  const currentPlan = isEmpty ? 'Free' : billingState === 'error' ? null : 'Pro'
  const overlay = panel === 'closed' ? undefined : (
    <BillingOverlay
      key={`${panel}-${selectedPlan}-${creditsView}`}
      panel={panel}
      selectedPlan={selectedPlan}
      creditsView={creditsView}
      onClose={closePanel}
      onConfirm={completePanel}
    />
  )

  const warningCopy = billingState === 'payment-final-day'
    ? ['Payment grace ends today', 'Bundled final-day fixture · no charge or suspension occurred.']
    : billingState === 'payment-post-grace'
      ? ['Payment grace preview ended', 'Plan access is paused only in this visual fixture. No account changed.']
      : ['Payment failed — 3 days to update', 'Bundled grace fixture · no charge attempt occurred.']

  return (
    <div className="contents [&_nav_span]:!text-[12px]">
    <HifiShell
      header={<TopBar title="Subscription & billing" back />}
      activeTab="me"
      overlay={overlay}
    >
      <main
        className="space-y-5 px-4 pb-6 pt-3"
        data-billing-state={billingState}
        data-usage-used="800"
        data-usage-limit="1000"
        data-billing-panel={panel}
        aria-busy={billingState === 'skeleton' || undefined}
      >
        {billingState === 'skeleton' ? (
          <SkeletonBilling />
        ) : (
          <>
            {isOffline && (
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-surface-2 px-4 py-3 text-[13px] leading-5 text-paper-100/75">
                <WifiOff aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-paper-100/65" />
                <p>Offline · cached plan and credits remain visible. Purchase and payment previews are disabled.</p>
              </div>
            )}

            {billingState === 'success' && (
              <div className="flex items-start gap-3 rounded-2xl border border-forest-green/30 bg-forest-green/10 px-4 py-3 text-[13px] leading-5 text-paper-100" role="status">
                <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-forest-green" />
                <p>Preview complete. No purchase, payment update, plan change, or cancellation occurred.</p>
              </div>
            )}

            {transactionsDisabled && (
              <div id="billing-disabled-reason" className="rounded-2xl border border-white/10 bg-surface-2 px-4 py-3 text-[13px] leading-5 text-paper-100/75">
                {isOffline
                  ? 'Billing transaction previews are unavailable offline. Cached values, data controls, and legal exits remain available.'
                  : billingState === 'error'
                    ? 'Billing transaction previews are unavailable while the bundled fixture is in error. Retry and legal exits remain available.'
                    : 'Billing transactions are disabled in this fixture. Data controls and legal exits remain available.'}
              </div>
            )}

            {!isEmpty && billingState !== 'error' && (
              <div className="flex min-h-14 items-center gap-3 rounded-2xl border border-brand-orange/40 bg-brand-orange/10 px-4 py-3 shadow-[var(--glow-orange-sm)]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
                  <ShieldAlert aria-hidden="true" size={19} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold leading-5 text-paper-100">{warningCopy[0]}</p>
                  <p className="mt-1 text-[12px] leading-4 text-paper-100/70">{warningCopy[1]}</p>
                </div>
                <button
                  type="button"
                  disabled={transactionsDisabled}
                  aria-describedby={transactionsDisabled ? 'billing-disabled-reason' : undefined}
                  className="focus-ring flex min-h-11 shrink-0 items-center rounded-pill bg-cta-ember px-4 text-[12px] font-semibold text-paper-100 disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={() => openPanel('update')}
                >
                  Update
                </button>
              </div>
            )}

            {billingState === 'error' ? (
              <SolidCard className="py-7 text-center">
                <AlertTriangle aria-hidden="true" className="mx-auto h-7 w-7 text-brand-orange" />
                <h2 className="mt-3 text-[17px] font-semibold text-paper-100">Billing preview unavailable</h2>
                <p className="mt-2 text-[13px] leading-5 text-paper-100/70">The bundled plan fixture did not load. No billing service was contacted.</p>
                <button
                  type="button"
                  className="focus-ring mt-4 inline-flex min-h-11 items-center gap-2 rounded-pill px-4 text-[13px] font-semibold text-brand-orange"
                  onClick={() => { setBillingState('default'); setStatus('Retry restored the bundled billing fixture. No network request occurred.') }}
                >
                  <RefreshCw aria-hidden="true" className="h-4 w-4" />Retry preview
                </button>
              </SolidCard>
            ) : isEmpty ? (
              <GlassCard tone="muted">
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-paper-100/65">Current plan</p>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <div><h2 className="text-[26px] font-semibold text-paper-100">Free</h2><p className="text-[13px] text-paper-100/70">$0 per month</p></div>
                  <span className="rounded-pill border border-white/10 px-3 py-2 text-[12px] text-paper-100/70">Current</span>
                </div>
                <p className="mt-4 text-[13px] leading-5 text-paper-100/70">No metered usage, credits, payment method, or charges are available for this honest-null fixture.</p>
                <div className="mt-4"><SourceStrip items={['Source: bundled plan fixture', freshness, 'Billing history: no charges yet']} /></div>
              </GlassCard>
            ) : (
              <GlassCard tone="you">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-[24px] font-semibold tracking-tight text-paper-100">Pro</h2>
                      <span className="rounded-pill border border-brand-orange/35 bg-brand-orange/10 px-3 py-1.5 text-[12px] font-semibold text-brand-orange">Current</span>
                    </div>
                    <p className="mt-1 text-[13px] text-paper-100/75"><span className="text-[24px] font-semibold tabular-nums text-paper-100">$60</span> per month</p>
                    <p id="billing-renewal" className="mt-1 text-[13px] text-paper-100/70">Renews Jun 15, 2026.</p>
                  </div>
                  <Sparkles aria-hidden="true" size={22} className="text-brand-orange" />
                </div>
                <div className="mt-4"><SourceStrip items={['Source: subscription API fixture', freshness, 'Scope: plan and renewal']} /></div>

                <div className="mt-5 border-t border-white/[0.08] pt-4">
                  <div className="mb-2 flex items-end justify-between gap-3">
                    <p className="text-[12px] font-semibold uppercase tracking-wide text-paper-100/65">CIA message use</p>
                    <p className="text-[13px] tabular-nums text-paper-100/80">800 of 1,000</p>
                  </div>
                  <ChargeMeter filled={8} ticks={10} label="800 of 1,000 used" />
                  <div className="mt-3"><SourceStrip items={['Source: usage API fixture', freshness, 'Cycle: current']} /></div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <div>
                    <p className="text-[12px] uppercase tracking-wide text-paper-100/65">Credits balance</p>
                    <p className="text-[24px] font-semibold tabular-nums text-paper-100">420</p>
                    <p className="text-[12px] text-paper-100/65">Source: credits ledger fixture</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      aria-label="Preview credits balance"
                      disabled={transactionsDisabled}
                      aria-describedby={transactionsDisabled ? 'billing-disabled-reason' : undefined}
                      className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-paper-100/80 disabled:cursor-not-allowed disabled:opacity-40"
                      onClick={() => openPanel('credits', { credits: 'balance' })}
                    >
                      <CreditCard aria-hidden="true" size={17} />
                    </button>
                    <button
                      type="button"
                      aria-label="Open credits ledger"
                      className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-paper-100/80"
                      onClick={() => openPanel('credits', { credits: 'ledger' })}
                    >
                      <FileText aria-hidden="true" size={17} />
                    </button>
                  </div>
                </div>
              </GlassCard>
            )}

            <section aria-labelledby="billing-plans-title">
              <div className="flex min-h-11 items-center justify-between gap-3 px-1">
                <h2 id="billing-plans-title" className="text-[12px] font-semibold uppercase tracking-[0.08em] text-paper-100/70">Plans</h2>
                <span className="text-[12px] text-paper-100/65">Choose to compare</span>
              </div>
              <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 hide-scrollbar">
                {plans.map(plan => {
                  const isCurrent = plan.name === currentPlan
                  return (
                    <button
                      key={plan.name}
                      type="button"
                      aria-current={isCurrent ? 'true' : undefined}
                      aria-label={`${plan.name}, ${plan.price} per month, ${isCurrent ? 'current plan' : 'compare plan'}`}
                      disabled={transactionsDisabled}
                      aria-describedby={transactionsDisabled ? 'billing-disabled-reason' : undefined}
                      className={`focus-ring min-h-[120px] min-w-[118px] rounded-xl border p-4 text-left disabled:cursor-not-allowed disabled:opacity-40 ${isCurrent ? 'border-brand-orange/40 bg-brand-orange/10' : 'border-white/10 bg-surface-2'}`}
                      onClick={() => openPanel('compare', { plan: plan.name })}
                    >
                      <span className="flex items-center justify-between gap-2"><span className="text-[14px] font-semibold text-paper-100">{plan.name}</span>{isCurrent && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-orange" />}</span>
                      <span className="mt-2 block text-[20px] font-semibold tabular-nums text-paper-100">{plan.price}</span>
                      <span className="mt-1 block text-[12px] text-paper-100/65">{isCurrent ? 'Current · compare' : plan.note}</span>
                    </button>
                  )
                })}
              </div>
            </section>

            <section aria-labelledby="billing-compare-title">
              <div className="flex min-h-11 items-center justify-between gap-3 px-1">
                <h2 id="billing-compare-title" className="text-[12px] font-semibold uppercase tracking-[0.08em] text-paper-100/70">Compare plans</h2>
                <span className="text-[12px] text-paper-100/65">Bundled matrix</span>
              </div>
              <SolidCard className="overflow-x-auto p-0">
                <table className="min-w-[650px] border-collapse text-left" aria-label="Plan feature comparison">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th scope="col" className="px-4 py-3 text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">Feature</th>
                      {plans.map(plan => <th key={plan.name} scope="col" className="px-3 py-3 text-center text-[12px] font-semibold text-paper-100">{plan.name}{plan.name === currentPlan ? <span className="block text-brand-orange">Current</span> : null}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {featureRows.map((row, index) => (
                      <tr key={row.feature} className={index % 2 === 0 ? 'bg-white/[0.02]' : undefined}>
                        <th scope="row" className="px-4 py-3 text-[13px] font-medium text-paper-100/85">{row.feature}</th>
                        {plans.map(plan => {
                          const included = row[plan.name]
                          return (
                            <td key={plan.name} className="px-3 py-3 text-center text-[12px] text-paper-100/75">
                              <span className="inline-flex items-center gap-1.5">{included ? <Check aria-hidden="true" className="h-4 w-4 text-forest-green" /> : <X aria-hidden="true" className="h-4 w-4 text-paper-100/50" />}{included ? 'Included' : 'Not included'}</span>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="border-t border-white/10 p-4"><SourceStrip items={['Source: tier matrix fixture', freshness, 'Scope: four plans']} /></div>
              </SolidCard>
            </section>

            {!isEmpty && billingState !== 'error' && (
              <section aria-labelledby="credits-ledger-title">
                <div className="flex min-h-11 items-center justify-between gap-3 px-1"><h2 id="credits-ledger-title" className="text-[12px] font-semibold uppercase tracking-[0.08em] text-paper-100/70">Credits ledger</h2><span className="text-[12px] text-paper-100/65">Grants and use</span></div>
                <SolidCard className="divide-y divide-white/5 p-0">
                  {[
                    ['Monthly grant', 'Expires Aug 1, 2026 · credits fixture', '+500', 'text-forest-green'],
                    ['Voice call', 'Usage fixture · current cycle', '-80', 'text-brand-orange'],
                    ['CIA synthesis query', 'Usage fixture · current cycle', '-12', 'text-brand-orange'],
                  ].map(([label, meta, amount, tone]) => (
                    <div key={label} className="flex min-h-14 items-center justify-between gap-3 px-4 py-3">
                      <div><p className="text-[13px] text-paper-100/90">{label}</p><p className="mt-0.5 text-[12px] text-paper-100/65">{meta}</p></div>
                      <p className={`text-[14px] font-semibold tabular-nums ${tone}`}>{amount}</p>
                    </div>
                  ))}
                </SolidCard>
              </section>
            )}

            {!isEmpty && billingState !== 'error' && (
              <section aria-labelledby="billing-method-title">
                <div className="flex min-h-11 items-center px-1"><h2 id="billing-method-title" className="text-[12px] font-semibold uppercase tracking-[0.08em] text-paper-100/70">Billing</h2></div>
                <SolidCard className="divide-y divide-white/5 p-0">
                  <button type="button" disabled={transactionsDisabled} aria-describedby={transactionsDisabled ? 'billing-disabled-reason' : undefined} className="focus-ring flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left disabled:cursor-not-allowed disabled:opacity-40" onClick={() => openPanel('update')}>
                    <span className="flex items-center gap-3"><span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.04]"><CreditCard size={17} className="text-paper-100/70" /></span><span><span className="block text-[13px] text-paper-100/90">Visa ending 4242</span><span className="mt-0.5 block text-[12px] text-paper-100/65">Source: payment fixture · default method</span></span></span><span className="text-[12px] text-paper-100/70">Review</span>
                  </button>
                  <button type="button" className="focus-ring flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left" onClick={() => openPanel('credits', { credits: 'history' })}>
                    <span className="flex items-center gap-3"><FileText aria-hidden="true" size={17} className="text-paper-100/65" /><span><span className="block text-[13px] text-paper-100/90">Billing history</span><span className="mt-0.5 block text-[12px] text-paper-100/65">One bundled charge · no receipt download</span></span></span><span className="text-[12px] text-paper-100/70">Review</span>
                  </button>
                </SolidCard>
              </section>
            )}

            <section aria-labelledby="billing-data-controls-title">
              <div className="flex min-h-11 items-center px-1"><h2 id="billing-data-controls-title" className="text-[12px] font-semibold uppercase tracking-[0.08em] text-paper-100/70">Billing data controls</h2></div>
              <div className="grid grid-cols-2 gap-2" role="group" aria-label="Billing data controls">
                {BILLING_CONTROLS.map(control => (
                  <button
                    key={control}
                    type="button"
                    className="focus-ring min-h-11 rounded-pill border border-white/10 bg-white/[0.03] px-3 text-[12px] font-medium text-paper-100/75"
                    onClick={() => setStatus(`${control} billing control selected for this local preview. No data was exported, revoked, or deleted.`)}
                  >
                    {control}
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-3" aria-label="Plan controls">
              {isEmpty && <p id="billing-empty-subscription-reason" className="text-[12px] leading-5 text-paper-100/70">No paid subscription is active, so downgrade and cancellation are unavailable. Plan comparison remains available.</p>}
              <BtnSecondary disabled={planManagementDisabled} aria-describedby={planManagementDisabled ? isEmpty ? 'billing-empty-subscription-reason' : 'billing-disabled-reason' : undefined} className="w-full" onClick={() => openPanel('compare', { plan: 'Plus' })}>Downgrade plan</BtnSecondary>
              <button type="button" disabled={planManagementDisabled} aria-describedby={planManagementDisabled ? isEmpty ? 'billing-empty-subscription-reason' : 'billing-disabled-reason' : undefined} className="focus-ring mx-auto flex min-h-11 items-center rounded-pill px-4 text-[13px] font-medium text-paper-100/70 underline decoration-white/30 underline-offset-4 disabled:cursor-not-allowed disabled:opacity-40" onClick={() => openPanel('cancel')}>Cancel subscription</button>
            </section>

            <p id="billing-live-status" className="min-h-5 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">{status}</p>
            <ComplianceFooter />
          </>
        )}
      </main>
    </HifiShell>
    </div>
  )
}
