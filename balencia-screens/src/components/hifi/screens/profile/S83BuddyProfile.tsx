import { Check, Lock, MessageSquare, MoreHorizontal, Settings2, Shield, Sparkles, UserPlus } from 'lucide-react'
import {
  BtnPrimary,
  BtnSecondary,
  Chip,
  ConsentRail,
  CIAInsightCard,
  GlassCard,
  HifiShell,
  IconButton,
  ProgressBar,
  SectionTitle,
  SolidCard,
  TopBar,
  cx,
} from '@/components/hifi/kit'
import { persona } from '@/data/hifi/persona'

// Buddy profile — trusted-relationship dashboard. Chosen state: default,
// accepted connection (per the build card's "states woven into default"),
// with independent shared missions each carrying their own honesty state
// (real, low-confidence/stale sync, honest-null invite) plus one dimmed
// disabled control with reason copy. Pending / removed / blocked treatments
// dim the same Message, Invite, and CIA affordances with their own reason
// copy — same layout, not rendered in parallel here.

function AvatarInitials() {
  return (
    <div className="relative h-20 w-20">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]">
        <span className="text-[20px] font-semibold text-white">AK</span>
      </div>
      <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-ink-900">
        <span className="h-2.5 w-2.5 rounded-full bg-forest-green" />
      </span>
    </div>
  )
}

function DomainNode({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className={cx('quiet-pulse flex h-9 w-9 items-center justify-center rounded-full border', active ? 'border-brand-orange/40 bg-brand-orange/10' : 'border-white/10 bg-white/[0.03]')}>
        <span className={cx('h-2 w-2 rounded-full', active ? 'bg-brand-orange' : 'bg-white/20')} />
      </span>
      <span className={cx('text-[11px] font-medium', active ? 'text-white/80' : 'text-white/35')}>{label}</span>
    </div>
  )
}

function SharedDomainShape() {
  return (
    <div
      className="mt-4 flex items-center justify-center gap-1 border-t border-white/10 pt-4"
      role="img"
      aria-label="Shared domain shape: Fitness and Learning overlap; Mindfulness not shared"
    >
      <DomainNode label="Fitness" active />
      <span className="mx-1 mb-4 h-px w-8 border-t border-dashed border-white/25" aria-hidden="true" />
      <DomainNode label="Learning" active />
      <span className="mx-1 mb-4 h-px w-8 border-t border-dashed border-white/10" aria-hidden="true" />
      <DomainNode label="Mindfulness" />
    </div>
  )
}

function MissionRow({
  title,
  status,
  percent,
  source,
  muted = false,
}: {
  title: string
  status: string
  percent: number
  source: string
  muted?: boolean
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="min-w-0 truncate text-[14px] font-medium text-white">{title}</span>
        <span className={cx('shrink-0 text-[12px] tabular-nums text-white/55', muted && 'opacity-60')}>
          {percent}% · {status}
        </span>
      </div>
      <div className="mt-2">
        <ProgressBar value={percent} tone={muted ? 'muted' : 'you'} />
      </div>
      <p className="mt-1.5 text-right text-[11px] text-white/40">{source}</p>
    </div>
  )
}

