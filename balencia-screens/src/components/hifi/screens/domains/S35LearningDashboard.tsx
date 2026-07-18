"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { E1Modal } from "../intelligence/E1Modal";
import {
  BookOpen,
  Check,
  GraduationCap,
  MoreHorizontal,
  Plus,
} from "lucide-react";
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
  "error-import",
  "offline",
  "success-log",
  "disabled-import",
  "suggestion-done",
  "log-sheet",
  "course-controls",
]);

export function S35LearningDashboard() {
  const [fixture, setFixture] = useState("default-real");
  const [overlay, setOverlay] = useState<string | null>(
    fixture === "log-sheet"
      ? "log"
      : fixture === "course-controls"
      ? "course"
      : null
  );
  const [suggestionDone, setSuggestionDone] = useState(
    fixture === "suggestion-done"
  );
  const [status, setStatus] = useState(
    fixture === "success-log" ? "Reading session saved locally." : ""
  );
  const [minutes, setMinutes] = useState("");
  useEffect(() => {
    const value =
      new URLSearchParams(window.location.search).get("state") ??
      "default-real";
    const next = allowed.has(value) ? value : "default-real";
    queueMicrotask(() => {
      setFixture(next);
      setOverlay(
        next === "log-sheet"
          ? "log"
          : next === "course-controls"
          ? "course"
          : null
      );
      setSuggestionDone(next === "suggestion-done");
      setStatus(next === "success-log" ? "Reading session saved locally." : "");
    });
  }, []);
  const empty = fixture === "honest-null";
  const low = fixture === "low-confidence";
  const blocked = fixture === "disabled-import" || fixture === "offline";

  return (
    <HifiShell
      header={
        <TopBar
          title="Learning & growth"
          eyebrow="Explore · non-scored"
          right={
            <IconButton
              label="More options"
              onClick={() => setStatus("Learning options are available below.")}
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
              overlay === "log"
                ? "Log learning session"
                : "Data science intro controls"
            }
          >
            <div className="w-full rounded-[28px] border border-white/10 bg-ink-900 p-5 shadow-2xl">
              <h2 className="text-xl font-semibold text-white">
                {overlay === "log"
                  ? "Log learning session"
                  : "Data science intro"}
              </h2>
              {overlay === "log" ? (
                <div className="mt-4 space-y-3">
                  <label className="block text-sm text-white/70">
                    Session type
                    <select className="mt-1 h-12 w-full rounded-xl bg-white/10 px-3 text-white">
                      <option>Reading</option>
                      <option>Course lesson</option>
                      <option>Reflection</option>
                    </select>
                  </label>
                  <label className="block text-sm text-white/70">
                    Minutes
                    <input
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                      inputMode="numeric"
                      className="mt-1 h-12 w-full rounded-xl bg-white/10 px-3 text-white"
                    />
                  </label>
                  <BtnPrimary
                    disabled={!Number(minutes)}
                    onClick={() => {
                      setStatus(
                        `${minutes} minute reading session saved locally.`
                      );
                      setOverlay(null);
                    }}
                  >
                    Save session
                  </BtnPrimary>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-white/70">
                    Imported course preview · local fixture only.
                  </p>
                  <ConsentRail controls={FULL_DATA_CONTROLS} />
                  <BtnSecondary
                    onClick={() =>
                      setStatus("Export preview prepared locally.")
                    }
                  >
                    Export preview
                  </BtnSecondary>
                  <BtnGhost
                    onClick={() =>
                      setStatus(
                        "Revoke confirmation required for Data science intro."
                      )
                    }
                  >
                    Revoke
                  </BtnGhost>
                  <BtnGhost
                    onClick={() =>
                      setStatus(
                        "Delete confirmation required for Data science intro."
                      )
                    }
                  >
                    Delete
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
        data-g1-state={`35-${fixture}`}
        className="space-y-4 px-4 pb-5 pt-3"
      >
        {fixture === "skeleton" ? (
          <div
            aria-label="Loading learning dashboard"
            className="space-y-3 animate-pulse motion-reduce:animate-none"
          >
            <div className="h-36 rounded-[28px] bg-white/10" />
            <div className="h-24 rounded-[28px] bg-white/10" />
            <div className="h-40 rounded-[28px] bg-white/10" />
          </div>
        ) : (
          <>
            {(fixture === "error-import" || fixture === "offline") && (
              <SolidCard className="p-4">
                <p className="font-medium text-white">
                  {fixture === "offline"
                    ? "Offline — manual logs remain available"
                    : "Course import unavailable"}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Cached learning data is shown. Provider changes are disabled.
                </p>
              </SolidCard>
            )}
            {empty ? (
              <GlassCard tone="you">
                <BookOpen className="text-domain-learning" />
                <h2 className="mt-3 text-xl text-white">
                  Start your learning library
                </h2>
                <p className="mt-2 text-sm text-white/65">
                  No book, course, study, skill, or CIA values yet.
                </p>
                <BtnSecondary
                  className="mt-4"
                  onClick={() => setStatus("Add book preview opened locally.")}
                >
                  Add book or course
                </BtnSecondary>
              </GlassCard>
            ) : (
              <>
                <GlassCard tone="you">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-domain-learning">
                        Book completion
                      </p>
                      <h2 className="mt-1 text-lg text-white">
                        Thinking, fast and slow
                      </h2>
                      <p className="mt-2 text-3xl tabular-nums text-white">
                        62%
                      </p>
                    </div>
                    <BookOpen className="text-domain-learning" />
                  </div>
                  <ProgressBar value={62} tone="you" />
                  <div className="mt-4">
                    <p className="text-sm text-white">
                      Daily mission · 9 of 15 pages · 60%
                    </p>
                    <ProgressBar value={60} tone="you" />
                  </div>
                  <Provenance
                    items={
                      low
                        ? [
                            "Imported partial session",
                            "Estimated · low confidence",
                          ]
                        : ["You logged", "Fresh today"]
                    }
                  />
                </GlassCard>
                <CIAInsightCard
                  eyebrow="Reading pace"
                  provenance={
                    low
                      ? ["Draft · low confidence"]
                      : ["CIA synthesis", "7-day window"]
                  }
                >
                  <p className="text-sm text-white/80">
                    {low
                      ? "A partial import suggests a steady pace. Confirm the session before relying on it."
                      : "You logged 45 pages this week across books. Pace is steady for this mission."}
                  </p>
                </CIAInsightCard>
                <section>
                  <SectionTitle title="Suggested action" />
                  <SolidCard className="p-3">
                    <button
                      type="button"
                      aria-pressed={suggestionDone}
                      onClick={() => {
                        setSuggestionDone(!suggestionDone);
                        setStatus(
                          suggestionDone
                            ? "Suggestion restored."
                            : "Read chapter 7 marked done. Undo is available."
                        );
                      }}
                      className="flex min-h-11 w-full items-center gap-3 text-left"
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          suggestionDone
                            ? "bg-forest-green/20 text-forest-green"
                            : "bg-brand-orange/15 text-brand-orange"
                        }`}
                      >
                        {suggestionDone ? (
                          <Check size={16} />
                        ) : (
                          <BookOpen size={16} />
                        )}
                      </span>
                      <span className="flex-1 text-sm text-white">
                        Read chapter 7
                      </span>
                      <span className="text-xs text-white/50">
                        {suggestionDone ? "Undo" : "Mark done"}
                      </span>
                    </button>
                  </SolidCard>
                </section>
                <section>
                  <SectionTitle
                    title="Study time"
                    meta="Past 7 days · you logged"
                  />
                  <SolidCard className="p-4">
                    <TrendChart
                      past={[22, 45, 30, 60, 15, 50, 135]}
                      height={112}
                      label="Logged daily minutes: 22, 45, 30, 60, 15, 50, 135"
                    />
                    <button
                      className="mt-2 min-h-11 text-sm text-brand-orange"
                      onClick={() =>
                        setStatus(
                          "Friday · 50 minutes · you logged · high confidence."
                        )
                      }
                    >
                      Explore Friday point
                    </button>
                  </SolidCard>
                </section>
                <section>
                  <SectionTitle
                    title="Skill estimates"
                    meta="Local scale out of 100"
                  />
                  <SolidCard className="space-y-2 p-4">
                    <p className="text-sm text-white">
                      Critical thinking · 78 of 100
                    </p>
                    <p className="text-sm text-white">
                      Data analysis · 54 of 100
                    </p>
                    <Chip tone="muted">Estimated · low confidence</Chip>
                  </SolidCard>
                </section>
                <section>
                  <SectionTitle title="Library" />
                  <SolidCard className="!p-0">
                    <button
                      className="flex min-h-14 w-full items-center gap-3 p-3 text-left"
                      onClick={() =>
                        setStatus(
                          "Thinking, fast and slow detail opened locally."
                        )
                      }
                    >
                      <BookOpen className="text-domain-learning" />
                      <span className="flex-1 text-sm text-white">
                        Thinking, fast and slow · 62%
                      </span>
                    </button>
                    <button
                      disabled={blocked}
                      className="flex min-h-14 w-full items-center gap-3 border-t border-white/5 p-3 text-left disabled:opacity-40"
                      onClick={() => setOverlay("course")}
                    >
                      <GraduationCap className="text-royal-purple" />
                      <span className="flex-1 text-sm text-white">
                        Data science intro · 42%
                      </span>
                      <span className="text-xs text-white/50">
                        {blocked ? "Import controls unavailable" : "Controls"}
                      </span>
                    </button>
                  </SolidCard>
                </section>
              </>
            )}
            <Link
              href="/screens/37?prefill=learning-reflection"
              className="flex min-h-11 items-center text-sm text-brand-orange"
            >
              Reflect in Journal · local prefill preview
            </Link>
            <section>
              <SectionTitle title="Learning data controls" />
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
