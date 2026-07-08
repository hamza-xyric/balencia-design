import { Calendar, Camera, Check, ChevronRight, Copy, Globe, Info, Mail, Phone, Trash2, User } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  Chip,
  GlassCard,
  GlassPillInput,
  HifiShell,
  IconButton,
  ProgressBar,
  SectionTitle,
  TopBar,
} from '@/components/hifi/kit'
import { persona } from '@/data/hifi/persona'

function DemographicRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar
  label: string
  value: string
}) {
  return (
    <button
      type="button"
      aria-label={`Change ${label.toLowerCase()}, currently ${value}`}
      className="flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
    >
      <span className="flex items-center gap-3">
        <Icon className="h-4 w-4 shrink-0 text-white/45" strokeWidth={1.8} />
        <span className="text-[14px] font-medium text-white/85">{label}</span>
      </span>
      <span className="flex items-center gap-2">
        <span className="text-[13px] font-medium tabular-nums text-white/60">{value}</span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white/30" strokeWidth={1.8} />
      </span>
    </button>
  )
}

// Profile Edit — pushed from Me Main's avatar tap. Chosen state: default,
// "Partial" per source correction — name and verified email already exist
// from sign-up, avatar and about-you sit honest-null (2 of 8 signals),
// giving the literal "6 of 8 complete" the source composition specifies.
// Save stays disabled until a dirty change lands. ConsentCard-before-picker
// (first "change photo" tap), the DOB/Gender/Timezone Sheets, validation,
// offline, and success states are documented in the source spec — static
// prototype, no handlers.
export function S50ProfileEdit() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Edit profile"
          right={<IconButton label="Profile completeness details"><Info className="h-5 w-5" strokeWidth={1.9} /></IconButton>}
        />
      }
      activeTab="me"
      showTabBar
      atmosphere="you"
      bottomAction={
        <div className="space-y-2 px-4 pb-5 pt-3">
          <BtnPrimary disabled>Save changes</BtnPrimary>
          <p className="text-center text-[12px] leading-4 text-white/45">Save disabled, 2 fields left to complete</p>
        </div>
      }
    >
      <main className="space-y-6 px-4 pb-4 pt-3">
        {/* Avatar — honest-null, 1 of 2 incomplete signals */}
        <div className="flex flex-col items-center gap-2.5 pt-1">
          <button
            type="button"
            aria-label="Profile photo, double tap to change. No photo added yet."
            className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/[0.04]"
          >
            <span className="absolute bottom-0 right-0 flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink-900 bg-white/10">
              <Camera className="h-5 w-5 text-white/85" strokeWidth={1.9} />
            </span>
          </button>
          <p className="text-[13px] font-medium text-white/55">Tap to add photo</p>
        </div>

        {/* Profile completeness — dominant focal moment */}
        <GlassCard tone="cia" className="quiet-pulse">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">Profile</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[30px] font-semibold leading-none tabular-nums text-white">6 of 8</span>
            <span className="text-[14px] font-medium text-white/55">Complete</span>
          </div>
          <div className="mt-4">
            <ProgressBar value={75} tone="you" />
            <p className="mt-2 text-[12px] font-medium text-white/50">2 fields left to complete</p>
          </div>
          <p className="mt-4 border-t border-white/[0.07] pt-3 text-[13px] leading-5 text-white/65">
            Complete your profile so CIA can <span className="text-emphasis">personalise</span> your coaching.
          </p>
        </GlassCard>

        {/* Identity */}
        <section className="space-y-3">
          <SectionTitle title="Identity" />
          <GlassPillInput placeholder="First name" value={persona.firstName} />
          <GlassPillInput placeholder="Last name" value={persona.lastName} />
          <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-3">
            <p className="text-[15px] leading-5 text-white/40">Tell CIA what matters right now</p>
            <div className="mt-3 flex justify-end">
              <span className="text-[11px] font-medium tabular-nums text-white/45">0 / 160</span>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="space-y-3">
          <SectionTitle title="Contact" />
          <div className="flex min-h-11 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4">
            <span className="flex min-w-0 items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-white/40" strokeWidth={1.8} />
              <span className="truncate text-[14px] font-medium text-white/75">Signed in as {persona.email}</span>
            </span>
            <span className="flex shrink-0 items-center gap-2">
              <Chip tone="done">
                <span className="flex items-center gap-1"><Check className="h-3 w-3" strokeWidth={2.2} /> Verified</span>
              </Chip>
              <IconButton label="Copy email address">
                <Copy className="h-4 w-4" strokeWidth={1.8} />
              </IconButton>
            </span>
          </div>
          <GlassPillInput icon={<Phone className="h-4 w-4" strokeWidth={1.8} />} placeholder="Phone number" value={persona.phone} />
        </section>

        {/* Demographics */}
        <section className="space-y-2.5">
          <SectionTitle title="Demographics" />
          <DemographicRow icon={Calendar} label="Date of birth" value={persona.dateOfBirth} />
          <DemographicRow icon={User} label="Gender" value="Prefer not to say" />
          <DemographicRow icon={Globe} label="Timezone" value={persona.timezone} />
        </section>

        <div className="pt-1">
          <BtnGhost quiet className="mx-auto w-fit gap-2 text-error-red">
            <Trash2 className="h-4 w-4" strokeWidth={1.8} />
            Delete account
          </BtnGhost>
        </div>
      </main>
    </HifiShell>
  )
}
