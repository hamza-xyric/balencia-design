'use client'

import { CalendarPlus, CheckCircle2, Clock, Mic2, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/design-system/Button'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
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

const signalClasses = {
  purple: 'border-royal-purple/25 bg-royal-purple/10 text-royal-purple',
  green: 'border-forest-green/25 bg-forest-green/10 text-forest-green',
  muted: 'border-white/[0.08] bg-white/[0.04] text-white/60',
}

function SignalButton({
  children,
  tone,
  onClick,
}: {
  children: React.ReactNode
  tone: keyof typeof signalClasses
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex min-h-11 items-center rounded-pill border px-2.5 text-[11px] font-semibold leading-none transition-transform duration-[var(--dur-fast)] active:scale-95',
        signalClasses[tone],
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function SummaryHero({ onSignal }: { onSignal: () => void }) {
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
        <SignalButton tone="purple" onClick={onSignal}>Transcript ready</SignalButton>
        <SignalButton tone="green" onClick={onSignal}>Mood steady</SignalButton>
        <SignalButton tone="muted" onClick={onSignal}>Private</SignalButton>
      </div>
    </section>
  )
}

function BottomAction({ booked, onClick }: { booked: boolean; onClick: () => void }) {
  return (
    <Button fullWidth variant={booked ? 'completion' : 'primary'} leftIcon={<CalendarPlus size={16} strokeWidth={2.2} />} onClick={onClick}>
      {booked ? 'Friday follow-up booked' : 'Schedule follow-up'}
    </Button>
  )
}

export default function CallSummaryScreen() {
  const [convertedItems, setConvertedItems] = useState<string[]>([])
  const [transcriptOpen, setTranscriptOpen] = useState(false)
  const [selectedTranscript, setSelectedTranscript] = useState(transcript[0].text)
  const [sheet, setSheet] = useState<'schedule' | 'privacy' | null>(null)
  const [followUpBooked, setFollowUpBooked] = useState(false)

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Call summary" showBack backHref="/tabs/sia/voice-history" />} activeTab="sia" bottomAction={<BottomAction booked={followUpBooked} onClick={() => setSheet('schedule')} />}>
        <main className="space-y-5 px-4 pb-6 pt-4">
          <SummaryHero onSignal={() => setSheet('privacy')} />
          {followUpBooked && (
            <section className="animate-fade-up rounded-lg border border-forest-green/25 bg-forest-green/10 p-4 shadow-1" role="status">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-forest-green" strokeWidth={2.2} />
                <div>
                  <h2 className="text-[15px] font-semibold leading-5 text-white">Follow-up booked</h2>
                  <p className="mt-1 text-caption leading-[18px] text-white/60">Friday at 8:30 AM. You can reschedule or cancel from voice history.</p>
                </div>
              </div>
            </section>
          )}
          <section className="animate-fade-up rounded-lg border border-white/[0.06] bg-ink-brown-800 p-4 shadow-1">
            <SectionHeader title="Action items" />
            <div className="space-y-3">
              {actionItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setConvertedItems((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])}
                  className="flex min-h-12 w-full items-start gap-3 rounded-md px-1 py-1 text-left transition-colors duration-[var(--dur-fast)] active:bg-white/[0.03]"
                  aria-pressed={convertedItems.includes(item)}
                >
                  <CheckCircle2 size={18} className={['mt-0.5 shrink-0', convertedItems.includes(item) ? 'text-forest-green' : 'text-white/25'].join(' ')} strokeWidth={2.2} />
                  <span className="min-w-0 flex-1">
                    <span className={['block text-[13px] leading-[19px]', convertedItems.includes(item) ? 'text-white/35 line-through' : 'text-white/65'].join(' ')}>{item}</span>
                    {convertedItems.includes(item) && <span className="mt-0.5 block text-small font-semibold leading-[14px] text-forest-green">Converted to mission task</span>}
                  </span>
                </button>
              ))}
            </div>
          </section>
          <section className="animate-fade-up" style={{ animationDelay: '80ms' }}>
            <SectionHeader title="Transcript highlights" />
            <div className="space-y-3">
              {(transcriptOpen ? transcript : transcript.slice(0, 1)).map((line) => (
                <button
                  key={line.text}
                  type="button"
                  onClick={() => {
                    setSelectedTranscript(line.text)
                    setTranscriptOpen(true)
                  }}
                  className={['w-full rounded-lg border p-3 text-left transition-colors duration-[var(--dur-fast)] active:bg-white/[0.06]', selectedTranscript === line.text ? 'border-royal-purple/30 bg-royal-purple/10' : 'border-white/[0.06] bg-white/[0.04]'].join(' ')}
                >
                  <div className="mb-1 flex items-center gap-2">
                    {line.speaker === 'SIA' ? <Sparkles size={13} className="text-royal-purple" /> : <Clock size={13} className="text-white/35" />}
                    <span className="text-[11px] font-semibold leading-none text-white/35">{line.speaker}</span>
                  </div>
                  <p className="text-[13px] leading-[19px] text-white/65">{line.text}</p>
                </button>
              ))}
              {transcriptOpen && (
                <div className="rounded-lg border border-royal-purple/20 bg-royal-purple/10 p-3">
                  <p className="text-small font-semibold uppercase leading-[14px] text-royal-purple">Expanded transcript anchor</p>
                  <p className="mt-2 text-caption leading-[18px] text-white/60">{selectedTranscript}</p>
                </div>
              )}
              <button type="button" onClick={() => setTranscriptOpen(!transcriptOpen)} className="h-11 w-full rounded-pill border border-white/10 text-caption font-semibold text-white/60">
                {transcriptOpen ? 'Collapse transcript' : 'Expand transcript'}
              </button>
            </div>
          </section>
          <p className="text-caption leading-[18px] text-white/40" aria-live="polite">
            {convertedItems.length} action item{convertedItems.length === 1 ? '' : 's'} converted into mission tasks. {followUpBooked ? 'Friday follow-up is confirmed.' : ''}
          </p>
        </main>
        {sheet && (
          <section className="absolute inset-x-0 bottom-0 z-40 rounded-t-xl border border-white/[0.06] bg-ink-brown-800 px-4 pb-8 pt-3 shadow-3 animate-fade-up" role="dialog" aria-label={sheet === 'schedule' ? 'Schedule follow-up' : 'Privacy details'}>
            <div className="mx-auto mb-4 h-1 w-9 rounded-pill bg-white/20" />
            <h2 className="text-h3 font-semibold leading-[22px] text-white">{sheet === 'schedule' ? 'Schedule follow-up' : 'Call privacy'}</h2>
            <p className="mt-2 text-caption leading-[18px] text-white/55">
              {sheet === 'schedule'
                ? 'Suggested follow-up: Friday at 8:30 AM. You can reschedule or cancel from voice history.'
                : 'Summary and transcript are private to you. SIA memory stores only approved action items; sensitive transcript sections can be redacted.'}
            </p>
            <button className="mt-5 h-11 w-full rounded-pill bg-brand-orange text-[15px] font-semibold text-white" onClick={() => { if (sheet === 'schedule') setFollowUpBooked(true); setSheet(null) }}>
              {sheet === 'schedule' ? 'Confirm follow-up' : 'Done'}
            </button>
          </section>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
