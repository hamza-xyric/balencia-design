export const meta = {
  name: 'glass-craft-gate',
  description: 'Craft drafts into final hi-fi glass specs (sonnet) and gate them (haiku, 14-point rubric)',
  phases: [
    { title: 'Craft', detail: 'sonnet elevates draft to premium bar' },
    { title: 'Gate', detail: '14-point DoD verdict with justified-N/A rule' },
  ],
}

const NS = '/Users/hamza/Desktop/balencia-design/Balencia-New-Screens'

const CRAFT_PROMPT = (s, defects) => `You are the craft editor for Balencia's glass redesign (premium bar: funded product, not template).
${defects ? 'A gate audit found these defects: ' + JSON.stringify(defects) + '. Fix them all in place; keep everything else intact.' : 'A cheap model produced a scaffolding draft. It is NOT trusted.'}
Read EXACTLY these three files and NOTHING else (do not explore the repository, do not read any other file):
1. ${NS}/canon/COMPACT-CANON.md
2. ${NS}/canon/COMPONENT-CATALOG.md
3. ${defects ? NS + '/screens/' + s.out + '.md' : NS + '/work/drafts/' + s.id + '.md'}
Then ${defects ? 'repair the spec in place at' : 'rewrite/elevate the draft into the final spec and WRITE it to'} ${NS}/screens/${s.out}.md
Requirements:
- Keep the 13-section structure exactly: Header / Purpose / Entry & exit / Layout anatomy + ASCII wireframe 390x844 / Components / Visual treatment / Content & copy / Data & honesty states / All states / Motion & interaction / Motivation-tier adaptation / Accessibility / Premium checklist.
- Copy in CIA voice: sentence case, zero exclamation marks, coach is CIA (never SIA - fix every occurrence), one *emphasis* word per moment max.
- Verify every hex/blur/radius against canon; fix silently. Only canon hexes + the domain tag palette.
- Every card: ONE semantic glow with stated meaning (orange=you/effort, green=done/growth, purple=CIA/AI).
- Every metric: provenance chip + honesty triple (real / low-confidence / honest-null). No fabricated numbers.
- If the draft contradicts itself, the canon, or mobile reality: FIX it and note the correction inside the relevant section.
- An honest, justified "not applicable" (with rationale) beats forced fake compliance.
- Kill generic phrasing; every design decision specific and intentional. Components by catalog name; flag NEW: with rationale.
FINAL STEP (mandatory): run via Bash: wc -c "${NS}/screens/${s.out}.md" and reply with ONLY the integer byte count. If you failed to write the file, reply 0.`

const GATE_PROMPT = (s) => `Audit ${NS}/screens/${s.out}.md against Balencia's 14-point gate. First Read that file (if it does not exist: score 0, pass false, defect "file missing"). Score each point 0/1. IMPORTANT: a point also earns 1 if the spec declares it NOT APPLICABLE with an honest, specific justification (e.g. a pre-auth screen with zero metrics justifies N/A on the honesty-triple point). Fake or lazy N/As earn 0.
1 Connects - cross-pillar intelligence present (domain tags, CIA insight, correlation) OR justified N/A
2 Honest - no fabricated numbers; provenance on real data
3 Premium - intentional hierarchy, generous space, specific decisions (not template filler)
4 Warm-dark atmosphere specified; glass reads as glass; never flat black
5 Semantic glow one-per-card with meaning stated (or justified N/A)
6 60/30/10 respected; one hero color per surface
7 Type rules: Neue Montreal UI, max one Tiempos-italic *emphasis* word per moment, tabular-nums on stats (or justified N/A)
8 All six states designed (default/skeleton/empty/error/success/disabled) - honest N/As count if justified
9 Motivation-tier low/medium/high variants (or justified N/A)
10 AA+ contrast, 44px targets, reduced-motion path
11 Honesty triple per metric (or justified N/A when zero metrics)
12 Components use catalog names; one-offs flagged NEW: with rationale
13 CIA voice: sentence case, no exclamation marks, zero "SIA" as coach name
14 13 sections in correct order + ASCII wireframe present
northStar = points 1,2,3 all earn 1 (justified N/A on point 1 counts). pass = score>=12 AND northStar. score is the INTEGER count of points earned (0-14), never a fraction.
Each failed point becomes one defect string "P<n>: <one line>".`

const VERDICT = {
  type: 'object',
  properties: {
    score: { type: 'number' },
    northStar: { type: 'boolean' },
    pass: { type: 'boolean' },
    defects: { type: 'array', items: { type: 'string' } },
  },
  required: ['score', 'northStar', 'pass', 'defects'],
}

const A = typeof args === 'string' ? JSON.parse(args) : args

async function craft(s, defects) {
  const out = await agent(CRAFT_PROMPT(s, defects), { label: `${defects ? 'repair' : 'craft'}:${s.id}`, phase: 'Craft', model: 'sonnet' })
  const bytes = parseInt(String(out || '0').replace(/[^0-9]/g, ' ').trim().split(/\s+/).pop() || '0', 10)
  return bytes || 0
}

const gate = (s, relabel) => agent(GATE_PROMPT(s), { label: `${relabel || 'gate'}:${s.id}`, phase: 'Gate', model: 'haiku', schema: VERDICT })

async function runScreen(s) {
  let bytes = A.gateOnly ? -1 : await craft(s, null)
  let v = await gate(s)
  let repairs = 0, recrafts = 0
  while (v && !v.pass) {
    if (v.defects.length <= 4 && repairs < 1) {
      repairs++
      bytes = await craft(s, v.defects)
    } else if (recrafts < 1) {
      recrafts++; repairs = 0
      bytes = await craft(s, null)
    } else break
    v = await gate(s, `regate${repairs + recrafts}`)
  }
  return {
    id: s.id, out: s.out,
    status: v && v.pass ? 'PASS' : 'ESCALATED',
    score: v ? v.score : 0,
    defects: v && !v.pass ? v.defects : [],
    bytes, repairs, recrafts,
  }
}

const results = (await pipeline(A.screens, s => runScreen(s))).filter(Boolean)
return {
  wave: A.wave,
  pass: results.filter(r => r.status === 'PASS').map(r => `${r.id}:${r.score}/14 ${r.bytes}B${r.repairs ? ' r' + r.repairs : ''}`),
  escalated: results.filter(r => r.status === 'ESCALATED'),
}
