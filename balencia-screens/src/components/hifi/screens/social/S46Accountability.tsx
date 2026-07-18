"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BellRing,
  ChevronRight,
  FileText,
  Plus,
  Shield,
  Users,
  X,
} from "lucide-react";
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  CIAInsightCard,
  ConsentRail,
  FULL_DATA_CONTROLS,
  HifiShell,
  ProgressBar,
  Provenance,
  SafetyCard,
  SolidCard,
  TopBar,
  cx,
} from "@/components/hifi/kit";
import { E1Modal } from "../intelligence/E1Modal";
import { H1TextScaleScope } from "./H1TextScaleScope";
const states = [
  "partners-default",
  "partner-low-confidence",
  "partner-invite-pending",
  "partner-honest-null",
  "skeleton",
  "error-cached",
  "offline",
  "contracts-default",
  "contracts-low-confidence",
  "contracts-null",
  "triggers-default",
  "trigger-consent",
  "trigger-enabled",
  "trigger-disabled",
  "nudge-preview",
  "nudge-declined",
  "add-partner",
  "partner-detail",
  "revoke-confirm",
  "revoke-success",
  "audit-trail",
  "emergency-support",
  "data-controls",
] as const;
type Fixture = (typeof states)[number];
type Tab = "Partners" | "Contracts" | "Triggers";
type Panel =
  | "add"
  | "partner"
  | "trigger"
  | "nudge"
  | "revoke"
  | "audit"
  | "data"
  | null;
