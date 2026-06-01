/**
 * Life Correlation Matrix — typed runtime data for the website.
 * Mirror of brief/lcm-matrix.json (the spec). Keep the two in sync.
 * Edge weights are verbatim from LIFE_CORRELATION_MATRIX.md §3.
 */

export type DomainKey =
  | "fitness"
  | "sleep"
  | "career"
  | "nutrition"
  | "finance"
  | "faith"
  | "productivity"
  | "relationships"
  | "wellbeing"
  | "meditation";

export type ClusterKey = "physical" | "professional" | "inner" | "bridge";

export interface LcmDomain {
  key: DomainKey;
  label: string;
  short: string;
  token: string;
  accent: string;
  cluster: ClusterKey;
  bridge: boolean;
  hubAvg: number;
  /** SIA-voice caption used on the domain tour. */
  caption: string;
}

export interface LcmEdge {
  a: DomainKey;
  b: DomainKey;
  w: number;
}

/** Domains in the canonical radar order (FIT, SLP, CAR, NUT, FIN, FAI, PRD, REL, WEL, MED). */
export const DOMAINS: LcmDomain[] = [
  { key: "fitness", label: "Fitness", short: "FIT", token: "--color-domain-fitness", accent: "#EF4444", cluster: "physical", bridge: false, hubAvg: 0.5, caption: "Your body tells a story every day. I read every chapter." },
  { key: "sleep", label: "Sleep", short: "SLP", token: "--color-domain-sleep", accent: "#818CF8", cluster: "physical", bridge: false, hubAvg: 0.56, caption: "Rest is not lost time. It is where today quietly becomes tomorrow." },
  { key: "career", label: "Career", short: "CAR", token: "--color-domain-career", accent: "#6366F1", cluster: "professional", bridge: false, hubAvg: 0.49, caption: "Your work does not stand alone. I see how sleep, stress, and the people around you power your best hours." },
  { key: "nutrition", label: "Nutrition", short: "NUT", token: "--color-domain-nutrition", accent: "#84CC16", cluster: "physical", bridge: false, hubAvg: 0.46, caption: "What you eat reaches further than your plate — into your focus, your sleep, your mood." },
  { key: "finance", label: "Finance", short: "FIN", token: "--color-domain-finance", accent: "#10B981", cluster: "professional", bridge: false, hubAvg: 0.39, caption: "Your money tells the truth about your stress. I see the pattern before your bank does." },
  { key: "faith", label: "Faith", short: "FAI", token: "--color-domain-faith", accent: "#A855F7", cluster: "inner", bridge: false, hubAvg: 0.38, caption: "I make room for what gives your days meaning, not just what fills them." },
  { key: "productivity", label: "Productivity", short: "PRD", token: "--color-domain-productivity", accent: "#F97316", cluster: "professional", bridge: true, hubAvg: 0.54, caption: "I protect your attention, so the day does not spend it for you." },
  { key: "relationships", label: "Relationships", short: "REL", token: "--color-domain-relationships", accent: "#EC4899", cluster: "bridge", bridge: true, hubAvg: 0.43, caption: "The people in your life shape your health more than any workout. I keep watch over those connections too." },
  { key: "wellbeing", label: "Wellbeing", short: "WEL", token: "--color-domain-wellbeing", accent: "#14B8A6", cluster: "inner", bridge: true, hubAvg: 0.68, caption: "Calm is not the absence of energy. It is energy, well directed." },
  { key: "meditation", label: "Meditation", short: "MED", token: "--color-domain-meditation", accent: "#A78BFA", cluster: "inner", bridge: false, hubAvg: 0.51, caption: "A few quiet minutes can change the shape of an entire day." },
];

export const DOMAIN_BY_KEY: Record<DomainKey, LcmDomain> = Object.fromEntries(
  DOMAINS.map((d) => [d.key, d])
) as Record<DomainKey, LcmDomain>;

/** Order around the ring — clusters kept contiguous, bridges at the seams. */
export const RING_ORDER: DomainKey[] = [
  "fitness",
  "sleep",
  "nutrition",
  "productivity",
  "career",
  "finance",
  "relationships",
  "faith",
  "meditation",
  "wellbeing",
];

export const CLUSTERS: Record<
  Exclude<ClusterKey, "bridge">,
  { label: string; members: DomainKey[]; note: string }
> = {
  physical: { label: "Physical", members: ["fitness", "sleep", "nutrition"], note: "all 0.60+ with each other" },
  professional: { label: "Professional", members: ["career", "finance", "productivity"], note: "all 0.50+ with each other" },
  inner: { label: "Inner life", members: ["faith", "meditation", "wellbeing"], note: "all 0.65+ with each other" },
};

