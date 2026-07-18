'use client'

import { useId, useState } from 'react'
import { Mic, Plus, Send } from 'lucide-react'

type ComposerProps = {
  placeholder?: string
  ariaLabel?: string
  inputLabel?: string
  onAttach?: () => void
  onSend?: (message: string) => void | boolean
  onDraftChange?: (message: string) => void
  disabled?: boolean
  sendDisabled?: boolean
  disabledReasonId?: string
  announceInternally?: boolean
  clearOnSend?: boolean
}

type VoiceComposerProps = ComposerProps & {
  onVoiceChange?: (listening: boolean) => void
  voiceDescribedBy?: string
}

function ComposerShell({
  placeholder,
  ariaLabel,
  inputLabel,
  voice,
  onAttach,
  onSend,
  onDraftChange,
  onVoiceChange,
  voiceDescribedBy,
  disabled,
  sendDisabled,
  disabledReasonId,
  announceInternally,
  clearOnSend,
}: {
  placeholder: string
  ariaLabel: string
  inputLabel: string
  voice: boolean
  onAttach?: () => void
  onSend?: (message: string) => void | boolean
  onDraftChange?: (message: string) => void
  onVoiceChange?: (listening: boolean) => void
  voiceDescribedBy?: string
  disabled: boolean
  sendDisabled: boolean
  disabledReasonId?: string
  announceInternally: boolean
  clearOnSend: boolean
}) {
  const [message, setMessage] = useState('')
  const [listening, setListening] = useState(false)
  const [status, setStatus] = useState('')
  const emptySendReasonId = useId()
  const unavailableSendReasonId = useId()

  const submitMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextMessage = message.trim()
    if (!nextMessage) {
      setStatus('Type a message first.')
      return
    }
    if (!onSend) {
      setStatus('Sending is unavailable in this visual preview. Your draft is preserved.')
      return
    }
    const accepted = onSend(nextMessage)
    if (accepted === false) {
      setStatus('Message not sent. Your draft is preserved.')
      return
    }
    if (clearOnSend) {
      setMessage('')
      onDraftChange?.('')
    }
    setStatus('Message sent.')
  }

  const toggleVoice = () => {
    const nextListening = !listening
    setListening(nextListening)
    onVoiceChange?.(nextListening)
    setStatus(nextListening ? 'Voice input started.' : 'Voice input stopped.')
  }

  return (
    <form
      className="flex h-[54px] items-center gap-1 rounded-pill border border-white/10 bg-ink-brown-800 p-1 transition-[border-color,box-shadow] duration-[var(--dur-fast)] focus-within:border-brand-orange focus-within:shadow-[var(--focus-ring)] motion-reduce:transition-none"
      aria-label={ariaLabel}
      onSubmit={submitMessage}
    >
      <button
        type="button"
        className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-paper-100/65 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label={onAttach ? 'Attach context' : 'Attachments unavailable in this prototype'}
        aria-describedby={disabled ? disabledReasonId : undefined}
        disabled={disabled || !onAttach}
        onClick={() => {
          if (!onAttach) return
          onAttach()
          setStatus('Attachment options opened.')
        }}
      >
        <Plus size={18} strokeWidth={2} />
      </button>
      <input
        aria-label={inputLabel}
        className="h-11 min-w-0 flex-1 bg-transparent px-1 text-[16px] leading-5 text-paper-100 outline-none placeholder:text-paper-100/60"
        placeholder={placeholder}
        value={message}
        disabled={disabled}
        aria-describedby={disabled ? disabledReasonId : undefined}
        onChange={event => {
          setMessage(event.target.value)
          onDraftChange?.(event.target.value)
        }}
      />
      {voice && (
        <button
          type="button"
          className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange"
          aria-label={listening ? 'Stop voice input' : 'Start voice input'}
          aria-describedby={voiceDescribedBy}
          aria-pressed={listening}
          disabled={disabled}
          onClick={toggleVoice}
        >
          <Mic size={17} strokeWidth={2} />
        </button>
      )}
      <button
        type="submit"
        className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cta-ember text-paper-100 disabled:cursor-not-allowed disabled:bg-cta-disabled disabled:text-cta-disabled-fg"
        aria-label="Send message"
        aria-describedby={(disabled || sendDisabled) ? disabledReasonId : !onSend ? unavailableSendReasonId : !message.trim() ? emptySendReasonId : undefined}
        disabled={disabled || sendDisabled || !onSend || !message.trim()}
      >
        <Send size={16} strokeWidth={2.2} />
      </button>
      <span id={emptySendReasonId} className="sr-only">Type a message before sending.</span>
      <span id={unavailableSendReasonId} className="sr-only">Sending is unavailable in this visual preview. Your draft will be preserved.</span>
      {announceInternally && <span className="sr-only" role="status" aria-live="polite">{status}</span>}
    </form>
  )
}

export function VoiceComposer({
  placeholder = 'Type a message',
  ariaLabel = 'CIA voice message composer',
  inputLabel = 'Message CIA',
  disabled = false,
  sendDisabled = false,
  announceInternally = true,
  clearOnSend = true,
  ...props
}: VoiceComposerProps) {
  return (
    <ComposerShell
      placeholder={placeholder}
      ariaLabel={ariaLabel}
      inputLabel={inputLabel}
      voice
      disabled={disabled}
      sendDisabled={sendDisabled}
      announceInternally={announceInternally}
      clearOnSend={clearOnSend}
      {...props}
    />
  )
}

export function Composer({
  placeholder = 'Message CIA',
  ariaLabel = 'CIA message composer',
  inputLabel = 'Message CIA',
  disabled = false,
  sendDisabled = false,
  announceInternally = true,
  clearOnSend = true,
  ...props
}: ComposerProps) {
  return (
    <ComposerShell
      placeholder={placeholder}
      ariaLabel={ariaLabel}
      inputLabel={inputLabel}
      voice={false}
      disabled={disabled}
      sendDisabled={sendDisabled}
      announceInternally={announceInternally}
      clearOnSend={clearOnSend}
      {...props}
    />
  )
}
