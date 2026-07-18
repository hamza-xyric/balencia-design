'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { BtnGhost, BtnSecondary, Chip, GlassCard, HifiShell, ProgressBar, Provenance, SectionTitle, SolidCard, Sparkline, TopBar, cx, type LifeDomainDatum } from '@/components/hifi/kit'
import { E1Modal } from './E1Modal'

const lifeDomains = [
  { name: 'Fitness', shortLabel: 'Fit', value: 58, source: 'Workout log', week: 4, month: 7 },
  { name: 'Sleep', shortLabel: 'Sleep', value: 50, source: 'Health', week: 1, month: 3 },
  { name: 'Career', shortLabel: 'Career', value: 46, source: 'Calendar', week: -3, month: -1 },
  { name: 'Nutrition', shortLabel: 'Nutr.', value: 43, source: 'You logged', week: 2, month: 5 },
  { name: 'Finance', shortLabel: 'Finance', value: 38, source: 'You logged', week: 1, month: 2 },
  { name: 'Faith', shortLabel: 'Faith', value: 32, source: 'You logged', week: 2, month: 4 },
  { name: 'Productivity', shortLabel: 'Focus', value: 49, source: 'Calendar', week: 3, month: 6 },
  { name: 'Relationships', shortLabel: 'People', value: 44, source: 'You logged', week: 2, month: 3 },
  { name: 'Wellbeing', shortLabel: 'Well.', value: 40, source: 'Mood check-ins', week: 2, month: 5 },
  { name: 'Meditation', shortLabel: 'Medit.', value: 33, source: 'Session log', week: 1, month: 4 },
] satisfies Array<LifeDomainDatum & { week: number; month: number }>

const average = lifeDomains.reduce((total, domain) => total + domain.value, 0) / lifeDomains.length
const balanceBonus = (Math.min(...lifeDomains.map(domain => domain.value)) / Math.max(...lifeDomains.map(domain => domain.value))) * 10
const lifePower = Math.round(average + balanceBonus)
const trends = {
  Current: [39, 40, 41, 40, 42, 42, Math.round(average)],
  'Vs week': [40, 41, 40, 42, 42, 42, Math.round(average)],
  'Vs month': [36, 37, 38, 39, 40, 42, Math.round(average)],
} as const
type Comparison = keyof typeof trends
type DialogName = 'domain' | 'controls' | null

function radarPoint(index: number, value: number) {
  const angle = -Math.PI / 2 + (index / lifeDomains.length) * Math.PI * 2
  const radius = 66 * value / 99
  return `${(100 + Math.cos(angle) * radius).toFixed(1)},${(100 + Math.sin(angle) * radius).toFixed(1)}`
}

function comparisonValue(domain: typeof lifeDomains[number], comparison: Comparison) {
  if (comparison === 'Current') return String(domain.value)
  const delta = comparison === 'Vs week' ? domain.week : domain.month
  return `${delta >= 0 ? '+' : ''}${delta}`
}

