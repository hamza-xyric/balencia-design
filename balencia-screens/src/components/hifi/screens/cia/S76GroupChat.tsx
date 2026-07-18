'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Activity, AtSign, ChevronRight, Info, Plus, Sparkles, Users, WifiOff, Zap } from 'lucide-react'
import {
  BtnSecondary,
  ChatBubble,
  Chip,
  Composer,
  GlassCard,
  HifiShell,
  IconButton,
  MomentumBar,
  SafetyCard,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

type GroupChatState = 'default' | 'skeleton' | 'empty' | 'error' | 'offline' | 'disabled' | 'success'
type SendState = 'idle' | 'sending' | 'queued' | 'sent' | 'failed'
type GroupAction = 'export transcript' | 'revoke CIA recap' | 'delete own content and media' | 'report or mute a member' | 'leave Morning crew'

const GROUP_CHAT_STATES: GroupChatState[] = ['default', 'skeleton', 'empty', 'error', 'offline', 'disabled', 'success']
const members = [
  { initials: 'KT', name: 'Kenji', online: true },
  { initials: 'AK', name: 'Aisha', online: true },
  { initials: 'RS', name: 'Ravi', online: true },
  { initials: 'MP', name: 'Mina', online: false },
  { initials: 'AM', name: 'You', online: true },
]

function GroupActionDialog({ action, onCancel, onConfirm }: { action: GroupAction; onCancel: () => void; onConfirm: () => void }) {
  const panelRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    panelRef.current?.querySelector<HTMLButtonElement>('button')?.focus()
    return () => {
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onCancel()
      return
    }
    if (event.key !== 'Tab') return
    const focusable = [...(panelRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), [href], input:not(:disabled)') ?? [])]
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (!first || !last) return
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div className="absolute inset-0 z-[70] flex items-end bg-ink-900/85 px-4 pb-[48px]" role="presentation">
      <section id="group-action-dialog" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="group-action-title" className="glass-card w-full rounded-[24px] border border-white/10 bg-ink-brown-800 p-4 shadow-3" onKeyDown={handleKeyDown}>
        <h2 id="group-action-title" className="text-[16px] font-semibold text-paper-100">Confirm {action}?</h2>
        <p className="mt-2 text-[12px] leading-5 text-paper-100/75">This preview affects only {action === 'leave Morning crew' ? 'your membership in Morning crew' : action}. No server, provider, or member state will change.</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <BtnSecondary className="h-[52px] w-full px-2 text-[13px]" onClick={onCancel}>Cancel</BtnSecondary>
          <BtnSecondary className="h-[52px] w-full px-2 text-[13px]" onClick={onConfirm}>Confirm</BtnSecondary>
        </div>
      </section>
    </div>
  )
}

function AvatarStack({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Bundled presence fixture: 5 members, 4 shown online; not live"
      className="focus-ring flex min-h-11 items-center rounded-xl px-1 text-left"
      onClick={onClick}
    >
      <span aria-hidden="true" className="flex -space-x-2.5">
        {members.map(member => (
          <span
            key={member.initials}
            className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink-900 bg-white/10 text-[10px] font-semibold text-paper-100/80"
          >
            {member.initials}
            {member.online && <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink-900 bg-forest-green" />}
          </span>
        ))}
      </span>
      <span className="ml-2 text-[12px] text-paper-100/65">4 online · fixture</span>
    </button>
  )
}

export function S76GroupChat() {
  const [screenState, setScreenState] = useState<GroupChatState>('default')
  const [sendState, setSendState] = useState<SendState>('idle')
  const [outgoingText, setOutgoingText] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const [showMembers, setShowMembers] = useState(false)
  const [showRecap, setShowRecap] = useState(false)
  const [recapPosted, setRecapPosted] = useState(false)
  const [confirmAction, setConfirmAction] = useState<GroupAction | null>(null)
  const [status, setStatus] = useState('Group chat visual fixture ready. Nothing has been posted or synced.')
  const sendTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const outgoingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state') as GroupChatState | null
    if (!fixture || !GROUP_CHAT_STATES.includes(fixture)) return
    const timer = window.setTimeout(() => {
      setScreenState(fixture)
      setOutgoingText(fixture === 'error' ? 'I can lead the easy group.' : fixture === 'success' ? 'Meet at the lower trail gate tomorrow.' : '')
      setSendState(fixture === 'error' ? 'failed' : fixture === 'success' ? 'sent' : 'idle')
      setStatus(
        fixture === 'offline'
          ? 'Offline fixture. The cached thread is visible; new messages can only queue locally.'
          : fixture === 'disabled'
            ? 'Group actions are disabled by a local moderation fixture. Info and safety controls remain available.'
            : `${fixture} group chat fixture loaded.`,
      )
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => () => {
    if (sendTimer.current) clearTimeout(sendTimer.current)
  }, [])

  useEffect(() => {
    if (!outgoingText || sendState === 'idle') return
    const frame = window.requestAnimationFrame(() => {
      outgoingRef.current?.scrollIntoView({
        block: 'nearest',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [outgoingText, sendState])

  const completeSend = () => {
    if (sendTimer.current) clearTimeout(sendTimer.current)
    sendTimer.current = setTimeout(() => {
      setSendState('sent')
      setStatus('Message sent in this local outcome preview. No network request was made.')
    }, 520)
  }

  const sendMessage = (message: string) => {
    setOutgoingText(message)
    if (screenState === 'offline') {
      setSendState('queued')
      setStatus('Message queued locally while offline. Nothing was sent to the group.')
      return true
    }
    setSendState('sending')
    setStatus('Sending outcome preview started locally.')
    completeSend()
    return true
  }

  const disabled = screenState === 'disabled' || screenState === 'skeleton'
  const threadVisible = screenState !== 'empty' && screenState !== 'skeleton'

  return (
    <HifiShell
      atmosphere="cia"
      activeTab="cia"
      header={
        <TopBar
          title="Morning crew"
          eyebrow="5 members · mission room"
          right={
            <div className="flex items-center gap-1">
              <IconButton
                label="Add member"
                disabled={disabled}
                aria-describedby={disabled ? 'group-chat-live-status' : undefined}
                onClick={() => setStatus('Adding members is unavailable in this visual prototype. No invitation was sent.')}
              >
                <Plus className="h-5 w-5" strokeWidth={1.9} />
              </IconButton>
              <IconButton label="Group info" aria-expanded={showInfo} onClick={() => setShowInfo(value => !value)}>
                <Info className="h-5 w-5" strokeWidth={1.9} />
              </IconButton>
            </div>
          }
        />
      }
      composer={
        <div className="space-y-1.5">
          <button
            type="button"
            className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-pill px-3 text-[13px] font-medium text-paper-100/70 disabled:opacity-40"
            disabled={disabled}
            aria-describedby={disabled ? 'group-chat-live-status' : undefined}
            onClick={() => setStatus('Mention picker preview opened locally. No member was notified.')}
          >
            <AtSign aria-hidden="true" className="h-4 w-4" />
            Mention a member
          </button>
          <Composer
            placeholder="Message Morning crew"
            ariaLabel="Morning crew message composer"
            inputLabel="Message Morning crew"
            onAttach={() => setStatus('Attachment options are unavailable in this visual prototype.')}
            onSend={sendMessage}
            disabled={disabled}
            sendDisabled={sendState === 'sending'}
            disabledReasonId="group-chat-live-status"
            announceInternally={false}
            clearOnSend
          />
        </div>
      }
      overlay={confirmAction ? (
        <GroupActionDialog
          action={confirmAction}
          onCancel={() => { setConfirmAction(null); setStatus('Group action canceled. Nothing changed.') }}
          onConfirm={() => { setStatus(`${confirmAction} outcome preview confirmed locally. No server state changed.`); setConfirmAction(null) }}
        />
      ) : undefined}
    >
      <main
        className="space-y-3 px-4 pb-4 pt-3"
        data-group-chat-state={screenState}
        data-send-state={sendState}
        aria-busy={screenState === 'skeleton' || sendState === 'sending'}
      >
        {screenState === 'offline' && (
          <div className="flex items-start gap-2 rounded-2xl border border-white/10 bg-surface-2 px-4 py-3">
            <WifiOff aria-hidden="true" className="mt-0.5 h-4 w-4 text-paper-100/65" />
            <p className="text-[12px] leading-4 text-paper-100/70">Offline · cached thread shown. New messages queue locally only after Send message.</p>
          </div>
        )}

        {screenState === 'disabled' && (
          <div className="rounded-2xl border border-white/10 bg-surface-2 px-4 py-3 text-[12px] leading-4 text-paper-100/70">
            Group posting is unavailable in this moderation fixture. Group info and safety routes remain reachable.
          </div>
        )}

        {screenState === 'skeleton' ? (
          <div className="space-y-3" aria-label="Loading group chat preview">
            <div className="skeleton-block h-36 rounded-[24px]" />
            <div className="skeleton-block h-14 w-[75%] rounded-xl" />
            <div className="skeleton-block ml-auto h-20 w-[82%] rounded-[24px]" />
            <div className="skeleton-block h-16 rounded-xl" />
          </div>
        ) : (
          <>
            <GlassCard tone="you" className="!p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-paper-100/65">Room mission · bundled fixture</p>
                  <h2 className="mt-0.5 text-[18px] font-semibold leading-6 text-paper-100">Tempo run together</h2>
                </div>
                <AvatarStack onClick={() => setShowMembers(value => !value)} />
              </div>
              <div className="mt-3 flex items-center justify-between text-[12px] text-paper-100/65">
                <span>Members joining · fixture</span>
                <span className="font-semibold tabular-nums text-paper-100">4 of 5</span>
              </div>
              <div className="mt-2"><MomentumBar value={80} label="4 of 5 members joined" /></div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip tone="you"><Zap aria-hidden="true" className="mr-1 h-3 w-3" />120 group XP · fixture</Chip>
                <Chip tone="cia"><Sparkles aria-hidden="true" className="mr-1 h-3 w-3" />CIA pacing</Chip>
              </div>
            </GlassCard>

            {showMembers && (
              <section role="region" aria-labelledby="members-title">
                <SolidCard className="!p-3">
                  <div className="flex items-center justify-between gap-3"><h2 id="members-title" className="text-[14px] font-semibold text-paper-100">Morning crew members</h2><span className="text-[11px] text-paper-100/65">5 members · 4 online</span></div>
                  <ul className="mt-2 grid grid-cols-2 gap-2">
                    {members.map(member => (
                      <li key={member.name} className="flex min-h-11 items-center gap-2 rounded-xl bg-white/[0.03] px-3 text-[12px] text-paper-100/75">
                        <span aria-hidden="true" className={`h-2 w-2 rounded-full ${member.online ? 'bg-forest-green' : 'bg-paper-100/30'}`} />
                        {member.name}
                      </li>
                    ))}
                  </ul>
                </SolidCard>
              </section>
            )}

            {showInfo && (
              <GlassCard tone="muted" className="!p-4" aria-label="Group info and privacy controls">
                <div className="flex items-start gap-3">
                  <Users aria-hidden="true" className="mt-0.5 h-5 w-5 text-brand-orange" />
                  <div>
                    <h2 className="text-[16px] font-semibold text-paper-100">Group info</h2>
                    <p className="mt-1 text-[12px] leading-5 text-paper-100/70">Audience: 5 Morning crew members · visibility: room only · CIA recap permission: private preview.</p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {(['export transcript', 'revoke CIA recap', 'delete own content and media', 'report or mute a member', 'leave Morning crew'] as GroupAction[]).map(action => (
                    <BtnSecondary
                      key={action}
                      className="min-h-12 h-auto px-3 py-2 text-[12px]"
                      aria-haspopup="dialog"
                      aria-expanded={confirmAction === action}
                      aria-controls={confirmAction === action ? 'group-action-dialog' : undefined}
                      onClick={() => setConfirmAction(action)}
                    >
                      {action.charAt(0).toUpperCase() + action.slice(1)}
                    </BtnSecondary>
                  ))}
                </div>
                <div className="mt-3"><SafetyCard title="Private safety support" /></div>
              </GlassCard>
            )}

            {screenState === 'empty' ? (
              <SolidCard className="py-8 text-center">
                <p className="text-[16px] font-semibold text-paper-100">Start the room conversation</p>
                <p className="mt-1 text-[13px] text-paper-100/70">Your message will be visible to all 5 members.</p>
              </SolidCard>
            ) : threadVisible ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 py-1 text-[12px] text-paper-100/60"><span className="h-px flex-1 bg-white/[0.08]" />Today<span className="h-px flex-1 bg-white/[0.08]" /></div>
                <ChatBubble speaker="Kenji" messageId="kenji-tempo-day" status="delivered" source="Bundled group thread fixture" audience="Morning crew · 5 members" timestamp="8:42 am" dateTime="2026-07-10T08:42:00+05:00">
                  Tomorrow is tempo day.
                </ChatBubble>
                <ChatBubble speaker="CIA" tone="cia" messageId="cia-private-recap" status={recapPosted ? 'sent' : 'draft'} source={recapPosted ? 'Bundled pace context · explicitly posted' : 'Bundled pace context · estimated'} audience={recapPosted ? 'Morning crew · 5 members' : 'private-to-you'} timestamp={recapPosted ? 'Now' : '8:44 am'} dateTime={recapPosted ? '2026-07-10T08:45:00+05:00' : '2026-07-10T08:44:00+05:00'}>
                  {recapPosted ? 'Three members share a similar pace threshold.' : 'Three members share a similar pace threshold. Private recap — review before posting.'}
                </ChatBubble>
                {!recapPosted && <BtnSecondary className="w-full" aria-expanded={showRecap} onClick={() => setShowRecap(true)}>Open private CIA recap</BtnSecondary>}
                {showRecap && !recapPosted && (
                  <section role="region" aria-labelledby="recap-title">
                    <GlassCard tone="cia" className="!p-4">
                    <h2 id="recap-title" className="text-[16px] font-semibold text-paper-100">Post CIA recap?</h2>
                    <p className="mt-2 text-[12px] leading-5 text-paper-100/75">Source: bundled pace fixture · freshness: not connected · current audience: private to you · posting audience: all 5 Morning crew members.</p>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <BtnSecondary className="h-[52px] w-full px-2 text-[13px]" onClick={() => { setShowRecap(false); setStatus('CIA recap kept private. Nothing was posted.') }}>Cancel</BtnSecondary>
                      <BtnSecondary className="h-[52px] w-full px-2 text-[13px]" onClick={() => { setRecapPosted(true); setShowRecap(false); setStatus('CIA recap posted in this local visual fixture only. No network request was made.') }}>Post recap</BtnSecondary>
                    </div>
                    </GlassCard>
                  </section>
                )}
                <button
                  type="button"
                  aria-label="Open group tempo mission"
                  className="focus-ring flex min-h-[64px] w-full items-center gap-3 rounded-xl border border-white/10 bg-surface-2 p-3 text-left"
                  onClick={() => setStatus('Open group tempo mission preview selected. No route navigation occurred.')}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-orange/15 text-brand-orange"><Activity aria-hidden="true" className="h-5 w-5" /></span>
                  <span className="min-w-0 flex-1"><span className="block truncate text-[14px] font-semibold text-paper-100">Tempo run, 5 miles</span><span className="mt-0.5 block text-[11px] text-paper-100/65">Proposed route · park loop</span></span>
                  <ChevronRight aria-hidden="true" className="h-4 w-4 text-paper-100/40" />
                  <span className="sr-only">Open group tempo mission</span>
                </button>
                <Link href="/screens/77" className="focus-ring inline-flex min-h-11 items-center rounded-pill px-3 text-[12px] font-medium text-paper-100/70">
                  Open message actions
                </Link>
                <ChatBubble speaker="You" messageId="you-easy-group" status="read" source="Bundled group thread fixture" audience="Morning crew · 5 members" timestamp="8:48 am" dateTime="2026-07-10T08:48:00+05:00">
                  I can lead the easy group.
                </ChatBubble>
                {outgoingText && (
                  <div ref={outgoingRef} className="scroll-mb-3" aria-busy={sendState === 'sending'} data-testid="group-chat-outgoing">
                    <ChatBubble
                      speaker="You"
                      messageId="you-local-group-outgoing"
                      status={sendState === 'sending' || sendState === 'idle' ? 'draft' : sendState}
                      source={sendState === 'sent' ? 'Local visual fixture' : 'Local draft · intended for Morning crew'}
                      audience={sendState === 'sent' ? 'Morning crew · 5 members' : 'private-to-you'}
                      timestamp="Now"
                      dateTime="2026-07-10T08:50:00+05:00"
                    >
                      {outgoingText}
                    </ChatBubble>
                    {sendState === 'failed' && <div className="mt-2 flex justify-end"><BtnSecondary onClick={() => { setSendState('sending'); setStatus('Retrying local send preview. Nothing was sent yet.'); completeSend() }}>Retry sending</BtnSecondary></div>}
                  </div>
                )}
                <p className="flex items-center gap-2 px-1 text-[12px] text-paper-100/65"><span aria-hidden="true" className="flex gap-1"><i className="voice-status-pulse h-1.5 w-1.5 rounded-full bg-royal-purple" /><i className="voice-status-pulse h-1.5 w-1.5 rounded-full bg-royal-purple [animation-delay:120ms]" /><i className="voice-status-pulse h-1.5 w-1.5 rounded-full bg-royal-purple [animation-delay:240ms]" /></span>CIA is preparing a private pace summary</p>
              </div>
            ) : null}
          </>
        )}

        <p id="group-chat-live-status" className="min-h-5 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">
          {status}
        </p>
      </main>
    </HifiShell>
  )
}
