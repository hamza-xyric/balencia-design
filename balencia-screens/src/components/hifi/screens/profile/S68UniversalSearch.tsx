import type { LucideIcon } from 'lucide-react'
import { AlertTriangle, BookOpen, Footprints, Moon, PiggyBank, Plus, Salad, Search, Target, Trash2, WifiOff, X } from 'lucide-react'
import {
  BtnCoach,
  BtnGhost,
  BtnSecondary,
  Chip,
  CIAInsightCard,
  ConsentRail,
  GlassPillInput,
  HifiShell,
  SectionTitle,
  cx,
} from '@/components/hifi/kit'

// SearchOverlay — no live route of its own; opened as a full-screen scrim
// over whatever screen was active (no bottom nav while it's up). Per the
// build card's "states woven into default," this single frame carries real,
// low-confidence, and honest-null result rows side by side (independent
// items, not the same metric re-shown), plus a skeleton, zero-result,
// error, and offline moment demonstrated beneath the live sections.

const domainTone = {
  fitness: 'bg-domain-fitness/15 text-domain-fitness',
  nutrition: 'bg-domain-nutrition/15 text-domain-nutrition',
  finance: 'bg-domain-finance/15 text-domain-finance',
  learning: 'bg-domain-learning/15 text-domain-learning',
  wellbeing: 'bg-domain-wellbeing/15 text-domain-wellbeing',
} as const

function DomainTag({ label, domain }: { label: string; domain: keyof typeof domainTone }) {
  return (
    <span className={cx('inline-flex h-6 shrink-0 items-center rounded-pill px-2.5 text-[11px] font-semibold', domainTone[domain])}>
      {label}
    </span>
  )
}

