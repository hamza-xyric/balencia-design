'use client'

import { useEffect, useRef, useState } from 'react'
import { Copy, Mic, RotateCcw, ShieldCheck, SlidersHorizontal, X } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  ChatBubble,
  ConsentRail,
  GlassCard,
  HifiShell,
  Provenance,
  TopBar,
} from '@/components/hifi/kit'

const VOICE_STATES = [
  'consent-required',
  'ready',
  'booting',
  'listening',
  'low-confidence',
  'silence',
  'permission-denied',
  'transcription-error',
  'network-error',
  'max-duration',
  'success',
  'disabled',
  'offline',
] as const

type VoiceState = (typeof VOICE_STATES)[number]
type ConsentState = 'required' | 'granted' | 'denied'

const RECOVERY_STATES: VoiceState[] = ['silence', 'permission-denied', 'transcription-error', 'network-error', 'max-duration', 'disabled', 'offline']

const transcriptByState: Partial<Record<VoiceState, string>> = {
  listening: 'I need help making today feel less crowded.',
  'low-confidence': 'I need help making today feel…',
  'network-error': 'I need help making today feel less crowded.',
  'max-duration': 'I need help making today feel less crowded.',
  offline: 'I need help making today feel less crowded.',
  success: 'I need help making today feel less crowded.',
}

const voiceStateCopy: Record<VoiceState, { title: string; detail: string }> = {
  'consent-required': {
    title: 'Voice preview is off',
    detail: 'Review microphone and transcript handling before starting this local interaction preview.',
  },
  ready: {
    title: 'Ready when you are',
    detail: 'The microphone remains off until you choose Start voice preview.',
  },
  booting: {
    title: 'Preparing voice preview',
    detail: 'Static waveform geometry is shown while the preview prepares. No microphone is connected.',
  },
  listening: {
    title: 'Listening preview',
    detail: 'Fixture amplitude and transcript text demonstrate the listening state. No audio is captured.',
  },
  'low-confidence': {
    title: 'Listening · low confidence',
    detail: 'Some preview words are uncertain. Review the transcript before sending.',
  },
  silence: {
    title: 'Not enough audio yet',
    detail: 'The preview stopped after eight seconds of silence. Nothing was saved.',
  },
  'permission-denied': {
    title: 'Microphone permission is off',
    detail: 'This preview cannot open system settings or request permission.',
  },
  'transcription-error': {
    title: 'Transcript unavailable',
    detail: 'The speech-to-text preview failed. No draft was added to chat history.',
  },
  'network-error': {
    title: 'Connection lost',
    detail: 'Your local draft is preserved. Sending stays disabled until the preview reconnects.',
  },
  'max-duration': {
    title: 'Preview limit reached',
    detail: 'The local two-minute preview stopped. Review or discard the transcript.',
  },
  success: {
    title: 'Transcript added to chat',
    detail: 'The preview committed this text locally. No audio was stored or sent.',
  },
  disabled: {
    title: 'Voice preview unavailable',
    detail: 'Voice controls are disabled in this fixture. Text chat remains available on Screen 09.',
  },
  offline: {
    title: 'Offline · draft stays local',
    detail: 'The preview transcript remains on this screen. Send is disabled and nothing auto-queues.',
  },
}

function isVoiceState(value: string | null): value is VoiceState {
  return VOICE_STATES.includes(value as VoiceState)
}

function consentForState(state: VoiceState): ConsentState {
  if (state === 'consent-required') return 'required'
  if (state === 'permission-denied') return 'denied'
  return 'granted'
}

