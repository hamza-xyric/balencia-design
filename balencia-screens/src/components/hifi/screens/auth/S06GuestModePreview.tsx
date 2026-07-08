import {
  Apple,
  BookOpen,
  Brain,
  Briefcase,
  ChevronLeft,
  Dumbbell,
  Feather,
  Palette,
  Users,
  Wallet,
} from 'lucide-react'
import { BtnGhost, BtnPrimary, GlassPillInput, HifiShell, IconButton, Provenance } from '@/components/hifi/kit'

// Guest preview rendered in its "valid" state — a name typed and two domains
// picked — since that is the composition that shows the most (Explore at
// full opacity, the radar carrying two lit nodes plus its persistent
// provenance chip, the requirement it never be mistaken for a real reading).
// Cold-start, cap-error, offline and success crossfade states are documented
// in the source spec rather than duplicated here (static prototype, no
// handlers). No live route — pre-auth handoff from account entry.
const domains = [
  { key: 'fitness', label: 'Fitness', Icon: Dumbbell, x: 100, y: 22, selected: true },
  { key: 'nutrition', label: 'Nutrition', Icon: Apple, x: 150, y: 40, selected: false },
  { key: 'wellbeing', label: 'Mental', Icon: Brain, x: 177, y: 87, selected: true },
  { key: 'finance', label: 'Finance', Icon: Wallet, x: 168, y: 139, selected: false },
  { key: 'career', label: 'Career', Icon: Briefcase, x: 127, y: 173, selected: false },
  { key: 'relationships', label: 'Relationships', Icon: Users, x: 73, y: 173, selected: false },
  { key: 'faith', label: 'Spirituality', Icon: Feather, x: 33, y: 139, selected: false },
  { key: 'learning', label: 'Learning', Icon: BookOpen, x: 23, y: 87, selected: false },
  { key: 'creativity', label: 'Creativity', Icon: Palette, x: 50, y: 40, selected: false },
] as const

const selectedCount = domains.filter(domain => domain.selected).length

// NEW: illustrative, non-metric hero. Purpose is to give a hesitant guest a
// tangible cross-pillar "map" without ever implying it was measured — the
// mesh (not the node color) carries the CIA/projection meaning, and the
// persistent provenance chip beside it is the guard that stops a glowing
// chart from reading as a real Life Power reading.
function ConstellationRadar() {
  const litSummary = domains
    .filter(domain => domain.selected)
    .map(domain => domain.label)
    .join(' and ')
  return (
    <div className="glass-frost relative overflow-hidden rounded-[40px] p-6">
      <div aria-hidden="true" className="quiet-pulse absolute inset-6 rounded-full bg-royal-purple/10 blur-2xl" />
      <svg
        viewBox="0 0 200 200"
        className="relative mx-auto aspect-square w-full max-w-[240px]"
        role="img"
        aria-label={`Constellation map. ${litSummary} selected. Demo, illustrative — not a measured reading.`}
      >
        <circle cx="100" cy="100" r="78" fill="none" className="stroke-white/8" strokeWidth="1" />
        <circle cx="100" cy="100" r="52" fill="none" className="stroke-white/8" strokeWidth="1" />
        <circle cx="100" cy="100" r="26" fill="none" className="stroke-white/8" strokeWidth="1" />

        {domains.map(domain => (
          <line
            key={`axis-${domain.key}`}
            x1="100"
            y1="100"
            x2={domain.x}
            y2={domain.y}
            className="stroke-white/8"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        ))}

        <g className="quiet-pulse">
          {domains
            .filter(domain => domain.selected)
            .map(domain => (
              <line
                key={`mesh-${domain.key}`}
                x1="100"
                y1="100"
                x2={domain.x}
                y2={domain.y}
                className="stroke-royal-purple/50"
                strokeWidth="1.5"
              />
            ))}
        </g>

        <circle cx="100" cy="100" r="3" className="fill-white/70" />

        {domains.map(domain =>
          domain.selected ? (
            <g key={`node-${domain.key}`}>
              <circle
                cx={domain.x}
                cy={domain.y}
                r="11"
                className={domain.key === 'fitness' ? 'fill-domain-fitness/25 blur-[1px]' : 'fill-domain-wellbeing/25 blur-[1px]'}
              />
              <circle
                cx={domain.x}
                cy={domain.y}
                r="5.5"
                className={domain.key === 'fitness' ? 'fill-domain-fitness' : 'fill-domain-wellbeing'}
              />
            </g>
          ) : (
            <circle key={`node-${domain.key}`} cx={domain.x} cy={domain.y} r="3" className="fill-white/20" />
          ),
        )}
      </svg>
      <div className="relative mt-4 flex justify-center">
        <Provenance items={['Demo · illustrative']} />
      </div>
    </div>
  )
}

