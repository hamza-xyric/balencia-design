import { Briefcase, HeartPulse, LifeBuoy, Moon, ShieldCheck, Sparkles } from 'lucide-react'
import { ChatBubble, Chip, CIAPresenceOrb, HifiShell, StepperRail, VoiceComposer } from '@/components/hifi/kit'

// First CIA onboarding conversation. No history exists yet — CIA introduces
// the whole-life read as a vision, not a finding, and the first baseline
// question stays a genuine open prompt (canon's "it gets me, not it knows me"
// pre-data boundary).
export function S07CiaOnboarding() {
  return (
    <HifiShell showTabBar={false} atmosphere="cia" composer={<VoiceComposer />}>
      <main className="space-y-4 px-4 pb-4 pt-4">
        <h1 className="sr-only">CIA onboarding conversation</h1>
        <div className="relative flex h-44 items-center justify-center">
          <span className="absolute left-3 top-1 inline-flex items-center gap-1.5 rounded-pill border border-domain-fitness/25 bg-domain-fitness/15 px-3 py-1.5 text-[11px] font-semibold text-domain-fitness">
            <HeartPulse className="h-3 w-3" strokeWidth={2} />
            Fitness
          </span>
          <span className="absolute right-3 top-4 inline-flex items-center gap-1.5 rounded-pill border border-domain-career/25 bg-domain-career/15 px-3 py-1.5 text-[11px] font-semibold text-domain-career">
            <Briefcase className="h-3 w-3" strokeWidth={2} />
            Career
          </span>
          <span className="absolute bottom-2 left-8 inline-flex items-center gap-1.5 rounded-pill border border-domain-wellbeing/25 bg-domain-wellbeing/15 px-3 py-1.5 text-[11px] font-semibold text-domain-wellbeing">
            <Sparkles className="h-3 w-3" strokeWidth={2} />
            Wellbeing
          </span>
          <span className="absolute bottom-1 right-8 inline-flex items-center gap-1.5 rounded-pill border border-domain-sleep/25 bg-domain-sleep/15 px-3 py-1.5 text-[11px] font-semibold text-domain-sleep">
            <Moon className="h-3 w-3" strokeWidth={2} />
            Sleep
          </span>
          <CIAPresenceOrb size={104} state="listening" />
        </div>

        <StepperRail steps={['Mission', 'Mode', 'Assessment', 'Plan', 'Prefs']} current={0} />

        <div className="space-y-3 pt-1">
          <ChatBubble speaker="CIA" tone="cia">
            <p>
              Hey Amira. I&apos;m CIA, your coach. I can help you see your{' '}
              <span className="text-emphasis">whole</span> life as one connected system.
            </p>
          </ChatBubble>

          <ChatBubble speaker="You">I want steadier energy.</ChatBubble>

          <ChatBubble speaker="CIA" tone="cia">
            <p>Which areas deserve attention?</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Chip interactive>Fitness</Chip>
              <Chip interactive>Nutrition</Chip>
              <Chip interactive>Finance</Chip>
              <Chip interactive>Relationships</Chip>
              <Chip interactive>Skip health data</Chip>
            </div>
            <p className="mt-2 text-[11px] leading-4 text-white/45">No focus areas chosen yet</p>
          </ChatBubble>

          <div className="flex items-center gap-2 pt-1">
            <span className="flex h-11 min-h-11 flex-1 items-center justify-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] text-[13px] text-white/65">
              <ShieldCheck className="h-4 w-4 text-white/45" strokeWidth={1.9} />
              Privacy controls
            </span>
            <span className="flex h-11 min-h-11 flex-1 items-center justify-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] text-[13px] text-white/65">
              <LifeBuoy className="h-4 w-4 text-white/45" strokeWidth={1.9} />
              Crisis support
            </span>
          </div>
        </div>
      </main>
    </HifiShell>
  )
}
