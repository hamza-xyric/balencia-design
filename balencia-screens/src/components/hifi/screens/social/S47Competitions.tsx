"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  ChevronRight,
  Lock,
  ShieldCheck,
  Trophy,
  Users,
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
  ProgressBar,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
} from "@/components/hifi/kit";
import { E1Modal } from "../intelligence/E1Modal";
import { H1TextScaleScope } from "./H1TextScaleScope";

const states = [
  "default-joined",
  "default-unjoined",
  "low-confidence-cached",
  "honest-null",
  "skeleton",
  "error-cached",
  "offline",
  "filter-upcoming",
  "invitation-sheet",
  "rules-detail",
  "join-confirm",
  "join-success",
  "join-disabled-consent",
  "premium-preview",
  "visibility-controls",
  "report-handoff",
] as const;
type Fixture = (typeof states)[number];
const filters = ["All", "Active", "Upcoming", "Past", "My challenges"] as const;
type ChallengeName =
  | "Step Challenge #12"
  | "Meditation Marathon"
  | "Weekend Warrior"
  | "Nutrition Challenge"
  | "Elite Cycling League";
type ChallengeRow = readonly [ChallengeName, string];
type InvitationStatus = "pending" | "accepted" | "declined";

export function S47Competitions() {
  const [fixture, setFixture] = useState<Fixture>("default-joined");
  const [filter, setFilter] = useState<(typeof filters)[number]>(
    fixture === "filter-upcoming" ? "Upcoming" : "All"
  );
  const [overlay, setOverlay] = useState<string | null>(
    fixture === "invitation-sheet"
      ? "invite"
      : fixture === "rules-detail"
      ? "rules"
      : fixture === "join-confirm"
      ? "join"
      : fixture === "premium-preview"
      ? "premium"
      : fixture === "visibility-controls"
      ? "visibility"
      : null
  );
  const [joined, setJoined] = useState(
    fixture !== "default-unjoined" &&
      fixture !== "join-confirm" &&
      fixture !== "join-disabled-consent"
  );
  const [selectedCompetition, setSelectedCompetition] =
    useState<ChallengeName>("Step Challenge #12");
  const [consent, setConsent] = useState(false);
  const [leaderboardAudience, setLeaderboardAudience] = useState<
    "Only me" | "Friends only"
  >("Only me");
  const [shareHealthProof, setShareHealthProof] = useState(false);
  const [invitationStatus, setInvitationStatus] =
    useState<InvitationStatus>("pending");
  const [mutedCompetition, setMutedCompetition] =
    useState<ChallengeName | null>(null);
  const [weekendInvitersBlocked, setWeekendInvitersBlocked] = useState(false);
  const [status, setStatus] = useState(
    fixture === "join-success"
      ? "Step Challenge joined in this local preview."
      : fixture === "report-handoff"
      ? "Report handoff ready for Step Challenge #12 · local context only."
      : ""
  );
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("state") as Fixture;
    const next = states.includes(q) ? q : "default-joined";
    queueMicrotask(() => {
      setFixture(next);
      setFilter(next === "filter-upcoming" ? "Upcoming" : "All");
      setOverlay(
        next === "invitation-sheet"
          ? "invite"
          : next === "rules-detail"
          ? "rules"
          : next === "join-confirm"
          ? "join"
          : next === "premium-preview"
          ? "premium"
          : next === "visibility-controls"
          ? "visibility"
          : null
      );
      setJoined(
        next !== "default-unjoined" &&
          next !== "join-confirm" &&
          next !== "join-disabled-consent"
      );
      setSelectedCompetition("Step Challenge #12");
      setConsent(false);
      setLeaderboardAudience("Only me");
      setShareHealthProof(false);
      setInvitationStatus("pending");
      setMutedCompetition(null);
      setWeekendInvitersBlocked(false);
      setStatus(
        next === "join-success"
          ? "Step Challenge joined in this local preview."
          : next === "report-handoff"
          ? "Report handoff ready for Step Challenge #12 · local context only."
          : ""
      );
    });
  }, []);
  const empty = fixture === "honest-null",
    low = fixture === "low-confidence-cached",
    connectivityBlocked = fixture === "offline" || fixture === "error-cached",
    degraded = low || connectivityBlocked,
    blocked = connectivityBlocked,
    joinRequirementsMissing =
      fixture === "join-disabled-consent" &&
      (!consent || leaderboardAudience !== "Friends only");
  const joinBlockedReason =
    fixture === "offline"
      ? "Competition membership is read-only while offline. Reconnect to review or change a membership."
      : fixture === "error-cached"
      ? "Competition membership is read-only while the competition source is unavailable. Retry the competition source before changing membership or proof."
      : "Joining is unavailable until competition rules and the friends-only leaderboard audience are reviewed.";
  const open = (v: string) => {
    if (connectivityBlocked && (v === "join" || v === "invite")) {
      setStatus(joinBlockedReason);
      return;
    }
    setOverlay(v);
  };
  const challengeRows: readonly ChallengeRow[] =
    filter === "Active"
      ? [
          [
            "Step Challenge #12",
            joined ? "Joined · 64%" : "Active · review to join",
          ],
        ]
      : filter === "Upcoming"
      ? [
          ["Meditation Marathon", "Starts Jun 10"],
          ["Weekend Warrior", "Starts Jun 14"],
        ]
      : filter === "Past"
      ? [["Nutrition Challenge", "Ended May 20"]]
      : filter === "My challenges"
      ? joined
        ? [["Step Challenge #12", "Joined · 64%"]]
        : []
      : [
          [
            "Step Challenge #12",
            joined ? "Joined · 64%" : "Active · review to join",
          ],
          ["Meditation Marathon", "Upcoming · Jun 10"],
          ["Elite Cycling League", "Premium preview"],
        ];
  return (
    <HifiShell
      header={<TopBar title="Competitions" eyebrow="Bundled demo" back />}
      activeTab="me"
      atmosphere="cia"
      overlay={
        overlay && (
          <E1Modal
            label={`${overlay} competition dialog`}
            onClose={() => setOverlay(null)}
            className="!bg-ink-900 outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            <h2 className="text-xl text-white">
              {overlay === "invite"
                ? "Invitation from Sarah and Ahmed"
                : overlay === "rules"
                ? "Step Challenge rules"
                : overlay === "join"
                ? "Review before joining"
                : overlay === "premium"
                ? "Premium challenge preview"
                : "Competition visibility"}
            </h2>
            {overlay === "invite" ? (
              <div className="mt-4 space-y-3">
                <p className="text-sm text-white/70">
                  Weekend Warrior challenge · friends-only leaderboard ·
                  declining does not affect your relationship.
                </p>
                <Link
                  href="/screens/64?context=competition&subject=Weekend%20Warrior"
                  data-report-subject="Weekend Warrior"
                  className="focus-ring inline-flex min-h-11 items-center rounded-full px-3 text-sm text-brand-orange"
                >
                  Report or mute Weekend Warrior
                </Link>
                <BtnSecondary
                  disabled={weekendInvitersBlocked}
                  onClick={() => {
                    setWeekendInvitersBlocked(true);
                    setInvitationStatus("declined");
                    setStatus(
                      "Sarah and Ahmed blocked locally for Weekend Warrior; the invitation was removed. Unblock is available below."
                    );
                    setOverlay(null);
                  }}
                >
                  {weekendInvitersBlocked
                    ? "Inviters blocked locally"
                    : "Block inviters Sarah and Ahmed"}
                </BtnSecondary>
                <div className="flex gap-2">
                  <BtnPrimary
                    disabled={blocked}
                    aria-describedby={
                      blocked ? "competition-join-disabled-reason" : undefined
                    }
                    onClick={() => {
                      if (blocked) return;
                      setInvitationStatus("accepted");
                      setStatus("Invitation accepted locally.");
                      setOverlay(null);
                    }}
                  >
                    Accept
                  </BtnPrimary>
                  <BtnGhost
                    disabled={blocked}
                    aria-describedby={
                      blocked ? "competition-join-disabled-reason" : undefined
                    }
                    onClick={() => {
                      if (blocked) return;
                      setInvitationStatus("declined");
                      setStatus("Invitation declined locally.");
                      setOverlay(null);
                    }}
                  >
                    Decline
                  </BtnGhost>
                </div>
              </div>
            ) : overlay === "rules" ? (
              <div className="mt-4 space-y-2 text-sm text-white/70">
                <p>14-day bundled demo · nine completed · five remaining.</p>
                <p>
                  Local step fixture · daily cap · minimum confidence ·
                  verification required.
                </p>
                <p>
                  No real health provider or public leaderboard is connected.
                </p>
              </div>
            ) : overlay === "join" ? (
              <div className="mt-4 space-y-3">
                <p className="text-sm text-white/70">
                  Step Challenge · local step fixture · current leaderboard
                  audience: {leaderboardAudience} · health proof {shareHealthProof
                    ? "ON"
                    : "OFF"} · leaving removes only this preview.
                </p>
                {fixture === "join-disabled-consent" && (
                  <p className="text-xs text-white/55">
                    This fixture requires Friends only plus rules review before
                    joining; health proof remains independently optional.
                  </p>
                )}
                <label className="flex min-h-11 items-center gap-3 text-sm text-white">
                  <input
                    type="checkbox"
                    checked={consent}
                    disabled={blocked}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="h-5 w-5 accent-brand-orange"
                  />
                  I reviewed the rules and audience
                </label>
                <BtnPrimary
                  disabled={
                    !consent ||
                    connectivityBlocked ||
                    (fixture === "join-disabled-consent" &&
                      leaderboardAudience !== "Friends only")
                  }
                  aria-describedby={
                    blocked ? "competition-join-disabled-reason" : undefined
                  }
                  onClick={() => {
                    if (blocked) return;
                    setJoined(true);
                    setStatus("Step Challenge joined in this local preview.");
                    setOverlay(null);
                  }}
                >
                  Join preview
                </BtnPrimary>
                {joinRequirementsMissing && (
                  <p className="text-xs text-brand-orange">
                    Review the rules here, then save Friends only in Visibility
                    before joining.
                  </p>
                )}
              </div>
            ) : overlay === "premium" ? (
              <div className="mt-4 space-y-3">
                <Lock className="text-brand-orange" />
                <p className="text-sm text-white/70">
                  Elite Cycling League is a locked visual preview. No purchase
                  or entitlement check occurs.
                </p>
                <BtnPrimary
                  onClick={() => {
                    setStatus(
                      "Premium locked preview reviewed locally; no purchase or additional view started."
                    );
                    setOverlay(null);
                  }}
                >
                  Done
                </BtnPrimary>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <label className="block text-sm text-white">
                  Leaderboard audience
                  <select
                    value={leaderboardAudience}
                    disabled={connectivityBlocked}
                    aria-describedby={
                      connectivityBlocked
                        ? "competition-join-disabled-reason"
                        : undefined
                    }
                    className="mt-1 h-12 w-full rounded-xl bg-white/10 px-3 text-base text-white disabled:opacity-40"
                    onChange={(event) =>
                      setLeaderboardAudience(
                        event.target.value as "Only me" | "Friends only"
                      )
                    }
                  >
                    <option>Only me</option>
                    <option>Friends only</option>
                  </select>
                </label>
                <label className="flex min-h-11 items-center gap-3 text-sm text-white">
                  <input
                    type="checkbox"
                    checked={shareHealthProof}
                    disabled={connectivityBlocked}
                    aria-describedby={
                      connectivityBlocked
                        ? "competition-join-disabled-reason"
                        : undefined
                    }
                    className="h-5 w-5 accent-brand-orange disabled:opacity-40"
                    onChange={(event) =>
                      setShareHealthProof(event.target.checked)
                    }
                  />
                  Share health proof
                </label>
                <p className="text-xs text-white/55">
                  Both choices are opt-in and reversible. No publication occurs.
                </p>
                <ConsentRail controls={FULL_DATA_CONTROLS} />
                <div className="flex gap-2">
                  <BtnGhost
                    disabled={connectivityBlocked}
                    onClick={() => {
                      setLeaderboardAudience("Only me");
                      setShareHealthProof(false);
                      setStatus(
                        "Competition visibility kept Only me with health proof off."
                      );
                      setOverlay(null);
                    }}
                  >
                    Keep private
                  </BtnGhost>
                  <BtnPrimary
                    disabled={connectivityBlocked}
                    onClick={() => {
                      setStatus(
                        `Competition visibility saved locally: ${leaderboardAudience}; health proof ${
                          shareHealthProof ? "on" : "off"
                        }. Reopen Visibility to change it.`
                      );
                      setOverlay(null);
                    }}
                  >
                    Save visibility preview
                  </BtnPrimary>
                </div>
              </div>
            )}
            <BtnGhost className="mt-3" onClick={() => setOverlay(null)}>
              Close
            </BtnGhost>
          </E1Modal>
        )
      }
    >
      <main
        data-h1-state={`47-${fixture}`}
        data-membership={joined ? "joined" : "not-joined"}
        data-selected-competition={empty ? "none" : selectedCompetition}
        data-invitation-status={invitationStatus}
        data-muted-competition={mutedCompetition ?? "none"}
        data-weekend-inviters={
          weekendInvitersBlocked ? "blocked" : "available"
        }
        data-leaderboard-audience={leaderboardAudience}
        data-health-proof={shareHealthProof ? "on" : "off"}
        className="space-y-5 px-4 pb-5 pt-3"
      >
        <H1TextScaleScope />
        {fixture === "skeleton" ? (
          <div
            aria-label="Loading competitions"
            className="space-y-3 animate-pulse motion-reduce:animate-none"
          >
            <div className="h-56 rounded-[28px] bg-white/10" />
            <div className="h-12 rounded-2xl bg-white/10" />
            <div className="h-40 rounded-[28px] bg-white/10" />
          </div>
        ) : (
          <>
            {(fixture === "error-cached" || fixture === "offline") && (
              <SolidCard className="p-4">
                <p className="font-medium text-white">
                  {fixture === "offline"
                    ? "Offline — cached challenges only"
                    : "Could not refresh competitions"}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Bundled demo cached today. Join and proof changes are
                  disabled.
                </p>
                {fixture === "error-cached" && (
                  <BtnSecondary
                    className="mt-3"
                    onClick={() =>
                      setStatus(
                        "Competition source retry previewed locally. Cached challenges remain; no network request occurred."
                      )
                    }
                  >
                    Retry competition source
                  </BtnSecondary>
                )}
              </SolidCard>
            )}
            {weekendInvitersBlocked && (
              <SolidCard className="p-4">
                <p className="text-sm text-white/70">
                  Sarah and Ahmed are blocked in the local Weekend Warrior
                  invitation preview. No external account changed.
                </p>
                <BtnSecondary
                  className="mt-3"
                  onClick={() => {
                    setWeekendInvitersBlocked(false);
                    setStatus(
                      "Sarah and Ahmed unblocked locally. The declined invitation was not restored."
                    );
                  }}
                >
                  Unblock Sarah and Ahmed
                </BtnSecondary>
              </SolidCard>
            )}
            {empty ? (
              <GlassCard tone="muted">
                <Trophy className="text-brand-orange" />
                <h2 className="mt-3 text-xl text-white">
                  No challenges in this filter
                </h2>
                <p className="mt-2 text-sm text-white/60">
                  Try another filter. Your progress is unchanged.
                </p>
                <BtnSecondary className="mt-4" onClick={() => setFilter("All")}>
                  Show all
                </BtnSecondary>
              </GlassCard>
            ) : (
              <GlassCard tone="you">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-brand-orange">
                      Featured challenge
                    </p>
                    <h2 className="mt-2 text-2xl text-white">Step Challenge</h2>
                    <p className="mt-1 text-xs text-white/55">
                      May 25 – Jun 8 · bundled demo
                    </p>
                  </div>
                  <Trophy className="text-brand-orange" />
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-3xl tabular-nums text-white">64%</p>
                    <p className="text-xs text-white/55">
                      9 completed of 14 · 5 days remaining
                    </p>
                  </div>
                  {joined ? (
                    <Chip tone="you">Rank #42 of 234</Chip>
                  ) : (
                    <Chip tone="muted">Rank after joining</Chip>
                  )}
                </div>
                <ProgressBar value={64} tone="you" />
                <Provenance
                  items={
                    low
                      ? ["Cached demo", "Estimated · low confidence"]
                      : fixture === "error-cached"
                      ? ["Cached competition source", "Refresh unavailable"]
                      : fixture === "offline"
                      ? ["Cached competition source", "Offline · read-only"]
                      : [
                          "Bundled local fixture",
                          "Fresh May 30",
                          "Confirmed demo",
                        ]
                  }
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  <BtnPrimary
                    disabled={blocked}
                    aria-describedby={
                      blocked || joinRequirementsMissing
                        ? "competition-join-disabled-reason"
                        : undefined
                    }
                    onClick={() => (joined ? open("rules") : open("join"))}
                  >
                    {joined ? "View rules" : "Review and join"}
                  </BtnPrimary>
                  <BtnGhost onClick={() => open("visibility")}>
                    Visibility
                  </BtnGhost>
                </div>
                {(blocked || joinRequirementsMissing) && (
                  <p
                    id="competition-join-disabled-reason"
                    role="status"
                    className="mt-3 text-xs text-brand-orange"
                  >
                    {joinBlockedReason}
                  </p>
                )}
              </GlassCard>
            )}
            {!empty && (
              <>
                <section>
                  <SectionTitle
                    title="Invitations"
                    meta={invitationStatus === "pending" ? "2 people" : "0 pending"}
                  />
                  {invitationStatus === "pending" ? (
                    <button
                      disabled={blocked}
                      aria-describedby={
                        blocked ? "competition-join-disabled-reason" : undefined
                      }
                      className="mt-2 flex min-h-14 w-full items-center gap-3 rounded-[20px] bg-white/[0.04] p-3 text-left disabled:opacity-40"
                      onClick={() => open("invite")}
                    >
                      <Users className="text-white/60" />
                      <span className="flex-1 text-sm text-white">
                        Sarah and Ahmed · Weekend Warrior
                      </span>
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <SolidCard
                      className="mt-2 p-3"
                      data-invitation-reconciled={invitationStatus}
                    >
                      <p className="text-sm text-white/70">
                        Weekend Warrior invitation {invitationStatus} locally ·
                        no pending invitation remains.
                      </p>
                    </SolidCard>
                  )}
                </section>
                <section>
                  <SectionTitle title="Browse challenges" />
                  <div
                    role="tablist"
                    aria-label="Competition filters"
                    className="-mx-4 flex gap-2 overflow-x-auto px-4 py-2"
                  >
                    {filters.map((f) => (
                      <button
                        key={f}
                        role="tab"
                        aria-selected={filter === f}
                        className={`min-h-11 shrink-0 rounded-full px-4 text-sm ${
                          filter === f
                            ? "bg-brand-orange text-ink-900"
                            : "bg-white/5 text-white/60"
                        }`}
                        onClick={() => setFilter(f)}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                  <div
                    role="tabpanel"
                    aria-label={`${filter} challenges`}
                    data-filter-result-count={challengeRows.length}
                    className="space-y-2"
                  >
                    {challengeRows.map(([n, m]) => {
                      const membershipEntryBlocked =
                        blocked && n === "Step Challenge #12";
                      return (
                        <button
                          key={n}
                          disabled={membershipEntryBlocked}
                          aria-describedby={
                            membershipEntryBlocked
                              ? "competition-join-disabled-reason"
                              : undefined
                          }
                          className="flex min-h-14 w-full items-center gap-3 rounded-[20px] bg-ink-brown-800 p-3 text-left disabled:opacity-40"
                          onClick={() => {
                            if (membershipEntryBlocked) return;
                            setSelectedCompetition(n);
                            if (n === "Elite Cycling League") {
                              open("premium");
                            } else if (n === "Step Challenge #12") {
                              open(joined ? "rules" : "join");
                            } else {
                              setStatus(
                                `${n} selected; its detail flow is unavailable in this visual preview. Nothing changed.`
                              );
                            }
                          }}
                        >
                          <Calendar className="text-brand-orange" />
                          <span className="flex-1">
                            <span className="block text-sm text-white">{n}</span>
                            <span className="text-xs text-white/50">{m}</span>
                          </span>
                          <ChevronRight size={16} />
                        </button>
                      );
                    })}
                    {challengeRows.length === 0 && (
                      <SolidCard className="p-4" data-filter-empty="true">
                        <p className="text-sm font-medium text-white">
                          No challenges in {filter}
                        </p>
                        <p className="mt-1 text-xs text-white/55">
                          Join an active challenge to add it here. Nothing was
                          inferred from another filter.
                        </p>
                      </SolidCard>
                    )}
                  </div>
                </section>
                <CIAInsightCard
                  eyebrow="CIA starter suggestion"
                  provenance={
                    degraded
                      ? [
                          "Cached pattern",
                          low ? "Low confidence" : "Source unavailable",
                        ]
                      : ["Bundled demo", "Opt-in not inferred"]
                  }
                >
                  <p className="text-sm text-white/75">
                    A five-minute mindful challenge may fit your demo schedule.
                    Review before joining.
                  </p>
                </CIAInsightCard>
              </>
            )}
            {!empty ? (
              <section>
                <SectionTitle title="Competition controls" />
                <div className="grid gap-2">
                <BtnSecondary onClick={() => open("visibility")}>
                  <ShieldCheck size={16} />
                  Audience and proof
                </BtnSecondary>
                <Link
                  href={`/screens/64?context=competition&subject=${encodeURIComponent(
                    selectedCompetition
                  )}`}
                  data-report-subject={selectedCompetition}
                  className="flex min-h-11 items-center text-sm text-brand-orange"
                >
                  Report or mute {selectedCompetition}
                </Link>
                <button
                  className="min-h-11 text-left text-sm text-white/65"
                  aria-pressed={mutedCompetition === selectedCompetition}
                  onClick={() => {
                    const nextMuted =
                      mutedCompetition === selectedCompetition
                        ? null
                        : selectedCompetition;
                    setMutedCompetition(nextMuted);
                    setStatus(
                      nextMuted
                        ? `${selectedCompetition} alerts muted locally. The challenge remains visible; unmute is available here.`
                        : `${selectedCompetition} alerts unmuted locally.`
                    );
                  }}
                >
                  {mutedCompetition === selectedCompetition
                    ? `Unmute ${selectedCompetition}`
                    : `Mute ${selectedCompetition}`}
                </button>
                <button
                  className="min-h-11 text-left text-sm text-white/65"
                  onClick={() =>
                    setStatus(
                      "No owned challenge is selected in this bundled preview; nothing was deleted."
                    )
                  }
                >
                  Review own-challenge deletion rules
                </button>
                </div>
                <ConsentRail controls={FULL_DATA_CONTROLS} />
              </section>
            ) : (
              <SolidCard className="p-4">
                <p className="text-sm font-medium text-white">
                  No competition selected
                </p>
                <p className="mt-1 text-xs text-white/55">
                  Target-specific report, mute, block, and deletion controls are
                  hidden until a challenge exists. No member or challenge was
                  inferred.
                </p>
                <BtnSecondary
                  className="mt-3"
                  onClick={() => open("visibility")}
                >
                  Review privacy defaults
                </BtnSecondary>
              </SolidCard>
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
