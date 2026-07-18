'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Activity, AlertTriangle, Check, Info, Phone, ShieldCheck, Sparkles, WifiOff } from 'lucide-react'
import {
  BtnSecondary,
  ChatBubble,
  Chip,
  Composer,
  GlassCard,
  HifiShell,
  IconButton,
  MomentumBar,
  Provenance,
  SafetyCard,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

type DirectChatState = 'default' | 'skeleton' | 'empty' | 'error' | 'offline' | 'blocked' | 'assist-revoked'
type DeliveryState = 'idle' | 'sending' | 'queued' | 'sent' | 'read' | 'failed'

const DIRECT_CHAT_STATES: DirectChatState[] = ['default', 'skeleton', 'empty', 'error', 'offline', 'blocked', 'assist-revoked']

function HealthShareDialog({ onCancel, onShare }: { onCancel: () => void; onShare: () => void }) {
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
      <section ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="health-share-title" className="glass-card w-full rounded-[24px] border border-white/10 bg-ink-brown-800 p-4 shadow-3" onKeyDown={handleKeyDown}>
        <h2 id="health-share-title" className="text-[16px] font-semibold text-paper-100">Share health source?</h2>
        <p className="mt-2 text-[12px] leading-5 text-paper-100/75">Source: bundled recovery fixture · freshness: not connected · audience: Aisha · scope: this message only.</p>
        <p className="mt-2 flex items-center gap-2 text-[12px] text-paper-100/70">
          <ShieldCheck aria-hidden="true" className="h-4 w-4" />
          The CIA draft remains private until you send your own message.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <BtnSecondary className="h-[52px] w-full px-2 text-[13px]" onClick={onCancel}>Cancel</BtnSecondary>
          <BtnSecondary className="h-[52px] w-full px-2 text-[13px]" onClick={onShare}>Share with Aisha</BtnSecondary>
        </div>
      </section>
    </div>
  )
}

