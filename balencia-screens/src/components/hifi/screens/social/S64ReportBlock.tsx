import { ToggleRight, Circle, ChevronUp } from 'lucide-react'
import { HifiShell, GlassCard, GlassPillInput, BtnPrimary, ChatBubble, Chip, Provenance, SectionTitle } from '@/components/hifi/kit'

export function S64ReportBlock() {
  return (
    <HifiShell atmosphere="cia" showTabBar={false}>
      <div className="relative h-[844px] w-[390px] overflow-hidden bg-ink-900">
        
        {/* Dimmed Background Chat Context */}
        <div className="absolute inset-0 z-0 px-4 pt-16 opacity-40 blur-[2px]">
          <div className="space-y-3">
            <ChatBubble speaker="Aisha Khan" tone="muted">
              Here is the recipe I promised for the half marathon training fuel.
            </ChatBubble>
            <ChatBubble speaker="Deleted user" tone="cia">
              <div className="mb-2 h-24 w-full rounded-lg bg-white/[0.06]" />
              You call this nutrition? pathetic effort.
            </ChatBubble>
            <ChatBubble speaker="Amira" tone="you">
              Thanks Aisha, saving this for tomorrow!
            </ChatBubble>
            <div className="flex justify-center pt-2">
              <div className="rounded-full bg-white/[0.04] p-2">
                <ChevronUp className="h-4 w-4 text-white/40" />
              </div>
            </div>
          </div>
        </div>

        {/* Dimming Scrim */}
        <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-md" />

        {/* Report & Block Sheet */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex max-h-[90%] flex-col rounded-t-[28px] border-t border-white/10 bg-ink-900/95 shadow-[var(--glow-orange-sm)]">
          
          {/* Grabber */}
          <div className="flex justify-center pt-3">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 pb-4 pt-3">
            <button type="button" className="min-h-[44px] -ml-2 flex-1 text-left">
              <span className="font-ui text-sm text-white/60 hover:text-white/80">Cancel</span>
            </button>
            <h3 className="text-center font-ui text-base font-semibold text-white">Report</h3>
            <div className="min-h-[44px] flex-1" />
          </div>

          {/* Scrollable Content */}
          <main className="hide-scrollbar flex-1 space-y-5 overflow-y-auto px-5 py-5">
            
            {/* Entity Context */}
            <GlassCard tone="muted">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06]">
                  <span className="text-xs text-white/50">DU</span>
                </div>
                <div className="flex-1">
                  <p className="font-ui text-sm text-white/90">Deleted user</p>
                  <p className="mt-1 text-xs text-white/50">May have deleted account.</p>
                  <div className="mt-3">
                    <Provenance items={['Source: Community chat', 'Scope: Single message']} />
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Reason List */}
            <section className="space-y-2">
              <SectionTitle title="Why are you reporting this?" />
              
              <div className="rounded-2xl border border-white/10 bg-white/[0.04]">
                <button type="button" role="radio" aria-checked="true" className="flex min-h-[44px] w-full items-center justify-between border-b border-white/10 px-4 py-3 text-left">
                  <span className="text-sm text-white">Spam</span>
                  <Circle className="h-5 w-5 fill-brand-orange text-brand-orange" />
                </button>
                
                <button type="button" role="radio" aria-checked="false" className="flex min-h-[44px] w-full items-center justify-between border-b border-white/10 px-4 py-3 text-left">
                  <span className="text-sm text-white/80">Harassment</span>
                  <Circle className="h-5 w-5 text-white/30" />
                </button>
                
                <button type="button" role="radio" aria-checked="false" className="flex min-h-[44px] w-full items-center justify-between border-b border-white/10 px-4 py-3 text-left">
                  <span className="text-sm text-white/80">Inappropriate content</span>
                  <Circle className="h-5 w-5 text-white/30" />
                </button>
                
                <button type="button" role="radio" aria-checked="false" className="flex min-h-[44px] w-full items-center justify-between border-b border-white/10 px-4 py-3 text-left">
                  <span className="text-sm text-white/80">Misinformation</span>
                  <Circle className="h-5 w-5 text-white/30" />
                </button>
                
                <button type="button" role="radio" aria-checked="false" className="flex min-h-[44px] w-full items-center justify-between border-b border-white/10 px-4 py-3 text-left">
                  <span className="text-sm text-white/80">Impersonation</span>
                  <Circle className="h-5 w-5 text-white/30" />
                </button>
                
                <button type="button" role="radio" aria-checked="false" className="flex min-h-[44px] w-full items-center justify-between px-4 py-3 text-left">
                  <span className="text-sm text-white/80">Other</span>
                  <Circle className="h-5 w-5 text-white/30" />
                </button>
              </div>
            </section>

            {/* Description Input */}
            <section>
              <GlassPillInput 
                placeholder="Tell us more (optional)" 
                value=""
                focused={false}
              />
              <div className="mt-2 flex justify-end">
                <span className="font-mono text-xs tabular-nums text-white/40">0/500</span>
              </div>
            </section>

            {/* Safety Action Row: Block Toggle */}
            <section>
              <GlassCard tone="you">
                <div className="flex items-start gap-3 py-1">
                  <div className="flex-1">
                    <p className="font-ui text-sm font-semibold text-white">
                      Also <span className="text-emphasis">block</span> this user
                    </p>
                    <p className="mt-1 text-xs text-white/50">You won&apos;t see their messages or interactions.</p>
                  </div>
                  <div className="pt-1">
                    <ToggleRight className="h-8 w-8 text-brand-orange" />
                  </div>
                </div>
              </GlassCard>
            </section>

            {/* Safety & Consent Footer */}
            <section className="pb-2 pt-1">
              <div className="flex flex-wrap gap-2">
                <Chip tone="muted">Retention: 30 days</Chip>
                <Chip tone="muted">Export</Chip>
                <Chip tone="muted">Revoke</Chip>
                <Chip tone="muted">Delete</Chip>
              </div>
              <p className="mt-3 text-xs text-white/40">Reports are reviewed carefully. Our team evaluates context without shame or judgment.</p>
            </section>

          </main>

          {/* Submit CTA */}
          <div className="border-t border-white/10 px-5 py-4">
            <BtnPrimary>Submit report</BtnPrimary>
          </div>

        </div>
      </div>
    </HifiShell>
  )
}