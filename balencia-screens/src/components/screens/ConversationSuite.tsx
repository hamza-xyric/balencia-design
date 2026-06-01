import Link from 'next/link'
import {
  ArrowUpRight,
  Check,
  CheckCheck,
  Image as ImageIcon,
  Lock,
  MessageCircle,
  Mic,
  Pin,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import { DomainTag } from '@/components/design-system/DomainTag'
import { domainToneClasses } from '@/components/design-system/Chip'
import type {
  ConversationAttachment,
  ConversationPreview,
  ConversationReaction,
  ConversationThreadMessage,
} from '@/data/mock'

type Tone = 'orange' | 'purple' | 'green' | 'muted'

const kindLabels: Record<ConversationPreview['kind'], string> = {
  sia: 'Coach',
  direct: 'Direct',
  group: 'Group',
  room: 'Room',
}

const actionToneClasses: Record<Tone, string> = {
  orange: 'border-brand-orange/25 bg-brand-orange/10 text-brand-orange',
  purple: 'border-royal-purple/25 bg-royal-purple/10 text-royal-purple',
  green: 'border-forest-green/25 bg-forest-green/10 text-forest-green',
  muted: 'border-alpha-white-08 bg-alpha-white-04 text-white/60',
}

function PresenceDot({ active }: { active?: boolean }) {
  return (
    <span
      className={[
        'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-ink-900',
        active ? 'bg-forest-green' : 'bg-white/20',
      ].join(' ')}
      aria-hidden="true"
    />
  )
}

export function ConversationAvatar({
  initials,
  domain,
  active,
  isSia,
  size = 'default',
}: {
  initials: string
  domain: ConversationPreview['domain']
  active?: boolean
  isSia?: boolean
  size?: 'default' | 'large'
}) {
  const tone = domainToneClasses[domain]
  const dimension = size === 'large' ? 'h-14 w-14 text-[17px]' : 'h-11 w-11 text-[14px]'

  return (
    <div className="relative shrink-0">
      <div
        className={[
          'flex items-center justify-center rounded-full border font-semibold text-white shadow-1',
          dimension,
          isSia
            ? 'border-royal-purple/45 bg-royal-purple shadow-[var(--glow-purple)]'
            : `${tone.subtle} ${tone.border}`,
        ].join(' ')}
      >
        {initials}
      </div>
      <PresenceDot active={active} />
    </div>
  )
}

export function SignalPill({
  children,
  tone = 'muted',
}: {
  children: React.ReactNode
  tone?: Tone
}) {
  return (
    <span
      className={[
        'inline-flex h-7 items-center gap-1.5 rounded-pill border px-2.5 text-[11px] font-semibold leading-none',
        actionToneClasses[tone],
      ].join(' ')}
    >
      {children}
    </span>
  )
}

export function ConversationRow({ conversation }: { conversation: ConversationPreview }) {
  const isSia = conversation.kind === 'sia'

  return (
    <Link
      href={conversation.route}
      className="group flex min-h-[74px] items-center gap-3 rounded-lg border border-alpha-white-06 bg-ink-brown-800 px-3 py-3 shadow-1 transition-all duration-[var(--dur-base)] hover:border-brand-orange/30 hover:bg-alpha-white-04"
    >
      <ConversationAvatar
        initials={conversation.initials}
        domain={conversation.domain}
        active={conversation.active}
        isSia={isSia}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="truncate text-[15px] font-semibold leading-5 text-white">{conversation.name}</h2>
          {conversation.pinned && <Pin size={12} className="shrink-0 text-brand-orange" strokeWidth={2.2} />}
          {conversation.aiAssisted && <Sparkles size={12} className="shrink-0 text-royal-purple" strokeWidth={2.2} />}
        </div>
        <p className="mt-1 line-clamp-1 text-[12px] leading-4 text-white/45">{conversation.subtitle}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-pill bg-alpha-white-05 px-2 py-1 text-[10px] font-semibold leading-none text-white/45">
            {kindLabels[conversation.kind]}
          </span>
          <DomainTag domain={conversation.domain} />
        </div>
      </div>

      <div className="flex h-full shrink-0 flex-col items-end justify-between gap-2">
        <span className="text-[11px] leading-4 text-white/35">{conversation.timestamp}</span>
        {conversation.unread > 0 ? (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-orange px-1.5 text-[11px] font-semibold leading-none text-white shadow-[var(--glow-orange)]">
            {conversation.unread}
          </span>
        ) : (
          <ArrowUpRight size={15} className="text-white/25 transition-colors group-hover:text-brand-orange" strokeWidth={2} />
        )}
      </div>
    </Link>
  )
}

function AttachmentIcon({ kind }: { kind: ConversationAttachment['kind'] }) {
  if (kind === 'image') return <ImageIcon size={15} strokeWidth={2} />
  if (kind === 'voice') return <Mic size={15} strokeWidth={2} />
  if (kind === 'mission') return <Star size={15} strokeWidth={2} />
  return <Sparkles size={15} strokeWidth={2} />
}

function AttachmentCard({ attachment }: { attachment: ConversationAttachment }) {
  const tone = domainToneClasses[attachment.domain]

  return (
    <div className="mt-2 rounded-md border border-alpha-white-08 bg-alpha-white-04 p-3">
      <div className="flex items-center gap-2">
        <div className={`flex h-8 w-8 items-center justify-center rounded-sm ${tone.subtle} ${tone.text}`}>
          <AttachmentIcon kind={attachment.kind} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold leading-[18px] text-white">{attachment.title}</p>
          <p className="mt-0.5 truncate text-[11px] leading-[14px] text-white/45">{attachment.meta}</p>
        </div>
      </div>
    </div>
  )
}

function ReactionStrip({ reactions }: { reactions: ConversationReaction[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {reactions.map((reaction) => (
        <span
          key={reaction.label}
          className="inline-flex h-6 items-center gap-1 rounded-pill border border-alpha-white-08 bg-alpha-white-04 px-2 text-[10px] font-semibold leading-none text-white/55"
        >
          {reaction.label}
          <span className="text-white/35">{reaction.count}</span>
        </span>
      ))}
    </div>
  )
}

function StatusIcon({ status }: { status?: ConversationThreadMessage['status'] }) {
  if (status === 'read') return <CheckCheck size={13} className="text-forest-green" strokeWidth={2} />
  if (status === 'delivered') return <CheckCheck size={13} className="text-white/35" strokeWidth={2} />
  if (status === 'sent') return <Check size={13} className="text-white/35" strokeWidth={2} />
  return null
}

export function ThreadMessage({ message }: { message: ConversationThreadMessage }) {
  const isUser = message.sender === 'user'
  const isSia = message.sender === 'sia'

  return (
    <article className={['flex w-full gap-2', isUser ? 'justify-end' : 'justify-start'].join(' ')}>
      {!isUser && (
        <ConversationAvatar
          initials={message.avatar}
          domain={message.domain || 'wellbeing'}
          active={isSia}
          isSia={isSia}
        />
      )}

      <div className={['max-w-[258px]', isUser ? 'items-end' : 'items-start'].join(' ')}>
        {!isUser && (
          <div className="mb-1 flex items-center gap-2 px-1">
            <span className={['text-[11px] font-semibold leading-4', isSia ? 'text-royal-purple' : 'text-white/45'].join(' ')}>
              {message.author}
            </span>
            <span className="text-[10px] leading-none text-white/25">{message.timestamp}</span>
          </div>
        )}

        <div
          className={[
            'rounded-[18px] px-3 py-2.5 text-[14px] leading-[21px] text-white shadow-1',
            isUser
              ? 'rounded-br-xs border border-brand-orange/20 bg-brand-orange/15'
              : message.highlighted
                ? 'rounded-bl-xs border border-royal-purple/25 bg-royal-purple/12'
                : 'rounded-bl-xs border border-alpha-white-08 bg-ink-brown-800',
          ].join(' ')}
        >
          <p>{message.text}</p>
          {message.attachment && <AttachmentCard attachment={message.attachment} />}
          {message.reactions && <ReactionStrip reactions={message.reactions} />}
        </div>

        {isUser && (
          <div className="mt-1 flex items-center justify-end gap-1 px-1 text-[10px] leading-none text-white/30">
            <span>{message.timestamp}</span>
            <StatusIcon status={message.status} />
          </div>
        )}
      </div>
    </article>
  )
}

export function TypingIndicator({ label = 'SIA is preparing a reply' }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-pill border border-alpha-white-06 bg-ink-brown-800 px-3 py-2 text-[11px] leading-none text-white/45 shadow-1">
      <MessageCircle size={13} className="text-royal-purple" strokeWidth={2} />
      <span>{label}</span>
      <span className="flex gap-1" aria-hidden="true">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="sia-thinking-dot h-1.5 w-1.5 rounded-full bg-white/40"
            style={{ animationDelay: `${dot * 180}ms` }}
          />
        ))}
      </span>
    </div>
  )
}

export function MembersRail({
  members,
}: {
  members: { initials: string; domain: ConversationPreview['domain']; active?: boolean }[]
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-alpha-white-08 bg-alpha-white-04 text-white/45">
        <Users size={16} strokeWidth={2} />
      </span>
      <div className="flex -space-x-2">
        {members.map((member) => (
          <div key={member.initials} className="rounded-full border-2 border-ink-900">
            <ConversationAvatar
              initials={member.initials}
              domain={member.domain}
              active={member.active}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function PrivacyPill() {
  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-pill border border-alpha-white-08 bg-alpha-white-04 px-2.5 text-[11px] font-semibold leading-none text-white/50">
      <Lock size={12} strokeWidth={2} />
      Private
    </span>
  )
}
