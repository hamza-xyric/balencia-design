import { ArrowLeftRight, Camera, Clock, ImagePlus, Sparkles, Trash2 } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  Chip,
  CIAInsightCard,
  GlassCard,
  HifiShell,
  IconButton,
  SectionTitle,
  StepperRail,
  TopBar,
} from '@/components/hifi/kit'

// Virtual try-on, default state: consent accepted, preview stage visible with
// a mid-flight safety scan (step 2 of 4), generate paused with an honest
// reason. Skeleton (matching-dimension shimmer on both preview panes),
// empty (upload/camera choice, no CIA claim), and error (failed step named,
// photo kept if safe) are documented in the source spec and not rendered in
// parallel here, per catalog.

export function S86VirtualTryon() {
  return (
    <HifiShell
      header={
        <TopBar
          title={
            <>
              <span className="text-emphasis">Virtual</span> try-on
            </>
          }
          right={
            <IconButton label="View try-on history">
              <Clock size={18} strokeWidth={1.9} />
            </IconButton>
          }
        />
      }
      atmosphere="you"
      showTabBar={false}
    >
      <main className="space-y-4 px-4 pb-6 pt-3">
        <div>
          <SectionTitle title="Photo consent" />
          <GlassCard tone="you" className="mt-2">
            <h2 className="text-[17px] font-semibold leading-6 text-white">Photo use: preview only</h2>
            <p className="mt-2 text-[13px] leading-5 text-white/65">
              Retention: 30 days unless you save a look. Your photo is used only to render this look. Not used for model training. Delete anytime.
            </p>
            <div className="mt-4 flex gap-2">
              <BtnSecondary className="flex-1">Revoke access</BtnSecondary>
              <BtnGhost quiet>Delete all</BtnGhost>
            </div>
          </GlassCard>
        </div>

        <div>
          <SectionTitle title="Try-on preview" meta="Step 2 of 4" />
          <GlassCard tone="you" className="mt-2">
            <div className="flex items-stretch gap-3">
              <div className="flex-1 space-y-2">
                <div
                  className="flex aspect-[3/4] flex-col items-center justify-center rounded-xl border-[1.5px] border-white/[0.12] bg-ink-brown-800"
                  role="img"
                  aria-label="Source photo placeholder, no identifiable face rendered"
                >
                  <ImagePlus size={26} strokeWidth={1.6} className="mb-2 text-white/30" aria-hidden="true" />
                  <span className="px-2 text-center text-[9px] uppercase tracking-widest text-white/35">HIFI-86-01</span>
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-medium text-white/70">Source photo</p>
                  <div className="mt-1.5 flex justify-center">
                    <Chip>Via upload</Chip>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div
                  className="flex aspect-[3/4] flex-col items-center justify-center rounded-xl border-[1.5px] border-royal-purple/20 bg-royal-purple/10 shadow-[var(--glow-purple-sm)]"
                  role="img"
                  aria-label="Generated look placeholder, no identifiable face rendered"
                >
                  <Sparkles size={26} strokeWidth={1.6} className="mb-2 text-royal-purple/50" aria-hidden="true" />
                  <span className="px-2 text-center text-[9px] uppercase tracking-widest text-royal-purple/50">Pending render</span>
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-medium text-white/70">Generated look</p>
                  <div className="mt-1.5 flex justify-center">
                    <Chip tone="cia">AI render</Chip>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex h-11 items-center justify-center gap-3 rounded-pill border border-white/10 bg-white/[0.04] px-3">
              <span className="text-[12px] text-white/50">Before</span>
              <div className="relative h-1 flex-1 rounded-pill bg-white/10" aria-hidden="true">
                <div className="absolute left-0 top-0 h-full w-1/2 rounded-pill bg-brand-orange" />
                <div className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink-900 bg-brand-orange shadow-[var(--glow-orange-sm)]">
                  <ArrowLeftRight size={12} strokeWidth={2} className="text-white" aria-hidden="true" />
                </div>
              </div>
              <span className="text-[12px] text-white/50">After</span>
            </div>
            <p className="mt-2 text-center text-[11px] text-white/40">Split view: source left, generated right.</p>
          </GlassCard>
        </div>

        <div>
          <SectionTitle title="Generation progress" />
          <div className="mt-2">
            <StepperRail steps={['Upload', 'Safety scan', 'Render', 'Review']} current={1} />
          </div>
          <p className="mt-2 px-1 text-[11px] text-white/55">Safety scan is unclear. Resolve it to continue toward render.</p>
        </div>

        <CIAInsightCard provenance={['Profile preference', 'Manual prompt']}>
          Your saved color notes suggest warm tones this season. Rendering resumes once consent and the safety scan clear.
        </CIAInsightCard>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <BtnSecondary>
              <Camera size={16} strokeWidth={1.9} aria-hidden="true" />
              Use camera
            </BtnSecondary>
            <BtnSecondary>
              <ImagePlus size={16} strokeWidth={1.9} aria-hidden="true" />
              Choose photo
            </BtnSecondary>
          </div>
          <BtnPrimary disabled>
            <Sparkles size={16} strokeWidth={1.9} className="mr-2" aria-hidden="true" />
            Generate preview
          </BtnPrimary>
          <p className="-mt-1 text-center text-[11px] text-white/55">Needs photo consent and a clear safety scan.</p>
        </div>

        <div className="flex justify-center pt-1">
          <button type="button" className="flex min-h-11 items-center gap-2 px-4 text-[13px] text-white/45">
            <Trash2 size={14} strokeWidth={1.9} aria-hidden="true" />
            Delete source photo
          </button>
        </div>
      </main>
    </HifiShell>
  )
}
