"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  BatteryCharging,
  BookOpen,
  Check,
  HeartPulse,
  Smile,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import {
  BtnGhost,
  BtnPrimary,
  Chip,
  CIAInsightCard,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassCard,
  HifiShell,
  MetricPill,
  SafetyCard,
  SolidCard,
  TopBar,
  cx,
} from "@/components/hifi/kit";
import { E1Modal } from "../intelligence/E1Modal";

const modules = [
  ["Journal", BookOpen, "/screens/61", "Manual journal · fresh today"],
  ["Mood", Smile, "/screens/90", "Check-in · fresh today"],
  ["Breathing", HeartPulse, "/screens/53", "App timer · fresh today"],
  ["Stress", Activity, "/screens/52", "Check-in · 2h ago"],
  ["Habits", Check, "/screens/64", "App log · fresh today"],
  ["Energy", BatteryCharging, "/screens/63", "Manual log · 1h ago"],
  ["Insights", Sparkles, "/screens/71", "CIA evidence · today"],
  ["Vision", Zap, "/screens/88", "Manual log · today"],
] as const;
export function S89Wellbeing() {
  const [fixture, setFixture] = useState("default-real");
  const [sessions, setSessions] = useState(2);
  const [panel, setPanel] = useState<"logs" | "data" | null>(null);
  const [status, setStatus] = useState(
    "Wellbeing preview ready. No account, provider, or network capability is active."
  );
  useEffect(() => {
    const q =
      new URLSearchParams(window.location.search).get("state") ??
      "default-real";
    queueMicrotask(() => {
      setFixture(q);
      setSessions(q === "breathing-success" ? 3 : 2);
      if (q === "what-this-logs") setPanel("logs");
      if (q === "data-controls") setPanel("data");
    });
  }, []);
  const nil = fixture === "honest-null";
  const low = fixture === "low-confidence";
  const skeleton = fixture === "skeleton";
  const sourceError = fixture === "source-error";
  const offline = fixture === "offline";
  const disabled = fixture === "module-disabled";
  const lowMotivation = fixture === "low-motivation";
  const overlay = panel ? (
    <E1Modal
      label={panel === "logs" ? "What this logs" : "Wellbeing data controls"}
      onClose={() => setPanel(null)}
    >
      <div className="flex justify-between">
        <h2 className="text-[18px] font-semibold">
          {panel === "logs" ? "Before you save" : "Wellbeing privacy controls"}
        </h2>
        <button
          aria-label="Close dialog"
          className="grid h-11 w-11 place-items-center"
          onClick={() => setPanel(null)}
        >
          <X />
        </button>
      </div>
      {panel === "logs" ? (
        <>
          <p className="mt-3 text-[13px] leading-5 text-white/70">
            Category: sensitive mood check-in · source: your manual choice ·
            scope: this wellbeing log only. Nothing saves until you confirm.
          </p>
          <BtnPrimary
            className="mt-4"
            onClick={() => {
              setStatus("Mood check-in saved locally.");
              setFixture("mood-success");
              setPanel(null);
            }}
          >
            Confirm local mood log
          </BtnPrimary>
        </>
      ) : (
        <>
          <p className="mt-3 text-[13px] leading-5 text-white/70">
            Mood, journal, health and photo-adjacent wellbeing · manual/provider
            sources · this hub · freshness per tile · confidence shown ·
            retained until deletion.
          </p>
          <ConsentRail controls={FULL_DATA_CONTROLS} />
        </>
      )}
    </E1Modal>
  ) : undefined;
  return (
    <HifiShell
      header={
        <TopBar title="Wellbeing" eyebrow="Tuesday, Jul 7" back={false} />
      }
      activeTab="today"
      overlay={overlay}
    >
      <main
        data-f2-state={`89-${fixture}`}
        className="space-y-4 px-4 pb-28 pt-3"
      >
        <p className="text-[22px] font-semibold">
          Your daily <span className="text-emphasis">whole</span> state
        </p>
        <GlassCard tone="you">
          <p className="text-[11px] uppercase tracking-widest text-white/50">
            How your system feels
          </p>
          {skeleton ? (
            <div className="mt-3 h-24 animate-pulse rounded-xl bg-white/5" />
          ) : (
            <>
              <h2 className="mt-2 text-[24px] font-semibold">
                {nil ? "Ready when you are" : low ? "Tentative" : "Steady"}
              </h2>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {nil ? (
                  ["Mood", "Stress", "Sleep", "Energy"].map((x) => (
                    <MetricPill key={x} label={x} value="—" />
                  ))
                ) : (
                  <>
                    <MetricPill
                      label="Mood"
                      value={fixture === "mood-success" ? "7" : "6"}
                    />
                    <MetricPill label="Stress" value="4" />
                    <MetricPill label="Sleep" value="7h" />
                    <MetricPill label="Energy" value="5" />
                  </>
                )}
              </div>
              <p className="mt-3 text-[12px] text-white/60">
                {nil
                  ? "No check-in yet · no values inferred."
                  : `${sessions} breathing sessions this week · check-in and wearable refreshed 2h ago${
                      low ? " · inferred mood, low confidence" : ""
                    }.`}
              </p>
            </>
          )}
        </GlassCard>
        <SafetyCard
          title="Crisis resources"
          description={
            offline
              ? "Offline: open stored local and national fallback guidance. Unknown locale never hides support."
              : "Call, text, or view qualified local and national support guidance."
          }
        />
        {!nil && !skeleton && (
          <CIAInsightCard
            provenance={[
              `${sessions} breathing sessions`,
              "Mood check-in · this week",
            ]}
          >
            CIA noticed stress eased after {sessions} breathing sessions this
            week.
          </CIAInsightCard>
        )}
        {sourceError && (
          <SolidCard>
            <p role="alert" className="font-semibold">
              Wearable source could not refresh
            </p>
            <p className="mt-1 text-[12px] text-white/60">
              Sleep and energy are cached from 2h ago. Manual logs remain
              available.
            </p>
          </SolidCard>
        )}
        <div
          className={cx(
            "grid grid-cols-2 gap-3",
            lowMotivation && "grid-cols-1"
          )}
        >
          {modules
            .slice(0, lowMotivation ? 4 : 8)
            .map(([name, Icon, href, source]) => {
              const unavailable =
                disabled && ["Stress", "Energy", "Insights"].includes(name);
              const content = (
                <>
                  <Icon size={19} className="text-brand-orange" />
                  <p className="mt-2 font-semibold">{name}</p>
                  <p className="mt-1 text-[11px] text-white/45">
                    {unavailable ? "Source permission unavailable" : source}
                  </p>
                </>
              );
              return unavailable ? (
                <div
                  key={name}
                  aria-disabled="true"
                  className="min-h-[76px] rounded-2xl bg-ink-brown-800 p-3 opacity-40"
                >
                  {content}
                </div>
              ) : (
                <a
                  key={name}
                  href={href}
                  className="focus-ring min-h-[76px] rounded-2xl bg-ink-brown-800 p-3"
                >
                  {content}
                </a>
              );
            })}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <BtnPrimary
            onClick={() => {
              setSessions((x) => x + 1);
              setFixture("breathing-success");
              setStatus("One breathing session completed locally.");
            }}
          >
            Start breathing
          </BtnPrimary>
          <BtnGhost onClick={() => setPanel("logs")}>Quick mood log</BtnGhost>
        </div>
        <BtnGhost onClick={() => setPanel("data")}>Data and privacy</BtnGhost>
        {fixture === "mood-success" && (
          <Chip tone="done">Mood logged · hero updated</Chip>
        )}
        {fixture === "breathing-success" && (
          <Chip tone="done">
            Breathing complete · {sessions} sessions everywhere
          </Chip>
        )}
        <p role="status" className="text-[12px] text-white/60">
          {status}
        </p>
      </main>
    </HifiShell>
  );
}
