import Image from 'next/image'
import {
  Download,
  Eye,
  Headphones,
  Link2Off,
  Pause,
  Play,
  ShieldCheck,
  SkipForward,
  Sparkles,
  Trash2,
} from 'lucide-react'
import {
  BtnPrimary,
  Chip,
  ComplianceFooter,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassCard,
  HifiShell,
  IconButton,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

export function S80MusicCoach() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Music coach"
          eyebrow="Soundscape"
          back
          right={
            <div className="flex items-center gap-2">
              <IconButton label="Manage data sources">
                <ShieldCheck className="h-5 w-5" />
              </IconButton>
            </div>
          }
        />
      }
      activeTab="today"
    >
      <main className="space-y-5 px-4 pb-6 pt-3">
        {/* Player Hero Card */}
        <GlassCard tone="you" className="overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <Image
                src="/hifi-assets/HIFI-80-01-music-coach.png"
                alt=""
                fill
                sizes="80px"
                priority
                className="object-cover"
              />
              <span aria-hidden="true" className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-paper-100/65">
                Now playing
              </p>
              <h2 className="mt-1 truncate text-lg font-semibold text-paper-100">
                Tempo run focus
              </h2>
              <p className="mt-0.5 text-[12px] leading-4 text-paper-100/70">
                CIA matched to your planned <span className="text-emphasis">pace</span> window
              </p>
            </div>
          </div>

          {/* Scrubber / Waveform */}
          <div className="mt-5">
            <label htmlFor="music-playback-position" className="sr-only">
              Seek Tempo run focus playback position
            </label>
            <div className="relative min-h-11 rounded-lg focus-within:ring-2 focus-within:ring-brand-orange focus-within:ring-offset-2 focus-within:ring-offset-ink-900">
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 flex h-8 -translate-y-1/2 items-end gap-[3px]">
                {Array.from({ length: 40 }).map((_, i) => (
                  <span
                    key={i}
                    className={`flex-1 rounded-full ${i < 25 ? 'bg-brand-orange/80' : 'bg-white/[0.12]'}`}
                    style={{ height: `${20 + Math.abs(Math.sin(i * 0.7)) * 80}%` }}
                  />
                ))}
              </div>
              <input
                id="music-playback-position"
                type="range"
                min={0}
                max={192}
                step={1}
                defaultValue={118}
                aria-describedby="music-playback-times"
                className="absolute inset-0 h-11 w-full cursor-pointer appearance-none bg-transparent opacity-0"
              />
            </div>
            <div id="music-playback-times" className="mt-2 flex items-center justify-between text-xs tabular-nums text-paper-100/65">
              <span>1:58</span>
              <span>3:12</span>
            </div>
          </div>

          {/* Transport Controls - No nested Btn kit, raw buttons w/ semantic classes */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous track"
              className="focus-ring flex h-12 w-12 items-center justify-center rounded-full text-paper-100/70 transition hover:text-paper-100 motion-reduce:transition-none"
            >
              <SkipForward className="h-5 w-5 rotate-180" />
            </button>
            <button
              type="button"
              aria-label="Pause playback"
              className="focus-ring flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-ink-900 shadow-[var(--glow-orange-sm)] transition active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              <Pause className="h-6 w-6" fill="currentColor" />
            </button>
            <button
              type="button"
              aria-label="Next track"
              className="focus-ring flex h-12 w-12 items-center justify-center rounded-full text-paper-100/70 transition hover:text-paper-100 motion-reduce:transition-none"
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
        </GlassCard>

        {/* Context, Provenance & CIA Rationale */}
        <section className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="cia">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              CIA matched
            </Chip>
            <Chip tone="done">Workout ready</Chip>
            <Chip tone="you">Uses: Workout on</Chip>
            <Chip tone="muted">Uses: Mood off</Chip>
          </div>

          <Provenance items={['Source · Spotify', 'Freshness · cached 2m ago']} />

          <GlassCard tone="cia">
            <div className="flex items-start gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-royal-purple" />
              <p className="text-[13px] leading-relaxed text-white/75">
                154-158 BPM fits today&apos;s run mission. Tempo aligns with your planned cadence.
              </p>
            </div>
          </GlassCard>
        </section>

        {/* Recommended Playlists */}
        <section className="space-y-3">
          <SectionTitle title="Recommended playlists" meta="Matched to activity" />

          <div className="space-y-2">
            <button
              type="button"
              aria-label="Play Tempo run focus, 156 BPM"
              className="focus-ring flex h-14 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-left transition hover:bg-white/[0.07] motion-reduce:transition-none"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-orange/15 text-brand-orange">
                <Play className="h-4 w-4" fill="currentColor" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-paper-100">Tempo run focus</p>
                <p className="truncate text-xs text-paper-100/65">156 BPM</p>
              </div>
              <span data-domain-microtext className="rounded-full bg-domain-fitness/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-paper-100">
                Matched
              </span>
            </button>

            <button
              type="button"
              aria-label="Play Deep work pulse, low lyric density"
              className="focus-ring flex h-14 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-left transition hover:bg-white/[0.07] motion-reduce:transition-none"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-paper-100/70">
                <Play className="h-4 w-4" fill="currentColor" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-paper-100">Deep work pulse</p>
                <p className="truncate text-xs text-paper-100/65">Low lyric density</p>
              </div>
            </button>

            <button
              type="button"
              aria-label="Play Evening downshift, breath-led, estimated low confidence"
              className="focus-ring flex h-14 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-left transition hover:bg-white/[0.07] motion-reduce:transition-none"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-paper-100/70">
                <Play className="h-4 w-4" fill="currentColor" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-paper-100/85">Evening downshift</p>
                <p className="truncate text-xs text-paper-100/65">
                  Breath-led · Estimated · low confidence
                </p>
              </div>
            </button>
          </div>
        </section>

        {/* Data Honesty / Privacy Block */}
        <section className="space-y-3 pt-2">
          <SectionTitle title="Listening data" meta="Provider permissions" />

          <SolidCard className="space-y-2">
            <p className="text-[13px] leading-relaxed text-paper-100/70">
              Listening history is not shared with Spotify beyond what the provider requires to play and manage your library.
            </p>
            <p className="text-[13px] leading-relaxed text-paper-100/70">
              History is never shared to social surfaces unless explicitly attached.
            </p>
          </SolidCard>

          <ConsentRail controls={FULL_DATA_CONTROLS} />

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              aria-label="Export listening data"
              className="focus-ring flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-paper-100/70 transition hover:bg-white/[0.07] motion-reduce:transition-none"
            >
              <Download className="h-4 w-4" />
              Export data
            </button>
            <button
              type="button"
              aria-label="Revoke mood and recovery signals"
              className="focus-ring flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-paper-100/70 transition hover:bg-white/[0.07] motion-reduce:transition-none"
            >
              <Eye className="h-4 w-4" />
              Revoke signals
            </button>
            <button
              type="button"
              aria-label="Disconnect Spotify provider"
              className="focus-ring flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-paper-100/70 transition hover:bg-white/[0.07] motion-reduce:transition-none"
            >
              <Link2Off className="h-4 w-4" />
              Disconnect
            </button>
            <button
              type="button"
              aria-label="Delete provider cache"
              className="focus-ring flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-paper-100/70 transition hover:bg-white/[0.07] motion-reduce:transition-none"
            >
              <Trash2 className="h-4 w-4" />
              Delete cache
            </button>
          </div>
        </section>

        {/* Provider CTA */}
        <div className="pt-2">
          <BtnPrimary className="w-full" aria-label="Manage Spotify connection and permissions">
            <Headphones className="mr-2 h-5 w-5" />
            Manage Spotify
          </BtnPrimary>
        </div>

        <ComplianceFooter />
      </main>
    </HifiShell>
  )
}
