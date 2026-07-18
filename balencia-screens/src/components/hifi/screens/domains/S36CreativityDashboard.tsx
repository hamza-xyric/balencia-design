"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { E1Modal } from "../intelligence/E1Modal";
import {
  Camera,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Sparkles,
} from "lucide-react";
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
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
  TrendChart,
} from "@/components/hifi/kit";

const allowed = new Set([
  "default-real",
  "low-confidence",
  "honest-null",
  "skeleton",
  "error-upload",
  "offline",
  "success-log",
  "disabled-media",
  "prompt-session",
  "journal-reflect",
  "milestone-detail",
  "data-controls",
]);

export function S36CreativityDashboard() {
  const [fixture, setFixture] = useState("default-real");
  const [overlay, setOverlay] = useState<string | null>(
    fixture === "prompt-session"
      ? "timer"
      : fixture === "milestone-detail"
      ? "milestone"
      : fixture === "data-controls"
      ? "data"
      : null
  );
  const [timer, setTimer] = useState<"ready" | "running" | "paused">("ready");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState(
    fixture === "success-log" ? "Creative session saved locally." : ""
  );
  useEffect(() => {
    const value =
      new URLSearchParams(window.location.search).get("state") ??
      "default-real";
    const next = allowed.has(value) ? value : "default-real";
    queueMicrotask(() => {
      setFixture(next);
      setOverlay(
        next === "prompt-session"
          ? "timer"
          : next === "milestone-detail"
          ? "milestone"
          : next === "data-controls"
          ? "data"
          : null
      );
      setStatus(
        next === "success-log" ? "Creative session saved locally." : ""
      );
    });
  }, []);
  const empty = fixture === "honest-null",
    low = fixture === "low-confidence",
    mediaDisabled = fixture === "disabled-media" || fixture === "offline";
  return (
    <HifiShell
      header={
        <TopBar
          title="Creativity"
          eyebrow="Explore · non-scored"
          right={
            <IconButton
              label="More options"
              onClick={() =>
                setStatus("Creativity options are available below.")
              }
            >
              <MoreHorizontal size={18} />
            </IconButton>
          }
        />
      }
      activeTab="today"
      bottomAction={
        <BtnPrimary className="w-full" onClick={() => setOverlay("log")}>
          <Plus size={18} />
          Log session
        </BtnPrimary>
      }
      overlay={
        overlay && (
          <E1Modal
            onClose={() => setOverlay(null)}
            label={
              overlay === "timer"
                ? "Creative timer preview"
                : overlay === "milestone"
                ? "Milestone detail"
                : overlay === "data"
                ? "Creativity data controls"
                : "Log creative session"
            }
          >
            <div className="w-full rounded-[28px] border border-white/10 bg-ink-900 p-5">
              <h2 className="text-xl text-white">
                {overlay === "timer"
                  ? "Creative timer preview"
                  : overlay === "milestone"
                  ? "Demo cut milestone"
                  : overlay === "data"
                  ? "Creativity data controls"
                  : "Log creative session"}
              </h2>
              {overlay === "timer" ? (
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-white/65">
                    Local timer preview · no device service used.
                  </p>
                  <p className="text-3xl tabular-nums text-white">00:00</p>
                  <div className="flex gap-2">
                    <BtnSecondary
                      onClick={() =>
                        setTimer(timer === "running" ? "paused" : "running")
                      }
                    >
                      {timer === "running" ? (
                        <>
                          <Pause size={16} />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play size={16} />
                          {timer === "paused" ? "Resume" : "Start"}
                        </>
                      )}
                    </BtnSecondary>
                    <BtnGhost
                      onClick={() => {
                        setStatus("Creative timer finished locally.");
                        setOverlay(null);
                      }}
                    >
                      Finish
                    </BtnGhost>
                  </div>
                </div>
              ) : overlay === "milestone" ? (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-white">
                    Demo cut · completed locally on May 14
                  </p>
                  <p className="text-sm text-white/60">
                    Text milestone only. No gallery image or device media is
                    implied.
                  </p>
                </div>
              ) : overlay === "data" ? (
                <div className="mt-4">
                  <p className="text-sm text-white/65">
                    Project files, prompts, CIA inference, and imports remain
                    local demo fixtures.
                  </p>
                  <ConsentRail controls={FULL_DATA_CONTROLS} />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <BtnSecondary
                      onClick={() =>
                        setStatus("Creativity export preview prepared locally.")
                      }
                    >
                      Export
                    </BtnSecondary>
                    <BtnGhost
                      onClick={() =>
                        setStatus(
                          "Revoke confirmation prepared for creativity imports."
                        )
                      }
                    >
                      Revoke
                    </BtnGhost>
                    <BtnGhost
                      onClick={() =>
                        setStatus(
                          "Delete confirmation prepared for creativity preview data."
                        )
                      }
                    >
                      Delete
                    </BtnGhost>
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <label className="block text-sm text-white/70">
                    Session type
                    <select className="mt-1 h-12 w-full rounded-xl bg-white/10 px-3 text-white">
                      <option>Writing</option>
                      <option>Sketch</option>
                      <option>Editing</option>
                    </select>
                  </label>
                  <label className="block text-sm text-white/70">
                    Minutes
                    <input
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      inputMode="numeric"
                      className="mt-1 h-12 w-full rounded-xl bg-white/10 px-3 text-white"
                    />
                  </label>
                  <BtnPrimary
                    disabled={!Number(duration)}
                    onClick={() => {
                      setStatus(
                        `${duration} minute creative session saved locally.`
                      );
                      setOverlay(null);
                    }}
                  >
                    Save session
                  </BtnPrimary>
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
        data-g1-state={`36-${fixture}`}
        className="space-y-4 px-4 pb-5 pt-3"
      >
        {fixture === "journal-reflect" && (
          <p
            role="status"
            className="rounded-xl border border-brand-orange/30 bg-brand-orange/10 p-3 text-sm text-white"
          >
            Journal reflection prefill preview selected locally.
          </p>
        )}
        {fixture === "skeleton" ? (
          <div
            aria-label="Loading creativity dashboard"
            className="space-y-3 animate-pulse motion-reduce:animate-none"
          >
            <div className="h-28 rounded-[28px] bg-white/10" />
            <div className="h-40 rounded-[28px] bg-white/10" />
            <div className="h-32 rounded-[28px] bg-white/10" />
          </div>
        ) : (
          <>
            {(fixture === "error-upload" ||
              fixture === "offline" ||
              fixture === "disabled-media") && (
              <SolidCard className="p-4">
                <p className="font-medium text-white">
                  {fixture === "offline"
                    ? "Offline — local practice is available"
                    : fixture === "disabled-media"
                    ? "Media import unavailable in this prototype"
                    : "Milestone upload unavailable"}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Cached projects stay visible. Media actions are disabled.
                </p>
              </SolidCard>
            )}
            {empty ? (
              <GlassCard tone="you">
                <Sparkles className="text-domain-creativity" />
                <h2 className="mt-3 text-xl text-white">
                  Begin with one small idea
                </h2>
                <p className="mt-2 text-sm text-white/65">
                  No projects, gallery items, practice totals, or CIA patterns
                  yet.
                </p>
                <BtnSecondary
                  className="mt-4"
                  onClick={() =>
                    setStatus("Add project preview opened locally.")
                  }
                >
                  Add project
                </BtnSecondary>
              </GlassCard>
            ) : (
              <>
                <CIAInsightCard
                  eyebrow="CIA pattern"
                  provenance={
                    low
                      ? ["Draft pattern", "Estimated · low confidence"]
                      : ["CIA synthesis", "Recent logged practice"]
                  }
                  actions={
                    <button
                      className="min-h-11 text-sm text-white"
                      onClick={() =>
                        setStatus(
                          "Morning sessions: 2 logged sessions in the 7-day window."
                        )
                      }
                    >
                      Explore morning sessions
                    </button>
                  }
                >
                  {low
                    ? "A pending voice note may suggest morning focus. Confirm it before relying on this pattern."
                    : "Your best work happens in the morning. Try a short session after breakfast."}
                </CIAInsightCard>
                <section>
                  <SectionTitle
                    title="Active projects"
                    meta="Project completion"
                  />
                  <SolidCard className="space-y-4 p-4">
                    {[
                      ["Short film script", 45],
                      ["Photography portfolio", 72],
                    ].map(([name, value]) => (
                      <button
                        key={String(name)}
                        className="block min-h-14 w-full text-left"
                        onClick={() =>
                          setStatus(`${name} detail opened locally.`)
                        }
                      >
                        <div className="flex justify-between text-sm text-white">
                          <span>{name}</span>
                          <span>{value}%</span>
                        </div>
                        <ProgressBar value={Number(value)} tone="you" />
                        <p className="mt-1 text-xs text-white/50">
                          Project completion · you logged
                        </p>
                      </button>
                    ))}
                  </SolidCard>
                </section>
                <GlassCard tone="you">
                  <p className="text-xs uppercase tracking-wider text-domain-creativity">
                    Starter prompt
                  </p>
                  <p className="mt-2 text-sm text-white">
                    Make something with the materials nearby.
                  </p>
                  <Provenance items={["Journal prompt", "Local preview"]} />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <BtnSecondary onClick={() => setOverlay("timer")}>
                      <Play size={16} />
                      Start creating
                    </BtnSecondary>
                    <Link
                      href="/screens/37?prefill=creativity-reflection"
                      className="flex min-h-11 items-center px-3 text-sm text-brand-orange"
                    >
                      Reflect in Journal
                    </Link>
                  </div>
                </GlassCard>
                <section>
                  <SectionTitle title="Practice days" meta="Past 24 days" />
                  <SolidCard className="p-4">
                    <HeatGrid
                      values={[
                        1, 0, 2, 3, 0, 1, 2, 0, 0, 3, 1, 2, 0, 1, 3, 2, 0, 1, 0,
                        2, 1, 0, 2, 3,
                      ]}
                      columns={6}
                    />
                    <Provenance items={["You logged", "Fresh today"]} />
                  </SolidCard>
                </section>
                <section>
                  <SectionTitle title="Weekly summary" meta="7-day window" />
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      ["Sessions", "3"],
                      ["Hours", "4.5"],
                      ["Streak", "8 days"],
                    ].map(([label, value]) => (
                      <SolidCard key={label} className="p-3">
                        <p className="text-xs text-white/50">{label}</p>
                        <p className="mt-1 text-lg tabular-nums text-white">
                          {value}
                        </p>
                      </SolidCard>
                    ))}
                  </div>
                </section>
                <section>
                  <SectionTitle title="Session trend" meta="Logged minutes" />
                  <SolidCard className="p-4">
                    <TrendChart
                      past={[0, 45, 0, 60, 0, 30, 0]}
                      height={105}
                      label="Creative session minutes over seven days"
                    />
                  </SolidCard>
                </section>
                <section>
                  <SectionTitle
                    title="Portfolio milestones"
                    meta="Text records"
                  />
                  <SolidCard className="space-y-2 p-3">
                    {["First draft", "Demo cut", "Short film"].map((m, i) => (
                      <button
                        key={m}
                        disabled={mediaDisabled && i === 2}
                        className="flex min-h-11 w-full items-center gap-3 rounded-xl border border-white/5 px-3 text-left disabled:opacity-40"
                        onClick={() => {
                          if (i === 1) setOverlay("milestone");
                          else
                            setStatus(`${m} milestone detail opened locally.`);
                        }}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            i < 2 ? "bg-forest-green" : "bg-brand-orange"
                          }`}
                        />
                        <span className="flex-1 text-sm text-white">{m}</span>
                        <span className="text-xs text-white/45">
                          {i < 2 ? "Recorded" : "Pending"}
                        </span>
                      </button>
                    ))}
                  </SolidCard>
                </section>
                <SolidCard className="p-4">
                  <p className="text-sm text-white">Voice note · 8 min</p>
                  <p className="mt-1 text-xs text-white/50">
                    Estimated · low confidence · no recording capability invoked
                  </p>
                </SolidCard>
              </>
            )}
            <section>
              <SectionTitle title="Creativity data" />
              <BtnSecondary onClick={() => setOverlay("data")}>
                <Camera size={16} />
                Open data controls
              </BtnSecondary>
              <ConsentRail controls={FULL_DATA_CONTROLS} />
            </section>
          </>
        )}
        <p aria-live="polite" className="min-h-5 text-sm text-forest-green">
          {status}
        </p>
      </main>
    </HifiShell>
  );
}
