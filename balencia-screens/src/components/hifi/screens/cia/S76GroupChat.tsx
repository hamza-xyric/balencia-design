import { Activity, AtSign, ChevronRight, Info, Paperclip, Plus, Send, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import {
  ChatBubble,
  Chip,
  GlassCard,
  GlassPillInput,
  HifiShell,
  IconButton,
  MomentumBar,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Default state, richest frame: room mission at 4/5 joined, live thread with
// Kenji, a consented CIA recap, the attached mission plan, the user's own
// reply, and CIA still composing its pace summary. Skeleton (mission card +
// avatar rail + alternating bubbles shimmer), empty (mission/member rail
// stay, centered first-message prompt), error (failed send keeps a retry
// row), disabled (send/add/CIA recap dim with a reason caption when
// moderation or connectivity blocks them) and offline (cached thread, sync
// pending) are documented in the source spec rather than duplicated here —
// static prototype, no handlers. Long-pressing a message opens Message
// actions [77] as its own overlay screen, not composed inside this file.
// One Tiempos emphasis word: "chat".
const members = [
  { initials: 'KT', online: true },
  { initials: 'AK', online: true },
  { initials: 'RS', online: true },
  { initials: 'MP', online: false },
  { initials: 'AM', online: true },
]

const onlineCount = members.filter(member => member.online).length

function AvatarStack() {
  return (
    <div className="flex items-center" role="img" aria-label={`${members.length} members, ${onlineCount} online`}>
      <div className="flex -space-x-2.5">
        {members.map(member => (
          <span
            key={member.initials}
            className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink-900 bg-white/10 text-[10px] font-semibold text-white/80"
          >
            {member.initials}
            {member.online && (
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink-900 bg-forest-green" />
            )}
          </span>
        ))}
      </div>
      <span className="ml-2.5 text-[12px] text-white/45">{onlineCount} online</span>
    </div>
  )
}

export function S76GroupChat() {
  return (
    <HifiShell
      atmosphere="cia"
      activeTab="cia"
      header={
        <TopBar
          title="Morning crew"
          eyebrow="5 members"
          right={
            <div className="flex items-center gap-1">
              <IconButton label="Add member">
                <Plus className="h-5 w-5" strokeWidth={1.9} />
              </IconButton>
              <IconButton label="Group info">
                <Info className="h-5 w-5" strokeWidth={1.9} />
              </IconButton>
            </div>
          }
        />
      }
      composer={
        <div className="px-4 pb-2 pt-1">
          <GlassPillInput
            icon={<Paperclip className="h-4 w-4" />}
            placeholder="Message Morning crew"
            trailing={
              <div className="flex items-center gap-1">
                <span aria-label="Mention a member" className="flex h-11 w-11 items-center justify-center text-white/45">
                  <AtSign className="h-4 w-4" strokeWidth={1.9} />
                </span>
                <span
                  aria-label="Send message"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange text-white shadow-[var(--glow-orange-sm)]"
                >
                  <Send className="h-4 w-4" strokeWidth={2.1} />
                </span>
              </div>
            }
          />
        </div>
      }
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <GlassCard tone="you">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Room mission</span>
              <h2 className="mt-0.5 truncate text-[18px] font-semibold leading-6 text-white">Tempo run together</h2>
            </div>
            <AvatarStack />
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-[12px] text-white/60">
              <span>Members joining</span>
              <span className="font-semibold tabular-nums text-white">4 of 5</span>
            </div>
            <MomentumBar value={80} label="4 of 5 members joined" />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Chip tone="you">
              <Zap className="mr-1 h-3 w-3" strokeWidth={2} />
              120 group XP
            </Chip>
            <Chip tone="cia">
              <Sparkles className="mr-1 h-3 w-3" strokeWidth={2} />
              CIA pacing
            </Chip>
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-[11px] leading-4 text-white/40">
            <ShieldCheck className="h-3 w-3 shrink-0" strokeWidth={1.9} />
            Audience, report, and leave controls live in Group info.
          </p>
        </GlassCard>

        <div className="flex items-center gap-3 py-1 text-[12px] text-white/30">
          <span className="h-px flex-1 bg-white/[0.06]" />
          Today
          <span className="h-px flex-1 bg-white/[0.06]" />
        </div>

        <div className="space-y-3">
          <ChatBubble speaker="Kenji">Tomorrow is tempo day.</ChatBubble>

          <ChatBubble speaker="CIA" tone="cia">
            <p>
              Three members share a similar pace threshold. This <span className="text-emphasis">chat</span> keeps the
              group synced before tempo day.
            </p>
          </ChatBubble>

          <SolidCard className="flex items-center gap-3 border-royal-purple/15 p-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-orange/15 text-brand-orange">
              <Activity className="h-5 w-5" strokeWidth={1.9} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-white">Tempo run, 5 miles</p>
              <p className="mt-0.5 text-[11px] text-white/45">Proposed route, park loop</p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-white/30" strokeWidth={1.9} />
          </SolidCard>

          <ChatBubble speaker="You">I can lead the easy group.</ChatBubble>

          <div className="flex items-center gap-2 pl-1 text-[12px] text-white/45">
            <span className="flex gap-1">
              <i className="voice-status-pulse h-1.5 w-1.5 rounded-full bg-royal-purple" />
              <i className="voice-status-pulse h-1.5 w-1.5 rounded-full bg-royal-purple [animation-delay:120ms]" />
              <i className="voice-status-pulse h-1.5 w-1.5 rounded-full bg-royal-purple [animation-delay:240ms]" />
            </span>
            CIA is preparing pace summary
          </div>
        </div>
      </main>
    </HifiShell>
  )
}
