'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Activity, Database, Link2, RefreshCw, ShieldCheck } from 'lucide-react'
import { BottomSheet, PhoneModalLayer } from '@/components/design-system/BottomSheet'
import { Button } from '@/components/design-system/Button'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SignalPill } from '@/components/screens/ConversationSuite'
import { SectionHeader } from '@/components/screens/SectionHeader'

// Screen 84 of 90: Data sources

const sources = [
  { name: 'WHOOP', meta: 'Recovery, strain, sleep', state: 'Synced 8 min ago', active: true },
  { name: 'Google Calendar', meta: 'Schedule and conflict detection', state: 'Connected', active: true },
  { name: 'Spotify', meta: 'Music context and focus sessions', state: 'Needs refresh', active: false },
]

const correlations = [
  { label: 'Sleep affects tempo pace', strength: 85 },
  { label: 'Calendar density affects stress', strength: 72 },
  { label: 'Music tempo affects workout consistency', strength: 48 },
]

const correlationGraphTargets: Record<string, string> = {
  'Sleep affects tempo pace': 'sleep',
  'Calendar density affects stress': 'stress',
  'Music tempo affects workout consistency': 'workout',
}

function SourceRow({ source, onOpen }: { source: (typeof sources)[number]; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="flex min-h-[72px] w-full items-center gap-3 rounded-lg border border-white/[0.06] bg-ink-brown-800 p-3 text-left shadow-1">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border ${source.active ? 'border-forest-green/25 bg-forest-green/10 text-forest-green' : 'border-brand-orange/25 bg-brand-orange/10 text-brand-orange'}`}>
        {source.active ? <ShieldCheck size={19} strokeWidth={2} /> : <RefreshCw size={19} strokeWidth={2} />}
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-[15px] font-semibold leading-5 text-white">{source.name}</h2>
        <p className="mt-1 truncate text-[12px] leading-4 text-white/45">{source.meta}</p>
      </div>
      <span className="max-w-[82px] text-right text-[10px] font-semibold leading-[14px] text-white/35">{source.state}</span>
    </button>
  )
}

function BottomAction({ onClick }: { onClick: () => void }) {
  return (
    <Button fullWidth onClick={onClick} leftIcon={<Link2 size={16} strokeWidth={2.2} />}>
      Connect source
    </Button>
  )
}

export default function DataSourcesScreen() {
  const [sheet, setSheet] = useState<'connect' | 'detail' | null>(null)
  const [selected, setSelected] = useState<(typeof sources)[number] | null>(null)
  const [selectedCorrelation, setSelectedCorrelation] = useState<(typeof correlations)[number] | null>(null)
  const [status, setStatus] = useState('')

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Data sources" showBack />} activeTab="me" bottomAction={<BottomAction onClick={() => setSheet('connect')} />}>
        <main className="space-y-5 px-4 pb-6 pt-4">
          <section className="animate-fade-up rounded-xl border border-domain-learning/25 bg-[linear-gradient(145deg,rgba(6,182,212,0.16),rgba(33,16,8,0.96)_64%)] p-5 shadow-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-domain-learning">Correlation engine</p>
                <h2 className="mt-2 text-[22px] font-semibold leading-[28px] text-white">Every source becomes a signal, not clutter.</h2>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-domain-learning/20 text-domain-learning">
                <Database size={20} strokeWidth={2.2} />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <SignalPill tone="green">2 live sources</SignalPill>
              <SignalPill tone="purple">3 correlations</SignalPill>
            </div>
          </section>

          <section>
            <SectionHeader title="Connected sources" />
            <div className="space-y-3">
              {sources.map((source) => (
                <SourceRow key={source.name} source={source} onOpen={() => { setSelected(source); setSheet('detail') }} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Detected correlations" />
            <div className="space-y-3">
              {correlations.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setSelectedCorrelation(item)
                    setStatus('')
                  }}
                  className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] p-3 text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold leading-[18px] text-white">{item.label}</span>
                    <span className="text-[12px] font-semibold leading-none text-domain-learning">{item.strength}</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-pill bg-white/[0.08]">
                    <div className="h-full rounded-pill bg-domain-learning" style={{ width: `${item.strength}%` }} />
                  </div>
                </button>
              ))}
            </div>
          </section>

          <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.04] p-3 text-[12px] leading-[18px] text-white/50">
            <Activity size={16} className="shrink-0 text-domain-learning" strokeWidth={2} />
            Data source health is checked before SIA uses it in coaching.
          </div>
          {status && <p className="rounded-md bg-forest-green/10 p-3 text-[12px] font-semibold leading-4 text-forest-green" aria-live="polite">{status}</p>}
          {sheet && (
            <PhoneModalLayer>
              <BottomSheet
                title={sheet === 'connect' ? 'Connect source' : selected?.name ?? 'Source detail'}
                onClose={() => setSheet(null)}
                closeLabel="Close data source sheet"
                variant="modal"
                contentClassName="px-4 pb-1 pt-1"
              >
              {sheet === 'connect' && (
                <div className="space-y-3">
                  {['Apple Health', 'Google Calendar', 'Spotify'].map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      onClick={() => {
                        setStatus(`${provider} demo OAuth connected. Scopes previewed before sync.`)
                        setSheet(null)
                      }}
                      className="flex min-h-14 w-full items-center justify-between rounded-md border border-white/10 bg-ink-brown-800 px-4 text-left text-[15px] font-semibold text-white"
                    >
                      {provider}
                      <span className="text-[11px] text-white/35">Demo OAuth</span>
                    </button>
                  ))}
                  <p className="text-[12px] leading-4 text-white/45">Before connection, Balencia previews scopes, purpose, sync frequency, storage, disconnect, deletion, and provider revocation behavior.</p>
                </div>
              )}
              {sheet === 'detail' && selected && (
                <div className="space-y-3">
                  <p className="rounded-md bg-white/[0.04] p-3 text-[13px] leading-[18px] text-white/55">{selected.meta}. Status: {selected.state}. This prototype uses demo source health and no live sync.</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="skip" onClick={() => setStatus(`${selected.name} refresh requested`)}>Refresh</Button>
                    <Button variant="skip" onClick={() => setStatus(`${selected.name} disconnect confirmation opened`)}>Disconnect</Button>
                  </div>
                </div>
              )}
              </BottomSheet>
            </PhoneModalLayer>
          )}
          {selectedCorrelation && (
            <PhoneModalLayer>
              <BottomSheet
                title={selectedCorrelation.label}
                onClose={() => setSelectedCorrelation(null)}
                closeLabel="Close correlation detail"
                variant="modal"
                contentClassName="px-4 pb-1 pt-1"
              >
                <div className="space-y-3">
                  <p className="rounded-md bg-white/[0.04] p-3 text-[13px] leading-[18px] text-white/55">
                    Strength {selectedCorrelation.strength}/100. SIA treats this as a coaching signal, not proof of causation.
                  </p>
                  <dl className="grid gap-2 rounded-md bg-ink-brown-800 p-3 text-[12px] leading-4 text-white/55">
                    <div className="flex justify-between gap-3">
                      <dt>Source window</dt>
                      <dd className="text-right font-semibold text-white">Last 14 synced days</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt>Data used</dt>
                      <dd className="max-w-[180px] text-right font-semibold text-white">Opted-in provider summaries only</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt>Graph context</dt>
                      <dd className="text-right font-semibold text-white">Knowledge Graph ready</dd>
                    </div>
                  </dl>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="skip" onClick={() => setSelectedCorrelation(null)}>Close</Button>
                    <Link href={`/tabs/me/knowledge-graph?correlation=${correlationGraphTargets[selectedCorrelation.label]}`} className="flex h-12 items-center justify-center rounded-pill bg-brand-orange text-[15px] font-semibold leading-5 text-white">
                      Open graph
                    </Link>
                  </div>
                </div>
              </BottomSheet>
            </PhoneModalLayer>
          )}
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
