'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, Ban, Bell, Clock, MoreHorizontal, Phone, RefreshCw, ShieldCheck, Trash2, WifiOff } from 'lucide-react'
import {
  BtnPrimary,
  BtnSecondary,
  Chip,
  ComplianceFooter,
  GlassCard,
  HifiShell,
  IconButton,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

type WhatsappState = 'default' | 'skeleton' | 'empty' | 'error' | 'offline' | 'paused' | 'revoked' | 'outside-window' | 'success'
type Panel = 'settings' | 'handoff-open' | 'handoff-manage' | 'revoke' | 'delete' | null

const WHATSAPP_STATES: WhatsappState[] = ['default', 'skeleton', 'empty', 'error', 'offline', 'paused', 'revoked', 'outside-window', 'success']

const messages = [
  { id: 'meal-photo', direction: 'Inbound', title: 'Meal photo received', meta: 'Today, 1:42 pm', status: 'Received', icon: ArrowDownLeft },
  { id: 'plan-nudge', direction: 'Outbound', title: 'Plan nudge preview', meta: 'Today, 9:15 am', status: 'Read fixture', icon: ArrowUpRight },
  { id: 'check-in', direction: 'Template', title: 'Evening check-in template', meta: 'Scheduled preview, 8:00 pm', status: 'Not sent', icon: Bell },
]

function MessageRow({ message, onClick }: { message: typeof messages[number]; onClick: () => void }) {
  const RowIcon = message.icon
  return (
    <button
      type="button"
      className="focus-ring flex min-h-[60px] w-full items-center justify-between gap-3 px-4 py-2.5 text-left"
      aria-label={`${message.direction}: ${message.title}. ${message.meta}. Status: ${message.status}.`}
      onClick={onClick}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-paper-100/65"><RowIcon className="h-4 w-4" /></span>
        <span className="min-w-0"><span className="block truncate text-[13px] text-paper-100/85">{message.title}</span><span className="mt-0.5 block text-[11px] tabular-nums text-paper-100/60">{message.direction} · {message.meta}</span></span>
      </span>
      <Chip tone="muted">{message.status}</Chip>
    </button>
  )
}

function WhatsappOverlay({ labelledBy, onClose, children }: { labelledBy: string; onClose: () => void; children: React.ReactNode }) {
  const panelRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    panelRef.current?.querySelector<HTMLElement>('button:not(:disabled), [href], input:not(:disabled)')?.focus()
    return () => {
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
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
      <section ref={panelRef} role="dialog" aria-modal="true" aria-labelledby={labelledBy} className="glass-card w-full rounded-[24px] border border-white/10 bg-ink-brown-800 p-4 shadow-3" onKeyDown={handleKeyDown}>
        {children}
      </section>
    </div>
  )
}

export function S99WhatsappInbox() {
  const [screenState, setScreenState] = useState<WhatsappState>('default')
  const [panel, setPanel] = useState<Panel>(null)
  const [paused, setPaused] = useState(false)
  const [historyDeleted, setHistoryDeleted] = useState(false)
  const [status, setStatus] = useState('Visual fixture · provider unavailable. No inbox, contact, or message request was made.')

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state') as WhatsappState | null
    if (!fixture || !WHATSAPP_STATES.includes(fixture)) return
    const timer = window.setTimeout(() => {
      setScreenState(fixture)
      setPaused(fixture === 'paused')
      setHistoryDeleted(fixture === 'success')
      setStatus(
        fixture === 'offline'
          ? 'Offline fixture. Provider actions are unavailable and no sync was attempted.'
          : fixture === 'outside-window'
            ? 'Open WhatsApp thread is disabled outside the 24-hour reply window. No outbound message can be sent.'
            : fixture === 'revoked'
              ? 'Access revoked fixture. No provider connection or imported data is available.'
              : `${fixture} provider inbox fixture loaded. Provider remains unavailable.`,
      )
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const closePanel = (message = 'Panel closed. Nothing changed.') => {
    setPanel(null)
    setStatus(message)
  }

  const openDeleteConfirmation = () => {
    setPanel('delete')
  }

  const providerUnavailable = screenState === 'offline' || screenState === 'revoked' || screenState === 'empty'
  const linkedPreview = screenState !== 'empty' && screenState !== 'revoked'
  const rowsVisible = linkedPreview && !historyDeleted && screenState !== 'skeleton'
  const enrollmentUnavailable = screenState === 'revoked' || screenState === 'empty'
  const continuityUnavailable = enrollmentUnavailable
  const historyUnavailable = !rowsVisible

  return (
    <HifiShell
      atmosphere="cia"
      activeTab="cia"
      overlay={(panel === 'handoff-open' || panel === 'handoff-manage') ? (
        <WhatsappOverlay labelledBy="handoff-title" onClose={() => closePanel('External handoff canceled. Nothing opened.')}>
          <h2 id="handoff-title" className="text-[16px] font-semibold text-paper-100">External provider unavailable</h2>
          <p className="mt-2 text-[12px] leading-5 text-paper-100/70">{panel === 'handoff-open' ? 'Open WhatsApp thread' : 'Manage WhatsApp'} would leave Balencia in a connected product. This visual prototype cannot launch, sync, contact, or authenticate a provider.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <BtnSecondary className="w-full" onClick={() => closePanel('External handoff canceled. Nothing opened.')}>Cancel</BtnSecondary>
            <BtnPrimary className="w-full" onClick={() => closePanel('Provider unavailable. No external app, thread, or settings page opened.')}>Continue preview</BtnPrimary>
          </div>
        </WhatsappOverlay>
      ) : panel === 'revoke' ? (
        <WhatsappOverlay labelledBy="revoke-title" onClose={() => closePanel('Revoke canceled. Nothing changed.')}>
          <h2 id="revoke-title" className="text-[16px] font-semibold text-paper-100">Revoke linked-channel access?</h2>
          <p className="mt-2 text-[12px] leading-5 text-paper-100/70">Exact scope: disconnect the masked number outcome and stop CIA continuity. Imported history is not deleted by this action.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <BtnSecondary className="w-full" onClick={() => closePanel('Revoke canceled. Nothing changed.')}>Cancel</BtnSecondary>
            <BtnPrimary className="w-full" onClick={() => { setPaused(false); setScreenState('revoked'); closePanel('Access revoked in this local outcome preview. No provider state changed.') }}>Revoke access</BtnPrimary>
          </div>
        </WhatsappOverlay>
      ) : panel === 'delete' ? (
        <WhatsappOverlay labelledBy="delete-history-title" onClose={() => closePanel('Delete canceled. Nothing changed.')}>
          <h2 id="delete-history-title" className="text-[16px] font-semibold text-paper-100">Delete imported history?</h2>
          <p className="mt-2 text-[12px] leading-5 text-paper-100/70">Exact scope: imported message, media, and template fixtures. Your Balencia account, app chats, and linked-number outcome remain unchanged.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <BtnSecondary className="w-full" onClick={() => closePanel('Delete canceled. Nothing changed.')}>Cancel</BtnSecondary>
            <BtnPrimary className="w-full" onClick={() => { setHistoryDeleted(true); setScreenState('success'); closePanel('Imported history deleted in this local outcome preview. No storage or provider state changed.') }}>Delete history</BtnPrimary>
          </div>
        </WhatsappOverlay>
      ) : undefined}
      header={
        <TopBar
          title="WhatsApp inbox"
          right={
            <IconButton label="Settings and privacy" aria-expanded={panel === 'settings'} onClick={() => setPanel(panel === 'settings' ? null : 'settings')}>
              <MoreHorizontal className="h-5 w-5" strokeWidth={1.9} />
            </IconButton>
          }
        />
      }
    >
      <main className="space-y-3 px-4 pb-4 pt-3" data-whatsapp-state={screenState} aria-busy={screenState === 'skeleton'}>
        <div className="flex items-center justify-between gap-3 rounded-pill border border-white/10 bg-white/[0.03] px-3 py-2">
          <span className="flex items-center gap-2 text-[11px] font-semibold text-paper-100/75"><ShieldCheck aria-hidden="true" className="h-4 w-4 text-brand-orange" />Visual fixture · provider unavailable</span>
          <span className="flex shrink-0 items-center gap-1 text-[12px] tabular-nums text-paper-100/65"><RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />No live sync</span>
        </div>

        {screenState === 'offline' && <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-surface-2 px-3 py-2 text-[12px] leading-4 text-paper-100/70"><WifiOff aria-hidden="true" className="mt-0.5 h-4 w-4" />Offline · cached visual fixture only. Provider actions are disabled.</div>}
        {screenState === 'outside-window' && <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-surface-2 px-3 py-2 text-[12px] leading-4 text-paper-100/70"><Clock aria-hidden="true" className="mt-0.5 h-4 w-4" />24-hour reply-window preview is closed. No outbound action is available.</div>}
        {screenState === 'error' && <div className="rounded-xl border border-brand-orange/25 bg-brand-orange/10 px-3 py-2 text-[12px] leading-4 text-paper-100/75">Sync preview unavailable. Linked-state outcome remains visible; no provider request was attempted. <button type="button" className="focus-ring ml-1 min-h-11 rounded-pill px-2 font-semibold text-brand-orange" onClick={() => setStatus('Retry sync preview selected. Provider remains unavailable; no request was made.')}>Retry sync</button></div>}

        {screenState === 'skeleton' ? (
          <div className="space-y-3" aria-label="Loading provider inbox preview">
            <div className="skeleton-block h-48 rounded-[28px]" />
            <div className="skeleton-block h-44 rounded-[22px]" />
            <div className="skeleton-block h-28 rounded-[22px]" />
          </div>
        ) : (
          <>
            <GlassCard tone="cia" className="!p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-orange"><Phone className="h-5 w-5" /></span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-paper-100/60">Linked number outcome</p>
                    {linkedPreview ? <p aria-label="Masked number ending in 4821" className="mt-0.5 font-mono text-[15px] tabular-nums text-paper-100">+92 ••• ••4821</p> : <p className="mt-0.5 text-[14px] font-semibold text-paper-100">No linked number</p>}
                  </div>
                </div>
                <Chip tone={screenState === 'revoked' ? 'muted' : paused ? 'cia' : 'done'}>{screenState === 'revoked' ? 'Revoked' : paused ? 'Paused' : linkedPreview ? 'Preview' : 'Not enrolled'}</Chip>
              </div>
              <p className="mt-3 text-[12px] leading-5 text-paper-100/70">
                {linkedPreview ? 'This masked number and enrollment state are bundled outcome fixtures. They are not verified or connected.' : 'No enrollment or third-party data is represented in this fixture.'}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                <div><p className="text-[12px] font-semibold uppercase tracking-wider text-paper-100/65">Sync truth</p><p className="mt-0.5 text-[12px] text-paper-100/70">Provider unavailable · never synced</p></div>
                <button type="button" className="focus-ring min-h-11 rounded-pill px-3 text-[12px] font-medium text-paper-100/75 disabled:opacity-40" disabled={providerUnavailable} aria-describedby={providerUnavailable ? 'whatsapp-live-status' : undefined} onClick={() => setPanel('handoff-manage')}>Manage WhatsApp</button>
              </div>
            </GlassCard>

            <div className="grid grid-cols-[1.35fr_1fr] gap-2">
              <button type="button" className="hifi-action hifi-action-primary h-[52px] w-full rounded-pill px-2 text-[13px] font-semibold" disabled={providerUnavailable || screenState === 'outside-window'} aria-describedby="whatsapp-live-status" onClick={() => setPanel('handoff-open')}>Open WhatsApp thread</button>
              <button type="button" className="hifi-action glass-pill h-[52px] w-full px-2 text-[13px] font-medium text-paper-100 disabled:cursor-not-allowed disabled:opacity-40" disabled={continuityUnavailable} aria-describedby={continuityUnavailable ? 'whatsapp-live-status' : undefined} onClick={() => { setPaused(false); setStatus(paused ? 'CIA continuity resumed in this local fixture. Provider remains unavailable.' : 'CIA continuity is already active in this local fixture. Provider remains unavailable.') }}>Resume CIA</button>
            </div>

            {panel === 'settings' && (
              <GlassCard tone="muted" className="!p-4" aria-label="WhatsApp settings and privacy">
                <h2 className="text-[16px] font-semibold text-paper-100">Channel settings</h2>
                <p className="mt-1 text-[12px] leading-5 text-paper-100/70">Controls below change local outcome previews only. Provider and storage services are unavailable.</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <BtnSecondary className="min-h-12 h-auto px-3 py-2 text-[12px]" disabled={continuityUnavailable} aria-describedby={continuityUnavailable ? 'whatsapp-live-status' : undefined} onClick={() => { setPaused(value => !value); setStatus(paused ? 'CIA continuity resumed locally. Provider remains unavailable.' : 'CIA continuity paused locally. No provider state changed.') }}>{paused ? 'Resume CIA continuity' : 'Pause CIA continuity'}</BtnSecondary>
                  <BtnSecondary className="min-h-12 h-auto px-3 py-2 text-[12px]" disabled={historyUnavailable} aria-describedby={historyUnavailable ? 'whatsapp-live-status' : undefined} onClick={() => setStatus('Export preview selected. No file was created and no data left this device.')}>Export imported history</BtnSecondary>
                  <BtnSecondary className="min-h-12 h-auto px-3 py-2 text-[12px]" onClick={() => setStatus('Quiet-hours preview opened locally. No notification setting changed.')}>Quiet hours</BtnSecondary>
                  <BtnSecondary className="min-h-12 h-auto px-3 py-2 text-[12px]" onClick={() => setStatus('Retention preview: imported fixtures are not stored or connected.')}>Retention details</BtnSecondary>
                </div>
              </GlassCard>
            )}

            <section aria-labelledby="inbox-preview-title">
              <SectionTitle title="Inbox preview" meta={rowsVisible ? '3 bundled rows' : 'No imported rows'} />
              <h2 id="inbox-preview-title" className="sr-only">Inbox preview</h2>
              {rowsVisible ? (
                <SolidCard className="mt-2 divide-y divide-white/[0.06] p-0">
                  {messages.map(message => <MessageRow key={message.id} message={message} onClick={() => setStatus(`${message.direction} row selected: ${message.title}. No provider thread opened.`)} />)}
                </SolidCard>
              ) : (
                <SolidCard className="mt-2 py-7 text-center"><p className="text-[14px] font-semibold text-paper-100">No imported message history</p><p className="mt-1 text-[12px] text-paper-100/65">Provider unavailable · no messages or templates stored.</p></SolidCard>
              )}
            </section>

            <GlassCard tone="muted" className="!p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                <div><h2 className="text-[15px] font-semibold text-paper-100">Third-party data controls</h2><p className="mt-1 text-[12px] leading-5 text-paper-100/70">Audience: your linked channel only · source: unavailable provider · retention: no imported data connected · 24-hour reply window: visual fixture.</p></div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button type="button" aria-label="Revoke access" disabled={enrollmentUnavailable} aria-describedby={enrollmentUnavailable ? 'whatsapp-live-status' : undefined} className="focus-ring flex min-h-[72px] flex-col justify-center rounded-xl border border-white/10 bg-white/[0.03] px-3 text-left disabled:cursor-not-allowed disabled:opacity-40" onClick={() => setPanel('revoke')}><span className="flex items-center gap-2 text-[13px] font-semibold text-paper-100"><Ban aria-hidden="true" className="h-4 w-4 text-brand-orange" />Revoke access</span><span className="mt-1 text-[12px] leading-4 text-paper-100/65">Disconnect only</span></button>
                <button type="button" aria-label="Delete history" disabled={historyUnavailable} aria-describedby={historyUnavailable ? 'whatsapp-live-status' : undefined} className="focus-ring flex min-h-[72px] flex-col justify-center rounded-xl border border-white/10 bg-white/[0.03] px-3 text-left disabled:cursor-not-allowed disabled:opacity-40" onClick={openDeleteConfirmation}><span className="flex items-center gap-2 text-[13px] font-semibold text-paper-100"><Trash2 aria-hidden="true" className="h-4 w-4 text-brand-orange" />Delete history</span><span className="mt-1 text-[12px] leading-4 text-paper-100/65">Imported items only</span></button>
              </div>
            </GlassCard>

            <ComplianceFooter links={['Data sources', 'Retention', 'Export']} />
          </>
        )}

        <p id="whatsapp-live-status" className="min-h-5 text-[12px] leading-5 text-paper-100/70" role="status" aria-live="polite" aria-atomic="true">{status}</p>

      </main>
    </HifiShell>
  )
}
