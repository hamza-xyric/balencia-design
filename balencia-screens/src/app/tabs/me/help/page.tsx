import Link from 'next/link'
import { ArrowRight, LifeBuoy } from 'lucide-react'
import { SearchBar } from '@/components/design-system/SearchBar'
import { Eyebrow } from '@/components/design-system/Eyebrow'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SettingsGroup, SettingsRow } from '@/components/screens/SettingsRow'

// Screen 25 of 78: Help center
// Spec: /Users/hamza/yHealth/app_design 3/25-help-center.md

const faqCategories = [
  'Getting started',
  'SIA & AI coach',
  'Missions & tracking',
  'Billing & subscription',
  'Privacy & data',
  'Troubleshooting',
]

function AskSiaCard() {
  return (
    <section className="rounded-xl border border-white/[0.06] bg-ink-brown-800 p-6 shadow-1 animate-fade-up">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-royal-purple" aria-hidden="true" />
        <h1 className="text-[18px] font-semibold leading-6 text-white">Ask SIA</h1>
      </div>
      <p className="mt-3 text-[14px] leading-5 text-white/60">
        Get instant answers from your AI coach. SIA knows Balencia inside and out.
      </p>
      <Link
        href="/tabs/sia"
        className="mt-5 inline-flex h-9 items-center justify-center gap-2 rounded-pill bg-brand-orange px-4 text-[14px] font-semibold leading-[18px] text-white"
      >
        Ask SIA
        <ArrowRight size={14} strokeWidth={2} />
      </Link>
    </section>
  )
}

function ContactSupportCard() {
  return (
    <section className="rounded-xl border border-white/[0.06] bg-ink-brown-800 p-6 shadow-1 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-white/60">
          <LifeBuoy size={18} strokeWidth={1.8} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[16px] font-semibold leading-[22px] text-white">Still need help?</h2>
          <p className="mt-2 text-[14px] leading-5 text-white/50">
            Reach out to our support team and we will get back to you within 24 hours.
          </p>
        </div>
      </div>
      <button className="mt-5 h-9 w-full rounded-pill border border-white/10 text-[14px] font-semibold leading-[18px] text-white">
        Contact support
      </button>
    </section>
  )
}

export default function HelpCenterScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Help center" showBack />} activeTab="me">
        <main className="px-4 pb-16 pt-2">
          <div className="animate-fade-up">
            <SearchBar placeholder="Search help topics" className="h-[52px] rounded-md shadow-none" />
          </div>

          <div className="mt-6">
            <AskSiaCard />
          </div>

          <section className="mt-8 animate-fade-up" style={{ animationDelay: '160ms' }}>
            <Eyebrow className="mb-3 px-1 text-white/50">FAQ</Eyebrow>
            <SettingsGroup>
              {faqCategories.map((category) => (
                <SettingsRow key={category} label={category} />
              ))}
            </SettingsGroup>
          </section>

          <div className="mt-8">
            <ContactSupportCard />
          </div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
