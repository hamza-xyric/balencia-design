'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy, Download, EyeOff, Flag, Forward, Map, Pin, RotateCcw, Shield, Sparkles, Star, Trash2, WifiOff } from 'lucide-react'
import { BtnPrimary, Chip, GlassCard, HifiShell, SectionTitle, TopBar } from '@/components/hifi/kit'

type MessageActionsState = 'default' | 'skeleton' | 'empty' | 'error' | 'offline' | 'disabled' | 'success'
type Reaction = 'none' | 'useful' | 'support' | 'done' | 'insight'
type ConfirmAction = 'remove this message from my view' | 'revoke this CIA summary' | 'report this message' | 'block Aisha'

const MESSAGE_ACTION_STATES: MessageActionsState[] = ['default', 'skeleton', 'empty', 'error', 'offline', 'disabled', 'success']
const reactions: Array<{ value: Exclude<Reaction, 'none'>; label: string }> = [
  { value: 'useful', label: 'Useful' },
  { value: 'support', label: 'Support' },
  { value: 'done', label: 'Done' },
  { value: 'insight', label: 'Insight' },
]

export function S77MessageActions() {
  const [screenState, setScreenState] = useState<MessageActionsState>('default')
  const [reaction, setReaction] = useState<Reaction>('none')
  const [deleted, setDeleted] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null)
  const [status, setStatus] = useState('Message action fixture ready. No clipboard, account, or network action has occurred.')
  const cancelRef = useRef<HTMLButtonElement>(null)
  const confirmRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const messageUnavailable = deleted || screenState === 'empty'
  const generalDisabled = messageUnavailable || screenState === 'disabled'
  const destructiveRestricted = generalDisabled || screenState === 'offline'

  const closeConfirmation = (message = 'Action canceled. Nothing changed.') => {
    setConfirmAction(null)
    setStatus(message)
    window.setTimeout(() => returnFocusRef.current?.focus(), 0)
  }

  const openConfirmation = (action: ConfirmAction) => {
    if (messageUnavailable) {
      setStatus('No selected message is available for that action.')
      return
    }
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setConfirmAction(action)
  }

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state') as MessageActionsState | null
    if (!fixture || !MESSAGE_ACTION_STATES.includes(fixture)) return
    const timer = window.setTimeout(() => {
      setScreenState(fixture)
      setDeleted(fixture === 'error')
      setReaction(fixture === 'success' ? 'done' : 'none')
      setStatus(
        fixture === 'offline'
          ? 'Offline fixture. Reactions queue locally; sharing and destructive actions are unavailable.'
          : fixture === 'error'
            ? 'Message no longer available. Done remains available.'
            : `${fixture} message actions fixture loaded.`,
      )
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!confirmAction) return
    cancelRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeConfirmation()
        return
      }
      if (event.key !== 'Tab') return
      const first = cancelRef.current
      const last = confirmRef.current
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [confirmAction])

  const chooseReaction = (next: Exclude<Reaction, 'none'>) => {
    setReaction(next)
    setStatus(
      screenState === 'offline'
        ? `${next} reaction queued locally while offline.`
        : `${next} reaction selected in this local fixture.`,
    )
  }

  const copySelectedMessage = async () => {
    if (messageUnavailable) {
      setStatus('Copy unavailable because no message is selected.')
      return
    }
    try {
      await navigator.clipboard.writeText('Perfect. I added the hill loop near the reservoir.')
      setScreenState('success')
      setStatus('Selected message copied after your explicit action.')
    } catch {
      setScreenState('success')
      setStatus('Copy unavailable. The selected message remains unchanged and no clipboard write completed.')
    }
  }

  const confirmCurrentAction = () => {
    if (!confirmAction) return
    if (confirmAction === 'remove this message from my view') {
      setDeleted(true)
      setReaction('none')
      setScreenState('success')
      closeConfirmation('Aisha’s message and attached media were hidden from your local view. No sender, account, or server state changed.')
      return
    }
    closeConfirmation(`${confirmAction} outcome confirmed locally. No account or server state changed.`)
  }

  return (
    <HifiShell atmosphere="cia" showTabBar={false}>
      <div className="relative flex h-full flex-col overflow-hidden" data-message-actions-state={screenState} data-reaction={reaction} aria-busy={screenState === 'skeleton'}>
        <div aria-hidden="true" className="absolute inset-0 space-y-3 px-4 pt-8 opacity-20">
          <div className="h-12 rounded-xl bg-white/[0.08]" />
          <div className="h-20 w-3/4 rounded-xl bg-white/[0.08]" />
          <div className="ml-auto h-16 w-2/3 rounded-xl bg-brand-orange/10" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-ink-900/80 backdrop-blur-md" />

        <section className="relative z-10 mt-10 flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-[28px] border-t border-white/10 bg-ink-900/95 shadow-[0_-24px_80px_rgba(33,16,8,.5)]">
          <TopBar
            title={<>Message <span className="text-emphasis">actions</span></>}
            right={
              <button type="button" className="focus-ring min-h-11 rounded-pill" onClick={() => setStatus('CIA summary source: bundled visual fixture. Permission remains revocable.') }>
                <Chip tone="cia"><Sparkles aria-hidden="true" className="mr-1 h-3 w-3" />CIA summary</Chip>
              </button>
            }
          />

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-5 pt-1 hide-scrollbar" data-message-actions-scroll>
            {screenState === 'offline' && (
              <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-surface-2 px-3 py-2 text-[12px] leading-4 text-paper-100/70">
                <WifiOff aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />Offline · reactions queue locally. Forward and destructive actions are disabled.
              </div>
            )}

            {screenState === 'skeleton' ? (
              <div className="space-y-3" aria-label="Loading message actions preview">
                <div className="skeleton-block h-52 rounded-[24px]" />
                <div className="skeleton-block h-16 rounded-xl" />
                <div className="skeleton-block h-44 rounded-2xl" />
                <div className="skeleton-block h-24 rounded-xl" />
              </div>
            ) : (
              <>
                <GlassCard tone="muted" className="!p-4">
                  {deleted || screenState === 'empty' ? (
                    <div className="py-5 text-center">
                      <Trash2 aria-hidden="true" className="mx-auto h-6 w-6 text-brand-orange" />
                      <p className="mt-2 text-[15px] font-semibold text-paper-100">{deleted ? 'Message no longer available' : 'No message selected'}</p>
                      <p className="mt-1 text-[12px] leading-5 text-paper-100/65">{deleted ? 'The selected peer message and its media are hidden from this local view. Done remains reachable.' : 'Choose a message in a thread to review its actions. No media is loaded.'}</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[10px] font-semibold text-paper-100/80">AK</span>
                          <span className="text-[13px] font-semibold text-paper-100">Aisha Khan</span>
                          <time dateTime="2026-07-10T09:41:00+05:00" className="text-[12px] tabular-nums text-paper-100/60">9:41 am</time>
                        </div>
                        <Chip tone="muted"><EyeOff aria-hidden="true" className="mr-1 h-3 w-3" />Private</Chip>
                      </div>
                      <p className="mt-3 text-[14px] leading-5 text-paper-100/90">Perfect. I added the hill loop near the reservoir.</p>
                      <div className="mt-3 flex flex-wrap gap-2"><Chip tone="cia">CIA summarized</Chip><Chip tone="muted">Audience · you and Aisha</Chip></div>
                      <figure className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-surface-2" data-attachment-source="bundled-hill-fixture" data-attachment-retention="visual-preview-only">
                        {imageFailed ? (
                          <div className="flex aspect-video items-center justify-center text-[12px] text-paper-100/65">Media preview unavailable</div>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src="/hifi-assets/HIFI-75-01-hill-segment.png" alt="Dusk trail rising along a quiet ridge" className="aspect-video w-full object-cover" onError={() => setImageFailed(true)} />
                        )}
                        <figcaption className="px-3 py-2 text-[11px] leading-4 text-paper-100/65">Hill segment · bundled attachment fixture · preview only · retention not connected</figcaption>
                      </figure>
                    </>
                  )}
                </GlassCard>

                <section aria-labelledby="reaction-title">
                  <SectionTitle title="Quick reactions" meta={screenState === 'offline' ? 'Queues locally' : 'Local preview'} />
                  <h2 id="reaction-title" className="sr-only">Quick reactions</h2>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {reactions.map(item => (
                      <button
                        key={item.value}
                        type="button"
                        aria-label={item.value === 'done' ? 'Done reaction' : item.label}
                        aria-pressed={reaction === item.value}
                        disabled={generalDisabled}
                        aria-describedby={generalDisabled ? 'message-actions-live-status' : undefined}
                        className={`focus-ring flex min-h-11 items-center justify-center gap-1 rounded-xl border px-1 text-[11px] font-semibold disabled:opacity-40 ${reaction === item.value ? 'border-brand-orange bg-brand-orange/15 text-brand-orange' : 'border-white/10 bg-white/[0.04] text-paper-100/75'}`}
                        onClick={() => chooseReaction(item.value)}
                      >
                        {item.value === 'useful' && <Check aria-hidden="true" className="h-3.5 w-3.5" />}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section aria-label="Message actions">
                  <SectionTitle title="Actions" />
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    <button type="button" disabled={generalDisabled} aria-describedby={generalDisabled ? 'message-actions-live-status' : undefined} className="focus-ring flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] text-[12px] text-paper-100/75 disabled:opacity-40" onClick={() => setStatus('Message pinned in this local fixture.')}><Pin aria-hidden="true" className="h-4 w-4" />Pin</button>
                    <button type="button" disabled={generalDisabled} aria-describedby={generalDisabled ? 'message-actions-live-status' : undefined} className="focus-ring flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] text-[12px] text-paper-100/75 disabled:opacity-40" onClick={() => setStatus('Message starred in this local fixture.')}><Star aria-hidden="true" className="h-4 w-4" />Star</button>
                    <button type="button" disabled={generalDisabled} aria-describedby={generalDisabled ? 'message-actions-live-status' : undefined} className="focus-ring flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] text-[12px] text-paper-100/75 disabled:opacity-40" onClick={copySelectedMessage}><Copy aria-hidden="true" className="h-4 w-4" />Copy</button>
                    <button type="button" disabled aria-label="Forward, off for this thread" className="flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-xl border border-white/5 bg-white/[0.02] text-[12px] text-paper-100/35"><Forward aria-hidden="true" className="h-4 w-4" />Forward</button>
                  </div>

                  <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                    <button type="button" disabled={generalDisabled} aria-describedby={generalDisabled ? 'message-actions-live-status' : undefined} className="focus-ring flex min-h-[52px] w-full items-center gap-3 px-4 text-left text-[13px] text-paper-100/80 disabled:opacity-40" onClick={() => openConfirmation('report this message')}><Flag aria-hidden="true" className="h-4 w-4 text-paper-100/50" />Report message</button>
                    <div className="mx-4 border-t border-white/[0.06]" />
                    <button type="button" disabled={generalDisabled} aria-describedby={generalDisabled ? 'message-actions-live-status' : undefined} className="focus-ring flex min-h-[52px] w-full items-center gap-3 px-4 text-left text-[13px] text-paper-100/80 disabled:opacity-40" onClick={() => openConfirmation('block Aisha')}><Shield aria-hidden="true" className="h-4 w-4 text-paper-100/50" />Mute or block sender</button>
                    <div className="mx-4 border-t border-white/[0.06]" />
                    <button type="button" disabled={generalDisabled} aria-describedby={generalDisabled ? 'message-actions-live-status' : undefined} className="focus-ring flex min-h-[52px] w-full items-center gap-3 px-4 text-left text-[13px] text-paper-100/80 disabled:opacity-40" onClick={() => setStatus('Export preview selected. File export is unavailable; no data left this device.')}><Download aria-hidden="true" className="h-4 w-4 text-paper-100/50" />Export thread data</button>
                    <div className="mx-4 border-t border-white/[0.06]" />
                    <button type="button" disabled={destructiveRestricted} aria-describedby={destructiveRestricted ? 'message-actions-live-status' : undefined} className="focus-ring flex min-h-[52px] w-full items-center gap-3 px-4 text-left text-[13px] text-paper-100/80 disabled:opacity-40" onClick={() => openConfirmation('revoke this CIA summary')}><RotateCcw aria-hidden="true" className="h-4 w-4 text-paper-100/50" />Revoke CIA summary</button>
                    <div className="mx-4 border-t border-white/[0.06]" />
                    <button type="button" disabled={destructiveRestricted} aria-describedby={destructiveRestricted ? 'message-actions-live-status' : undefined} className="focus-ring flex min-h-[52px] w-full items-center gap-3 px-4 text-left text-[13px] text-brand-orange disabled:opacity-40" onClick={() => openConfirmation('remove this message from my view')}><Trash2 aria-hidden="true" className="h-4 w-4" />Remove from my view</button>
                  </div>
                </section>

                <section aria-label="Shared media">
                  <SectionTitle title="Shared media" meta={deleted || screenState === 'empty' ? 'No items' : '1 item'} />
                  {deleted || screenState === 'empty' ? (
                    <p className="mt-2 rounded-xl border border-white/10 px-3 py-4 text-[12px] text-paper-100/65">No shared media is available for this message.</p>
                  ) : (
                    <button type="button" className="focus-ring mt-2 flex min-h-[72px] w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left" onClick={() => setStatus('Hill media preview is already shown above. No viewer or download opened.')}>
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange/15 text-brand-orange"><Map aria-hidden="true" className="h-5 w-5" /></span>
                      <span><span className="block text-[13px] font-medium text-paper-100">Hill segment</span><span className="mt-0.5 block text-[11px] text-paper-100/60">Preview only · retention not connected</span></span>
                    </button>
                  )}
                </section>
              </>
            )}

            <p id="message-actions-live-status" className="min-h-5 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">{status}</p>
          </div>

          <div className="shrink-0 border-t border-white/10 bg-ink-900 px-4 py-3">
            <BtnPrimary className="w-full" onClick={() => setStatus('Message actions closed in this local outcome preview.')}>Done</BtnPrimary>
          </div>
        </section>

        {confirmAction && (
          <div className="absolute inset-0 z-50 flex items-end bg-ink-900/75 p-4" role="dialog" aria-modal="true" aria-labelledby="message-confirm-title">
            <div className="w-full rounded-[24px] border border-white/10 bg-ink-brown-800 p-4 shadow-2xl">
              <h2 id="message-confirm-title" className="text-[17px] font-semibold text-paper-100">{confirmAction === 'remove this message from my view' ? 'Remove from my view?' : `Confirm ${confirmAction}?`}</h2>
              <p className="mt-2 text-[12px] leading-5 text-paper-100/70">Exact scope: {confirmAction === 'remove this message from my view' ? 'hide this selected Aisha message and attached media from your local view only; it does not delete the sender’s copy' : confirmAction}. This is a local outcome preview; no account or server state will change.</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button ref={cancelRef} type="button" className="hifi-action glass-pill h-12 w-full px-5 text-[15px] font-medium text-paper-100" onClick={() => closeConfirmation()}>Cancel</button>
                <button ref={confirmRef} type="button" className="hifi-action hifi-action-primary h-[52px] w-full rounded-pill px-6 text-[15px] font-semibold" onClick={confirmCurrentAction}>{confirmAction === 'remove this message from my view' ? 'Remove locally' : 'Confirm'}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </HifiShell>
  )
}
