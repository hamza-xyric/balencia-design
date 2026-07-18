"use client";

import { useEffect, useRef, useState } from "react";
import { Dumbbell, Search, SlidersHorizontal, X } from "lucide-react";
import {
  Chip,
  ConsentRail,
  cx,
  FULL_DATA_CONTROLS,
  GlassCard,
  HifiShell,
  IconButton,
  SectionTitle,
  SolidCard,
  TopBar,
} from "@/components/hifi/kit";

const states = [
  "default",
  "skeleton",
  "empty",
  "error-list",
  "offline",
  "detail",
  "error-detail",
  "success",
  "disabled",
  "media-low-confidence",
  "media-null",
  "data-controls",
] as const;
type ScreenState = (typeof states)[number];
const exercises = [
  {
    id: "bench-press",
    name: "Bench press",
    muscle: "Upper body",
    detail: "Chest",
    equipment: "Barbell",
    difficulty: 3 as const,
    media: "Database diagram available",
  },
  {
    id: "back-squat",
    name: "Back squat",
    muscle: "Lower body",
    detail: "Legs",
    equipment: "Barbell",
    difficulty: 3 as const,
    media: "Database diagram available",
  },
  {
    id: "plank",
    name: "Plank",
    muscle: "Core",
    detail: "Core",
    equipment: "Bodyweight",
    difficulty: 1 as const,
    media: "Text instructions available",
  },
  {
    id: "pull-up",
    name: "Pull-up",
    muscle: "Upper body",
    detail: "Back",
    equipment: "Bodyweight",
    difficulty: 2 as const,
    media: "Estimated form cue available",
  },
  {
    id: "farmer-carry",
    name: "Farmer carry",
    muscle: "Upper body",
    detail: "Full body",
    equipment: "Dumbbell",
    difficulty: 0 as const,
    media: "Media unavailable; text instructions available",
  },
  {
    id: "lateral-raise",
    name: "Lateral raise",
    muscle: "Upper body",
    detail: "Shoulders",
    equipment: "Dumbbell",
    difficulty: 1 as const,
    media: "Database diagram available",
  },
];
type Exercise = (typeof exercises)[number];

function Difficulty({ level }: { level: 0 | 1 | 2 | 3 }) {
  const word =
    level === 0
      ? "Unrated"
      : level === 1
      ? "Beginner"
      : level === 2
      ? "Intermediate"
      : "Advanced";
  return (
    <div
      className="mt-2 flex items-center justify-between"
      role="img"
      aria-label={`Difficulty ${word}`}
    >
      <div aria-hidden="true" className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={cx(
              "h-3 w-1.5 rounded-pill",
              i <= level ? "bg-brand-orange" : "bg-white/10"
            )}
          />
        ))}
      </div>
      <span className="text-[10px] font-semibold uppercase text-brand-orange/80">
        {word}
      </span>
    </div>
  );
}
function Asset({ state }: { state: ScreenState }) {
  if (state === "media-null")
    return (
      <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-white/10 text-center text-[11px] text-white/50">
        Media unavailable
        <br />
        Text instructions remain
      </div>
    );
  return (
    <div
      data-asset-disposition="HIFI-70-01-code-native-instructional"
      role="img"
      aria-label="Privacy-safe abstract barbell and movement path diagram; not a form certification"
      className="relative flex h-24 items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-white/[.04]"
    >
      <span className="absolute h-14 w-14 rounded-full border border-dashed border-brand-orange/35" />
      <Dumbbell className="relative text-white/45" size={24} />
      <span className="absolute bottom-2 text-[9px] uppercase tracking-wide text-white/40">
        Code-native cue
      </span>
    </div>
  );
}

