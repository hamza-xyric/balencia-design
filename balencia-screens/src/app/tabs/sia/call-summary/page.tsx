import { CalendarPlus, CheckCircle2, Clock, Mic2, Sparkles } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SignalPill } from '@/components/screens/ConversationSuite'
import { SectionHeader } from '@/components/screens/SectionHeader'

// Screen 79 of 90: Call summary

const actionItems = [
  'Move long run to Saturday morning',
  'Add protein snack after strength sessions',
  'Ask Aisha about the river route',
]

const transcript = [
  { speaker: 'SIA', text: 'Your recovery is high enough for a tempo day if the first kilometer stays easy.' },
  { speaker: 'You', text: 'Let us keep it flexible and avoid pushing the hill too early.' },
  { speaker: 'SIA', text: 'I will save that as a pacing rule for this week.' },
]

function SummaryHero() {
  return (
    <section className="animate-fade-up rounded-xl border border-royal-purple/25 bg-[radial-gradient(circle_at_85%_18%,rgba(127,36,255,0.34),transparent_34%),linear-gradient(145deg,rgba(127,36,255,0.16),rgba(33,16,8,0.96)_64%)] p-5 shadow-2">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-royal-purple">Post-call summary</p>
          <h2 className="mt-2 text-[22px] font-semibold leading-[28px] text-white">Morning coaching call</h2>
          <p className="mt-2 text-[13px] leading-[19px] text-white/55">18 minutes, recovery planning, 3 action items captured.</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-royal-purple text-white shadow-[var(--glow-purple)]">
          <Mic2 size={19} strokeWidth={2.2} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <SignalPill tone="purple">Transcript ready</SignalPill>
        <SignalPill tone="green">Mood steady</SignalPill>
        <SignalPill tone="muted">Private</SignalPill>
      </div>
    </section>
  )
}

function BottomAction() {
  return (
    <Button fullWidth leftIcon={<CalendarPlus size={16} strokeWidth={2.2} />}>
      Schedule follow-up
    </Button>
  )
}

export default function CallSummaryScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Call summary" showBack />} activeTab="sia" bottomAction={<BottomAction />}>
        <main className="space-y-5 px-4 pb-6 pt-4">
          <SummaryHero />
          <section className="animate-fade-up rounded-lg border border-white/[0.06] bg-ink-brown-800 p-4 shadow-1">
            <SectionHeader title="Action items" />
            <div className="space-y-3">
              {actionItems.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-forest-green" strokeWidth={2.2} />
                  <p className="text-[13px] leading-[19px] text-white/65">{item}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="animate-fade-up" style={{ animationDelay: '80ms' }}>
            <SectionHeader title="Transcript highlights" />
            <div className="space-y-3">
              {transcript.map((line) => (
                <div key={line.text} className="rounded-lg border border-white/[0.06] bg-white/[0.04] p-3">
                  <div className="mb-1 flex items-center gap-2">
                    {line.speaker === 'SIA' ? <Sparkles size={13} className="text-royal-purple" /> : <Clock size={13} className="text-white/35" />}
                    <span className="text-[11px] font-semibold leading-none text-white/35">{line.speaker}</span>
                  </div>
                  <p className="text-[13px] leading-[19px] text-white/65">{line.text}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
