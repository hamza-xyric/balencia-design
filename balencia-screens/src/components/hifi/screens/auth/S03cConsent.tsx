'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronRight } from 'lucide-react'
import { BtnPrimary, GlassCard, HifiShell, SectionTitle, SolidCard, cx } from '@/components/hifi/kit'

type ConsentState = 'default' | 'loading' | 'success' | 'offline'

export function S03cConsent() {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [screenState, setScreenState] = useState<ConsentState>('default')
  const stateTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const acceptedCount = Number(termsAccepted) + Number(privacyAccepted)
  const ready = acceptedCount === 2
  const blocked = !ready || screenState === 'offline' || screenState === 'success'

  useEffect(() => {
    const applyFixture = () => {
      const fixture = window.location.hash.slice(1)
      if (fixture === 'partial') {
        setTermsAccepted(true)
        setPrivacyAccepted(false)
        setScreenState('default')
      } else if (fixture === 'ready') {
        setTermsAccepted(true)
        setPrivacyAccepted(true)
        setScreenState('default')
      } else if (fixture === 'loading') {
        setTermsAccepted(true)
        setPrivacyAccepted(true)
        setScreenState('loading')
      } else if (fixture === 'success') {
        setTermsAccepted(true)
        setPrivacyAccepted(true)
        setScreenState('success')
      } else if (fixture === 'offline') {
        setTermsAccepted(true)
        setPrivacyAccepted(true)
        setScreenState('offline')
      }
    }

    applyFixture()
    window.addEventListener('hashchange', applyFixture)
    return () => window.removeEventListener('hashchange', applyFixture)
  }, [])

  useEffect(() => () => {
    if (stateTimer.current) clearTimeout(stateTimer.current)
  }, [])

  const updateRequired = (kind: 'terms' | 'privacy', checked: boolean) => {
    if (kind === 'terms') setTermsAccepted(checked)
    else setPrivacyAccepted(checked)
    if (screenState === 'success') setScreenState('default')
  }

  const updateMarketing = (checked: boolean) => {
    setMarketing(checked)
    if (screenState === 'success') setScreenState('default')
  }

  const submitPrototype = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!ready || screenState === 'loading' || screenState === 'offline' || screenState === 'success') return
    if (stateTimer.current) clearTimeout(stateTimer.current)
    setScreenState('loading')
    stateTimer.current = setTimeout(() => {
      setScreenState('success')
      stateTimer.current = null
    }, 700)
  }

  return (
    <HifiShell
      showTabBar={false}
      bottomAction={
        <BtnPrimary
          type="submit"
          form="consent-form"
          className="w-full"
          disabled={blocked}
          loading={screenState === 'loading'}
          loadingLabel="Saving choices"
        >
          {screenState === 'success' ? 'Ready' : 'Continue'}
        </BtnPrimary>
      }
    >
      <main className="flex min-h-full flex-col items-center px-5 pb-4 pt-4 text-center" data-consent-state={screenState}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/Frame 2147239943.svg" alt="Balencia" className="h-auto w-[156px]" />

        <div className="mt-5 space-y-2">
          <h1 className="text-[31px] font-semibold leading-[1.08] tracking-[-0.02em] text-paper-100">
            Before we <span className="text-emphasis">begin</span>
          </h1>
          <p className="text-[15px] leading-snug text-paper-100/70">Review and accept our policies to continue.</p>
        </div>

        {screenState === 'offline' && (
          <div className="mt-4 w-full rounded-pill border border-brand-orange/30 bg-ink-brown-800 px-4 py-3 text-left" role="status">
            <p className="text-[12px] leading-4 text-paper-100">
              No connection right now. You can review your choices, but continuing needs you online.
            </p>
          </div>
        )}

        <form
          id="consent-form"
          className="mt-5 w-full space-y-4"
          data-consent-state={screenState}
          aria-busy={screenState === 'loading'}
          onSubmit={submitPrototype}
        >
          <div className="space-y-1 text-left">
            <SectionTitle title="Required" />
            <SolidCard className="py-1">
              <PolicyRow
                id="accept-terms"
                label="I accept the Terms of Service"
                documentLabel="Terms of Service"
                linkText="Terms"
                href="/legal/terms"
                checked={termsAccepted}
                disabled={screenState === 'loading'}
                onChange={checked => updateRequired('terms', checked)}
              />
              <div className="mx-1 h-px bg-white/[0.06]" />
              <PolicyRow
                id="accept-privacy"
                label="I accept the Privacy Policy"
                documentLabel="Privacy Policy"
                linkText="Privacy"
                href="/legal/privacy"
                checked={privacyAccepted}
                disabled={screenState === 'loading'}
                onChange={checked => updateRequired('privacy', checked)}
              />
            </SolidCard>
          </div>

          <div className="space-y-1 text-left">
            <SectionTitle title="Optional" />
            <GlassCard tone="muted" className="p-3">
              <label className="flex min-h-14 cursor-pointer items-center justify-between gap-3 rounded-lg px-1">
                <span className="text-[15px] leading-snug text-paper-100">Send me tips and updates</span>
                <span className="relative h-11 w-[52px] shrink-0">
                  <input
                    type="checkbox"
                    role="switch"
                    name="marketing-updates"
                    checked={marketing}
                    disabled={screenState === 'loading'}
                    aria-label="Send me tips and updates"
                    className="peer focus-ring absolute left-0 top-1.5 h-8 w-[52px] appearance-none rounded-pill border border-white/10 bg-white/10 checked:border-brand-orange checked:bg-cta-ember"
                    onChange={event => updateMarketing(event.target.checked)}
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-paper-50 transition-transform peer-checked:translate-x-5 motion-reduce:transition-none"
                  />
                </span>
              </label>
            </GlassCard>
          </div>
        </form>

        <p
          className={cx(
            'mt-5 text-[15px] font-medium tabular-nums',
            ready ? 'text-forest-green' : 'text-paper-100/70',
          )}
          aria-live="polite"
          aria-atomic="true"
        >
          {acceptedCount} of 2 {ready ? 'ready' : 'required'}
        </p>

        <div className="mt-3 min-h-10 w-full" aria-live="polite" aria-atomic="true">
          {screenState === 'loading' && (
            <p role="status" className="text-[12px] leading-4 text-paper-100/70">Saving your choices locally…</p>
          )}
          {screenState === 'success' && (
            <p role="status" className="rounded-lg border border-forest-green/35 bg-forest-green/10 px-3 py-2 text-[12px] leading-4 text-paper-100">
              Choices saved in this local prototype. No data was sent.
            </p>
          )}
        </div>
      </main>
    </HifiShell>
  )
}

