"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  CirclePlay,
  Flame,
  ImageOff,
  Pause,
  Play,
  RotateCcw,
  X,
} from "lucide-react";
import {
  BtnPrimary,
  BtnSecondary,
  CIAInsightCard,
  Chip,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassCard,
  HeatGrid,
  HifiShell,
  PaywallLock,
  ProgressRing,
  Provenance,
  SafetyCard,
  SectionTitle,
  SolidCard,
  TopBar,
  TrendChart,
} from "@/components/hifi/kit";

type View = "browse" | "active" | "paused" | "pose" | "summary" | "success";
const weeklyMinutes = [20, 0, 25, 15, 0, 30, 20];

export function S55YogaSessions() {
  const [fixture, setFixture] = useState("default-real");
  const [view, setView] = useState<View>("browse");
  const [rating, setRating] = useState<number | null>(null);
  const [filter, setFilter] = useState("Beginner");
  useEffect(() => {
    const next =
      new URLSearchParams(window.location.search).get("state") ??
      "default-real";
    queueMicrotask(() => {
      setFixture(next);
      setView(
        next === "session-active"
          ? "active"
          : next === "session-paused"
          ? "paused"
          : next === "pose-fallback"
          ? "pose"
          : next === "summary-disabled"
          ? "summary"
          : next === "summary-success"
          ? "success"
          : "browse"
      );
      setRating(next === "summary-success" ? 4 : null);
      setFilter(next === "filter-advanced" ? "Advanced" : "Beginner");
    });
  }, []);
  const low = fixture === "low-confidence";
  const empty = fixture === "honest-null";
  const error = fixture === "section-error";
  const controls = fixture === "data-controls";
  const premium = fixture === "premium-preview";

  const overlay =
    view !== "browse" ? (
      <YogaOverlay
        view={view}
        setView={setView}
        rating={rating}
        setRating={setRating}
      />
    ) : undefined;

  return (
    <HifiShell
      header={
        <TopBar
          title={
            <>
              Yoga <span className="text-emphasis">sessions</span>
            </>
          }
          right={<Chip tone="muted">Lv 12 · RPG profile</Chip>}
        />
      }
      activeTab="today"
      atmosphere="you"
      overlay={overlay}
    >
      <main
        data-f1-state={`55-${fixture}`}
        className="space-y-4 px-4 pb-8 pt-3"
      >
        <GlassCard tone="you" className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="text-brand-orange" />
                <span className="text-[24px] font-semibold tabular-nums text-paper-100">
                  {empty ? "0 days" : "12 days"}
                </span>
              </div>
              <p className="mt-1 text-[13px] text-paper-100/70">
                {empty ? "Your practice starts today" : "Longest 18 days"}
              </p>
            </div>
            <Provenance
              items={[low ? "Yoga logs · partial sync" : "Yoga logs · today"]}
            />
          </div>
          <div className="mt-4">
            <HeatGrid
              values={empty ? [0, 0, 0, 0, 0, 0, 0] : [3, 2, 3, 0, 2, 3, 3]}
              label={
                empty
                  ? "No yoga sessions logged"
                  : "Six practice days represented"
              }
            />
          </div>
        </GlassCard>

        <CIAInsightCard
          provenance={
            low
              ? ["Yoga logs · partial", "Wellbeing log · low confidence"]
              : ["Yoga logs · 14 days", "Wellbeing log · today"]
          }
          actions={
            <Chip interactive tone="cia" onClick={() => setView("active")}>
              Start beginner session
            </Chip>
          }
        >
          {empty
            ? "No pattern yet. A beginner mobility session is available without a premium lock."
            : "On days you logged morning yoga, your later energy check-ins were steadier. This is an observation, not a causal claim."}
        </CIAInsightCard>

        <div
          role="tablist"
          aria-label="Difficulty filter"
          className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4"
        >
          {["All", "Beginner", "Intermediate", "Advanced"].map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              onClick={() => setFilter(item)}
              className={`focus-ring min-h-11 shrink-0 rounded-full px-4 text-[13px] ${
                filter === item
                  ? "bg-paper-100 font-semibold text-ink-900"
                  : "border border-white/10 text-paper-100/80"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {error ? (
          <SolidCard className="p-5 text-center">
            <p role="alert" className="font-semibold text-paper-100">
              Sessions could not refresh
            </p>
            <p className="mt-1 text-[13px] text-paper-100/70">
              The local pose timer remains available.
            </p>
            <BtnSecondary className="mt-4" onClick={() => setView("active")}>
              <RotateCcw /> Retry
            </BtnSecondary>
          </SolidCard>
        ) : (
          <div className="space-y-3">
            <Session
              title="Morning flow"
              duration="30 min"
              poses="12 poses"
              onStart={() => setView("active")}
            />
            <Session
              title="Evening wind-down"
              duration="15 min"
              poses="8 poses"
              completed
              onStart={() => setView("active")}
            />
            {empty && (
              <Session
                title="Gentle mobility"
                duration="8 min"
                poses="6 poses"
                onStart={() => setView("active")}
              />
            )}
          </div>
        )}

        <div>
          <SectionTitle
            title="Pose library"
            action={
              <button
                type="button"
                className="focus-ring min-h-11 rounded-full px-3 text-[13px] text-brand-orange"
                onClick={() => setView("pose")}
              >
                See all
              </button>
            }
          />
          <div className="flex gap-3 overflow-x-auto pb-2">
            <Pose
              name="Downward dog"
              area="Full body"
              onOpen={() => setView("pose")}
            />
            <Pose
              name="Child's pose"
              area="Hips"
              onOpen={() => setView("pose")}
            />
            <Pose
              name="Mountain pose"
              area="Core"
              onOpen={() => setView("pose")}
            />
          </div>
        </div>

        {premium ? (
          <PaywallLock
            title="Advanced coaching preview"
            description="Advanced sequencing is premium. Beginner practices and safety guidance remain included."
            action={
              <BtnPrimary disabled>Premium preview unavailable</BtnPrimary>
            }
          >
            <TrendChart past={weeklyMinutes} label="Blurred advanced trend" />
          </PaywallLock>
        ) : (
          <SolidCard className="p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="font-semibold text-paper-100">
                  Weekly practice
                </h2>
                <p
                  className={`mt-1 text-[23px] font-semibold tabular-nums ${
                    low ? "text-paper-100/65" : "text-paper-100"
                  }`}
                >
                  {empty
                    ? "Not enough data"
                    : `${weeklyMinutes.reduce((a, b) => a + b, 0)} min`}
                </p>
                <p className="text-[12px] text-paper-100/65">
                  {empty ? "Complete a session to begin" : "This week"}
                </p>
              </div>
              <Provenance
                items={[
                  low ? "Session history · partial" : "Session history · today",
                ]}
              />
            </div>
            {!empty && (
              <TrendChart
                past={weeklyMinutes}
                label={`Weekly yoga minutes ${weeklyMinutes.join(", ")}`}
              />
            )}
          </SolidCard>
        )}

        <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2">
          <SolidCard className="flex items-center gap-3 p-4">
            <ProgressRing
              percent={empty ? 0 : 84}
              value={empty ? "0" : "42"}
              label="Poses mastered out of 50"
              size={82}
              tone="you"
            />
            <div>
              <p className="text-[13px] text-paper-100/70">Poses mastered</p>
              <Provenance items={["You logged"]} />
            </div>
          </SolidCard>
          <SolidCard className="p-4">
            <p className="text-[22px] font-semibold tabular-nums text-paper-100">
              {empty ? "0" : "12"}
            </p>
            <p className="text-[12px] text-paper-100/65">
              Sessions · this month
            </p>
            <p className="mt-3 text-[22px] font-semibold tabular-nums text-paper-100">
              {empty ? "0 h" : "4.5 h"}
            </p>
            <p className="text-[12px] text-paper-100/65">Practice · all time</p>
            <Provenance items={["Yoga logs · today"]} />
          </SolidCard>
        </div>

        <SolidCard className="p-4">
          <h2 className="font-semibold text-paper-100">Practice safely</h2>
          <p className="mt-1 text-[13px] leading-5 text-paper-100/70">
            Stop if you feel sharp pain, dizziness, faintness, chest pain, or
            breathing difficulty. Choose a comfortable range and seek qualified
            help when needed.
          </p>
        </SolidCard>
        <SafetyCard
          title="Wellbeing support"
          description="Open qualified local support guidance. This prototype does not place calls or send texts."
        />
        {controls && (
          <p className="text-[13px] text-paper-100/70">
            Health category · yoga logs · session scope · refreshed today ·
            confirmed · retained until deleted.
          </p>
        )}
        <ConsentRail compact controls={FULL_DATA_CONTROLS} />
      </main>
    </HifiShell>
  );
}

function Session({
  title,
  duration,
  poses,
  completed,
  onStart,
}: {
  title: string;
  duration: string;
  poses: string;
  completed?: boolean;
  onStart: () => void;
}) {
  return (
    <SolidCard className="flex min-h-[118px] overflow-hidden p-0">
      <div
        className="grid w-24 shrink-0 place-items-center bg-ink-900"
        role="img"
        aria-label={`${title} tutorial unavailable; written instructions included`}
      >
        <ImageOff className="text-paper-100/45" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between p-3">
        <div>
          <h3 className="text-[15px] font-semibold text-paper-100">{title}</h3>
          <p className="mt-1 text-[12px] text-paper-100/65">
            {duration} · {poses}
          </p>
        </div>
        {completed ? (
          <span className="flex min-h-11 items-center gap-1 text-[13px] text-forest-green">
            <Check /> Completed
          </span>
        ) : (
          <button
            type="button"
            onClick={onStart}
            className="focus-ring ml-auto flex min-h-11 items-center gap-2 rounded-full px-3 text-[13px] text-paper-100"
          >
            <Play /> Start
          </button>
        )}
      </div>
    </SolidCard>
  );
}

function Pose({
  name,
  area,
  onOpen,
}: {
  name: string;
  area: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="focus-ring w-[124px] shrink-0 overflow-hidden rounded-2xl bg-ink-brown-800 text-left"
    >
      <span
        className="grid h-20 place-items-center bg-ink-900"
        aria-hidden="true"
      >
        <ImageOff className="text-paper-100/35" />
      </span>
      <span className="block p-3">
        <strong className="block text-[13px] leading-4 text-paper-100">
          {name}
        </strong>
        <span className="mt-1 block text-[12px] text-paper-100/65">
          Beginner · {area}
        </span>
      </span>
    </button>
  );
}

function YogaOverlay({
  view,
  setView,
  rating,
  setRating,
}: {
  view: View;
  setView: (view: View) => void;
  rating: number | null;
  setRating: (value: number) => void;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const close = () => setView("browse");
  useEffect(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current
      ?.querySelector<HTMLElement>(
        "button:not(:disabled), input:not(:disabled), textarea:not(:disabled), [href]"
      )
      ?.focus();
    return () => returnFocusRef.current?.focus();
  }, []);
  const handleKeys = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const controls = [
      ...(dialogRef.current?.querySelectorAll<HTMLElement>(
        "button:not(:disabled), input:not(:disabled), textarea:not(:disabled), [href]"
      ) ?? []),
    ];
    if (!controls.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  return (
    <div className="absolute inset-0 z-50 flex items-end bg-ink-900/95">
      <section
        ref={dialogRef}
        onKeyDown={handleKeys}
        className="w-full rounded-t-[28px] border border-white/15 bg-ink-brown-800 p-5 shadow-3"
        role="dialog"
        aria-modal="true"
        aria-labelledby="yoga-overlay-title"
      >
        <div className="flex items-center justify-between">
          <h2
            id="yoga-overlay-title"
            className="text-[21px] font-semibold text-paper-100"
          >
            {view === "pose"
              ? "Downward dog"
              : view === "summary" || view === "success"
              ? "Session summary"
              : "Morning flow"}
          </h2>
          <button
            type="button"
            onClick={close}
            className="focus-ring grid h-11 w-11 place-items-center rounded-full"
            aria-label="Close yoga session"
          >
            <X />
          </button>
        </div>
        {view === "pose" ? (
          <div className="mt-5">
            <div className="grid h-40 place-items-center rounded-2xl bg-ink-900">
              <ImageOff className="text-paper-100/40" />
              <span className="sr-only">Tutorial unavailable</span>
            </div>
            <p className="mt-4 text-[14px] leading-6 text-paper-100/75">
              Begin on hands and knees. Lift your hips gently, keep a soft bend
              in the knees, and stop with pain or dizziness.
            </p>
            <BtnPrimary
              className="mt-4 w-full"
              onClick={() => setView("active")}
            >
              Start with instructions
            </BtnPrimary>
          </div>
        ) : view === "success" ? (
          <div className="py-8 text-center" role="status">
            <Check className="mx-auto h-11 w-11 text-forest-green" />
            <p className="mt-3 font-semibold text-paper-100">Session saved</p>
            <p className="mt-1 text-[13px] text-paper-100/70">
              30 minutes added via yoga logs.
            </p>
            <BtnPrimary className="mt-5 w-full" onClick={close}>
              Done
            </BtnPrimary>
          </div>
        ) : view === "summary" ? (
          <div className="mt-5">
            <p className="text-paper-100">Rate the session to save it.</p>
            <div
              className="mt-3 flex justify-between"
              role="radiogroup"
              aria-label="Yoga session rating"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={rating === value}
                  onClick={() => setRating(value)}
                  className={`focus-ring h-11 w-11 rounded-full border ${
                    rating === value
                      ? "border-brand-orange bg-brand-orange text-ink-900"
                      : "border-white/15 text-paper-100"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            <BtnPrimary
              className="mt-5 w-full"
              disabled={rating === null}
              onClick={() => setView("success")}
            >
              Save session
            </BtnPrimary>
          </div>
        ) : (
          <div className="mt-6 text-center">
            <div
              className="mx-auto grid h-44 w-44 place-items-center rounded-full border-8 border-brand-orange/70 bg-ink-900"
              role="timer"
              aria-label={`${
                view === "paused" ? "Paused" : "Pose active"
              }, 22 seconds remaining`}
            >
              <div>
                <p className="text-[12px] uppercase tracking-widest text-paper-100/65">
                  {view === "paused" ? "Paused" : "Hold gently"}
                </p>
                <p className="mt-2 text-[34px] font-semibold tabular-nums text-paper-100">
                  0:22
                </p>
              </div>
            </div>
            <p className="mt-4 text-[13px] text-paper-100/70">
              Stop for sharp pain, dizziness, faintness, chest pain, or
              breathing difficulty.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <BtnSecondary
                onClick={() => setView(view === "paused" ? "active" : "paused")}
              >
                {view === "paused" ? <CirclePlay /> : <Pause />}
                {view === "paused" ? "Resume" : "Pause"}
              </BtnSecondary>
              <BtnPrimary onClick={() => setView("summary")}>Finish</BtnPrimary>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
