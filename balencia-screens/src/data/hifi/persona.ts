// Canonical recurring persona facts for the hi-fi prototype. Cross-screen
// coherence is the product's core claim ("connects") — every screen that
// mentions these facts must read them from here, never restate them inline.
export const persona = {
  firstName: 'Amira',
  level: 12,
  lifePower: 487,
  domainAverage: 78,
  domainsReporting: '8/9',
  vitals: {
    heartRate: { value: '72 bpm', provenance: 'via WHOOP' },
    steps: { value: '8.2k steps', provenance: 'you logged' },
    sleep: { value: '7.5h sleep', provenance: 'via Health' },
  },
  pinnedMissions: [
    { name: 'Run a half marathon', progress: 68, domain: 'Fitness' },
    { name: 'Save $5,000 by December', progress: 42, domain: 'Finance' },
  ],
  buddy: {
    name: 'Aisha Khan',
    initials: 'AK',
    sharedMission: { name: 'Run 30 min', progress: 62 },
  },
} as const
