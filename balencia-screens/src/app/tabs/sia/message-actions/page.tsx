'use client'

import { Eye, Forward, Pin, Shield, Star } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { domainToneClasses } from '@/components/design-system/Chip'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import {
  PrivacyPill,
  SignalPill,
  ThreadMessage,
} from '@/components/screens/ConversationSuite'
import { SectionHeader } from '@/components/screens/SectionHeader'
import { messageActionPreview } from '@/data/mock'

// Screen 77 of 82: Message actions

const actionIcons = [Pin, Star, Forward, Eye]

function SelectedMessage() {
  return (
    <section className="animate-fade-up rounded-xl border border-white/[0.08] bg-ink-brown-800 p-4 shadow-2">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/40">Selected message</p>
        <PrivacyPill />
      </div>
      <ThreadMessage message={messageActionPreview.message} />
    </section>
  )
}

function ReactionGrid({ selected, onSelect }: { selected: string; onSelect: (reaction: string) => void }) {
  return (
    <section className="animate-fade-up" style={{ animationDelay: '80ms' }}>
      <SectionHeader title="Quick reactions" />
      <div className="grid grid-cols-2 gap-2">
        {messageActionPreview.quickReactions.map((reaction) => (
          <button
            key={reaction}
            type="button"
            aria-label={`React with ${reaction}`}
            aria-pressed={selected === reaction}
            onClick={() => onSelect(reaction)}
            className={[
              'h-11 rounded-pill border px-3 text-[13px] font-semibold leading-none transition-transform duration-[var(--dur-fast)] active:scale-[0.96]',
              selected === reaction
                ? 'border-brand-orange/30 bg-brand-orange/12 text-brand-orange'
                : 'border-white/[0.08] bg-white/[0.04] text-white/60',
            ].join(' ')}
          >
            {reaction}
          </button>
        ))}
      </div>
    </section>
  )
}

