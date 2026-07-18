"use client";

import { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  ArcGauge,
  Chip,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassCard,
  HifiShell,
  IconButton,
  PaywallLock,
  Provenance,
  SafetyCard,
  SectionTitle,
  SolidCard,
  Sparkline,
  TopBar,
} from "@/components/hifi/kit";

const states = [
  "premium-real",
  "free-preview",
  "low-confidence",
  "honest-null",
  "skeleton",
  "error",
  "success",
  "offline",
  "disabled",
  "data-controls",
] as const;
type ScreenState = (typeof states)[number];
function ImpactBarRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "green" | "orange";
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[12px] text-white/65">
        <span>{label}</span>
        <span>{value}% observed</span>
      </div>
      <div className="h-2 rounded-pill bg-white/10">
        <div
          className={`h-full rounded-pill ${
            tone === "green" ? "bg-forest-green" : "bg-brand-orange"
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
function Analytics() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white/[.04] p-3">
          <p className="text-[11px] text-white/45">Peak hours</p>
          <p className="text-[13px] font-semibold text-white">9–11am</p>
        </div>
        <div className="rounded-xl bg-white/[.04] p-3">
          <p className="text-[11px] text-white/45">Chronotype</p>
          <p className="text-[13px] font-semibold text-white">
            Morning leaning
          </p>
        </div>
      </div>
      <ImpactBarRow label="Movement days" value={72} tone="green" />
      <ImpactBarRow label="Short-sleep days" value={41} tone="orange" />
    </div>
  );
}

export function S63EnergyTracking() {
  const [state, setState] = useState<ScreenState>("premium-real");
  const [energy, setEnergy] = useState(7.5);
  const [context, setContext] = useState("Morning");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    const seeded = new URLSearchParams(window.location.search).get("state");
    queueMicrotask(() => {
      if ((states as readonly string[]).includes(seeded ?? "")) {
        const next = seeded as ScreenState;
        setState(next);
        if (next === "success") {
          setEnergy(8);
          setStatus("Energy logged locally. Timeline updated.");
        }
      }
    });
  }, []);
  const nullState = state === "honest-null";
  const low = state === "low-confidence";
  const submit = () =>
    setStatus(
      state === "offline"
        ? "Queued locally · offline. No network request made."
        : state === "error"
        ? "Could not log energy. Retry locally."
        : "Energy logged locally. Timeline updated."
    );
  return (
    <div data-f2-state={`63-${state}`} data-energy-state={state}>
      <HifiShell
        header={
          <TopBar
            title="Energy tracking"
            right={
              <IconButton
                label="Options"
                onClick={() =>
                  setStatus("Energy options preview opened locally.")
                }
              >
                <MoreHorizontal size={18} />
              </IconButton>
            }
          />
        }
        activeTab="me"
      >
        <main className="space-y-4 px-4 pb-5 pt-3">
          {state === "error" && <Chip>Energy log retry required</Chip>}
          <Chip tone="you">
            {state === "free-preview" ? "Free" : "Premium"}
          </Chip>
          {state === "skeleton" ? (
            <GlassCard>
              <div
                className="h-44 animate-pulse rounded-[30px] bg-white/[.05]"
                aria-label="Loading energy"
              />
            </GlassCard>
          ) : (
            <GlassCard>
              <p className="text-[12px] font-semibold uppercase text-white/45">
                Current energy
              </p>
              <ArcGauge
                value={nullState ? "--" : low ? "~7" : String(energy)}
                label={
                  nullState
                    ? "No energy logged today"
                    : low
                    ? "Estimated · low confidence"
                    : "You logged"
                }
              />
              <Provenance
                items={[
                  nullState
                    ? "No log yet"
                    : low
                    ? "Estimated · low confidence"
                    : state === "offline"
                    ? "Cached · 2h ago"
                    : "You logged · fresh now",
                ]}
              />
            </GlassCard>
          )}
          <SolidCard>
            <SectionTitle title="Quick log" />
            <label
              className="mt-3 block text-[12px] text-white/65"
              htmlFor="energy-range"
            >
              Energy level {energy}
            </label>
            <input
              id="energy-range"
              aria-label="Energy level"
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={energy}
              onChange={(e) => setEnergy(Number(e.currentTarget.value))}
              className="h-11 w-full accent-brand-orange"
            />
            <div className="flex flex-wrap gap-2">
              {["Morning", "Post-workout", "Post-meal"].map((item) => (
                <Chip
                  key={item}
                  interactive
                  pressed={context === item}
                  onClick={() => setContext(item)}
                >
                  {item}
                </Chip>
              ))}
            </div>
            <label className="glass-pill mt-3 flex min-h-[52px] items-center px-4 focus-within:shadow-[var(--focus-ring)]">
              <span className="sr-only">Energy note</span>
              <input
                aria-label="Energy note"
                placeholder="How are you feeling? Optional"
                value={note}
                onChange={(e) => setNote(e.currentTarget.value)}
                className="h-11 min-w-0 flex-1 bg-transparent text-[16px] text-paper-100 outline-none"
              />
            </label>
            <button
              type="button"
              disabled={state === "disabled"}
              onClick={submit}
              className="focus-ring mt-3 min-h-12 w-full rounded-pill bg-brand-orange px-4 font-semibold text-white disabled:opacity-40"
            >
              Log energy
            </button>
            {state === "disabled" && (
              <p className="mt-2 text-[12px] text-white/60">
                You logged recently. Next log available in 8m.
              </p>
            )}
            {status && (
              <p role="status" className="mt-2 text-[12px] text-white/70">
                {status}
                {state === "error" && (
                  <button
                    type="button"
                    onClick={submit}
                    className="focus-ring ml-2 min-h-11 rounded-pill px-3 text-brand-orange"
                  >
                    Retry
                  </button>
                )}
              </p>
            )}
          </SolidCard>
          <SectionTitle
            title="Today energy"
            meta={nullState ? "Avg --" : low ? "~6 · estimated" : "Avg 6.2"}
          />
          <SolidCard>
            {nullState ? (
              <p className="text-[13px] text-white/60">
                Log today to see your timeline.
              </p>
            ) : (
              <>
                <Sparkline />
                <p className="mt-3 text-[13px] text-white/55">
                  {low
                    ? "About 5 logs · sync pending"
                    : "5 logs today · synced locally"}
                </p>
              </>
            )}
          </SolidCard>
          {state === "free-preview" ? (
            <PaywallLock
              title="Premium energy patterns"
              description="See your observed peak windows and cross-domain patterns."
              action={
                <button
                  type="button"
                  onClick={() => setStatus("Premium preview selected locally.")}
                  className="focus-ring min-h-11 rounded-pill bg-brand-orange px-4 text-[13px] font-semibold text-white"
                >
                  Unlock with premium
                </button>
              }
            >
              <Analytics />
            </PaywallLock>
          ) : (
            !nullState && (
              <SolidCard>
                <SectionTitle title="Energy patterns" />
                <Analytics />
              </SolidCard>
            )
          )}
          <GlassCard tone="cia">
            <p className="text-[14px] leading-5 text-white">
              CIA observed higher energy alongside movement and breakfast logs
              across 12 mornings in the last 30 days. App logs · fresh today ·
              medium confidence · correlation, not causation.
            </p>
          </GlassCard>
          <SafetyCard />
          {state === "data-controls" ? (
            <SolidCard>
              <SectionTitle title="Energy data controls" />
              <p className="mt-2 text-[12px] text-white/60">
                Health category · member logs · today and 30-day observations ·
                fresh today · confidence shown.
              </p>
              <ConsentRail controls={FULL_DATA_CONTROLS} />
            </SolidCard>
          ) : (
            <ConsentRail compact controls={FULL_DATA_CONTROLS} />
          )}
        </main>
      </HifiShell>
    </div>
  );
}