function ResultRow({
  icon: Icon,
  title,
  domain,
  metric,
  provenance,
  progress,
  muted = false,
}: {
  icon: LucideIcon
  title: string
  domain: { label: string; tone: keyof typeof domainTone }
  metric: string
  provenance: string
  progress?: number
  muted?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={`${title}, ${domain.label}, ${metric}, ${provenance}`}
      className="flex min-h-[56px] w-full items-center gap-3 px-4 py-3 text-left"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60">
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-[15px] font-medium text-white">{title}</p>
          <DomainTag label={domain.label} domain={domain.tone} />
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <span className={cx('text-[12px] tabular-nums text-white/60', muted && 'opacity-60')}>{metric}</span>
          <Chip>{provenance}</Chip>
        </div>
        {progress !== undefined && (
          <div className="mt-2 h-1 w-full overflow-hidden rounded-pill bg-white/[0.08]">
            <div className={cx('h-full rounded-pill', muted ? 'bg-white/25' : 'bg-brand-orange')} style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </button>
  )
}

function SegmentedTabs() {
  const tabs = ['All', 'Missions', 'Habits', 'Recipes']
  return (
    <div role="tablist" aria-label="Result category" className="flex items-center gap-2 overflow-x-auto pb-1">
      {tabs.map((label, index) => (
        <button
          key={label}
          type="button"
          role="tab"
          aria-selected={index === 0}
          className={cx(
            'inline-flex min-h-11 shrink-0 items-center rounded-pill px-4 text-[13px] font-semibold',
            index === 0 ? 'bg-white/[0.12] text-brand-orange' : 'border border-white/10 bg-white/[0.04] text-white/60',
          )}
        >
          {label}
        </button>
      ))}
      <button
        type="button"
        role="tab"
        aria-selected={false}
        aria-label="More categories"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill border border-white/10 bg-white/[0.04] text-white/60"
      >
        <Plus size={16} strokeWidth={2} />
      </button>
    </div>
  )
}

function SkeletonRow() {
  return (
    <div className="flex min-h-[56px] items-center gap-3 px-4 py-3">
      <div className="skeleton-block h-10 w-10 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="skeleton-block h-3 w-1/2" />
        <div className="skeleton-block h-2.5 w-2/3" />
      </div>
    </div>
  )
}

export function S68UniversalSearch() {
  return (
    <HifiShell atmosphere="cia" showTabBar={false}>
      <main className="space-y-5 px-4 pb-6 pt-3">
        <h1 className="sr-only">Search everything</h1>

        <div className="flex items-center gap-2">
          <GlassPillInput
            icon={<Search size={17} strokeWidth={1.9} />}
            placeholder="Search everything"
            focused
            trailing={
              <button type="button" aria-label="Clear search" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/45">
                <X size={15} strokeWidth={1.9} />
              </button>
            }
          />
          <button type="button" aria-label="Cancel search" className="flex min-h-11 shrink-0 items-center px-1 text-[15px] font-medium text-white/70">
            Cancel
          </button>
        </div>

        <SegmentedTabs />

        <p className="text-[13px] leading-snug text-white/45">
          One <span className="text-emphasis">search</span> reaches every mission, habit, and recipe.
        </p>

        <CIAInsightCard
          eyebrow="CIA thinks you're looking for"
          provenance={['Fitness', 'Based on 6 Tuesdays']}
          actions={
            <>
              <BtnCoach>Open routine</BtnCoach>
              <BtnGhost quiet>Not now</BtnGhost>
            </>
          }
        >
          <div className="flex items-center gap-2">
            <p className="text-[15px] font-medium leading-5 text-white">Morning mobility</p>
            <span className="quiet-pulse h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" aria-hidden="true" />
          </div>
          <p className="mt-1 text-[13px] italic leading-relaxed text-white/60">Your usual Tuesday reset</p>
          <button type="button" className="mt-3 flex min-h-11 items-center gap-1.5 text-[12px] font-medium text-white/45">
            <Trash2 size={13} strokeWidth={1.75} /> Delete history
          </button>
        </CIAInsightCard>

        <div className="space-y-2">
          <SectionTitle title="Missions" meta="1 result" />
          <div className="surface-warm divide-y divide-white/[0.06] overflow-hidden">
            <ResultRow
              icon={Target}
              title="Run a 5k"
              domain={{ label: 'Fitness', tone: 'fitness' }}
              metric="60% progress"
              provenance="Via missions"
              progress={60}
            />
            <ResultRow
              icon={PiggyBank}
              title="Save $5,000 by December"
              domain={{ label: 'Finance', tone: 'finance' }}
              metric="~42% progress"
              provenance="Estimated · low confidence"
              progress={42}
              muted
            />
            <ResultRow
              icon={BookOpen}
              title="Read 20 pages"
              domain={{ label: 'Learning', tone: 'learning' }}
              metric="No progress logged yet"
              provenance="No data yet"
            />
          </div>
        </div>

        <div className="space-y-2">
          <SectionTitle title="Habits" meta="1 result" />
          <div className="surface-warm divide-y divide-white/[0.06] overflow-hidden">
            <ResultRow
              icon={Footprints}
              title="10k steps"
              domain={{ label: 'Fitness', tone: 'fitness' }}
              metric="12-day streak"
              provenance="Via habits"
            />
            <ResultRow
              icon={Moon}
              title="Evening reflection"
              domain={{ label: 'Wellbeing', tone: 'wellbeing' }}
              metric="Not enough data yet"
              provenance="No data yet"
            />
          </div>
        </div>

        <div className="space-y-2">
          <SectionTitle title="Recipes" meta="1 result" />
          <div className="surface-warm overflow-hidden">
            <ResultRow
              icon={Salad}
              title="Post-run bowl"
              domain={{ label: 'Nutrition', tone: 'nutrition' }}
              metric="450 cal"
              provenance="Via saved recipes"
            />
          </div>
        </div>

        <div className="space-y-2">
          <SectionTitle title="Searching" meta={'"morning routine" · 300ms'} />
          <div className="surface-warm divide-y divide-white/[0.06] overflow-hidden">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>
        </div>

        <div className="space-y-2">
          <SectionTitle title="Searching" meta={'"yoga mat"'} />
          <div className="surface-warm flex flex-col items-center gap-2 px-6 py-8 text-center">
            <Search size={20} className="text-white/35" strokeWidth={1.6} />
            <p className="text-[13px] leading-snug text-white/55">
              No results for &quot;yoga mat.&quot; Try a different spelling or search term.
            </p>
          </div>
        </div>

        <div className="surface-warm flex items-start gap-3 p-4">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-white/55" strokeWidth={1.75} />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] leading-snug text-white/70">Some results may be missing right now.</p>
            <div className="mt-3"><BtnSecondary>Retry</BtnSecondary></div>
          </div>
        </div>

        <div className="glass-pill flex items-center gap-2 px-4 py-2.5">
          <WifiOff size={14} className="shrink-0 text-white/60" strokeWidth={1.75} />
          <p className="text-[12px] leading-snug text-white/65">
            Offline — showing local results only. Community and recipes need a connection.
          </p>
        </div>

        <div className="surface-warm space-y-3 p-4">
          <p className="text-[12px] font-semibold uppercase leading-4 text-white/45">Data &amp; consent</p>
          <p className="text-[12px] leading-4 text-white/55">
            Every CIA evidence chip names its source, confidence, and a delete-history action. Manage all sources from data sources.
          </p>
          <ConsentRail compact />
        </div>
      </main>
    </HifiShell>
  )
}