export function S83BuddyProfile() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Buddy profile"
          right={
            <IconButton label="More options">
              <MoreHorizontal size={20} strokeWidth={1.9} />
            </IconButton>
          }
        />
      }
      activeTab="me"
      atmosphere="you"
      bottomAction={
        <div className="flex items-center gap-2">
          <BtnSecondary className="flex-1">
            <Settings2 size={16} strokeWidth={1.9} />
            Adjust visibility
          </BtnSecondary>
          <BtnPrimary className="flex-1">
            <span className="flex items-center justify-center gap-2">
              <MessageSquare size={16} strokeWidth={1.9} />
              Message
            </span>
          </BtnPrimary>
        </div>
      }
    >
      <main className="space-y-4 px-4 pb-4 pt-2">
        <GlassCard tone="muted">
          <div className="flex flex-col items-center gap-3 pb-1 pt-1 text-center">
            <AvatarInitials />
            <h2 className="text-[19px] font-semibold leading-6 text-white">Aisha Khan</h2>
            <p className="max-w-[280px] text-[14px] leading-relaxed text-white/65">
              Running partner. We&apos;re training for the <span className="text-emphasis">half</span> together.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Chip tone="done">
                <span className="flex items-center gap-1.5">
                  <Check size={12} strokeWidth={2.2} /> Trusted partner
                </span>
              </Chip>
              <Chip tone="cia">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={12} strokeWidth={2.2} /> Mutual insight
                </span>
              </Chip>
            </div>
          </div>
          <SharedDomainShape />
        </GlassCard>

        <CIAInsightCard eyebrow="Shared pattern" provenance={['Via shared consent + check-ins', 'Updated 2h ago']}>
          <p className="text-[15px] leading-relaxed text-white">On mutually shared run days, both sleep logs were higher.</p>
          <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3 text-[11px] text-white/55">
            <Lock size={12} strokeWidth={1.9} className="shrink-0" />
            CIA patterns consented — never raw health shared.
          </div>
        </CIAInsightCard>

        <div className="space-y-3">
          <SectionTitle title="Shared missions" meta="2 active" />
          <SolidCard className="space-y-4">
            <MissionRow title={persona.buddy.sharedMission.name} status="On track" percent={persona.buddy.sharedMission.progress} source="Via check-ins" />
            <MissionRow title="Read 2 books this month" status="Building" percent={35} source="Via updates" />
            <MissionRow title="Weekly meal prep together" status="Reconciling" percent={18} source="Estimated · low confidence · stale sync 6h" muted />
          </SolidCard>
          <div className="flex items-center gap-3 rounded-xl border border-dashed border-white/15 px-4 py-3">
            <UserPlus size={16} className="shrink-0 text-white/45" strokeWidth={1.75} />
            <p className="min-w-0 flex-1 text-[12px] leading-snug text-white/50">No shared missions yet in this domain.</p>
            <button type="button" className="flex min-h-11 shrink-0 items-center text-[12px] font-semibold text-brand-orange">
              Invite to mission
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <SectionTitle title="Network" />
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Open permissions" className="flex min-h-11 items-center gap-1.5 rounded-pill border border-white/10 bg-white/[0.03] px-3.5 text-[13px] font-medium text-white/75">
              <Settings2 size={14} strokeWidth={1.9} /> Permissions
            </button>
            <button type="button" aria-label="Invite to a shared mission" className="flex min-h-11 items-center gap-1.5 rounded-pill border border-white/10 bg-white/[0.03] px-3.5 text-[13px] font-medium text-white/75">
              <UserPlus size={14} strokeWidth={1.9} /> Invite
            </button>
            <button type="button" aria-label="Open safety controls" className="flex min-h-11 items-center gap-1.5 rounded-pill border border-white/10 bg-white/[0.03] px-3.5 text-[13px] font-medium text-white/75">
              <Shield size={14} strokeWidth={1.9} /> Safety
            </button>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 opacity-40">
            <Lock size={16} className="shrink-0 text-white/50" strokeWidth={1.75} />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-white/70">Shared photo diary</p>
              <p className="mt-0.5 text-[11px] leading-snug text-white/55">Disabled — no shared media consent yet.</p>
            </div>
          </div>
        </div>

        <SolidCard className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-royal-purple/15 text-royal-purple">
              <Shield size={16} strokeWidth={1.9} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-medium text-white">Data sources &amp; consent</p>
              <p className="mt-0.5 text-[12px] leading-relaxed text-white/55">
                The consent hub for this connection — visibility, export shared data, revoke shared domains, delete shared history, remove buddy, report, block.
              </p>
            </div>
          </div>
          <ConsentRail compact />
        </SolidCard>
      </main>
    </HifiShell>
  )
}
