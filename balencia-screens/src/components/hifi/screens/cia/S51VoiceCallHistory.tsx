'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, CalendarPlus, Check, ChevronRight, FileText, Lock, Plus, ShieldCheck, Trash2, X } from 'lucide-react'
import {
  BtnDestructive,
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  ConsentRail,
  GlassCard,
  HifiShell,
  IconButton,
  Provenance,
  SafetyCard,
  SectionTitle,
  SolidCard,
  TopBar,
  TrendChart,
} from '@/components/hifi/kit'
import { persona } from '@/data/hifi/persona'

const HISTORY_STATES = [
  'default',
  'action-items',
  'skeleton',
  'empty',
  'error',
  'success',
  'disabled',
  'offline',
  'schedule',
  'detail',
  'delete-confirmation',
  'safety',
] as const

type VoiceHistoryState = (typeof HISTORY_STATES)[number]
type HistoryTab = 'history' | 'action-items'
type HistoryPanel = 'none' | 'schedule' | 'detail' | 'delete' | 'safety'
type HistorySuccess = 'none' | 'schedule' | 'recording-deleted'
type RecordingSelection = { id: 'morning-check-in'; title: 'Morning check-in' }

const MORNING_RECORDING: RecordingSelection = { id: 'morning-check-in', title: 'Morning check-in' }

function isHistoryState(value: string | null): value is VoiceHistoryState {
  return HISTORY_STATES.includes(value as VoiceHistoryState)
}

function panelForState(state: VoiceHistoryState): HistoryPanel {
  if (state === 'schedule') return 'schedule'
  if (state === 'detail') return 'detail'
  if (state === 'delete-confirmation') return 'delete'
  if (state === 'safety') return 'safety'
  return 'none'
}

