'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import {
  BtnPrimary,
  Chip,
  CIAInsightCard,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassPillInput,
  HifiShell,
  ProgressBar,
} from '@/components/hifi/kit'

type GenderValue = '' | 'woman' | 'man' | 'nonbinary' | 'self-described' | 'prefer-not-to-say'

// Social-auth data-gap step. Every field remains editable and local to this
// visual prototype. The native gender select deliberately keeps an empty
// `Not selected` value separate from the explicit `Prefer not to say` choice.
export function S03dCompleteProfile() {
  const [firstName, setFirstName] = useState('Amira')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState<GenderValue>('')
  const [firstNameSource, setFirstNameSource] = useState<'From Google' | 'You entered'>('From Google')
  const [status, setStatus] = useState('')

  const readiness = useMemo(
    () => Number(Boolean(dateOfBirth)) + Number(Boolean(gender)),
    [dateOfBirth, gender],
  )

  const submitPreview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('Saved in this visual preview only. No profile data was sent.')
  }

  return (
    <HifiShell
      atmosphere="cia"
      showTabBar={false}
      bottomAction={
        <div className="grid grid-cols-[1fr_auto] items-center gap-2">
          <BtnPrimary type="submit" form="complete-profile-form" className="w-full">
            Save details
          </BtnPrimary>
          <Link
            href="/screens/03c"
            className="focus-ring inline-flex min-h-[52px] items-center justify-center rounded-pill px-4 text-[14px] font-semibold text-paper-100/75"
          >
            Skip for now
          </Link>
        </div>
      }
    >
      <main className="flex flex-col px-5 pb-6 pt-3">
        <div className="text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/Frame 2147239943.svg" alt="Balencia" className="mx-auto h-auto w-[128px]" />
        </div>

        <section className="space-y-2 pb-5 pt-5 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-orange">Optional profile</p>
          <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-paper-100">
            A few more <span className="text-emphasis">details</span>
          </h1>
          <p className="text-[14px] leading-snug text-paper-100/70">Add only what you want CIA to use.</p>
        </section>

        <CIAInsightCard provenance={['First name', firstNameSource]} className="!p-4">
          <p>
            Your imported first name is editable. Age and profile guidance starts only from details you choose to add; nothing is guessed.
          </p>
        </CIAInsightCard>

        <form id="complete-profile-form" className="mt-5 space-y-4" data-profile-readiness={readiness} onSubmit={submitPreview}>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <p aria-hidden="true" className="px-1 text-[12px] font-semibold text-paper-100/75">
                First name
              </p>
              <GlassPillInput
                id="profile-first-name"
                label="First name"
                name="firstName"
                placeholder="First name"
                autoComplete="given-name"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.currentTarget.value)
                  setFirstNameSource('You entered')
                  setStatus('')
                }}
              />
              {firstName && <Chip className="ml-1">{firstNameSource}</Chip>}
            </div>

            <div className="space-y-1.5">
              <p aria-hidden="true" className="px-1 text-[12px] font-semibold text-paper-100/75">
                Last name <span className="font-normal text-paper-100/65">(optional)</span>
              </p>
              <GlassPillInput
                id="profile-last-name"
                label="Last name, optional"
                name="lastName"
                placeholder="Last name"
                autoComplete="family-name"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.currentTarget.value)
                  setStatus('')
                }}
              />
              {lastName && <Chip className="ml-1">You entered</Chip>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="profile-date-of-birth" className="px-1 text-[12px] font-semibold text-paper-100/75">
                Date of birth <span className="font-normal text-paper-100/65">(optional)</span>
              </label>
              <div className="glass-pill flex h-[52px] items-center gap-2 px-3 focus-within:border-brand-orange focus-within:shadow-[var(--focus-ring)]">
                <input
                  id="profile-date-of-birth"
                  name="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(event) => {
                    setDateOfBirth(event.currentTarget.value)
                    setStatus('')
                  }}
                  className="h-11 min-w-0 flex-1 bg-transparent text-[16px] text-paper-100 outline-none [color-scheme:dark]"
                  aria-describedby="profile-date-help"
                />
              </div>
              <p id="profile-date-help" className="px-1 text-[11px] leading-4 text-paper-100/65">
                {dateOfBirth ? 'You entered' : 'Not provided yet'}
              </p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="profile-gender" className="px-1 text-[12px] font-semibold text-paper-100/75">
                Gender <span className="font-normal text-paper-100/65">(optional)</span>
              </label>
              <div className="glass-pill flex h-[52px] items-center gap-2 px-3 focus-within:border-brand-orange focus-within:shadow-[var(--focus-ring)]">
                <select
                  id="profile-gender"
                  name="gender"
                  value={gender}
                  onChange={(event) => {
                    setGender(event.currentTarget.value as GenderValue)
                    setStatus('')
                  }}
                  className="h-11 min-w-0 flex-1 bg-transparent text-[16px] text-paper-100 outline-none"
                  aria-describedby="profile-gender-help"
                >
                  <option value="">Not selected</option>
                  <option value="woman">Woman</option>
                  <option value="man">Man</option>
                  <option value="nonbinary">Nonbinary</option>
                  <option value="self-described">Self-described</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              <p id="profile-gender-help" className="px-1 text-[11px] leading-4 text-paper-100/65">
                {gender ? 'You entered' : 'No selection'}
              </p>
            </div>
          </div>

          <section className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4" aria-labelledby="profile-readiness-label">
            <div className="flex items-center justify-between gap-3">
              <h2 id="profile-readiness-label" className="text-[11px] font-semibold uppercase tracking-[0.1em] text-paper-100/70">
                Optional details added
              </h2>
              <span className="text-[12px] font-semibold tabular-nums text-paper-100" aria-hidden="true">{readiness} of 2</span>
            </div>
            <div
              role="progressbar"
              aria-labelledby="profile-readiness-label"
              aria-valuemin={0}
              aria-valuemax={2}
              aria-valuenow={readiness}
              aria-valuetext={`${readiness} of 2 optional details added`}
            >
              <ProgressBar value={readiness * 50} />
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-surface-2 p-4" aria-labelledby="profile-controls-title">
            <div className="flex items-start gap-3">
              <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-forest-green" strokeWidth={1.9} />
              <div>
                <h2 id="profile-controls-title" className="text-[14px] font-semibold text-paper-100">Your profile stays under your control</h2>
                <p className="mt-1 text-[12px] leading-5 text-paper-100/70">
                  This is not a required-consent step. Review the source, scope, retention, export, revoke, and delete controls at any time.
                </p>
              </div>
            </div>
            <ConsentRail compact controls={FULL_DATA_CONTROLS} />
          </section>

          <p className="min-h-5 text-center text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite">
            {status}
          </p>
        </form>
      </main>
    </HifiShell>
  )
}
