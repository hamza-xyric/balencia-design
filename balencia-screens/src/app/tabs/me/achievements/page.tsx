'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Check, Flame, Lock, Target, Trophy } from 'lucide-react'
import { BottomSheet, PhoneModalLayer } from '@/components/design-system/BottomSheet'
import { Card } from '@/components/design-system/Card'
import { Chip } from '@/components/design-system/Chip'
import { DomainTag } from '@/components/design-system/DomainTag'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { achievementsGallery } from '@/data/mock'

// Screen 71 of 78: Achievement gallery
// Spec: /Users/hamza/yHealth/app_design 3/71-achievement-gallery.md

function SummaryStrip() {
  const nearNext = achievementsGallery.achievements.filter((item) => item.state === 'progress').length

  return (
    <Card variant="small" className="rounded-xl p-4 animate-fade-up">
      <div className="grid grid-cols-3 items-center divide-x divide-white/[0.06]">
        <div className="flex flex-col items-center">
          <Trophy size={20} className="text-brand-orange" strokeWidth={1.9} />
          <div className="mt-2 text-h3 font-semibold leading-[22px] text-white tabular-nums">{achievementsGallery.summary.earned}</div>
          <div className="text-small leading-[14px] text-white/50">Earned</div>
        </div>
        <div className="flex flex-col items-center px-4 text-center">
          <Target size={20} className="text-forest-green" strokeWidth={1.9} />
          <div className="mt-2 text-h3 font-semibold leading-[22px] text-white tabular-nums">{nearNext}</div>
          <div className="text-small leading-[14px] text-white/50">Close</div>
        </div>
        <div className="flex flex-col items-center">
          <Flame size={18} className="text-brand-orange" fill="currentColor" strokeWidth={1.8} />
          <div className="mt-1 text-h3 font-semibold leading-[22px] text-white tabular-nums">{achievementsGallery.summary.streak}</div>
          <div className="text-small leading-[14px] text-white/50">Days</div>
        </div>
      </div>
    </Card>
  )
}

function FilterRow({ active, onChange }: { active: string; onChange: (filter: string) => void }) {
  return (
    <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar animate-fade-up" style={{ animationDelay: '80ms' }}>
      {achievementsGallery.filters.map((filter) => (
        <Chip key={filter} selected={active === filter} onClick={() => onChange(filter)} aria-pressed={active === filter} className="h-11">
          {filter}
        </Chip>
      ))}
    </div>
  )
}

function AchievementCard({ item, delay, onOpen }: { item: (typeof achievementsGallery.achievements)[number]; delay: number; onOpen: () => void }) {
  const earned = item.state === 'earned'
  const progress = item.state === 'progress'

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${item.name}, ${item.domain}, ${item.state}, ${item.progress}`}
      className={[
        'rounded-xl border bg-ink-brown-800 p-4 text-center shadow-1 animate-fade-up',
        earned ? 'border-white/10' : progress ? 'border-white/10' : 'opacity-70',
      ].join(' ')}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative mx-auto flex h-20 items-center justify-center">
        {earned ? (
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange shadow-[var(--glow-orange)]">
            <Trophy size={28} strokeWidth={1.9} />
          </span>
        ) : progress ? (
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-brand-orange/40 bg-ink-900 text-white/35">
            <Trophy size={25} strokeWidth={1.8} />
            <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-ink-brown-800 bg-brand-orange text-small font-semibold leading-6 text-white">%</span>
          </span>
        ) : (
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.04] text-white/20">
            <Lock size={23} strokeWidth={2.1} />
          </span>
        )}
      </div>
      <h2 className={['mt-2 min-h-10 text-[14px] font-semibold leading-5', earned || progress ? 'text-white' : 'text-white/40'].join(' ')}>
        {item.name}
      </h2>
      <div className="mt-2 flex justify-center">
        <DomainTag domain={item.domain} showDot={false} />
      </div>
      <div className={['mt-3 inline-flex items-center gap-1 text-small font-semibold leading-[14px]', earned ? 'text-forest-green' : progress ? 'text-brand-orange' : 'text-white/25'].join(' ')}>
        {earned && <Check size={12} strokeWidth={2.4} />}
        {item.progress}
      </div>
      {item.date && <div className="mt-1 text-[10px] leading-3 text-white/25">{item.date}</div>}
    </button>
  )
}

export default function AchievementsScreen() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selected, setSelected] = useState<(typeof achievementsGallery.achievements)[number] | null>(null)
  const visible = useMemo(() => {
    if (activeFilter === 'All') return achievementsGallery.achievements
    return achievementsGallery.achievements.filter((item) => item.domain === activeFilter.toLowerCase() || item.state === activeFilter.toLowerCase())
  }, [activeFilter])

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Achievements" showBack />} activeTab="me">
        <main className="px-4 pb-20 pt-4">
          <SummaryStrip />
          <FilterRow active={activeFilter} onChange={setActiveFilter} />
          <p className="mt-3 rounded-md bg-white/[0.04] px-3 py-2 text-[12px] leading-4 text-white/45">
            Low-motivation mode shows earned and near-next badges first. Locked badges stay sparse until they become relevant.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {visible.map((item, index) => (
              <AchievementCard key={item.name} item={item} delay={160 + index * 70} onOpen={() => setSelected(item)} />
            ))}
          </div>
          {visible.length === 0 && (
            <div className="mt-4 rounded-md border border-white/[0.06] bg-ink-brown-800 p-5 text-center animate-fade-up">
              <Trophy size={28} className="mx-auto text-white/20" strokeWidth={1.8} />
              <h2 className="mt-3 text-[15px] font-semibold leading-5 text-white">No {activeFilter.toLowerCase()} badges yet</h2>
              <p className="mt-1 text-[13px] leading-[18px] text-white/45">Earned and near-next badges will appear here before locked clutter.</p>
            </div>
          )}
          {selected && (
            <PhoneModalLayer>
              <BottomSheet
                title={selected.name}
                onClose={() => setSelected(null)}
                closeLabel="Close achievement detail"
                variant="modal"
                contentClassName="px-4 pb-1 pt-1"
              >
              <div className="flex items-start gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
                  {selected.state === 'locked' ? <Lock size={28} /> : <Trophy size={30} />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="mt-2"><DomainTag domain={selected.domain} /></div>
                  <p className="mt-3 text-[13px] leading-[18px] text-white/55">
                    {selected.state === 'earned' ? `Earned ${selected.date}. Keep the streak alive for the silver tier.` : selected.state === 'progress' ? `You are close: ${selected.progress}. SIA can suggest the next action.` : 'Locked for now. We will surface it again when you are closer.'}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setSelected(null)} className="min-h-11 rounded-pill border border-white/10 text-[13px] font-semibold text-white/70">Close</button>
                <Link href="/tabs/sia" className="flex min-h-11 items-center justify-center rounded-pill bg-royal-purple text-[13px] font-semibold text-white">Ask SIA</Link>
              </div>
              </BottomSheet>
            </PhoneModalLayer>
          )}
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
