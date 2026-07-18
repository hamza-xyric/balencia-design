"use client";

import { useEffect, useState } from "react";
import {
  Ban,
  BellOff,
  Crown,
  Download,
  EyeOff,
  Info,
  MapPin,
  Trophy,
  X,
} from "lucide-react";
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassCard,
  HifiShell,
  MomentumBar,
  Provenance,
  SolidCard,
  TopBar,
  cx,
} from "@/components/hifi/kit";
import { E1Modal } from "../intelligence/E1Modal";
import { H1TextScaleScope } from "./H1TextScaleScope";

const states = [
  "default-consented",
  "consent-required",
  "low-confidence-cached",
  "honest-null-private",
  "skeleton",
  "error-cached",
  "offline",
  "filter-competition",
  "filter-country",
  "period-month",
  "period-all-time",
  "own-profile",
  "limited-profile",
  "fairness-open",
  "opt-out-confirm",
  "opt-out-success",
  "report-person",
  "mute-person",
  "block-confirm",
  "data-controls",
] as const;
type Fixture = (typeof states)[number];
type Panel =
  | "consent"
  | "own"
  | "person"
  | "fairness"
  | "optout"
  | "report"
  | "mute"
  | "block"
  | "data"
  | null;
const rows = [
  {
    rank: 4,
    name: "Omar",
    level: 14,
    delta: "+5",
    xp: "3,410",
    domain: "Finance",
  },
  {
    rank: 5,
    name: "Priya",
    level: 11,
    delta: "+1",
    xp: "3,200",
    domain: "Wellbeing",
  },
  {
    rank: 6,
    name: "Yara",
    level: 12,
    delta: "No change",
    xp: "2,980",
    domain: "Learning category",
  },
];

