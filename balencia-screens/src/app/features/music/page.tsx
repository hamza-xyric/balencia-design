import { Headphones, Music2, Pause, SkipForward, Sparkles } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SignalPill } from '@/components/screens/ConversationSuite'
import { SectionHeader } from '@/components/screens/SectionHeader'

// Screen 80 of 90: Music coach

const playlists = [
  { name: 'Tempo run focus', meta: '156 bpm average, synced from Spotify', tone: 'text-domain-fitness' },
  { name: 'Deep work pulse', meta: 'Low lyric, steady attention', tone: 'text-domain-career' },
  { name: 'Evening downshift', meta: 'Breath-led wind-down', tone: 'text-domain-meditation' },
]

function PlayerHero() {
  return (
    <section className="animate-fade-up rounded-xl border border-domain-career/25 bg-[linear-gradient(145deg,rgba(99,102,241,0.18),rgba(33,16,8,0.96)_64%)] p-5 shadow-2">
      <div className="flex items-start gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.06] text-domain-career">
          <Music2 size={34} strokeWidth={1.8} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-domain-career">Now playing</p>
          <h2 className="mt-2 text-[20px] font-semibold leading-[26px] text-white">Tempo run focus</h2>
          <p className="mt-1 text-[12px] leading-4 text-white/45">SIA matched this to your planned pace window.</p>
        </div>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-pill bg-white/[0.08]">
        <div className="h-full w-[62%] rounded-pill bg-domain-career" />
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">
        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/60" aria-label="Pause">
          <Pause size={18} strokeWidth={2.2} />
        </button>
        <button className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange text-white shadow-[var(--glow-orange)]" aria-label="Next track">
          <SkipForward size={18} strokeWidth={2.2} />
        </button>
      </div>
    </section>
  )
}

function BottomAction() {
  return (
    <Button fullWidth leftIcon={<Headphones size={16} strokeWidth={2.2} />}>
      Connect Spotify
    </Button>
  )
}

export default function MusicCoachScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Music coach" showBack />} activeTab="me" bottomAction={<BottomAction />}>
        <main className="space-y-5 px-4 pb-6 pt-4">
          <PlayerHero />
          <div className="flex flex-wrap gap-2">
            <SignalPill tone="purple"><Sparkles size={12} /> SIA matched</SignalPill>
            <SignalPill tone="green">Workout ready</SignalPill>
          </div>
          <section>
            <SectionHeader title="Recommended playlists" />
            <div className="space-y-3">
              {playlists.map((playlist) => (
                <Card key={playlist.name} variant="small" className="rounded-lg p-4">
                  <h2 className={`text-[15px] font-semibold leading-5 ${playlist.tone}`}>{playlist.name}</h2>
                  <p className="mt-1 text-[12px] leading-4 text-white/45">{playlist.meta}</p>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
