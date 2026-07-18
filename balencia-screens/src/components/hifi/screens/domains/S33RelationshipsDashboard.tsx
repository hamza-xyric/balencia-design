"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Phone, ShieldCheck, Sparkles } from "lucide-react";
import {
  BtnGhost,
  BtnPrimary,
  Chip,
  CIAInsightCard,
  ConsentRail,
  FULL_DATA_CONTROLS,
  FloatingQuickLog,
  GlassCard,
  HifiShell,
  ProgressRing,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
} from "@/components/hifi/kit";

type Fixture =
  | "default"
  | "low-confidence"
  | "empty"
  | "error"
  | "offline"
  | "person-expanded"
  | "log-success"
  | "suggestion-skipped"
  | "data-controls"
  | "log-quality-time";
const people = [
  { name: "Ahmed", score: 72, context: "Call · 2w", status: "In touch" },
  { name: "Mom", score: 88, context: "Dinner · 2h", status: "Today" },
  { name: "Sarah", score: 34, context: "Text · 1mo", status: "Reach out" },
];

export function S33RelationshipsDashboard() {
  const [fixture, setFixture] = useState<Fixture>("default");
  const [selected, setSelected] = useState<string | null>(null);
  const [skipped, setSkipped] = useState(false);
  const [status, setStatus] = useState("");
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const next =
        (new URLSearchParams(window.location.search).get(
          "state"
        ) as Fixture | null) ?? "default";
      setFixture(next);
      setSelected(next === "person-expanded" ? "Ahmed" : null);
      setSkipped(next === "suggestion-skipped");
      setStatus(
        next === "log-success" || next === "log-quality-time"
          ? "Quality time logged in this local preview."
          : ""
      );
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  const low = fixture === "low-confidence",
    empty = fixture === "empty",
    offline = fixture === "offline";
  const current = people.find((person) => person.name === selected);
  const score = current?.score ?? 84;

  return (
    <HifiShell
      atmosphere="cia"
      activeTab="today"
      header={
        <TopBar
          title="Relationships"
          right={<Chip tone="you">Relationships</Chip>}
        />
      }
      bottomAction={
        <FloatingQuickLog
          label="Log quality time"
          href="/screens/33?state=log-quality-time"
        />
      }
    >
      <div className="h-0.5 w-full bg-white/[0.06]">
        <div className="h-full w-3/5 bg-domain-relationships" />
      </div>
      <main className="space-y-4 px-4 pb-6 pt-4" data-state={`33-${fixture}`}>
        {fixture === "log-success" && (
          <Chip tone="done">Check-in saved locally</Chip>
        )}
        {fixture === "log-quality-time" && (
          <Chip tone="you">Quality-time log preview</Chip>
        )}
        {fixture === "data-controls" && (
          <Chip tone="you">Relationships data controls open below</Chip>
        )}
        {offline && (
          <SolidCard className="border-brand-orange/35">
            <p className="text-sm text-white/75">
              Offline · relationship changes are unavailable. Cached entries
              remain visible.
            </p>
          </SolidCard>
        )}
        {fixture === "error" && (
          <SolidCard className="border-brand-orange/35">
            <p className="text-sm text-white/75">
              Couldn&apos;t load reminders. Weekly logged totals remain cached.
            </p>
            <button
              type="button"
              onClick={() => {
                setFixture("default");
                setStatus("Reminders restored locally.");
              }}
              className="focus-ring mt-2 min-h-11 rounded-full border border-white/15 px-4 text-sm"
            >
              Retry locally
            </button>
          </SolidCard>
        )}
        <CIAInsightCard
          eyebrow="CIA coaching note"
          provenance={[
            low ? "Estimated · low confidence" : "Derived · local pattern demo",
          ]}
        >
          <p className="text-[15px] leading-snug text-white/80">
            A morning walk with Ahmed{" "}
            <span className="text-emphasis">may support</span> your
            Relationships stat. This is an association, not a prediction.
          </p>
        </CIAInsightCard>
        {!empty && (
          <SolidCard>
            <div className="grid grid-cols-3 divide-x divide-white/10">
              {[
                ["4.5h", "Time"],
                ["5", "Sessions"],
                ["3", "People"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 py-3"
                >
                  <span
                    className={`text-2xl font-semibold ${
                      low ? "text-white/55" : "text-white"
                    }`}
                  >
                    {value}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-white/45">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-4 pb-3">
              <Provenance
                items={[low ? "Estimated · low confidence" : "You logged"]}
              />
            </div>
          </SolidCard>
        )}
        <GlassCard tone="cia">
          <div className="flex flex-col items-center gap-3 py-6">
            {empty ? (
              <div className="grid h-[120px] w-[120px] place-items-center rounded-full border-2 border-dashed border-white/20 text-center text-xs text-white/45">
                Getting to know this connection
              </div>
            ) : (
              <ProgressRing
                percent={(score / 99) * 100}
                value={`${score}`}
                size={120}
                tone="cia"
                label={`${
                  selected ?? "Inner circle"
                } connection strength: ${score} out of 99`}
              />
            )}
            <p className="text-[13px] text-white/65">
              {empty
                ? "No relationship score yet"
                : `${selected ?? "Inner circle"} · ${score} out of 99`}
            </p>
            {!empty && (
              <Chip tone="muted">
                {low ? "Estimated · low confidence" : "Local logged pattern"}
              </Chip>
            )}
          </div>
        </GlassCard>
        <section>
          <SectionTitle title="Check in" meta="1 reminder" />
          <SolidCard>
            <button
              disabled={offline}
              onClick={() =>
                setStatus("Ahmed check-in preview opened locally.")
              }
              className="focus-ring flex min-h-11 w-full items-center justify-between px-4 py-3 text-left disabled:opacity-40"
            >
              <span className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.06]">
                  <Phone className="h-4 w-4 text-brand-orange" />
                </span>
                <span>
                  <span className="block text-sm text-white">
                    Ahmed on your mind
                  </span>
                  <span className="text-xs text-white/45">
                    2 weeks since last call
                  </span>
                </span>
              </span>
              <ChevronRight className="h-4 w-4 text-white/30" />
            </button>
          </SolidCard>
        </section>
        <section>
          <div className="flex items-center justify-between">
            <SectionTitle title="Key people" />
            <button
              onClick={() =>
                setStatus("All three bundled people are already visible.")
              }
              className="focus-ring min-h-11 text-xs uppercase tracking-wider text-brand-orange"
            >
              View all
            </button>
          </div>
          {empty ? (
            <SolidCard>
              <p className="text-sm text-white/70">No people added yet.</p>
              <button
                type="button"
                onClick={() => setStatus("Add person preview opened locally.")}
                className="focus-ring mt-3 min-h-11 rounded-full bg-brand-orange px-4 text-sm font-semibold text-ink-900"
              >
                Add person
              </button>
            </SolidCard>
          ) : (
            <SolidCard>
              {people.map((person) => (
                <div key={person.name}>
                  <PersonRow
                    {...person}
                    selected={selected === person.name}
                    onSelect={() =>
                      setSelected(selected === person.name ? null : person.name)
                    }
                  />
                  {selected === person.name && <Cadence name={person.name} />}
                </div>
              ))}
            </SolidCard>
          )}
        </section>
        <section>
          <SectionTitle title="Recent quality time" />
          <SolidCard>
            <button
              onClick={() =>
                setStatus("Dinner with Mom · 90 minutes · local entry.")
              }
              className="focus-ring flex min-h-11 w-full items-center justify-between px-4 py-3 text-left"
            >
              <span>
                <span className="block text-sm text-white">
                  Dinner with Mom
                </span>
                <span className="text-xs text-white/45">
                  2h ago · 90 minutes
                </span>
              </span>
              <span className="rounded-full bg-domain-relationships/15 px-2 py-1 text-[10px] font-semibold uppercase text-domain-relationships">
                Family
              </span>
            </button>
          </SolidCard>
        </section>
        <div className={skipped ? "opacity-40" : ""}>
          <CIAInsightCard
            eyebrow="CIA suggests"
            provenance={["Bounded local pattern"]}
            actions={
              <>
                <BtnGhost
                  quiet
                  onClick={() => {
                    setSkipped(true);
                    setStatus("Suggestion skipped locally.");
                  }}
                >
                  Skip
                </BtnGhost>
                <BtnPrimary
                  disabled={offline}
                  onClick={() =>
                    setStatus("Walk with Ahmed added to the local preview.")
                  }
                >
                  Do it
                </BtnPrimary>
              </>
            }
          >
            <div className="flex gap-3">
              <Sparkles className="h-4 w-4 shrink-0 text-royal-purple" />
              <p className="text-sm text-white/80">
                A walk with Ahmed may support connection. No causal outcome is
                promised.
              </p>
            </div>
          </CIAInsightCard>
        </div>
        <section>
          <SectionTitle title="Data sources" />
          <GlassCard tone="muted">
            <div className="space-y-3 p-4">
              <div className="flex gap-3">
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand-orange" />
                <p className="text-xs leading-5 text-white/65">
                  Category Relationships · bundled people and calendar demo ·
                  dashboard scope · refreshed today · confidence shown inline ·
                  session-only retention. No contacts or calendar access occurs.
                </p>
              </div>
              <ConsentRail controls={FULL_DATA_CONTROLS} />
            </div>
          </GlassCard>
        </section>
        {status && (
          <p
            role="status"
            className="rounded-xl border border-domain-relationships/30 bg-domain-relationships/10 p-3 text-sm text-white/80"
          >
            {status}
          </p>
        )}
      </main>
    </HifiShell>
  );
}

function PersonRow({
  name,
  score,
  context,
  status,
  selected,
  onSelect,
}: {
  name: string;
  score: number;
  context: string;
  status: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={selected}
      onClick={onSelect}
      className="focus-ring flex min-h-[64px] w-full items-center justify-between border-b border-white/10 px-4 py-2 text-left last:border-0"
    >
      <span className="flex items-center gap-3">
        <ProgressRing
          percent={(score / 99) * 100}
          value=""
          size={40}
          tone="you"
          label={`${name}: ${score} out of 99`}
        />
        <span>
          <span className="block text-sm text-white">{name}</span>
          <span className="text-[11px] uppercase text-white/45">{context}</span>
        </span>
      </span>
      <span className="flex items-center gap-2">
        <span className="rounded-full bg-domain-relationships/15 px-2 py-1 text-[10px] font-semibold uppercase text-domain-relationships">
          {status}
        </span>
        <ChevronRight className="h-4 w-4 text-white/30" />
      </span>
    </button>
  );
}
function Cadence({ name }: { name: string }) {
  const values = [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1];
  return (
    <div
      className="border-b border-white/10 bg-white/[0.02] p-4"
      role="group"
      aria-label={`${name} cadence: 7 touchpoints across 12 weeks`}
    >
      <p className="mb-2 text-xs text-white/60">
        12-week cadence · 7 logged touchpoints
      </p>
      <div className="grid grid-cols-6 gap-2" aria-hidden="true">
        {values.map((v, i) => (
          <span
            key={i}
            className={`h-4 rounded ${
              v ? "bg-domain-relationships/70" : "bg-white/[0.06]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
