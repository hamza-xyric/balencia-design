"use client";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronRight,
  Plus,
  Search,
  Settings,
  Shield,
  Users,
  X,
} from "lucide-react";
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  ChatBubble,
  Composer,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassCard,
  GlassPillInput,
  HifiShell,
  Provenance,
  SafetyCard,
  SolidCard,
  TopBar,
} from "@/components/hifi/kit";
import { E1Modal } from "../intelligence/E1Modal";
import { H1TextScaleScope } from "./H1TextScaleScope";
const states = [
  "default-community",
  "low-confidence-cached",
  "honest-null-no-rooms",
  "skeleton",
  "error-cached",
  "offline",
  "search-results",
  "search-empty",
  "room-preview",
  "join-consent",
  "join-success",
  "create-room",
  "room-interior",
  "audience-private",
  "send-success",
  "send-queued",
  "send-failure",
  "proof-pending",
  "proof-consent",
  "moderation-message",
  "block-member-confirm",
  "leave-room-confirm",
  "data-controls",
] as const;
type Fixture = (typeof states)[number];
type DiscoverCommunity = "Fitness lovers" | "Book club";
type CommunityMessage = {
  id: string;
  text: string;
  delivery?: "queued" | "failed";
};
type Panel =
  | "preview"
  | "join"
  | "create"
  | "proof"
  | "moderation"
  | "block"
  | "leave"
  | "delete-message"
  | "data"
  | null;
