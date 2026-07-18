'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { BtnGhost, BtnPrimary, ChargeMeter, HifiShell, cx } from '@/components/hifi/kit'

type OTPState = 'default' | 'loading' | 'invalid' | 'expired' | 'rate-limited' | 'resend-success' | 'offline' | 'success'

const EMPTY_CODE = ['', '', '', '']

export function S03bOtpVerification() {
  const [digits, setDigits] = useState<string[]>(EMPTY_CODE)
  const [screenState, setScreenState] = useState<OTPState>('default')
  const [cooldown, setCooldown] = useState(59)
  const [rateLimit, setRateLimit] = useState(299)
  const [notice, setNotice] = useState('')
  const inputs = useRef<Array<HTMLInputElement | null>>([])
  const stateTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const complete = digits.every(Boolean)
  const fieldsDisabled = screenState === 'loading' || screenState === 'rate-limited' || screenState === 'success'
  const resendDisabled = cooldown > 0 || screenState === 'loading' || screenState === 'rate-limited'
  const hasError = screenState === 'invalid' || screenState === 'expired'

  useEffect(() => {
    const applyFixture = () => {
      const fixture = window.location.hash.slice(1)
      setDigits(EMPTY_CODE)
      setCooldown(59)
      setRateLimit(299)
      setScreenState('default')
      setNotice('')
      if (fixture === 'partial') {
        setDigits(['2', '5', '', ''])
        setScreenState('default')
      } else if (fixture === 'loading') {
        setDigits(['2', '5', '8', '0'])
        setScreenState('loading')
      } else if (fixture === 'invalid') {
        setDigits(EMPTY_CODE)
        setScreenState('invalid')
      } else if (fixture === 'expired') {
        setDigits(EMPTY_CODE)
        setCooldown(0)
        setScreenState('expired')
      } else if (fixture === 'rate-limited') {
        setDigits(['2', '5', '8', '0'])
        setScreenState('rate-limited')
      } else if (fixture === 'rate-limit-expiring') {
        setDigits(['2', '5', '8', '0'])
        setRateLimit(2)
        setScreenState('rate-limited')
      } else if (fixture === 'resend-success') {
        setDigits(EMPTY_CODE)
        setCooldown(59)
        setScreenState('resend-success')
      } else if (fixture === 'offline') {
        setDigits(['2', '5', '8', '0'])
        setScreenState('offline')
      } else if (fixture === 'success') {
        setDigits(['2', '5', '8', '0'])
        setScreenState('success')
      }
    }

    applyFixture()
    window.addEventListener('hashchange', applyFixture)
    return () => window.removeEventListener('hashchange', applyFixture)
  }, [])

  useEffect(() => {
    if (cooldown <= 0 || screenState === 'rate-limited' || screenState === 'loading') return
    const timer = window.setInterval(() => setCooldown(value => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [cooldown, screenState])

  useEffect(() => {
    if (screenState !== 'rate-limited') return
    if (rateLimit <= 0) {
      const expiryTimer = window.setTimeout(() => {
        setCooldown(0)
        setNotice('Verification is available again. Your entered code is still here.')
        setScreenState('default')
      }, 0)
      return () => window.clearTimeout(expiryTimer)
    }
    const timer = window.setInterval(() => setRateLimit(value => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [rateLimit, screenState])

  useEffect(() => () => {
    if (stateTimer.current) clearTimeout(stateTimer.current)
  }, [])

  const updateDigits = (nextDigits: string[], focusIndex?: number) => {
    setDigits(nextDigits)
    setNotice('')
    if (screenState !== 'offline') setScreenState('default')
    if (focusIndex !== undefined) inputs.current[focusIndex]?.focus()
  }

  const handleChange = (index: number, value: string) => {
    const numeric = value.replace(/\D/g, '')
    if (numeric.length > 1) {
      const next = [...digits]
      numeric.slice(0, 4 - index).split('').forEach((digit, offset) => {
        next[index + offset] = digit
      })
      updateDigits(next, Math.min(index + numeric.length, 3))
      return
    }

    const next = [...digits]
    next[index] = numeric
    updateDigits(next, numeric && index < 3 ? index + 1 : index)
  }

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      event.preventDefault()
      const next = [...digits]
      if (next[index]) {
        next[index] = ''
        updateDigits(next, index)
      } else if (index > 0) {
        next[index - 1] = ''
        updateDigits(next, index - 1)
      }
      return
    }

    if (event.key === 'ArrowLeft' && index > 0) inputs.current[index - 1]?.focus()
    if (event.key === 'ArrowRight' && index < 3) inputs.current[index + 1]?.focus()
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    if (!pasted) return
    event.preventDefault()
    const next = [...EMPTY_CODE]
    pasted.split('').forEach((digit, index) => {
      next[index] = digit
    })
    updateDigits(next, Math.min(pasted.length, 4) - 1)
  }

  const submitPrototype = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!complete || fieldsDisabled) return
    if (screenState === 'offline') return
    if (stateTimer.current) clearTimeout(stateTimer.current)
    setScreenState('loading')
    stateTimer.current = setTimeout(() => {
      setScreenState('success')
      stateTimer.current = null
    }, 700)
  }

  const resendPrototype = () => {
    if (resendDisabled) return
    setCooldown(59)
    setScreenState('resend-success')
    inputs.current[0]?.focus()
  }

  const goBack = () => {
    if (window.history.length > 1) window.history.back()
    else window.location.assign('/screens/03')
  }

  const status = notice || getStatus(screenState, rateLimit)

  return (
    <HifiShell
      showTabBar={false}
      header={
        <div className="flex min-h-[58px] shrink-0 items-center px-2">
          <button
            type="button"
            aria-label="Back"
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/75"
            onClick={goBack}
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
          </button>
        </div>
      }
      bottomAction={
        <BtnPrimary
          type="submit"
          form="otp-verification-form"
          className="w-full"
          disabled={!complete || screenState === 'rate-limited' || screenState === 'success'}
          loading={screenState === 'loading'}
          loadingLabel="Verifying code"
        >
          {screenState === 'success' ? 'Verified' : 'Verify'}
        </BtnPrimary>
      }
    >
      <main className="flex min-h-full flex-col items-center px-6 pb-4 pt-1 text-center" data-otp-state={screenState}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/Frame 2147239943.svg" alt="Balencia" className="h-auto w-[160px]" />

        <div className="mt-7 space-y-2">
          <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-paper-100">
            Verify your <span className="text-emphasis">email</span>
          </h1>
          <p className="mx-auto max-w-[286px] text-[15px] leading-snug text-paper-100/70">
            We sent a 4-digit code to a***@email.com
          </p>
        </div>

        {screenState === 'rate-limited' && (
          <div className="mt-5 w-full rounded-pill border border-brand-orange/30 bg-ink-brown-800 px-4 py-3 text-left">
            <p className="text-[13px] font-medium text-paper-100">Too many attempts</p>
            <p className="mt-0.5 text-[12px] leading-4 text-paper-100/70">Try again in {formatTime(rateLimit)}. Your account details stay private.</p>
          </div>
        )}

        <form id="otp-verification-form" className="mt-8 w-full" aria-describedby="otp-status" aria-busy={screenState === 'loading'} onSubmit={submitPrototype}>
          <fieldset disabled={fieldsDisabled} className="border-0 p-0">
            <legend className="sr-only">Four-digit verification code</legend>
            <div className="flex items-center justify-center gap-3">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={element => { inputs.current[index] = element }}
                  type="text"
                  name={`otp-${index + 1}`}
                  value={digit}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  autoFocus={index === 0}
                  autoComplete={index === 0 ? 'one-time-code' : 'off'}
                  aria-label={`Verification code digit ${index + 1} of 4`}
                  aria-invalid={hasError || undefined}
                  aria-describedby="otp-status"
                  className={cx(
                    'focus-ring h-16 w-14 rounded-[14px] border bg-ink-900/55 text-center text-[24px] font-semibold tabular-nums text-paper-100 caret-brand-orange outline-none backdrop-blur-2xl',
                    hasError ? 'border-2 border-brand-orange' : 'border-white/15 focus:border-brand-orange',
                  )}
                  onChange={event => handleChange(index, event.target.value)}
                  onKeyDown={event => handleKeyDown(index, event)}
                  onPaste={handlePaste}
                />
              ))}
            </div>
          </fieldset>
        </form>

        <div
          id="otp-status"
          className="mt-4 min-h-10 w-full"
          aria-live={status && !hasError ? 'polite' : undefined}
          aria-atomic="true"
        >
          {status && (
            <p
              role={hasError ? 'alert' : undefined}
              className={cx(
                'rounded-lg border px-3 py-2 text-[12px] leading-4 text-paper-100',
                screenState === 'success'
                  ? 'border-forest-green/35 bg-forest-green/10'
                  : screenState === 'invalid' || screenState === 'expired'
                    ? 'border-brand-orange/35 bg-brand-orange/10'
                    : 'border-white/10 bg-ink-brown-800',
              )}
            >
              {status}
            </p>
          )}
        </div>

        <div className="mt-3 flex w-full flex-col items-center gap-3">
          <BtnGhost
            quiet={resendDisabled}
            disabled={resendDisabled}
            aria-describedby="resend-status"
            onClick={resendPrototype}
          >
            Resend code
          </BtnGhost>
          <div id="resend-status" className="flex w-full max-w-[250px] items-center gap-2">
            <div className="flex-1">
              <ChargeMeter
                ticks={12}
                filled={screenState === 'rate-limited' ? 0 : Math.ceil((cooldown / 59) * 12)}
                label={screenState === 'rate-limited'
                  ? 'Resend paused during verification rate limit'
                  : cooldown > 0 ? `Resend available in ${formatTime(cooldown)}` : 'Resend available now'}
              />
            </div>
            <span className="shrink-0 text-[12px] tabular-nums text-paper-100/70">
              {screenState === 'rate-limited' ? 'Paused' : cooldown > 0 ? formatTime(cooldown) : 'Ready'}
            </span>
          </div>
          {screenState === 'default' && !status && (
            <span className="sr-only" aria-live="polite" aria-atomic="true">
              {cooldown > 0 ? 'Resend will be available in less than one minute.' : 'Resend is available now.'}
            </span>
          )}
        </div>
      </main>
    </HifiShell>
  )
}

function getStatus(state: OTPState, rateLimit: number) {
  if (state === 'loading') return 'Checking this code securely…'
  if (state === 'invalid') return 'That code did not match. Try again.'
  if (state === 'expired') return 'That code expired. Resend is available now.'
  if (state === 'rate-limited') {
    return rateLimit > 60
      ? `Verification is paused. About ${Math.ceil(rateLimit / 60)} minutes remaining.`
      : 'Verification is paused. Less than one minute remaining.'
  }
  if (state === 'resend-success') return 'Code sent. A new 60-second cooldown has started.'
  if (state === 'offline') return 'No connection. Your entered code is still here.'
  if (state === 'success') return 'Code verified in this local prototype. Nothing was sent.'
  return ''
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remaining = seconds % 60
  return `${minutes}:${remaining.toString().padStart(2, '0')}`
}
