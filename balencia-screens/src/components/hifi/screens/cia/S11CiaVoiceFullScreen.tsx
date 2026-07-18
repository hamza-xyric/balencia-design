'use client'

import { useState } from 'react'
import { Keyboard, LifeBuoy, Mic, Send, Volume2, VolumeX, X } from 'lucide-react'
import { BtnSecondary, CIAPresenceOrb, GlassCard, HifiShell, IconButton } from '@/components/hifi/kit'

// Distraction-free full-screen voice conversation — the only surface that
// replaces dashboards entirely with CIA's presence. No tab bar, no
// composer: the dock below is fixed control chrome, not navigation.
export function S11CiaVoiceFullScreen() {
  const [capturing, setCapturing] = useState(false)
  const [keyboardMode, setKeyboardMode] = useState(false)
  const [muted, setMuted] = useState(false)
  const [supportOpen, setSupportOpen] = useState(false)
  const [closed, setClosed] = useState(false)
  const [keyboardMessage, setKeyboardMessage] = useState('')
  const [messageStatus, setMessageStatus] = useState('')
  const userBars = capturing ? [7, 14, 22, 12, 6, 18, 13] : [3, 4, 3, 4, 3, 4, 3]
  const ciaBars = [3, 4, 3, 4, 3, 4]

  const closeVoiceMode = () => {
    setCapturing(false)
    setKeyboardMode(false)
    setSupportOpen(false)
    setMessageStatus('')
    setClosed(true)
  }

  const toggleKeyboardMode = () => {
    setCapturing(false)
    setMessageStatus('')
    setKeyboardMode(current => !current)
  }

  return (
    <HifiShell
      atmosphere="cia"
      showTabBar={false}
      header={
        <header className="z-30 flex min-h-[58px] shrink-0 items-center justify-between px-4">
          <IconButton
            label="Get support"
            aria-expanded={supportOpen}
            aria-controls="voice-support-panel"
            disabled={closed}
            onClick={() => setSupportOpen(current => !current)}
          >
            <LifeBuoy size={20} strokeWidth={1.8} />
          </IconButton>
          <IconButton label="Close voice mode" disabled={closed} onClick={closeVoiceMode}>
            <X size={20} strokeWidth={1.8} />
          </IconButton>
        </header>
      }
      bottomAction={
        closed
          ? undefined
          : <div className="glass-frost -mx-4 rounded-t-[28px] border-t border-white/10 px-6 pb-4 pt-6">
              {keyboardMode
                ? <form
                    className="flex h-11 items-center gap-2 rounded-pill border border-white/10 bg-ink-brown-800 px-2 transition-[border-color] duration-[var(--dur-fast)] focus-within:border-brand-orange focus-within:shadow-[var(--focus-ring)]"
                    onSubmit={(event) => {
                      event.preventDefault()
                      if (!keyboardMessage.trim()) {
                        setMessageStatus('Type a message first.')
                        return
                      }
                      setKeyboardMessage('')
                      setMessageStatus('Message sent.')
                    }}
                  >
                    <label htmlFor="voice-keyboard-message" className="sr-only">Message CIA</label>
                    <input
                      id="voice-keyboard-message"
                      className="h-10 min-w-0 flex-1 bg-transparent px-2 text-[16px] text-paper-100 outline-none placeholder:text-paper-100/60"
                      placeholder="Type to CIA"
                      value={keyboardMessage}
                      onChange={event => setKeyboardMessage(event.target.value)}
                      autoFocus
                    />
                    <button type="submit" className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brand-orange" aria-label="Send typed message">
                      <Send size={18} strokeWidth={2} />
                    </button>
                  </form>
                : <div
                    className="flex h-10 items-center justify-center gap-[3px]"
                    role="img"
                    aria-label={capturing ? 'Voice preview activity, your channel in orange and CIA in purple; no microphone is connected' : 'Voice preview activity, idle; no microphone is connected'}
                  >
                    {userBars.map((barHeight, index) => (
                      <span key={`you-${index}`} className="w-[3px] rounded-pill bg-brand-orange" style={{ height: barHeight, opacity: capturing ? 0.5 + (barHeight / 22) * 0.5 : 0.35 }} />
                    ))}
                    <span className="mx-2 h-full w-px bg-white/10" />
                    {ciaBars.map((barHeight, index) => (
                      <span key={`cia-${index}`} className="w-[3px] rounded-pill border border-dashed border-royal-purple/70" style={{ height: barHeight, opacity: 0.35 }} />
                    ))}
                  </div>}

              <div className="mt-6 flex items-center justify-between">
                <IconButton
                  label={keyboardMode ? 'Hide keyboard input' : 'Switch to keyboard'}
                  aria-pressed={keyboardMode}
                  onClick={toggleKeyboardMode}
                  className={keyboardMode ? 'text-brand-orange' : undefined}
                >
                  <Keyboard size={19} strokeWidth={1.8} />
                </IconButton>

                <button
                  type="button"
                  className={`focus-ring relative flex h-16 w-16 items-center justify-center rounded-full border transition-[border-color,background-color] ${capturing ? 'border-brand-orange/50 bg-brand-orange/15 shadow-[var(--glow-orange-sm)]' : 'border-white/10 bg-white/[0.06]'}`}
                  aria-label={capturing ? 'Pause voice preview' : 'Start voice preview'}
                  aria-describedby="voice-retention-disclosure"
                  aria-pressed={capturing}
                  onClick={() => {
                    setKeyboardMode(false)
                    setMessageStatus('')
                    setCapturing(current => !current)
                  }}
                >
                  <span className={`absolute inset-2 rounded-full ${capturing ? 'bg-brand-orange/20' : 'bg-white/[0.03]'}`} />
                  <Mic size={22} className="relative text-brand-orange" strokeWidth={2} />
                </button>

                <IconButton
                  label={muted ? 'Unmute CIA voice' : 'Mute CIA voice'}
                  aria-pressed={muted}
                  onClick={() => { setMessageStatus(''); setMuted(current => !current) }}
                  className={muted ? 'text-brand-orange' : undefined}
                >
                  {muted ? <Volume2 size={19} strokeWidth={1.8} /> : <VolumeX size={19} strokeWidth={1.8} />}
                </IconButton>
              </div>
              <p className="sr-only" role="status">
                {messageStatus || (capturing ? 'Voice preview active. No microphone is connected.' : keyboardMode ? 'Keyboard input open.' : muted ? 'CIA voice muted.' : 'Voice preview idle. No microphone is connected.')}
              </p>
            </div>
      }
    >
      <h1 className="sr-only">CIA voice, full screen</h1>
      <main className="flex h-full flex-col items-center px-6 pb-4 pt-8">
        {closed
          ? <div className="flex h-full flex-col items-center justify-center text-center">
              <CIAPresenceOrb size={96} state="idle" />
              <p className="mt-6 text-[20px] font-semibold text-paper-100" role="status">Voice mode closed.</p>
              <p className="mt-2 max-w-[260px] text-[13px] leading-5 text-paper-100/70">The local voice preview is off. This prototype never opened a microphone.</p>
              <BtnSecondary className="mt-6" onClick={() => setClosed(false)}>Resume voice mode</BtnSecondary>
            </div>
          : <>
              <div className="flex h-[200px] w-[200px] items-center justify-center">
                <CIAPresenceOrb size={200} state={capturing ? 'listening' : 'idle'} />
              </div>

              <div className="mt-8 w-full max-w-[280px]">
                <GlassCard tone="cia">
                  <p className="text-center text-[16px] leading-6 text-paper-100">
                    Hey. I&rsquo;m here. You can talk to me about anything, or just think out loud.
                  </p>
                </GlassCard>
              </div>

              {supportOpen && (
                <section id="voice-support-panel" className="mt-4 w-full max-w-[300px] rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left" aria-live="polite">
                  <h2 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-paper-100/75">Support</h2>
                  <p className="mt-1 text-[12px] leading-4 text-paper-100/70">
                    If you may be in immediate danger, contact local emergency services. You can pause this local voice preview and keep support open.
                  </p>
                </section>
              )}

              <p className="mt-5 max-w-[260px] text-center text-[12px] leading-4 text-paper-100/70">
                A distraction-free <span className="text-emphasis">screen</span> for presence, one voice at a time.
              </p>

              <p id="voice-retention-disclosure" className="mt-auto max-w-[280px] pt-6 text-center text-[11px] leading-4 text-paper-100/70">
                Visual prototype: this control changes a local state preview only and never opens a microphone. In the connected product, voice becomes text in CIA chat history until you delete it.
              </p>
            </>}
      </main>
    </HifiShell>
  )
}
