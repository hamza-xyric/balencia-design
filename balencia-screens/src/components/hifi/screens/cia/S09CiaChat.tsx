'use client'

import { useEffect, useRef, useState } from 'react'
import { Mic, Paperclip, Search, ShieldCheck, X } from 'lucide-react'
import Link from 'next/link'
import {
  BtnGhost,
  BtnSecondary,
  ChatBubble,
  Chip,
  ConsentRail,
  GlassPillInput,
  HifiShell,
  IconButton,
  InlineArtifact,
  TopBar,
  VoiceComposer,
} from '@/components/hifi/kit'

const CHAT_STATES = ['default', 'skeleton', 'empty', 'error', 'success', 'disabled', 'offline', 'thinking'] as const
type ChatState = (typeof CHAT_STATES)[number]
type ChatPanel = 'none' | 'search' | 'voice' | 'attachment' | 'privacy'

const suggestionReplies: Record<string, string> = {
  'Tell me more': 'Your shorter sleep window and higher workout load overlap. Keep today’s first effort easy and check in after breakfast.',
  'Show missions': 'Your Mission Board is ready. I have not changed or completed any mission from this chat preview.',
  'Log meal': 'Tell me what you ate first. I will ask for confirmation before anything is treated as a meal log.',
}

function isChatState(value: string | null): value is ChatState {
  return CHAT_STATES.includes(value as ChatState)
}

function FocusedChatPanel({
  panel,
  onClose,
  children,
}: {
  panel: Exclude<ChatPanel, 'none'>
  onClose: () => void
  children: React.ReactNode
}) {
  const panelRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const initialFocus = panel === 'search'
      ? panelRef.current?.querySelector<HTMLElement>('input')
      : panelRef.current?.querySelector<HTMLElement>('button, [href], input')
    initialFocus?.focus()
    return () => {
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [panel])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key !== 'Tab') return
    const focusable = [...(panelRef.current?.querySelectorAll<HTMLElement>('input:not(:disabled), button:not(:disabled), [href]') ?? [])]
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div className="absolute inset-0 z-[60] flex items-end bg-ink-900/85 px-3 pb-[72px]" role="presentation">
      <section
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`chat-${panel}-title`}
        className="action-sheet-surface glass-card max-h-[650px] w-full overflow-y-auto p-4 shadow-3"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 id={`chat-${panel}-title`} className="text-[18px] font-semibold text-paper-100">
            {panel === 'search' && 'Search conversations'}
            {panel === 'voice' && 'Voice options'}
            {panel === 'attachment' && 'Attach context'}
            {panel === 'privacy' && 'Conversation privacy'}
          </h2>
          <button type="button" className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/70" aria-label={`Close ${panel} dialog`} onClick={onClose}>
            <X size={19} />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}

