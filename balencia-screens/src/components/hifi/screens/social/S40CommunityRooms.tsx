import { Search, Plus, Settings, Shield, Bell, ChevronRight, MoreHorizontal, Users } from 'lucide-react'
import {
  HifiShell,
  TopBar,
  GlassCard,
  SolidCard,
  SectionTitle,
  Chip,
  Provenance,
  ConsentRail,
  Composer,
  ChatBubble,
  GlassPillInput
} from '@/components/hifi/kit'

export function S40CommunityRooms() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Community"
          back
          right={
            <button
              type="button"
              aria-label="Community settings"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.04] text-white/65"
            >
              <Settings className="h-5 w-5" />
            </button>
          }
        />
      }
      activeTab="cia"
      atmosphere="cia"
    >
      <main className="space-y-5 px-4 pb-4 pt-3">
        <GlassPillInput icon={<Search className="h-4 w-4" />} placeholder="Find your rooms" />

        <section className="space-y-3">
          <SectionTitle title="Discover" meta="Curated" />
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 hide-scrollbar">
            <GlassCard tone="cia" className="!w-[210px] !shrink-0">
              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-royal-purple/20 text-royal-purple">
                    <Users className="h-5 w-5" />
                  </div>
                  <Chip tone="muted">Public</Chip>
                </div>
                <div className="space-y-1">
                  <p className="text-[15px] font-semibold text-white">Fitness lovers</p>
                  <p className="text-[13px] text-white/55">42 members · 8 online</p>
                </div>
                <button type="button" className="flex min-h-11 w-full items-center justify-center rounded-xl bg-white/[0.06] text-[13px] font-semibold text-white/80">
                  Preview room
                </button>
              </div>
            </GlassCard>

            <GlassCard tone="cia" className="!w-[210px] !shrink-0">
              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-royal-purple/20 text-royal-purple">
                    <Users className="h-5 w-5" />
                  </div>
                  <Chip tone="muted">Public</Chip>
                </div>
                <div className="space-y-1">
                  <p className="text-[15px] font-semibold text-white">Book club</p>
                  <p className="text-[13px] text-white/55">28 members · 3 online</p>
                </div>
                <button type="button" className="flex min-h-11 w-full items-center justify-center rounded-xl bg-white/[0.06] text-[13px] font-semibold text-white/80">
                  Preview room
                </button>
              </div>
            </GlassCard>
          </div>
        </section>

        <section className="space-y-3">
          <SectionTitle title="Your rooms" meta="3 joined" />
          <SolidCard className="divide-y divide-white/5">
            <button type="button" aria-label="Open Morning crew room" className="flex w-full min-h-[68px] items-center gap-3 p-4 text-left">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange/20 text-brand-orange text-[13px] font-semibold">MC</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[15px] font-semibold text-white">Morning crew</p>
                  <span className="shrink-0 rounded-full bg-brand-orange px-2 py-0.5 text-[11px] font-semibold text-ink-900 tabular-nums">3 new</span>
                </div>
                <p className="mt-0.5 truncate text-[13px] text-white/55">5 members · Sarah: Great workout this morning.</p>
              </div>
            </button>

            <button type="button" aria-label="Open Study group room" className="flex w-full min-h-[68px] items-center gap-3 p-4 text-left">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-royal-purple/20 text-royal-purple text-[13px] font-semibold">SG</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[15px] font-semibold text-white">Study group</p>
                  <span className="shrink-0 text-[11px] text-white/45 tabular-nums">Yesterday</span>
                </div>
                <p className="mt-0.5 truncate text-[13px] text-white/55">3 members · Aisha: Reviewed chapter four notes.</p>
              </div>
            </button>

            <button type="button" aria-label="Open Accountability pod room" className="flex w-full min-h-[68px] items-center gap-3 p-4 text-left">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-green/20 text-forest-green text-[13px] font-semibold">AP</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[15px] font-semibold text-white">Accountability pod</p>
                  <span className="shrink-0 text-[11px] text-white/45 tabular-nums">2 d</span>
                </div>
                <p className="mt-0.5 truncate text-[13px] text-white/55">4 members · Marcus: Saved another fifty this week.</p>
              </div>
            </button>
          </SolidCard>

          <button type="button" className="flex w-full min-h-11 items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 text-[13px] font-semibold text-white/65">
            <Plus className="h-4 w-4" /> Create room
          </button>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <SectionTitle title="Morning crew" meta="5 members" />
            <button type="button" aria-label="Room moderation menu" className="flex h-9 w-9 items-center justify-center rounded-full text-white/55">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <SolidCard className="space-y-4 p-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-forest-green" />
                <p className="text-[12px] text-white/65">Public room · Open membership</p>
              </div>
              <Chip tone="cia">Moderated</Chip>
            </div>

            <ChatBubble speaker="Sarah">
              Great workout this morning.
            </ChatBubble>

            <GlassCard tone="done" className="!rounded-xl">
              <div className="space-y-1 p-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-green/20 text-forest-green">
                    <Shield className="h-4 w-4" />
                  </span>
                  <p className="text-[13px] font-semibold text-forest-green">Sarah hit a mission · +150 XP</p>
                </div>
                <p className="pl-9 text-[12px] text-white/55">Shared achievement proof · Source verified</p>
              </div>
            </GlassCard>

            <ChatBubble speaker="You">
              I did my reading today.
            </ChatBubble>

            <Composer placeholder="Say something to Morning crew" />
          </SolidCard>

          <div className="flex items-center gap-2 px-1">
            <button type="button" aria-label="Report a message" className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-white/[0.04] text-[12px] font-semibold text-white/70">
              <Shield className="h-4 w-4" /> Report
            </button>
            <button type="button" aria-label="Mute member" className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-white/[0.04] text-[12px] font-semibold text-white/70">
              <Bell className="h-4 w-4" /> Mute
            </button>
            <button type="button" aria-label="Block member" className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-white/[0.04] text-[12px] font-semibold text-white/70">
              <ChevronRight className="h-4 w-4" /> Block
            </button>
          </div>
        </section>

        <GlassCard tone="muted" className="!rounded-2xl">
          <div className="space-y-3 p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-royal-purple/20 text-royal-purple">
                <Users className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-white">Your sharing controls</p>
                <p className="mt-0.5 text-[12px] leading-relaxed text-white/55">Manage visibility, audience, and social data preferences before posting to rooms.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <Chip tone="muted">Visibility</Chip>
              <Chip tone="muted">Audience</Chip>
              <Chip tone="muted">Export</Chip>
              <Chip tone="muted">Revoke</Chip>
              <Chip tone="muted">Delete</Chip>
            </div>
            <ConsentRail compact />
          </div>
        </GlassCard>

        <div className="pt-1">
          <Provenance items={['Source · Server thread', 'Scope · Public room', 'Freshness · Live', 'Moderated · By hosts']} />
        </div>
      </main>
    </HifiShell>
  )
}