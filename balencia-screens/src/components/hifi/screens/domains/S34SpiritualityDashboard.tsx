"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  Check,
  Database,
  PenLine,
  Sun,
  Wind,
} from "lucide-react";
import {
  Chip,
  CIAInsightCard,
  ConsentRail,
  FULL_DATA_CONTROLS,
  FloatingQuickLog,
  GlassCard,
  HeatGrid,
  HifiShell,
  SafetyCard,
  SectionTitle,
  SolidCard,
  TopBar,
} from "@/components/hifi/kit";

type Fixture =
  | "default"
  | "low-confidence"
  | "empty"
  | "prayer-api-error"
  | "offline"
  | "practice-success"
  | "disabled"
  | "data-controls"
  | "read-more"
  | "location-consent"
  | "reflection"
  | "contemplation-timer"
  | "breathing-timer"
  | "log-practice";
const practices = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

export function S34SpiritualityDashboard() {
  const [fixture, setFixture] = useState<Fixture>("default");
  const [checked, setChecked] = useState<string[]>(["Dhuhr"]);
  const [status, setStatus] = useState("");
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const next =
        (new URLSearchParams(window.location.search).get(
          "state"
        ) as Fixture | null) ?? "default";
      setFixture(next);
      setChecked(
        next === "practice-success"
          ? ["Dhuhr", "Asr"]
          : next === "empty"
          ? []
          : ["Dhuhr"]
      );
      const outcomes: Partial<Record<Fixture, string>> = {
        "read-more":
          "CIA insight detail opened locally: logged practice and calm moved together this week; this is an association.",
        "location-consent":
          "Location consent preview opened. No device location was requested.",
        reflection: "Private reflection preview opened. Nothing was saved.",
        "contemplation-timer":
          "Contemplation timer preview: 5:00. Not started.",
        "breathing-timer": "Breathing timer preview: 4-7-8. Not started.",
        "log-practice": "Practice log opened locally. Nothing was synced.",
      };
      setStatus(outcomes[next] ?? "");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  const low = fixture === "low-confidence",
    empty = fixture === "empty",
    blocked = fixture === "offline" || fixture === "disabled",
    prayerError = fixture === "prayer-api-error";
  function toggle(name: string) {
    if (blocked) return;
    setChecked((rows) =>
      rows.includes(name) ? rows.filter((row) => row !== name) : [...rows, name]
    );
    setStatus(
      `${name} ${
        checked.includes(name) ? "returned to open" : "marked complete"
      } in this local preview.`
    );
  }

  return (
    <HifiShell
      header={
        <TopBar
          title="Spirituality"
          eyebrow="RPG domain · Faith"
          right={
            <Link
              href="/screens/34?state=data-controls"
              aria-label="Data sources"
              className="focus-ring grid min-h-11 min-w-11 place-items-center rounded-full border border-white/10"
            >
              <Database className="h-4 w-4" />
            </Link>
          }
        />
      }
      activeTab="today"
      bottomAction={
        <FloatingQuickLog
          label="Log practice"
          href="/screens/34?state=log-practice"
        />
      }
      atmosphere="you"
    >
      <main className="space-y-4 px-4 pb-4 pt-3" data-state={`34-${fixture}`}>
        {fixture === "data-controls" && (
          <Chip tone="you">Faith data controls open below</Chip>
        )}
        {fixture === "disabled" && (
          <Chip>Practice changes unavailable in this fixture</Chip>
        )}
        {blocked && (
          <SolidCard className="border-brand-orange/35">
            <p className="text-sm text-white/75">
              Offline · cached practices are read-only.
            </p>
          </SolidCard>
        )}
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm text-white/70">
            <span className="h-2 w-2 rounded-full bg-domain-faith" />
            Calm · belief-adaptive
          </p>
          <Chip tone="cia">CIA</Chip>
        </div>
        <CIAInsightCard
          eyebrow="CIA presence"
          provenance={[
            low ? "Estimated · low confidence" : "Derived · local weekly log",
          ]}
          actions={
            <Link
              href="/screens/34?state=read-more"
              className="focus-ring inline-flex min-h-11 items-center px-2 text-sm text-royal-purple"
            >
              Read more
            </Link>
          }
        >
          <p className="text-[15px] leading-relaxed text-white/85">
            {low
              ? "A tentative association may exist between your logged practice and calm."
              : "Your logged practice and calm moved together this week. This is an association, not a medical outcome."}
          </p>
        </CIAInsightCard>
        <section>
          <SectionTitle
            title="Today's practice"
            meta={`${checked.length} / 5`}
          />
          {empty ? (
            <SolidCard>
              <p className="text-sm text-white/70">
                CIA can suggest practices that fit your beliefs. No history
                exists yet.
              </p>
            </SolidCard>
          ) : (
            <SolidCard>
              <ul className="divide-y divide-white/5">
                {practices.map((name) => (
                  <li key={name}>
                    <button
                      type="button"
                      aria-pressed={checked.includes(name)}
                      disabled={blocked}
                      onClick={() => toggle(name)}
                      className="focus-ring flex min-h-[52px] w-full items-center gap-3 px-4 py-3 text-left disabled:opacity-40"
                    >
                      {checked.includes(name) ? (
                        <Check className="h-4 w-4 text-forest-green" />
                      ) : name === "Fajr" ? (
                        <Sun className="h-4 w-4 text-white/50" />
                      ) : (
                        <span className="h-4 w-4 rounded-full border border-white/20" />
                      )}
                      <span className="flex-1 text-sm text-white/90">
                        {name}
                      </span>
                      {name === "Fajr" && (
                        <span className="text-right">
                          <span className="block text-sm text-white/55">
                            {prayerError
                              ? "Time unavailable"
                              : low
                              ? "5:14 AM"
                              : "5:12 AM"}
                          </span>
                          <span className="text-[10px] text-white/40">
                            {prayerError
                              ? "Bundled demo unavailable"
                              : low
                              ? "Estimated · low confidence"
                              : "Bundled demo · no location"}
                          </span>
                        </span>
                      )}
                      {checked.includes(name) && (
                        <span className="text-xs text-forest-green">
                          Completed
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </SolidCard>
          )}
          {(empty || prayerError) && (
            <Link
              href="/screens/34?state=location-consent"
              className="focus-ring mt-2 inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 text-sm text-white/75"
            >
              Preview location consent
            </Link>
          )}
        </section>
        <section>
          <SectionTitle
            title="Consistency"
            meta={empty ? "No history" : "This week"}
          />
          <SolidCard>
            <div className="p-4">
              <HeatGrid
                values={empty ? [0, 0, 0, 0, 0, 0, 0] : [1, 2, 0, 1, 3, 2, 0]}
                columns={7}
              />
              <p className="mt-3 text-xs text-white/55">
                {empty
                  ? "Your practice history begins when you log a practice."
                  : "Seven-day local log · 9 practice marks · refreshed today."}
              </p>
            </div>
          </SolidCard>
        </section>
        <div className="grid grid-cols-2 gap-3">
          <GlassCard tone="you">
            <div className="flex h-full flex-col gap-2 p-4">
              <BookOpen className="h-4 w-4 text-white/70" />
              <span className="text-[11px] uppercase tracking-wider text-white/60">
                Reading
              </span>
              <p className="text-sm text-white/90">Surah Al-Baqarah</p>
              <p className="mt-auto text-xs text-white/55">
                Page 42 / 604 · you logged
              </p>
            </div>
          </GlassCard>
          <GlassCard tone="you">
            <div className="flex h-full flex-col gap-2 p-4">
              <PenLine className="h-4 w-4 text-white/70" />
              <span className="text-[11px] uppercase tracking-wider text-white/60">
                Reflection
              </span>
              <p className="text-sm text-white/90">
                What are you grateful for?
              </p>
              <Link
                href="/screens/34?state=reflection"
                className="focus-ring mt-auto inline-flex min-h-11 items-center text-xs text-brand-orange"
              >
                Write privately
              </Link>
            </div>
          </GlassCard>
        </div>
        <section>
          <SectionTitle title="Rituals" />
          <div className="grid grid-cols-2 gap-3">
            <Timer
              href="/screens/34?state=contemplation-timer"
              icon={<Brain className="h-4 w-4" />}
              title="Contemplation"
              detail="5 minutes"
            />
            <Timer
              href="/screens/34?state=breathing-timer"
              icon={<Wind className="h-4 w-4" />}
              title="Breathing"
              detail="4-7-8 method"
            />
          </div>
        </section>
        <section>
          <SectionTitle title="Data sources" />
          <p className="text-xs leading-5 text-white/55">
            Category Faith (displayed as Spirituality) · bundled prayer-time
            demo and your local entries · this dashboard only · refreshed today
            · confidence inline · session-only retention. No Prayer API,
            network, location, storage, camera, or microphone is used.
          </p>
          <ConsentRail controls={FULL_DATA_CONTROLS} />
        </section>
        <SafetyCard />
        <p className="px-1 text-xs text-white/45">
          Coaching support, not medical advice. Help access stays separate from
          rewards.
        </p>
        {status && (
          <p
            role="status"
            className="rounded-xl border border-domain-faith/30 bg-domain-faith/10 p-3 text-sm text-white/80"
          >
            {status}
          </p>
        )}
      </main>
    </HifiShell>
  );
}

function Timer({
  href,
  icon,
  title,
  detail,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <Link
      href={href}
      className="focus-ring block min-h-11 rounded-2xl text-left"
    >
      <GlassCard tone="muted">
        <div className="flex min-h-24 flex-col gap-2 p-4">
          {icon}
          <p className="text-sm text-white/90">{title}</p>
          <p className="text-xs text-white/55">{detail}</p>
        </div>
      </GlassCard>
    </Link>
  );
}
