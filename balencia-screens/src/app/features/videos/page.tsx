'use client'

import { useMemo, useState } from 'react'
import { Play, Search, Sparkles, Video, X } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
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

function FeaturedVideo({ onPlay }: { onPlay: (title: string) => void }) {
  return (
    <section className="animate-fade-up overflow-hidden rounded-xl border border-white/[0.08] bg-ink-brown-800 shadow-2">
      <div className="relative h-44 bg-[radial-gradient(circle_at_70%_24%,rgba(255,94,0,0.28),transparent_34%),linear-gradient(145deg,rgba(239,68,68,0.22),rgba(33,16,8,0.92))]">
        <div className="absolute inset-0 flex items-center justify-center">
          <button type="button" onClick={() => onPlay('Post-run mobility')} className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange text-white shadow-[var(--glow-orange)]" aria-label="Play featured video">
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

function BottomAction({ onExternal }: { onExternal: () => void }) {
  return (
    <Button fullWidth onClick={onExternal} leftIcon={<Search size={16} strokeWidth={2.2} />}>
      Search YouTube
    </Button>
  )
}

export default function VideoLibraryScreen() {
  const [query, setQuery] = useState('')
  const [playing, setPlaying] = useState('')
  const [handoff, setHandoff] = useState(false)
  const results = useMemo(() => videos.filter((video) => `${video.title} ${video.meta}`.toLowerCase().includes(query.toLowerCase())), [query])
  const outgoingQuery = query.trim() || 'mobility coaching'

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Video library" showBack />} activeTab="me" bottomAction={<BottomAction onExternal={() => setHandoff(true)} />}>
        <main className="space-y-5 px-4 pb-6 pt-4">
          <label className="flex h-11 items-center gap-3 rounded-pill border border-white/10 bg-ink-brown-800 px-4 text-[15px] leading-5 shadow-1" role="search">
            <Search size={16} className="shrink-0 text-white/40" strokeWidth={1.8} />
            <input aria-label="Search coaching videos" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search coaching videos" className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/40" />
            {query && <button type="button" aria-label="Clear video search" onClick={() => setQuery('')} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/40"><X size={16} /></button>}
          </label>
          <FeaturedVideo onPlay={setPlaying} />
          <section>
            <SectionHeader title={`Next best videos (${results.length})`} />
            <div className="space-y-3">
              {results.map((item) => (
                <button type="button" key={item.title} onClick={() => setPlaying(item.title)} className="w-full text-left">
                <Card variant="small" className="rounded-lg p-4">
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
                </button>
              ))}
            </div>
            {results.length === 0 && <p className="mt-4 text-center text-[15px] leading-5 text-white/45">No coaching videos match &quot;{query}&quot;.</p>}
          </section>
          <div className="flex items-center gap-2 rounded-lg border border-royal-purple/20 bg-royal-purple/10 p-3 text-[12px] leading-[18px] text-white/60">
            <Sparkles size={16} className="shrink-0 text-royal-purple" strokeWidth={2} />
            SIA filters videos by your active missions and recovery context.
          </div>
          {playing && (
            <section className="rounded-lg border border-brand-orange/25 bg-ink-brown-800 p-4" role="dialog" aria-label="Video player">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-[15px] font-semibold leading-5 text-white">Playing {playing}</h2>
                  <p className="mt-1 text-caption leading-[18px] text-white/55">Watched state recorded for this demo session.</p>
                </div>
                <button type="button" aria-label="Close video player" onClick={() => setPlaying('')} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/45"><X size={17} /></button>
              </div>
            </section>
          )}
          {handoff && (
            <section className="rounded-lg border border-royal-purple/20 bg-royal-purple/10 p-4" role="dialog" aria-label="YouTube handoff confirmation">
              <h2 className="text-[15px] font-semibold leading-5 text-white">Open YouTube?</h2>
              <p className="mt-1 text-caption leading-[18px] text-white/60">Outgoing query: &quot;{outgoingQuery}&quot;. Private health and journal details are stripped by default.</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setHandoff(false)} className="h-11 rounded-pill bg-white/[0.06] text-caption font-semibold text-white/70">Cancel</button>
                <button type="button" onClick={() => setHandoff(false)} className="h-11 rounded-pill bg-brand-orange text-caption font-semibold text-white">Continue</button>
              </div>
            </section>
          )}
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
