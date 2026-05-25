import { Check, Flame, Lock, Trophy } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { Chip } from '@/components/design-system/Chip'
import { DomainTag } from '@/components/design-system/DomainTag'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { ProgressRing } from '@/components/screens/ProgressRing'
import { achievementsGallery } from '@/data/mock'

// Screen 71 of 78: Achievement gallery
// Spec: /Users/hamza/yHealth/app_design 3/71-achievement-gallery.md

function SummaryStrip() {
  return (
    <Card variant="small" className="rounded-xl p-4 animate-fade-up">
      <div className="grid grid-cols-[72px_1fr_72px] items-center divide-x divide-white/[0.06]">
        <div className="flex flex-col items-center">
          <ProgressRing progress={achievementsGallery.summary.percent / 100} size={48} />
          <span className="mt-1 text-small leading-[14px] text-white/40">{achievementsGallery.summary.percent}%</span>
        </div>
        <div className="px-4 text-center">
          <div className="text-[24px] font-bold leading-7 text-white tabular-nums">{achievementsGallery.summary.earned}</div>
          <div className="text-caption leading-[18px] text-white/50">Earned</div>
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

function FilterRow() {
  return (
    <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar animate-fade-up" style={{ animationDelay: '80ms' }}>
      {achievementsGallery.filters.map((filter, index) => <Chip key={filter} selected={index === 0}>{filter}</Chip>)}
    </div>
  )
}

function AchievementCard({ item, delay }: { item: (typeof achievementsGallery.achievements)[number]; delay: number }) {
  const earned = item.state === 'earned'
  const progress = item.state === 'progress'

  return (
    <Card
      variant="small"
      className={[
        'rounded-xl p-4 text-center animate-fade-up',
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
    </Card>
  )
}

export default function AchievementsScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Achievements" showBack />} activeTab="me">
        <main className="px-4 pb-20 pt-4">
          <SummaryStrip />
          <FilterRow />
          <div className="mt-4 grid grid-cols-2 gap-3">
            {achievementsGallery.achievements.map((item, index) => (
              <AchievementCard key={item.name} item={item} delay={160 + index * 70} />
            ))}
          </div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
