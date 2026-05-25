import { Play, Search, Sparkles, Video } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { SearchBar } from '@/components/design-system/SearchBar'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SignalPill } from '@/components/screens/ConversationSuite'
import { SectionHeader } from '@/components/screens/SectionHeader'

// Screen 81 of 90: Video library

const videos = [
  { title: '5-minute hip reset', meta: 'Recommended after long sitting', duration: '5:20' },
  { title: 'Post-run stretch', meta: 'Protects tomorrow recovery score', duration: '8:45' },
  { title: 'Calm focus primer', meta: 'Before deep work blocks', duration: '4:10' },
]

function FeaturedVideo() {
  return (
    <section className="animate-fade-up overflow-hidden rounded-xl border border-white/[0.08] bg-ink-brown-800 shadow-2">
      <div className="relative h-44 bg-[radial-gradient(circle_at_70%_24%,rgba(255,94,0,0.28),transparent_34%),linear-gradient(145deg,rgba(239,68,68,0.22),rgba(33,16,8,0.92))]">
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange text-white shadow-[var(--glow-orange)]" aria-label="Play featured video">
            <Play size={26} fill="currentColor" strokeWidth={1.8} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/45">SIA pick</p>
            <h2 className="mt-1 text-[19px] font-semibold leading-[24px] text-white">Post-run mobility</h2>
          </div>
          <SignalPill tone="orange">8 min</SignalPill>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[13px] leading-[19px] text-white/55">Chosen because your left hip tightness appears after tempo sessions.</p>
      </div>
    </section>
  )
}

function BottomAction() {
  return (
    <Button fullWidth leftIcon={<Search size={16} strokeWidth={2.2} />}>
      Search YouTube
    </Button>
  )
}

export default function VideoLibraryScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Video library" showBack />} activeTab="me" bottomAction={<BottomAction />}>
        <main className="space-y-5 px-4 pb-6 pt-4">
          <SearchBar placeholder="Search coaching videos" />
          <FeaturedVideo />
          <section>
            <SectionHeader title="Next best videos" />
            <div className="space-y-3">
              {videos.map((item) => (
                <Card key={item.title} variant="small" className="rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-white/[0.08] bg-white/[0.04] text-brand-orange">
                      <Video size={19} strokeWidth={2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-[15px] font-semibold leading-5 text-white">{item.title}</h2>
                      <p className="mt-1 truncate text-[12px] leading-4 text-white/45">{item.meta}</p>
                    </div>
                    <span className="text-[11px] font-semibold leading-none text-white/35">{item.duration}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>
          <div className="flex items-center gap-2 rounded-lg border border-royal-purple/20 bg-royal-purple/10 p-3 text-[12px] leading-[18px] text-white/60">
            <Sparkles size={16} className="shrink-0 text-royal-purple" strokeWidth={2} />
            SIA filters videos by your active missions and recovery context.
          </div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
