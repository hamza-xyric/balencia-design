import { Headphones, Play, Pause, SkipForward, Sparkles, ShieldCheck, Music2, Trash2, Download, Link2Off, Eye } from 'lucide-react'
import {
  BtnPrimary,
  Chip,
  ComplianceFooter,
  ConsentRail,
  GlassCard,
  HifiShell,
  IconButton,
  Provenance,
  SectionTitle,
  TopBar
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
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/30 via-royal-purple/10 to-transparent" />
              <Music2 className="absolute inset-0 m-auto h-8 w-8 text-white/70" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14rem] text-white/45">
                Now playing
              </p>
              <h2 className="mt-1 truncate text-lg font-semibold text-white">
                Tempo run focus
              </h2>
              <p className="mt-0.5 truncate text-[13px] text-white/60">
                CIA matched to your planned <span className="text-emphasis">pace</span> window
              </p>
            </div>
          </div>

          {/* Scrubber / Waveform */}
          <div className="mt-5">
            <div className="flex h-8 items-end gap-[3px]">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full ${i < 25 ? 'bg-brand-orange/80' : 'bg-white/[0.08]'}`}
                  style={{ height: `${20 + Math.abs(Math.sin(i * 0.7)) * 80}%` }}
                />
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs tabular-nums text-white/50">
              <span>1:58</span>
              <span>3:12</span>
            </div>
          </div>

          {/* Transport Controls - No nested Btn kit, raw buttons w/ semantic classes */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous track"
              className="flex h-12 w-12 items-center justify-center text-white/60 transition hover:text-white"
            >
              <SkipForward className="h-5 w-5 rotate-180" />
            </button>
            <button
              type="button"
              aria-label="Pause playback"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-ink-900 shadow-[var(--glow-orange-sm)] transition active:scale-95"
            >
              <Pause className="h-6 w-6" fill="currentColor" />
            </button>
            <button
              type="button"
              aria-label="Next track"
              className="flex h-12 w-12 items-center justify-center text-white/60 transition hover:text-white"
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

          <Provenance items={['Via Spotify', 'Cached 2m ago']} />

          <GlassCard tone="cia" className="!bg-transparent border border-royal-purple/20">
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
              className="flex h-14 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-left transition hover:bg-white/[0.07]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-orange/15 text-brand-orange">
                <Play className="h-4 w-4" fill="currentColor" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">Tempo run focus</p>
                <p className="truncate text-xs text-white/50">156 BPM</p>
              </div>
              <span className="rounded-full bg-domain-fitness/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-domain-fitness">
                Matched
              </span>
            </button>

            <button
              type="button"
              aria-label="Play Deep work pulse, low lyric density"
              className="flex h-14 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-left transition hover:bg-white/[0.07]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-white/60">
                <Play className="h-4 w-4" fill="currentColor" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">Deep work pulse</p>
                <p className="truncate text-xs text-white/50">Low lyric density</p>
              </div>
            </button>

            <button
              type="button"
              aria-label="Play Evening downshift, breath-led, estimated low confidence"
              className="flex h-14 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-left transition hover:bg-white/[0.07]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-white/60">
                <Play className="h-4 w-4" fill="currentColor" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white/80">Evening downshift</p>
                <p className="truncate text-xs text-white/40">
                  Breath-led · Estimated · low confidence
                </p>
              </div>
            </button>
          </div>
        </section>

        {/* Data Honesty / Privacy Block */}
        <section className="space-y-3 pt-2">
          <SectionTitle title="Listening data" meta="Provider permissions" />
          
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <p className="text-[13px] leading-relaxed text-white/65">
              Listening history is not shared with Spotify beyond what the provider requires to play and manage your library.
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-white/65">
              History is never shared to social surfaces unless explicitly attached.
            </p>
          </div>

          <ConsentRail />

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              aria-label="Export listening data"
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-white/70 transition hover:bg-white/[0.07]"
            >
              <Download className="h-4 w-4" />
              Export data
            </button>
            <button
              type="button"
              aria-label="Revoke mood and recovery signals"
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-white/70 transition hover:bg-white/[0.07]"
            >
              <Eye className="h-4 w-4" />
              Revoke signals
            </button>
            <button
              type="button"
              aria-label="Disconnect Spotify provider"
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-white/70 transition hover:bg-white/[0.07]"
            >
              <Link2Off className="h-4 w-4" />
              Disconnect
            </button>
            <button
              type="button"
              aria-label="Delete provider cache"
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-white/70 transition hover:bg-white/[0.07]"
            >
              <Trash2 className="h-4 w-4" />
              Delete cache
            </button>
          </div>
        </section>

        {/* Provider CTA */}
        <div className="pt-2">
          <BtnPrimary>
            <Headphones className="mr-2 h-5 w-5" />
            Connect Spotify
          </BtnPrimary>
        </div>

        <ComplianceFooter />
      </main>
    </HifiShell>
  )
}