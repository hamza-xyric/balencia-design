import { Search, Plus, Users, UserPlus, Lock, Eye, Flag, ShieldCheck, Crown } from 'lucide-react'
import { HifiShell, TopBar, SectionTitle, GlassCard, SolidCard, Chip, Provenance, ConsentRail, ComplianceFooter, BtnPrimary, CIAInsightCard, ProgressRing, ProgressBar } from '@/components/hifi/kit'

export function S95PodsHub() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Pods"
          back
          right={
            <div className="flex items-center gap-1">
              <button type="button" aria-label="Search groups" className="flex h-11 w-11 items-center justify-center text-white/70 transition hover:text-white">
                <Search className="h-5 w-5" />
              </button>
              <button type="button" aria-label="Create pod" className="flex h-11 w-11 items-center justify-center text-white/70 transition hover:text-white">
                <Plus className="h-5 w-5" />
              </button>
            </div>
          }
        />
      }
      activeTab="me"
    >
      <main className="space-y-4 px-4 pb-6 pt-3">
        <div className="space-y-3">
          <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.02em] text-white">
            Your <span className="text-emphasis">pods</span>
          </h1>

          <GlassCard tone="you">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand-orange" />
                  <p className="text-[15px] font-semibold text-white">Membership overview</p>
                </div>
                <p className="text-[13px] leading-snug text-white/55">2 active pods · 1 pending invite · Discovery consent on</p>
                <Provenance items={['Via /groups', 'Synced 12m ago']} />
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-[28px] font-semibold tabular-nums leading-none text-white">2</span>
                <span className="text-[11px] uppercase tracking-[0.08em] text-white/40">Pods</span>
              </div>
            </div>
            <div className="mt-4 h-11">
              <button type="button" className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-[13px] font-medium text-white/80 transition hover:bg-white/[0.07]">
                Manage discovery settings
              </button>
            </div>
          </GlassCard>
        </div>

        <div role="tablist" aria-label="Group types" className="hide-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4">
          <button type="button" role="tab" aria-selected className="min-h-11 whitespace-nowrap rounded-full bg-white px-3.5 text-[13px] font-medium text-ink-900">Pods</button>
          <button type="button" role="tab" aria-selected={false} className="min-h-11 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-[13px] font-medium text-white/85">Circles</button>
          <button type="button" role="tab" aria-selected={false} className="min-h-11 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-[13px] font-medium text-white/85">Communities</button>
          <button type="button" role="tab" aria-selected={false} className="min-h-11 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-[13px] font-medium text-white/85">Partners</button>
        </div>

        <div className="space-y-3">
          <SectionTitle title="Active pods" meta="Joined" />

          <SolidCard>
            <div className="space-y-4 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[15px] font-semibold text-white">Morning runners</p>
                    <Chip tone="done">Member</Chip>
                  </div>
                  <p className="text-[13px] text-white/55">8 members · Shared half marathon mission</p>
                </div>
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full border-2 border-ink-900 bg-gradient-to-br from-amber-500 to-rose-500" aria-label="Aisha Khan avatar" />
                  <div className="h-8 w-8 rounded-full border-2 border-ink-900 bg-gradient-to-br from-sky-500 to-indigo-500" aria-label="Omar avatar" />
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink-900 bg-white/[0.08] text-[10px] font-semibold tabular-nums text-white/70">
                    +6
                  </div>
                </div>
              </div>

              <div className="space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-white/40">Shared mission progress</p>
                  <span className="text-[12px] font-medium tabular-nums text-white/70">68%</span>
                </div>
                <ProgressBar value={68} tone="you" />
                <div className="flex items-center gap-2 pt-1">
                  <ProgressRing percent={68} value="68%" size={28} tone="you" ghost />
                  <p className="text-[11px] text-white/45">Run a half marathon · Synced from your missions</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-11 flex-1">
                  <button type="button" className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-[13px] font-medium text-white/80 transition hover:bg-white/[0.07]">
                    <Eye className="h-4 w-4" /> Preview privacy
                  </button>
                </div>
                <div className="h-11 flex-1">
                  <button type="button" className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white/[0.04] text-[13px] font-medium text-white/80 ring-1 ring-brand-orange/30 transition hover:bg-white/[0.07]">
                    Open pod
                  </button>
                </div>
              </div>
            </div>
          </SolidCard>
        </div>

        <div className="space-y-3">
          <SectionTitle title="Suggested for you" meta="CIA match" />

          <CIAInsightCard
            eyebrow="Pod suggestion"
            provenance={['Based on run plan', 'Consent on']}
            actions={
              <div className="flex h-11 items-center gap-2">
                <button type="button" className="flex h-11 flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[13px] font-medium text-white/80 transition hover:bg-white/[0.07]">
                  Preview privacy
                </button>
                <BtnPrimary>Join pod</BtnPrimary>
              </div>
            }
          >
            <p className="text-[14px] leading-relaxed text-white/75">
              Focus builders matches your Thursday tempo runs and has 3 overlapping routes with your history.
            </p>
          </CIAInsightCard>
        </div>

        <div className="space-y-3">
          <SectionTitle title="Circles" meta="Partner invite only" />

          <SolidCard>
            <div className="space-y-4 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-white/50" />
                    <p className="text-[15px] font-semibold text-white">Focus builders</p>
                  </div>
                  <p className="text-[13px] text-white/55">Private · 5 members · Invite only</p>
                  <div className="flex items-center gap-1.5 pt-1">
                    <Crown className="h-3.5 w-3.5 text-white/40" />
                    <p className="text-[11px] text-white/40">Hosted by Aisha Khan</p>
                  </div>
                </div>
                <Chip tone="muted">Private</Chip>
              </div>

              <div className="h-px bg-white/[0.06]" />

              <div className="flex items-center gap-2">
                <div className="h-11 flex-1">
                  <button type="button" className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-[13px] font-medium text-white/80 transition hover:bg-white/[0.07]">
                    Manage circle
                  </button>
                </div>
                <div className="h-11 flex-1">
                  <button type="button" className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-[13px] font-medium text-white/80 transition hover:bg-white/[0.07]">
                    <Flag className="h-4 w-4" /> Report
                  </button>
                </div>
              </div>
            </div>
          </SolidCard>
        </div>

        <div className="space-y-3">
          <SectionTitle title="Pending invite" meta="1 new" />

          <GlassCard tone="you">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-rose-500/20">
                  <UserPlus className="h-5 w-5 text-brand-orange" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-[14px] font-semibold text-white">Aisha Khan invited you</p>
                  <p className="text-[12px] leading-snug text-white/55">To join Evening stretch circle · 4 members</p>
                  <Provenance items={['Invite sent 2h ago', 'Expires in 5d']} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-11 flex-1">
                  <button type="button" className="flex h-11 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[13px] font-medium text-white/80 transition hover:bg-white/[0.07]">
                    Decline
                  </button>
                </div>
                <div className="h-11 flex-1">
                  <button type="button" className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white/[0.04] text-[13px] font-medium text-white/80 ring-1 ring-brand-orange/30 transition hover:bg-white/[0.07]">
                    Accept invite
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-3">
          <SectionTitle title="Privacy controls" meta="Discovery" />

          <SolidCard>
            <div className="space-y-3 p-4">
              <div className="space-y-1">
                <p className="text-[13px] font-medium text-white">Shared stats visibility</p>
                <p className="text-[12px] leading-snug text-white/50">Categories: Step count, Sleep duration, Run distance.</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Chip tone="you">Step count</Chip>
                <Chip tone="you">Sleep duration</Chip>
                <Chip tone="muted">Heart rate hidden</Chip>
              </div>

              <div className="h-px bg-white/[0.06]" />

              <div className="flex items-start gap-2 pt-1">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest-green" />
                <p className="text-[11px] leading-snug text-white/45">
                  Buddy discovery can be revoked anytime. Leaving a pod hides your shared stats immediately.
                </p>
              </div>
            </div>
          </SolidCard>

          <ConsentRail compact />
        </div>

        <div className="pt-2">
          <ComplianceFooter />
        </div>
      </main>
    </HifiShell>
  )
}