"use client";

import { useEffect, useState } from "react";
import { Check, Plus, RefreshCw, ShieldCheck, X } from "lucide-react";
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  Chip,
  CIAInsightCard,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassCard,
  HifiShell,
  PaywallLock,
  ProgressRing,
  Provenance,
  SolidCard,
  TopBar,
} from "@/components/hifi/kit";
import { E1Modal } from "../intelligence/E1Modal";

type Dose = {
  id: number;
  name: string;
  amount: string;
  due: string;
  done: boolean;
};
const BASE: Dose[] = [
  {
    id: 1,
    name: "Daily support A",
    amount: "Dose A",
    due: "08:00 AM",
    done: true,
  },
  {
    id: 2,
    name: "Daily support B",
    amount: "Dose B",
    due: "12:00 PM",
    done: true,
  },
  {
    id: 3,
    name: "Daily support A",
    amount: "Dose A",
    due: "04:00 PM",
    done: true,
  },
  {
    id: 4,
    name: "Daily support C",
    amount: "Dose C",
    due: "09:00 PM",
    done: false,
  },
];

export function S60MedicationTracking() {
  const [fixture, setFixture] = useState("default-real");
  const [doses, setDoses] = useState(BASE);
  const [panel, setPanel] = useState<"add" | "data" | null>(null);
  const [valid, setValid] = useState(false);
  const [status, setStatus] = useState(
    "Demo schedule only. No health provider, pharmacy, account, storage, payment, or network capability is active."
  );
  useEffect(() => {
    const value =
      new URLSearchParams(window.location.search).get("state") ??
      "default-real";
    queueMicrotask(() => {
      setFixture(value);
      if (value === "all-doses-complete" || value === "dose-success")
        setDoses(BASE.map((dose) => ({ ...dose, done: true })));
      if (value === "honest-null") setDoses([]);
      if (value === "add-disabled" || value === "add-valid") {
        setPanel("add");
        setValid(value === "add-valid");
      }
      if (value === "data-controls") setPanel("data");
    });
  }, []);
  const complete = doses.filter((dose) => dose.done).length;
  const percent = doses.length
    ? Math.round((complete / doses.length) * 100)
    : 0;
  const low = fixture === "roster-low-confidence";
  const overlay = panel ? (
    <E1Modal
      label={
        panel === "add" ? "Add demo medication" : "Medication data controls"
      }
      onClose={() => setPanel(null)}
      className="!bg-ink-900 border border-white/15"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-semibold text-paper-100">
          {panel === "add"
            ? "Add demo schedule item"
            : "Medication data controls"}
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
      {panel === "add" ? (
        <form
          onChange={(event) => {
            const form = event.currentTarget;
            setValid(
              Boolean(
                (form.elements.namedItem("name") as HTMLInputElement)?.value &&
                  (form.elements.namedItem("dose") as HTMLInputElement)
                    ?.value &&
                  (form.elements.namedItem("time") as HTMLInputElement)?.value
              )
            );
          }}
          onSubmit={(event) => {
            event.preventDefault();
            setStatus(
              "Demo schedule item added locally. Follow your prescribed label; no recommendation was made."
            );
            setPanel(null);
          }}
          className="mt-4 space-y-3"
        >
          {[
            ["name", "Fictional item name", "Daily support D"],
            ["dose", "Dose label", "Dose D"],
            ["time", "Due time", "09:00 AM"],
          ].map(([name, label, placeholder]) => (
            <label key={name} className="block text-[13px] text-paper-100/75">
              {label}
              <input
                name={name}
                defaultValue={fixture === "add-valid" ? placeholder : ""}
                placeholder={placeholder}
                className="focus-ring mt-1 min-h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 text-[16px] text-paper-100"
              />
            </label>
          ))}
          <p className="text-[12px] leading-5 text-paper-100/70">
            Required: neutral name, non-clinical dose label, and time. This
            local preview cannot replace a prescribed label.
          </p>
          <BtnPrimary className="w-full" disabled={!valid}>
            Save demo item
          </BtnPrimary>
        </form>
      ) : (
        <>
          <p className="mt-3 text-[13px] leading-5 text-paper-100/75">
            Health · member-entered demo schedule · today and 4-week history ·
            refreshed locally today · explicit logs high confidence · retained
            until deleted.
          </p>
          <ConsentRail controls={FULL_DATA_CONTROLS} />
          <div className="mt-4 grid grid-cols-2 gap-2">
            <BtnSecondary
              onClick={() =>
                setStatus(
                  "Revoke confirmation preview opened; no data changed."
                )
              }
            >
              Confirm revoke
            </BtnSecondary>
            <BtnSecondary
              onClick={() =>
                setStatus(
                  "Delete confirmation preview opened; no data changed."
                )
              }
            >
              Confirm delete
            </BtnSecondary>
          </div>
        </>
      )}
    </E1Modal>
  ) : undefined;
  return (
    <HifiShell
      header={
        <TopBar
          title="Medication tracking"
          right={
            <button
              type="button"
              onClick={() => {
                setPanel("add");
                setValid(false);
              }}
              className="focus-ring grid h-11 w-11 place-items-center rounded-full text-paper-100"
              aria-label="Add medication"
            >
              <Plus />
            </button>
          }
        />
      }
      activeTab="today"
      showTabBar={false}
      atmosphere="you"
      overlay={overlay}
    >
      <main
        data-f2-state={`60-${fixture}`}
        className="space-y-4 px-4 pb-8 pt-3"
      >
        <SolidCard className="border-l-2 border-forest-green">
          <div className="flex gap-3">
            <ShieldCheck className="shrink-0 text-forest-green" />
            <div>
              <p className="font-semibold text-paper-100">Schedule safety</p>
              <p className="mt-1 text-[13px] leading-5 text-paper-100/75">
                Demo schedule only. Follow your prescribed label and clinician
                guidance; Balencia does not recommend changing or skipping a
                dose.
              </p>
            </div>
          </div>
        </SolidCard>
        {fixture === "dose-success" && (
          <Chip tone="done">Latest dose marked complete just now</Chip>
        )}
        {fixture === "all-doses-complete" && (
          <Chip tone="done">
            Today&apos;s four demo dose events are complete
          </Chip>
        )}
        {fixture === "skeleton" ? (
          <SolidCard
            aria-label="Medication schedule loading"
            className="space-y-3"
          >
            <div className="mx-auto h-28 w-28 animate-pulse rounded-full bg-white/[0.05] motion-reduce:animate-none" />
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-14 animate-pulse rounded-xl bg-white/[0.04] motion-reduce:animate-none"
              />
            ))}
          </SolidCard>
        ) : (
          <>
            <GlassCard tone={percent === 100 ? "done" : "you"}>
              <div className="flex flex-col items-center">
                <p className="text-[14px] text-paper-100/75">
                  Daily <span className="text-emphasis">tracking</span>
                </p>
                <ProgressRing
                  percent={percent}
                  value={`${percent}%`}
                  label={
                    doses.length
                      ? `${complete} of ${doses.length} doses today`
                      : "No medications tracked yet"
                  }
                  size={104}
                  tone={percent === 100 ? "done" : "you"}
                />
                <Provenance items={["You logged · local demo"]} />
              </div>
            </GlassCard>
            {fixture === "free-paywall" ? (
              <PaywallLock
                title="CIA schedule context"
                description="Pattern context is a premium information preview. Your schedule and safety guidance remain available."
                action={
                  <BtnPrimary
                    onClick={() =>
                      setStatus(
                        "Premium information preview selected locally. No checkout or payment occurred."
                      )
                    }
                  >
                    View premium details
                  </BtnPrimary>
                }
              >
                <CIAInsightCard>
                  Three of four explicit demo events are complete.
                </CIAInsightCard>
              </PaywallLock>
            ) : (
              <CIAInsightCard
                eyebrow="CIA coach"
                provenance={["Explicit local logs"]}
                actions={
                  <BtnGhost
                    onClick={() =>
                      setStatus(
                        "CIA information preview opened locally. No health advice or message was generated."
                      )
                    }
                  >
                    How CIA uses this
                  </BtnGhost>
                }
              >
                {doses.length === 0
                  ? "Tracking a schedule can add context, but Balencia does not recommend medication changes."
                  : percent === 100
                  ? "All four demo schedule events are marked complete."
                  : "Three of four demo schedule events are marked complete."}
              </CIAInsightCard>
            )}
            {doses.length === 0 ? (
              <SolidCard className="py-8 text-center">
                <p className="text-[18px] font-semibold text-paper-100">
                  No medications tracked yet
                </p>
                <p className="mt-2 text-[13px] text-paper-100/70">
                  Add your first neutral demo schedule item below.
                </p>
                <BtnPrimary className="mt-4" onClick={() => setPanel("add")}>
                  Add demo item
                </BtnPrimary>
              </SolidCard>
            ) : (
              <section>
                <h2 className="text-[12px] font-semibold uppercase tracking-wider text-paper-100/65">
                  Today · 4 dose events
                </h2>
                <SolidCard className="mt-2 p-0">
                  <div className="divide-y divide-white/[0.06]">
                    {doses.map((dose) => (
                      <label
                        key={dose.id}
                        className="focus-within:ring-2 focus-within:ring-brand-orange flex min-h-[68px] items-center gap-3 p-3"
                      >
                        <input
                          type="checkbox"
                          checked={dose.done}
                          onChange={() => {
                            setDoses((current) =>
                              current.map((value) =>
                                value.id === dose.id
                                  ? { ...value, done: !value.done }
                                  : value
                              )
                            );
                            setStatus(
                              `${dose.name}, ${dose.amount}, due ${dose.due} ${
                                dose.done
                                  ? "restored to pending"
                                  : "marked complete"
                              } locally.`
                            );
                          }}
                          className="peer sr-only"
                          aria-label={`${dose.name}, ${dose.amount}, due ${
                            dose.due
                          }, ${dose.done ? "complete" : "pending"}`}
                        />
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/20 peer-checked:border-forest-green peer-checked:bg-forest-green/20">
                          {dose.done && <Check className="text-forest-green" />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <strong className="block text-[15px] text-paper-100">
                            {dose.name}
                          </strong>
                          <span className="text-[12px] text-paper-100/70">
                            {dose.amount} · due {dose.due} ·{" "}
                            {dose.done ? "Complete" : "Pending"}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </SolidCard>
              </section>
            )}
            {fixture === "heatmap-error-cached" ? (
              <SolidCard>
                <p role="alert" className="font-semibold text-paper-100">
                  Could not refresh 4-week history
                </p>
                <p className="mt-1 text-[13px] text-paper-100/70">
                  Today&apos;s explicit schedule remains available from the
                  local fixture.
                </p>
                <BtnSecondary
                  className="mt-3"
                  onClick={() =>
                    setStatus(
                      "History retry preview completed locally; no network request occurred."
                    )
                  }
                >
                  <RefreshCw />
                  Retry history
                </BtnSecondary>
              </SolidCard>
            ) : (
              doses.length > 0 && (
                <SolidCard>
                  <div className="flex justify-between">
                    <h2 className="font-semibold text-paper-100">
                      Adherence history
                    </h2>
                    <Chip>4 weeks · 28 days</Chip>
                  </div>
                  <div
                    role="img"
                    aria-label="Twenty-eight day adherence history: 20 complete, 5 partial, 3 missing days"
                    className="mt-4 grid grid-cols-7 gap-2"
                  >
                    {Array.from({ length: 28 }, (_, i) => (
                      <span
                        key={i}
                        aria-label={`Day ${i + 1}: ${
                          i % 9 === 0
                            ? "missing"
                            : i % 5 === 0
                            ? "partial"
                            : "complete"
                        }`}
                        className={`h-7 rounded-md ${
                          i % 9 === 0
                            ? "border border-dashed border-white/20"
                            : i % 5 === 0
                            ? "bg-brand-orange/55"
                            : "bg-forest-green/70"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-3 text-[12px] text-paper-100/70">
                    20 complete · 5 partial · 3 missing. Color is paired with
                    this text summary.
                  </p>
                </SolidCard>
              )
            )}
            {doses.length > 0 && (
              <SolidCard>
                <div className="flex justify-between">
                  <h2 className="font-semibold text-paper-100">
                    All medications
                  </h2>
                  <Chip>
                    {new Set(doses.map((dose) => dose.name)).size} fictional
                    items · {doses.length} dose events
                  </Chip>
                </div>
                {[...new Set(doses.map((dose) => dose.name))].map((name) => (
                  <div
                    key={name}
                    className="mt-3 flex justify-between border-t border-white/[0.06] pt-3 text-[14px]"
                  >
                    <span className="text-paper-100">{name}</span>
                    <span className="text-paper-100/70">
                      {low ? "Estimated · low confidence" : "You logged"}
                    </span>
                  </div>
                ))}
              </SolidCard>
            )}
          </>
        )}
        <p role="status" className="text-[12px] leading-5 text-paper-100/70">
          {status}
        </p>
        <BtnSecondary className="w-full" onClick={() => setPanel("data")}>
          Medication data controls
        </BtnSecondary>
        <ConsentRail compact controls={FULL_DATA_CONTROLS} />
      </main>
    </HifiShell>
  );
}
