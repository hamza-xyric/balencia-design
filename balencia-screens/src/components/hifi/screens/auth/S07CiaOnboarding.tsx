'use client'

import { useState } from 'react'
import { Briefcase, HeartPulse, LifeBuoy, Moon, ShieldCheck, Sparkles } from 'lucide-react'
import { ChatBubble, Chip, CIAPresenceOrb, HifiShell, StepperRail, VoiceComposer } from '@/components/hifi/kit'

function OnboardingComposer({
  onVoiceChange,
  onSend,
}: {
  onVoiceChange: (listening: boolean) => void
  onSend: (message: string) => void
}) {
  return (
    <div className="space-y-2">
      <p id="onboarding-voice-disclosure" className="px-2 text-[11px] leading-4 text-paper-100/70">
        Before voice starts: your recording becomes a transcript in CIA chat history and stays there until you delete it.
      </p>
      <VoiceComposer
        ariaLabel="CIA onboarding message composer"
        inputLabel="Message CIA"
        placeholder="Type a message"
        voiceDescribedBy="onboarding-voice-disclosure"
        onVoiceChange={onVoiceChange}
        onSend={onSend}
      />
    </div>
  )
}

// First CIA onboarding conversation. No history exists yet — CIA introduces
// the whole-life read as a vision, not a finding, and the first baseline
// question stays a genuine open prompt (canon's "it gets me, not it knows me"
// pre-data boundary).
export function S07CiaOnboarding() {
  const [listening, setListening] = useState(false)
  const [openPanel, setOpenPanel] = useState<'privacy' | 'crisis' | null>(null)
  const [lastMessage, setLastMessage] = useState('I want steadier energy.')
  const [focusAreas, setFocusAreas] = useState<string[]>([])
  const [skipHealthData, setSkipHealthData] = useState(false)

  const toggleFocusArea = (area: string) => {
    if (area === 'Fitness' || area === 'Nutrition') setSkipHealthData(false)
    setFocusAreas(current => current.includes(area) ? current.filter(item => item !== area) : [...current, area])
  }

  const toggleHealthData = () => {
    setSkipHealthData(current => {
      const next = !current
      if (next) setFocusAreas(areas => areas.filter(area => area !== 'Fitness' && area !== 'Nutrition'))
      return next
    })
  }

  const focusStatus = skipHealthData
    ? 'Health data will be skipped.'
    : focusAreas.length > 0
      ? `Focus areas selected: ${focusAreas.join(', ')}.`
      : 'No focus areas chosen yet.'

  const togglePanel = (panel: 'privacy' | 'crisis') => {
    setOpenPanel(current => current === panel ? null : panel)
  }

  return (
    <HifiShell
      showTabBar={false}
      atmosphere="cia"
      composer={<OnboardingComposer onVoiceChange={setListening} onSend={setLastMessage} />}
    >
      <main className="space-y-3 px-4 pb-0 pt-3">
        <h1 className="sr-only">CIA onboarding conversation</h1>
        <div className="relative flex h-24 items-center justify-center">
          <span data-domain-microtext className="absolute left-3 top-1 inline-flex items-center gap-1.5 rounded-pill border border-domain-fitness/25 bg-domain-fitness/15 px-3 py-1.5 text-[11px] font-semibold text-paper-100">
            <HeartPulse className="h-3 w-3 text-domain-fitness" strokeWidth={2} />
            Fitness
          </span>
          <span data-domain-microtext className="absolute right-3 top-4 inline-flex items-center gap-1.5 rounded-pill border border-domain-career/25 bg-domain-career/15 px-3 py-1.5 text-[11px] font-semibold text-paper-100">
            <Briefcase className="h-3 w-3 text-domain-career" strokeWidth={2} />
            Career
          </span>
          <span data-domain-microtext className="absolute bottom-2 left-8 inline-flex items-center gap-1.5 rounded-pill border border-domain-wellbeing/25 bg-domain-wellbeing/15 px-3 py-1.5 text-[11px] font-semibold text-paper-100">
            <Sparkles className="h-3 w-3 text-domain-wellbeing" strokeWidth={2} />
            Wellbeing
          </span>
          <span data-domain-microtext className="absolute bottom-1 right-8 inline-flex items-center gap-1.5 rounded-pill border border-domain-sleep/25 bg-domain-sleep/15 px-3 py-1.5 text-[11px] font-semibold text-paper-100">
            <Moon className="h-3 w-3 text-domain-sleep" strokeWidth={2} />
            Sleep
          </span>
          <CIAPresenceOrb size={80} state={listening ? 'listening' : 'idle'} />
        </div>

        <StepperRail steps={['Mission', 'Mode', 'Assessment', 'Plan', 'Prefs']} current={0} />

        <div className="space-y-3 pt-1">
          <ChatBubble speaker="CIA" tone="cia">
            <p>
              Hey Amira. I&apos;m CIA, your coach. I can help you see your{' '}
              <span className="text-emphasis">whole</span> life as one connected system.
            </p>
          </ChatBubble>

          <ChatBubble speaker="You">{lastMessage}</ChatBubble>

          <ChatBubble speaker="CIA" tone="cia">
            <p>Which areas deserve attention?</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['Fitness', 'Nutrition', 'Finance', 'Relationships'].map(area => (
                <Chip
                  key={area}
                  interactive
                  pressed={focusAreas.includes(area)}
                  onClick={() => toggleFocusArea(area)}
                >
                  {area}
                </Chip>
              ))}
              <Chip interactive pressed={skipHealthData} onClick={toggleHealthData}>Skip health data</Chip>
            </div>
            <p className="mt-2 text-[11px] leading-4 text-paper-100/65" role="status" aria-live="polite">{focusStatus}</p>
          </ChatBubble>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              className="focus-ring flex h-11 min-h-11 flex-1 items-center justify-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] text-[13px] text-paper-100/70"
              aria-expanded={openPanel === 'privacy'}
              aria-controls="onboarding-safety-detail"
              onClick={() => togglePanel('privacy')}
            >
              <ShieldCheck className="h-4 w-4 text-paper-100/65" strokeWidth={1.9} />
              Privacy controls
            </button>
            <button
              type="button"
              className="focus-ring flex h-11 min-h-11 flex-1 items-center justify-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] text-[13px] text-paper-100/70"
              aria-expanded={openPanel === 'crisis'}
              aria-controls="onboarding-safety-detail"
              onClick={() => togglePanel('crisis')}
            >
              <LifeBuoy className="h-4 w-4 text-paper-100/65" strokeWidth={1.9} />
              Crisis support
            </button>
          </div>

          {openPanel && (
            <section id="onboarding-safety-detail" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3" aria-live="polite">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-paper-100/75">
                {openPanel === 'privacy' ? 'Voice privacy' : 'Crisis support'}
              </h2>
              <p className="mt-1 text-[12px] leading-4 text-paper-100/70">
                {openPanel === 'privacy'
                  ? 'Voice transcripts stay in CIA chat history until you delete them. Text-only onboarding remains available.'
                  : 'If you may be in immediate danger, contact local emergency services. You can open support without starting voice.'}
              </p>
            </section>
          )}
        </div>
      </main>
    </HifiShell>
  )
}
