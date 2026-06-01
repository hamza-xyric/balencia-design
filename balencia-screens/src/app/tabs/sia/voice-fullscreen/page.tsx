'use client'

import { useEffect, useState } from 'react'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { VoiceWaveform } from '@/components/screens/VoiceWaveform'
import { Mic, MicOff, X } from 'lucide-react'

// Screen 11 of 78: Voice mode full
// Spec: /Users/hamza/yHealth/app_design 3/11-sia-voice-full-screen.md

const particles = [
  { left: 42, top: 98, size: 3, tone: 'bg-white/10', delay: 0 },
  { left: 316, top: 118, size: 2, tone: 'bg-royal-purple/20', delay: 250 },
  { left: 84, top: 174, size: 2, tone: 'bg-royal-purple/15', delay: 500 },
  { left: 286, top: 214, size: 3, tone: 'bg-white/10', delay: 700 },
  { left: 54, top: 272, size: 2, tone: 'bg-royal-purple/15', delay: 900 },
  { left: 322, top: 316, size: 2, tone: 'bg-white/10', delay: 1200 },
  { left: 112, top: 382, size: 3, tone: 'bg-white/10', delay: 1450 },
  { left: 260, top: 424, size: 2, tone: 'bg-royal-purple/15', delay: 1700 },
  { left: 66, top: 514, size: 2, tone: 'bg-white/10', delay: 1900 },
  { left: 304, top: 564, size: 3, tone: 'bg-royal-purple/15', delay: 2100 },
]

function AmbientParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          key={`${particle.left}-${particle.top}-${index}`}
          className={['ambient-drift absolute rounded-full', particle.tone].join(' ')}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: `${particle.delay}ms`,
          }}
        />
      ))}
    </div>
  )
}

function SiaAvatar({ state }: { state: string }) {
  return (
    <div className="relative flex h-[248px] items-center justify-center">
      <div className="absolute h-[240px] w-[240px] rounded-full bg-royal-purple/20 blur-3xl" />
      <div className="avatar-breathe relative flex h-[200px] w-[200px] items-center justify-center rounded-full">
        <div className={[
          'absolute inset-0 rounded-full border bg-ink-brown-800/80 shadow-[var(--glow-purple)]',
          state === 'speaking' ? 'border-brand-orange/40' : state === 'thinking' ? 'border-royal-purple/50' : 'border-royal-purple/30',
        ].join(' ')} />
        <div className="absolute inset-6 rounded-full border border-white/[0.06] bg-white/[0.03]" />
        <div className="absolute left-10 top-9 h-16 w-11 rounded-full bg-royal-purple/20 blur-xl" />
        <div className="absolute bottom-10 right-10 h-20 w-12 rounded-full bg-royal-purple/25 blur-xl" />
        <div className="relative flex h-[118px] w-[118px] items-center justify-center rounded-full border border-white/[0.08] bg-ink-900 text-[40px] font-semibold text-white">
          S
        </div>
      </div>
    </div>
  )
}

export default function VoiceModeFullScreen() {
  const [permission, setPermission] = useState(false)
  const [muted, setMuted] = useState(false)
  const [state, setState] = useState<'listening' | 'thinking' | 'speaking'>('listening')
  const [transcript, setTranscript] = useState('Balencia needs microphone access for voice mode.')

  const allow = () => {
    setPermission(true)
    setTranscript("I'm listening. Tell me what needs attention today.")
    setState('listening')
  }

  useEffect(() => {
    if (!permission || muted) return

    const readyTimer = window.setTimeout(() => {
      setState('listening')
      setTranscript("I'm listening. Tell me what needs attention today.")
    }, 0)
    const thinkingTimer = window.setTimeout(() => {
      setState('thinking')
      setTranscript('Thinking through your recovery, schedule, and missions...')
    }, 1200)
    const speakingTimer = window.setTimeout(() => {
      setState('speaking')
      setTranscript('SIA: Start with the short recovery walk, then protect your deep work block.')
    }, 2300)

    return () => {
      window.clearTimeout(readyTimer)
      window.clearTimeout(thinkingTimer)
      window.clearTimeout(speakingTimer)
    }
  }, [permission, muted])

  return (
    <PhoneFrame>
      <div className="relative h-full overflow-hidden bg-ink-900">
        <AmbientParticles />

        <div className="relative z-10 flex h-full flex-col px-4">
          <div className="h-[54px] shrink-0" />
          <div className="flex h-11 shrink-0 items-center justify-end">
            <a href="/tabs/sia" className="flex h-11 w-11 items-center justify-center text-white/50" aria-label="Close voice mode">
              <X size={20} strokeWidth={1.8} />
            </a>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center pb-8">
            <div className="h-[72px]" />
            <SiaAvatar state={state} />

            <div className="mt-8 max-w-[280px] text-center text-[15px] leading-5 text-white/70">
              <span aria-live="polite">{muted ? 'Microphone muted. Unmute when you are ready.' : transcript}</span>
            </div>

            <VoiceWaveform tone="purple" className="mt-6" />

            {!permission ? (
              <div className="mt-5 max-w-[300px] text-center">
                <p className="text-caption leading-[18px] text-white/45">
                  Voice starts only after permission. Raw audio is discarded; transcripts can be reviewed or deleted and are not used for model training or human review.
                </p>
                <button type="button" onClick={allow} className="mt-4 h-12 rounded-pill bg-brand-orange px-5 text-[15px] font-semibold text-white">
                  Allow microphone
                </button>
              </div>
            ) : (
              <div className="mt-5 flex items-center gap-3">
                <button type="button" onClick={() => setMuted((current) => !current)} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/70" aria-pressed={muted} aria-label={muted ? 'Unmute microphone, currently muted' : 'Mute microphone'}>
                  {muted ? <MicOff size={22} strokeWidth={1.8} /> : <Mic size={22} strokeWidth={1.8} />}
                </button>
                <div className="rounded-pill border border-white/10 px-4 py-2 text-caption font-semibold leading-[18px] text-white/55" aria-live="polite">
                  {state === 'listening' ? 'Listening' : state === 'thinking' ? 'Thinking' : 'Speaking'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PhoneFrame>
  )
}
