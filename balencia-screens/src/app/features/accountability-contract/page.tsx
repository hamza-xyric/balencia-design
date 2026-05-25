import { FileSignature, ShieldCheck, Users } from 'lucide-react'
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

function BottomAction() {
  return (
    <Button fullWidth leftIcon={<FileSignature size={16} strokeWidth={2.2} />}>
      Sign update
    </Button>
  )
}

export default function AccountabilityContractScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Accountability contract" showBack />} activeTab="me" bottomAction={<BottomAction />}>
        <main className="space-y-5 px-4 pb-6 pt-4">
          <ContractHero />
          <section>
            <SectionHeader title="Verification checks" />
            <div className="space-y-3">
              {checks.map((check) => (
                <Card key={check.label} variant="small" className="rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${check.done ? 'bg-forest-green' : 'bg-brand-orange'}`} />
                    <div className="min-w-0 flex-1">
                      <h2 className="text-[15px] font-semibold leading-5 text-white">{check.label}</h2>
                      <p className="mt-1 text-[12px] leading-4 text-white/45">{check.status}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
          <section className="rounded-lg border border-white/[0.06] bg-white/[0.04] p-4">
            <div className="flex items-center gap-2 text-white">
              <Users size={17} strokeWidth={2} />
              <h2 className="text-[15px] font-semibold leading-5">Partners</h2>
            </div>
            <p className="mt-2 text-[13px] leading-[19px] text-white/50">Aisha and Omar can see check status, not private journal notes.</p>
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
