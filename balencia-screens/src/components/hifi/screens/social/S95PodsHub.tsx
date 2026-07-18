"use client";

import { useEffect, useState } from "react";
import {
  Flag,
  Lock,
  Plus,
  Search,
  ShieldCheck,
  UserPlus,
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
  IconButton,
  ProgressBar,
  Provenance,
  SolidCard,
  TopBar,
} from "@/components/hifi/kit";
import { E1Modal } from "../intelligence/E1Modal";
import { H1TextScaleScope } from "./H1TextScaleScope";

const STATES = [
  "communities-default",
  "squads",
  "suggested-consent-off",
  "suggested-consented",
  "low-confidence-cached",
  "honest-null",
  "skeleton",
  "empty",
  "error-cached",
  "offline",
  "join-preview",
  "join-success",
  "invite-pending",
  "invite-accepted",
  "leave-confirm",
  "report-sheet",
  "moderation-success",
  "discovery-disabled",
  "data-controls",
  "asset-honest-null",
] as const;
type Fixture = (typeof STATES)[number];
type Tab = "Squads" | "Communities";
type Panel = "join" | "leave" | "report" | "invite" | "consent" | "data" | null;
type InviteState = "none" | "pending" | "accepted" | "declined";
type CommunityId = "morning" | "weekend";

const OPAQUE_MODAL_CLASS =
  "!bg-ink-900 border border-white/15 shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand-orange";

function initialPanel(fixture: Fixture): Panel {
  if (fixture === "join-preview") return "join";
  if (fixture === "leave-confirm") return "leave";
  if (fixture === "report-sheet") return "report";
  if (fixture === "invite-pending") return "invite";
  if (fixture === "data-controls") return "data";
  return null;
}

function initialTab(fixture: Fixture): Tab {
  return fixture === "squads" ||
    fixture === "invite-pending" ||
    fixture === "invite-accepted"
    ? "Squads"
    : "Communities";
}

function initialInviteState(fixture: Fixture): InviteState {
  if (fixture === "invite-accepted") return "accepted";
  if (fixture === "invite-pending" || fixture === "squads") return "pending";
  return "none";
}

