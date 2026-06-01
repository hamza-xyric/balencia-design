'use client'

import { useState } from 'react'
import { Check, Circle, ShieldAlert, X } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { reportBlock } from '@/data/mock'

// Screen 64 of 78: Report / block
// Spec: /Users/hamza/yHealth/app_design 3/64-report-block.md

function ReasonRow({ reason, selected, divider, onSelect }: { reason: string; selected: boolean; divider?: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={['flex min-h-12 w-full items-center gap-3 px-4 text-left', divider ? 'border-t border-white/[0.05]' : ''].join(' ')}
    >
      <span className={['flex h-5 w-5 items-center justify-center rounded-full border', selected ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/20 text-transparent'].join(' ')}>
        {selected ? <Check size={12} strokeWidth={2.6} /> : <Circle size={10} strokeWidth={2.2} />}
      </span>
      <span className="text-[15px] leading-5 text-white/80">{reason}</span>
    </button>
  )
}

function SwitchVisual({ checked }: { checked: boolean }) {
  return (
    <span className={['relative inline-flex h-5 w-[34px] shrink-0 rounded-pill transition-colors', checked ? 'bg-brand-orange' : 'bg-white/15'].join(' ')} aria-hidden="true">
      <span className={['absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform', checked ? 'translate-x-[16px]' : 'translate-x-0.5'].join(' ')} />
    </span>
  )
}

export default function ReportBlockScreen() {
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [blockUser, setBlockUser] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'dismissed'>('idle')
  const statusKey = status as string
  const submit = () => {
    if (!reason) return
    setStatus('loading')
    window.setTimeout(() => setStatus('success'), 350)
  }

  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <main className="relative min-h-full overflow-hidden bg-ink-900">
          <div className="absolute inset-0 opacity-40">
            <div className="mx-4 mt-8 h-24 rounded-xl border border-white/[0.06] bg-ink-brown-800" />
            <div className="mx-4 mt-4 h-40 rounded-xl border border-white/[0.06] bg-ink-brown-800" />
            <div className="mx-4 mt-4 h-28 rounded-xl border border-white/[0.06] bg-ink-brown-800" />
          </div>
          <div className="absolute inset-0 bg-ink-900/60" />

          {(statusKey === 'success' || statusKey === 'dismissed') ? (
            <section className="absolute inset-x-4 top-1/2 z-40 -translate-y-1/2 rounded-xl border border-white/[0.08] bg-ink-brown-800 p-5 text-center shadow-3 animate-fade-up" role="status">
              <div className={['mx-auto flex h-14 w-14 items-center justify-center rounded-full', statusKey === 'success' ? 'bg-forest-green/15 text-forest-green' : 'bg-white/[0.06] text-white/50'].join(' ')}>
                {statusKey === 'success' ? <Check size={26} strokeWidth={2.4} /> : <X size={24} strokeWidth={2.2} />}
              </div>
              <h1 className="mt-4 text-[20px] font-semibold leading-6 text-white">
                {statusKey === 'success' ? 'Report submitted' : 'Report dismissed'}
              </h1>
              <p className="mt-2 text-[13px] leading-[18px] text-white/55">
                {statusKey === 'success'
                  ? `Safety team will review this report${blockUser ? ', and blocking is queued for confirmation.' : '.'}`
                  : 'No report was sent and this user was not blocked.'}
              </p>
              <Button className="mt-5" fullWidth onClick={() => setStatus('idle')}>Done</Button>
            </section>
          ) : (
          <section
            className="absolute inset-x-0 bottom-0 z-40 max-h-[calc(100%-72px)] overflow-y-auto rounded-t-2xl border border-white/[0.06] bg-ink-brown-800 px-4 pb-7 pt-3 shadow-3 animate-fade-up hide-scrollbar"
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-title"
          >
            <div className="mx-auto h-1 w-10 rounded-pill bg-white/20" />
            <div className="relative mt-4 flex h-10 items-center">
              <button type="button" onClick={() => setStatus('dismissed')} className="min-h-11 px-2 text-caption font-semibold leading-[18px] text-white/50">Cancel</button>
              <h1 id="report-title" className="absolute left-1/2 -translate-x-1/2 text-h3 font-semibold leading-[22px] text-white">Report</h1>
              <button type="button" onClick={() => setStatus('dismissed')} aria-label="Close report" className="ml-auto flex h-11 w-11 items-center justify-center rounded-full text-white/50"><X size={17} /></button>
            </div>

            <div className="mt-4 rounded-lg border border-white/[0.06] bg-ink-900/70 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-small font-semibold text-white">
                  {reportBlock.entity.avatar}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[15px] font-semibold leading-5 text-white">{reportBlock.entity.username}</div>
                  <div className="mt-1 truncate text-caption leading-[18px] text-white/45">{reportBlock.entity.preview}</div>
                </div>
              </div>
            </div>

            <div id="report-reason-label" className="mt-5 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
              why are you reporting this?
            </div>
            <div className="mt-3 overflow-hidden rounded-xl border border-white/[0.06] bg-ink-900/70" role="radiogroup" aria-labelledby="report-reason-label">
              {reportBlock.reasons.map((option, index) => (
                <ReasonRow key={option} reason={option} selected={reason === option} onSelect={() => setReason(option)} divider={index > 0} />
              ))}
            </div>

            <textarea value={details} onChange={(event) => setDetails(event.target.value)} placeholder={reportBlock.description} className="mt-4 h-[92px] w-full resize-none rounded-md border border-brand-orange/25 bg-ink-900 p-4 text-[15px] leading-5 text-white outline-none placeholder:text-white/35" />

            <button
              type="button"
              onClick={() => setBlockUser((value) => !value)}
              className="mt-4 flex min-h-12 w-full items-center justify-between rounded-lg border border-white/[0.06] bg-ink-900/70 px-4 text-left"
              role="switch"
              aria-checked={blockUser}
            >
              <div className="flex items-center gap-2 text-[15px] font-semibold leading-5 text-white">
                <ShieldAlert size={16} className="text-white/50" strokeWidth={2.1} />
                Also block this user
              </div>
              <SwitchVisual checked={blockUser} />
            </button>

            {status !== 'idle' && (
              <div className="mt-4 rounded-md bg-ink-900 px-3 py-2 text-caption text-white/70" role="status">
                {status === 'loading' ? 'Submitting report...' : 'Something went wrong. Try again.'}
              </div>
            )}
            <Button fullWidth className="mt-5" disabled={!reason || status === 'loading'} onClick={submit}>{status === 'loading' ? 'Submitting...' : 'Submit report'}</Button>
          </section>
          )}
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