export function S06GuestModePreview() {
  return (
    <HifiShell showTabBar={false} atmosphere="cia">
      <main className="flex flex-col px-5 pb-6 pt-2">
        <header className="flex h-11 items-center">
          <IconButton label="Back">
            <ChevronLeft size={20} strokeWidth={1.9} />
          </IconButton>
        </header>

        <div className="flex justify-center pb-1 pt-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/Logo Mark.svg" alt="Balencia" className="h-7 w-7" />
        </div>

        <section className="space-y-2 pb-6 pt-3 text-center">
          <h1 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
            Take a <span className="text-emphasis">look</span> around
          </h1>
          <p className="text-pretty text-[16px] leading-snug text-white/45">
            Tell us your name and pick a few areas you care about.
          </p>
        </section>

        <GlassPillInput placeholder="Your name" value="Amira" focused />

        <div className="pt-5">
          <ConstellationRadar />
        </div>

        <div className="flex items-end justify-between px-1 pb-3 pt-6">
          <span className="eyebrow">Life areas</span>
          <span className="text-[12px] tabular-nums text-white/40">({selectedCount} selected)</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <span className="flex min-h-11 items-center justify-center rounded-pill border border-domain-fitness/40 bg-domain-fitness/20 px-3 py-2">
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-white">
              <Dumbbell size={14} className="text-domain-fitness" strokeWidth={1.9} />
              Fitness
            </span>
          </span>
          <span className="flex min-h-11 items-center justify-center rounded-pill border border-white/10 bg-white/[0.04] px-3 py-2">
            <span className="flex items-center gap-1.5 text-[13px] text-white/60">
              <Apple size={14} className="text-domain-nutrition/50" strokeWidth={1.9} />
              Nutrition
            </span>
          </span>
          <span className="flex min-h-11 items-center justify-center rounded-pill border border-domain-wellbeing/40 bg-domain-wellbeing/20 px-3 py-2">
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-white">
              <Brain size={14} className="text-domain-wellbeing" strokeWidth={1.9} />
              Mental
            </span>
          </span>

          <span className="flex min-h-11 items-center justify-center rounded-pill border border-white/10 bg-white/[0.04] px-3 py-2">
            <span className="flex items-center gap-1.5 text-[13px] text-white/60">
              <Wallet size={14} className="text-domain-finance/50" strokeWidth={1.9} />
              Finance
            </span>
          </span>
          <span className="flex min-h-11 items-center justify-center rounded-pill border border-white/10 bg-white/[0.04] px-3 py-2">
            <span className="flex items-center gap-1.5 text-[13px] text-white/60">
              <Briefcase size={14} className="text-domain-career/50" strokeWidth={1.9} />
              Career
            </span>
          </span>
          <span className="flex min-h-11 items-center justify-center rounded-pill border border-white/10 bg-white/[0.04] px-3 py-2">
            <span className="flex items-center gap-1.5 text-[13px] text-white/60">
              <Users size={14} className="text-domain-relationships/50" strokeWidth={1.9} />
              Bonds
            </span>
          </span>

          <span className="flex min-h-11 items-center justify-center rounded-pill border border-white/10 bg-white/[0.04] px-3 py-2">
            <span className="flex items-center gap-1.5 text-[13px] text-white/60">
              <Feather size={14} className="text-domain-faith/50" strokeWidth={1.9} />
              Spirit
            </span>
          </span>
          <span className="flex min-h-11 items-center justify-center rounded-pill border border-white/10 bg-white/[0.04] px-3 py-2">
            <span className="flex items-center gap-1.5 text-[13px] text-white/60">
              <BookOpen size={14} className="text-domain-learning/50" strokeWidth={1.9} />
              Learn
            </span>
          </span>
          <span className="flex min-h-11 items-center justify-center rounded-pill border border-white/10 bg-white/[0.04] px-3 py-2">
            <span className="flex items-center gap-1.5 text-[13px] text-white/60">
              <Palette size={14} className="text-domain-creativity/50" strokeWidth={1.9} />
              Create
            </span>
          </span>
        </div>

        <div className="pt-6">
          <BtnPrimary>Explore</BtnPrimary>
        </div>

        <div className="flex flex-col items-center gap-1 pt-5">
          <p className="text-[13px] text-white/50">Already have an account?</p>
          <BtnGhost>Sign in</BtnGhost>
        </div>
      </main>
    </HifiShell>
  )
}
