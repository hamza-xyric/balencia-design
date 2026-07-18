'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Check, ChevronLeft, Phone, ShieldCheck } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassCard,
  HifiShell,
} from '@/components/hifi/kit'

type EnrollmentPhase = 'phone' | 'verify'

// Provider-neutral enrollment preview. It deliberately cannot send or verify
// a real message: local interaction demonstrates the two phases while the
// status copy keeps provider availability and data transmission explicit.
export function S03eWhatsappEnrollment() {
  const [phase, setPhase] = useState<EnrollmentPhase>('phone')
  const [optedIn, setOptedIn] = useState(false)
  const [countryCode, setCountryCode] = useState('+1')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [status, setStatus] = useState('Choose whether to preview this optional channel. No phone number is collected before opt-in.')
  const otpRefs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    const fixturePhase = new URLSearchParams(window.location.search).get('phase')
    if (fixturePhase !== 'verify') return

    const fixtureTimer = window.setTimeout(() => {
      setOptedIn(true)
      setPhone('202 555 0143')
      setPhase('verify')
      setStatus('Preview only. No code was sent because a messaging provider is unavailable in this visual prototype.')
    }, 0)
    return () => window.clearTimeout(fixtureTimer)
  }, [])

  useEffect(() => {
    if (phase === 'verify') otpRefs.current[0]?.focus()
  }, [phase])

  const phoneIsValid = useMemo(() => phone.replace(/\D/g, '').length >= 10, [phone])
  const phoneIsInvalid = optedIn && phone.length > 0 && !phoneIsValid
  const codeIsComplete = otp.every(digit => digit.length === 1)

  const updateOtp = (index: number, rawValue: string) => {
    const digit = rawValue.replace(/\D/g, '').slice(-1)
    setOtp(current => current.map((value, itemIndex) => itemIndex === index ? digit : value))
    setStatus('No code was sent. Entering digits only demonstrates the verification controls.')
    if (digit && index < otpRefs.current.length - 1) otpRefs.current[index + 1]?.focus()
  }

  const pasteOtp = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const digits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('')
    if (!digits.length) return
    event.preventDefault()
    setOtp(Array.from({ length: 6 }, (_, index) => digits[index] ?? ''))
    otpRefs.current[Math.min(digits.length, 6) - 1]?.focus()
    setStatus('Pasted into the local preview. No verification request was made.')
  }

  const handleOtpKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      event.preventDefault()
      const focusIndex = otp[index] || index === 0 ? index : index - 1
      setOtp(current => current.map((value, itemIndex) => itemIndex === focusIndex ? '' : value))
      otpRefs.current[focusIndex]?.focus()
      setStatus('Edited in the local preview. No verification request was made.')
      return
    }
    if (event.key === 'ArrowLeft' && index > 0) otpRefs.current[index - 1]?.focus()
    if (event.key === 'ArrowRight' && index < 5) otpRefs.current[index + 1]?.focus()
  }

  const submitPreview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (phase === 'phone') {
      if (!optedIn || !phoneIsValid) return
      setPhase('verify')
      setStatus('Preview only. No code was sent because a messaging provider is unavailable in this visual prototype.')
      return
    }

    if (codeIsComplete) {
      setStatus('Verification is unavailable in this visual prototype. No code or phone number was sent.')
    }
  }

  const leaveOptIn = (checked: boolean) => {
    setOptedIn(checked)
    setStatus(checked
      ? 'Optional channel preview enabled. Your phone remains local to this screen.'
      : 'Channel preview off. The local phone field was cleared.')
    if (!checked) {
      setPhone('')
      setOtp(['', '', '', '', '', ''])
      setPhase('phone')
    }
  }

  return (
    <HifiShell
      atmosphere="cia"
      showTabBar={false}
      header={
        <div className="flex h-11 items-center justify-end px-4 pt-2">
          <Link
            href="/screens/07"
            className="focus-ring inline-flex min-h-11 items-center rounded-pill px-3 text-[13px] font-semibold text-paper-100/75"
          >
            Skip for now
          </Link>
        </div>
      }
      bottomAction={
        phase === 'phone' ? (
          <BtnPrimary
            type="submit"
            form="message-channel-form"
            className="w-full"
            disabled={!optedIn || !phoneIsValid}
          >
            Continue to code preview
          </BtnPrimary>
        ) : (
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <BtnGhost
              aria-label="Back to phone number"
              onClick={() => {
                setPhase('phone')
                setStatus('Back at phone entry. No code was sent.')
              }}
            >
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              Back
            </BtnGhost>
            <BtnPrimary
              type="submit"
              form="message-channel-form"
              className="w-full"
              disabled={!codeIsComplete}
            >
              Verify preview
            </BtnPrimary>
          </div>
        )
      }
    >
      <main className="flex flex-col px-5 pb-6">
        <div className="flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/Frame 2147239943.svg" alt="Balencia" className="h-auto w-[128px]" />
        </div>

        <section className="space-y-2 pb-5 pt-4 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-orange">Optional channel</p>
          <h1 className="text-[27px] font-semibold leading-tight tracking-[-0.02em] text-paper-100">
            Get CIA in <span className="text-emphasis">messages</span>
          </h1>
          <p className="text-[14px] leading-snug text-paper-100/70">Preview private reminders and check-ins in chat.</p>
        </section>

        <form id="message-channel-form" className="space-y-4" data-enrollment-phase={phase} onSubmit={submitPreview}>
          <GlassCard tone="muted" className="!p-4">
            <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg focus-within:shadow-[var(--focus-ring)]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  checked={optedIn}
                  onChange={(event) => leaveOptIn(event.currentTarget.checked)}
                  className="h-5 w-5 accent-brand-orange"
                  aria-describedby="channel-opt-in-detail"
                />
              </span>
              <span className="pt-2">
                <span className="block text-[14px] font-semibold text-paper-100">Enable the optional message channel</span>
                <span id="channel-opt-in-detail" className="mt-1 block text-[12px] leading-5 text-paper-100/70">
                  Explicit opt-in is required before phone entry. This preview does not connect to a provider.
                </span>
              </span>
            </label>
            <div className="mt-3 border-t border-white/10 pt-3">
              <ConsentRail compact controls={FULL_DATA_CONTROLS} />
            </div>
          </GlassCard>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4" aria-labelledby="channel-phase-title">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-orange">Channel setup</p>
                <h2 id="channel-phase-title" className="mt-1 text-[16px] font-semibold text-paper-100">
                  {phase === 'phone' ? 'Phase 1 of 2: phone' : 'Phase 2 of 2: code preview'}
                </h2>
                <p className="mt-1 text-[11px] leading-4 text-paper-100/70">
                  {phase === 'phone'
                    ? optedIn ? 'Local entry only · nothing sent' : 'Locked until explicit opt-in'
                    : 'Preview only · provider unavailable · no code sent'}
                </p>
              </div>
              <span className="text-[12px] tabular-nums text-paper-100/70" aria-hidden="true">{phase === 'phone' ? '01 / 02' : '02 / 02'}</span>
            </div>
            <div className="mt-3 flex gap-2" aria-hidden="true">
              <span className="h-1.5 flex-1 rounded-pill bg-brand-orange" />
              <span className={`h-1.5 flex-1 rounded-pill ${phase === 'verify' ? 'bg-brand-orange' : 'bg-white/15'}`} />
            </div>

            {phase === 'phone' ? (
              <div className="mt-4 space-y-2">
                <label htmlFor="channel-phone" className="px-1 text-[12px] font-semibold text-paper-100/75">Phone number</label>
                <div className="flex gap-2">
                  <div className="glass-pill flex h-[52px] w-[86px] shrink-0 items-center px-3 focus-within:border-brand-orange focus-within:shadow-[var(--focus-ring)]">
                    <label htmlFor="channel-country-code" className="sr-only">Country code</label>
                    <select
                      id="channel-country-code"
                      value={countryCode}
                      disabled={!optedIn}
                      onChange={(event) => setCountryCode(event.currentTarget.value)}
                      className="h-11 w-full bg-transparent text-[16px] font-semibold text-paper-100 outline-none disabled:text-paper-100/55"
                    >
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+92">+92</option>
                      <option value="+971">+971</option>
                    </select>
                  </div>
                  <div className="glass-pill flex h-[52px] min-w-0 flex-1 items-center gap-2 px-3 focus-within:border-brand-orange focus-within:shadow-[var(--focus-ring)]">
                    <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-paper-100/65" strokeWidth={1.8} />
                    <input
                      id="channel-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={phone}
                      disabled={!optedIn}
                      onChange={(event) => {
                        const nextPhone = event.currentTarget.value
                        const digitCount = nextPhone.replace(/\D/g, '').length
                        setPhone(nextPhone)
                        setStatus(!nextPhone
                          ? 'No phone number entered yet.'
                          : digitCount < 10
                            ? 'Enter at least 10 digits to continue. This value was not sent.'
                            : 'Phone stays local to this screen. Continue only previews the next phase.')
                      }}
                      placeholder={optedIn ? '202 555 0143' : 'Opt in to enter a phone'}
                      className="h-11 min-w-0 flex-1 bg-transparent text-[16px] text-paper-100 outline-none placeholder:text-paper-100/55 disabled:text-paper-100/55"
                      aria-describedby="channel-phone-help"
                      aria-invalid={phoneIsInvalid || undefined}
                    />
                  </div>
                </div>
                <p id="channel-phone-help" className="px-1 text-[12px] leading-5 text-paper-100/70">
                  {!optedIn
                    ? 'Phone collection is locked until explicit opt-in.'
                    : !phone
                      ? 'No phone number entered yet.'
                      : phoneIsValid
                        ? `${countryCode} · You entered · not sent`
                        : 'Enter at least 10 digits to continue. This value was not sent.'}
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <div
                  className="grid grid-cols-6 gap-1.5"
                  role="group"
                  aria-label="Six-digit verification code"
                  onPaste={pasteOtp}
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(node) => { otpRefs.current[index] = node }}
                      type="text"
                      inputMode="numeric"
                      autoComplete={index === 0 ? 'one-time-code' : 'off'}
                      maxLength={1}
                      value={digit}
                      onChange={(event) => updateOtp(index, event.currentTarget.value)}
                      onKeyDown={(event) => handleOtpKeyDown(index, event)}
                      aria-label={`Verification digit ${index + 1} of 6`}
                      className="h-12 min-w-0 rounded-lg border border-white/15 bg-ink-900 text-center text-[18px] font-semibold tabular-nums text-paper-100 outline-none focus:border-brand-orange focus:shadow-[var(--focus-ring)]"
                    />
                  ))}
                </div>
                <div className="flex min-h-11 items-center justify-between gap-3 border-t border-white/10 pt-2">
                  <p className="text-[12px] leading-5 text-paper-100/70">Provider unavailable · no cooldown started</p>
                  <BtnGhost quiet disabled className="shrink-0">Resend unavailable</BtnGhost>
                </div>
              </div>
            )}
          </section>

          <div className="rounded-2xl border border-white/10 bg-surface-2 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-forest-green" strokeWidth={1.9} />
              <div>
                <h2 className="text-[14px] font-semibold text-paper-100">Easy to stop and remove</h2>
                <p className="mt-1 text-[12px] leading-5 text-paper-100/70">
                  Reply STOP where supported. You can also revoke the channel or delete your number from data controls.
                </p>
              </div>
            </div>
            <ul className="mt-3 grid grid-cols-3 gap-2" aria-label="Optional channel benefits">
              {['Reminders', 'Check-ins', 'CIA tips'].map(item => (
                <li key={item} className="flex min-h-11 items-center gap-1.5 rounded-lg border border-white/10 px-2 text-[11px] font-semibold text-paper-100/75">
                  <Check aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-brand-orange" strokeWidth={2.2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="min-h-10 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] leading-5 text-paper-100/75" role="status" aria-live="polite">
            {status}
          </p>
        </form>
      </main>
    </HifiShell>
  )
}
