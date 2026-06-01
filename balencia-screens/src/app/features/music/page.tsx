'use client'

import { useState } from 'react'
import { Headphones, Info, Music2, Pause, Play, RefreshCw, SkipForward, Sparkles, Unlink } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SignalPill } from '@/components/screens/ConversationSuite'
import { SectionHeader } from '@/components/screens/SectionHeader'

// Screen 80 of 90: Music coach

const playlists = [
  { name: 'Tempo run focus', meta: '156 bpm average, demo recommendation', tone: 'text-domain-fitness' },
  { name: 'Deep work pulse', meta: 'Low lyric, steady attention', tone: 'text-domain-career' },
  { name: 'Evening downshift', meta: 'Breath-led wind-down', tone: 'text-domain-meditation' },
]

function PlayerHero({ track, playing, onToggle, onNext }: { track: string; playing: boolean; onToggle: () => void; onNext: () => void }) {
  return (
    <section className="animate-fade-up rounded-xl border border-domain-career/25 bg-[linear-gradient(145deg,rgba(99,102,241,0.18),rgba(33,16,8,0.96)_64%)] p-5 shadow-2">
      <div className="flex items-start gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.06] text-domain-career">
          <Music2 size={34} strokeWidth={1.8} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-domain-career">Now playing</p>
          <h2 className="mt-2 text-[20px] font-semibold leading-[26px] text-white">{track}</h2>
          <p className="mt-1 text-[12px] leading-4 text-white/45">Demo queue matched to your planned pace window.</p>
        </div>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-pill bg-white/[0.08]">
        <div className="h-full w-[62%] rounded-pill bg-domain-career" />
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">
        <button type="button" onClick={onToggle} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/60" aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? <Pause size={18} strokeWidth={2.2} /> : <Play size={18} strokeWidth={2.2} />}
        </button>
        <button type="button" onClick={onNext} className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange text-white shadow-[var(--glow-orange)]" aria-label="Next track">
          <SkipForward size={18} strokeWidth={2.2} />
        </button>
      </div>
    </section>
  )
}

function BottomAction({ status, onConnect }: { status: string; onConnect: () => void }) {
  return (
    <Button fullWidth disabled={status === 'loading'} onClick={onConnect} leftIcon={<Headphones size={16} strokeWidth={2.2} />}>
      {status === 'connected' ? 'Manage Spotify' : status === 'loading' ? 'Connecting...' : status === 'expired' ? 'Reconnect Spotify' : 'Connect Spotify'}
    </Button>
  )
}