export function S10CiaVoiceInChat() {
  const [voiceState, setVoiceState] = useState<VoiceState>('consent-required')
  const [consentState, setConsentState] = useState<ConsentState>('required')
  const [liveStatus, setLiveStatus] = useState('Voice preview is off. Review consent before starting.')
  const [supportOpen, setSupportOpen] = useState(false)
  const recoveryRef = useRef<HTMLDivElement>(null)
  const transcript = transcriptByState[voiceState] ?? ''
  const listening = voiceState === 'listening' || voiceState === 'low-confidence'
  const preparing = voiceState === 'booting'
  const consentGranted = consentState === 'granted'
  const controlsDisabled = !consentGranted || voiceState === 'disabled' || voiceState === 'permission-denied'
  const sendDisabled = !consentGranted || !transcript || ['network-error', 'offline', 'permission-denied', 'disabled', 'success'].includes(voiceState)

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state')
    if (!isVoiceState(fixture)) return
    const fixtureTimer = window.setTimeout(() => {
      setVoiceState(fixture)
      setConsentState(consentForState(fixture))
      setLiveStatus(voiceStateCopy[fixture].title)
    }, 0)
    return () => window.clearTimeout(fixtureTimer)
  }, [])

  useEffect(() => {
    if (!RECOVERY_STATES.includes(voiceState)) return
    const frame = window.requestAnimationFrame(() => {
      recoveryRef.current?.scrollIntoView({
        block: 'nearest',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [voiceState])

  const moveTo = (nextState: VoiceState, announcement: string) => {
    if (consentState === 'denied' && !['consent-required', 'permission-denied', 'disabled'].includes(nextState)) {
      setLiveStatus('Voice preview remains declined. Review voice privacy before starting again.')
      return
    }
    setVoiceState(nextState)
    if (nextState === 'consent-required') setConsentState('required')
    else if (nextState === 'permission-denied') setConsentState('denied')
    else if (consentState !== 'denied') setConsentState('granted')
    setLiveStatus(announcement)
  }

  const discardDraft = () => {
    if (!consentGranted) {
      setLiveStatus('Draft discarded. Voice preview remains declined and the microphone stays off.')
      return
    }
    if (voiceState === 'success') {
      setLiveStatus('The transcript was already added to this local chat preview.')
      return
    }
    moveTo('ready', 'Draft discarded. Voice preview is ready and the microphone remains off.')
  }

  const retryPreview = () => {
    moveTo('ready', 'Voice preview reset. Choose Start voice preview when ready.')
  }

  return (
    <HifiShell
      atmosphere="cia"
      activeTab="cia"
      header={
        <TopBar
          title="CIA"
          back={false}
          right={
            <span className="flex min-h-11 items-center gap-2 rounded-pill px-2 text-[12px] font-semibold text-paper-100/75">
              <span className={`h-2 w-2 rounded-full ${listening ? 'bg-brand-orange' : 'bg-white/30'}`} aria-hidden="true" />
              {listening ? 'Preview active' : 'Mic off'}
            </span>
          }
        />
      }
      composer={
        consentState === 'required'
          ? undefined
          : <div>
              <GlassCard tone="cia" className="!p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[13px] font-semibold text-paper-100">{voiceStateCopy[voiceState].title}</p>
                  <p className="mt-1 text-[12px] leading-4 text-paper-100/70">{voiceStateCopy[voiceState].detail}</p>
                </div>
                <span className="shrink-0 text-[12px] tabular-nums text-paper-100/65">
                  {listening ? '0:03' : voiceState === 'max-duration' ? '2:00' : '0:00'}
                </span>
              </div>

              <div
                className="mt-3 flex h-10 items-center justify-center gap-[3px]"
                role="img"
                aria-label={`Voice preview waveform, ${voiceState.replace(/-/g, ' ')}, no live microphone input`}
              >
                {(listening ? [6, 11, 18, 26, 20, 30, 16, 22, 10, 15, 8, 24, 12] : [3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3]).map((barHeight, index) => (
                  <span
                    key={index}
                    className={`w-[3px] rounded-pill ${listening ? 'bg-brand-orange' : 'bg-white/25'}`}
                    style={{ height: barHeight }}
                  />
                ))}
              </div>

              <div className="mt-3 flex items-center justify-center">
                <button
                  type="button"
                  className={`focus-ring relative flex h-16 w-16 items-center justify-center rounded-full border ${listening ? 'border-brand-orange/60 bg-brand-orange/15 text-brand-orange shadow-[var(--glow-orange-sm)]' : 'border-white/10 bg-white/[0.05] text-paper-100/70'} disabled:cursor-not-allowed disabled:opacity-45`}
                  aria-label={listening ? 'Stop voice preview' : 'Start voice preview'}
                  aria-pressed={listening}
                  aria-describedby={controlsDisabled ? 'voice-state-reason' : 'voice-preview-boundary'}
                  disabled={controlsDisabled || preparing || voiceState === 'success'}
                  onClick={() => moveTo(listening ? 'ready' : 'listening', listening ? 'Voice preview stopped. No audio was saved.' : 'Listening preview started. No microphone or audio service is connected.')}
                >
                  <Mic size={22} strokeWidth={2} />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <BtnGhost quiet className="flex-1 justify-center" onClick={discardDraft} disabled={voiceState === 'success'} aria-describedby={voiceState === 'success' ? 'voice-state-reason' : undefined}>
                  Cancel draft
                </BtnGhost>
                <BtnPrimary
                  className="flex-1"
                  disabled={sendDisabled}
                  aria-describedby={sendDisabled ? 'voice-state-reason' : undefined}
                  loading={preparing}
                  loadingLabel="Preparing"
                  onClick={() => moveTo('success', 'Transcript added to this local chat preview. No audio was stored or sent.')}
                >
                  Send transcript
                </BtnPrimary>
              </div>

              <p id="voice-preview-boundary" className="mt-3 text-center text-[12px] leading-4 text-paper-100/70">
                Preview only · raw audio is not stored · transcript stays local until you send
              </p>
              </GlassCard>
            </div>
      }
    >
      <main className="space-y-4 px-4 pb-3 pt-3" data-voice-state={voiceState} data-consent-state={consentState} aria-busy={preparing || undefined}>
        <p className="sr-only" aria-live="polite" aria-atomic="true">{liveStatus}</p>
        <p id="voice-state-reason" className="sr-only">{voiceStateCopy[voiceState].detail}</p>

        <ChatBubble
          speaker="CIA"
          tone="cia"
          messageId="voice-prompt"
          status="delivered"
          source="CIA response"
          audience="Only you"
          timestamp="9:40 am"
          dateTime="2026-07-10T09:40:00+05:00"
        >
          What would help right now?
        </ChatBubble>

        {consentState === 'required' ? (
          <GlassCard tone="cia" className="!p-4">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-royal-purple" strokeWidth={2} />
              <h2 className="text-[15px] font-semibold text-paper-100">Review voice privacy</h2>
            </div>
            <p className="mt-2 text-[13px] leading-5 text-paper-100/75">
              This prototype can preview microphone and transcript states without opening your microphone. In the product, speech becomes text for CIA and stays in chat history until you delete it. Raw audio is not stored.
            </p>
            <div className="mt-3"><Provenance items={['Device microphone', 'OS speech-to-text', 'Preview only']} /></div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <BtnSecondary className="h-[52px] w-full px-2 text-[13px]" onClick={() => {
                setConsentState('granted')
                moveTo('ready', 'Voice privacy accepted for this preview. The microphone remains off.')
              }}>Allow voice preview</BtnSecondary>
              <BtnSecondary className="h-[52px] w-full px-2 text-[13px]" onClick={() => {
                setConsentState('denied')
                setVoiceState('disabled')
                setLiveStatus('Voice preview declined. Text chat remains available.')
              }}>Not now</BtnSecondary>
            </div>
            <div className="mt-3"><ConsentRail compact /></div>
          </GlassCard>
        ) : (
          <>
            {transcript && voiceState !== 'success' && (
              <ChatBubble
                speaker="You"
                tone="you"
                messageId="voice-draft"
                status="draft"
                source={voiceState === 'low-confidence' ? 'OS speech-to-text · estimated' : 'Local transcript preview'}
                audience="Only you"
                timestamp="9:41 am"
                dateTime="2026-07-10T09:41:00+05:00"
              >
                <p className={voiceState === 'low-confidence' ? 'text-paper-100/65' : undefined}>{transcript}</p>
                {voiceState === 'low-confidence' && <p className="mt-1 text-[12px] text-paper-100/70">Estimated · low confidence</p>}
              </ChatBubble>
            )}

            {voiceState === 'success' && (
              <ChatBubble
                speaker="You"
                tone="you"
                messageId="voice-sent"
                status="sent"
                source="You sent · transcript preview"
                audience="CIA chat"
                timestamp="9:41 am"
                dateTime="2026-07-10T09:41:00+05:00"
              >
                {transcriptByState.success}
              </ChatBubble>
            )}

            {['silence', 'permission-denied', 'transcription-error', 'network-error', 'max-duration', 'disabled', 'offline'].includes(voiceState) && (
              <div ref={recoveryRef} className="scroll-mb-3 rounded-xl border border-white/10 bg-white/[0.04] p-4" data-testid="voice-recovery-options">
                <h2 className="sr-only">{voiceStateCopy[voiceState].title} recovery options</h2>
                <p className="text-[12px] font-semibold uppercase tracking-wide text-paper-100/65">Recovery options</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {voiceState === 'permission-denied' && (
                    <BtnGhost quiet className="border border-white/10" aria-label="Open microphone settings preview" onClick={() => setLiveStatus('Settings preview only. No operating-system settings were opened.') }>
                      <SlidersHorizontal size={15} /> Settings preview
                    </BtnGhost>
                  )}
                  {['silence', 'transcription-error', 'network-error', 'max-duration'].includes(voiceState) && (
                    <BtnGhost quiet className="border border-white/10" aria-label="Try voice input again" onClick={retryPreview}>
                      <RotateCcw size={15} /> Try voice input again
                    </BtnGhost>
                  )}
                  {voiceState === 'disabled' && consentState === 'denied' && (
                    <BtnGhost quiet className="border border-white/10" aria-label="Review voice privacy" onClick={() => {
                      setConsentState('required')
                      setVoiceState('consent-required')
                      setLiveStatus('Voice privacy review reopened. The microphone remains off.')
                    }}>
                      <ShieldCheck size={15} /> Review voice privacy
                    </BtnGhost>
                  )}
                  {transcript && (
                    <BtnGhost quiet className="border border-white/10" aria-label="Copy transcript" onClick={() => setLiveStatus('Copy is unavailable in this visual-only preview. Your draft remains visible.') }>
                      <Copy size={15} /> Copy transcript
                    </BtnGhost>
                  )}
                </div>
              </div>
            )}

            <button
              type="button"
              className="focus-ring flex min-h-11 w-full items-center justify-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] px-4 text-[13px] text-paper-100/70"
              aria-label="Open crisis support and safety resources"
              aria-expanded={supportOpen}
              aria-controls="voice-safety-panel"
              onClick={() => {
                setSupportOpen(current => !current)
                setLiveStatus(supportOpen ? 'Safety guidance closed.' : 'Safety guidance opened. No call or text action is performed.')
              }}
            >
              <ShieldCheck size={15} strokeWidth={2} />
              Crisis and safety guidance
            </button>

            {supportOpen && (
              <section id="voice-safety-panel" className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <h2 className="text-[14px] font-semibold text-paper-100">Local support guidance</h2>
                <p className="mt-1 text-[13px] leading-5 text-paper-100/70">
                  If you may be in immediate danger, contact local emergency services. This prototype does not place calls or send texts.
                </p>
              </section>
            )}

            {voiceState !== 'success' && <div className="flex justify-end">
              <button
                type="button"
                aria-label="Discard draft transcript before sending"
                className="focus-ring flex min-h-11 items-center gap-1.5 rounded-pill border border-white/10 bg-white/[0.04] px-3 text-[12px] font-medium text-paper-100/70"
                aria-describedby={!consentGranted ? 'voice-state-reason' : undefined}
                disabled={!consentGranted}
                onClick={discardDraft}
              >
                <X size={14} strokeWidth={2} />
                Discard draft
              </button>
            </div>}
          </>
        )}
      </main>
    </HifiShell>
  )
}
