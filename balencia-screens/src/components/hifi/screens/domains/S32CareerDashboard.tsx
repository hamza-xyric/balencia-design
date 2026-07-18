"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, BookOpen, Check, Users } from "lucide-react";
import {
  BtnPrimary,
  Chip,
  CIAInsightCard,
  ConsentRail,
  FULL_DATA_CONTROLS,
  FloatingQuickLog,
  GlassCard,
  HifiShell,
  PaywallLock,
  ProgressBar,
  ProgressRing,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
  TrendChart,
} from "@/components/hifi/kit";

type Fixture =
  | "default"
  | "low-confidence"
  | "empty"
  | "error"
  | "offline"
  | "success"
  | "disabled"
  | "data-controls"
  | "premium-preview"
  | "log-action";

export function S32CareerDashboard() {
  const [fixture, setFixture] = useState<Fixture>("default");
  const [actionDone, setActionDone] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const next = new URLSearchParams(window.location.search).get(
        "state"
      ) as Fixture | null;
      setFixture(next ?? "default");
      setActionDone(next === "success");
      setStatus(
        next === "log-action"
          ? "Local career action log opened. Nothing was synced."
          : ""
      );
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const low = fixture === "low-confidence";
  const empty = fixture === "empty";
  const blocked = fixture === "offline" || fixture === "disabled";
  const errored = fixture === "error";

  function completeAction() {
    if (blocked) return;
    setActionDone((value) => !value);
    setStatus(
      actionDone
        ? "Career action returned to open."
        : "+15 XP · Career · local prototype outcome"
    );
  }

  return (
    <HifiShell
      header={
        <TopBar
          title="Career & Work"
          eyebrow="Amira"
          right={<Chip tone="you">Career</Chip>}
          back
        />
      }
      activeTab="today"
      bottomAction={
        <FloatingQuickLog
          label="Log Action"
          href="/screens/32?state=log-action"
        />
      }
    >
      <main className="space-y-4 px-4 pb-4 pt-3" data-state={`32-${fixture}`}>
        {fixture === "success" && (
          <Chip tone="done">Career action completed locally</Chip>
        )}
        {fixture === "data-controls" && (
          <Chip tone="you">Career data controls open below</Chip>
        )}
        {fixture === "premium-preview" && (
          <Chip tone="cia">Premium pattern preview</Chip>
        )}
        {fixture === "disabled" && (
          <Chip>Career actions unavailable for this fixture</Chip>
        )}
        <p className="text-xs text-white/45">
          Your career <span className="text-emphasis">dashboard</span>.
        </p>
        {(blocked || errored) && (
          <SolidCard className="border-brand-orange/35">
            <p className="text-sm text-white/80">
              {blocked
                ? "Offline · cached career plan is read-only."
                : "Could not load Goals preview."}
            </p>
            {errored && (
              <button
                type="button"
                onClick={() => {
                  setFixture("default");
                  setStatus("Career preview restored locally.");
                }}
                className="focus-ring mt-2 min-h-11 rounded-full border border-white/15 px-4 text-sm"
              >
                Retry locally
              </button>
            )}
          </SolidCard>
        )}

        <CIAInsightCard
          eyebrow="CIA synthesis"
          provenance={[
            low ? "Estimated · low confidence" : "Derived · local CIA demo",
          ]}
          actions={
            <BtnPrimary
              onClick={() => setStatus("Deep work block previewed locally.")}
              disabled={blocked}
            >
              Plan deep work block
            </BtnPrimary>
          }
        >
          <p className="text-sm text-white/80">
            {low
              ? "A tentative pattern may support a morning focus block."
              : "Your logged pattern suggests a 10am deep work block after morning exercise."}
          </p>
        </CIAInsightCard>

        <section>
          <SectionTitle
            title="Active Missions"
            meta={empty ? "0 total" : "3 total"}
          />
          {empty ? (
            <SolidCard>
              <p className="text-sm text-white/75">
                Not enough data yet — add your next career mission.
              </p>
              <button
                type="button"
                className="focus-ring mt-3 min-h-11 rounded-full bg-brand-orange px-4 text-sm font-semibold text-ink-900"
                onClick={() =>
                  setStatus("Create mission preview opened locally.")
                }
              >
                Create mission
              </button>
            </SolidCard>
          ) : (
            <>
              <GlassCard tone="you">
                <div className="flex items-center gap-4 p-4">
                  <ProgressRing
                    percent={low ? 64 : 64}
                    value="64%"
                    size={96}
                    tone="you"
                    label={
                      low
                        ? "Estimated mission progress, low confidence"
                        : "Mission progress, local Goals demo"
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base text-white">
                      Get Promoted To Senior
                    </h3>
                    <p className="mt-1 text-xs text-white/55">
                      Next: Refresh Portfolio
                    </p>
                    <Provenance
                      items={[
                        low
                          ? "Estimated · low confidence"
                          : "Bundled Goals demo",
                      ]}
                    />
                  </div>
                </div>
              </GlassCard>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Mission
                  icon={<BookOpen size={20} />}
                  title="Learn Python"
                  progress={32}
                />
                <Mission
                  icon={<Users size={20} />}
                  title="Reach Mentor"
                  progress={50}
                />
              </div>
            </>
          )}
        </section>

        <section>
          <SectionTitle
            title="Today's Actions"
            meta={`${actionDone ? 0 : 1} remaining`}
          />
          <SolidCard>
            <button
              type="button"
              className="focus-ring flex min-h-14 w-full items-center gap-3 p-4 text-left"
              disabled
            >
              <span className="grid h-6 w-6 place-items-center rounded-md bg-forest-green text-ink-900">
                <Check size={16} />
              </span>
              <span className="flex-1 text-sm text-white/50 line-through">
                Review Quarterly Missions
              </span>
              <span className="text-xs text-white/40">+10 XP</span>
            </button>
            <div className="mx-4 border-t border-white/10" />
            <button
              type="button"
              onClick={completeAction}
              disabled={blocked}
              aria-pressed={actionDone}
              className="focus-ring flex min-h-14 w-full items-center gap-3 p-4 text-left disabled:opacity-40"
            >
              <span
                className={`grid h-6 w-6 place-items-center rounded-md border ${
                  actionDone
                    ? "border-forest-green bg-forest-green text-ink-900"
                    : "border-white/20"
                }`}
              >
                {actionDone && <Check size={16} />}
              </span>
              <span
                className={`flex-1 text-sm ${
                  actionDone ? "text-white/50 line-through" : "text-white"
                }`}
              >
                Read 1 Chapter Of Deep Work
              </span>
              <span className="text-xs text-brand-orange">+15 XP</span>
            </button>
          </SolidCard>
        </section>

        {!empty && (
          <section>
            <SectionTitle title="Growth Trajectory" />
            <SolidCard>
              <div className="space-y-5 p-4">
                <Skill name="Communication" value={8} low={low} />
                <Skill name="System Design" value={6} low={low} />
                <div>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-white/60">
                      6-week momentum
                    </span>
                    <span className="text-xs font-semibold text-brand-orange">
                      {low ? "Calibrating" : "+14 pts"}
                    </span>
                  </div>
                  <TrendChart
                    past={[4, 6, 5, 8, 7, 9]}
                    projected={low ? [] : [10, 12]}
                    milestones={[3, 5]}
                    label="Six historical weeks, two local CIA projected values, milestones at weeks three and five"
                  />
                  <Provenance
                    items={[
                      low
                        ? "Estimated · low confidence"
                        : "Derived · local CIA demo",
                    ]}
                  />
                </div>
              </div>
            </SolidCard>
          </section>
        )}

        <section>
          <SectionTitle title="Upcoming" />
          <div className="grid grid-cols-2 gap-3">
            <Deadline value="26" label="Review" />
            <Deadline value="2" label="Project deadline" urgent />
          </div>
        </section>
        <section>
          <SectionTitle title="High Motivation" />
          <PaywallLock
            description="Preview the consistency heatmap without activating billing."
            action={
              <button
                type="button"
                onClick={() =>
                  setStatus(
                    "Premium consistency preview opened locally. No purchase started."
                  )
                }
                className="focus-ring min-h-11 rounded-full bg-brand-orange px-4 text-sm font-semibold text-ink-900"
              >
                Preview premium
              </button>
            }
          >
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }, (_, i) => (
                <span key={i} className="h-5 rounded bg-brand-orange/30" />
              ))}
            </div>
          </PaywallLock>
        </section>
        <section>
          <SectionTitle title="Data controls" />
          <p className="text-xs leading-5 text-white/55">
            Category Career · bundled Goals demo and local CIA preview · this
            dashboard only · refreshed today · confidence shown inline ·
            retained for this session only.
          </p>
          <ConsentRail controls={FULL_DATA_CONTROLS} />
        </section>
        {status && (
          <p
            role="status"
            className="rounded-xl border border-brand-orange/25 bg-brand-orange/10 p-3 text-sm text-white/80"
          >
            {status}
          </p>
        )}
      </main>
    </HifiShell>
  );
}

