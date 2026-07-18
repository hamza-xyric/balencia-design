"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Mic, Sparkles } from "lucide-react";
import {
  Chip,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassCard,
  HifiShell,
  IconButton,
  Provenance,
  SafetyCard,
  SectionTitle,
  SolidCard,
  TopBar,
  TrendChart,
} from "@/components/hifi/kit";

const states = [
  "default-real",
  "low-confidence",
  "honest-null",
  "skeleton",
  "empty",
  "search-empty",
  "error",
  "success",
  "offline",
  "disabled",
  "data-controls",
] as const;
type ScreenState = (typeof states)[number];
const notes = [
  {
    text: "Felt a sharp pain in my left knee after the morning run. Going to rest it today.",
    domain: "Health",
    meta: "12 min ago · You logged",
    cia: false,
  },
  {
    text: "CIA noted: work stress appears in recent notes. This may relate to the sleep dip; it is not a diagnosis.",
    domain: "Mood",
    meta: "1 hr ago · Derived from chat",
    cia: true,
  },
  {
    text: "Hydrated well after lunch. Two full bottles before the afternoon meeting.",
    domain: "Nutrition",
    meta: "Mon · You logged",
    cia: false,
  },
];

export function S62QuickNotes() {
  const [state, setState] = useState<ScreenState>("default-real");
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState("All");
  const [status, setStatus] = useState("");
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const seeded = query.get("state");
    queueMicrotask(() => {
      if ((states as readonly string[]).includes(seeded ?? "")) {
        const next = seeded as ScreenState;
        setState(next);
        if (next === "error")
          setDraft("Headache eased after water and a quiet break.");
        if (next === "search-empty") setFilter("Idea");
        if (next === "success")
          setStatus("Saved locally. New note added to Today.");
        if (next === "offline")
          setStatus(
            "Offline · archive cached 18 min ago. New notes queue locally."
          );
      }
      if (query.get("filter") === "health") setFilter("Health");
    });
  }, []);
  const shown =
    filter === "All" ? notes : notes.filter((note) => note.domain === filter);
  const disabled = state === "disabled" || !draft.trim();
  const save = () => {
    if (state === "error")
      return setStatus(
        "Could not save. Your draft is preserved. Retry locally."
      );
    setStatus(
      state === "offline"
        ? "Queued locally. It will sync when connected."
        : "Saved locally. New note added to Today."
    );
  };
  const composer = (
    <div className="flex items-center gap-2">
      <label className="glass-pill flex h-[52px] min-w-0 flex-1 items-center px-4 focus-within:shadow-[var(--focus-ring)]">
        <span className="sr-only">Quick note</span>
        <input
          aria-label="Quick note"
          placeholder="What's on your mind"
          value={draft}
          onChange={(event) => setDraft(event.currentTarget.value)}
          className="h-11 min-w-0 flex-1 bg-transparent text-[16px] text-paper-100 outline-none placeholder:text-paper-100/55"
        />
      </label>
      <IconButton
        label="Record voice note"
        onClick={() =>
          setStatus("Voice preview selected. No microphone was accessed.")
        }
      >
        <Mic size={18} />
      </IconButton>
      <button
        type="button"
        aria-label="Save note"
        disabled={disabled}
        onClick={save}
        className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white disabled:opacity-40"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
  return (
    <div data-f2-state={`62-${state}`} data-notes-state={state}>
      <HifiShell
        header={
          <TopBar
            title={
              <>
                Quick <span className="text-emphasis">notes</span>
              </>
            }
            right={
              <Chip tone="cia" interactive>
                Ask CIA
              </Chip>
            }
          />
        }
        activeTab="today"
        composer={composer}
      >
        <main className="space-y-4 px-4 pb-6 pt-3">
          {state === "disabled" && (
            <Chip>Save unavailable until a note is entered</Chip>
          )}
          {state === "skeleton" ? (
            <SolidCard>
              <div
                className="h-14 animate-pulse rounded-xl bg-white/[0.06]"
                aria-label="Loading capture activity"
              />
            </SolidCard>
          ) : state === "honest-null" ? (
            <SolidCard>
              <p className="font-semibold text-white">
                Your capture activity will appear here
              </p>
              <p className="mt-1 text-[12px] text-white/55">
                Write a first note whenever you are ready.
              </p>
            </SolidCard>
          ) : (
            <SolidCard>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-white/45">
                    Capture activity
                  </p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {state === "low-confidence" ? "About 12" : "12"}{" "}
                    <span className="text-xs font-normal text-white/55">
                      This week
                    </span>
                  </p>
                  <p className="text-[12px] text-white/55">
                    28 notes this month
                  </p>
                  <Provenance
                    items={[
                      state === "low-confidence"
                        ? "Estimated · sync pending"
                        : state === "offline"
                        ? "Cached · 18 min ago"
                        : "Derived locally",
                    ]}
                  />
                </div>
                <div className="h-12 w-20">
                  <TrendChart
                    past={[3, 5, 4, 7, 6, 9, 12]}
                    label="12 notes this week"
                    height={48}
                  />
                </div>
              </div>
            </SolidCard>
          )}
          {!["empty", "skeleton"].includes(state) && (
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4">
              {["All", "Health", "Mood", "Nutrition", "Idea"].map((item) => (
                <Chip
                  key={item}
                  interactive
                  pressed={filter === item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </Chip>
              ))}
            </div>
          )}
          {state === "empty" ? (
            <SolidCard>
              <h2 className="font-semibold text-white">
                Capture your first note
              </h2>
              <p className="mt-1 text-[13px] text-white/60">
                Symptoms, mood shifts, ideas, and reminders can stay private
                here.
              </p>
            </SolidCard>
          ) : state === "skeleton" ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-2xl bg-white/[0.05]"
                />
              ))}
            </div>
          ) : shown.length === 0 || state === "search-empty" ? (
            <SolidCard>
              <h2 className="font-semibold text-white">
                No notes match this filter
              </h2>
              <button
                type="button"
                className="focus-ring mt-2 min-h-11 rounded-pill px-3 text-brand-orange"
                onClick={() => setFilter("All")}
              >
                Clear filter
              </button>
            </SolidCard>
          ) : (
            <section className="space-y-3">
              <SectionTitle title="Today" />
              {state === "success" && (
                <GlassCard tone="you">
                  <p className="text-[15px] text-white">
                    Saved note: Morning energy felt steady.
                  </p>
                  <p className="mt-2 text-[11px] text-white/55">
                    Health · Just now · You logged
                  </p>
                </GlassCard>
              )}
              {shown.map((note) => (
                <GlassCard key={note.text} tone={note.cia ? "cia" : "you"}>
                  <div className="flex gap-2">
                    {note.cia && (
                      <Sparkles className="mt-1 h-4 w-4 shrink-0 text-royal-purple" />
                    )}
                    <div>
                      <p className="text-[15px] leading-5 text-white/90">
                        {note.text}
                      </p>
                      <p className="mt-2 text-[11px] text-white/55">
                        {note.domain} · {note.meta}
                      </p>
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          className="focus-ring min-h-11 rounded-pill px-3 text-[12px] text-white/65"
                          onClick={() =>
                            setStatus("Edit preview opened locally.")
                          }
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="focus-ring min-h-11 rounded-pill px-3 text-[12px] text-white/65"
                          onClick={() =>
                            setStatus(
                              "Delete preview opened. Confirmation required."
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </section>
          )}
          {(state === "error" || status) && (
            <div
              role="status"
              className="rounded-xl border border-brand-orange/25 bg-brand-orange/10 p-3 text-[12px] text-white/75"
            >
              {status || "Could not save. Your draft is preserved."}
              {state === "error" && (
                <button
                  type="button"
                  className="focus-ring ml-2 min-h-11 rounded-pill px-3 font-semibold text-brand-orange"
                  onClick={save}
                >
                  Retry save
                </button>
              )}
            </div>
          )}
          <p className="px-2 text-[11px] text-white/55">
            Notes stay private. CIA reads them only with your consent.
          </p>
          <SafetyCard />
          {state === "data-controls" ? (
            <SolidCard>
              <SectionTitle title="Quick notes data controls" />
              <p className="mt-2 text-[12px] text-white/60">
                Health notes · member and chat sources · this archive · fresh
                today · confidence shown per note.
              </p>
              <ConsentRail compact controls={FULL_DATA_CONTROLS} />
            </SolidCard>
          ) : (
            <ConsentRail compact controls={FULL_DATA_CONTROLS} />
          )}
        </main>
      </HifiShell>
    </div>
  );
}
