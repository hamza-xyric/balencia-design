import { Info, Minus, Plus, Scan } from 'lucide-react'
import {
  BtnCoach,
  BtnGhost,
  CIAInsightCard,
  HifiShell,
  IconButton,
  ProgressBar,
  Provenance,
  TopBar,
  cx,
} from '@/components/hifi/kit'

// Knowledge graph, chosen state: default — full interactive map (8 nodes,
// confirmed + estimated edges), Workout selected as the hub with its Node
// Detail Sheet resolved and showing three real connections. Skeleton
// (ghost node/edge geometry with a CIA-voice caption), empty cold-start
// (3-5 neutral ghosted nodes, no edges), honest-null connections list,
// sheet-loading sub-state, error (dimmed chrome, graph at 0% opacity),
// and the offline-disabled Ask CIA button are documented in the source
// spec rather than duplicated here — static prototype, no handlers.
// VoiceOver reads the graph as a flat, domain-grouped list sorted by
// connection count (see the sr-only list below); the visual canvas is
// hidden from assistive tech.

const nodeConnections = [
  { label: 'Sleep', count: 4, provenance: 'via WHOOP and Health' },
  { label: 'Workout', count: 4, provenance: 'currently selected, hub node' },
  { label: 'Zen', count: 1, provenance: 'you logged' },
  { label: 'Productivity', count: 1, provenance: 'estimated' },
  { label: 'Deep sleep', count: 1, provenance: 'via Health' },
  { label: 'HRV', count: 1, provenance: 'estimated' },
  { label: 'Strain', count: 1, provenance: 'via WHOOP' },
  { label: 'Calories', count: 1, provenance: 'estimated' },
] as const

