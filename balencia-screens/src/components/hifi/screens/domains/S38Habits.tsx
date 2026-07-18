"use client";

import { useEffect, useState } from "react";
import { Bell, Clock, Plus, Settings } from "lucide-react";
import { E1Modal } from "../intelligence/E1Modal";
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  Chip,
  CIAInsightCard,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassCard,
  HeatGrid,
  HifiShell,
  IconButton,
  ProgressBar,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
} from "@/components/hifi/kit";

const allowed = new Set([
  "today-real",
  "week",
  "month",
  "low-confidence",
  "honest-null",
  "skeleton",
  "error-cached",
  "offline",
  "check-success",
  "reminder-disabled",
  "add-habit",
  "data-controls",
  "cia-detail",
]);
const initial = [
  {
    id: "water",
    name: "Drink water",
    time: "07:30",
    domain: "Wellbeing",
    done: true,
  },
  {
    id: "stretch",
    name: "Stretch",
    time: "08:00",
    domain: "Fitness",
    done: true,
  },
  {
    id: "walk",
    name: "Walk 10 min",
    time: "Due now",
    domain: "Fitness",
    done: false,
  },
  {
    id: "work",
    name: "Deep work block",
    time: "14:00",
    domain: "Career",
    done: false,
  },
];

export function S38Habits() {
  const [fixture, setFixture] = useState("today-real");
  const [tab, setTab] = useState<"today" | "week" | "month">(
    fixture === "week" ? "week" : fixture === "month" ? "month" : "today"
  );
  const [habits, setHabits] = useState(initial);
  const [status, setStatus] = useState(
    fixture === "check-success"
      ? "Walk 10 min completed locally. Undo available."
      : ""
  );
  const [overlay, setOverlay] = useState<string | null>(
    fixture === "add-habit"
      ? "add"
      : fixture === "data-controls"
      ? "data"
      : fixture === "cia-detail"
      ? "cia"
      : null
  );
  const [name, setName] = useState("");
  useEffect(() => {
    const value =
      new URLSearchParams(window.location.search).get("state") ?? "today-real";
    const next = allowed.has(value) ? value : "today-real";
    queueMicrotask(() => {
      setFixture(next);
      setTab(next === "week" ? "week" : next === "month" ? "month" : "today");
      setStatus(
        next === "check-success"
          ? "Walk 10 min completed locally. Undo available."
          : ""
      );
      setOverlay(
        next === "add-habit"
          ? "add"
          : next === "data-controls"
          ? "data"
          : next === "cia-detail"
          ? "cia"
          : null
      );
    });
  }, []);
  const empty = fixture === "honest-null",
    low = fixture === "low-confidence",
    offline = fixture === "offline";
  const completed = empty ? 0 : fixture === "check-success" ? 6 : 5;
  const total = empty ? 0 : 8;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const toggle = (id: string) => {
    setHabits(habits.map((h) => (h.id === id ? { ...h, done: !h.done } : h)));
    const h = habits.find((x) => x.id === id);
    setStatus(
      `${h?.name} ${
        h?.done ? "reopened" : "completed"
      } locally. Undo available.`
    );
  };
  return (
    <HifiShell
      header={
        <TopBar
          title="Habits"
          back
          right={
            <div className="flex gap-1">
              <IconButton
                label="Reminders"
                disabled={fixture === "reminder-disabled"}
                title={
                  fixture === "reminder-disabled"
                    ? "Reminder permission is unavailable in this prototype"
                    : undefined
                }
                onClick={() =>
                  setStatus(
                    "Reminder preview only. No notification permission requested."
                  )
                }
              >
                <Bell size={19} />
              </IconButton>
              <IconButton
                label="Habit settings"
                onClick={() => setOverlay("data")}
              >
                <Settings size={19} />
              </IconButton>
            </div>
          }
        />
      }
      activeTab="today"
      bottomAction={
        <BtnPrimary
          className="w-full"
          disabled={fixture === "reminder-disabled"}
          onClick={() => setOverlay("add")}
        >
          <Plus size={18} />
          Add habit
        </BtnPrimary>
      }
      overlay={
        overlay && (
          <E1Modal
            onClose={() => setOverlay(null)}
            label={
              overlay === "add"
                ? "Add habit"
                : overlay === "cia"
                ? "Habit association detail"
                : "Habit data controls"
            }
          >
            <div className="w-full rounded-[28px] border border-white/10 bg-ink-900 p-5">
              <h2 className="text-xl text-white">
                {overlay === "add"
                  ? "Add habit"
                  : overlay === "cia"
                  ? "Sleep and stretch association"
                  : "Habit data controls"}
              </h2>
              {overlay === "add" ? (
                <div className="mt-4 space-y-3">
                  <label className="block text-sm text-white/70">
                    Habit name
                    <input
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 h-12 w-full rounded-xl bg-white/10 px-3 text-white"
                    />
                  </label>
                  <label className="block text-sm text-white/70">
                    Recurrence
                    <select className="mt-1 h-12 w-full rounded-xl bg-white/10 px-3 text-white">
                      <option>Daily</option>
                      <option>Weekdays</option>
                    </select>
                  </label>
                  <label className="block text-sm text-white/70">
                    Domain
                    <select className="mt-1 h-12 w-full rounded-xl bg-white/10 px-3 text-white">
                      <option>Wellbeing</option>
                      <option>Fitness</option>
                      <option>Career</option>
                    </select>
                  </label>
                  <BtnPrimary
                    disabled={!name.trim()}
                    onClick={() => {
                      setHabits([
                        ...habits,
                        {
                          id: "new",
                          name,
                          time: "09:00",
                          domain: "Wellbeing",
                          done: false,
                        },
                      ]);
                      setStatus(`${name} added locally.`);
                      setOverlay(null);
                    }}
                  >
                    Save habit
                  </BtnPrimary>
                </div>
              ) : overlay === "cia" ? (
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-white/75">
                    Observed association, not causation.
                  </p>
                  <p className="text-sm text-white/60">
                    Window: past 28 days · sample: 12 stretch days · fresh today
                    · medium confidence.
                  </p>
                  <p className="text-sm text-white/60">
                    Sources: local Wellbeing sleep check-ins and Fitness habit
                    completions.
                  </p>
                  <div className="flex gap-2">
                    <BtnSecondary
                      onClick={() => {
                        setStatus("Association corrected locally.");
                        setOverlay(null);
                      }}
                    >
                      Correct
                    </BtnSecondary>
                    <BtnGhost
                      onClick={() => {
                        setStatus("Association dismissed locally.");
                        setOverlay(null);
                      }}
                    >
                      Dismiss
                    </BtnGhost>
                  </div>
                  <ConsentRail controls={FULL_DATA_CONTROLS} />
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-white/65">
                    Habit, reminder, sleep-derived, and CIA preview data remain
                    local.
                  </p>
                  <ConsentRail controls={FULL_DATA_CONTROLS} />
                  <BtnSecondary
                    onClick={() =>
                      setStatus("Habit export preview prepared locally.")
                    }
                  >
                    Export
                  </BtnSecondary>
                  <BtnGhost
                    onClick={() =>
                      setStatus("CIA association scope revoked locally.")
                    }
                  >
                    Revoke CIA analysis
                  </BtnGhost>
                </div>
              )}
              <BtnGhost className="mt-3" onClick={() => setOverlay(null)}>
                Close
              </BtnGhost>
            </div>
          </E1Modal>
        )
      }
    >
      <main
        data-g1-state={`38-${fixture}`}
        className="space-y-5 px-4 pb-6 pt-3"
      >
        {fixture === "skeleton" ? (
          <div
            aria-label="Loading habits"
            className="space-y-3 animate-pulse motion-reduce:animate-none"
          >
            <div className="h-36 rounded-[28px] bg-white/10" />
            <div className="h-12 rounded-2xl bg-white/10" />
            <div className="h-48 rounded-[28px] bg-white/10" />
          </div>
        ) : (
          <>
            {(fixture === "error-cached" || offline) && (
              <SolidCard className="p-4">
                <p className="font-medium text-white">
                  {offline
                    ? "Offline — checks queue locally"
                    : "Could not refresh habit history"}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Cached rows remain safe to check. Provider and reminder
                  changes are disabled.
                </p>
              </SolidCard>
            )}
            {empty ? (
              <GlassCard tone="muted">
                <h2 className="text-xl text-white">No habits yet</h2>
                <p className="mt-2 text-sm text-white/65">
                  Pick one. That&apos;s enough.
                </p>
                <BtnSecondary
                  className="mt-4"
                  onClick={() => setOverlay("add")}
                >
                  Add habit
                </BtnSecondary>
              </GlassCard>
            ) : (
              <GlassCard tone="you">
                <p className="text-xs uppercase tracking-wider text-white/55">
                  Momentum today
                </p>
                <p className="mt-2 text-3xl tabular-nums text-white">
                  {low ? "About " : ""}
                  {completed} of {total}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  {percent}% complete · nearest-integer rounding
                </p>
                <ProgressBar value={percent} tone="you" />
                <div className="mt-3 flex flex-wrap gap-2">
                  <Chip tone="you">
                    {low ? "Sync pending" : "Calculated locally"}
                  </Chip>
                  {!low && <Chip tone="you">21-day streak</Chip>}
                </div>
              </GlassCard>
            )}
            {!empty && (
              <>
                <div
                  role="tablist"
                  aria-label="Habit time range"
                  className="flex gap-2"
                >
                  {(["today", "week", "month"] as const).map((t) => (
                    <button
                      key={t}
                      role="tab"
                      id={`${t}-tab`}
                      aria-selected={tab === t}
                      aria-controls={`${t}-panel`}
                      className={`min-h-11 flex-1 rounded-xl border border-white/10 capitalize ${
                        tab === t ? "bg-white/10 text-white" : "text-white/55"
                      }`}
                      onClick={() => setTab(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {tab === "today" ? (
                  <section
                    role="tabpanel"
                    id="today-panel"
                    aria-labelledby="today-tab"
                    className="space-y-3"
                  >
                    <SectionTitle
                      title="Today"
                      meta={
                        offline
                          ? "Checks queue locally"
                          : "Completing updates today to 6 of 8"
                      }
                    />
                    <SolidCard className="space-y-2 p-3">
                      {habits.map((h) => (
                        <label
                          key={h.id}
                          className="flex min-h-12 items-center gap-3 rounded-xl border border-white/5 px-3"
                        >
                          <input
                            type="checkbox"
                            checked={h.done}
                            onChange={() => toggle(h.id)}
                            aria-label={`${h.name}, due ${h.time}, ${
                              h.domain
                            }. ${
                              h.done
                                ? "Completed"
                                : "Completing updates today to 6 of 8"
                            }`}
                            className="h-5 w-5 accent-brand-orange"
                          />
                          <span
                            className={`flex-1 text-sm ${
                              h.done
                                ? "text-white/45 line-through"
                                : "text-white"
                            }`}
                          >
                            {h.name}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-white/45">
                            <Clock size={13} />
                            {h.time}
                          </span>
                          <Chip tone="muted">{h.domain}</Chip>
                        </label>
                      ))}
                    </SolidCard>
                  </section>
                ) : tab === "week" ? (
                  <section
                    role="tabpanel"
                    id="week-panel"
                    aria-labelledby="week-tab"
                  >
                    <SolidCard className="p-4">
                      <SectionTitle
                        title="Seven-day completions"
                        meta="Local checks"
                      />
                      <div
                        className="mt-4 flex h-28 items-end gap-2"
                        aria-label="Week completion values: 5, 6, 4, 7, 5, 8, 5"
                      >
                        {[5, 6, 4, 7, 5, 8, 5].map((v, i) => (
                          <div
                            key={i}
                            className="flex flex-1 flex-col items-center gap-1"
                          >
                            <div
                              className="w-full rounded-t bg-brand-orange"
                              style={{ height: `${v * 10}px` }}
                            />
                            <span className="text-xs text-white/50">{v}</span>
                          </div>
                        ))}
                      </div>
                      <Provenance
                        items={["Calculated locally", "Past 7 days"]}
                      />
                    </SolidCard>
                  </section>
                ) : (
                  <section
                    role="tabpanel"
                    id="month-panel"
                    aria-labelledby="month-tab"
                  >
                    <SolidCard className="p-4">
                      <SectionTitle title="Four-week consistency" />
                      <HeatGrid
                        values={[
                          2, 3, 1, 3, 2, 3, 3, 3, 2, 1, 3, 2, 3, 3, 2, 3, 3, 3,
                          2, 3, 1, 2, 3, 3, 2, 3, 3, 2,
                        ]}
                        columns={7}
                      />
                      <Provenance
                        items={["Local completions", "Past 28 days"]}
                      />
                    </SolidCard>
                  </section>
                )}
              </>
            )}
            {!empty && (
              <CIAInsightCard
                eyebrow="Pattern read"
                provenance={
                  low
                    ? ["Draft association", "Low confidence"]
                    : ["28-day window", "12 paired days", "Medium confidence"]
                }
                actions={
                  <button
                    className="min-h-11 text-sm text-brand-orange"
                    onClick={() => setOverlay("cia")}
                  >
                    Explore association
                  </button>
                }
              >
                <p className="text-sm text-white/85">
                  Morning stretch and stronger sleep appear associated. This
                  does not show causation.
                </p>
              </CIAInsightCard>
            )}
            <section>
              <SectionTitle title="Habit data controls" />
              <ConsentRail controls={FULL_DATA_CONTROLS} />
            </section>
            {fixture === "reminder-disabled" && (
              <p role="status" className="text-sm text-white/60">
                Reminders are disabled because this visual prototype cannot
                request notification permission.
              </p>
            )}
          </>
        )}
        <p aria-live="polite" className="min-h-5 text-sm text-forest-green">
          {status}
        </p>
      </main>
    </HifiShell>
  );
}
