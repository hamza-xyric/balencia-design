'use client'

import { useState } from 'react'
import { CheckCircle2, FileSignature, History, ShieldCheck, Upload, Users } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SignalPill } from '@/components/screens/ConversationSuite'
import { SectionHeader } from '@/components/screens/SectionHeader'

// Screen 82 of 90: Accountability contract

const checks = [
  { label: 'Morning run proof', status: 'Photo or wearable sync', done: true },
  { label: 'Weekly review', status: 'Due Sunday evening', done: false },
  { label: 'Buddy confirmation', status: 'Aisha can confirm', done: true },
]

function ContractHero() {
  return (
    <section className="animate-fade-up rounded-xl border border-forest-green/25 bg-[linear-gradient(145deg,rgba(52,168,83,0.16),rgba(33,16,8,0.96)_64%)] p-5 shadow-2">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-forest-green">Active contract</p>
          <h2 className="mt-2 text-[22px] font-semibold leading-[28px] text-white">Half marathon consistency</h2>
          <p className="mt-2 text-[13px] leading-[19px] text-white/55">4 weeks left, 2 accountability partners, 86% compliance.</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-green text-white shadow-[var(--glow-green)]">
          <ShieldCheck size={20} strokeWidth={2.2} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <SignalPill tone="green">Signed</SignalPill>
        <SignalPill tone="orange">2 checks due</SignalPill>
        <SignalPill tone="muted">Consent active</SignalPill>
      </div>
    </section>
  )
}

function BottomAction({ changed, onSign }: { changed: boolean; onSign: () => void }) {
  return (
    <Button fullWidth disabled={!changed} onClick={onSign} leftIcon={<FileSignature size={16} strokeWidth={2.2} />}>
      {changed ? 'Review and sign' : 'No update to sign'}
    </Button>
  )
}

export default function AccountabilityContractScreen() {
  const [pendingChange, setPendingChange] = useState(false)
  const [sheet, setSheet] = useState<'none' | 'review' | 'signed' | 'proof' | 'partners' | 'history'>('none')

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Contract" showBack />} activeTab="me" bottomAction={<BottomAction changed={pendingChange} onSign={() => setSheet('review')} />}>
        <main className="space-y-5 px-4 pb-6 pt-4">
          <ContractHero />
          <section className="rounded-lg border border-white/[0.08] bg-ink-brown-800 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-[15px] font-semibold leading-5 text-white">Pending update</h2>
                <p className="mt-1 text-caption leading-[18px] text-white/55">{pendingChange ? 'Add Sunday proof window and notify Aisha only.' : 'No contract terms changed since your last signature.'}</p>
              </div>
              <button type="button" onClick={() => setPendingChange(!pendingChange)} className="h-11 rounded-pill bg-white/[0.06] px-4 text-caption font-semibold text-white/70">
                {pendingChange ? 'Clear' : 'Edit'}
              </button>
            </div>
          </section>
          <section>
            <SectionHeader title="Verification checks" />
            <div className="space-y-3">
              {checks.map((check) => (
                <button type="button" key={check.label} onClick={() => setSheet('proof')} className="w-full text-left">
                <Card variant="small" className="rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${check.done ? 'bg-forest-green' : 'bg-brand-orange'}`} />
                    <div className="min-w-0 flex-1">
                      <h2 className="text-[15px] font-semibold leading-5 text-white">{check.label}</h2>
                      <p className="mt-1 text-[12px] leading-4 text-white/45">{check.status}</p>
                    </div>
                  </div>
                </Card>
                </button>
              ))}
            </div>
          </section>
          <button type="button" onClick={() => setSheet('partners')} className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] p-4 text-left">
            <div className="flex items-center gap-2 text-white">
              <Users size={17} strokeWidth={2} />
              <h2 className="text-[15px] font-semibold leading-5">Partners</h2>
            </div>
            <p className="mt-2 text-[13px] leading-[19px] text-white/50">Aisha and Omar can see opted-in terms, proof, and check status. SIA reads this contract only with consent.</p>
          </button>
          <button type="button" onClick={() => setSheet('history')} className="flex min-h-11 w-full items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.04] px-4 text-left text-[13px] font-semibold leading-[18px] text-white/60">
            <History size={16} /> View audit trail
          </button>
          {sheet !== 'none' && (
            <section className="rounded-lg border border-forest-green/20 bg-forest-green/10 p-4" role="dialog" aria-label="Contract action">
              {sheet === 'review' && (
                <>
                  <h2 className="text-[15px] font-semibold leading-5 text-white">Review terms before signing</h2>
                  <p className="mt-1 text-caption leading-[18px] text-white/60">Change: Sunday proof window. Visible to Aisha only. Private notes remain excluded.</p>
                  <button type="button" onClick={() => { setSheet('signed'); setPendingChange(false) }} className="mt-3 inline-flex h-11 items-center gap-2 rounded-pill bg-forest-green px-4 text-caption font-semibold text-white"><CheckCircle2 size={15} /> Sign update</button>
                </>
              )}
              {sheet === 'signed' && <p className="text-[15px] font-semibold leading-5 text-white">Signed. Audit trail updated with timestamp and visible-partner scope.</p>}
              {sheet === 'proof' && (
                <>
                  <div className="flex items-center gap-2 text-[15px] font-semibold leading-5 text-white"><Upload size={16} /> Proof detail</div>
                  <p className="mt-1 text-caption leading-[18px] text-white/60">Upload photo, wearable sync, or buddy confirmation. History is visible only to opted-in partners.</p>
                </>
              )}
              {sheet === 'partners' && <p className="text-caption leading-[18px] text-white/60">Partner visibility: contract terms, submitted proof, check-in status. Hidden: private journal, SIA chats, health details not attached as proof.</p>}
              {sheet === 'history' && <p className="text-caption leading-[18px] text-white/60">Audit trail: signed May 20, proof uploaded May 23, partner confirmation May 24.</p>}
            </section>
          )}
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
