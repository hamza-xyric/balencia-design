import { Keyboard, LifeBuoy, Mic, VolumeX, X } from 'lucide-react'
import { CIAPresenceOrb, GlassCard, HifiShell, IconButton } from '@/components/hifi/kit'

// Distraction-free full-screen voice conversation — the only surface that
// replaces dashboards entirely with CIA's presence. No tab bar, no
// composer: the dock below is fixed control chrome, not navigation.
export function S11CiaVoiceFullScreen() {
  return (
    <HifiShell
      atmosphere="cia"
      showTabBar={false}
      header={
        <header className="z-30 flex min-h-[58px] shrink-0 items-center justify-between px-4">
          <IconButton label="Get support">
            <LifeBuoy size={20} strokeWidth={1.8} />
          </IconButton>
          <IconButton label="Close voice mode">
            <X size={20} strokeWidth={1.8} />
          </IconButton>
        </header>
      }
      bottomAction={
        <div className="glass-frost -mx-4 rounded-t-[28px] border-t border-white/10 px-6 pb-4 pt-6">
          <div className="flex h-10 items-center justify-center gap-[3px]" role="img" aria-label="Voice amplitude, your voice in orange, CIA in purple">
            {[7, 14, 22, 12, 6, 18, 13].map((barHeight, index) => (
              <span key={`you-${index}`} className="w-[3px] rounded-pill bg-brand-orange" style={{ height: barHeight, opacity: 0.5 + (barHeight / 22) * 0.5 }} />
            ))}
            <span className="mx-2 h-full w-px bg-white/10" />
            {[5, 10, 20, 15, 8, 13].map((barHeight, index) => (
              <span key={`cia-${index}`} className="w-[3px] rounded-pill border border-dashed border-royal-purple/70" style={{ height: barHeight, opacity: 0.5 + (barHeight / 20) * 0.5 }} />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <IconButton label="Switch to keyboard">
              <Keyboard size={19} strokeWidth={1.8} />
            </IconButton>

            <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] shadow-[var(--glow-orange-sm)]" aria-label="Toggle microphone, idle">
              <span className="absolute inset-2 rounded-full bg-brand-orange/15" />
              <Mic size={22} className="relative text-brand-orange" strokeWidth={2} />
            </span>

            <IconButton label="Mute CIA&rsquo;s voice">
              <VolumeX size={19} strokeWidth={1.8} />
            </IconButton>
          </div>
        </div>
      }
    >
      <h1 className="sr-only">CIA voice, full screen</h1>
      <main className="flex h-full flex-col items-center px-6 pb-4 pt-10">
        <div className="flex h-[200px] w-[200px] items-center justify-center">
          <CIAPresenceOrb size={200} state="idle" />
        </div>

        <div className="mt-8 w-full max-w-[280px]">
          <GlassCard tone="cia">
            <p className="text-center text-[16px] leading-6 text-paper-100">
              Hey. I&rsquo;m here. You can talk to me about anything, or just think out loud.
            </p>
          </GlassCard>
        </div>

        <p className="mt-5 max-w-[260px] text-center text-[12px] leading-4 text-white/45">
          A distraction-free <span className="text-emphasis">screen</span> for presence, one voice at a time.
        </p>

        <p className="mt-auto max-w-[260px] pt-6 text-center text-[11px] leading-4 text-white/55">
          Voice becomes text and joins your CIA chat history. Support stays one tap away.
        </p>
      </main>
    </HifiShell>
  )
}
