"use client";

import { useEffect, useState } from "react";
import { Database, Moon, ShieldCheck, X } from "lucide-react";
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  ChargeMeter,
  Chip,
  CIAInsightCard,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassCard,
  HifiShell,
  ProgressRing,
  Provenance,
  SafetyCard,
  SectionTitle,
  SolidCard,
  TopBar,
} from "@/components/hifi/kit";
import { E1Modal } from "../intelligence/E1Modal";

export function S58SleepTracking() {
  const [fixture, setFixture] = useState("default-real");
  const [range, setRange] = useState("7d");
  const [panel, setPanel] = useState<"manual" | "data" | "safety" | null>(null);
  const [valid, setValid] = useState(false);
  const [status, setStatus] = useState(
    "Local visual preview. No wearable, health provider, account, call, or network capability is active."
  );
  useEffect(() => {
    const value =
      new URLSearchParams(window.location.search).get("state") ??
      "default-real";
    queueMicrotask(() => {
      setFixture(value);
      if (value === "range-14d") setRange("14d");
      if (value === "manual-disabled" || value === "manual-success")
        setPanel("manual");
      if (value === "manual-success") {
        setValid(true);
        setStatus("Manual sleep log saved locally.");
      }
      if (value === "data-controls") setPanel("data");
      if (value === "safety-open") setPanel("safety");
    });
  }, []);
  const low = fixture === "low-confidence";
  const empty = fixture === "honest-null";
  const manualOnly = fixture === "manual-only";
  const skeleton = fixture === "skeleton";
  const overlay = panel ? (
    <E1Modal
      label={
        panel === "manual"
          ? "Manual sleep log"
          : panel === "data"
          ? "Sleep data controls"
          : "Sleep support"
      }
      onClose={() => setPanel(null)}
      className="!bg-ink-900 border border-white/15"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-semibold text-paper-100">
          {panel === "manual"
            ? "Log sleep manually"
            : panel === "data"
            ? "Sleep data controls"
            : "Qualified support"}
        </h2>
        <button
          type="button"
          className="focus-ring grid h-11 w-11 place-items-center rounded-full"
          aria-label="Close dialog"
          onClick={() => setPanel(null)}
        >
          <X />
        </button>
      </div>
      {panel === "manual" ? (
        <form
          onChange={(event) => {
            const form = event.currentTarget;
            setValid(
              Boolean(
                (form.elements.namedItem("date") as HTMLInputElement)?.value &&
                  (form.elements.namedItem("bedtime") as HTMLInputElement)
                    ?.value &&
                  (form.elements.namedItem("wake") as HTMLInputElement)?.value
              )
            );
          }}
          onSubmit={(event) => {
            event.preventDefault();
            setStatus("Manual sleep log saved locally.");
            setPanel(null);
          }}
          className="mt-4 space-y-3"
        >
          {[
            ["date", "Date", "date"],
            ["bedtime", "Bedtime", "time"],
            ["wake", "Wake time", "time"],
          ].map(([name, label, type]) => (
            <label key={name} className="block text-[13px] text-paper-100/75">
              {label}
              <input
                name={name}
                type={type}
                className="focus-ring mt-1 min-h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 text-[16px] text-paper-100"
              />
            </label>
          ))}
          <fieldset>
            <legend className="text-[13px] text-paper-100/75">
              Sleep quality
            </legend>
            <div className="mt-2 flex gap-2">
              {["Restless", "Okay", "Restored"].map((value) => (
                <label
                  key={value}
                  className="focus-within:ring-2 focus-within:ring-brand-orange flex min-h-11 flex-1 items-center justify-center rounded-xl border border-white/15 text-[12px] text-paper-100"
                >
                  <input
                    type="radio"
                    name="quality"
                    value={value}
                    className="sr-only"
                  />
                  {value}
                </label>
              ))}
            </div>
          </fieldset>
          <BtnPrimary className="w-full" disabled={!valid}>
            Save sleep log
          </BtnPrimary>
        </form>
      ) : panel === "data" ? (
        <>
          <p className="mt-3 text-[13px] leading-5 text-paper-100/75">
            Health · WHOOP wearable and manual logs · sleep only · synced 2h ago
            · provider-backed values high confidence · 90-day rolling retention.
          </p>
          <ConsentRail controls={FULL_DATA_CONTROLS} />
        </>
      ) : (
        <>
          <p className="mt-3 text-[14px] leading-6 text-paper-100/80">
            If sleep loss feels unsafe or severe, contact a qualified local
            health professional or emergency service. Balencia does not diagnose
            or place calls.
          </p>
          <BtnPrimary
            className="mt-4 w-full"
            onClick={() =>
              setStatus(
                "Local support directory preview selected. No call or external navigation occurred."
              )
            }
          >
            View local support guidance
          </BtnPrimary>
        </>
      )}
    </E1Modal>
  ) : undefined;
  return (
    <HifiShell
      atmosphere="cia"
      activeTab="today"
      header={
        <TopBar
          title={
            <>
              Sleep <span className="text-emphasis">tracking</span>
            </>
          }
          right={<Chip tone="you">Lv 12</Chip>}
        />
      }
      overlay={overlay}
    >
      <main
        data-f2-state={`58-${fixture}`}
        className="space-y-4 px-4 pb-8 pt-3"
      >
        {fixture === "range-14d" && (
          <Chip tone="you">14-day sleep range selected</Chip>
        )}
        <CIAInsightCard
          eyebrow="CIA insight"
          provenance={
            manualOnly
              ? ["Manual duration only", "No wearable evidence"]
              : low
              ? ["Partial wearable sync", "Estimated · low confidence"]
              : empty
              ? ["Not enough data"]
              : ["WHOOP · 2h ago", "Health · high confidence"]
          }
          actions={
            <BtnSecondary onClick={() => setPanel("data")}>
              <Database />
              Data sources
            </BtnSecondary>
          }
        >
          {manualOnly
            ? "Your manual duration is saved. CIA needs more nights or provider evidence before identifying a pattern."
            : empty
            ? "Log more sleep before CIA can identify a pattern."
            : low
            ? "Recent logs are incomplete, so no stage or recovery claim is shown."
            : "A later session coincided with a shorter night. This is an observation, not a diagnosis."}
        </CIAInsightCard>
        <SafetyCard
          title="Sleep support"
          description="Qualified support guidance remains available offline."
        />
        <BtnGhost className="w-full" onClick={() => setPanel("safety")}>
          <ShieldCheck />
          Open sleep support
        </BtnGhost>
        {skeleton ? (
          <SolidCard aria-label="Sleep data loading" className="space-y-3">
            <div className="h-32 animate-pulse rounded-full bg-white/[0.05] motion-reduce:animate-none" />
            <div className="h-20 animate-pulse rounded-xl bg-white/[0.04] motion-reduce:animate-none" />
          </SolidCard>
        ) : (
          <>
            {(fixture === "sync-error-cached" || fixture === "offline") && (
              <SolidCard>
                <p role="status" className="font-semibold text-paper-100">
                  {fixture === "offline"
                    ? "Offline · cached sleep summary"
                    : "Wearable sync failed · cached values shown"}
                </p>
                <p className="mt-1 text-[13px] text-paper-100/70">
                  Last defensible provider read: 2h ago. Missing nights remain
                  gaps.
                </p>
              </SolidCard>
            )}
            <GlassCard tone="you">
              <div className="flex justify-between">
                <div>
                  <p className="text-[12px] uppercase tracking-wider text-paper-100/65">
                    Last night
                  </p>
                  <h2 className="mt-1 text-[20px] font-semibold text-paper-100">
                    Sleep summary
                  </h2>
                </div>
                <Chip>{manualOnly ? "Manual log" : "Via wearable"}</Chip>
              </div>
              <div className="mt-4 flex justify-center">
                <ProgressRing
                  percent={empty || manualOnly ? 0 : low ? 78 : 82}
                  value={empty || manualOnly ? "---" : low ? "~78" : "82"}
                  label={
                    manualOnly
                      ? "No provider-backed sleep score"
                      : empty
                      ? "Not enough data yet"
                      : "Sleep score"
                  }
                  size={118}
                  tone="you"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-[12px] text-paper-100/65">Duration</p>
                  <p className="text-[18px] font-semibold text-paper-100">
                    {empty ? "-- hrs" : low ? "~7.0 hrs" : "7.2 hrs"}
                  </p>
                </div>
                {!manualOnly && !empty && (
                  <div>
                    <p className="text-[12px] text-paper-100/65">Recovery</p>
                    <p className="text-[18px] font-semibold text-paper-100">
                      {low ? "Not shown" : "64%"}
                    </p>
                  </div>
                )}
              </div>
              {!manualOnly && (
                <div className="mt-4">
                  <ChargeMeter
                    filled={empty ? 0 : 3}
                    ticks={4}
                    label={
                      empty
                        ? "Sleep reserve unavailable"
                        : "Sleep reserve, 3 of 4"
                    }
                  />
                </div>
              )}
              <Provenance
                items={[
                  manualOnly
                    ? "Manual duration · today"
                    : "WHOOP · synced 2h ago",
                ]}
              />
            </GlassCard>
            {!manualOnly && !empty && !low && (
              <div className="grid grid-cols-2 gap-3">
                <SolidCard>
                  <h3 className="font-semibold text-paper-100">Sleep stages</h3>
                  <p className="mt-2 text-[13px] text-paper-100/75">
                    REM 1h 20m
                    <br />
                    Deep 1h 10m
                  </p>
                  <p className="mt-2 text-[11px] text-paper-100/65">
                    Provider-backed · WHOOP
                  </p>
                </SolidCard>
                <SolidCard>
                  <h3 className="font-semibold text-paper-100">Consistency</h3>
                  <p className="mt-2 text-[13px] text-paper-100/75">
                    5 of 7 within 30 min
                  </p>
                  <div
                    role="img"
                    aria-label="Seven nights: five bedtime and wake pairs within 30 minutes, two outside"
                    className="mt-3 grid grid-cols-7 gap-1"
                  >
                    {[1, 1, 1, 0, 1, 1, 0].map((value, i) => (
                      <span
                        key={i}
                        className={`h-10 rounded-full ${
                          value ? "bg-domain-sleep/70" : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </SolidCard>
              </div>
            )}
            {(manualOnly || empty || low) && (
              <SolidCard>
                <h3 className="font-semibold text-paper-100">Consistency</h3>
                <p className="mt-2 text-[13px] text-paper-100/70">
                  {empty
                    ? "More data needed. Log sleep over a week to spot your rhythm."
                    : low
                    ? "Fewer than seven nights · low confidence."
                    : "Manual duration and quality only. Stages and recovery are hidden."}
                </p>
              </SolidCard>
            )}
            <div>
              <div className="flex items-center justify-between">
                <SectionTitle title="Duration trend" />
                <div
                  role="tablist"
                  aria-label="Sleep trend range"
                  className="flex gap-1"
                >
                  {["7d", "14d", "30d"].map((value) => (
                    <button
                      key={value}
                      type="button"
                      role="tab"
                      aria-selected={range === value}
                      onClick={() => {
                        setRange(value);
                        setStatus(`${value} sleep range selected locally.`);
                      }}
                      className={`focus-ring min-h-11 rounded-full px-3 text-[13px] ${
                        range === value
                          ? "bg-brand-orange text-ink-900"
                          : "border border-white/15 text-paper-100/75"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
              <SolidCard className="mt-2">
                <div
                  role="img"
                  aria-label={`${range} sleep duration trend: six logged nights and one missing gap, never zero or interpolated`}
                  className="grid h-28 grid-cols-7 items-end gap-2"
                >
                  {[68, 72, 65, null, 75, 80, 72].map((value, i) =>
                    value === null ? (
                      <span
                        key={i}
                        className="h-full rounded-xl border border-dashed border-white/20"
                        aria-label="Missing night"
                      />
                    ) : (
                      <span
                        key={i}
                        style={{ height: `${value}%` }}
                        className="rounded-xl bg-brand-orange/60"
                      />
                    )
                  )}
                </div>
                <p className="mt-3 text-[12px] text-paper-100/70">
                  Six logged nights · one missing gap · no zero or
                  interpolation.
                </p>
              </SolidCard>
            </div>
            <SolidCard>
              <h3 className="font-semibold text-paper-100">
                30-night quality record
              </h3>
              <div
                role="img"
                aria-label="Thirty nights: measured quality cells, manual entries, and five missing ghost cells"
                className="mt-3 grid grid-cols-10 gap-1"
              >
                {Array.from({ length: 30 }, (_, i) => (
                  <span
                    key={i}
                    className={`h-5 rounded ${
                      [7, 12, 19, 24, 28].includes(i)
                        ? "border border-dashed border-white/20"
                        : i % 4 === 0
                        ? "bg-domain-sleep/45"
                        : "bg-domain-sleep/75"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-2 text-[11px] text-paper-100/65">
                Solid = provider/manual quality · dashed = missing.
              </p>
            </SolidCard>
          </>
        )}
        <BtnPrimary
          className="w-full"
          disabled={fixture === "offline"}
          onClick={() => setPanel("manual")}
        >
          <Moon />
          Log sleep manually
        </BtnPrimary>
        <p role="status" className="text-[12px] leading-5 text-paper-100/70">
          {status}
        </p>
        <ConsentRail compact controls={FULL_DATA_CONTROLS} />
      </main>
    </HifiShell>
  );
}
