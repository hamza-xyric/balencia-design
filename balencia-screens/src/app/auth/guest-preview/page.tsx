'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { Button } from '@/components/design-system/Button'
import { domainToneClasses } from '@/components/design-system/Chip'
import { Eyebrow } from '@/components/design-system/Eyebrow'
import { Input } from '@/components/design-system/Input'
import type { DomainKey } from '@/data/domains'
import { ChevronLeft, X } from 'lucide-react'

// Screen 06 of 78: Guest preview
// Spec: /Users/hamza/yHealth/app_design 3/06-guest-mode-preview.md

const lifeAreas: { label: string; domain: DomainKey }[] = [
  { label: 'Fitness', domain: 'fitness' },
  { label: 'Nutrition', domain: 'nutrition' },
  { label: 'Wellbeing', domain: 'wellbeing' },
  { label: 'Finance', domain: 'finance' },
  { label: 'Career', domain: 'career' },
  { label: 'Relationships', domain: 'relationships' },
  { label: 'Spirituality', domain: 'faith' },
  { label: 'Learning', domain: 'learning' },
  { label: 'Creativity', domain: 'creativity' },
]

export default function GuestPreviewScreen() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [selectedDomains, setSelectedDomains] = useState<DomainKey[]>([])
  const [startedDemo, setStartedDemo] = useState(false)
  const [notice, setNotice] = useState('')
  const canExplore = name.trim().length > 1 && selectedDomains.length > 0

  const selectedLabels = useMemo(
    () => lifeAreas.filter((area) => selectedDomains.includes(area.domain)).map((area) => area.label),
    [selectedDomains],
  )

  const toggleDomain = (domain: DomainKey) => {
    setNotice('')
    setSelectedDomains((current) => {
      if (current.includes(domain)) {
        return current.filter((item) => item !== domain)
      }

      if (current.length >= 3) {
        setNotice('Maximum 3 areas selected.')
        return current
      }

      return [...current, domain]
    })
  }

  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <div className="min-h-full px-6 pb-8">
          <div className="flex h-11 items-center">
            <button
              type="button"
              aria-label="Back to sign up"
              onClick={() => router.push('/auth/sign-up')}
              className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-[var(--dur-fast)] hover:bg-white/5"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
          </div>

          <div className="mt-4 flex animate-fade-up justify-center">
            <BrandSymbol size={48} />
          </div>

          <div className="mt-8 animate-fade-up text-center" style={{ animationDelay: '80ms' }}>
            <h1 className="text-[24px] font-bold leading-[30px] text-white">
              Take a look around
            </h1>
            <p className="mx-auto mt-3 max-w-[275px] text-[15px] leading-[22px] text-white/50">
              Tell us your name and pick a few areas you care about.
            </p>
          </div>

          <div className="mt-8 animate-fade-up" style={{ animationDelay: '160ms' }}>
            <Input
              name="guestName"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-label="Your name for the preview demo"
            />
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
            <Eyebrow>Life areas</Eyebrow>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {lifeAreas.map((area) => {
                const selected = selectedDomains.includes(area.domain)
                const tone = domainToneClasses[area.domain]

                return (
                <button
                  key={area.domain}
                  type="button"
                  onClick={() => toggleDomain(area.domain)}
                  aria-pressed={selected}
                  className={[
                    'flex min-h-11 w-full items-center justify-center rounded-pill border px-2 text-center text-[12px] font-semibold transition-all duration-[var(--dur-fast)] active:scale-95',
                    selected ? `${tone.selected} ${tone.border}` : `${tone.subtle} border-white/[0.08] text-white/60`,
                  ].join(' ')}
                >
                  {area.label}
                </button>
                )
              })}
            </div>
            <p className="mt-3 min-h-5 text-center text-caption leading-[18px] text-white/45" role="status">
              {notice || `${selectedDomains.length}/3 selected${selectedLabels.length ? `: ${selectedLabels.join(', ')}` : ''}`}
            </p>
          </div>

          <div className="mt-8 animate-fade-up" style={{ animationDelay: '320ms' }}>
            <Button size="auth" fullWidth disabled={!canExplore} onClick={() => setStartedDemo(true)}>
              Explore preview
            </Button>
          </div>

          <p
            className="mt-8 animate-fade-up text-center text-[15px] leading-5 text-white/50"
            style={{ animationDelay: '400ms' }}
          >
            Already have an account?{' '}
              <a href="/auth/sign-in" className="inline-flex min-h-11 items-center align-middle font-semibold text-brand-orange">Sign in</a>
          </p>
        </div>

        {startedDemo && (
          <div className="absolute inset-0 z-40 flex items-end bg-black/55 p-4" role="dialog" aria-modal="true" aria-label="Preview demo ready">
            <div className="w-full rounded-xl border border-white/[0.08] bg-ink-brown-800 p-5 shadow-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-brand-orange">Preview demo</p>
                  <h2 className="mt-2 text-h2 font-bold leading-[26px] text-white">
                    Your Balencia preview is ready.
                  </h2>
                </div>
                <button type="button" onClick={() => setStartedDemo(false)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/60" aria-label="Close preview dialog">
                  <X size={18} />
                </button>
              </div>
              <p className="mt-3 text-[15px] leading-[22px] text-white/60">
                This is demo data for {name.trim()}. You can continue into the main Today preview or create an account to save progress later.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedLabels.map((label) => (
                  <span key={label} className="rounded-pill border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-caption font-semibold text-white/70">
                    {label}
                  </span>
                ))}
              </div>
              <div className="mt-5 grid gap-3">
                <a href="/tabs/today" className="flex h-12 items-center justify-center rounded-pill bg-brand-orange text-[15px] font-semibold text-white">
                  Continue to demo Today
                </a>
                <a href="/auth/sign-up" className="flex h-12 items-center justify-center rounded-pill border border-white/[0.08] text-[15px] font-semibold text-white/70">
                  Sign up to save
                </a>
              </div>
            </div>
          </div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