export function S95PodsHub() {
  const [fixture, setFixture] = useState<Fixture>("communities-default");
  const [tab, setTab] = useState<Tab>(initialTab(fixture));
  const [panel, setPanel] = useState<Panel>(() => initialPanel(fixture));
  const [joined, setJoined] = useState(fixture === "join-success");
  const [morningCommunityActive, setMorningCommunityActive] = useState(true);
  const [selectedCommunity, setSelectedCommunity] =
    useState<CommunityId>("morning");
  const [inviteState, setInviteState] = useState<InviteState>(() =>
    initialInviteState(fixture)
  );
  const [reportedCommunityIds, setReportedCommunityIds] = useState<
    CommunityId[]
  >(fixture === "moderation-success" ? ["morning"] : []);
  const [routeConsent, setRouteConsent] = useState(
    fixture === "suggested-consented"
  );
  const [discoveryEnabled, setDiscoveryEnabled] = useState(
    fixture !== "discovery-disabled"
  );
  const [status, setStatus] = useState(
    fixture === "join-success"
      ? "Weekend walkers Community joined in the local preview."
      : fixture === "invite-accepted"
      ? "Evening stretch Squad invite accepted locally."
      : fixture === "moderation-success"
      ? "Morning runners Community report queued locally for review. No outcome is promised."
      : ""
  );
  useEffect(() => {
    const value = new URLSearchParams(location.search).get("state");
    const next = STATES.includes(value as Fixture)
      ? (value as Fixture)
      : "communities-default";
    queueMicrotask(() => {
      setFixture(next);
      setTab(initialTab(next));
      setPanel(initialPanel(next));
      setJoined(next === "join-success");
      setMorningCommunityActive(true);
      setSelectedCommunity("morning");
      setInviteState(initialInviteState(next));
      setReportedCommunityIds(next === "moderation-success" ? ["morning"] : []);
      setRouteConsent(next === "suggested-consented");
      setDiscoveryEnabled(next !== "discovery-disabled");
      setStatus(
        next === "join-success"
          ? "Weekend walkers Community joined in the local preview."
          : next === "invite-accepted"
          ? "Evening stretch Squad invite accepted locally."
          : next === "moderation-success"
          ? "Morning runners Community report queued locally for review. No outcome is promised."
          : ""
      );
    });
  }, []);

  const offline = fixture === "offline";
  const low = fixture === "low-confidence-cached";
  const groupsNull = fixture === "honest-null" || fixture === "empty";
  const groupsDegraded = low || fixture === "error-cached" || offline;
  const assetNull = fixture === "asset-honest-null";
  const invitePending = inviteState === "pending";
  const squadCount = inviteState === "accepted" ? 1 : 0;
  const communityCount =
    Number(morningCommunityActive) + Number(joined);
  const selectedCommunityName =
    selectedCommunity === "morning" ? "Morning runners" : "Weekend walkers";
  const selectedCommunityReported =
    reportedCommunityIds.includes(selectedCommunity);

  const overlay = panel ? (
    <E1Modal
      label={
        panel === "join"
          ? "Join Community review"
          : panel === "leave"
          ? "Leave Community confirmation"
          : panel === "report"
          ? "Community moderation"
          : panel === "invite"
          ? "Squad invitation"
          : panel === "consent"
          ? "Route history consent"
          : "Groups data controls"
      }
      onClose={() => setPanel(null)}
      className={OPAQUE_MODAL_CLASS}
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="focus-ring mb-3 min-h-11 rounded-full px-3 text-sm text-white/70"
        onClick={() => setPanel(null)}
      >
        Close
      </button>
      {panel === "join" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Join Weekend walkers?
          </h2>
          <p className="text-sm text-white/65">
            Persistent Community · 18 members · topic-only match. Membership is
            a local preview and shares no route or health history.
          </p>
          <div className="flex gap-2">
            <BtnSecondary onClick={() => setPanel(null)}>Cancel</BtnSecondary>
            <BtnPrimary
              onClick={() => {
                setJoined(true);
                setTab("Communities");
                setStatus(
                  "Weekend walkers Community joined in the local preview."
                );
                setPanel(null);
              }}
            >
              Join locally
            </BtnPrimary>
          </div>
        </div>
      )}
      {panel === "leave" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Leave {selectedCommunityName}?
          </h2>
          <p className="text-sm text-white/65">
            The Community will disappear from this local preview. No external
            membership or shared data is changed.
          </p>
          <div className="flex gap-2">
            <BtnSecondary onClick={() => setPanel(null)}>Cancel</BtnSecondary>
            <BtnPrimary
              onClick={() => {
                if (selectedCommunity === "morning") {
                  setMorningCommunityActive(false);
                } else {
                  setJoined(false);
                }
                setStatus(
                  `${selectedCommunityName} Community left locally. Membership and count updated.`
                );
                setPanel(null);
              }}
            >
              Leave locally
            </BtnPrimary>
          </div>
        </div>
      )}
      {panel === "report" && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">
            {selectedCommunityName} Community safety
          </h2>
          <p className="text-sm text-white/60">
            Actions below target {selectedCommunityName} only. Preview actions
            do not change a live Community.
          </p>
          {selectedCommunityReported && (
            <p className="text-sm text-white/60">
              {selectedCommunityName} report already queued locally for review.
              No outcome is promised.
            </p>
          )}
          {[
            [
              "Report",
              `${selectedCommunityName} Community report queued locally for review. No outcome is promised.`,
            ],
            [
              "Preview mute",
              `${selectedCommunityName} mute controls previewed locally; membership and content did not change.`,
            ],
            [
              "Preview host block",
              `${selectedCommunityName} host-block controls previewed locally; membership and content did not change.`,
            ],
            [
              "Review own-post deletion",
              `${selectedCommunityName} has no selected owned post to delete; nothing changed.`,
            ],
          ].map(([label, outcome]) => {
            const reportLocked =
              label === "Report" && selectedCommunityReported;
            return (
              <button
                key={label}
                type="button"
                disabled={reportLocked}
                className="focus-ring min-h-11 w-full rounded-xl border border-white/10 px-3 text-left text-sm text-white/80 disabled:opacity-45"
                onClick={() => {
                  if (label === "Report")
                    setReportedCommunityIds((ids) =>
                      ids.includes(selectedCommunity)
                        ? ids
                        : [...ids, selectedCommunity]
                    );
                  setStatus(outcome);
                  setPanel(null);
                }}
              >
                {reportLocked ? "Report queued" : label}
              </button>
            );
          })}
        </div>
      )}
      {panel === "invite" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Evening stretch Squad
          </h2>
          <p className="text-sm text-white/65">
            Temporary Squad · 4 of 2–5 people · Group Mission · invite expires
            in 5 days.
          </p>
          <div className="flex gap-2">
            <BtnSecondary
              onClick={() => {
                setInviteState("declined");
                setStatus("Squad invitation declined locally.");
                setPanel(null);
              }}
            >
              Decline
            </BtnSecondary>
            <BtnPrimary
              onClick={() => {
                setInviteState("accepted");
                setTab("Squads");
                setStatus("Evening stretch Squad invite accepted locally.");
                setPanel(null);
              }}
            >
              Accept locally
            </BtnPrimary>
          </div>
        </div>
      )}
      {panel === "consent" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Discovery and route-history consent
          </h2>
          <p className="text-sm text-white/65">
            {discoveryEnabled
              ? "Community matching is on. Choose topic-only matching or separately allow approximate route identifiers for a 30-day, only-you suggestion preview."
              : "Community matching is off. No topic, route, location, or health fields are used for suggestions. You can review these choices without enabling them."}
          </p>
          <p className="text-xs text-white/55">
            {groupsDegraded
              ? "Cached local settings · freshness and live confidence unavailable · session retention · export, revoke, delete, and correct anytime."
              : "Refreshed Apr 12 · session retention · export, revoke, delete, and correct anytime."}
          </p>
          <div className="grid gap-2">
            <BtnSecondary
              onClick={() => {
                setDiscoveryEnabled(false);
                setRouteConsent(false);
                setStatus("Community matching and route-history consent are off.");
                setPanel(null);
              }}
            >
              Turn matching off
            </BtnSecondary>
            <BtnSecondary
              onClick={() => {
                setDiscoveryEnabled(true);
                setRouteConsent(false);
                setStatus("Topic-only Community matching enabled locally. Route history remains off.");
                setPanel(null);
              }}
            >
              Use topic only
            </BtnSecondary>
            <BtnPrimary
              onClick={() => {
                setDiscoveryEnabled(true);
                setRouteConsent(true);
                setStatus(
                  "Route-history matching enabled for this local preview."
                );
                setPanel(null);
              }}
            >
              Allow route preview
            </BtnPrimary>
          </div>
        </div>
      )}
      {panel === "data" && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            Groups data controls
          </h2>
          <p className="text-sm text-white/65">
            {groupsNull
              ? "No membership, invite, selected Community/Squad, route, or health data is available · session retention · no subject inferred."
              : groupsDegraded
              ? "Category social membership · cached bundled /groups demo · selected Community/Squad only · freshness and live confidence unavailable · session retention."
              : "Category social membership · bundled /groups demo · selected Community/Squad only · refreshed Apr 12 · confidence inline · session retention."}
          </p>
          <ConsentRail controls={FULL_DATA_CONTROLS} />
          <BtnSecondary
            onClick={() => {
              setStatus(
                "Membership correction flow is unavailable in this visual preview. Nothing changed."
              );
              setPanel(null);
            }}
          >
            Correct
          </BtnSecondary>
        </div>
      )}
    </E1Modal>
  ) : null;

  return (
    <HifiShell
      header={
        <TopBar
          title="Groups"
          back
          right={
            <>
              <IconButton
                label="Search groups"
                onClick={() =>
                  setStatus(
                    "Group search is unavailable in this visual preview. Nothing changed."
                  )
                }
              >
                <Search className="h-5 w-5" />
              </IconButton>
              <IconButton
                label="Create Squad or Community"
                onClick={() =>
                  setStatus(
                    "Group creation is unavailable in this visual preview. Nothing was created."
                  )
                }
              >
                <Plus className="h-5 w-5" />
              </IconButton>
            </>
          }
        />
      }
      activeTab="me"
      overlay={overlay}
    >
      <main
        className="space-y-4 px-4 pb-6 pt-3"
        data-h1-state={`95-${fixture}`}
      >
        <H1TextScaleScope />
        <p className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/55">
          State: {fixture.replaceAll("-", " ")} · bundled groups preview
        </p>
        {status && (
          <p
            role="status"
            className="rounded-xl border border-white/10 p-3 text-sm text-white/70"
          >
            {status}
          </p>
        )}
        {offline && (
          <OfflineBanner message="Offline · cached membership from Apr 12 remains visible." />
        )}
        {fixture === "error-cached" && (
          <p
            role="alert"
            className="rounded-xl border border-white/10 p-3 text-sm text-white/70"
          >
            Fresh groups unavailable. Showing cached memberships.
          </p>
        )}
        {fixture === "suggested-consent-off" && (
          <p
            role="status"
            className="rounded-xl border border-white/10 p-3 text-sm text-white/70"
          >
            Route-history consent is off. Suggestions use topic labels only.
          </p>
        )}
        {fixture === "skeleton" ? (
          <div className="space-y-3" aria-label="Loading groups">
            <SkeletonBlock className="h-36" />
            <SkeletonBlock className="h-64" />
            <SkeletonBlock className="h-52" />
          </div>
        ) : fixture === "empty" || fixture === "honest-null" ? (
          <HonestNullState
            title={
              fixture === "empty" ? "No groups yet" : "Membership unavailable"
            }
            body={
              fixture === "empty"
                ? "Create a temporary Squad or browse persistent Communities."
                : "No membership, invite, or route-overlap claim is shown."
            }
          />
        ) : (
          <>
            <h1 className="text-[1.625rem] font-semibold leading-tight tracking-[-0.02em] text-white">
              Your <span className="text-emphasis">groups</span>
            </h1>
            <GlassCard tone="you">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">
                    Membership overview
                  </p>
                  <p className="mt-1 text-sm text-white/55">
                    {communityCount} {communityCount === 1 ? "Community" : "Communities"} ·{" "}
                    {squadCount} temporary {squadCount === 1 ? "Squad" : "Squads"} ·{" "}
                    {invitePending ? "1 pending invite" : "No pending invites"}
                  </p>
                  <Provenance
                    items={
                      groupsDegraded
                        ? [
                            "Cached bundled /groups demo",
                            "Freshness and live confidence unavailable",
                          ]
                        : ["Bundled /groups demo", "Refreshed Apr 12"]
                    }
                  />
                </div>
                <Users className="h-6 w-6 text-brand-orange" />
              </div>
              <BtnSecondary
                className="mt-3 w-full"
                onClick={() => setPanel("consent")}
              >
                {discoveryEnabled
                  ? "Manage optional discovery"
                  : "Review discovery settings"}
              </BtnSecondary>
              {!discoveryEnabled && (
                <p className="mt-2 text-xs text-white/55">
                  Community matching is off. Consent settings remain available
                  for review.
                </p>
              )}
            </GlassCard>
            <div
              role="tablist"
              aria-label="Approved group types"
              className="grid grid-cols-2 gap-2"
            >
              {(["Squads", "Communities"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={tab === item}
                  aria-controls={`groups-${item.toLowerCase()}-panel`}
                  className={`focus-ring min-h-11 rounded-full border px-4 text-sm ${
                    tab === item
                      ? "border-brand-orange/60 bg-brand-orange text-ink-900"
                      : "border-white/10 bg-white/[0.03] text-white/80"
                  }`}
                  onClick={() => setTab(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <section
              id={`groups-${tab.toLowerCase()}-panel`}
              role="tabpanel"
              aria-label={tab}
              className="space-y-3"
            >
              {tab === "Communities" ? (
                <>
                  {morningCommunityActive && (
                    <CommunityCard
                      assetNull={assetNull}
                      degraded={groupsDegraded}
                      onLeave={() => {
                        setSelectedCommunity("morning");
                        setPanel("leave");
                      }}
                      onReport={() => {
                        setSelectedCommunity("morning");
                        setPanel("report");
                      }}
                    />
                  )}
                  {joined && (
                    <WeekendWalkersCard
                      degraded={groupsDegraded}
                      onLeave={() => {
                        setSelectedCommunity("weekend");
                        setPanel("leave");
                      }}
                      onReport={() => {
                        setSelectedCommunity("weekend");
                        setPanel("report");
                      }}
                    />
                  )}
                  {communityCount === 0 && (
                    <HonestNullState
                      title="No Community memberships"
                      body="Browse suggestions or review discovery settings without sharing route or health data."
                    />
                  )}
                </>
              ) : (
                <>
                  {inviteState === "pending" && (
                    <SolidCard>
                      <div className="p-4">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-white/55" />
                          <p className="font-semibold text-white">
                            Evening stretch Squad
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-white/55">
                          Temporary · invited to join 4 of 2–5 people · Group
                          Mission · membership not active
                        </p>
                        <Chip tone="you">Pending invite</Chip>
                        <BtnSecondary
                          className="mt-3"
                          onClick={() => setPanel("invite")}
                        >
                          Review Squad invite
                        </BtnSecondary>
                      </div>
                    </SolidCard>
                  )}
                  {inviteState === "accepted" && (
                    <SolidCard>
                      <div className="p-4">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-white/55" />
                          <p className="font-semibold text-white">
                            Evening stretch Squad
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-white/55">
                          Temporary · 5 of 2–5 people · Group Mission · 3 weeks
                          remaining
                        </p>
                        <Chip tone="done">Member</Chip>
                      </div>
                    </SolidCard>
                  )}
                  {(inviteState === "none" || inviteState === "declined") && (
                    <HonestNullState
                      title="No Squad membership"
                      body={
                        inviteState === "declined"
                          ? "The Evening stretch invitation was declined. No invite or membership remains."
                          : "No active temporary Squad or pending invitation is shown."
                      }
                    />
                  )}
                </>
              )}
            </section>
            {discoveryEnabled ? (
              <CIAInsightCard
                eyebrow="CIA Community suggestion"
                provenance={[
                  routeConsent
                    ? "Route consent on · 3 approximate overlaps"
                    : "Topic-only · route consent off",
                  low
                    ? "Low confidence"
                    : fixture === "error-cached" || offline
                    ? "Cached · live confidence unavailable"
                    : "Bundled fixture",
                ]}
              >
                <p className="text-sm text-white/75">
                  {groupsDegraded
                    ? routeConsent
                      ? "A cached route-overlap suggestion remains for review, but freshness and live confidence are unavailable; no new route inference is made."
                      : "A cached walking-topic suggestion remains for review, but freshness and live confidence are unavailable. No route or location history is used."
                    : routeConsent
                    ? "Weekend walkers has 3 approximate route overlaps in the consented 30-day preview."
                    : "Weekend walkers matches a general walking topic. No route or location history is used."}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <BtnSecondary onClick={() => setPanel("consent")}>
                    {routeConsent ? "Review consent" : "Preview privacy"}
                  </BtnSecondary>
                  <BtnPrimary
                    disabled={offline || joined}
                    onClick={() => setPanel("join")}
                  >
                    {joined ? "Joined locally" : "Review join"}
                  </BtnPrimary>
                </div>
                {(offline || joined) && (
                  <p className="mt-2 text-xs text-white/55">
                    {joined
                      ? "Weekend walkers is already joined in this local preview."
                      : "Joining is disabled while offline."}
                  </p>
                )}
              </CIAInsightCard>
            ) : (
              <SolidCard>
                <div className="p-4">
                  <p className="font-semibold text-white">
                    Community matching is off
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    CIA is not using topic, route, location, or health fields to
                    suggest Communities.
                  </p>
                  <BtnSecondary
                    className="mt-3"
                    onClick={() => setPanel("consent")}
                  >
                    Review discovery settings
                  </BtnSecondary>
                </div>
              </SolidCard>
            )}
            {invitePending && tab !== "Squads" && (
              <GlassCard tone="you">
                <div className="flex items-start gap-3">
                  <UserPlus className="h-5 w-5 text-brand-orange" />
                  <div className="flex-1">
                    <p className="font-semibold text-white">Aisha invited you</p>
                    <p className="text-sm text-white/55">
                      Evening stretch Squad · temporary · 4 of 2–5 people
                    </p>
                  </div>
                </div>
                <BtnSecondary
                  className="mt-3"
                  onClick={() => setPanel("invite")}
                >
                  Review invite
                </BtnSecondary>
              </GlassCard>
            )}
          </>
        )}
        {fixture === "asset-honest-null" && (
          <HonestNullState
            title="Member previews hidden"
            body="No avatar media is available. Names and exact member count remain accessible."
          />
        )}
        <button
          type="button"
          className="focus-ring min-h-11 rounded-full px-3 text-sm text-brand-orange"
          onClick={() => setPanel("data")}
        >
          Groups data controls
        </button>
        <p className="flex items-start gap-2 text-xs text-white/55">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest-green" />
          Route discovery is optional and reversible. Leaving hides locally
          shared fields immediately.
        </p>
      </main>
    </HifiShell>
  );
}

function CommunityCard({
  assetNull,
  degraded,
  onLeave,
  onReport,
}: {
  assetNull: boolean;
  degraded: boolean;
  onLeave: () => void;
  onReport: () => void;
}) {
  return (
    <SolidCard>
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-white">
              Morning runners Community
            </p>
            <p className="mt-1 text-sm text-white/55">
              Persistent · 8 members · member
            </p>
          </div>
          <Chip tone="done">Member</Chip>
        </div>
        <div
          role="img"
          aria-label={
            assetNull
              ? "Member previews unavailable; 8 members"
              : "Code-native initials for Aisha and Omar, plus 6 members"
          }
          data-asset-disposition={
            assetNull
              ? "HIFI-95-01-honest-null"
              : "HIFI-95-01-code-native-initials"
          }
          className="flex min-h-11 items-center"
        >
          {assetNull ? (
            <span className="text-sm text-white/55">
              Member previews hidden · 8 total
            </span>
          ) : (
            <>
              {["AK", "OR"].map((initials) => (
                <span
                  key={initials}
                  className="-mr-2 grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink-900 bg-white/[0.08] text-xs text-white/75"
                >
                  {initials}
                </span>
              ))}
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink-900 bg-white/[0.08] text-xs text-white/75">
                +6
              </span>
            </>
          )}
        </div>
        <div>
          <div className="flex justify-between text-xs text-white/55">
            <span>Community Mission participation</span>
            <span>68%</span>
          </div>
          <ProgressBar value={68} tone="you" />
          <p className="mt-1 text-xs text-white/55">
            {degraded
              ? "Cached bundled progress meter · freshness and live confidence unavailable"
              : "One coherent bundled progress meter · refreshed Apr 12"}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <BtnSecondary onClick={onLeave}>Leave preview</BtnSecondary>
          <BtnGhost onClick={onReport}>
            <Flag className="h-4 w-4" />
            Safety
          </BtnGhost>
        </div>
      </div>
    </SolidCard>
  );
}

function WeekendWalkersCard({
  degraded,
  onLeave,
  onReport,
}: {
  degraded: boolean;
  onLeave: () => void;
  onReport: () => void;
}) {
  return (
    <SolidCard>
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-white">
              Weekend walkers Community
            </p>
            <p className="mt-1 text-sm text-white/55">
              Persistent · 18 members · joined locally
            </p>
          </div>
          <Chip tone="done">Member</Chip>
        </div>
        <p className="text-sm text-white/60">
          Topic-only membership preview. No route, location, or health fields
          were shared when joining.
        </p>
        <Provenance
          items={
            degraded
              ? [
                  "Cached Community fixture",
                  "Freshness and live confidence unavailable",
                ]
              : ["Joined this session", "Bundled Community fixture"]
          }
        />
        <div className="grid grid-cols-2 gap-2">
          <BtnSecondary onClick={onLeave}>Leave preview</BtnSecondary>
          <BtnGhost onClick={onReport}>
            <Flag className="h-4 w-4" />
            Safety
          </BtnGhost>
        </div>
      </div>
    </SolidCard>
  );
}

function SkeletonBlock({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-white/[0.06] motion-reduce:animate-none ${className}`}
    />
  );
}

function OfflineBanner({ message }: { message: string }) {
  return (
    <p
      role="status"
      className="rounded-xl border border-brand-orange/25 bg-brand-orange/10 p-3 text-sm text-white/75"
    >
      {message}
    </p>
  );
}

function HonestNullState({ title, body }: { title: string; body: string }) {
  return (
    <SolidCard>
      <div className="p-5">
        <p className="font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm text-white/60">{body}</p>
      </div>
    </SolidCard>
  );
}