function PolicyRow({
  id,
  label,
  documentLabel,
  linkText,
  href,
  checked,
  disabled,
  onChange,
}: {
  id: string
  label: string
  documentLabel: string
  linkText: string
  href: string
  checked: boolean
  disabled: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <div className="flex min-h-14 items-center gap-1">
      <label htmlFor={id} className="flex min-h-14 min-w-0 flex-1 cursor-pointer items-center gap-2">
        <span className="relative h-11 w-11 shrink-0">
          <input
            id={id}
            type="checkbox"
            name={id}
            checked={checked}
            disabled={disabled}
            aria-label={`Accept the ${documentLabel}`}
            className="peer focus-ring absolute left-2.5 top-2.5 h-6 w-6 appearance-none rounded-[6px] border border-white/20 bg-ink-900/50 checked:border-brand-orange checked:bg-cta-ember"
            onChange={event => onChange(event.target.checked)}
          />
          <Check
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-paper-100 opacity-0 peer-checked:opacity-100"
            strokeWidth={3}
          />
        </span>
        <span className="min-w-0 text-left text-[14px] leading-snug text-paper-100">{label}</span>
      </label>
      <a
        href={href}
        aria-label={`Read ${documentLabel}`}
        className="focus-ring flex min-h-11 shrink-0 items-center gap-1 rounded-pill px-2 text-[12px] font-medium text-brand-orange"
      >
        {linkText}
        <ChevronRight className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
      </a>
    </div>
  )
}
