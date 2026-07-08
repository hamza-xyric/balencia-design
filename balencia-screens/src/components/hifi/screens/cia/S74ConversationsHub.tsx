import { Mic, Pencil, Search, ShieldCheck } from 'lucide-react'
import { GlassCard, GlassPillInput, HifiShell, IconButton, Provenance, SectionTitle, TopBar } from '@/components/hifi/kit'
import { persona } from '@/data/hifi/persona'

// Single, honest home for every voice in the user's life — CIA, people, and
// rooms — with the coaching relationship staying the visual anchor above
// every other thread.
export function S74ConversationsHub() {
  return (
    <HifiShell
      atmosphere="cia"
      activeTab="cia"
      header={
        <TopBar
          title="Conversations"
          back={false}
          right={<IconButton label="Open voice navigation"><Mic size={20} strokeWidth={1.8} /></IconButton>}
        />
      }
    >
      <main className="relative space-y-4 px-4 pb-20 pt-2">
        <GlassCard tone="cia" className="!rounded-[40px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-royal-purple">CIA coach</p>
          <p className="mt-3 text-[19px] font-medium leading-6 text-paper-100">
            Recovery, budget, and <span className="text-emphasis">conversations</span> timing today.
          </p>
          <p className="mt-3 text-[13px] leading-5 text-white/70">
            <span className="tabular-nums">3</span> live signals &middot; <span className="tabular-nums">1</span> draft plan ready to talk
          </p>
          <div className="mt-3">
            <Provenance items={['Via CIA, synced just now']} />
          </div>
        </GlassCard>

        <GlassPillInput icon={<Search size={16} strokeWidth={2} />} placeholder="Search people, rooms, CIA memory" />

        <div role="tablist" className="-mx-1 flex gap-1.5 overflow-x-auto px-1">
          <button role="tab" aria-selected={true} type="button" className="flex h-11 min-h-11 shrink-0 items-center justify-center rounded-pill bg-white/10 px-4 text-[13px] font-semibold text-white">All</button>
          <button role="tab" aria-selected={false} type="button" className="flex h-11 min-h-11 shrink-0 items-center justify-center rounded-pill px-4 text-[13px] font-medium text-white/45">CIA</button>
          <button role="tab" aria-selected={false} type="button" className="flex h-11 min-h-11 shrink-0 items-center justify-center rounded-pill px-4 text-[13px] font-medium text-white/45">People</button>
          <button role="tab" aria-selected={false} type="button" className="flex h-11 min-h-11 shrink-0 items-center justify-center rounded-pill px-4 text-[13px] font-medium text-white/45">Groups</button>
          <button role="tab" aria-selected={false} type="button" className="flex h-11 min-h-11 shrink-0 items-center justify-center rounded-pill px-4 text-[13px] font-medium text-white/45">Rooms</button>
        </div>

        <section className="space-y-2.5">
          <SectionTitle title="Pinned" />

          <button
            type="button"
            aria-label={`${persona.buddy.name}, direct message, 18 minutes ago, 1 unread`}
            className="flex min-h-11 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[13px] font-semibold text-brand-orange">
              {persona.buddy.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[14px] font-semibold text-white">{persona.buddy.name}</span>
                <span className="shrink-0 text-[11px] tabular-nums text-white/40">18m</span>
              </div>
              <p className="mt-0.5 truncate text-[12px] text-white/60">See you at 6 for the river route?</p>
            </div>
            <span className="h-2 w-2 shrink-0 rounded-full bg-brand-orange shadow-[var(--glow-orange-sm)]" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="Iron Clinic, group chat, 4 members, 7 minutes ago, 3 unread"
            className="flex min-h-11 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left"
          >
            <span className="relative h-10 w-10 shrink-0">
              <span className="absolute right-0 top-0 h-7 w-7 rounded-full border-2 border-ink-900 bg-royal-purple/70" />
              <span className="absolute bottom-0 left-0 h-7 w-7 rounded-full border-2 border-ink-900 bg-forest-green/70" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[14px] font-semibold text-white">
                  Iron Clinic <span className="tabular-nums text-white/40">(4)</span>
                </span>
                <span className="shrink-0 text-[11px] tabular-nums text-white/40">7m</span>
              </div>
              <p className="mt-0.5 truncate text-[12px] text-white/60">Next workout is at 7 am Saturday</p>
            </div>
            <span className="flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-pill bg-brand-orange px-1.5 text-[11px] font-bold tabular-nums text-white shadow-[var(--glow-orange-sm)]">
              3
            </span>
          </button>
        </section>

        <section className="space-y-2.5">
          <SectionTitle title="Recent" />

          <button
            type="button"
            aria-label="Run Club, room, linked to Finance, 1 hour ago"
            className="flex min-h-11 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-left"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-domain-finance/15">
              <span className="h-4 w-4 rounded-[4px] border border-domain-finance/70" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-[14px] font-semibold text-white">Run Club</span>
                <span className="flex h-6 items-center rounded-pill bg-domain-finance/15 px-2 text-[11px] font-semibold text-domain-finance">Finance</span>
              </div>
              <p className="mt-0.5 truncate text-[12px] text-white/60">Who&rsquo;s in this week?</p>
            </div>
            <span className="shrink-0 self-start text-[11px] tabular-nums text-white/40">1h</span>
          </button>
        </section>

        <div className="flex justify-center pt-2">
          <button type="button" className="flex h-11 w-full items-center justify-center gap-2 rounded-pill px-4 text-left text-[12px] text-white/45">
            <ShieldCheck size={14} strokeWidth={1.8} />
            Safety and crisis support
          </button>
        </div>
      </main>

      <div className="pointer-events-none absolute inset-x-0 bottom-[104px] flex justify-end px-4">
        <button
          type="button"
          aria-label="Start a new conversation"
          className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-[var(--glow-orange-sm)]"
        >
          <Pencil size={20} strokeWidth={2} />
        </button>
      </div>
    </HifiShell>
  )
}
