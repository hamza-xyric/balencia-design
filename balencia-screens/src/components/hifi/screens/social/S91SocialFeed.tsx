"use client";

import { useEffect, useState } from "react";
import {
  Flag,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Shield,
  ThumbsUp,
} from "lucide-react";
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  Chip,
  CIAInsightCard,
  ConsentRail,
  FULL_DATA_CONTROLS,
  FloatingQuickLog,
  GlassCard,
  HifiShell,
  IconButton,
  SolidCard,
  TopBar,
} from "@/components/hifi/kit";
import { E1Modal } from "../intelligence/E1Modal";
import { H1TextScaleScope } from "./H1TextScaleScope";

const STATES = [
  "default-consented",
  "audience-unselected",
  "proof-preview",
  "proof-low-confidence",
  "proof-honest-null",
  "skeleton",
  "empty",
  "cached-error",
  "offline-queued",
  "kudos-success",
  "comment-sheet",
  "composer-disabled",
  "moderation-sheet",
  "report-success",
  "own-delete-confirm",
  "data-controls",
  "media-consent-off",
] as const;
type Fixture = (typeof STATES)[number];
type Panel =
  | "composer"
  | "proof"
  | "comment"
  | "moderation"
  | "delete"
  | "data"
  | null;

type FeedPostSelection = {
  id: "aisha" | "malik" | "own";
  author: string;
  body: string;
  own: boolean;
};
type SavedComment = {
  postId: FeedPostSelection["id"];
  author: string;
  body: string;
};
type SavedLocalPost = {
  postType: "Discussion" | "Question" | "Win";
  audience: "Only me" | "Morning run Squad" | "Wellbeing Community";
  proof: string;
};

const AISHA_POST: FeedPostSelection = {
  id: "aisha",
  author: "Aisha Khan",
  body: "Finished tempo run with Amira.",
  own: false,
};
const MALIK_POST: FeedPostSelection = {
  id: "malik",
  author: "Malik R.",
  body: "Budget routine reached 14 days.",
  own: false,
};
const OWN_POST: FeedPostSelection = {
  id: "own",
  author: "You",
  body: "Evening walk complete",
  own: true,
};
const FEED_POSTS: Record<FeedPostSelection["id"], FeedPostSelection> = {
  aisha: AISHA_POST,
  malik: MALIK_POST,
  own: OWN_POST,
};
const OPAQUE_MODAL_CLASS =
  "!bg-ink-900 border border-white/15 shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand-orange";

function initialPanel(fixture: Fixture): Panel {
  if (fixture === "proof-preview" || fixture === "proof-low-confidence")
    return "proof";
  if (fixture === "comment-sheet") return "comment";
  if (fixture === "moderation-sheet") return "moderation";
  if (fixture === "own-delete-confirm") return "delete";
  if (fixture === "data-controls") return "data";
  return null;
}

function initialSelectedPost(fixture: Fixture) {
  return fixture === "own-delete-confirm" ? OWN_POST : AISHA_POST;
}

