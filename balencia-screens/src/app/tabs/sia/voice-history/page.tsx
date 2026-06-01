'use client'

import Link from 'next/link'
import { Check, ChevronLeft, Clock, Mic, Phone, Plus } from 'lucide-react'
import { useState } from 'react'
import { Card } from '@/components/design-system/Card'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { voiceCallHistory } from '@/data/mock'

// Screen 51 of 78: Voice call history
// Spec: /Users/hamza/yHealth/app_design 3/51-voice-call-history.md

function VoiceHeader({ onSchedule }: { onSchedule: () => void }) {
  return (
    <header className="z-30 flex h-[48px] shrink-0 items-center bg-ink-900/95 px-4 backdrop-blur-md">
      <Link href="/tabs/sia" className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-white" aria-label="Back">
        <ChevronLeft size={20} strokeWidth={2.1} />
      </Link>
      <h1 className="absolute left-1/2 -translate-x-1/2 text-h3 font-semibold leading-[22px] text-white">Voice sessions</h1>
      <button type="button" onClick={onSchedule} className="ml-auto flex h-11 w-11 items-center justify-center rounded-full text-white" aria-label="Schedule a call">
        <Plus size={22} strokeWidth={2.2} />
      </button>
    </header>
  )
}

function VoiceTabs({ active, onChange }: { active: 'history' | 'actions'; onChange: (tab: 'history' | 'actions') => void }) {
  return (
    <div className="mx-4 mt-3 grid min-h-[52px] grid-cols-2 rounded-pill border border-white/10 bg-ink-brown-800 p-1 animate-fade-up" role="tablist" aria-label="Voice session views">
      <button type="button" onClick={() => onChange('history')} role="tab" aria-selected={active === 'history'} className={['min-h-11 rounded-pill text-caption font-semibold leading-[18px]', active === 'history' ? 'bg-royal-purple text-white' : 'text-white/50'].join(' ')}>
        History
      </button>
      <button type="button" onClick={() => onChange('actions')} role="tab" aria-selected={active === 'actions'} className={['min-h-11 rounded-pill text-caption font-semibold leading-[18px]', active === 'actions' ? 'bg-royal-purple text-white' : 'text-white/50'].join(' ')}>
        Action items
      </button>
    </div>
  )
}

function UpcomingCall({ onSchedule, onEdit, onCancel }: { onSchedule: () => void; onEdit: () => void; onCancel: () => void }) {
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
              <button type="button" onClick={onEdit} className="min-h-11 min-w-11 px-2 text-caption font-semibold leading-[18px] text-royal-purple/70" aria-label="Edit upcoming call">Edit</button>
              <button type="button" onClick={onCancel} className="min-h-11 min-w-11 px-2 text-caption font-semibold leading-[18px] text-white/40" aria-label="Cancel upcoming call">Cancel</button>
            </div>
          </div>
        </div>
      </Card>
      <button type="button" onClick={onSchedule} className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-pill bg-brand-orange text-h3 font-semibold leading-[22px] text-white shadow-2 shadow-brand-orange/20">
        <Phone size={17} strokeWidth={2.2} />
        Schedule a call
      </button>
    </section>
  )
}

function CallCard({ call }: { call: (typeof voiceCallHistory.calls)[number]['items'][number] }) {
  return (
    <Link href="/tabs/sia/call-summary" className="block">
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
    </Link>
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

function ActionItemPreview({ completed, onToggle }: { completed: string[]; onToggle: (id: string) => void }) {
  return (
    <Card className="mt-6 p-0 animate-fade-up" style={{ animationDelay: '240ms' }}>
      {voiceCallHistory.actionItems.map((item, index) => {
        const isCompleted = completed.includes(item.id) || item.completed

        return (
        <button key={item.id} type="button" onClick={() => onToggle(item.id)} aria-pressed={isCompleted} aria-label={`${item.task}, ${isCompleted ? 'completed' : 'pending'}, due ${item.due}`} className={['flex min-h-[68px] w-full gap-3 px-4 py-3 text-left', index > 0 ? 'border-t border-white/[0.05]' : ''].join(' ')}>
          <span className={['mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border', isCompleted ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/20 text-transparent'].join(' ')}>
            <Check size={14} strokeWidth={2.4} />
          </span>
          <div className="min-w-0 flex-1">
            <p className={['text-[15px] font-semibold leading-5', isCompleted ? 'text-white/40 line-through' : 'text-white'].join(' ')}>
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
        </button>
        )
      })}
    </Card>
  )
}

export default function VoiceCallHistoryScreen() {
  const [tab, setTab] = useState<'history' | 'actions'>('history')
  const [sheet, setSheet] = useState<'schedule' | 'cancel' | null>(null)
  const [completed, setCompleted] = useState(voiceCallHistory.actionItems.filter((item) => item.completed).map((item) => item.id))
  const [notice, setNotice] = useState('Voice summaries stay private in SIA history. Raw audio is discarded after transcript review.')

  return (
    <PhoneFrame>
      <ScreenShell header={<VoiceHeader onSchedule={() => setSheet('schedule')} />} activeTab="sia">
        <main className="px-4 pb-20">
          <VoiceTabs active={tab} onChange={setTab} />
          <p className="mt-3 rounded-lg border border-royal-purple/15 bg-royal-purple/10 px-3 py-2 text-caption leading-[18px] text-white/55" aria-live="polite">
            {notice}
          </p>
          {tab === 'history' ? (
            <>
              <UpcomingCall onSchedule={() => setSheet('schedule')} onEdit={() => setSheet('schedule')} onCancel={() => setSheet('cancel')} />
              <CallHistoryList />
              <ActionItemPreview completed={completed} onToggle={(id) => setCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])} />
            </>
          ) : (
            <ActionItemPreview completed={completed} onToggle={(id) => setCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])} />
          )}
        </main>
        {sheet && (
          <section className="absolute inset-x-0 bottom-0 z-40 rounded-t-xl border border-white/[0.06] bg-ink-brown-800 px-4 pb-8 pt-3 shadow-3 animate-fade-up" role="dialog" aria-label={sheet === 'cancel' ? 'Cancel call' : 'Schedule call'}>
            <div className="mx-auto mb-4 h-1 w-9 rounded-pill bg-white/20" />
            <h2 className="text-h3 font-semibold leading-[22px] text-white">{sheet === 'cancel' ? 'Cancel upcoming call?' : 'Schedule voice session'}</h2>
            <p className="mt-2 text-caption leading-[18px] text-white/55">
              {sheet === 'cancel' ? 'This removes the Friday reminder. You can schedule another call anytime.' : 'Next suggested slot: Friday, 8:30 AM. SIA will bring your latest mission context.'}
            </p>
            <p className="mt-3 rounded-lg border border-white/[0.06] bg-white/[0.04] px-3 py-2 text-small leading-[15px] text-white/45">
              Calls are private to you. SIA keeps the summary and action items only in this history unless you delete them.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button className="h-11 rounded-pill bg-white/[0.06] text-[15px] font-semibold text-white/60" onClick={() => setSheet(null)}>Back</button>
              <button
                className="h-11 rounded-pill bg-brand-orange text-[15px] font-semibold text-white"
                onClick={() => {
                  setNotice(sheet === 'cancel' ? 'Upcoming call canceled. Your previous SIA summaries remain private in history.' : 'Voice session scheduled for Friday at 8:30 AM.')
                  setSheet(null)
                }}
              >
                {sheet === 'cancel' ? 'Cancel call' : 'Confirm'}
              </button>
            </div>
          </section>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
