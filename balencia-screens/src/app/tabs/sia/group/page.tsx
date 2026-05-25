import { Info, Plus, Sparkles } from 'lucide-react'
import { ChatInputBar } from '@/components/screens/ChatInputBar'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import {
  MembersRail,
  SignalPill,
  ThreadMessage,
  TypingIndicator,
} from '@/components/screens/ConversationSuite'
import { groupConversationMessages } from '@/data/mock'

// Screen 76 of 82: Group chat

function GroupHeader() {
  return (
    <Header
      showBack
      title="Morning crew"
      rightAction={
        <div className="flex items-center gap-1">
          <button className="flex h-11 w-11 items-center justify-center text-white/50" aria-label="Add member">
            <Plus size={20} strokeWidth={1.9} />
          </button>
          <button className="flex h-11 w-11 items-center justify-center text-white/50" aria-label="Group info">
            <Info size={19} strokeWidth={1.9} />
          </button>
        </div>
      }
    />
  )
}

function GroupMissionCard() {
  return (
    <section className="animate-fade-up rounded-xl border border-domain-fitness/25 bg-[linear-gradient(145deg,rgba(239,68,68,0.16),rgba(33,16,8,0.94)_62%)] p-4 shadow-2">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-domain-fitness">Room mission</p>
          <h2 className="mt-2 text-[19px] font-semibold leading-[24px] text-white">Tempo run together</h2>
          <p className="mt-2 text-[13px] leading-[19px] text-white/55">
            Two pace groups, one shared XP target, and SIA-adjusted recovery notes for every member.
          </p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-domain-fitness/20 text-domain-fitness">
          <Sparkles size={18} strokeWidth={2.2} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <SignalPill tone="orange">120 group XP</SignalPill>
        <SignalPill tone="green">4 joining</SignalPill>
        <SignalPill tone="purple">SIA pacing</SignalPill>
      </div>
    </section>
  )
}

function MemberSummary() {
  return (
    <section className="animate-fade-up rounded-lg border border-white/[0.06] bg-white/[0.03] p-3" style={{ animationDelay: '80ms' }}>
      <div className="flex items-center justify-between gap-3">
        <MembersRail
          members={[
            { initials: 'S', domain: 'fitness', active: true },
            { initials: 'O', domain: 'wellbeing' },
            { initials: 'AK', domain: 'fitness', active: true },
            { initials: 'A', domain: 'fitness', active: true },
          ]}
        />
        <div className="text-right">
          <p className="text-[13px] font-semibold leading-[18px] text-white">5 members</p>
          <p className="mt-0.5 text-[11px] leading-[14px] text-white/40">3 online now</p>
        </div>
      </div>
    </section>
  )
}

export default function GroupChatScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<GroupHeader />}
        activeTab="sia"
        composer={<ChatInputBar placeholder="Message Morning crew" action="send" />}
      >
        <main className="space-y-4 px-4 pb-4 pt-4">
          <GroupMissionCard />
          <MemberSummary />

          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-white/[0.05]" />
            <span className="text-[12px] leading-4 text-white/30">Today</span>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>

          <section className="space-y-4">
            {groupConversationMessages.map((message, index) => (
              <div key={message.id} className="animate-fade-up" style={{ animationDelay: `${index * 70}ms` }}>
                <ThreadMessage message={message} />
              </div>
            ))}
          </section>

          <TypingIndicator label="SIA is preparing pace groups" />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
