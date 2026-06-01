import { LegalPolicyPage } from '../_components/LegalPolicyPage'

const sections = [
  {
    title: 'Progressive disclosure',
    body: 'Balencia asks for personal details only when there is a clear feature reason. Date of birth and gender are not required for basic account creation.',
  },
  {
    title: 'Consent before sensitive use',
    body: 'Health, social, voice, and partner visibility features require explicit consent before SIA can use that context.',
  },
  {
    title: 'Control paths',
    body: 'Users should be able to review, change, delete, or disable sensitive inputs from the relevant settings and feature screens.',
  },
  {
    title: 'Prototype scope',
    body: 'This prototype uses demo data and does not perform live account, payment, health, or social integrations.',
  },
]

export default function PrivacyPage() {
  return (
    <LegalPolicyPage
      title="Privacy policy"
      eyebrow="Privacy"
      intro="Balencia is private-first: sensitive data needs visible purpose, explicit consent, and a clear control path."
      sections={sections}
    />
  )
}