function Mission({
  icon,
  title,
  progress,
}: {
  icon: React.ReactNode;
  title: string;
  progress: number;
}) {
  return (
    <SolidCard>
      <div className="space-y-3 p-4">
        <div className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.04] text-brand-orange">
          {icon}
        </div>
        <p className="text-sm text-white">{title}</p>
        <ProgressBar value={progress} tone="you" />
      </div>
    </SolidCard>
  );
}
function Skill({
  name,
  value,
  low,
}: {
  name: string;
  value: number;
  low: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between gap-2 text-sm">
        <span className="text-white/80">{name}</span>
        <span className={low ? "text-white/55" : "text-white"}>
          {value} / 10 · target 10
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-brand-orange"
          style={{ width: `${value * 10}%` }}
        />
        <span
          className="absolute right-0 top-1/2 h-4 w-0.5 -translate-y-1/2 bg-white/50"
          aria-hidden="true"
        />
      </div>
      <Provenance items={[low ? "Estimated · low confidence" : "You logged"]} />
    </div>
  );
}
function Deadline({
  value,
  label,
  urgent = false,
}: {
  value: string;
  label: string;
  urgent?: boolean;
}) {
  return (
    <SolidCard>
      <div className="space-y-2 p-4">
        <div className="flex items-center gap-2">
          <strong className={urgent ? "text-brand-orange" : "text-white"}>
            {value}
          </strong>
          <span className="text-xs text-white/45">DAYS</span>
          {urgent && <AlertTriangle size={14} className="text-brand-orange" />}
        </div>
        <p className="text-sm text-white/80">{label}</p>
      </div>
    </SolidCard>
  );
}
