import Link from 'next/link'
import { Check, ChevronLeft, Clock, Mic, Phone, Plus } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { voiceCallHistory } from '@/data/mock'

// Screen 51 of 78: Voice call history
// Spec: /Users/hamza/yHealth/app_design 3/51-voice-call-history.md

function VoiceHeader() {
  return (
    <header className="z-30 flex h-[48px] shrink-0 items-center bg-ink-900/95 px-4 backdrop-blur-md">
      <Link href="/tabs/sia" className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-white" aria-label="Back">
        <ChevronLeft size={20} strokeWidth={2.1} />
      </Link>
      <h1 className="absolute left-1/2 -translate-x-1/2 text-h3 font-semibold leading-[22px] text-white">Voice sessions</h1>
      <button type="button" className="ml-auto flex h-11 w-11 items-center justify-center rounded-full text-white" aria-label="Schedule a call">
        <Plus size={22} strokeWidth={2.2} />
      </button>
    </header>
  )
}

function VoiceTabs() {
  return (
    <div className="mx-4 mt-3 grid h-9 grid-cols-2 rounded-pill border border-white/10 bg-ink-brown-800 p-1 animate-fade-up">
      <button type="button" className="rounded-pill bg-royal-purple text-caption font-semibold leading-[18px] text-white">
        History
      </button>
      <button type="button" className="rounded-pill text-caption font-semibold leading-[18px] text-white/50">
        Action items
      </button>
    </div>
  )
}

function UpcomingCall() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '80ms' }}>
      <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/50">
        Upcoming
      </div>
      <Card variant="small" className="rounded-md border-l-[3px] border-l-royal-purple p-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-royal-purple bg-ink-brown-800 text-small font-semibold text-white">
            S
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-[15px] font-semibold leading-5 text-white">{voiceCallHistory.upcoming.date}</h2>
            <p className="mt-1 text-caption leading-[18px] text-white/70">{voiceCallHistory.upcoming.type}</p>
            <div className="mt-3 flex gap-6">
              <button type="button" className="text-caption font-semibold leading-[18px] text-royal-purple/70">Edit</button>
              <button type="button" className="text-caption font-semibold leading-[18px] text-white/40">Cancel</button>
            </div>
          </div>
        </div>
      </Card>
      <button type="button" className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-pill bg-brand-orange text-h3 font-semibold leading-[22px] text-white shadow-2 shadow-brand-orange/20">
        <Phone size={17} strokeWidth={2.2} />
        Schedule a call
      </button>
    </section>
  )
}

function CallCard({ call }: { call: (typeof voiceCallHistory.calls)[number]['items'][number] }) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-royal-purple bg-ink-brown-800 text-small font-semibold text-white">
          S
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-semibold leading-5 text-white">{call.time}</span>
            <span className="rounded-pill bg-ink-900/70 px-2 py-1 text-caption leading-[18px] text-white/50">{call.duration}</span>
          </div>
          <p className="mt-1 text-caption font-semibold leading-[18px] text-royal-purple/70">{call.type}</p>
          <div className="mt-2 flex gap-2">
            <span className="shrink-0 text-[16px] leading-5 text-white/70">{call.emotion}</span>
            <p className="line-clamp-2 text-caption leading-[18px] text-white/50">{call.summary}</p>
          </div>
        </div>
        <Mic size={14} className="mt-1 text-white/30" strokeWidth={2.1} />
      </div>
    </Card>
  )
}

function CallHistoryList() {
  return (
    <section className="mt-6 space-y-5 animate-fade-up" style={{ animationDelay: '160ms' }}>
      {voiceCallHistory.calls.map((group) => (
        <div key={group.label}>
          <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/50">
            {group.label}
          </div>
          <div className="space-y-3">
            {group.items.map((call) => (
              <CallCard key={call.id} call={call} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

function ActionItemPreview() {
  return (
    <Card className="mt-6 p-0 animate-fade-up" style={{ animationDelay: '240ms' }}>
      {voiceCallHistory.actionItems.map((item, index) => (
        <div key={item.id} className={['flex min-h-[68px] gap-3 px-4 py-3', index > 0 ? 'border-t border-white/[0.05]' : ''].join(' ')}>
          <span className={['mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border', item.completed ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/20 text-transparent'].join(' ')}>
            <Check size={14} strokeWidth={2.4} />
          </span>
          <div className="min-w-0 flex-1">
            <p className={['text-[15px] font-semibold leading-5', item.completed ? 'text-white/40 line-through' : 'text-white'].join(' ')}>
              {item.task}
            </p>
            <p className="mt-0.5 text-small leading-[14px] text-white/40">from: {item.source}</p>
          </div>
          <div className="shrink-0 text-right">
            <span className={['rounded-pill px-2 py-1 text-small font-semibold leading-3', item.priority === 'high' ? 'bg-brand-orange/15 text-brand-orange' : 'bg-white/10 text-white/50'].join(' ')}>
              {item.priority}
            </span>
            <p className="mt-2 flex items-center justify-end gap-1 text-small leading-[14px] text-white/40">
              <Clock size={11} strokeWidth={2.1} />
              {item.due}
            </p>
          </div>
        </div>
      ))}
    </Card>
  )
}

export default function VoiceCallHistoryScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<VoiceHeader />} activeTab="sia">
        <main className="px-4 pb-20">
          <VoiceTabs />
          <UpcomingCall />
          <CallHistoryList />
          <ActionItemPreview />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