export function S39Leaderboard() {
  const [fixture, setFixture] = useState<Fixture>("default-consented"),
    [scope, setScope] = useState("Global"),
    [period, setPeriod] = useState("This week"),
    [panel, setPanel] = useState<Panel>(null),
    [status, setStatus] = useState(
      "Consented bundled bracket preview · refreshed today."
    ),
    [visible, setVisible] = useState(true),
    [selected, setSelected] = useState("Omar");
  const [blockedPeople, setBlockedPeople] = useState<string[]>([]);
  const [mutedTargets, setMutedTargets] = useState<string[]>([]);
  const [reportDraftTargets, setReportDraftTargets] = useState<string[]>([]);
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("state");
    const f = (states as readonly string[]).includes(q ?? "")
      ? (q as Fixture)
      : "default-consented";
    queueMicrotask(() => {
      setFixture(f);
      setBlockedPeople([]);
      setMutedTargets([]);
      setReportDraftTargets([]);
      setSelected("Omar");
      setVisible(
        f !== "consent-required" &&
          f !== "honest-null-private" &&
          f !== "opt-out-success"
      );
      setStatus(
        f === "low-confidence-cached"
          ? "Cached bundled bracket · freshness unavailable · low confidence."
          : f === "error-cached"
          ? "Ranking refresh failed. Showing a cached bundled preview with live confirmation unavailable."
          : f === "offline"
          ? "Offline · cached bundled bracket · freshness and live confirmation unavailable."
          : f === "consent-required" || f === "honest-null-private"
          ? "Ranking data remains private until Amira explicitly consents."
          : "Consented bundled bracket preview · refreshed today."
      );
      if (f === "consent-required") setPanel("consent");
      if (f === "filter-competition") setScope("Competitions");
      if (f === "filter-country") setScope("Country");
      if (f === "period-month") setPeriod("This month");
      if (f === "period-all-time") setPeriod("All time");
      if (f === "own-profile") setPanel("own");
      if (f === "limited-profile") setPanel("person");
      if (f === "fairness-open") setPanel("fairness");
      if (f === "opt-out-confirm") setPanel("optout");
      if (f === "opt-out-success") {
        setVisible(false);
        setStatus(
          "Amira’s ranking hidden locally. Re-enable remains available."
        );
      }
      if (f === "report-person") setPanel("report");
      if (f === "mute-person") setPanel("mute");
      if (f === "block-confirm") setPanel("block");
      if (f === "data-controls") setPanel("data");
    });
  }, []);
  const privateState = !visible,
    low = fixture === "low-confidence-cached",
    offline = fixture === "offline",
    cachedError = fixture === "error-cached",
    degraded = low || offline || cachedError;
  const visibleRows = rows.filter((row) => !blockedPeople.includes(row.name));
  const nextBlockTarget = privateState ? undefined : visibleRows[0]?.name;
  const selectedMuted = mutedTargets.includes(selected);
  const dataSummary = low
    ? "Category ranking · bundled local bracket · Level 11–15 audience · cached snapshot · freshness unavailable · low confidence · session retention."
    : cachedError
    ? "Category ranking · bundled local bracket · Level 11–15 audience · refresh failed · cached snapshot · live confirmation unavailable · session retention."
    : offline
    ? "Category ranking · bundled local bracket · Level 11–15 audience · offline cached snapshot · freshness and live confirmation unavailable · session retention."
    : "Category ranking · bundled local bracket · Level 11–15 audience · refreshed today · confirmed fixture · session retention.";
  const title =
    panel === "consent"
      ? "Ranking consent"
      : panel === "own"
      ? "Your ranking profile"
      : panel === "person"
      ? `${selected} limited profile`
      : panel === "fairness"
      ? "Fairness and bracket"
      : panel === "optout"
      ? "Hide your ranking?"
      : panel === "report"
      ? `Report ${selected}?`
      : panel === "mute"
      ? `${selectedMuted ? "Unmute" : "Mute"} ${selected}?`
      : panel === "block"
      ? `Block ${selected}?`
      : "Ranking data controls";
  const overlay = panel ? (
    <E1Modal
      label={title}
      onClose={() => setPanel(null)}
      className="outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
    >
      <div className="rounded-[28px] border border-white/10 bg-ink-900 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-white">{title}</h2>
          <button
            aria-label="Close dialog"
            className="grid h-11 w-11 shrink-0 place-items-center"
            onClick={() => setPanel(null)}
          >
            <X />
          </button>
        </div>
        {panel === "consent" ? (
          <>
            <p className="mt-3 text-sm text-white/70">
              Join the Level 11–15 bracket preview? Share rank, character level,
              XP, movement, streak and selected category with this bracket only.
              Session retention; revoke anytime.
            </p>
            <div className="mt-4 flex gap-2">
              <BtnGhost
                onClick={() => {
                  setVisible(false);
                  setPanel(null);
                  setStatus("Ranking declined. Your data stays private.");
                }}
              >
                Stay private
              </BtnGhost>
              <BtnPrimary
                onClick={() => {
                  setVisible(true);
                  setPanel(null);
                  setStatus("Ranking preview consented locally.");
                }}
              >
                Join preview
              </BtnPrimary>
            </div>
          </>
        ) : panel === "data" ? (
          <>
            <p className="mt-3 text-sm text-white/70">
              {dataSummary}
            </p>
            <ConsentRail controls={FULL_DATA_CONTROLS} />
          </>
        ) : panel === "fairness" ? (
          <p className="mt-3 text-sm text-white/70">
            Level 11–15 bracket · weekly XP and consistency · bundled demo ·
            anti-cheat is explanatory only. Your climb is not a verdict.
          </p>
        ) : panel === "own" ? (
          <p className="mt-3 text-sm text-white/70">
            #12 · Character level 12 · 4,210 XP · +3 this week · visible to the
            consented Level 11–15 bracket.
          </p>
        ) : panel === "person" ? (
          <>
            <p className="mt-3 text-sm text-white/70">
              {selected}&apos;s bundled limited profile. Only bracket rank, XP,
              level and chosen category are visible.
            </p>
            <div className="mt-3 flex gap-2">
              <BtnSecondary
                disabled={offline}
                aria-describedby={
                  offline ? "leaderboard-offline-moderation-reason" : undefined
                }
                onClick={() => setPanel("report")}
              >
                Report
              </BtnSecondary>
              <BtnGhost
                disabled={offline}
                aria-describedby={
                  offline ? "leaderboard-offline-moderation-reason" : undefined
                }
                onClick={() => setPanel("block")}
              >
                Block
              </BtnGhost>
            </div>
            {offline && (
              <p
                id="leaderboard-offline-moderation-reason"
                className="mt-3 text-xs text-brand-orange"
              >
                Profile inspection is read-only offline. Reconnect to report or
                block this member.
              </p>
            )}
          </>
        ) : (
          <>
            <p className="mt-3 text-sm text-white/70">
              {panel === "optout"
                ? "This changes only Amira’s own ranking visibility in the local preview. Re-enable remains available."
                : `This local preview names ${selected}. Nothing is sent, published, muted or blocked externally.`}
            </p>
            <div className="mt-4 flex gap-2">
              <BtnSecondary onClick={() => setPanel(null)}>Cancel</BtnSecondary>
              <BtnPrimary
                disabled={
                  offline &&
                  (panel === "report" || panel === "mute" || panel === "block")
                }
                onClick={() => {
                  if (
                    offline &&
                    (panel === "report" || panel === "mute" || panel === "block")
                  )
                    return;
                  if (panel === "optout") {
                    setVisible(false);
                    setStatus(
                      "Amira’s ranking hidden locally. Re-enable remains available."
                    );
                  } else if (panel === "block") {
                    const blockedName = selected;
                    const remainingCount = rows.filter(
                      (row) =>
                        row.name !== blockedName &&
                        !blockedPeople.includes(row.name)
                    ).length;
                    setBlockedPeople((people) =>
                      people.includes(blockedName)
                        ? people
                        : [...people, blockedName]
                    );
                    setSelected(
                      rows.find(
                        (row) =>
                          row.name !== blockedName &&
                          !blockedPeople.includes(row.name)
                      )?.name ?? ""
                    );
                    setStatus(
                      `${blockedName} blocked locally and removed from this preview. ${remainingCount} bracket members remain.`
                    );
                  } else if (panel === "mute") {
                    setMutedTargets((targets) =>
                      selectedMuted
                        ? targets.filter((target) => target !== selected)
                        : [...targets, selected]
                    );
                    setStatus(
                      selectedMuted
                        ? `${selected} unmuted locally. Preview alerts are restored.`
                        : `${selected} muted locally. Preview alerts are suppressed; unmute is available below.`
                    );
                  } else {
                    setReportDraftTargets((targets) =>
                      targets.includes(selected)
                        ? targets
                        : [...targets, selected]
                    );
                    setStatus(
                      `Report draft prepared for ${selected} and shown below. Nothing was sent.`
                    );
                  }
                  setPanel(null);
                }}
              >
                Confirm
              </BtnPrimary>
            </div>
          </>
        )}
      </div>
    </E1Modal>
  ) : undefined;
  return (
    <HifiShell
      header={
        <TopBar
          title="Leaderboard"
          back
          right={
            <button
              aria-label="Fairness info"
              onClick={() => setPanel("fairness")}
              className="grid h-11 w-11 shrink-0 place-items-center"
            >
              <Info />
            </button>
          }
        />
      }
      activeTab="me"
      atmosphere="you"
      overlay={overlay}
    >
      <main
        data-h1-state={`39-${fixture}`}
        data-moderation-actions={offline ? "disabled" : "enabled"}
        data-muted-target-count={mutedTargets.length}
        data-report-draft-count={reportDraftTargets.length}
        className="space-y-4 px-4 pb-6 pt-3"
      >
        <H1TextScaleScope />
        {fixture === "skeleton" ? (
          <div
            aria-label="Loading leaderboard"
            className="space-y-3 animate-pulse motion-reduce:animate-none"
          >
            <div className="h-24 rounded-2xl bg-white/5" />
            <div className="h-48 rounded-2xl bg-white/5" />
            <div className="h-32 rounded-2xl bg-white/5" />
          </div>
        ) : (
          <>
            {(offline || cachedError) && (
              <SolidCard>
                <p className="font-medium">
                  {offline
                    ? "Offline · ranking changes disabled"
                    : "Ranking refresh failed · cached preview"}
                </p>
                <p className="text-xs text-white/55">
                  Last bundled snapshot retained; no server request occurred.
                </p>
              </SolidCard>
            )}
            {mutedTargets.length > 0 && (
              <SolidCard>
                <p className="text-sm font-medium text-white">
                  Local alert mutes
                </p>
                <div className="mt-2 space-y-2">
                  {mutedTargets.map((target) => (
                    <BtnSecondary
                      key={target}
                      className="w-full"
                      onClick={() => {
                        setMutedTargets((targets) =>
                          targets.filter((item) => item !== target)
                        );
                        setStatus(
                          `${target} unmuted locally. Preview alerts are restored.`
                        );
                      }}
                    >
                      Unmute {target}
                    </BtnSecondary>
                  ))}
                </div>
              </SolidCard>
            )}
            {reportDraftTargets.length > 0 && (
              <SolidCard>
                <p className="text-sm font-medium text-white">
                  Local report drafts
                </p>
                <div className="mt-2 space-y-2">
                  {reportDraftTargets.map((target) => (
                    <BtnSecondary
                      key={target}
                      className="w-full"
                      onClick={() => {
                        setReportDraftTargets((targets) =>
                          targets.filter((item) => item !== target)
                        );
                        setStatus(`${target} report draft deleted locally.`);
                      }}
                    >
                      Delete {target} report draft
                    </BtnSecondary>
                  ))}
                </div>
              </SolidCard>
            )}
            <p className="text-[0.9375rem] text-white/60">
              Your climb on the community{" "}
              <span className="text-emphasis">leaderboard</span>. Progress, not
              comparison.
            </p>
            <div className="space-y-2">
              <div
                role="tablist"
                aria-label="Ranking scope"
                className="grid grid-cols-3 gap-1 rounded-xl bg-white/5 p-1"
              >
                {[
                  ["Global", <Info key="g" />],
                  ["Competitions", <Trophy key="t" />],
                  ["Country", <MapPin key="m" />],
                ].map(([name, icon]) => (
                  <button
                    key={name as string}
                    role="tab"
                    aria-selected={scope === name}
                    onClick={() => {
                      setScope(name as string);
                      setStatus(`${name} bundled ranking selected.`);
                    }}
                    className={cx(
                      "flex min-h-11 items-center justify-center gap-1 text-xs",
                      scope === name
                        ? "rounded-lg bg-white/10 text-white"
                        : "text-white/50"
                    )}
                  >
                    {icon}
                    {name}
                  </button>
                ))}
              </div>
              <div
                role="tablist"
                aria-label="Ranking period"
                className="grid grid-cols-3 gap-1 rounded-xl bg-white/[0.03] p-1"
              >
                {["This week", "This month", "All time"].map((name) => (
                  <button
                    key={name}
                    role="tab"
                    aria-selected={period === name}
                    onClick={() => {
                      setPeriod(name);
                      setStatus(`${name} ranking window selected.`);
                    }}
                    className={cx(
                      "min-h-11 rounded-lg text-xs",
                      period === name
                        ? "bg-white/10 text-white"
                        : "text-white/50"
                    )}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
            {privateState ? (
              <GlassCard tone="muted">
                <div className="space-y-3 p-4">
                  <h2 className="text-lg text-white">Ranking is private</h2>
                  <p className="text-sm text-white/65">
                    No rank, XP, streak, movement or other-member identity is
                    exposed.
                  </p>
                  <BtnPrimary onClick={() => setPanel("consent")}>
                    Review ranking consent
                  </BtnPrimary>
                </div>
              </GlassCard>
            ) : (
              <>
                <Provenance
                  items={[
                    degraded
                      ? "Cached · low confidence"
                      : "Bundled bracket · confirmed",
                    `${scope} · ${period}`,
                    "Level 11–15 audience",
                  ]}
                />
                <GlassCard tone="muted">
                  <div className="flex items-end gap-3 px-2 pt-5">
                    <Podium rank={2} name="Ahmed" level={15} />
                    <Podium rank={1} name="Sarah" level={13} />
                    <Podium rank={3} name="Lisa" level={11} />
                  </div>
                </GlassCard>
                <button
                  onClick={() => setPanel("own")}
                  className="focus-ring w-full text-left"
                >
                  <GlassCard tone="you">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-semibold">Amira (You)</p>
                          <p className="text-xs text-white/55">
                            #12 · Character level 12 · +3 this week
                          </p>
                        </div>
                        <p className="font-semibold">4,210 XP</p>
                      </div>
                      <div className="flex justify-between text-xs text-white/60">
                        <span>XP to level 13</span>
                        <span>680 / 1,000 · 68%</span>
                      </div>
                      <MomentumBar value={68} label="68% to next level" />
                      <p className="text-xs text-white/55">
                        21 day streak ·{" "}
                        {degraded
                          ? "cached, low confidence"
                          : "confirmed bundled demo"}
                      </p>
                    </div>
                  </GlassCard>
                </button>
                <SolidCard>
                  <div
                    data-visible-member-count={visibleRows.length}
                    className="border-b border-white/5 px-3 py-2 text-xs text-white/55"
                  >
                    {visibleRows.length} bracket members shown
                  </div>
                  {visibleRows.map((r) => (
                    <button
                      key={r.name}
                      aria-label={`Rank ${r.rank}, ${r.name}, character level ${r.level}, movement ${r.delta}, ${r.xp} XP, ${r.domain}, ${period}, consented bracket visibility${
                        mutedTargets.includes(r.name)
                          ? ", alerts muted locally"
                          : ""
                      }`}
                      onClick={() => {
                        setSelected(r.name);
                        setPanel("person");
                      }}
                      className="focus-ring flex min-h-16 w-full items-center gap-3 border-b border-white/5 p-3 text-left last:border-0"
                    >
                      <span className="w-6">#{r.rank}</span>
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-white/5">
                        {r.name[0]}
                      </span>
                      <span className="min-w-10 flex-1">
                        <span className="block text-sm">{r.name}</span>
                        <span className="text-xs text-white/50">
                          Lv {r.level} · {r.delta}
                          {mutedTargets.includes(r.name)
                            ? " · alerts muted"
                            : ""}
                        </span>
                      </span>
                      <span className="text-xs text-white/60">{r.domain}</span>
                      <strong className="text-sm">{r.xp}</strong>
                    </button>
                  ))}
                </SolidCard>
              </>
            )}
            <GlassCard tone="muted">
              <div className="space-y-3 p-4">
                <h2 className="font-semibold">Visibility and controls</h2>
                <p className="text-xs text-white/60">
                  Level 11–15 bracket only. Opt out is reversible.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Action
                    icon={<EyeOff />}
                    label={visible ? "Opt out" : "Re-enable"}
                    onClick={() =>
                      visible ? setPanel("optout") : setPanel("consent")
                    }
                    disabled={offline}
                  />
                  <Action
                    icon={<BellOff />}
                    label={
                      mutedTargets.includes("ranking alerts")
                        ? "Unmute alerts"
                        : "Mute alerts"
                    }
                    onClick={() => {
                      setSelected("ranking alerts");
                      setPanel("mute");
                    }}
                    disabled={offline}
                  />
                  <Action
                    icon={<Download />}
                    label="Export preview"
                    onClick={() =>
                      setStatus(
                        "Ranking export is unavailable in this visual preview. No file was created."
                      )
                    }
                  />
                  <Action
                    icon={<Ban />}
                    label={
                      nextBlockTarget
                        ? `Block ${nextBlockTarget}`
                        : "No members to block"
                    }
                    onClick={() => {
                      if (!nextBlockTarget) return;
                      setSelected(nextBlockTarget);
                      setPanel("block");
                    }}
                    disabled={offline || !nextBlockTarget}
                  />
                </div>
              </div>
            </GlassCard>
            <BtnGhost onClick={() => setPanel("data")}>Data controls</BtnGhost>
            <p role="status" className="text-xs text-white/60">
              {status}
            </p>
          </>
        )}
      </main>
    </HifiShell>
  );
}
function Podium({
  rank,
  name,
  level,
}: {
  rank: number;
  name: string;
  level: number;
}) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2">
      <span className="grid h-12 w-12 place-items-center rounded-full border border-white/20">
        {rank === 1 && <Crown className="h-4 w-4" />}
        {name[0]}
      </span>
      <span className="text-xs">{name}</span>
      <span className="text-xs text-white/50">
        #{rank} · Lv {level}
      </span>
    </div>
  );
}
function Action({
  icon,
  label,
  onClick,
  disabled = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="focus-ring flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 text-xs disabled:opacity-40"
    >
      {icon}
      {label}
    </button>
  );
}