export function S09CiaChat() {
  const [chatState, setChatState] = useState<ChatState>('default')
  const [panel, setPanel] = useState<ChatPanel>('none')
  const [searchQuery, setSearchQuery] = useState('')
  const [sentMessage, setSentMessage] = useState('What should I change today?')
  const [reply, setReply] = useState('')
  const [failedMessage, setFailedMessage] = useState('Help me simplify today.')
  const [draft, setDraft] = useState('')
  const [liveStatus, setLiveStatus] = useState('CIA chat ready.')
  const [composerKey, setComposerKey] = useState(0)
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const voiceOpenedFromComposer = useRef(false)
  const lastPanelTrigger = useRef<HTMLElement | null>(null)
  const offline = chatState === 'offline'
  const disabled = chatState === 'disabled'
  const loading = chatState === 'skeleton'
  const thinking = chatState === 'thinking'

  useEffect(() => {
    const fixture = new URLSearchParams(window.location.search).get('state')
    if (!isChatState(fixture)) return
    const fixtureTimer = window.setTimeout(() => {
      setChatState(fixture)
      if (fixture === 'success') {
        setSentMessage('What should I change today?')
        setReply('Keep the first effort easy, eat before the long focus block, and check in after lunch.')
      }
      if (fixture === 'empty') setSentMessage('')
      setLiveStatus(`CIA chat fixture: ${fixture}.`)
    }, 0)
    return () => window.clearTimeout(fixtureTimer)
  }, [])

  useEffect(() => () => {
    if (replyTimer.current) clearTimeout(replyTimer.current)
  }, [])

  const closePanel = () => {
    const resetComposerVoice = panel === 'voice' && voiceOpenedFromComposer.current
    const returnFocus = lastPanelTrigger.current
    setPanel('none')
    setSearchQuery('')
    setLiveStatus('Dialog closed. No data was shared.')
    if (resetComposerVoice) {
      voiceOpenedFromComposer.current = false
      setComposerKey(current => current + 1)
      window.setTimeout(() => document.querySelector<HTMLElement>('button[aria-label="Start voice input"]')?.focus(), 0)
    } else {
      window.setTimeout(() => {
        if (returnFocus?.isConnected) returnFocus.focus()
      }, 0)
    }
  }

  const openPanel = (nextPanel: Exclude<ChatPanel, 'none'>) => {
    lastPanelTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setPanel(nextPanel)
    setLiveStatus(`${nextPanel} dialog opened.`)
  }

  const finishReply = (message: string) => {
    const nextReply = suggestionReplies[message] ?? 'Start with one small adjustment: protect breakfast, lower the first effort, and check in before changing the rest of your day.'
    setReply(nextReply)
    setChatState('success')
    setLiveStatus('CIA reply received. Source: your chat message, sleep record and workout load. Audience: only you.')
  }

  const beginSend = (message: string) => {
    const nextMessage = message.trim()
    if (!nextMessage) return false
    if (offline) {
      setLiveStatus('Message not sent while offline. Your draft is preserved and nothing was queued.')
      return false
    }
    if (disabled) {
      setLiveStatus('Message not sent because this fixture is disabled. Your draft is preserved.')
      return false
    }
    if (replyTimer.current) clearTimeout(replyTimer.current)
    setSentMessage(nextMessage)
    setFailedMessage('')
    setReply('')
    setChatState('thinking')
    setLiveStatus('Message sent. CIA is thinking.')
    replyTimer.current = setTimeout(() => finishReply(nextMessage), 450)
    return true
  }

  const retryFailedMessage = () => {
    const retryText = failedMessage || 'Help me simplify today.'
    setChatState('default')
    beginSend(retryText)
  }

  const showSuggestions = chatState !== 'skeleton' && chatState !== 'disabled'
  const showExistingHistory = chatState !== 'empty' && chatState !== 'skeleton'

  return (
    <HifiShell
      atmosphere="cia"
      header={
        <TopBar
          title="CIA"
          eyebrow="Today"
          back={false}
          right={
            <span className="flex" aria-hidden={panel !== 'none' || undefined} inert={panel !== 'none' || undefined}>
              <IconButton label="Search conversations" disabled={disabled} aria-describedby={disabled ? 'chat-disabled-reason' : undefined} onClick={() => openPanel('search')}><Search size={18} /></IconButton>
              <IconButton id="chat-voice-options" label="Open voice options" disabled={disabled || offline} aria-describedby={disabled ? 'chat-disabled-reason' : offline ? 'chat-offline-reason' : undefined} onClick={() => {
                voiceOpenedFromComposer.current = false
                openPanel('voice')
              }}><Mic size={18} /></IconButton>
            </span>
          }
        />
      }
      activeTab="cia"
      showTabBar={panel === 'none'}
      composer={
        <div className={disabled ? 'opacity-70' : undefined} aria-hidden={panel !== 'none' || undefined} inert={panel !== 'none' || undefined}>
          <p id="chat-composer-disabled-reason" className={offline || disabled || thinking || chatState === 'error' ? 'mb-1 text-center text-[12px] leading-4 text-paper-100/70' : 'sr-only'}>
            {offline && 'Offline · draft stays local and send is disabled.'}
            {disabled && 'Composer disabled in this fixture.'}
            {thinking && 'Wait for the current CIA reply before sending again.'}
            {chatState === 'error' && 'Resolve the failed draft below before sending another message.'}
          </p>
          <VoiceComposer
            key={composerKey}
            ariaLabel="CIA message composer"
            inputLabel="Message CIA"
            placeholder="Message CIA"
            announceInternally={false}
            disabled={disabled}
            sendDisabled={offline || thinking || chatState === 'error'}
            disabledReasonId={(offline || disabled || thinking || chatState === 'error') ? 'chat-composer-disabled-reason' : undefined}
            clearOnSend
            onDraftChange={setDraft}
            onAttach={() => openPanel('attachment')}
            onVoiceChange={voiceActive => {
              if (voiceActive) {
                voiceOpenedFromComposer.current = true
                openPanel('voice')
              }
              else {
                setPanel('none')
                setLiveStatus('Voice options closed. No microphone was opened.')
              }
            }}
            voiceDescribedBy="chat-voice-disclosure"
            onSend={beginSend}
          />
          <p id="chat-voice-disclosure" className="sr-only">Voice opens a disclosure-first local preview. No microphone or speech service starts from this chat screen.</p>
        </div>
      }
    >
      <main className="space-y-4 px-4 pb-4 pt-3" data-chat-state={chatState} aria-busy={loading || undefined} aria-hidden={panel !== 'none' || undefined} inert={panel !== 'none' || undefined}>
        <p className="sr-only" aria-live="polite" aria-atomic="true">{liveStatus}</p>
        <p id="chat-disabled-reason" className={disabled ? 'rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[12px] leading-4 text-paper-100/70' : 'sr-only'}>Chat input, search and voice options are disabled in this fixture. Privacy controls remain available.</p>
        <p id="chat-offline-reason" className="sr-only">Voice options are unavailable while offline.</p>

        {offline && (
          <div className="rounded-xl border border-brand-orange/30 bg-brand-orange/10 px-4 py-3 text-[13px] leading-5 text-paper-100/80">Offline · cached history from 18 minutes ago. Drafts stay local and never auto-queue.{draft ? ' Your current draft is preserved in the composer.' : ''}</div>
        )}

        {loading ? (
          <section className="space-y-3" aria-label="Loading CIA chat">
            <div className="skeleton-block h-20 w-[82%]" />
            <div className="skeleton-block h-32" />
            <div className="skeleton-block ml-auto h-16 w-[70%]" />
          </section>
        ) : chatState === 'empty' ? (
          <section className="space-y-4">
            <ChatBubble
              speaker="CIA"
              tone="cia"
              messageId="cia-day-one-greeting"
              status="delivered"
              source="CIA response"
              audience="Only you"
              timestamp="9:40 am"
              dateTime="2026-07-10T09:40:00+05:00"
            >
              I’m here when you’re ready. We can start with one part of today.
            </ChatBubble>
            <Chip interactive tone="you" onClick={() => beginSend('Help me plan today')}>Help me plan today</Chip>
          </section>
        ) : (
          <>
            <ChatBubble
              speaker="CIA"
              tone="cia"
              messageId="cia-connection-message"
              status="delivered"
              source="CIA response · Health + you logged"
              audience="Only you"
              timestamp="9:40 am"
              dateTime="2026-07-10T09:40:00+05:00"
            >
              Good morning, Amira. Your sleep and workout load are connected.
            </ChatBubble>
            <InlineArtifact />

            {showExistingHistory && sentMessage && (
              <ChatBubble
                speaker="You"
                tone="you"
                messageId="member-latest-message"
                status={thinking || chatState === 'success' ? 'sent' : 'read'}
                source="You sent"
                audience="CIA chat · only you"
                timestamp="9:41 am"
                dateTime="2026-07-10T09:41:00+05:00"
              >
                {sentMessage}
              </ChatBubble>
            )}

            {chatState === 'error' && failedMessage && (
              <div className="space-y-2">
                <ChatBubble
                  speaker="You"
                  tone="you"
                  messageId="failed-member-message"
                  status="failed"
                  source="Local draft · not sent"
                  audience="Only you"
                  timestamp="9:42 am"
                  dateTime="2026-07-10T09:42:00+05:00"
                >
                  {failedMessage}
                </ChatBubble>
                <div className="flex justify-end gap-2">
                  <BtnGhost quiet className="border border-white/10" onClick={retryFailedMessage}>Retry message</BtnGhost>
                  <BtnGhost quiet className="border border-white/10" onClick={() => {
                    setFailedMessage('')
                    setChatState('default')
                    setLiveStatus('Failed draft deleted. No message was sent.')
                  }}>Delete failed draft</BtnGhost>
                </div>
              </div>
            )}

            {thinking && (
              <div className="flex min-h-11 items-center gap-2 text-[13px] text-paper-100/70" aria-label="CIA is thinking">
                <span className="flex gap-1" aria-hidden="true">
                  <i className="voice-status-pulse h-1.5 w-1.5 rounded-full bg-royal-purple" />
                  <i className="voice-status-pulse h-1.5 w-1.5 rounded-full bg-royal-purple [animation-delay:120ms]" />
                  <i className="voice-status-pulse h-1.5 w-1.5 rounded-full bg-royal-purple [animation-delay:240ms]" />
                </span>
                CIA is thinking
              </div>
            )}

            {chatState === 'success' && reply && (
              <ChatBubble
                speaker="CIA"
                tone="cia"
                messageId="cia-sourced-reply"
                status="delivered"
                source="CIA response · Sleep + workout load"
                audience="Only you"
                timestamp="9:42 am"
                dateTime="2026-07-10T09:42:00+05:00"
              >
                {reply}
              </ChatBubble>
            )}

            {showSuggestions && !thinking && (
              <div className="flex flex-wrap gap-2" aria-label="Suggested messages">
                {['Tell me more', 'Show missions', 'Log meal'].map((label, index) => (
                  <Chip key={label} interactive tone={index === 0 ? 'you' : 'muted'} onClick={() => beginSend(label)}>{label}</Chip>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
              <p className="text-[12px] leading-4 text-paper-100/70">Private CIA chat · source controls and deletion remain reachable.</p>
              <button type="button" className="focus-ring min-h-11 shrink-0 rounded-pill px-3 text-[12px] font-semibold text-brand-orange" onClick={() => openPanel('privacy')}>Privacy</button>
            </div>
            <ConsentRail />
          </>
        )}
      </main>

      {panel === 'search' && (
        <FocusedChatPanel panel="search" onClose={closePanel}>
          <div className="mt-3">
            <GlassPillInput
              id="cia-chat-search"
              label="Search conversations"
              icon={<Search size={17} />}
              placeholder="Search this conversation"
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              autoFocus
              trailing={
                <button type="button" className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/70 disabled:opacity-40" aria-label="Clear search" disabled={!searchQuery} onClick={() => {
                  setSearchQuery('')
                  setLiveStatus('Chat search cleared.')
                }}><X size={17} /></button>
              }
            />
          </div>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-[13px] leading-5 text-paper-100/70">
            {searchQuery.trim() ? `Local result preview for “${searchQuery.trim()}”. No remote history was searched.` : 'Type to search the messages rendered in this local preview.'}
          </div>
        </FocusedChatPanel>
      )}

      {panel === 'voice' && (
        <FocusedChatPanel panel="voice" onClose={closePanel}>
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <Mic size={21} className="text-brand-orange" />
            <p className="mt-3 text-[13px] leading-5 text-paper-100/75">Voice remains off. Review microphone, transcript, retention and deletion before entering either preview. No audio service starts here.</p>
          </div>
          <div className="mt-4 space-y-2">
            <Link href="/screens/10?state=consent-required" className="focus-ring flex min-h-14 items-center justify-between rounded-xl border border-white/10 px-4 text-[14px] font-semibold text-paper-100">Open inline voice preview <span aria-hidden="true">→</span></Link>
            <Link href="/screens/11" className="focus-ring flex min-h-14 items-center justify-between rounded-xl border border-white/10 px-4 text-[14px] font-semibold text-paper-100">Open full-screen voice <span aria-hidden="true">→</span></Link>
          </div>
          <BtnSecondary className="mt-4 w-full" onClick={closePanel}>Cancel</BtnSecondary>
        </FocusedChatPanel>
      )}

      {panel === 'attachment' && (
        <FocusedChatPanel panel="attachment" onClose={closePanel}>
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <Paperclip size={21} className="text-brand-orange" />
            <p className="mt-3 text-[13px] leading-5 text-paper-100/75">Attachments are a local options preview. No photo picker, file upload or health-source handoff is connected.</p>
          </div>
          <button type="button" className="focus-ring mt-4 flex min-h-14 w-full items-center rounded-xl border border-white/10 px-4 text-left text-[14px] font-semibold text-paper-100" onClick={() => setLiveStatus('Attachment preview selected. No file was opened or attached.')}>Preview attachment choice</button>
          <BtnSecondary className="mt-2 w-full" onClick={closePanel}>Done</BtnSecondary>
        </FocusedChatPanel>
      )}

      {panel === 'privacy' && (
        <FocusedChatPanel panel="privacy" onClose={closePanel}>
          <div className="mt-3 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-royal-purple" />
            <p className="text-[13px] leading-5 text-paper-100/75">Audience: only you and CIA. Nothing from this private chat is shared to people, groups or rooms without a separate explicit action.</p>
          </div>
          <div className="mt-4 space-y-2">
            {['Review source and why CIA used it', 'Export conversation preview', 'Revoke CIA source access', 'Delete recommendation preview', 'Report, mute or block preview'].map(action => (
              <BtnGhost key={action} quiet className="w-full justify-start border border-white/10" onClick={() => setLiveStatus(`${action} selected. No persisted or external action occurred.`)}>{action}</BtnGhost>
            ))}
          </div>
          <BtnSecondary className="mt-4 w-full" onClick={closePanel}>Done</BtnSecondary>
        </FocusedChatPanel>
      )}
    </HifiShell>
  )
}