export default function MusicCoachScreen() {
  const [trackIndex, setTrackIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [provider, setProvider] = useState<'idle' | 'loading' | 'connected' | 'expired' | 'error'>('idle')
  const [sheet, setSheet] = useState<'none' | 'rationale' | 'manage' | 'spotify-preview'>('none')
  const openProviderAction = () => {
    if (provider === 'connected') {
      setSheet('manage')
      return
    }
    if (provider === 'loading') return
    setSheet('spotify-preview')
  }
  const connect = () => {
    setSheet('none')
    setProvider('loading')
    window.setTimeout(() => setProvider('connected'), 500)
  }

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Music coach" showBack />} activeTab="me" bottomAction={sheet === 'spotify-preview' ? undefined : <BottomAction status={provider} onConnect={openProviderAction} />}>
        <main className="space-y-5 px-4 pb-6 pt-4">
          {sheet === 'spotify-preview' && (
            <section className="rounded-lg border border-domain-career/25 bg-domain-career/10 p-4" role="dialog" aria-label="Spotify permission preview">
              <div className="flex items-center gap-2 text-[15px] font-semibold leading-5 text-white">
                <Headphones size={16} strokeWidth={2.2} /> Spotify permission preview
              </div>
              <p className="mt-2 text-caption leading-[18px] text-white/60">
                Balencia will request read-only playlist, recent listening, and playback-handoff access. Sync runs when you open Music Coach and at most every 6 hours while connected.
              </p>
              <dl className="mt-3 space-y-2 text-[12px] leading-4 text-white/50">
                <div>
                  <dt className="font-semibold text-white/70">Stored</dt>
                  <dd>Playlist IDs, tempo/mood tags, and coaching fit summaries. Private journal, chat, and health notes are never sent to Spotify.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-white/70">Your controls</dt>
                  <dd>Disconnect stops future sync, delete synced music data from Data Sources, and revoke Balencia from your Spotify account anytime.</dd>
                </div>
              </dl>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="ghost" aria-label="Cancel Spotify permission preview" onClick={() => setSheet('none')}>Cancel</Button>
                <Button aria-label="Allow Spotify playlist access" onClick={connect}>Allow Spotify</Button>
              </div>
            </section>
          )}
          <PlayerHero track={playlists[trackIndex].name} playing={playing} onToggle={() => setPlaying(!playing)} onNext={() => setTrackIndex((trackIndex + 1) % playlists.length)} />
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setSheet('rationale')} className="min-h-11"><SignalPill tone="purple"><Sparkles size={12} /> SIA matched</SignalPill></button>
            <SignalPill tone={provider === 'connected' ? 'green' : 'muted'}>{provider === 'connected' ? 'Spotify connected' : 'Provider ready'}</SignalPill>
          </div>
          <section>
            <SectionHeader title="Recommended playlists" />
            <div className="space-y-3">
              {playlists.map((playlist, index) => (
                <button key={playlist.name} type="button" onClick={() => setTrackIndex(index)} className="w-full text-left">
                  <Card variant="small" className="rounded-lg p-4">
                    <h2 className={`text-[15px] font-semibold leading-5 ${playlist.tone}`}>{playlist.name}</h2>
                    <p className="mt-1 text-[12px] leading-4 text-white/45">{playlist.meta}</p>
                  </Card>
                </button>
              ))}
            </div>
          </section>
          {provider !== 'idle' && (
            <section className="rounded-lg border border-white/[0.08] bg-ink-brown-800 p-4" aria-live="polite">
              <h2 className="text-[15px] font-semibold leading-5 text-white">Spotify status</h2>
              <p className="mt-1 text-caption leading-[18px] text-white/55">{provider === 'loading' ? 'Connecting after permission preview...' : provider === 'connected' ? 'Connected for read-only playlist signals and playback handoff. No private journal, chat, or health notes are sent.' : provider === 'expired' ? 'Token expired. Review permissions before reconnecting.' : 'Connection failed. Review permissions and try again.'}</p>
              {provider === 'connected' && (
                <button
                  type="button"
                  onClick={() => {
                    setProvider('expired')
                    setSheet('none')
                  }}
                  className="mt-3 inline-flex h-11 items-center gap-2 text-caption font-semibold text-brand-orange"
                >
                  <RefreshCw size={15} /> Simulate expired token
                </button>
              )}
            </section>
          )}
          {sheet !== 'none' && sheet !== 'spotify-preview' && (
            <section className="rounded-lg border border-royal-purple/20 bg-royal-purple/10 p-4">
              <div className="flex items-center gap-2 text-[15px] font-semibold leading-5 text-white">{sheet === 'rationale' ? <Info size={16} /> : <Unlink size={16} />} {sheet === 'rationale' ? 'Why SIA matched this' : 'Manage Spotify'}</div>
              <p className="mt-1 text-caption leading-[18px] text-white/60">{sheet === 'rationale' ? 'Signals: planned workout pace, current energy, and time of day. This is a demo recommendation until provider sync is live.' : 'Disconnect removes Spotify tokens, stops future sync, and keeps existing Balencia listening preferences until you delete synced music data from Data Sources or revoke access at Spotify.'}</p>
              {sheet === 'manage' && (
                <button
                  type="button"
                  onClick={() => {
                    setProvider('idle')
                    setSheet('none')
                  }}
                  className="mt-3 h-11 rounded-pill bg-white/[0.06] px-4 text-caption font-semibold text-white/70"
                >
                  Disconnect
                </button>
              )}
            </section>
          )}
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