/** The 45 unique base-layer edges (verbatim weights). */
export const EDGES: LcmEdge[] = [
  { a: "fitness", b: "sleep", w: 0.85 },
  { a: "fitness", b: "career", w: 0.35 },
  { a: "fitness", b: "nutrition", w: 0.8 },
  { a: "fitness", b: "finance", w: 0.25 },
  { a: "fitness", b: "faith", w: 0.2 },
  { a: "fitness", b: "productivity", w: 0.5 },
  { a: "fitness", b: "relationships", w: 0.35 },
  { a: "fitness", b: "wellbeing", w: 0.75 },
  { a: "fitness", b: "meditation", w: 0.45 },
  { a: "sleep", b: "career", w: 0.55 },
  { a: "sleep", b: "nutrition", w: 0.6 },
  { a: "sleep", b: "finance", w: 0.2 },
  { a: "sleep", b: "faith", w: 0.25 },
  { a: "sleep", b: "productivity", w: 0.75 },
  { a: "sleep", b: "relationships", w: 0.35 },
  { a: "sleep", b: "wellbeing", w: 0.8 },
  { a: "sleep", b: "meditation", w: 0.7 },
  { a: "career", b: "nutrition", w: 0.3 },
  { a: "career", b: "finance", w: 0.8 },
  { a: "career", b: "faith", w: 0.3 },
  { a: "career", b: "productivity", w: 0.75 },
  { a: "career", b: "relationships", w: 0.45 },
  { a: "career", b: "wellbeing", w: 0.6 },
  { a: "career", b: "meditation", w: 0.35 },
  { a: "nutrition", b: "finance", w: 0.45 },
  { a: "nutrition", b: "faith", w: 0.25 },
  { a: "nutrition", b: "productivity", w: 0.5 },
  { a: "nutrition", b: "relationships", w: 0.25 },
  { a: "nutrition", b: "wellbeing", w: 0.65 },
  { a: "nutrition", b: "meditation", w: 0.35 },
  { a: "finance", b: "faith", w: 0.25 },
  { a: "finance", b: "productivity", w: 0.5 },
  { a: "finance", b: "relationships", w: 0.35 },
  { a: "finance", b: "wellbeing", w: 0.55 },
  { a: "finance", b: "meditation", w: 0.2 },
  { a: "faith", b: "productivity", w: 0.3 },
  { a: "faith", b: "relationships", w: 0.5 },
  { a: "faith", b: "wellbeing", w: 0.65 },
  { a: "faith", b: "meditation", w: 0.75 },
  { a: "productivity", b: "relationships", w: 0.4 },
  { a: "productivity", b: "wellbeing", w: 0.6 },
  { a: "productivity", b: "meditation", w: 0.55 },
  { a: "relationships", b: "wellbeing", w: 0.75 },
  { a: "relationships", b: "meditation", w: 0.45 },
  { a: "wellbeing", b: "meditation", w: 0.8 },
];

/** The featured "one of thousands" example: meditation ↔ finance personal-layer climb. */
export const FEATURED = {
  a: "meditation" as DomainKey,
  b: "finance" as DomainKey,
  base: 0.2,
  personal: 0.55,
  weeks: 6,
  confidenceMilestones: [
    { week: 2, confidence: 0.25 },
    { week: 5, confidence: 0.5 },
  ],
  quote:
    "I've noticed something interesting. On days you meditate, your spending the next day tends to be lower. It looks like mindfulness might be helping you make more intentional financial decisions. Want to explore this?",
};

export interface LcmInsight {
  a: DomainKey;
  b: DomainKey;
  text: string;
  stat: string | null;
}

/** Illustrative cross-domain insights. Percentages are NOT validated product claims. */
export const INSIGHTS: LcmInsight[] = [
  { a: "fitness", b: "sleep", text: "When your sleep dips, I lower tomorrow's training ceiling — so you build instead of break.", stat: null },
  { a: "nutrition", b: "career", text: "On meeting-heavy days, skipping lunch tends to cost you your afternoon focus. I flag it before it happens.", stat: "~31% focus" },
  { a: "relationships", b: "wellbeing", text: "The weeks you stay close to people tend to be the weeks you recover best.", stat: "~24% recovery" },
  { a: "finance", b: "career", text: "Your spending often climbs during your most stressful work weeks. I name the pattern early, gently.", stat: "~40% spending" },
];

const EDGE_INDEX = new Map<string, number>();
for (const e of EDGES) {
  EDGE_INDEX.set(`${e.a}|${e.b}`, e.w);
  EDGE_INDEX.set(`${e.b}|${e.a}`, e.w);
}

/** Correlation weight between two domains (0 if same or missing). */
export function weightBetween(a: DomainKey, b: DomainKey): number {
  if (a === b) return 1;
  return EDGE_INDEX.get(`${a}|${b}`) ?? 0;
}

/** All connections for a domain, sorted strongest-first. */
export function edgesFor(key: DomainKey): { other: LcmDomain; w: number }[] {
  return DOMAINS.filter((d) => d.key !== key)
    .map((d) => ({ other: d, w: weightBetween(key, d.key) }))
    .sort((x, y) => y.w - x.w);
}

export const MIN_HUB = Math.min(...DOMAINS.map((d) => d.hubAvg));
export const MAX_HUB = Math.max(...DOMAINS.map((d) => d.hubAvg));