export function S72KnowledgeGraph() {
  return (
    <HifiShell
      header={
        <TopBar
          title={<>Knowledge <span className="text-emphasis">graph</span></>}
          right={
            <IconButton label="About the knowledge graph">
              <Info size={19} strokeWidth={1.9} />
            </IconButton>
          }
        />
      }
      activeTab="me"
      atmosphere="cia"
    >
      <main className="space-y-4 px-4 pb-6 pt-2">
        <div className="relative">
          <div aria-hidden="true" className="relative h-[300px] w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]">
            <svg viewBox="0 0 320 300" className="h-full w-full">
              <line x1="60" y1="150" x2="130" y2="90" className="stroke-royal-purple" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="290" y1="150" x2="220" y2="90" className="stroke-royal-purple" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="130" y1="90" x2="220" y2="90" className="stroke-brand-orange" strokeWidth="2.5" />
              <line x1="130" y1="90" x2="90" y2="220" className="stroke-brand-orange" strokeWidth="2" />
              <line x1="130" y1="90" x2="170" y2="230" className="stroke-royal-purple" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="220" y1="90" x2="250" y2="230" className="stroke-brand-orange" strokeWidth="2" />
              <line x1="220" y1="90" x2="190" y2="258" className="stroke-royal-purple" strokeWidth="1.5" strokeDasharray="4 4" />

              <circle cx="60" cy="150" r="18" className="fill-domain-meditation/15 stroke-domain-meditation" strokeWidth="1.5" />
              <text x="60" y="153" textAnchor="middle" className="fill-white/80 text-[9px] font-medium">Zen</text>

              <circle cx="290" cy="150" r="20" className="fill-domain-productivity/15 stroke-domain-productivity" strokeWidth="1.5" />
              <text x="290" y="153" textAnchor="middle" className="fill-white/80 text-[9px] font-medium">Prod.</text>

              <circle cx="130" cy="90" r="22" className="fill-domain-sleep/15 stroke-domain-sleep" strokeWidth="1.75" />
              <text x="130" y="93" textAnchor="middle" className="fill-white/85 text-[10px] font-medium">Sleep</text>

              <circle cx="220" cy="90" r="27" className="fill-domain-fitness/20 stroke-domain-fitness drop-shadow-[var(--glow-drop-orange-md)]" strokeWidth="3" />
              <circle cx="220" cy="90" r="32" fill="none" className="stroke-brand-orange" strokeWidth="1.5" opacity="0.6" />
              <text x="220" y="86" textAnchor="middle" className="fill-white text-[10px] font-semibold">Workout</text>
              <text x="220" y="98" textAnchor="middle" className="fill-white/70 text-[8px] font-semibold uppercase">Hub</text>

              <circle cx="90" cy="220" r="17" className="fill-domain-sleep/15 stroke-domain-sleep" strokeWidth="1.5" />
              <text x="90" y="223" textAnchor="middle" className="fill-white/80 text-[9px] font-medium">Deep</text>

              <circle cx="170" cy="230" r="17" className="fill-domain-fitness/15 stroke-domain-fitness" strokeWidth="1.5" />
              <text x="170" y="233" textAnchor="middle" className="fill-white/80 text-[9px] font-medium">HRV</text>

              <circle cx="250" cy="230" r="17" className="fill-domain-fitness/15 stroke-domain-fitness" strokeWidth="1.5" />
              <text x="250" y="233" textAnchor="middle" className="fill-white/80 text-[9px] font-medium">Strain</text>

              <circle cx="190" cy="258" r="15" className="fill-domain-nutrition/15 stroke-domain-nutrition" strokeWidth="1.5" />
              <text x="190" y="261" textAnchor="middle" className="fill-white/75 text-[8px] font-medium">Cal.</text>
            </svg>
          </div>

          <ul className="sr-only">
            {[...nodeConnections].sort((a, b) => b.count - a.count).map(node => (
              <li key={node.label}>{node.label}, {node.count} connection{node.count === 1 ? '' : 's'}, {node.provenance}.</li>
            ))}
          </ul>

          <div className="absolute bottom-3 left-3">
            <button type="button" className="glass-pill flex h-11 items-center gap-1.5 px-3 text-[11px] font-medium text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" aria-hidden="true" />
              Legend
            </button>
          </div>

          <div className="glass-pill absolute right-3 top-3 flex flex-col items-center overflow-hidden">
            <IconButton label="Zoom in"><Plus size={18} strokeWidth={1.9} /></IconButton>
            <span className="h-px w-6 bg-white/[0.08]" aria-hidden="true" />
            <IconButton label="Zoom out"><Minus size={18} strokeWidth={1.9} /></IconButton>
            <span className="h-px w-6 bg-white/[0.08]" aria-hidden="true" />
            <IconButton label="Reset view"><Scan size={17} strokeWidth={1.9} /></IconButton>
          </div>
        </div>

        <div className="glass-frost rounded-t-[28px] p-5">
          <div className="mx-auto mb-4 h-1 w-10 rounded-pill bg-white/20" aria-hidden="true" />

          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-domain-fitness">
              <span className="h-2 w-2 rounded-full bg-domain-fitness" aria-hidden="true" />
              Fitness
            </span>
            <h2 className="text-[17px] font-semibold text-white">Workout strain</h2>
          </div>

          <div className="mt-4 space-y-1 border-t border-white/[0.06] pt-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/45">Connected to</p>
            <StrengthListRow label="Productivity" percent={54} tone="cia" provenance="Estimated" dotClass="bg-domain-productivity" />
            <StrengthListRow label="Sleep" percent={78} tone="you" provenance="Via WHOOP" dotClass="bg-domain-sleep" />
            <StrengthListRow label="Strain" percent={70} tone="you" provenance="Via WHOOP" dotClass="bg-domain-fitness" />
            <StrengthListRow label="Calories" percent={45} tone="cia" provenance="Estimated" dotClass="bg-domain-nutrition" />
          </div>

          <div className="mt-4">
            <CIAInsightCard
              eyebrow="Pattern observed"
              provenance={['Last 30 days']}
              actions={
                <>
                  <BtnCoach>Ask CIA</BtnCoach>
                  <BtnGhost>Go to Fitness</BtnGhost>
                </>
              }
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-pill bg-domain-wellbeing/15 px-3 py-1 text-[11px] font-semibold text-domain-wellbeing">Wellbeing</span>
                <span className="rounded-pill bg-domain-fitness/15 px-3 py-1 text-[11px] font-semibold text-domain-fitness">Fitness</span>
              </div>
              <p className="text-[15px] leading-[21px] text-white">Better sleep strongly correlates with higher workout performance in your data.</p>
            </CIAInsightCard>
          </div>
        </div>
      </main>
    </HifiShell>
  )
}

// Correlation-strength row inside the sheet — fill is orange when the
// connection is confirmed/real, purple when it's inferred/low-confidence,
// reusing the exact edge-encoding language from the canvas above.
function StrengthListRow({
  label,
  percent,
  tone,
  provenance,
  dotClass,
}: {
  label: string
  percent: number
  tone: 'you' | 'cia'
  provenance: string
  dotClass: string
}) {
  return (
    <div className="flex min-h-11 items-center gap-2 border-b border-white/[0.05] py-2.5 last:border-b-0">
      <span className={cx('h-2 w-2 shrink-0 rounded-full', dotClass)} aria-hidden="true" />
      <span className="w-20 shrink-0 truncate text-[13px] text-white/75">{label}</span>
      <div className="min-w-0 flex-1"><ProgressBar value={percent} tone={tone} /></div>
      <span className="w-9 shrink-0 text-right text-[12px] font-semibold text-white/80 tabular-nums">{percent}%</span>
      <Provenance items={[provenance]} />
    </div>
  )
}
