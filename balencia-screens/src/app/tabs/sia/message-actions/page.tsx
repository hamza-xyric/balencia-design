import { Eye, Forward, Pin, Shield, Star } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { domainToneClasses } from '@/components/design-system/Chip'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import {
  PrivacyPill,
  SignalPill,
  ThreadMessage,
} from '@/components/screens/ConversationSuite'
import { SectionHeader } from '@/components/screens/SectionHeader'
import { messageActionPreview } from '@/data/mock'

// Screen 77 of 82: Message actions

const actionIcons = [Pin, Star, Forward, Eye]

function SelectedMessage() {
  return (
    <section className="animate-fade-up rounded-xl border border-white/[0.08] bg-ink-brown-800 p-4 shadow-2">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/40">Selected message</p>
        <PrivacyPill />
      </div>
      <ThreadMessage message={messageActionPreview.message} />
    </section>
  )
}

function ReactionGrid() {
  return (
    <section className="animate-fade-up" style={{ animationDelay: '80ms' }}>
      <SectionHeader title="Quick reactions" />
      <div className="grid grid-cols-2 gap-2">
        {messageActionPreview.quickReactions.map((reaction, index) => (
          <button
            key={reaction}
            type="button"
            className={[
              'h-11 rounded-pill border px-3 text-[13px] font-semibold leading-none transition-transform duration-[var(--dur-fast)] active:scale-[0.96]',
              index === 0
                ? 'border-brand-orange/30 bg-brand-orange/12 text-brand-orange'
                : 'border-white/[0.08] bg-white/[0.04] text-white/60',
            ].join(' ')}
          >
            {reaction}
          </button>
        ))}
      </div>
    </section>
  )
}

function ActionList() {
  return (
    <section className="animate-fade-up" style={{ animationDelay: '140ms' }}>
      <SectionHeader title="Actions" />
      <div className="space-y-2">
        {messageActionPreview.actions.map((action, index) => {
          const Icon = actionIcons[index]
          return (
            <button
              key={action.label}
              type="button"
              className="flex min-h-[66px] w-full items-center gap-3 rounded-lg border border-white/[0.06] bg-ink-brown-800 px-3 py-3 text-left shadow-1 transition-colors hover:border-brand-orange/25"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/60">
                <Icon size={17} strokeWidth={2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-semibold leading-[18px] text-white">{action.label}</span>
                <span className="mt-1 block text-[12px] leading-4 text-white/45">{action.detail}</span>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function MediaVault() {
  return (
    <section className="animate-fade-up" style={{ animationDelay: '200ms' }}>
      <SectionHeader title="Shared media" />
      <div className="grid grid-cols-3 gap-2">
        {messageActionPreview.media.map((item) => {
          const tone = domainToneClasses[item.domain]
          return (
            <div key={item.title} className="min-h-[104px] rounded-lg border border-white/[0.06] bg-white/[0.04] p-2">
              <div className={`flex h-10 w-10 items-center justify-center rounded-sm ${tone.subtle} ${tone.text}`}>
                <Shield size={17} strokeWidth={2} />
              </div>
              <p className="mt-3 line-clamp-2 text-[12px] font-semibold leading-[16px] text-white">{item.title}</p>
              <p className="mt-1 line-clamp-2 text-[10px] leading-[13px] text-white/35">{item.meta}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function BottomAction() {
  return (
    <Button fullWidth leftIcon={<Shield size={16} strokeWidth={2.2} />}>
      Done
    </Button>
  )
}

export default function MessageActionsScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Message actions" showBack />} activeTab="sia" bottomAction={<BottomAction />}>
        <main className="space-y-5 px-4 pb-6 pt-4">
          <div className="flex flex-wrap gap-2">
            <SignalPill tone="orange">View-once protected</SignalPill>
            <SignalPill tone="purple">SIA can summarize</SignalPill>
          </div>
          <SelectedMessage />
          <ReactionGrid />
          <ActionList />
          <MediaVault />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