export function S91SocialFeed() {
  const [fixture, setFixture] = useState<Fixture>("default-consented");
  const [panel, setPanel] = useState<Panel>(() => initialPanel(fixture));
  const [filter, setFilter] = useState<
    "All" | "My Squads" | "Communities" | "Partners"
  >("All");
  const [selectedPostType, setSelectedPostType] = useState<
    "Discussion" | "Question" | "Win"
  >("Discussion");
  const [kudosActive, setKudosActive] = useState(
    fixture === "kudos-success"
  );
  const [malikKudosActive, setMalikKudosActive] = useState(false);
  const [selectedPost, setSelectedPost] = useState<FeedPostSelection>(() =>
    initialSelectedPost(fixture)
  );
  const [reportedPostIds, setReportedPostIds] = useState<string[]>(
    fixture === "report-success" ? [AISHA_POST.id] : []
  );
  const [mutedPostIds, setMutedPostIds] = useState<
    FeedPostSelection["id"][]
  >([]);
  const [blockedPostIds, setBlockedPostIds] = useState<
    FeedPostSelection["id"][]
  >([]);
  const [hiddenPostIds, setHiddenPostIds] = useState<
    FeedPostSelection["id"][]
  >([]);
  const [proofAttached, setProofAttached] = useState(
    fixture !== "proof-honest-null"
  );
  const [proofSharingRevoked, setProofSharingRevoked] = useState(false);
  const [ownPostDeleted, setOwnPostDeleted] = useState(false);
  const [commentDraft, setCommentDraft] = useState("");
  const [savedComments, setSavedComments] = useState<SavedComment[]>([]);
  const [savedLocalPost, setSavedLocalPost] =
    useState<SavedLocalPost | null>(null);
  const [audience, setAudience] = useState<
    "Only me" | "Morning run Squad" | "Wellbeing Community" | null
  >(fixture === "audience-unselected" ? null : "Only me");
  const [status, setStatus] = useState(
    fixture === "kudos-success"
      ? "Kudos queued locally. Undo is available."
      : fixture === "report-success"
      ? "Aisha Khan post report queued locally for review. No outcome is promised."
      : fixture === "offline-queued"
      ? "Offline · cached feed · actions queue locally."
      : ""
  );
  useEffect(() => {
    const value = new URLSearchParams(location.search).get("state");
    const next = STATES.includes(value as Fixture)
      ? (value as Fixture)
      : "default-consented";
    queueMicrotask(() => {
      setFixture(next);
      setPanel(initialPanel(next));
      setFilter("All");
      setSelectedPostType("Discussion");
      setKudosActive(next === "kudos-success");
      setMalikKudosActive(false);
      setSelectedPost(initialSelectedPost(next));
      setReportedPostIds(next === "report-success" ? [AISHA_POST.id] : []);
      setMutedPostIds([]);
      setBlockedPostIds([]);
      setHiddenPostIds([]);
      setProofAttached(next !== "proof-honest-null");
      setProofSharingRevoked(false);
      setOwnPostDeleted(false);
      setCommentDraft("");
      setSavedComments([]);
      setSavedLocalPost(null);
      setAudience(next === "audience-unselected" ? null : "Only me");
      setStatus(
        next === "kudos-success"
          ? "Kudos queued locally. Undo is available."
          : next === "report-success"
          ? "Aisha Khan post report queued locally for review. No outcome is promised."
          : next === "offline-queued"
          ? "Offline · cached feed · actions queue locally."
          : ""
      );
    });
  }, []);

  const offline = fixture === "offline-queued";
  const cached = fixture === "cached-error";
  const degradedFeed = offline || cached;
  const composerDisabled = fixture === "composer-disabled";
  const mediaOff = fixture === "media-consent-off";
  const proofNull = fixture === "proof-honest-null";
  const low = fixture === "proof-low-confidence";
  const proofVisible =
    proofAttached && !proofSharingRevoked && !proofNull && !mediaOff;
  const reported = reportedPostIds.includes(selectedPost.id);
  const selectedFirstName = selectedPost.author.split(" ")[0];
  const aishaCommentCount =
    6 + savedComments.filter(({ postId }) => postId === AISHA_POST.id).length;
  const malikCommentCount =
    2 + savedComments.filter(({ postId }) => postId === MALIK_POST.id).length;

  const overlay = panel ? (
    <E1Modal
      label={
        panel === "composer"
          ? "Review proof update"
          : panel === "proof"
          ? "Proof and audience review"
          : panel === "comment"
          ? "Comment preview"
          : panel === "moderation"
          ? "Post moderation"
          : panel === "delete"
          ? "Delete your post"
          : "Feed data controls"
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
      {(panel === "composer" || panel === "proof") && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Review before posting
          </h2>
          <fieldset className="space-y-2">
            <legend className="text-sm text-white/70">Audience</legend>
            {(
              ["Only me", "Morning run Squad", "Wellbeing Community"] as const
            ).map((item) => (
              <label
                key={item}
                className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 px-3"
              >
                <input
                  type="radio"
                  name="feed-audience"
                  checked={audience === item}
                  onChange={() => setAudience(item)}
                  className="focus-ring h-5 w-5 rounded-full accent-brand-orange"
                />
                <span className="text-sm text-white">{item}</span>
              </label>
            ))}
          </fieldset>
          <SolidCard>
            <div className="space-y-2 p-3 text-sm text-white/70">
              <p className="font-semibold text-white">
                {proofNull
                  ? "Proof source unavailable"
                  : mediaOff
                  ? "Proof withheld by consent"
                  : proofVisible
                  ? "Distance proof preview"
                  : proofSharingRevoked
                  ? "Proof sharing revoked"
                  : "No proof attached"}
              </p>
              {proofVisible ? (
                <>
                  <p>Field: distance 5.2 mi · source: bundled wearable demo</p>
                  <p>
                    Scope: {audience ?? "audience not selected"} ·{" "}
                    {degradedFeed
                      ? "cached proof · freshness and live confirmation unavailable"
                      : `refreshed 12m ago · ${
                          low ? "low confidence" : "confirmed fixture"
                        }`}
                  </p>
                  <p>Session retention · no live provider or publication.</p>
                </>
              ) : (
                <p>
                  {proofNull
                    ? "The bundled proof source is unavailable. No distance, source, media, or completion value is inferred."
                    : mediaOff
                    ? "Media consent is off. The audience-authorized text update contains no distance, source, or media field."
                    : proofSharingRevoked
                    ? "Wearable proof scope is off. Distance and media fields are suppressed from this preview."
                    : "The post preview contains text only. No distance, source, or media field is shared."}
                </p>
              )}
            </div>
          </SolidCard>
          <div className="flex flex-wrap gap-2">
            <BtnSecondary
              disabled={!proofVisible}
              onClick={() => {
                setProofAttached(false);
                setSavedLocalPost((current) =>
                  current
                    ? {
                        ...current,
                        proof: "Text only · proof removed locally",
                      }
                    : current
                );
                setStatus(
                  "Proof attachment removed. Distance and media fields are suppressed."
                );
              }}
            >
              {proofVisible
                ? "Remove proof"
                : proofNull
                ? "Proof unavailable"
                : mediaOff
                ? "Proof withheld"
                : "Proof removed"}
            </BtnSecondary>
            <BtnGhost
              disabled={!proofVisible}
              onClick={() => {
                setStatus(
                  "Proof export is unavailable in this visual preview. No file was created."
                );
                setPanel(null);
              }}
            >
              Export
            </BtnGhost>
            <BtnGhost
              disabled={proofSharingRevoked || proofNull}
              onClick={() => {
                setProofSharingRevoked(true);
                setProofAttached(false);
                setSavedLocalPost((current) =>
                  current
                    ? {
                        ...current,
                        proof: "Text only · proof source revoked locally",
                      }
                    : current
                );
                setStatus(
                  "Wearable proof scope revoked. Distance and media fields are suppressed."
                );
              }}
            >
              {proofNull
                ? "Source unavailable"
                : proofSharingRevoked
                ? "Scope revoked"
                : "Revoke source"}
            </BtnGhost>
          </div>
          <BtnPrimary
            className="w-full"
            disabled={!audience || composerDisabled}
            onClick={() => {
              if (!audience || composerDisabled) return;
              setSavedLocalPost({
                postType: selectedPostType,
                audience,
                proof: proofVisible
                  ? "Distance 5.2 mi · bundled wearable demo"
                  : mediaOff
                  ? "Text only · proof withheld by consent"
                  : "Text only · no proof attached",
              });
              setStatus(
                "Post saved to the local preview shown below. Nothing was published."
              );
              setPanel(null);
            }}
          >
            Save local preview
          </BtnPrimary>
          {!audience && (
            <p className="text-sm text-white/55">
              Choose an audience before saving.
            </p>
          )}
        </div>
      )}
      {panel === "comment" && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            Comment on {selectedPost.author}&apos;s post
          </h2>
          <p className="text-sm text-white/60">“{selectedPost.body}”</p>
          <textarea
            aria-label="Comment"
            value={commentDraft}
            onChange={(event) => setCommentDraft(event.target.value)}
            className="focus-ring min-h-24 w-full rounded-xl bg-white/5 p-3 text-base text-white"
          />
          <BtnPrimary
            disabled={!commentDraft.trim()}
            onClick={() => {
              const body = commentDraft.trim();
              if (!body) return;
              setSavedComments((comments) => [
                ...comments,
                {
                  postId: selectedPost.id,
                  author: selectedPost.author,
                  body,
                },
              ]);
              setCommentDraft("");
              setStatus(
                offline
                  ? `Comment on ${selectedPost.author}'s post queued and shown locally while offline.`
                  : `Comment on ${selectedPost.author}'s post saved and shown in the local preview.`
              );
              setPanel(null);
            }}
          >
            Save comment
          </BtnPrimary>
        </div>
      )}
      {panel === "moderation" && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">
            {selectedPost.author} post
          </h2>
          <p className="text-sm text-white/60">“{selectedPost.body}”</p>
          {reported && (
            <p className="text-sm text-white/60">
              Report already queued locally for review. No outcome is promised.
            </p>
          )}
          {[
            [
              "Save preview",
              `${selectedPost.author} save preview closed. No feed state changed.`,
            ],
            [
              "Review public-link availability",
              `${selectedPost.author} public-link flow is unavailable in this visual preview. No clipboard was used.`,
            ],
            [
              "Report",
              `${selectedPost.author} post report queued locally for review. No outcome is promised.`,
            ],
            [
              `Mute ${selectedFirstName}`,
              "mute",
              `${selectedPost.author} post muted locally. Undo is available below.`,
            ],
            [
              `Block ${selectedFirstName}`,
              "block",
              `${selectedPost.author} blocked locally. Their bundled posts are hidden; unblock is available below.`,
            ],
            [
              "Hide similar posts",
              "hide",
              `Similar posts from ${selectedPost.author} hidden locally. Undo is available below.`,
            ],
          ].map(([label, action = "preview", outcome = action]) => {
            const reportLocked = label === "Report" && reported;
            return (
              <button
                key={label}
                type="button"
                disabled={reportLocked}
                className="focus-ring min-h-11 w-full rounded-xl border border-white/10 px-3 text-left text-sm text-white/80 disabled:opacity-45"
                onClick={() => {
                  if (label === "Report")
                    setReportedPostIds((ids) =>
                      ids.includes(selectedPost.id)
                        ? ids
                        : [...ids, selectedPost.id]
                    );
                  if (action === "mute")
                    setMutedPostIds((ids) =>
                      ids.includes(selectedPost.id)
                        ? ids
                        : [...ids, selectedPost.id]
                    );
                  if (action === "block")
                    setBlockedPostIds((ids) =>
                      ids.includes(selectedPost.id)
                        ? ids
                        : [...ids, selectedPost.id]
                    );
                  if (action === "hide")
                    setHiddenPostIds((ids) =>
                      ids.includes(selectedPost.id)
                        ? ids
                        : [...ids, selectedPost.id]
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
      {panel === "delete" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Delete your post?
          </h2>
          <p className="text-sm text-white/65">
            “{selectedPost.body}” and its local proof preview will be removed.
            This does not affect external data.
          </p>
          <div className="flex gap-2">
            <BtnSecondary onClick={() => setPanel(null)}>Cancel</BtnSecondary>
            <BtnPrimary
              onClick={() => {
                setOwnPostDeleted(true);
                setStatus("Your local post preview was deleted.");
                setPanel(null);
              }}
            >
              Delete local post
            </BtnPrimary>
          </div>
        </div>
      )}
      {panel === "data" && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            Feed data controls
          </h2>
          <p className="text-sm text-white/65">
            {fixture === "empty"
              ? `No bundled feed posts, authors, comments, views, or kudos are available · ${
                  proofVisible
                    ? "local composer proof preview is available"
                    : "local composer proof is not attached"
                } · ${
                  audience ? `audience ${audience}` : "audience not selected"
                } · session retention · no subject inferred.`
              : proofNull
              ? `Category social proof · bundled post text only · proof source unavailable · ${
                  audience ? `audience ${audience}` : "audience not selected"
                } · session retention · no proof value inferred.`
              : mediaOff
              ? `Category social proof · audience-authorized text update only · proof media and metric consent off · ${
                  audience ? `audience ${audience}` : "audience not selected"
                } · session retention · no distance, source, or media retained.`
              : degradedFeed
              ? `Category social proof · bundled cached posts · ${
                  audience ? `audience ${audience}` : "audience not selected"
                } · freshness and live confirmation unavailable · session retention.`
              : `Category social proof · bundled posts · ${
                  audience ? `audience ${audience}` : "audience not selected"
                } · refreshed Apr 12 · confidence inline · session retention.`}
          </p>
          <ConsentRail controls={FULL_DATA_CONTROLS} />
          <BtnSecondary
            onClick={() => {
              setStatus(
                "Proof correction flow is unavailable in this visual preview. Nothing changed."
              );
              setPanel(null);
            }}
          >
            Correct proof
          </BtnSecondary>
        </div>
      )}
    </E1Modal>
  ) : null;

  return (
    <HifiShell
      header={
        <TopBar
          title="Feed"
          back={false}
          right={
            <>
              <IconButton
                label={
                  composerDisabled
                    ? "Post unavailable: moderation review is active"
                    : "Post"
                }
                disabled={composerDisabled}
                className="disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => setPanel("composer")}
              >
                <Plus size={18} />
              </IconButton>
              <IconButton
                label="Feed options"
                onClick={() => setStatus("Feed options are available below.")}
              >
                <MoreHorizontal size={18} />
              </IconButton>
            </>
          }
        />
      }
      activeTab="me"
      bottomAction={
        composerDisabled ? (
          <button
            type="button"
            disabled
            aria-describedby="composer-disabled-bottom-reason"
            className="hifi-action flex min-h-[52px] w-full cursor-not-allowed items-center justify-between rounded-pill border border-white/10 bg-ink-brown-800 px-3 py-2 text-left opacity-50"
          >
            <span className="text-[0.8125rem] font-semibold text-paper-100/80">
              Post unavailable
            </span>
            <span
              id="composer-disabled-bottom-reason"
              className="text-xs text-paper-100/60"
            >
              Moderation review active
            </span>
          </button>
        ) : (
          <FloatingQuickLog label="Post" href="/screens/91?state=proof-preview" />
        )
      }
      overlay={overlay}
    >
      <main
        className="space-y-4 px-4 pb-4 pt-3"
        data-h1-state={`91-${fixture}`}
        data-muted-posts={mutedPostIds.length}
        data-blocked-posts={blockedPostIds.length}
        data-hidden-posts={hiddenPostIds.length}
        data-local-post-preview={savedLocalPost ? "saved" : "none"}
        data-saved-comment-count={savedComments.length}
      >
        <H1TextScaleScope />
        <p className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/55">
          State: {fixture.replaceAll("-", " ")} · bundled local feed preview
        </p>
        {status && (
          <p
            role="status"
            className="rounded-xl border border-white/10 p-3 text-sm text-white/70"
          >
            {status}
          </p>
        )}
        {savedLocalPost && (
          <SolidCard data-saved-local-post="true">
            <div className="space-y-2 p-4">
              <p className="text-sm font-semibold text-white">
                You · {savedLocalPost.postType} · local preview
              </p>
              <p className="text-xs text-white/55">
                Audience: {savedLocalPost.audience} · {savedLocalPost.proof} ·
                session only · not published
              </p>
              <BtnGhost
                onClick={() => {
                  setSavedLocalPost(null);
                  setStatus("Saved local post preview deleted.");
                }}
              >
                Delete local preview
              </BtnGhost>
            </div>
          </SolidCard>
        )}
        {savedComments.length > 0 && (
          <SolidCard data-saved-comments="visible">
            <div className="space-y-3 p-4">
              <h2 className="font-semibold text-white">Local comments</h2>
              {savedComments.map((comment, index) => (
                <div
                  key={`${comment.postId}-${index}`}
                  className="rounded-xl border border-white/10 p-3"
                >
                  <p className="text-xs text-white/55">
                    On {comment.author}&apos;s post · session only
                  </p>
                  <p className="mt-1 text-sm text-white">{comment.body}</p>
                </div>
              ))}
            </div>
          </SolidCard>
        )}
        {(mutedPostIds.length > 0 ||
          blockedPostIds.length > 0 ||
          hiddenPostIds.length > 0) && (
          <SolidCard data-moderation-reversals="available">
            <div className="space-y-3 p-4">
              <h2 className="font-semibold text-white">
                Local moderation reversals
              </h2>
              {mutedPostIds.map((id) => (
                <BtnSecondary
                  key={`mute-${id}`}
                  className="w-full"
                  onClick={() => {
                    setMutedPostIds((ids) =>
                      ids.filter((currentId) => currentId !== id)
                    );
                    setStatus(
                      `${FEED_POSTS[id].author} post unmuted locally.`
                    );
                  }}
                >
                  Undo mute {FEED_POSTS[id].author}
                </BtnSecondary>
              ))}
              {blockedPostIds.map((id) => (
                <BtnSecondary
                  key={`block-${id}`}
                  className="w-full"
                  onClick={() => {
                    setBlockedPostIds((ids) =>
                      ids.filter((currentId) => currentId !== id)
                    );
                    setStatus(`${FEED_POSTS[id].author} unblocked locally.`);
                  }}
                >
                  Unblock {FEED_POSTS[id].author}
                </BtnSecondary>
              ))}
              {hiddenPostIds.map((id) => (
                <BtnSecondary
                  key={`hide-${id}`}
                  className="w-full"
                  onClick={() => {
                    setHiddenPostIds((ids) =>
                      ids.filter((currentId) => currentId !== id)
                    );
                    setStatus(
                      `Hidden-post preference for ${FEED_POSTS[id].author} undone locally.`
                    );
                  }}
                >
                  Undo hide {FEED_POSTS[id].author}
                </BtnSecondary>
              ))}
            </div>
          </SolidCard>
        )}
        {offline && (
          <OfflineBanner message="Offline · cached posts remain visible; actions queue locally." />
        )}
        {fixture === "cached-error" && (
          <SolidCard>
            <p role="alert" className="p-4 text-sm text-white/75">
              Live feed unavailable. Showing bundled cached posts; freshness is
              unavailable.
            </p>
          </SolidCard>
        )}
        {fixture === "skeleton" ? (
          <div className="space-y-3" aria-label="Loading feed">
            <SkeletonBlock className="h-32" />
            <SkeletonBlock className="h-56" />
            <SkeletonBlock className="h-56" />
          </div>
        ) : fixture === "empty" ? (
          <HonestNullState
            title={savedLocalPost ? "No bundled posts" : "No posts yet"}
            body={
              savedLocalPost
                ? "Your session-only post preview is shown above. No Community, Squad, or partner posts were inferred."
                : "Join a Community or create a private proof preview."
            }
          />
        ) : (
          <>
            <div
              role="tablist"
              aria-label="Feed filters"
              className="flex gap-2 overflow-x-auto"
            >
              {(["All", "My Squads", "Communities", "Partners"] as const).map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    role="tab"
                    aria-selected={filter === item}
                    aria-controls="feed-filter-panel"
                    className={`focus-ring min-h-11 shrink-0 rounded-full border px-4 text-sm ${
                      filter === item
                        ? "border-brand-orange/60 bg-brand-orange text-ink-900"
                        : "border-white/10 bg-white/[0.03] text-white/75"
                    }`}
                    onClick={() => {
                      setFilter(item);
                      setStatus(`${item} filter selected locally.`);
                    }}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
            <GlassCard>
              <h2 className="text-xl font-semibold leading-6 text-white">
                Share one <span className="text-emphasis">proof</span> update
              </h2>
              <p className="mt-2 text-sm text-white/55">
                Audience: {audience ?? "not selected"}. Review fields and
                consent before any local preview.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Discussion", "Question", "Win"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={selectedPostType === type}
                    className={`focus-ring min-h-11 rounded-full border px-4 text-sm ${
                      selectedPostType === type
                        ? "border-brand-orange/60 bg-brand-orange text-ink-900"
                        : "border-white/10 text-white/75"
                    }`}
                    onClick={() => {
                      setSelectedPostType(
                        type as "Discussion" | "Question" | "Win"
                      );
                      setStatus(`${type} post type selected locally.`)
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <BtnPrimary
                className="mt-3"
                disabled={composerDisabled}
                onClick={() => setPanel("composer")}
              >
                Review proof update
              </BtnPrimary>
              {composerDisabled && (
                <p className="mt-2 text-xs text-white/55">
                  Posting disabled while moderation review is active.
                </p>
              )}
            </GlassCard>
            <CIAInsightCard
              eyebrow="CIA local suggestion"
              provenance={[
                degradedFeed
                  ? "Bundled cached topic context"
                  : "Bundled topic match",
                degradedFeed
                  ? "Cached · confidence unavailable"
                  : low
                  ? "Low confidence"
                  : "Confirmed fixture",
              ]}
            >
              <p className="text-sm text-white/75">
                A run update may relate to your current Mission. No audience or
                publication is inferred.
              </p>
            </CIAInsightCard>
            <section
              id="feed-filter-panel"
              role="tabpanel"
              aria-label={`${filter} feed`}
              className="space-y-4"
            >
              {(filter === "All" || filter === "My Squads") &&
                !blockedPostIds.includes(AISHA_POST.id) &&
                !hiddenPostIds.includes(AISHA_POST.id) && (
                <FeedPost
                  author="Aisha Khan"
                  time={
                    degradedFeed
                      ? "Cached bundled post · freshness unavailable"
                      : "12m · bundled demo"
                  }
                  body="Finished tempo run with Amira."
                  proof={
                    proofSharingRevoked
                      ? "Proof sharing revoked"
                      : proofNull
                      ? "Source unavailable · no proof value inferred"
                      : mediaOff
                      ? "Proof withheld · consent off · no metric inferred"
                      : !proofAttached
                      ? "Proof removed"
                      : low
                      ? "5.2 mi · estimated · low confidence"
                      : degradedFeed
                      ? "5.2 mi · cached bundled proof · confirmation unavailable"
                      : "5.2 mi · bundled wearable demo"
                  }
                  counts={
                    kudosActive
                      ? `Kudos 25 · Comments ${aishaCommentCount} · Views 83 · bundled demo`
                      : `Kudos 24 · Comments ${aishaCommentCount} · Views 83 · bundled demo`
                  }
                  media={!mediaOff && proofVisible}
                  mediaOff={mediaOff && proofAttached && !proofSharingRevoked}
                  kudosActive={kudosActive}
                  moderationStatus={
                    mutedPostIds.includes(AISHA_POST.id)
                      ? "Muted locally · undo available below"
                      : undefined
                  }
                  onKudos={() => {
                    const next = !kudosActive;
                    setKudosActive(next);
                    setStatus(
                      next
                        ? offline
                          ? "Kudos queued locally while offline. Undo is available."
                          : "Kudos queued locally. Undo is available."
                        : "Kudos undone in the local preview."
                    );
                  }}
                  onComment={() => {
                    setSelectedPost(AISHA_POST);
                    setCommentDraft("");
                    setPanel("comment");
                  }}
                  onMore={() => {
                    setSelectedPost(AISHA_POST);
                    setPanel("moderation");
                  }}
                />
              )}
              {(filter === "All" || filter === "Communities") &&
                !blockedPostIds.includes(MALIK_POST.id) &&
                !hiddenPostIds.includes(MALIK_POST.id) && (
                <FeedPost
                  author="Malik R."
                  time={
                    degradedFeed
                      ? "Cached bundled post · freshness unavailable"
                      : "1h · cached demo"
                  }
                  body="Budget routine reached 14 days."
                  proof="Mission update · user entered"
                  counts={`Kudos ${
                    malikKudosActive ? 8 : 7
                  } · Comments ${malikCommentCount} · Views unavailable`}
                  moderationStatus={
                    mutedPostIds.includes(MALIK_POST.id)
                      ? "Muted locally · undo available below"
                      : undefined
                  }
                  kudosActive={malikKudosActive}
                  onKudos={() => {
                    const next = !malikKudosActive;
                    setMalikKudosActive(next);
                    setStatus(
                      next
                        ? "Kudos on Malik R.'s post queued locally. Undo is available on the post."
                        : "Kudos on Malik R.'s post undone locally."
                    );
                  }}
                  onComment={() => {
                    setSelectedPost(MALIK_POST);
                    setCommentDraft("");
                    setPanel("comment");
                  }}
                  onMore={() => {
                    setSelectedPost(MALIK_POST);
                    setPanel("moderation");
                  }}
                />
              )}
              {filter === "Partners" && (
                <HonestNullState
                  title="No partner posts"
                  body="No partner-authorized posts are available in this bundled preview."
                />
              )}
              {fixture === "own-delete-confirm" &&
                filter === "All" &&
                !ownPostDeleted && (
                <SolidCard>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-white">
                      You · Evening walk complete
                    </p>
                    <button
                      type="button"
                      className="focus-ring mt-3 min-h-11 rounded-full border border-white/10 px-4 text-sm text-white"
                      onClick={() => {
                        setSelectedPost(OWN_POST);
                        setPanel("delete");
                      }}
                    >
                      Delete your post
                    </button>
                  </div>
                </SolidCard>
              )}
            </section>
          </>
        )}
        {fixture === "media-consent-off" && (
          <HonestNullState
            title="Proof withheld"
            body="Proof and media consent are off. Only the audience-authorized text update remains; no metric is shown."
          />
        )}
        <button
          type="button"
          className="focus-ring min-h-11 rounded-full px-3 text-sm text-brand-orange"
          onClick={() => setPanel("data")}
        >
          Feed data controls
        </button>
      </main>
    </HifiShell>
  );
}

function FeedPost({
  author,
  time,
  body,
  proof,
  counts = "Kudos 24 · Comments 6 · Views 83 · bundled demo",
  media = false,
  mediaOff = false,
  kudosActive = false,
  moderationStatus,
  onKudos,
  onComment,
  onMore,
}: {
  author: string;
  time: string;
  body: string;
  proof: string;
  counts?: string;
  media?: boolean;
  mediaOff?: boolean;
  kudosActive?: boolean;
  moderationStatus?: string;
  onKudos: () => void;
  onComment: () => void;
  onMore: () => void;
}) {
  return (
    <SolidCard>
      <div className="flex items-center gap-3">
        <span
          role="img"
          aria-label={`${author} code-native initials`}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/[0.06] text-xs font-semibold text-white/70"
        >
          {author
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-white">{author}</h2>
          <p className="text-xs text-white/55">{time}</p>
        </div>
        <IconButton label={`More actions for ${author}`} onClick={onMore}>
          <MoreHorizontal size={18} />
        </IconButton>
      </div>
      <p className="mt-4 text-[0.9375rem] leading-5 text-white/80">{body}</p>
      <div className="mt-3">
        <Chip>{proof}</Chip>
      </div>
      {media && (
        <div
          role="img"
          aria-label="Code-native abstract running proof; privacy-safe, no person or route shown"
          data-asset-disposition="HIFI-91-01-code-native-abstract"
          className="mt-3 grid h-32 place-items-center rounded-xl border border-brand-orange/20 bg-brand-orange/[0.06]"
        >
          <div className="h-12 w-24 -skew-x-12 rounded-full border-2 border-brand-orange/50" />
        </div>
      )}
      {mediaOff && (
        <p className="mt-3 rounded-xl border border-white/10 p-3 text-sm text-white/55">
          Proof media hidden · consent off
        </p>
      )}
      <p className="mt-3 text-xs text-white/55">{counts}</p>
      {moderationStatus && (
        <p className="mt-2 rounded-xl border border-white/10 p-3 text-sm text-white/70">
          {moderationStatus}
        </p>
      )}
      <div className="mt-2 grid grid-cols-3 gap-2">
        <button
          type="button"
          aria-pressed={kudosActive}
          className={`focus-ring min-h-11 rounded-xl text-xs ${
            kudosActive ? "text-brand-orange" : "text-white/70"
          }`}
          onClick={onKudos}
        >
          <ThumbsUp className="mx-auto h-4 w-4" />
          {kudosActive ? "Undo kudos" : "Kudos"}
        </button>
        <button
          type="button"
          className="focus-ring min-h-11 rounded-xl text-xs text-white/70"
          onClick={onComment}
        >
          <MessageCircle className="mx-auto h-4 w-4" />
          Comment
        </button>
        <button
          type="button"
          className="focus-ring min-h-11 rounded-xl text-xs text-white/70"
          onClick={onMore}
        >
          <Flag className="mx-auto h-4 w-4" />
          Safety
        </button>
      </div>
      <p className="mt-2 flex items-center gap-2 text-xs text-white/55">
        <Shield className="h-3.5 w-3.5" />
        Audience and proof controls available before publication.
      </p>
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