export function S75DirectChat() {
  const [screenState, setScreenState] = useState<DirectChatState>('default')
  const [delivery, setDelivery] = useState<DeliveryState>('idle')
  const [outgoingText, setOutgoingText] = useState('')
  const [assistMode, setAssistMode] = useState<'pace' | 'shared' | 'private'>('private')
  const [showInfo, setShowInfo] = useState(false)
  const [showHealthConsent, setShowHealthConsent] = useState(false)
  const [healthShared, setHealthShared] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const [status, setStatus] = useState('Direct chat visual fixture ready. No call, upload, or message request has been made.')
  const deliveryTimers = useRef<Array<ReturnType<typeof setTimeout>>>([])
  const outgoingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state') as DirectChatState | null
    if (!fixture || !DIRECT_CHAT_STATES.includes(fixture)) return
    const timer = window.setTimeout(() => {
      setScreenState(fixture)
      setOutgoingText(fixture === 'error' ? 'The river route works for me.' : '')
      setDelivery(fixture === 'error' ? 'failed' : 'idle')
      setStatus(
        fixture === 'offline'
          ? 'Offline fixture. New messages queue only after you press Send message.'
          : fixture === 'blocked'
            ? 'Messaging is unavailable because this thread is blocked.'
            : fixture === 'assist-revoked'
              ? 'CIA assist is off for this thread. Peer messaging remains available.'
              : `${fixture} direct chat fixture loaded.`,
      )
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => () => {
    deliveryTimers.current.forEach(timer => clearTimeout(timer))
  }, [])

  useEffect(() => {
    if (!outgoingText || delivery === 'idle') return
    const frame = window.requestAnimationFrame(() => {
      outgoingRef.current?.scrollIntoView({
        block: 'nearest',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [delivery, outgoingText])

  const completeDelivery = () => {
    deliveryTimers.current.forEach(timer => clearTimeout(timer))
    deliveryTimers.current = [
      setTimeout(() => {
        setDelivery('sent')
        setStatus('Message sent in this local visual fixture. No network request was made.')
      }, 420),
      setTimeout(() => {
        setDelivery('read')
        setStatus('Read outcome fixture shown locally. No receipt was received from a server.')
      }, 820),
    ]
  }

  const sendMessage = (message: string) => {
    setOutgoingText(message)
    if (screenState === 'offline') {
      setDelivery('queued')
      setStatus('Message queued locally while offline. Nothing was sent.')
      return true
    }
    setDelivery('sending')
    setStatus('Sending outcome preview started locally.')
    completeDelivery()
    return true
  }

  const retryMessage = () => {
    setDelivery('sending')
    setStatus('Retrying the local delivery preview. No network request was made.')
    completeDelivery()
  }

  const assistRevoked = screenState === 'assist-revoked'
  const threadBlocked = screenState === 'blocked'
  const composerDisabled = threadBlocked || screenState === 'skeleton'

  const setAssist = (mode: typeof assistMode) => {
    setAssistMode(mode)
    const labels = {
      pace: 'Pacing help selected. The CIA draft remains private to you.',
      shared: 'Shared mission context selected. Nothing was posted to Aisha.',
      private: 'Private CIA context selected. Aisha cannot see it unless you send it.',
    }
    setStatus(labels[mode])
  }

  const insertPrivateDraft = () => {
    const input = document.querySelector<HTMLInputElement>('input[aria-label="Message Aisha"]')
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
    if (!input || !setter) {
      setStatus('Private draft remains available, but the local composer preview could not be updated.')
      return
    }
    setter.call(input, 'The river route works for me if we keep the first climb easy.')
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.focus()
    setStatus('Private CIA draft inserted into your editable composer. Nothing was sent or shared.')
  }

  const thread = screenState === 'empty' ? (
    <SolidCard className="text-center">
      <p className="text-[16px] font-semibold text-paper-100">Start the first message</p>
      <p className="mt-1 text-[13px] leading-5 text-paper-100/70">Aisha is here if you need help.</p>
    </SolidCard>
  ) : (
    <div className="space-y-3">
      <ChatBubble
        speaker="Aisha"
        messageId="aisha-route-plan"
        status="delivered"
        source="Bundled thread fixture"
        audience="you and Aisha"
        timestamp="9:02 am"
        dateTime="2026-07-10T09:02:00+05:00"
      >
        I am thinking of the river route this Sunday.
      </ChatBubble>

      {!assistRevoked && (
        <ChatBubble
          speaker="CIA"
          tone="cia"
          messageId="cia-private-draft"
          status="draft"
          source="Recovery context · estimated low confidence"
          audience="private-to-you"
          timestamp="9:03 am"
          dateTime="2026-07-10T09:03:00+05:00"
        >
          Private draft: recent recovery context may support the river route. Review the source before sharing.
        </ChatBubble>
      )}

      {!assistRevoked && (
        <div className="grid grid-cols-2 gap-2">
          <Chip
            interactive
            tone="you"
            className="w-full"
            onClick={insertPrivateDraft}
          >
            Insert draft
          </Chip>
          <Chip interactive className="w-full" onClick={() => setShowHealthConsent(true)}>
            Share health source
          </Chip>
        </div>
      )}

      <ChatBubble
        speaker="You"
        messageId="you-works"
        status="read"
        source="Bundled thread fixture"
        audience="you and Aisha"
        timestamp="9:05 am"
        dateTime="2026-07-10T09:05:00+05:00"
      >
        Works.
      </ChatBubble>

      <ChatBubble
        speaker="Aisha"
        messageId="aisha-hill-photo"
        status="delivered"
        source="Bundled attachment fixture"
        audience="you and Aisha"
        timestamp="9:08 am"
        dateTime="2026-07-10T09:08:00+05:00"
      >
        Hill segment photo attached.
      </ChatBubble>

      <figure
        className="overflow-hidden rounded-xl border border-white/10 bg-surface-2"
        data-attachment-source="bundled-hill-fixture"
        data-attachment-retention="visual-preview-only"
      >
        {imageFailed ? (
          <div className="flex aspect-video items-center justify-center gap-2 text-[13px] text-paper-100/70">
            <Activity aria-hidden="true" className="h-5 w-5 text-brand-orange" />
            Media preview unavailable
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/hifi-assets/HIFI-75-01-hill-segment.png"
            alt="Dusk trail rising along a quiet ridge"
            className="aspect-video w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
        <figcaption className="p-3">
          <Provenance items={['Attachment fixture', 'Preview only', 'Retention not connected']} />
        </figcaption>
      </figure>

      <Link href="/screens/77" className="focus-ring inline-flex min-h-11 items-center rounded-pill px-3 text-[12px] font-medium text-paper-100/70">
        Open message actions
      </Link>

      {outgoingText && (
        <div ref={outgoingRef} className="scroll-mb-3" aria-busy={delivery === 'sending'} data-testid="direct-chat-outgoing">
          <ChatBubble
            speaker="You"
            messageId="you-local-outgoing"
            status={delivery === 'sending' ? 'draft' : delivery === 'idle' ? 'draft' : delivery}
            source={['sent', 'read'].includes(delivery) ? 'Local visual fixture' : 'Local draft · intended for Aisha'}
            audience={['sent', 'read'].includes(delivery) ? 'you and Aisha' : 'private-to-you'}
            timestamp="Now"
            dateTime="2026-07-10T09:10:00+05:00"
          >
            {outgoingText}
          </ChatBubble>
          {delivery === 'failed' && (
            <div className="mt-2 flex justify-end">
              <BtnSecondary onClick={retryMessage}>Retry sending</BtnSecondary>
            </div>
          )}
        </div>
      )}

      <p className="flex items-center gap-2 px-1 text-[13px] text-paper-100/70">
        <span aria-hidden="true" className="flex gap-1">
          <i className="voice-status-pulse h-1.5 w-1.5 rounded-full bg-royal-purple" />
          <i className="voice-status-pulse h-1.5 w-1.5 rounded-full bg-royal-purple [animation-delay:120ms]" />
          <i className="voice-status-pulse h-1.5 w-1.5 rounded-full bg-royal-purple [animation-delay:240ms]" />
        </span>
        Bundled activity preview · Aisha typing · not live
      </p>
    </div>
  )

  return (
    <HifiShell
      atmosphere="cia"
      header={
        <TopBar
          title="Aisha Khan"
          right={
            <>
              <IconButton
                label="Call"
                disabled={threadBlocked}
                aria-describedby={threadBlocked ? 'direct-chat-live-status' : undefined}
                onClick={() => setStatus('Calls are unavailable in this visual prototype. No call was placed.')}
              >
                <Phone size={18} />
              </IconButton>
              <IconButton label="Info" aria-expanded={showInfo} onClick={() => setShowInfo(value => !value)}>
                <Info size={18} />
              </IconButton>
            </>
          }
        />
      }
      activeTab="cia"
      composer={
        <Composer
          placeholder="Message Aisha"
          ariaLabel="Aisha message composer"
          inputLabel="Message Aisha"
          onAttach={() => setStatus('Attachment options are unavailable. The existing hill fixture remains unchanged.')}
          onSend={sendMessage}
          disabled={composerDisabled}
          sendDisabled={delivery === 'sending'}
          disabledReasonId="direct-chat-live-status"
          announceInternally={false}
          clearOnSend
        />
      }
      overlay={showHealthConsent ? (
        <HealthShareDialog
          onCancel={() => { setShowHealthConsent(false); setStatus('Health sharing canceled. Nothing was shared.') }}
          onShare={() => { setHealthShared(true); setShowHealthConsent(false); setStatus('Health source approved for this local draft only. Nothing was sent.') }}
        />
      ) : undefined}
    >
      <main
        className="space-y-3 px-4 pb-4 pt-3"
        data-direct-chat-state={screenState}
        data-delivery-state={delivery}
        aria-busy={delivery === 'sending' || screenState === 'skeleton'}
      >
        {screenState === 'offline' && (
          <div className="flex items-start gap-2 rounded-2xl border border-white/10 bg-surface-2 px-4 py-3">
            <WifiOff aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-paper-100/70" />
            <p className="text-[12px] leading-4 text-paper-100/75">Offline · drafts stay editable and send only queues after you press Send message.</p>
          </div>
        )}
        {threadBlocked && (
          <div className="flex items-start gap-2 rounded-2xl border border-white/10 bg-surface-2 px-4 py-3">
            <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
            <p className="text-[12px] leading-4 text-paper-100/75">Thread blocked · messaging, calling, and CIA assist are unavailable. Info and safety controls remain reachable.</p>
          </div>
        )}

        {screenState === 'skeleton' ? (
          <div className="space-y-3" aria-label="Loading direct chat preview">
            <div className="skeleton-block h-20 rounded-xl" />
            <div className="skeleton-block h-24 rounded-[28px]" />
            <div className="skeleton-block h-16 w-[78%] rounded-xl" />
            <div className="skeleton-block ml-auto h-14 w-[62%] rounded-xl" />
          </div>
        ) : (
          <>
            <SolidCard className="!p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange/15 text-[14px] font-semibold text-brand-orange">AK</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-[14px] font-semibold text-paper-100">Shared mission · Run 30 min</h2>
                      <p className="mt-0.5 text-[12px] text-paper-100/70">Bundled progress fixture</p>
                    </div>
                    <span className="text-[12px] font-semibold tabular-nums text-paper-100">62%</span>
                  </div>
                  <div className="mt-2"><MomentumBar value={62} label="Shared mission progress, 62 percent" /></div>
                </div>
              </div>
            </SolidCard>

            <GlassCard tone="cia" className={assistRevoked ? 'opacity-60' : undefined}>
              <div className="flex items-start gap-3">
                <Sparkles aria-hidden="true" size={18} className="mt-1 text-royal-purple" />
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-royal-purple">CIA assist · private</p>
                  <p className="mt-2 text-[13px] leading-[18px] text-paper-100/75">
                    {assistRevoked
                      ? 'Assist permission is revoked. Aisha cannot see any CIA suggestion.'
                      : 'Suggestions stay private to you until you choose what to send.'}
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {(['pace', 'shared', 'private'] as const).map(mode => (
                      <Chip
                        key={mode}
                        interactive
                        pressed={assistMode === mode}
                        disabled={assistRevoked || threadBlocked}
                        aria-describedby={assistRevoked || threadBlocked ? 'direct-chat-live-status' : undefined}
                        onClick={() => setAssist(mode)}
                        className="px-2 capitalize"
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            {showInfo && (
              <GlassCard tone="muted" className="!p-4" aria-label="Thread info and privacy controls">
                <h2 className="text-[16px] font-semibold text-paper-100">Thread info</h2>
                <p className="mt-1 text-[12px] leading-5 text-paper-100/70">CIA access is per-thread. All actions below are local outcome previews.</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {['Export thread', 'Revoke CIA assist', 'Delete summaries', 'Clear media', 'Report Aisha', 'Mute or block'].map(action => (
                    <BtnSecondary key={action} className="min-h-11 px-3 text-[12px]" onClick={() => setStatus(`${action} outcome preview opened. No account or server state changed.`)}>
                      {action}
                    </BtnSecondary>
                  ))}
                </div>
                <div className="mt-3"><SafetyCard title="Support and safety" /></div>
              </GlassCard>
            )}

            {healthShared && (
              <p className="flex items-center gap-2 rounded-xl border border-forest-green/25 bg-forest-green/10 px-3 py-2 text-[12px] text-paper-100/75">
                <Check aria-hidden="true" className="h-4 w-4 text-forest-green" />
                Health source approved for this draft only · not sent
              </p>
            )}

            <div className="flex items-center gap-3 py-1 text-[12px] text-paper-100/60"><span className="h-px flex-1 bg-white/[0.08]" />Today<span className="h-px flex-1 bg-white/[0.08]" /></div>
            {thread}
          </>
        )}

        <p id="direct-chat-live-status" className="min-h-5 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">
          {status}
        </p>
      </main>
    </HifiShell>
  )
}