function DetailDialog({
  exercise,
  state,
  onClose,
  onStatus,
}: {
  exercise: Exercise;
  state: ScreenState;
  onClose: () => void;
  onStatus: (s: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const before = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    return () => before?.focus();
  }, []);
  const onKeyDown = (event: React.KeyboardEvent) => {
    const list = [
      ...(ref.current?.querySelectorAll<HTMLElement>(
        "button:not(:disabled), [href]"
      ) ?? []),
    ];
    if (event.key === "Escape") return onClose();
    if (event.key !== "Tab" || !list.length) return;
    const first = list[0],
      last = list[list.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  const failed = state === "error-detail";
  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/80 p-3"
      aria-hidden="false"
    >
      <section
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exercise-detail-title"
        onKeyDown={onKeyDown}
        className="max-h-[72vh] w-full overflow-y-auto rounded-[26px] border border-white/15 bg-ink-900 p-5 shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-white/45">
              Exercise detail
            </p>
            <h2
              id="exercise-detail-title"
              className="mt-1 text-xl font-semibold text-white"
            >
              {exercise.name}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close exercise details"
            onClick={onClose}
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full"
          >
            <X />
          </button>
        </div>
        {failed ? (
          <div className="mt-5">
            <p className="text-[14px] text-white/70">
              Could not load exercise details. The library remains available.
            </p>
            <button
              type="button"
              onClick={() => onStatus("Detail retry completed locally.")}
              className="focus-ring mt-3 min-h-11 rounded-pill border border-white/15 px-4 text-white"
            >
              Retry details
            </button>
          </div>
        ) : (
          <>
            <div className="mt-4">
              <Asset state={state} />
            </div>
            <p className="mt-4 text-[13px] leading-5 text-white/70">
              Set the support securely, use a comfortable range, and stop if
              movement causes pain. This is general database guidance, not
              diagnosis or rehabilitation advice.
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
              <div className="rounded-xl bg-white/[.04] p-3">
                <dt className="text-white/45">Equipment</dt>
                <dd className="mt-1 text-white">{exercise.equipment}</dd>
              </div>
              <div className="rounded-xl bg-white/[.04] p-3">
                <dt className="text-white/45">Source</dt>
                <dd className="mt-1 text-white">Fitness DB v4.2</dd>
              </div>
            </dl>
            {state === "media-low-confidence" && (
              <p className="mt-3 text-[12px] text-white/60">
                Form cue · estimated · low confidence
              </p>
            )}
            <button
              type="button"
              disabled={state === "disabled"}
              onClick={() =>
                onStatus(
                  "Added to workout locally. No account or network used."
                )
              }
              className={cx(
                "focus-ring mt-4 min-h-12 w-full rounded-pill px-4 font-semibold text-white disabled:opacity-40",
                state === "success" ? "bg-forest-green" : "bg-brand-orange"
              )}
            >
              {state === "success" ? "Added" : "Add to workout"}
            </button>
          </>
        )}
      </section>
    </div>
  );
}

export function S70ExerciseLibrary() {
  const [state, setState] = useState<ScreenState>("default");
  const [search, setSearch] = useState("");
  const [muscle, setMuscle] = useState("All");
  const [equipment, setEquipment] = useState("Any");
  const [detail, setDetail] = useState<Exercise | null>(null);
  const [status, setStatus] = useState("");
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const seeded = query.get("state");
    queueMicrotask(() => {
      if ((states as readonly string[]).includes(seeded ?? "")) {
        const next = seeded as ScreenState;
        setState(next);
        if (next === "empty") setSearch("swimming");
        if (
          [
            "detail",
            "error-detail",
            "success",
            "disabled",
            "media-low-confidence",
            "media-null",
          ].includes(next)
        )
          setDetail(
            exercises.find(
              (item) => item.id === (query.get("exercise") ?? "bench-press")
            ) ?? exercises[0]
          );
        if (next === "success") setStatus("Added to workout locally.");
      }
    });
  }, []);
  const inert = state === "error-list";
  const results =
    state === "empty"
      ? []
      : exercises.filter(
          (item) =>
            (!search ||
              item.name.toLowerCase().includes(search.toLowerCase())) &&
            (muscle === "All" || item.muscle === muscle) &&
            (equipment === "Any" || item.equipment === equipment)
        );
  return (
    <div data-f2-state={`70-${state}`} data-exercise-state={state}>
      <HifiShell
        header={
          <TopBar
            title={
              <>
                Exercise <span className="text-emphasis">library</span>
              </>
            }
            right={
              <IconButton
                label="Sort and filter"
                onClick={() =>
                  setStatus("Sort and filter preview opened locally.")
                }
              >
                <SlidersHorizontal size={18} />
              </IconButton>
            }
          />
        }
        atmosphere="you"
        showTabBar={false}
        overlay={
          detail ? (
            <DetailDialog
              exercise={detail}
              state={state}
              onClose={() => setDetail(null)}
              onStatus={setStatus}
            />
          ) : undefined
        }
      >
        <main
          className="space-y-4 px-4 pb-6 pt-3"
          aria-hidden={detail ? true : undefined}
          inert={detail ? true : undefined}
        >
          {state === "data-controls" && (
            <Chip tone="you">Exercise data controls open below</Chip>
          )}
          <label className="glass-pill flex h-[52px] items-center gap-3 px-4 focus-within:shadow-[var(--focus-ring)]">
            <Search aria-hidden="true" size={16} className="text-white/60" />
            <span className="sr-only">Search exercises</span>
            <input
              type="search"
              aria-label="Search exercises"
              placeholder="Search exercises"
              value={search}
              disabled={inert}
              onChange={(e) => setSearch(e.currentTarget.value)}
              className="h-11 min-w-0 flex-1 bg-transparent text-[16px] text-paper-100 outline-none disabled:opacity-40"
            />
          </label>
          <div
            role="tablist"
            aria-label="Muscle group filter"
            className="-mx-4 flex gap-2 overflow-x-auto px-4"
          >
            {["All", "Upper body", "Lower body", "Core"].map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={muscle === item}
                disabled={inert}
                onClick={() => setMuscle(item)}
                className={cx(
                  "focus-ring min-h-11 shrink-0 rounded-pill px-4 text-[13px]",
                  muscle === item
                    ? "bg-brand-orange text-white"
                    : "border border-white/10 text-white/60"
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <div
            role="group"
            aria-label="Equipment filter"
            className="-mx-4 flex gap-2 overflow-x-auto px-4"
          >
            {["Any", "Dumbbell", "Barbell", "Bodyweight"].map((item) => (
              <Chip
                key={item}
                interactive
                pressed={equipment === item}
                disabled={inert}
                onClick={() => setEquipment(item)}
              >
                {item}
              </Chip>
            ))}
          </div>
          {state === "offline" && (
            <p className="rounded-xl bg-brand-orange/10 p-3 text-[12px] text-white/70">
              Offline · showing cached Fitness DB v4.2, refreshed yesterday.
            </p>
          )}
          {state === "error-list" ? (
            <SolidCard>
              <h2 className="font-semibold text-white">
                Could not load the exercise library
              </h2>
              <p className="mt-1 text-[12px] text-white/60">
                No results were invented.
              </p>
              <button
                type="button"
                onClick={() => setStatus("Library retry completed locally.")}
                className="focus-ring mt-2 min-h-11 rounded-pill px-3 text-brand-orange"
              >
                Retry library
              </button>
            </SolidCard>
          ) : state === "skeleton" ? (
            <div
              className="grid grid-cols-2 gap-3"
              aria-label="Loading exercise library"
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-48 animate-pulse rounded-2xl bg-white/[.05]"
                />
              ))}
            </div>
          ) : results.length === 0 ? (
            <SolidCard>
              <h2 className="font-semibold text-white">No exercises found</h2>
              <p className="mt-1 text-[12px] text-white/60">
                Clear search or adjust filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setMuscle("All");
                  setEquipment("Any");
                }}
                className="focus-ring mt-2 min-h-11 rounded-pill px-3 text-brand-orange"
              >
                Clear filters
              </button>
            </SolidCard>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-white/50">
                  {search || muscle !== "All" || equipment !== "Any"
                    ? `${results.length} exercises`
                    : "532 exercises"}
                </span>
                <Chip>Fitness DB v4.2 · fresh yesterday</Chip>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {results.map((item) => {
                  const difficulty =
                    item.difficulty === 0
                      ? "Unrated"
                      : item.difficulty === 1
                      ? "Beginner"
                      : item.difficulty === 2
                      ? "Intermediate"
                      : "Advanced";
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setDetail(item)}
                      aria-label={`${item.name}, ${item.detail}, ${item.equipment}, difficulty ${difficulty}, Fitness DB v4.2, ${item.media}`}
                      className="focus-ring w-full text-left"
                    >
                      <SolidCard>
                        <Asset
                          state={
                            item.id === "farmer-carry"
                              ? "media-null"
                              : item.id === "pull-up"
                              ? "media-low-confidence"
                              : "default"
                          }
                        />
                        <h3 className="mt-3 text-[14px] font-semibold text-white">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-[11px] text-white/45">
                          {item.detail} · {item.equipment}
                        </p>
                        <Difficulty level={item.difficulty} />
                      </SolidCard>
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {status && (
            <p
              role="status"
              className="rounded-xl bg-forest-green/10 p-3 text-[12px] text-white/70"
            >
              {status}
            </p>
          )}
          <GlassCard tone="muted">
            <SectionTitle title="Data & consent" />
            <p className="mt-1 text-[12px] text-white/55">
              Health category · Fitness DB v4.2 · library and saved selections ·
              fresh yesterday · database facts high confidence.
            </p>
            <ConsentRail compact controls={FULL_DATA_CONTROLS} />
          </GlassCard>
          <p className="px-2 text-center text-[11px] text-white/55">
            Not medical advice. Consult a provider before new training.
          </p>
        </main>
      </HifiShell>
    </div>
  );
}