function ActionList({
  selected,
  onAction,
}: {
  selected: string[]
  onAction: (label: string) => void
}) {
  return (
    <section className="animate-fade-up" style={{ animationDelay: '140ms' }}>
      <SectionHeader title="Actions" />
      <div className="space-y-2">
        {messageActionPreview.actions.map((action, index) => {
          const Icon = actionIcons[index]
          return (
            <button
              key={action.label}
              type="button"
              aria-pressed={selected.includes(action.label)}
              onClick={() => onAction(action.label)}
              className={[
                'flex min-h-[66px] w-full items-center gap-3 rounded-lg border px-3 py-3 text-left shadow-1 transition-colors hover:border-brand-orange/25',
                selected.includes(action.label)
                  ? 'border-brand-orange/30 bg-brand-orange/10'
                  : 'border-white/[0.06] bg-ink-brown-800',
              ].join(' ')}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/60">
                <Icon size={17} strokeWidth={2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-semibold leading-[18px] text-white">{action.label}</span>
                <span className="mt-1 block text-[12px] leading-4 text-white/45">{action.detail}</span>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function MediaVault({ opened, onOpen }: { opened: string | null; onOpen: (title: string) => void }) {
  return (
    <section className="animate-fade-up" style={{ animationDelay: '200ms' }}>
      <SectionHeader title="Shared media" />
      <div className="grid grid-cols-3 gap-2">
        {messageActionPreview.media.map((item) => {
          const tone = domainToneClasses[item.domain]
          return (
            <button key={item.title} type="button" onClick={() => onOpen(item.title)} aria-label={opened === item.title ? `${item.title} opened this session` : `Open protected media ${item.title}`} className="min-h-[104px] rounded-lg border border-white/[0.06] bg-white/[0.04] p-2 text-left">
              <div className={`flex h-10 w-10 items-center justify-center rounded-sm ${tone.subtle} ${tone.text}`}>
                <Shield size={17} strokeWidth={2} />
              </div>
              <p className="mt-3 line-clamp-2 text-[12px] font-semibold leading-[16px] text-white">{item.title}</p>
              <p className="mt-1 line-clamp-2 text-[10px] leading-[13px] text-white/35">{opened === item.title ? 'Opened this session' : item.meta}</p>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function BottomAction() {
  return (
    <Link href="/tabs/sia/direct" className="flex h-12 w-full items-center justify-center gap-2 rounded-pill bg-brand-orange text-body font-semibold text-white" aria-label="Done, return to direct chat">
      <Shield size={16} strokeWidth={2.2} />
      Done
    </Link>
  )
}

export default function MessageActionsScreen() {
  const [reaction, setReaction] = useState(messageActionPreview.quickReactions[0])
  const [status, setStatus] = useState('Choose a reaction or action. Protected media opens only after confirmation.')
  const [confirmMedia, setConfirmMedia] = useState<string | null>(null)
  const [openedMedia, setOpenedMedia] = useState<string | null>(null)
  const [selectedActions, setSelectedActions] = useState<string[]>([])
  const [forwardOpen, setForwardOpen] = useState(false)

  const runAction = (label: string) => {
    if (label === 'Open view-once media') {
      setConfirmMedia('Hill segment')
      setStatus('Confirm before opening protected media.')
      return
    }
    if (label === 'Forward') {
      setForwardOpen(true)
      setStatus('Choose where to forward the selected message.')
      return
    }
    setSelectedActions((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label])
    setStatus(`${label} saved. You can undo from this surface before closing.`)
  }

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Message actions" showBack backHref="/tabs/sia/direct" />} activeTab="sia" bottomAction={<BottomAction />}>
        <main className="space-y-5 px-4 pb-6 pt-4">
          <div className="flex flex-wrap gap-2">
            <SignalPill tone="orange">View-once protected</SignalPill>
            <SignalPill tone="purple">SIA summarizes only selected context</SignalPill>
          </div>
          <SelectedMessage />
          <ReactionGrid selected={reaction} onSelect={(next) => { setReaction(next); setStatus(`${next} reaction saved.`) }} />
          <ActionList selected={selectedActions} onAction={runAction} />
          <MediaVault opened={openedMedia} onOpen={(title) => setConfirmMedia(title)} />
          <p className="text-caption leading-[18px] text-white/40" aria-live="polite">{status}</p>
        </main>
        {forwardOpen && (
          <section className="absolute inset-x-0 bottom-0 z-40 rounded-t-xl border border-white/[0.06] bg-ink-brown-800 px-4 pb-8 pt-3 shadow-3 animate-fade-up" role="dialog" aria-label="Forward message">
            <div className="mx-auto mb-4 h-1 w-9 rounded-pill bg-white/20" />
            <h2 className="text-h3 font-semibold leading-[22px] text-white">Forward selected message</h2>
            <p className="mt-2 text-caption leading-[18px] text-white/55">
              Forwarding creates a new copy. View-once media stays protected unless the recipient is allowed to open it.
            </p>
            <div className="mt-5 grid gap-2">
              <button className="h-11 rounded-pill bg-brand-orange text-[15px] font-semibold text-white" onClick={() => { setForwardOpen(false); setStatus('Forwarded to Morning crew without exposing SIA memory.') }}>
                Morning crew
              </button>
              <button className="h-11 rounded-pill border border-white/[0.06] bg-white/[0.04] text-[15px] font-semibold text-white/70" onClick={() => { setForwardOpen(false); setStatus('Sent to SIA as selected context only.') }}>
                Ask SIA privately
              </button>
              <button className="h-11 rounded-pill text-caption font-semibold text-white/45" onClick={() => setForwardOpen(false)}>
                Cancel
              </button>
            </div>
          </section>
        )}
        {confirmMedia && (
          <section className="absolute inset-x-0 bottom-0 z-40 rounded-t-xl border border-white/[0.06] bg-ink-brown-800 px-4 pb-8 pt-3 shadow-3 animate-fade-up" role="dialog" aria-label="Open protected media">
            <div className="mx-auto mb-4 h-1 w-9 rounded-pill bg-white/20" />
            <h2 className="text-h3 font-semibold leading-[22px] text-white">Open protected media?</h2>
            <p className="mt-2 text-caption leading-[18px] text-white/55">
              {confirmMedia} can be viewed once. SIA will not summarize this media unless you explicitly share it.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button className="h-11 rounded-pill bg-white/[0.06] text-[15px] font-semibold text-white/60" onClick={() => setConfirmMedia(null)}>Cancel</button>
              <button className="h-11 rounded-pill bg-brand-orange text-[15px] font-semibold text-white" onClick={() => { setOpenedMedia(confirmMedia); setConfirmMedia(null); setStatus(`${confirmMedia} opened. It will expire after this session.`) }}>Open once</button>
            </div>
          </section>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
