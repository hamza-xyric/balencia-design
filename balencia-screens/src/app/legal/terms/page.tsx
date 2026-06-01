import { LegalPolicyPage } from '../_components/LegalPolicyPage'

const sections = [
  {
    title: 'Use Balencia with care',
    body: 'Balencia helps you organize missions, routines, and coaching context. It does not replace professional medical, financial, legal, or emergency advice.',
  },
  {
    title: 'Your account',
    body: 'Keep your sign-in details secure and use information that belongs to you. You can stop using the prototype at any time.',
  },
  {
    title: 'Coaching boundaries',
    body: 'SIA suggestions are guidance, not commands. You stay in control of what you accept, dismiss, save, or share.',
  },
  {
    title: 'Changes and support',
    body: 'These prototype terms summarize the experience for review. Production terms should be reviewed before a public launch.',
  },
]

export default function TermsPage() {
  return (
    <LegalPolicyPage
      title="Terms of service"
      eyebrow="Legal"
      intro="A clear pause before onboarding: what Balencia can help with, where it has limits, and how account access works."
      sections={sections}
    />
  )
}