const rooms = [
  ["Morning crew", "5 members · Sarah: Great workout this morning.", "3 new"],
  [
    "Study group",
    "3 members · Aisha: Reviewed chapter four notes.",
    "Yesterday",
  ],
  [
    "Savings Community",
    "18 members · Marcus: Saved another fifty this week.",
    "2 d",
  ],
];
const communityMemberCounts: Record<DiscoverCommunity, number> = {
  "Fitness lovers": 42,
  "Book club": 28,
};
export function S40CommunityRooms() {
  const [fixture, setFixture] = useState<Fixture>("default-community"),
    [panel, setPanel] = useState<Panel>(null),
    [status, setStatus] = useState(
      "Bundled Community preview · refreshed today."
    ),
    [query, setQuery] = useState(""),
    [messages, setMessages] = useState<CommunityMessage[]>([
      { id: "sarah-1", text: "Sarah: Great workout this morning." },
      { id: "you-1", text: "You: I did my reading today." },
    ]),
    [joined, setJoined] = useState(false),
    [selectedCommunity, setSelectedCommunity] =
      useState<DiscoverCommunity>("Fitness lovers"),
    [joinedCommunity, setJoinedCommunity] =
      useState<DiscoverCommunity>("Fitness lovers"),
    [audience, setAudience] = useState("Only me · draft"),
    [proofSharingAccepted, setProofSharingAccepted] = useState(false),
    [selectedMessage, setSelectedMessage] =
      useState<CommunityMessage | null>(null),
    [communityDraftName, setCommunityDraftName] = useState(
      "Local reading Community"
    ),
    [communityDraft, setCommunityDraft] = useState<string | null>(null),
    [leftMorningCrew, setLeftMorningCrew] = useState(false),
    [blockedSarah, setBlockedSarah] = useState(false),
    [mutedSarah, setMutedSarah] = useState(false),
    [reportedSarah, setReportedSarah] = useState(false);
  const nextMessageId = useRef(0);
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("state");
    const f = (states as readonly string[]).includes(q ?? "")
      ? (q as Fixture)
      : "default-community";
    queueMicrotask(() => {
      setFixture(f);
      setLeftMorningCrew(false);
      setBlockedSarah(false);
      setMutedSarah(false);
      setReportedSarah(false);
      nextMessageId.current = 0;
      setProofSharingAccepted(false);
      setSelectedMessage(null);
      setCommunityDraftName("Local reading Community");
      setCommunityDraft(null);
      setStatus(
        f === "low-confidence-cached"
          ? "Bundled Community preview · freshness and live confidence unavailable."
          : f === "proof-pending"
          ? "Bundled proof pending review · freshness and live confidence unavailable."
          : f === "honest-null-no-rooms"
          ? "Bundled discovery previews only · no joined membership or audience subject."
          : f === "offline"
          ? "Cached Community preview · offline read-only; freshness unavailable."
          : "Bundled Community preview · refreshed today."
      );
      if (f === "search-results") setQuery("Morning");
      if (f === "search-empty") setQuery("No match");
      if (f === "room-preview") setPanel("preview");
      if (f === "join-consent") setPanel("join");
      if (f === "join-success") {
        setJoined(true);
        setJoinedCommunity("Fitness lovers");
        setStatus("Fitness lovers added locally to Your Communities.");
      }
      if (f === "create-room") setPanel("create");
      if (f === "audience-private") setAudience("Only me · draft");
      if (f === "send-success") {
        setAudience("Public · Morning crew");
        setMessages((m) => [
          ...m,
          {
            id: "you-send-success",
            text: "You: Local message sent to Public · Morning crew preview.",
          },
        ]);
        setStatus(
          "Message added locally for Public · Morning crew; nothing was published externally."
        );
      }
      if (f === "send-queued") {
        setMessages((current) => [
          ...current,
          {
            id: "you-send-queued",
            text: "You: Session-only delivery preview.",
            delivery: "queued",
          },
        ]);
        setStatus("Message queued in memory for this session only.");
      }
      if (f === "send-failure") {
        setMessages((current) => [
          ...current,
          {
            id: "you-send-failed",
            text: "You: Message delivery preview.",
            delivery: "failed",
          },
        ]);
        setStatus("Message failed locally. Nothing was published.");
      }
      if (f === "error-cached")
        setStatus(
          "Cached Community preview remains visible; refresh is unavailable."
        );
      if (f === "proof-consent") setPanel("proof");
      if (f === "moderation-message") setPanel("moderation");
      if (f === "block-member-confirm") setPanel("block");
      if (f === "leave-room-confirm") setPanel("leave");
      if (f === "data-controls") setPanel("data");
    });
  }, []);
  const blocked = fixture === "offline",
    low = fixture === "low-confidence-cached",
    errorCached = fixture === "error-cached",
    proofPending = fixture === "proof-pending",
    nil = fixture === "honest-null-no-rooms",
    degradedCommunity = low || errorCached || blocked || proofPending,
    proofAcceptanceUnavailable = blocked || errorCached || proofPending;
  const title =
    panel === "preview"
      ? `${selectedCommunity} Community preview`
      : panel === "join"
      ? "Join Community consent"
      : panel === "create"
      ? "Create Community"
      : panel === "proof"
      ? "Achievement proof consent"
      : panel === "moderation"
      ? "Moderate Sarah message"
      : panel === "block"
      ? "Block Sarah?"
      : panel === "leave"
      ? "Leave Morning crew?"
      : panel === "delete-message"
      ? "Delete your message?"
      : "Community data controls";
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
              {nil
                ? communityDraft
                  ? `${communityDraft} local Community draft · no joined room, member, message, proof, or audience subject is available · session retention · nothing published or inferred.`
                  : "No joined Community, room, message, proof, member, or audience subject is available · session retention · discover previews are not membership · nothing inferred."
                : degradedCommunity
                ? "Community messages and proof · cached bundled local preview · selected audience shown inline · freshness and live confidence unavailable · session retention."
                : "Community messages and proof · bundled local preview · selected audience · refreshed today · confidence inline · session retention."}
            </p>
            <ConsentRail controls={FULL_DATA_CONTROLS} />
          </>
        ) : panel === "preview" || panel === "join" ? (
          <>
            <p className="mt-3 text-sm text-white/70">
              {selectedCommunity} · persistent Community ·{" "}
              {communityMemberCounts[selectedCommunity]} bundled members ·
              Public audience · host-moderated local fixture · messages retained
              for this session · proof requires separate member and audience
              consent · leave anytime; own messages can be deleted locally;
              Community deletion is unavailable to members. No live join occurs.
            </p>
            <div className="mt-4 flex gap-2">
              <BtnGhost onClick={() => setPanel(null)}>Cancel</BtnGhost>
              <BtnPrimary
                disabled={blocked}
                onClick={() =>
                  panel === "preview"
                    ? setPanel("join")
                    : (setJoined(true),
                      setJoinedCommunity(selectedCommunity),
                      setPanel(null),
                      setStatus(`${selectedCommunity} joined locally.`))
                }
              >
                {panel === "preview" ? "Review join" : "Join preview"}
              </BtnPrimary>
            </div>
          </>
        ) : panel === "create" ? (
          <>
            <label className="mt-3 block text-sm">
              Community name
              <input
                className="mt-2 h-12 w-full rounded-xl bg-white/10 px-3 text-base"
                value={communityDraftName}
                onChange={(event) => setCommunityDraftName(event.target.value)}
              />
            </label>
            <BtnPrimary
              disabled={blocked || !communityDraftName.trim()}
              className="mt-3"
              onClick={() => {
                const name = communityDraftName.trim();
                if (!name) return;
                setCommunityDraft(name);
                setPanel(null);
                setStatus(
                  `${name} draft created locally and added below. Nothing was published.`
                );
              }}
            >
              Create draft
            </BtnPrimary>
          </>
        ) : panel === "proof" ? (
          <>
            <p className="mt-3 text-sm text-white/70">
              {proofPending
                ? "Share Sarah's bundled Mission achievement to Public · Morning crew? Source: bundled local proof pending review · scope: Mission achievement and +150 XP only · freshness unavailable · confidence: low, validation pending · Sarah sharing consent: last bundled-demo consent · audience consent: pending · no health fields or media."
                : degradedCommunity
                ? "Share Sarah's bundled Mission achievement to Public · Morning crew? Source: cached bundled local demo · scope: Mission achievement and +150 XP only · freshness and live confidence unavailable · Sarah sharing consent: last bundled-demo consent · audience consent: pending · no health fields or media."
                : "Share Sarah's bundled Mission achievement to Public · Morning crew? Source: bundled local demo · scope: Mission achievement and +150 XP only · freshness: Apr 12, 2026 · confidence: confirmed fixture · Sarah sharing consent: bundled-demo consented · audience consent: pending · no health fields or media."}
            </p>
            <div className="mt-3 flex gap-2">
              <BtnGhost
                onClick={() => {
                  setPanel(null);
                  setAudience("Only me · draft");
                  setProofSharingAccepted(false);
                  setStatus(
                    "Achievement proof kept private. Audience consent remains off."
                  );
                }}
              >
                Keep private
              </BtnGhost>
              <BtnPrimary
                disabled={proofAcceptanceUnavailable}
                aria-describedby={
                  proofAcceptanceUnavailable
                    ? "community-proof-accept-disabled-reason"
                    : undefined
                }
                onClick={() => {
                  if (proofAcceptanceUnavailable) return;
                  setPanel(null);
                  setAudience("Public · Morning crew");
                  setProofSharingAccepted(true);
                  setStatus(
                    "Proof-sharing consent accepted locally for Public · Morning crew; nothing published externally."
                  );
                }}
              >
                Accept preview
              </BtnPrimary>
            </div>
            {proofAcceptanceUnavailable && (
              <p
                id="community-proof-accept-disabled-reason"
                className="mt-2 text-xs text-brand-orange"
              >
                {proofPending
                  ? "Proof validation is pending at low confidence. Public acceptance is disabled; Keep private remains available."
                  : "Refresh the Community source before accepting a new public proof audience. Keep private remains available."}
              </p>
            )}
          </>
        ) : panel === "delete-message" ? (
          <>
            <p className="mt-3 text-sm text-white/70">
              Delete “{selectedMessage?.text
                .split(": ")
                .slice(1)
                .join(": ")}” from
              this session-only local preview? The Community and external data
              are unchanged.
            </p>
            <div className="mt-4 flex gap-2">
              <BtnSecondary onClick={() => setPanel(null)}>Cancel</BtnSecondary>
              <BtnPrimary
                disabled={blocked || !selectedMessage}
                onClick={() => {
                  if (blocked || !selectedMessage) return;
                  setMessages((current) =>
                    current.filter((message) => message.id !== selectedMessage.id)
                  );
                  setStatus(
                    "Your local message preview was deleted. No Community or external data changed."
                  );
                  setSelectedMessage(null);
                  setPanel(null);
                }}
              >
                Delete local message
              </BtnPrimary>
            </div>
          </>
        ) : (
          <>
            <p className="mt-3 text-sm text-white/70">
              This local action names Sarah and Morning crew. Nothing is
              reported, blocked, or removed externally.
            </p>
            <div className="mt-4 flex gap-2">
              <BtnSecondary onClick={() => setPanel(null)}>Cancel</BtnSecondary>
              <BtnPrimary
                disabled={
                  blocked &&
                  (panel === "block" ||
                    panel === "leave" ||
                    panel === "moderation")
                }
                onClick={() => {
                  if (blocked) return;
                  if (panel === "block") {
                    setBlockedSarah(true);
                    setMutedSarah(false);
                    setStatus(
                      "Sarah blocked locally. Her messages and proof are hidden; unblock remains available."
                    );
                  } else if (panel === "leave") {
                    setLeftMorningCrew(true);
                    setStatus(
                      "Morning crew left locally. Its room and membership are hidden; undo remains available."
                    );
                  } else {
                    setReportedSarah(true);
                    setStatus(
                      "Sarah message report draft prepared locally and shown below. Nothing was sent externally."
                    );
                  }
                  setPanel(null);
                }}
              >
                Confirm
              </BtnPrimary>
            </div>
            {panel === "moderation" && <SafetyCard />}
          </>
        )}
      </div>
    </E1Modal>
  ) : undefined;
  const availableRooms = leftMorningCrew
    ? rooms.filter(([name]) => name !== "Morning crew")
    : rooms;
  const visibleRooms = availableRooms.map((room) =>
    blockedSarah && room[0] === "Morning crew"
      ? ["Morning crew", "4 members · blocked member hidden locally.", room[2]]
      : room
  );
  const resultRooms =
    query === "No match"
      ? []
      : visibleRooms.filter((r) =>
          r[0].toLowerCase().includes(query.toLowerCase())
        );
  const visibleMessages = blockedSarah
    ? messages.filter((message) => !message.text.startsWith("Sarah:"))
    : messages;
  const memberInitials = blockedSarah
    ? ["A", "M", "Y", "L"]
    : ["S", "A", "M", "Y", "L"];
  const joinedCount = nil ? 0 : visibleRooms.length + (joined ? 1 : 0);
  return (
    <HifiShell
      header={
        <TopBar
          title="Communities"
          back
          right={
            <button
              aria-label="Community settings"
              onClick={() => setPanel("data")}
              className="grid h-11 w-11 shrink-0 place-items-center"
            >
              <Settings />
            </button>
          }
        />
      }
      activeTab="cia"
      atmosphere="you"
      overlay={overlay}
    >
      <main
        data-h1-state={`40-${fixture}`}
        data-selected-community={nil ? "none" : selectedCommunity}
        data-membership-actions={blocked ? "disabled" : "enabled"}
        data-proof-sharing={
          nil ? "none" : proofSharingAccepted ? "accepted" : "required"
        }
        data-blocked-sarah={blockedSarah ? "true" : "false"}
        data-muted-sarah={mutedSarah ? "true" : "false"}
        data-community-draft={communityDraft ? "created" : "none"}
        data-sarah-report={reportedSarah ? "drafted" : "none"}
        data-queued-message-count={
          messages.filter(({ delivery }) => delivery === "queued").length
        }
        data-failed-message-count={
          messages.filter(({ delivery }) => delivery === "failed").length
        }
        className="space-y-5 px-4 pb-5 pt-3"
      >
        <H1TextScaleScope />
        {fixture === "skeleton" ? (
          <div
            aria-label="Loading Communities"
            className="space-y-3 animate-pulse motion-reduce:animate-none"
          >
            <div className="h-14 rounded-full bg-white/5" />
            <div className="h-40 rounded-2xl bg-white/5" />
            <div className="h-52 rounded-2xl bg-white/5" />
          </div>
        ) : (
          <>
            {fixture === "room-interior" && (
              <p
                role="status"
                className="rounded-xl border border-white/10 p-3 text-sm text-white/70"
              >
                Morning crew room open · {audience} · bundled local preview.
              </p>
            )}
            {fixture === "audience-private" && (
              <p
                role="status"
                className="rounded-xl border border-brand-orange/20 bg-brand-orange/10 p-3 text-sm text-white/75"
              >
                Only me draft · nothing is published to Morning crew.
              </p>
            )}
            {blockedSarah && (
              <SolidCard>
                <p className="text-sm text-white/75">
                  Sarah is blocked in this local preview. Her messages and proof
                  are hidden; no external account changed.
                </p>
                <BtnSecondary
                  className="mt-3"
                  onClick={() => {
                    setBlockedSarah(false);
                    setStatus(
                      "Sarah unblocked locally. Her bundled messages and proof are visible again."
                    );
                  }}
                >
                  Unblock Sarah locally
                </BtnSecondary>
              </SolidCard>
            )}
            {reportedSarah && (
              <SolidCard>
                <p className="text-sm text-white/75">
                  Sarah message report draft · Morning crew · local only · not
                  sent to moderation
                </p>
                <BtnSecondary
                  className="mt-3"
                  onClick={() => {
                    setReportedSarah(false);
                    setStatus("Sarah report draft deleted locally.");
                  }}
                >
                  Delete report draft
                </BtnSecondary>
              </SolidCard>
            )}
            {(blocked || fixture === "error-cached") && (
              <SolidCard>
                <p>
                  {blocked
                    ? "Offline · send and membership changes disabled"
                    : "Refresh failed · cached Communities"}
                </p>
                <p className="text-xs text-white/55">
                  No server request occurred.
                </p>
                {fixture === "error-cached" && (
                  <BtnSecondary
                    className="mt-3"
                    onClick={() =>
                      setStatus(
                        "Community source retry previewed locally. Cached rooms remain; no network request occurred."
                      )
                    }
                  >
                    Retry Community source
                  </BtnSecondary>
                )}
              </SolidCard>
            )}
            <GlassPillInput
              key={`community-search-${fixture}`}
              icon={<Search />}
              placeholder="Find your Communities"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <p role="status" className="text-xs text-white/60">
                {resultRooms.length} Community result
                {resultRooms.length === 1 ? "" : "s"}
              </p>
            )}
            <section>
              <h2 className="mb-3 font-semibold">
                Discover persistent Communities
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {(
                  ["Fitness lovers", "Book club"] as const
                ).map((name, i) => (
                  <GlassCard key={name} tone="muted">
                    <div className="space-y-2 p-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-white/5">
                        <Users />
                      </span>
                      <p>{name}</p>
                      <p className="text-xs text-white/55">
                        {i ? 28 : 42} members · bundled
                      </p>
                      <button
                        disabled={blocked}
                        aria-describedby={blocked ? "community-offline-reason" : undefined}
                        onClick={() => {
                          setSelectedCommunity(name);
                          setPanel("preview");
                        }}
                        className="focus-ring min-h-11 w-full rounded-xl border border-white/10 text-xs disabled:opacity-40"
                      >
                        Preview Community
                      </button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </section>
            {communityDraft && (
              <SolidCard>
                <div className="space-y-2 p-4">
                  <p className="font-medium text-white">{communityDraft}</p>
                  <p className="text-xs text-white/55">
                    Draft only · 0 members · private session preview · not
                    published
                  </p>
                  <BtnGhost
                    onClick={() => {
                      setCommunityDraft(null);
                      setStatus("Local Community draft deleted.");
                    }}
                  >
                    Delete Community draft
                  </BtnGhost>
                </div>
              </SolidCard>
            )}
            <section>
              <h2 className="mb-3 font-semibold">
                Your Communities · {joinedCount} joined
              </h2>
              {nil ? (
                <SolidCard>
                  <p className="text-sm text-white/65">
                    No joined Communities yet. Discover remains available.
                  </p>
                </SolidCard>
              ) : (
                <SolidCard>
                  {(query ? resultRooms : visibleRooms).map(
                    ([name, preview, meta]) => (
                      <button
                        key={name}
                        aria-label={`Select ${name} persistent Community; ${preview}; ${meta}; bundled preview`}
                        onClick={() =>
                          setStatus(
                            `${name} selected; its full room route is unavailable in this visual preview. Nothing changed.`
                          )
                        }
                        className="focus-ring flex min-h-[68px] w-full items-center gap-3 border-b border-white/5 p-3 text-left last:border-0"
                      >
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/5">
                          {name
                            .split(" ")
                            .map((x) => x[0])
                            .join("")}
                        </span>
                        <span className="min-w-0 flex-1">
                          <strong className="block text-sm">{name}</strong>
                          <span className="block truncate text-xs text-white/55">
                            {preview}
                          </span>
                        </span>
                        <span className="text-xs text-white/50">{meta}</span>
                      </button>
                    )
                  )}
                  {joined && (
                    <p className="p-3 text-sm">
                      {joinedCommunity} · joined locally
                    </p>
                  )}
                </SolidCard>
              )}
              <button
                disabled={blocked}
                aria-describedby={blocked ? "community-offline-reason" : undefined}
                onClick={() => setPanel("create")}
                className="focus-ring mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 disabled:opacity-40"
              >
                <Plus />
                Create Community
              </button>
            </section>
            {!nil && !leftMorningCrew ? (
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-semibold">
                    Morning crew Community · {memberInitials.length} members
                  </h2>
                  <button
                    aria-label="Morning crew moderation"
                    disabled={blocked}
                    aria-describedby={blocked ? "community-offline-reason" : undefined}
                    onClick={() => setPanel("moderation")}
                    className="grid h-11 w-11 shrink-0 place-items-center disabled:opacity-40"
                  >
                    <Shield />
                  </button>
                </div>
                <SolidCard>
                  <div className="border-b border-white/5 p-3">
                    <p className="text-xs text-white/60">
                      Persistent Community · bundled preview · {audience}
                    </p>
                    <div
                      role="img"
                      aria-label={`${memberInitials.length} bundled members; ${
                        blockedSarah
                          ? "Sarah hidden after local block"
                          : "Sarah visible"
                      }`}
                      className="mt-2 flex -space-x-2"
                    >
                      {memberInitials.map((x) => (
                        <span
                          key={x}
                          className="grid h-8 w-8 place-items-center rounded-full border border-ink-900 bg-white/10 text-xs"
                        >
                          {x}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3 p-3">
                    {visibleMessages.map((message) => {
                      const ownMessage = message.text.startsWith("You:");
                      const messageBody = message.text
                        .split(": ")
                        .slice(1)
                        .join(": ");
                      return (
                        <div key={message.id}>
                          <ChatBubble speaker={message.text.split(":")[0]}>
                            {messageBody}
                          </ChatBubble>
                          {message.delivery && (
                            <div className="mt-1">
                              <p
                                role={
                                  message.delivery === "failed"
                                    ? "alert"
                                    : "status"
                                }
                                className={`text-xs ${
                                  message.delivery === "failed"
                                    ? "text-red-300"
                                    : "text-brand-orange"
                                }`}
                              >
                                {message.delivery === "failed"
                                  ? "Failed locally · not published."
                                  : "Queued in memory · session only · not a server delivery."}
                              </p>
                              {message.delivery === "failed" && (
                                <button
                                  className="focus-ring min-h-11 rounded-full px-3 text-xs text-brand-orange"
                                  onClick={() => {
                                    setMessages((current) =>
                                      current.map((item) =>
                                        item.id === message.id
                                          ? { ...item, delivery: "queued" }
                                          : item
                                      )
                                    );
                                    setStatus(
                                      "Failed message retry queued in memory for this session only."
                                    );
                                  }}
                                >
                                  Retry local message
                                </button>
                              )}
                            </div>
                          )}
                          {ownMessage && (
                            <button
                              disabled={blocked}
                              aria-describedby={
                                blocked ? "community-offline-reason" : undefined
                              }
                              aria-label={`Delete your message preview: ${messageBody}`}
                              className="focus-ring mt-1 min-h-11 rounded-full px-3 text-xs text-white/60 disabled:opacity-40"
                              onClick={() => {
                                setSelectedMessage(message);
                                setPanel("delete-message");
                              }}
                            >
                              Delete your message
                            </button>
                          )}
                        </div>
                      );
                    })}
                    {!blockedSarah && (
                      <GlassCard tone="muted">
                        <button
                          disabled={blocked}
                          aria-describedby={blocked ? "community-offline-reason" : undefined}
                          onClick={() => setPanel("proof")}
                          className="focus-ring min-h-11 w-full p-3 text-left disabled:opacity-40"
                        >
                          <p className="text-sm">
                            Sarah Mission achievement · +150 XP
                          </p>
                          <p className="text-xs text-white/55">
                            Bundled proof ·{" "}
                            {fixture === "proof-pending"
                              ? "pending, low confidence"
                              : degradedCommunity
                              ? "cached bundled proof · freshness and live confirmation unavailable · audience consent required"
                              : proofSharingAccepted
                              ? "Sarah bundled-demo consented · Public · Morning crew accepted locally · fresh Apr 12, 2026 · confirmed fixture · not published"
                              : "Sarah bundled-demo consented · audience consent required · fresh Apr 12, 2026 · confirmed fixture"}
                          </p>
                        </button>
                      </GlassCard>
                    )}
                    <div className="flex gap-2">
                      <ChipButton
                        selected={audience.startsWith("Public")}
                        label="Public room"
                        onClick={() => setAudience("Public · Morning crew")}
                      />
                      <ChipButton
                        selected={audience.startsWith("Only")}
                        label="Only me draft"
                        onClick={() => setAudience("Only me · draft")}
                      />
                    </div>
                    <Composer
                      placeholder="Say something to Morning crew"
                      ariaLabel={`Morning crew message composer; audience ${audience}`}
                      inputLabel="Message Morning crew"
                      disabled={blocked}
                      sendDisabled={blocked}
                      disabledReasonId="community-offline-reason"
                      announceInternally={false}
                      onSend={(text) => {
                        setMessages((current) => [
                          ...current,
                          {
                            id: `you-local-${++nextMessageId.current}`,
                            text: `You: ${text}`,
                          },
                        ]);
                        setStatus(`Message added locally for ${audience}.`);
                      }}
                    />
                  </div>
                </SolidCard>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <button
                    disabled={blocked}
                    aria-describedby={blocked ? "community-offline-reason" : undefined}
                    onClick={() => setPanel("moderation")}
                    className="focus-ring min-h-11 rounded-xl bg-white/5 text-xs disabled:opacity-40"
                  >
                    <Shield className="mx-auto h-4" />
                    Report
                  </button>
                  <button
                    aria-pressed={mutedSarah}
                    onClick={() => {
                      const next = !mutedSarah;
                      setMutedSarah(next);
                      setStatus(
                        next
                          ? "Sarah muted locally. Community notifications from Sarah are suppressed in this preview; unmute is available here."
                          : "Sarah unmuted locally. Community notifications from Sarah are restored in this preview."
                      );
                    }}
                    disabled={blocked || blockedSarah}
                    aria-describedby={blocked ? "community-offline-reason" : undefined}
                    className="focus-ring min-h-11 rounded-xl bg-white/5 text-xs disabled:opacity-40"
                  >
                    <Bell className="mx-auto h-4" />
                    {mutedSarah ? "Unmute" : "Mute"}
                  </button>
                  <button
                    onClick={() => setPanel("block")}
                    disabled={blocked || blockedSarah}
                    aria-describedby={blocked ? "community-offline-reason" : undefined}
                    className="focus-ring min-h-11 rounded-xl bg-white/5 text-xs disabled:opacity-40"
                  >
                    <ChevronRight className="mx-auto h-4" />
                    {blockedSarah ? "Blocked" : "Block"}
                  </button>
                </div>
                <BtnGhost
                  className="mt-2"
                  disabled={blocked}
                  aria-describedby={blocked ? "community-offline-reason" : undefined}
                  onClick={() => setPanel("leave")}
                >
                  Leave Morning crew
                </BtnGhost>
              </section>
            ) : !nil ? (
              <SolidCard>
                <div className="space-y-3 p-4">
                  <p className="font-medium">Morning crew left locally</p>
                  <p className="text-sm text-white/60">
                    The room, member count, messages and proof are hidden from
                    this session preview.
                  </p>
                  <BtnSecondary
                    onClick={() => {
                      setLeftMorningCrew(false);
                      setStatus("Morning crew restored locally.");
                    }}
                  >
                    Undo leave
                  </BtnSecondary>
                </div>
              </SolidCard>
            ) : null}
            <Provenance
              items={
                nil
                  ? [
                      "Bundled discovery previews · not membership",
                      "No joined audience subject",
                      "Session-only retention",
                    ]
                  : [
                      low
                        ? "Bundled cache · low confidence"
                        : errorCached
                        ? "Cached Community demo · refresh unavailable"
                        : blocked
                        ? "Cached Community demo · offline read-only"
                        : proofPending
                        ? "Bundled proof · validation pending"
                        : "Bundled Community demo",
                      "Audience shown before send",
                      degradedCommunity
                        ? "Freshness and live confidence unavailable"
                        : "Confirmed local fixture",
                      "Session-only retention",
                    ]
              }
            />
            <BtnGhost onClick={() => setPanel("data")}>Data controls</BtnGhost>
            {blocked && (
              <p
                id="community-offline-reason"
                className="text-xs text-brand-orange"
              >
                Reconnect to preview, join, create, leave, or moderate a
                Community. Cached rooms remain read-only.
              </p>
            )}
            <p role="status" className="text-xs text-white/60">
              {status}
            </p>
          </>
        )}
      </main>
    </HifiShell>
  );
}
function ChipButton({
  selected,
  label,
  onClick,
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={selected}
      onClick={onClick}
      className={`focus-ring min-h-11 rounded-full border px-3 text-xs ${
        selected
          ? "border-brand-orange/60 bg-brand-orange text-ink-900"
          : "border-white/10 bg-white/[0.03] text-white/75"
      }`}
    >
      {label}
    </button>
  );
}