export function S16LifeAreas() {
  const [requested, setRequested] = useState('default')
  const [comparison, setComparison] = useState<Comparison>('Current')
  const [dialog, setDialog] = useState<DialogName>(null)
  const [selectedDomain, setSelectedDomain] = useState(lifeDomains[0])
  const opener = useRef<HTMLButtonElement | null>(null)
  const low = requested === 'low-confidence'
  const empty = requested === 'empty'
  const error = requested === 'error'
  const offline = requested === 'offline'
  const visiblePower = lifePower
  const polygon = useMemo(() => lifeDomains.map((domain, index) => radarPoint(index, empty || error ? 0 : domain.value)).join(' '), [empty, error])

  useEffect(() => {
    const state = new URLSearchParams(window.location.search).get('state') ?? 'default'
    queueMicrotask(() => {
      setRequested(state)
      setComparison(state === 'compare-week' ? 'Vs week' : 'Current')
      setDialog(state === 'domain-detail' ? 'domain' : state === 'data-controls' ? 'controls' : null)
    })
  }, [])

  function closeDialog() {
    setDialog(null)
    requestAnimationFrame(() => { if (opener.current?.isConnected) opener.current.focus() })
  }
  function openDialog(next: Exclude<DialogName, null>, trigger: HTMLButtonElement) { opener.current = trigger; setDialog(next) }

  return (
    <HifiShell
      header={<TopBar title="Life areas" right={<button type="button" className="focus-ring min-h-11 rounded-pill px-3 text-[12px] font-semibold text-paper-100/75" onClick={event => openDialog('controls', event.currentTarget)}>Data controls</button>} />}
      activeTab="me"
      overlay={dialog ? <DetailDialog kind={dialog} domain={selectedDomain} onClose={closeDialog} /> : undefined}
    >
      <main className="space-y-4 px-4 pb-6 pt-3" data-state={requested}>
        {offline && <p role="status" className="glass-pill px-4 py-3 text-[13px] text-paper-100/75">Offline — showing last sync 2h ago</p>}
        {error && <SolidCard><p role="alert" className="text-[14px] text-paper-100">Couldn&rsquo;t load latest data.</p><BtnSecondary className="mt-3" onClick={() => setRequested('default')}>Retry locally</BtnSecondary></SolidCard>}
        <GlassCard>
          <div className="flex items-center justify-between gap-3">
            <p className="text-[12px] font-semibold uppercase text-white/65">Life Power</p>
            <Chip>{error ? 'Unavailable · no current data' : low ? 'Estimated · low confidence' : empty ? 'Building your balance' : 'Calculated · 10 domains'}</Chip>
          </div>
          <div className="relative mx-auto h-[220px] w-[220px] max-w-full" role="img" data-domain-count="10" aria-label={error ? 'Life Power unavailable because current domain data could not load.' : empty ? 'Life Power unavailable. Ten domains have no data yet.' : `Life Power ${visiblePower}. Weighted average ${average.toFixed(1)} plus balance bonus ${balanceBonus.toFixed(1)}. ${lifeDomains.map(domain => `${domain.name} ${domain.value} from ${domain.source}`).join(', ')}.`}>
            <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full">
              <polygon points={lifeDomains.map((_, index) => radarPoint(index, 99)).join(' ')} fill="none" className="stroke-brand-orange/25" />
              {lifeDomains.map((domain, index) => <line key={domain.name} x1="100" y1="100" x2={radarPoint(index, 99).split(',')[0]} y2={radarPoint(index, 99).split(',')[1]} className="stroke-brand-orange/15" />)}
              {!error && <polygon points={polygon} className={cx('stroke-brand-orange', empty ? 'fill-none stroke-dasharray-[4_4] opacity-30' : 'fill-brand-orange/15', low && 'opacity-60')} strokeWidth="2" />}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center"><strong className="text-[32px] tabular-nums text-paper-100">{empty || error ? '—' : visiblePower}</strong><span className="text-[12px] text-paper-100/70">Life Power</span></div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center"><div className="rounded-lg border border-white/10 p-3"><p className="text-[11px] text-white/65">Average</p><p className="text-[20px] font-semibold tabular-nums">{empty || error ? '—' : Math.round(average)}</p></div><div className="rounded-lg border border-white/10 p-3"><p className="text-[11px] text-white/65">Reporting</p><p className="text-[20px] font-semibold tabular-nums">{empty ? '0/10' : error ? 'Unavailable' : '10/10'}</p></div></div>
        </GlassCard>

        {!empty && !error && <SolidCard><SectionTitle title="Last 7 weeks" meta={comparison} /><Sparkline values={[...trends[comparison]]} label={`Life Power, ${comparison.toLowerCase()}`} /><Provenance items={low ? ['Estimated', 'Low confidence'] : ['10 domains', offline ? 'Last sync 2h ago' : 'Updated 2h ago']} /></SolidCard>}

        <div className="grid grid-cols-3 gap-2" role="group" aria-label="Life area comparison">
          {(Object.keys(trends) as Comparison[]).map(option => <button key={option} type="button" aria-pressed={comparison === option} disabled={empty || error} onClick={() => setComparison(option)} className={cx('focus-ring min-h-11 rounded-pill border px-2 text-[12px] font-semibold', comparison === option ? 'border-brand-orange bg-surface-3 text-brand-orange' : 'border-white/10 text-paper-100/65', (empty || error) && 'opacity-40')}>{option}</button>)}
        </div>

        <SolidCard>
          <SectionTitle title="Domain stats" />
          <div className="mt-2 divide-y divide-white/[0.06]">
            {lifeDomains.map(domain => <button key={domain.name} type="button" disabled={error} onClick={event => { setSelectedDomain(domain); openDialog('domain', event.currentTarget) }} className="focus-ring grid min-h-14 w-full grid-cols-[minmax(92px,1fr)_minmax(70px,1.2fr)_52px] items-center gap-2 rounded-md text-left disabled:opacity-50" aria-label={`${domain.name}, ${empty || error ? 'no current data' : `${domain.value} out of 99, ${domain.source}`}`}><span className="min-w-0 text-[13px] font-semibold text-white/75">{domain.name}</span><ProgressBar value={empty || error ? 0 : domain.value} /><span className="text-right text-[13px] font-semibold tabular-nums text-paper-100/75">{empty || error ? '—' : comparisonValue(domain, comparison)}</span></button>)}
          </div>
        </SolidCard>
      </main>
    </HifiShell>
  )
}

function DetailDialog({ kind, domain, onClose }: { kind: Exclude<DialogName, null>; domain: typeof lifeDomains[number]; onClose: () => void }) {
  const title = kind === 'domain' ? domain.name : 'Data controls'
  return <E1Modal label={title} onClose={onClose}><h2 className="text-[20px] font-semibold text-paper-100">{title}</h2>{kind === 'domain' ? <div className="mt-3 space-y-2 text-[13px] text-paper-100/70"><p>{domain.value} out of 99 · {domain.source}</p><p>Updated 2h ago · high confidence</p><p>Formula: consistency 40%, depth 35%, trend 25%.</p></div> : <div className="mt-3 space-y-2 text-[13px] text-paper-100/70"><p>Category: whole-life stats · Scope: ten domains</p><p>Freshness: updated 2h ago · Retention: 12 months</p><p>Export, revoke, and delete are local prototype previews only.</p></div>}<BtnGhost className="mt-4" onClick={onClose}>Close</BtnGhost></E1Modal>
}