type PartnerStatus = "active" | "pending" | "revoked";
type Partner = {
  id: string;
  name: string;
  role: string;
  scope: string;
  events: string;
  notifications: string;
  status: PartnerStatus;
};
const defaultPartners: Partner[] = [
  {
    id: "aisha",
    name: "Aisha Khan",
    role: "Accountability partner",
    scope: "Career and Fitness activity-only Missions",
    events: "Mission activity events only",
    notifications: "No automatic notifications",
    status: "active",
  },
  {
    id: "marcus",
    name: "Marcus Lee",
    role: "Mentor",
    scope: "Career guidance",
    events: "Guidance only · no Mission events",
    notifications: "No notification permission",
    status: "active",
  },
];
function partnersForFixture(fixture: Fixture): Partner[] {
  if (fixture === "partner-honest-null") return [];
  if (fixture === "partner-invite-pending")
    return defaultPartners.map<Partner>((partner) =>
      partner.id === "aisha"
        ? { ...partner, status: "pending" }
        : { ...partner }
    );
  if (fixture === "revoke-success")
    return defaultPartners.map<Partner>((partner) =>
      partner.id === "aisha"
        ? { ...partner, status: "revoked" }
        : { ...partner }
    );
  return defaultPartners.map((partner) => ({ ...partner }));
}
export function S46Accountability() {
  const [fixture, setFixture] = useState<Fixture>("partners-default"),
    [tab, setTab] = useState<Tab>("Partners"),
    [panel, setPanel] = useState<Panel>(null),
    [trigger, setTrigger] = useState(false),
    [status, setStatus] = useState(
      "Bundled accountability preview · no notifications."
    ),
    [partners, setPartners] = useState<Partner[]>(() =>
      partnersForFixture("partners-default")
    ),
    [selectedPartnerId, setSelectedPartnerId] = useState("aisha");
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("state");
    const f = (states as readonly string[]).includes(q ?? "")
      ? (q as Fixture)
      : "partners-default";
    queueMicrotask(() => {
      setFixture(f);
      setPartners(partnersForFixture(f));
      setSelectedPartnerId("aisha");
      if (f.startsWith("contracts")) setTab("Contracts");
      if (f.startsWith("trigger")) setTab("Triggers");
      if (f === "trigger-consent") setPanel("trigger");
      if (f === "trigger-enabled") setTrigger(true);
      if (f === "nudge-preview") setPanel("nudge");
      if (f === "nudge-declined") setStatus("CIA nudge declined locally.");
      if (f === "add-partner") setPanel("add");
      if (f === "partner-detail") setPanel("partner");
      if (f === "revoke-confirm") setPanel("revoke");
      if (f === "revoke-success") {
        setStatus("Aisha access revoked locally.");
      }
      if (f === "audit-trail") setPanel("audit");
      if (f === "data-controls") setPanel("data");
    });
  }, []);
  const offline = fixture === "offline",
    errorCached = fixture === "error-cached",
    mutationBlocked = offline || errorCached,
    triggerPolicyDisabled = fixture === "trigger-disabled",
    partnerLow = fixture === "partner-low-confidence",
    contractLow = fixture === "contracts-low-confidence",
    contractNull = fixture === "contracts-null",
    partnerEvidenceDegraded = partnerLow || offline || errorCached,
    contractEvidenceDegraded = contractLow || offline || errorCached,
    activePartners = partners.filter((partner) => partner.status === "active"),
    pendingPartners = partners.filter(
      (partner) => partner.status === "pending"
    ),
    aisha = partners.find((partner) => partner.id === "aisha"),
    aishaActive = aisha?.status === "active",
    selectedPartner =
      partners.find((partner) => partner.id === selectedPartnerId) ?? aisha,
    triggerChangesDisabled =
      mutationBlocked || triggerPolicyDisabled || !aishaActive,
    partnerChangesDisabled = mutationBlocked;
  const permissionSource = partnerLow
      ? "Bundled permissions · low confidence"
      : offline
      ? "Cached permissions · offline"
      : errorCached
      ? "Cached permissions · refresh failed"
      : "Bundled permissions · confirmed",
    permissionFreshness = partnerEvidenceDegraded
      ? "Last local snapshot · freshness unavailable"
      : "Refreshed today";
  const title =
    panel === "add"
      ? "Add accountability partner"
      : panel === "partner"
      ? `${selectedPartner?.name ?? "Partner"} permissions`
      : panel === "trigger"
      ? "Trigger consent"
      : panel === "nudge"
      ? "CIA nudge preview"
      : panel === "revoke"
      ? `Revoke ${selectedPartner?.name ?? "partner"} access?`
      : panel === "audit"
      ? "Local audit trail"
      : "Accountability data controls";
  const overlay = panel ? (
    <E1Modal
      label={title}
      onClose={() => setPanel(null)}
      className="outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
    >
      <div className="rounded-[28px] border border-white/10 bg-ink-900 p-5">
        <div className="flex justify-between">
          <h2 className="text-xl">{title}</h2>
          <button
            aria-label="Close dialog"
            className="grid h-11 w-11 shrink-0 place-items-center"
            onClick={() => setPanel(null)}
          >
            <X />
          </button>
        </div>
        {panel === "data" ? (
          <>
            <p className="mt-3 text-sm text-white/70">
              Partners, Mission visibility, contract terms, triggers, health
              proof, emergency settings and CIA inference · bundled local
              preview · session retention.
            </p>
            <ConsentRail controls={FULL_DATA_CONTROLS} />
          </>
        ) : panel === "trigger" ? (
          <>
            <p className="mt-3 text-sm text-white/70">
              If no Mission check-in is logged for 2 days, prepare a local CIA
              encouragement draft for Aisha. Fields: Mission name, missed date,
              activity-only status. Aisha only · 4-hour cooldown · session
              retention · revoke anytime. No notification is sent.
            </p>
            <div className="mt-4 flex gap-2">
              <BtnGhost onClick={() => setPanel(null)}>Decline</BtnGhost>
              <BtnPrimary
                disabled={triggerChangesDisabled}
                onClick={() => {
                  if (triggerChangesDisabled) return;
                  setTrigger(true);
                  setPanel(null);
                  setStatus("Trigger enabled locally; no notification sent.");
                }}
              >
                Enable preview
              </BtnPrimary>
            </div>
          </>
        ) : panel === "nudge" ? (
          <>
            <p className="mt-3 text-sm text-white/70">
              Draft to Aisha: “A gentle check-in could help with your shared
              Mission.” Audience: Aisha only. Nothing sends automatically.
            </p>
            <div className="mt-4 flex gap-2">
              <BtnGhost
                onClick={() => {
                  setPanel(null);
                  setStatus("Nudge declined locally.");
                }}
              >
                Decline
              </BtnGhost>
              <BtnPrimary
                disabled={triggerChangesDisabled}
                onClick={() => {
                  if (triggerChangesDisabled) return;
                  setPanel(null);
                  setStatus(
                    "Nudge send was reviewed locally; no message or notification was created."
                  );
                }}
              >
                Preview send
              </BtnPrimary>
            </div>
          </>
        ) : panel === "revoke" ? (
          <>
            <p className="mt-3 text-sm text-white/70">
              Remove {selectedPartner?.name ?? "this partner"}&apos;s access to{" "}
              {selectedPartner?.scope ?? "shared Mission status"}. This
              preserves their own data and stops new local partner drafts.
            </p>
            <div className="mt-4 flex gap-2">
              <BtnSecondary onClick={() => setPanel(null)}>Cancel</BtnSecondary>
              <BtnPrimary
                disabled={partnerChangesDisabled}
                onClick={() => {
                  if (partnerChangesDisabled) return;
                  if (!selectedPartner) return;
                  setPartners((current) =>
                    current.map((partner) =>
                      partner.id === selectedPartner.id
                        ? { ...partner, status: "revoked" }
                        : partner
                    )
                  );
                  if (selectedPartner.id === "aisha") setTrigger(false);
                  setPanel(null);
                  setStatus(`${selectedPartner.name} access revoked locally.`);
                }}
              >
                Confirm revoke
              </BtnPrimary>
            </div>
          </>
        ) : panel === "add" ? (
          <>
            <p className="mt-3 text-sm text-white/70">
              Invite preview only. Choose permissions after acceptance; no
              contacts or notifications are used.
            </p>
            <BtnPrimary
              disabled={partnerChangesDisabled}
              className="mt-3"
              onClick={() => {
                if (partnerChangesDisabled) return;
                setPartners((current) =>
                  current.some((partner) => partner.id === "pending-local")
                    ? current
                    : [
                        ...current,
                        {
                          id: "pending-local",
                          name: "New partner invitation",
                          role: "Pending invitation",
                          scope: "No shared fields until acceptance",
                          events: "No events allowed",
                          notifications: "No notification permission",
                          status: "pending",
                        },
                      ]
                );
                setPanel(null);
                setStatus("Partner invite pending locally.");
              }}
            >
              Create pending invite
            </BtnPrimary>
          </>
        ) : panel === "audit" ? (
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>Today · Aisha permissions reviewed locally</li>
            <li>Today · Trigger remained preview-only</li>
            <li>No notification or external event</li>
          </ul>
        ) : (
          <>
            <p className="mt-3 text-sm text-white/70">
              {selectedPartner?.status === "active"
                ? partnerLow
                  ? `${
                      selectedPartner.name
                    } · last accepted ${selectedPartner.role.toLowerCase()} · ${
                      selectedPartner.scope
                    } · ${selectedPartner.events} · ${selectedPartner.notifications} · bundled estimate · low confidence · reversible controls remain available.`
                  : partnerEvidenceDegraded
                  ? `${
                      selectedPartner.name
                    } · last accepted ${selectedPartner.role.toLowerCase()} · ${
                      selectedPartner.scope
                    } · ${selectedPartner.events} · ${selectedPartner.notifications} · cached local record · freshness unavailable · changes require a successful refresh.`
                  : `${
                      selectedPartner.name
                    } · accepted ${selectedPartner.role.toLowerCase()} · ${
                      selectedPartner.scope
                    } · ${selectedPartner.events} · ${selectedPartner.notifications} · refreshed today · revoke available.`
                : selectedPartner?.status === "pending"
                ? `${selectedPartner.name} · invitation pending · no shared fields, trigger, or notification permission is active.`
                : `${
                    selectedPartner?.name ?? "Partner"
                  } · access revoked · no shared Mission status or trigger permission remains.`}
            </p>
            {selectedPartner?.status === "active" && (
              <BtnGhost
                className="mt-3"
                disabled={partnerChangesDisabled}
                aria-describedby={
                  partnerChangesDisabled
                    ? "accountability-mutation-blocked-reason"
                    : undefined
                }
                onClick={() => setPanel("revoke")}
              >
                Revoke {selectedPartner.name} access
              </BtnGhost>
            )}
          </>
        )}
      </div>
    </E1Modal>
  ) : undefined;
  return (
    <HifiShell
      header={
        <TopBar
          title="Accountability"
          eyebrow="Partners and permissions"
          back
        />
      }
      activeTab="me"
      atmosphere="you"
      overlay={overlay}
    >
      <main
        data-h1-state={`46-${fixture}`}
        className="space-y-4 px-4 pb-6 pt-3"
      >
        <H1TextScaleScope />
        {fixture === "skeleton" ? (
          <div
            aria-label="Loading accountability"
            className="space-y-3 animate-pulse motion-reduce:animate-none"
          >
            <div className="h-32 rounded-2xl bg-white/5" />
            <div className="h-52 rounded-2xl bg-white/5" />
          </div>
        ) : (
          <>
            {fixture === "partner-invite-pending" && (
              <p
                role="status"
                className="rounded-xl border border-white/10 p-3 text-sm text-white/70"
              >
                Aisha invite pending · no permission or notification is active.
              </p>
            )}
            {fixture === "emergency-support" && (
              <p
                role="status"
                className="rounded-xl border border-brand-orange/20 bg-brand-orange/10 p-3 text-sm text-white/75"
              >
                Emergency support preview · local Help Center guidance only; no
                call, text, or notification.
              </p>
            )}
            {(offline || errorCached) && (
              <SolidCard>
                <p>
                  {offline
                    ? "Offline · partner and trigger changes disabled"
                    : "Refresh failed · cached accountability preview"}
                </p>
                <p
                  id="accountability-mutation-blocked-reason"
                  className="text-xs text-white/55"
                >
                  {offline
                    ? "Reconnect before changing partners, triggers, or nudges. No provider or notification request occurred."
                    : "Refresh must succeed before changing partners, triggers, or nudges. Cached records remain read-only."}
                </p>
              </SolidCard>
            )}
            {triggerPolicyDisabled && (
              <SolidCard>
                <p>
                  Trigger changes disabled · trigger-policy consent unavailable
                </p>
                <p className="text-xs text-white/55">
                  Partner consent remains active; no trigger can be enabled in
                  this fixture.
                </p>
              </SolidCard>
            )}
            <p className="text-[0.9375rem] text-white/70">
              Manage <span className="text-emphasis">accountability</span>{" "}
              partners with granular, reversible consent.
            </p>
            {aishaActive ? (
              <SolidCard>
                <div className="flex gap-3">
                  <Shield />
                  <div>
                    <p className="font-medium">
                      {partnerEvidenceDegraded
                        ? partnerLow
                          ? "Aisha consent · low confidence"
                          : "Aisha consent · cached status"
                        : "Aisha consent active"}
                    </p>
                    <p className="text-xs text-white/55">
                      {partnerEvidenceDegraded
                        ? partnerLow
                          ? "Bundled estimate: activity-only Career and Fitness Mission status · low confidence · no health metrics"
                          : "Last local snapshot: activity-only Career and Fitness Mission status · freshness unavailable · no health metrics"
                        : "Activity-only Career and Fitness Mission status · no health metrics"}
                    </p>
                  </div>
                </div>
                <Provenance
                  items={[
                    permissionSource,
                    "Aisha only",
                    permissionFreshness,
                    "Session retention",
                  ]}
                />
                <div className="mt-3 flex gap-2">
                  <BtnSecondary
                    onClick={() => {
                      setSelectedPartnerId("aisha");
                      setPanel("partner");
                    }}
                  >
                    Review permissions
                  </BtnSecondary>
                  <BtnGhost onClick={() => setPanel("data")}>
                    All controls
                  </BtnGhost>
                </div>
              </SolidCard>
            ) : aisha ? (
              <SolidCard>
                <div className="flex gap-3">
                  <Shield />
                  <div>
                    <p className="font-medium">
                      {aisha.status === "pending"
                        ? "Aisha invitation pending"
                        : "Aisha access revoked"}
                    </p>
                    <p className="text-xs text-white/55">
                      {aisha.status === "pending"
                        ? "No shared fields, trigger, or notification permission is active."
                        : "No Mission status, health field, or trigger permission remains."}
                    </p>
                  </div>
                </div>
                <Provenance
                  items={[
                    "Bundled relationship fixture",
                    aisha.status === "pending"
                      ? "Invite only"
                      : "Access removed",
                    "No active sharing",
                  ]}
                />
              </SolidCard>
            ) : null}
            <div
              role="tablist"
              aria-label="Accountability areas"
              className="grid grid-cols-3 gap-1 rounded-xl bg-white/5 p-1"
            >
              {(
                [
                  ["Partners", <Users key="u" />],
                  ["Contracts", <FileText key="f" />],
                  ["Triggers", <BellRing key="b" />],
                ] as const
              ).map(([name, icon]) => (
                <button
                  key={name}
                  role="tab"
                  aria-selected={tab === name}
                  aria-controls={`46-${name.toLowerCase()}-panel`}
                  onClick={() => setTab(name)}
                  className={cx(
                    "flex min-h-11 items-center justify-center gap-1 text-xs",
                    tab === name
                      ? "rounded-lg bg-white/10 text-brand-orange"
                      : "text-white/50"
                  )}
                >
                  {icon}
                  {name}
                </button>
              ))}
            </div>
            {tab === "Partners" ? (
              <section
                id="46-partners-panel"
                role="tabpanel"
                aria-label="Partners panel"
              >
                <h2 className="mb-2 font-semibold">
                  {partnerEvidenceDegraded
                    ? partnerLow
                      ? `Low-confidence partner records · ${activePartners.length} estimated active`
                      : `Cached partner records · ${activePartners.length} last known active`
                    : `Active partners · ${activePartners.length} connected`}
                </h2>
                {!activePartners.length ? (
                  <SolidCard>
                    <p className="text-sm text-white/65">
                      No accountability partners yet.
                    </p>
                  </SolidCard>
                ) : (
                  <SolidCard>
                    {activePartners.map((partner) => (
                      <button
                        key={partner.id}
                        onClick={() => {
                          setSelectedPartnerId(partner.id);
                          setPanel("partner");
                        }}
                        aria-label={
                          partnerLow
                            ? `${partner.name}, estimated ${partner.role}, ${partner.scope}, ${partner.events}, ${partner.notifications}, bundled low-confidence record, reversible controls available`
                            : partnerEvidenceDegraded
                            ? `${partner.name}, last known ${partner.role}, ${partner.scope}, ${partner.events}, ${partner.notifications}, cached local record, freshness unavailable, changes require refresh`
                            : `${partner.name}, accepted ${partner.role}, ${partner.scope}, ${partner.events}, ${partner.notifications}, refreshed today, revoke available`
                        }
                        className="focus-ring flex min-h-16 w-full items-center gap-3 border-b border-white/5 p-3 text-left last:border-0"
                      >
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-white/5">
                          {partner.name[0]}
                        </span>
                        <span className="flex-1">
                          <strong className="block text-sm">
                            {partner.name}
                          </strong>
                          <span className="text-xs text-white/50">
                            {partner.role} · {partner.scope}
                          </span>
                          <span className="mt-1 block text-xs text-white/55">
                            {partner.events} · {partner.notifications}
                          </span>
                        </span>
                        <ChevronRight />
                      </button>
                    ))}
                  </SolidCard>
                )}
                {!!pendingPartners.length && (
                  <SolidCard className="mt-3">
                    <p className="px-3 pt-3 text-xs uppercase tracking-wider text-white/55">
                      Pending invitations · no access
                    </p>
                    {pendingPartners.map((partner) => (
                      <button
                        key={partner.id}
                        onClick={() => {
                          setSelectedPartnerId(partner.id);
                          setPanel("partner");
                        }}
                        aria-label={`${partner.name}, invitation pending, no shared fields or notification permission`}
                        className="focus-ring flex min-h-16 w-full items-center gap-3 p-3 text-left"
                      >
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-white/5">
                          {partner.name[0]}
                        </span>
                        <span className="flex-1">
                          <strong className="block text-sm">
                            {partner.name}
                          </strong>
                          <span className="text-xs text-white/50">
                            Invite pending · no access
                          </span>
                        </span>
                        <ChevronRight />
                      </button>
                    ))}
                  </SolidCard>
                )}
                <button
                  disabled={partnerChangesDisabled}
                  aria-describedby={
                    partnerChangesDisabled
                      ? "accountability-mutation-blocked-reason"
                      : undefined
                  }
                  onClick={() => setPanel("add")}
                  className="focus-ring mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 disabled:opacity-40"
                >
                  <Plus />
                  Add partner
                </button>
              </section>
            ) : tab === "Contracts" ? (
              <section
                id="46-contracts-panel"
                role="tabpanel"
                aria-label="Contracts panel"
              >
                <h2 className="mb-2 font-semibold">Accountability contract</h2>
                {contractNull || !aishaActive ? (
                  <SolidCard>
                    <p className="text-sm text-white/65">
                      {contractNull
                        ? "No signed contract yet."
                        : "No active Aisha contract while partner access is pending or revoked."}
                    </p>
                  </SolidCard>
                ) : (
                  <SolidCard>
                    <p className="font-medium">Run 3 times each week</p>
                    <p className="mt-1 text-xs text-white/55">
                      {contractEvidenceDegraded
                        ? "Amira + Aisha · signed Apr 8 · cached week · 8 kept, 2 open · proof sync stale · low confidence"
                        : "Amira + Aisha · signed Apr 8 · current week · 8 kept, 2 open · proof: you log completion"}
                    </p>
                    <ProgressBar value={80} tone="you" />
                    <Provenance
                      items={
                        contractEvidenceDegraded
                          ? ["Cached Apr 10", "Stale · low confidence"]
                          : ["Bundled contract", "Confirmed Apr 12"]
                      }
                    />
                    <Link
                      href="/screens/82"
                      className="focus-ring mt-3 inline-flex min-h-11 items-center text-sm text-brand-orange"
                    >
                      Review terms and timestamps
                    </Link>
                  </SolidCard>
                )}
              </section>
            ) : (
              <section
                id="46-triggers-panel"
                role="tabpanel"
                aria-label="Triggers panel"
              >
                <h2 className="mb-2 font-semibold">
                  Partner triggers · {trigger && aishaActive ? 1 : 0} enabled
                </h2>
                <SolidCard>
                  <div className="flex items-start gap-3">
                    <BellRing />
                    <div className="flex-1">
                      <p className="text-sm">Missed Mission check-in</p>
                      <p className="text-xs text-white/50">
                        {aishaActive
                          ? "After 2 days · CIA draft first · Aisha only · no automatic notification"
                          : "Unavailable until Aisha has active, reversible partner consent"}
                      </p>
                    </div>
                    <button
                      role="switch"
                      aria-checked={trigger}
                      disabled={triggerChangesDisabled}
                      aria-describedby={
                        mutationBlocked
                          ? "accountability-mutation-blocked-reason"
                          : undefined
                      }
                      onClick={() =>
                        trigger
                          ? (setTrigger(false),
                            setStatus("Trigger disabled locally."))
                          : setPanel("trigger")
                      }
                      className="focus-ring min-h-11 min-w-16 rounded-full border border-white/10 px-3 text-xs disabled:opacity-40"
                    >
                      {trigger ? "On" : "Off"}
                    </button>
                  </div>
                </SolidCard>
                <div className="mt-3 flex gap-2">
                  <BtnSecondary
                    disabled={triggerChangesDisabled}
                    aria-describedby={
                      mutationBlocked
                        ? "accountability-mutation-blocked-reason"
                        : undefined
                    }
                    onClick={() => setPanel("nudge")}
                  >
                    Preview nudge
                  </BtnSecondary>
                  <BtnGhost onClick={() => setPanel("audit")}>
                    Audit trail
                  </BtnGhost>
                </div>
              </section>
            )}
            <CIAInsightCard
              eyebrow="CIA draft"
              provenance={[
                "Bundled local pattern",
                aishaActive
                  ? partnerLow
                    ? "Estimated Aisha permission · low confidence"
                    : partnerEvidenceDegraded
                    ? "Cached Aisha permission · revalidation unavailable"
                    : "Aisha permission active"
                  : "No active audience",
              ]}
            >
              <p className="text-sm text-white/75">
                {aishaActive
                  ? "A gentle check-in may support your shared Mission. Review the exact audience before any action."
                  : "No partner check-in is available until a named person accepts granular, reversible access."}
              </p>
            </CIAInsightCard>
            {fixture === "emergency-support" || tab === "Partners" ? (
              <SafetyCard
                title="Emergency support settings"
                description="Open local Help Center guidance and emergency-contact settings. This prototype cannot call, text, or notify Marcus."
              />
            ) : null}
            <div className="flex gap-2">
              <BtnPrimary onClick={() => setPanel("data")}>
                Review shared data
              </BtnPrimary>
              {aishaActive && (
                <BtnGhost
                  disabled={partnerChangesDisabled}
                  aria-describedby={
                    partnerChangesDisabled
                      ? "accountability-mutation-blocked-reason"
                      : undefined
                  }
                  onClick={() => {
                    setSelectedPartnerId("aisha");
                    setPanel("revoke");
                  }}
                >
                  Revoke Aisha access
                </BtnGhost>
              )}
            </div>
            <ConsentRail controls={FULL_DATA_CONTROLS} />
            <p role="status" className="text-xs text-white/60">
              {status}
            </p>
          </>
        )}
      </main>
    </HifiShell>
  );
}