function FocusedHistoryPanel({
  panel,
  deleteTitle,
  onClose,
  children,
}: {
  panel: Exclude<HistoryPanel, 'none'>
  deleteTitle?: string
  onClose: () => void
  children: React.ReactNode
}) {
  const panelRef = useRef<HTMLElement>(null)

  useEffect(() => {
    panelRef.current?.querySelector<HTMLElement>('button, [href], input')?.focus()
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key !== 'Tab') return
    const focusable = [...(panelRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), [href], input:not(:disabled)') ?? [])]
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div className="absolute inset-0 z-[60] flex items-end bg-ink-900/85 px-3 pb-[72px]" role="presentation">
      <section
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`history-${panel}-title`}
        className="action-sheet-surface glass-card max-h-[620px] w-full overflow-y-auto p-4 shadow-3"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 id={`history-${panel}-title`} className="text-[18px] font-semibold text-paper-100">
            {panel === 'schedule' && 'Schedule preview'}
            {panel === 'detail' && 'Morning check-in'}
            {panel === 'delete' && (deleteTitle ?? 'Delete recording')}
            {panel === 'safety' && 'Safety guidance'}
          </h2>
          <button type="button" className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper-100/70" aria-label={`Close ${panel} panel`} onClick={onClose}>
            <X size={19} />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}

export function S51VoiceCallHistory() {
  const [historyState, setHistoryState] = useState<VoiceHistoryState>('default')
  const [activeTab, setActiveTab] = useState<HistoryTab>('history')
  const [panel, setPanel] = useState<HistoryPanel>('none')
  const [liveStatus, setLiveStatus] = useState('Voice session history ready.')
  const [completedItems, setCompletedItems] = useState<string[]>(['warm-up'])
  const [successOutcome, setSuccessOutcome] = useState<HistorySuccess>('none')
  const [recordingDeleted, setRecordingDeleted] = useState(false)
  const [selectedRecording, setSelectedRecording] = useState<RecordingSelection>(MORNING_RECORDING)
  const lastPanelTrigger = useRef<HTMLElement | null>(null)
  const loading = historyState === 'skeleton'
  const disabled = historyState === 'disabled'
  const offline = historyState === 'offline'

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state')
    if (!isHistoryState(fixture)) return
    const fixtureTimer = window.setTimeout(() => {
      setHistoryState(fixture)
      setActiveTab(fixture === 'action-items' ? 'action-items' : 'history')
      setPanel(panelForState(fixture))
      setSuccessOutcome(fixture === 'success' ? 'schedule' : 'none')
      setRecordingDeleted(false)
      setSelectedRecording(MORNING_RECORDING)
      setLiveStatus(`Voice history fixture: ${fixture.replace(/-/g, ' ')}.`)
    }, 0)
    return () => window.clearTimeout(fixtureTimer)
  }, [])

  const selectTab = (nextTab: HistoryTab) => {
    setActiveTab(nextTab)
    setHistoryState(nextTab === 'history' ? 'default' : 'action-items')
    setPanel('none')
    setLiveStatus(`${nextTab === 'history' ? 'History' : 'Action items'} tab selected.`)
  }

  const openPanel = (nextPanel: Exclude<HistoryPanel, 'none'>) => {
    if (panel === 'none' && document.activeElement instanceof HTMLElement) {
      lastPanelTrigger.current = document.activeElement
    }
    const nextState: VoiceHistoryState = nextPanel === 'delete' ? 'delete-confirmation' : nextPanel
    setHistoryState(nextState)
    setPanel(nextPanel)
    setLiveStatus(`${nextPanel.replace(/-/g, ' ')} panel opened.`)
  }

  const openDeletePanel = (recording: RecordingSelection) => {
    setSelectedRecording(recording)
    openPanel('delete')
  }

  const closePanel = () => {
    const returnFocus = lastPanelTrigger.current
    setPanel('none')
    setHistoryState(activeTab === 'history' ? 'default' : 'action-items')
    setLiveStatus('Panel closed without changing your voice data.')
    window.setTimeout(() => {
      if (returnFocus?.isConnected) returnFocus.focus()
    }, 0)
  }

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, tab: HistoryTab) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const nextTab: HistoryTab = event.key === 'Home'
      ? 'history'
      : event.key === 'End'
        ? 'action-items'
        : tab === 'history'
          ? 'action-items'
          : 'history'
    selectTab(nextTab)
    document.getElementById(`voice-history-tab-${nextTab}`)?.focus()
  }

  const toggleActionItem = (item: string) => {
    setCompletedItems(current => current.includes(item) ? current.filter(value => value !== item) : [...current, item])
    const nextChecked = !completedItems.includes(item)
    setLiveStatus(`${item === 'warm-up' ? 'Use a lighter warm-up' : 'Review deadline boundaries'} marked ${nextChecked ? 'complete' : 'incomplete'}.`)
  }

  const saveSchedulePreview = () => {
    setPanel('none')
    setSuccessOutcome('schedule')
    setHistoryState('success')
    setLiveStatus('Schedule saved for this visual preview. No call was booked.')
  }

  return (
    <HifiShell
      atmosphere="cia"
      activeTab="cia"
      header={
        <TopBar
          title="Voice sessions"
          right={
            <span aria-hidden={panel !== 'none' || undefined} inert={panel !== 'none' || undefined}>
              <IconButton label="Open schedule preview" disabled={disabled || offline} aria-describedby={disabled ? 'voice-history-disabled-reason' : offline ? 'voice-history-offline-reason' : undefined} onClick={() => openPanel('schedule')}>
                <Plus size={20} strokeWidth={2} />
              </IconButton>
            </span>
          }
        />
      }
      showTabBar={panel === 'none'}
    >
      <main
        className="space-y-5 px-4 pb-4 pt-2"
        data-voice-history-state={historyState}
        data-history-tab={activeTab}
        data-history-panel={panel}
        aria-busy={loading || undefined}
        aria-hidden={panel !== 'none' || undefined}
        inert={panel !== 'none' || undefined}
      >
        <p className="sr-only" aria-live="polite" aria-atomic="true">{liveStatus}</p>
        <p id="voice-history-disabled-reason" className={disabled ? 'rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[12px] leading-4 text-paper-100/70' : 'sr-only'}>Voice-history actions are disabled in this fixture. Privacy and safety exits remain available.</p>
        <p id="voice-history-offline-reason" className="sr-only">Scheduling is unavailable while offline.</p>

        <p className="text-[12px] leading-4 text-paper-100/70">
          Your voice <span className="text-emphasis">history</span> is private, kept for you and CIA only.
        </p>

        {(historyState === 'error' || offline || historyState === 'success') && (
          <div className={`rounded-xl border px-4 py-3 text-[13px] leading-5 ${historyState === 'success' ? 'border-forest-green/30 bg-forest-green/10 text-paper-100' : 'border-brand-orange/30 bg-brand-orange/10 text-paper-100/80'}`}>
            {historyState === 'error' && 'Transcript refresh failed. Cached sessions remain available.'}
            {offline && 'Offline · showing cached sessions from 18 minutes ago. New scheduling is unavailable.'}
            {historyState === 'success' && successOutcome === 'schedule' && 'Schedule saved for this preview only. No call was booked.'}
            {historyState === 'success' && successOutcome === 'recording-deleted' && `${selectedRecording.title} recording deleted in this local preview. Transcript and CIA summary remain available.`}
          </div>
        )}

        <div role="tablist" aria-label="Voice session views" className="flex min-h-14 items-center gap-1 rounded-pill border border-white/10 bg-white/[0.03] p-1">
          <button
            id="voice-history-tab-history"
            role="tab"
            aria-selected={activeTab === 'history'}
            aria-controls="voice-history-panel-history"
            tabIndex={activeTab === 'history' ? 0 : -1}
            type="button"
            className={`focus-ring flex min-h-11 flex-1 items-center justify-center rounded-pill text-[13px] ${activeTab === 'history' ? 'bg-white/10 font-semibold text-paper-100' : 'font-medium text-paper-100/65'}`}
            onClick={() => selectTab('history')}
            onKeyDown={event => handleTabKeyDown(event, 'history')}
          >
            History
          </button>
          <button
            id="voice-history-tab-action-items"
            role="tab"
            aria-selected={activeTab === 'action-items'}
            aria-controls="voice-history-panel-action-items"
            tabIndex={activeTab === 'action-items' ? 0 : -1}
            type="button"
            className={`focus-ring flex min-h-11 flex-1 items-center justify-center rounded-pill text-[13px] ${activeTab === 'action-items' ? 'bg-white/10 font-semibold text-paper-100' : 'font-medium text-paper-100/65'}`}
            onClick={() => selectTab('action-items')}
            onKeyDown={event => handleTabKeyDown(event, 'action-items')}
          >
            Action items
          </button>
        </div>

        {loading ? (
          <section className="space-y-3" aria-label="Loading voice sessions">
            <div className="skeleton-block h-28" />
            <div className="skeleton-block h-36" />
            <div className="skeleton-block h-28" />
          </section>
        ) : activeTab === 'action-items' ? (
          <section id="voice-history-panel-action-items" role="tabpanel" aria-labelledby="voice-history-tab-action-items" className="space-y-4">
            <SolidCard>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">Confirmed actions</p>
                  <p className="mt-1 text-[13px] text-paper-100/70">Only items you approve appear here.</p>
                </div>
                <span className="text-[14px] font-semibold tabular-nums text-forest-green">{completedItems.length}/2</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-pill bg-white/10" role="img" aria-label={`${completedItems.length} of 2 action items complete`}>
                <span className="block h-full rounded-pill bg-forest-green" style={{ width: `${completedItems.length * 50}%` }} />
              </div>
            </SolidCard>
            {[
              { id: 'warm-up', label: 'Use a lighter warm-up', source: 'Confirmed from morning check-in' },
              { id: 'boundaries', label: 'Review deadline boundaries', source: 'CIA draft · needs your confirmation' },
            ].map(item => {
              const checked = completedItems.includes(item.id)
              return (
                <label
                  key={item.id}
                  className="focus-within:shadow-[var(--focus-ring)] flex min-h-14 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left"
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${checked ? 'border-forest-green bg-forest-green/15 text-forest-green' : 'border-white/15 text-paper-100/50'}`} aria-hidden="true">
                    {checked && <Check size={18} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold text-paper-100">{item.label}</span>
                    <span className="mt-0.5 block text-[12px] leading-4 text-paper-100/70">{item.source}</span>
                  </span>
                  <input
                    type="checkbox"
                    className="h-5 w-5 shrink-0 accent-forest-green"
                    checked={checked}
                    disabled={disabled}
                    aria-describedby={disabled ? 'voice-history-disabled-reason' : undefined}
                    onChange={() => toggleActionItem(item.id)}
                  />
                </label>
              )
            })}
          </section>
        ) : historyState === 'empty' ? (
          <section id="voice-history-panel-history" role="tabpanel" aria-labelledby="voice-history-tab-history">
            <GlassCard tone="muted" className="text-center">
              <CalendarPlus className="mx-auto text-brand-orange" size={26} />
              <h2 className="mt-3 text-[18px] font-semibold text-paper-100">No voice sessions yet</h2>
              <p className="mt-2 text-[13px] leading-5 text-paper-100/70">Schedule a local preview to explore the flow. No call will be booked.</p>
              <BtnPrimary className="mt-4 w-full" aria-label="Preview first voice session schedule" onClick={() => openPanel('schedule')}>Open schedule preview</BtnPrimary>
            </GlassCard>
          </section>
        ) : (
          <section id="voice-history-panel-history" role="tabpanel" aria-labelledby="voice-history-tab-history" className={offline ? 'opacity-70' : undefined}>
            <div className="space-y-5">
              <SolidCard>
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">Calls per week</p>
                  <span className="text-[12px] text-paper-100/65">Last 6 weeks</span>
                </div>
                <div className="mt-3"><TrendChart past={[3, 5, 4, 7, 6, 5]} label="Calls per week over the last six weeks, sourced from retained session history" /></div>
                <div className="mt-2"><Provenance items={['Session history · refreshed 18m ago']} /></div>
              </SolidCard>

              <section className="space-y-3">
                <SectionTitle title="Upcoming" meta={historyState === 'success' && successOutcome === 'schedule' ? 'Preview saved' : '1 scheduled'} />
                <GlassCard tone="you">
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">Thu, May 22 · 3:00 pm</p>
                  <h3 className="mt-1 text-[16px] font-semibold text-paper-100">Weekly mission check-in</h3>
                  <p className="mt-1 text-[13px] text-paper-100/70">{persona.buddy.name} joins this session</p>
                  <BtnGhost quiet className="mt-4 w-full justify-center border border-white/10" aria-label="Schedule weekly mission call" disabled={disabled || offline} aria-describedby={disabled ? 'voice-history-disabled-reason' : offline ? 'voice-history-offline-reason' : undefined} onClick={() => openPanel('schedule')}>
                    Schedule a call
                  </BtnGhost>
                </GlassCard>
              </section>

              <section className="space-y-3">
                <SectionTitle title="Today" meta="2 calls" />
                <SessionRow
                  title="Morning check-in"
                  time="10:32 am"
                  dateTime="2026-07-10T10:32:00+05:00"
                  duration="18 minutes"
                  transcript="Transcript generated"
                  recording={recordingDeleted ? 'Recording deleted · local outcome' : 'Recording retained · expires in 21 days'}
                  recordingDeleted={recordingDeleted}
                  disabled={disabled}
                  disabledReasonId="voice-history-disabled-reason"
                  onOpen={() => openPanel('detail')}
                  onDelete={recordingDeleted ? undefined : () => openDeletePanel(MORNING_RECORDING)}
                />
                <SessionRow
                  title="Quick question"
                  time="8:15 am"
                  dateTime="2026-07-10T08:15:00+05:00"
                  duration="7 minutes"
                  transcript="Transcript not available"
                  recording="Recording deleted"
                  recordingDeleted
                  disabled={disabled}
                  disabledReasonId="voice-history-disabled-reason"
                  onOpen={() => setLiveStatus('Quick question details opened in this preview. Transcript and recording are unavailable.')}
                />
              </section>

              <section className="space-y-3">
                <SectionTitle title="Yesterday" meta="1 call" />
                <SolidCard className="space-y-3">
                  <button type="button" className="focus-ring flex min-h-14 w-full items-center justify-between gap-3 rounded-lg text-left disabled:opacity-40" disabled={disabled} aria-describedby={disabled ? 'voice-history-disabled-reason' : undefined} onClick={() => openPanel('detail')}>
                    <span>
                      <time dateTime="2026-07-09T18:45:00+05:00" className="text-[14px] font-semibold tabular-nums text-paper-100">6:45 pm · 24 min</time>
                      <span className="mt-1 block text-[13px] text-paper-100/70">Evening reflection</span>
                    </span>
                    <ChevronRight size={18} className="text-paper-100/60" />
                  </button>
                  <div className="flex items-start gap-2 rounded-lg border border-brand-orange/25 bg-brand-orange/10 p-3">
                    <AlertTriangle size={15} className="mt-0.5 shrink-0 text-brand-orange" />
                    <p className="text-[12px] leading-4 text-paper-100/80">Anxiety language was noticed. Private support guidance is available.</p>
                  </div>
                  <Provenance items={['Recording retained', 'Summary by CIA']} />
                </SolidCard>
              </section>

              <GlassCard tone="muted">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-paper-100/70" />
                  <h2 className="text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">Voice data controls</h2>
                </div>
                <p className="mt-2 text-[13px] leading-5 text-paper-100/70">Recording, transcript and CIA summary are separate records. Each requires its own exact-scope confirmation.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <BtnGhost quiet className="border border-white/10" onClick={() => openPanel('detail')}>Manage records</BtnGhost>
                  <BtnGhost quiet className="border border-white/10" onClick={() => setLiveStatus('Export preview opened. No file was created.')}>Export preview</BtnGhost>
                </div>
                <div className="mt-3"><ConsentRail compact /></div>
              </GlassCard>

              <SafetyCard href="/screens/51?state=safety" title="Crisis and local support" />
            </div>
          </section>
        )}
      </main>

      {panel === 'schedule' && (
        <FocusedHistoryPanel panel="schedule" onClose={closePanel}>
          <p className="mt-3 text-[13px] leading-5 text-paper-100/70">Choose a preview cadence. Saving updates only this visual fixture and does not book a call or write to a calendar.</p>
          <fieldset className="mt-4 space-y-2">
            <legend className="text-[12px] font-semibold uppercase tracking-wide text-paper-100/70">Cadence</legend>
            {['One time · Thursday 3:00 pm', 'Weekly · Thursday 3:00 pm'].map((label, index) => (
              <label key={label} className="focus-within:shadow-[var(--focus-ring)] flex min-h-11 items-center gap-3 rounded-xl border border-white/10 px-3 text-[13px] text-paper-100/80">
                <input type="radio" name="schedule-cadence" defaultChecked={index === 0} className="h-5 w-5 accent-brand-orange" />
                {label}
              </label>
            ))}
          </fieldset>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <BtnSecondary className="w-full" onClick={closePanel}>Cancel</BtnSecondary>
            <BtnPrimary className="w-full px-3" onClick={saveSchedulePreview}>Save preview</BtnPrimary>
          </div>
        </FocusedHistoryPanel>
      )}

      {panel === 'detail' && (
        <FocusedHistoryPanel panel="detail" onClose={closePanel}>
          <div className="mt-3 space-y-3">
            <Provenance items={['Summary by CIA', 'OS speech-to-text', recordingDeleted ? 'Recording deleted · local outcome' : 'Recording expires in 21 days']} />
            <p className="text-[13px] leading-5 text-paper-100/75">Reframed pre-run anxiety as excitement and set a lighter warm-up pace.</p>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <p className="text-[12px] font-semibold text-paper-100">Transcript</p>
              <p className="mt-1 text-[13px] leading-5 text-paper-100/70">I can keep the first mile easy and check in before adding pace.</p>
            </div>
            <p className="text-[12px] leading-4 text-paper-100/65">Audio playback is unavailable in this visual prototype.</p>
            <div className="grid grid-cols-1 gap-2">
              <BtnGhost quiet className="w-full justify-start border border-white/10" onClick={() => setLiveStatus('Transcript delete preview selected. No record was changed.')}>Delete transcript preview</BtnGhost>
              <BtnGhost quiet className="w-full justify-start border border-white/10" onClick={() => setLiveStatus('CIA summary delete preview selected. No record was changed.')}>Delete CIA summary preview</BtnGhost>
              {recordingDeleted ? (
                <p className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] leading-4 text-paper-100/70">Morning check-in recording deleted · transcript and CIA summary remain.</p>
              ) : (
                <BtnGhost quiet className="w-full justify-start border border-white/10" onClick={() => openDeletePanel(MORNING_RECORDING)}>Delete recording</BtnGhost>
              )}
            </div>
          </div>
        </FocusedHistoryPanel>
      )}

      {panel === 'delete' && (
        <FocusedHistoryPanel panel="delete" deleteTitle={`Delete ${selectedRecording.title} recording`} onClose={closePanel}>
          <p className="mt-3 text-[13px] leading-5 text-paper-100/75">Delete only the retained audio for {selectedRecording.title}? The transcript and CIA summary stay until you delete them separately.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <BtnSecondary className="w-full" onClick={closePanel}>Cancel</BtnSecondary>
            <BtnDestructive className="w-full px-3" onClick={() => {
              setRecordingDeleted(true)
              setPanel('none')
              setSuccessOutcome('recording-deleted')
              setHistoryState('success')
              setLiveStatus(`${selectedRecording.title} recording deletion preview confirmed. No stored audio was changed.`)
            }}>Delete recording</BtnDestructive>
          </div>
        </FocusedHistoryPanel>
      )}

      {panel === 'safety' && (
        <FocusedHistoryPanel panel="safety" onClose={closePanel}>
          <div id="voice-history-safety" className="mt-3">
            <SafetyCard title="Crisis and local support" description="View calm local guidance. This prototype does not place calls or send texts." />
          </div>
          <p className="mt-3 text-[13px] leading-5 text-paper-100/70">If you may be in immediate danger, contact local emergency services. Opening this panel does not share your transcript.</p>
          <BtnSecondary className="mt-4 w-full" onClick={closePanel}>Done</BtnSecondary>
        </FocusedHistoryPanel>
      )}
    </HifiShell>
  )
}

function SessionRow({
  title,
  time,
  dateTime,
  duration,
  transcript,
  recording,
  recordingDeleted,
  disabled,
  disabledReasonId,
  onOpen,
  onDelete,
}: {
  title: string
  time: string
  dateTime: string
  duration: string
  transcript: string
  recording: string
  recordingDeleted?: boolean
  disabled: boolean
  disabledReasonId: string
  onOpen: () => void
  onDelete?: () => void
}) {
  return (
    <SolidCard className="space-y-2">
      <div className="flex items-start gap-2">
        <button
          type="button"
          className="focus-ring flex min-h-14 min-w-0 flex-1 items-center justify-between gap-3 rounded-lg text-left disabled:opacity-40"
          aria-label={`${title}, ${time}, ${duration}, ${transcript}, ${recording}. Open session details`}
          aria-describedby={disabled ? disabledReasonId : undefined}
          disabled={disabled}
          onClick={onOpen}
        >
          <span className="min-w-0">
            <time dateTime={dateTime} className="block text-[14px] font-semibold tabular-nums text-paper-100">{time} · {duration.replace(' minutes', ' min')}</time>
            <span className="mt-1 block text-[13px] text-paper-100/70">{title}</span>
          </span>
          <ChevronRight size={18} className="shrink-0 text-paper-100/60" />
        </button>
        {onDelete ? (
          <button type="button" aria-label={`Delete ${title} recording`} aria-describedby={disabled ? disabledReasonId : undefined} className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper-100/65 disabled:opacity-40" disabled={disabled} onClick={onDelete}>
            <Trash2 size={17} strokeWidth={1.8} />
          </button>
        ) : (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper-100/30" aria-hidden="true"><Trash2 size={17} strokeWidth={1.8} /></span>
        )}
      </div>
      <div className="flex flex-wrap gap-2" aria-label={`${transcript}. ${recording}.`}>
        <span className="flex min-h-8 items-center gap-1 rounded-pill bg-royal-purple/15 px-2.5 text-[11px] font-semibold text-royal-purple"><FileText size={12} />{transcript}</span>
        <span className={`flex min-h-8 items-center gap-1 rounded-pill px-2.5 text-[11px] font-semibold ${recordingDeleted ? 'bg-white/[0.05] text-paper-100/65' : 'bg-forest-green/15 text-forest-green'}`}><Lock size={12} />{recording}</span>
      </div>
    </SolidCard>
  )
}
