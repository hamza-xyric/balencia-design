import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { VoiceWaveform } from '@/components/screens/VoiceWaveform'
import { Mic, X } from 'lucide-react'

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

function SiaAvatar() {
  return (
    <div className="relative flex h-[248px] items-center justify-center">
      <div className="absolute h-[240px] w-[240px] rounded-full bg-royal-purple/20 blur-3xl" />
      <div className="avatar-breathe relative flex h-[200px] w-[200px] items-center justify-center rounded-full">
        <div className="absolute inset-0 rounded-full border border-royal-purple/30 bg-ink-brown-800/80 shadow-[var(--glow-purple)]" />
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
            <SiaAvatar />

            <div className="mt-8 max-w-[280px] text-center text-[15px] leading-5 text-white/70">
              Hey. I&apos;m here. You can talk to me about missions, how your day went, or what is worth your attention next.
            </div>

            <VoiceWaveform tone="purple" className="mt-6" />

            <button className="mt-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/70" aria-label="Mute microphone">
              <Mic size={22} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  )
}
