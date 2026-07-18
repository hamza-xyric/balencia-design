"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Circle } from "lucide-react";
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  Chip,
  GlassCard,
  HifiShell,
  Provenance,
  SectionTitle,
} from "@/components/hifi/kit";
import { E1Modal } from "../intelligence/E1Modal";
import { H1TextScaleScope } from "./H1TextScaleScope";

const states = [
  "default-neutral",
  "reason-selected",
  "other-description",
  "block-on",
  "missing-context",
  "skeleton-context",
  "offline-preview",
  "duplicate-report",
  "submission-error",
  "submit-confirm",
  "success-pending",
  "cancel-confirm",
  "report-status",
] as const;
type Fixture = (typeof states)[number];
const reasonSelectedStates = new Set<Fixture>([
  "reason-selected",
  "duplicate-report",
  "submission-error",
  "submit-confirm",
  "success-pending",
  "cancel-confirm",
  "report-status",
]);
const seededReason = (fixture: Fixture) =>
  fixture === "other-description"
    ? "Other"
    : reasonSelectedStates.has(fixture)
    ? "Harassment"
    : "";
const reasons = [
  "Spam",
  "Harassment",
  "Inappropriate content",
  "Misinformation",
  "Impersonation",
  "Other",
];
const FOCUSABLE =
  'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

type ReportContext = {
  kind: "community-message" | "competition";
  subject: string;
  initials: string;
  detail: string;
  category: "message" | "competition";
  source: "Community preview" | "Competitions preview";
  scope: "one message" | "selected competition";
};

const communityContext: ReportContext = {
  kind: "community-message",
  subject: "Deleted user",
  initials: "DU",
  detail: "Message excerpt hidden by default",
  category: "message",
  source: "Community preview",
  scope: "one message",
};

function competitionInitials(subject: string) {
  return subject
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("") || "CP";
}

function parseReportContext(params: URLSearchParams): ReportContext {
  const rawContext = params.get("context")?.trim() ?? "";
  const isCompetition =
    rawContext === "competition" || rawContext.startsWith("competition-");
  if (!isCompetition) return communityContext;

  const requestedSubject = params.get("subject")?.trim().slice(0, 80);
  const subject =
    requestedSubject ||
    (rawContext === "competition-step-12"
      ? "Step Challenge #12"
      : "Selected competition");
  return {
    kind: "competition",
    subject,
    initials: competitionInitials(subject),
    detail: "Competition context selected in Competitions",
    category: "competition",
    source: "Competitions preview",
    scope: "selected competition",
  };
}

export function S64ReportBlock() {
  const reportSheetRef = useRef<HTMLElement>(null);
  const reportHeadingRef = useRef<HTMLHeadingElement>(null);
  const [fixture, setFixture] = useState<Fixture>("default-neutral");
  const [reportContext, setReportContext] =
    useState<ReportContext>(communityContext);
  const [reason, setReason] = useState(seededReason(fixture));
  const [description, setDescription] = useState(
    fixture === "other-description"
      ? "This message includes repeated targeted insults."
      : ""
  );
  const [block, setBlock] = useState(fixture === "block-on");
  const [submitted, setSubmitted] = useState(
    fixture === "success-pending" ||
      fixture === "report-status" ||
      fixture === "duplicate-report"
  );
  const [overlay, setOverlay] = useState<string | null>(
    fixture === "submit-confirm"
      ? "submit"
      : fixture === "cancel-confirm"
      ? "cancel"
      : null
  );
  const [status, setStatus] = useState(
    fixture === "success-pending"
      ? "Report submitted locally · Pending review."
      : fixture === "duplicate-report"
      ? "You've already reported this."
      : fixture === "submission-error"
      ? "Couldn't submit. Check your connection and try again."
      : ""
  );
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("state") as Fixture;
    const next = states.includes(q) ? q : "default-neutral";
    queueMicrotask(() => {
      const nextContext = parseReportContext(params);
      setFixture(next);
      setReportContext(nextContext);
      setReason(seededReason(next));
      setDescription(
        next === "other-description"
          ? nextContext.kind === "competition"
            ? "This competition preview includes repeated targeted insults."
            : "This message includes repeated targeted insults."
          : ""
      );
      setBlock(next === "block-on");
      setSubmitted(
        next === "success-pending" ||
          next === "report-status" ||
          next === "duplicate-report"
      );
      setOverlay(
        next === "submit-confirm"
          ? "submit"
          : next === "cancel-confirm"
          ? "cancel"
          : null
      );
      setStatus(
        next === "success-pending"
          ? "Report submitted locally · Pending review."
          : next === "duplicate-report"
          ? "You've already reported this."
          : next === "submission-error"
          ? "Couldn't submit. Check your connection and try again."
          : ""
      );
    });
  }, []);
  const missing = fixture === "missing-context";
  const offline = fixture === "offline-preview";
  const otherMissing = reason === "Other" && !description.trim();
  const secondaryActionLabel =
    reportContext.kind === "competition"
      ? "Also mute this competition"
      : "Also block this user";
  const secondaryActionPastTense =
    reportContext.kind === "competition"
      ? `${reportContext.subject} mute preference recorded locally; this source preview remains visible.`
      : `${reportContext.subject} block preference recorded locally; this source preview remains visible.`;
  const secondaryActionUndoLabel =
    reportContext.kind === "competition"
      ? `Unmute ${reportContext.subject}`
      : `Unblock ${reportContext.subject}`;
  const secondaryActionUndone =
    reportContext.kind === "competition"
      ? `${reportContext.subject} unmuted locally. The report remains pending.`
      : `${reportContext.subject} unblocked locally. The report remains pending.`;

  useEffect(() => {
    const sheet = reportSheetRef.current;
    if (!sheet) return;
    const frame = requestAnimationFrame(() => reportHeadingRef.current?.focus());
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (missing) {
          setStatus(
            "The unavailable source route was not opened. Close this standalone preview manually."
          );
        } else if (submitted) {
          setStatus("Submitted report remains pending review.");
        } else {
          setOverlay("cancel");
        }
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = [
        ...sheet.querySelectorAll<HTMLElement>(FOCUSABLE),
      ].filter((node) => node.offsetParent !== null);
      if (!focusables.length) {
        event.preventDefault();
        reportHeadingRef.current?.focus();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (document.activeElement === reportHeadingRef.current) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    sheet.addEventListener("keydown", handleKey);
    return () => {
      cancelAnimationFrame(frame);
      sheet.removeEventListener("keydown", handleKey);
    };
  }, [missing, submitted]);
  return (
    <HifiShell
      atmosphere="cia"
      showTabBar={false}
      overlay={
        overlay && (
          <E1Modal
            label={overlay === "submit" ? "Confirm report" : "Cancel report"}
            onClose={() => setOverlay(null)}
            className="!bg-ink-900 outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            <h2 className="text-xl text-white">
              {overlay === "submit" ? "Submit report?" : "Discard this report?"}
            </h2>
            {overlay === "submit" ? (
              <div className="mt-3 space-y-2 text-sm text-white/70">
                <p>
                  {reportContext.category === "message"
                    ? `Message from ${reportContext.subject}`
                    : reportContext.subject}
                  {" · reason: "}
                  {reason}.
                </p>
                <p>
                  {block
                    ? reportContext.kind === "competition"
                      ? "Muting is also selected. This prototype records the local preference while leaving the source competition visible here."
                      : "Blocking is also selected. This prototype records the local preference while leaving the source context visible here."
                    : reportContext.kind === "competition"
                    ? "Muting is OFF. Reporting will not mute the competition."
                    : "Blocking is OFF. Reporting will not block the user."}
                </p>
                <p>
                  In the intended product, a submitted report would be limited
                  to you and authorized moderation reviewers. This prototype
                  sends nothing and causes no punishment.
                </p>
                <div className="flex gap-2 pt-2">
                  <BtnPrimary
                    onClick={() => {
                      setSubmitted(true);
                      setStatus(
                        `${
                          offline
                            ? "Report queued locally while offline · it will send after reconnect in the intended product; this prototype made no network request."
                            : "Report submitted locally · Pending review."
                        }${
                          block ? ` ${secondaryActionPastTense}` : ""
                        }`
                      );
                      setOverlay(null);
                    }}
                  >
                    Confirm report
                  </BtnPrimary>
                  <BtnGhost onClick={() => setOverlay(null)}>Cancel</BtnGhost>
                </div>
              </div>
            ) : (
              <div className="mt-3 space-y-3">
                <p className="text-sm text-white/70">
                  Your session-only draft will be cleared. No submitted report
                  is affected.
                </p>
                <div className="flex gap-2">
                  <BtnPrimary
                    onClick={() => {
                      setReason("");
                      setDescription("");
                      setStatus("Report draft discarded locally.");
                      setOverlay(null);
                    }}
                  >
                    Discard draft
                  </BtnPrimary>
                  <BtnGhost onClick={() => setOverlay(null)}>
                    Keep editing
                  </BtnGhost>
                </div>
              </div>
            )}
          </E1Modal>
        )
      }
    >
      <div
        data-h1-state={`64-${fixture}`}
        data-report-context={missing ? "missing" : reportContext.kind}
        data-report-subject={missing ? "none" : reportContext.subject}
        data-submitted={submitted ? "true" : "false"}
        data-report-delivery={
          missing
            ? "none"
            : submitted
            ? offline
              ? "queued-offline"
              : "pending-local"
            : "draft"
        }
        className="relative h-full min-h-0 w-full overflow-hidden bg-ink-900"
      >
        <H1TextScaleScope />
        <div
          className="absolute inset-0 p-6 pt-20 opacity-25"
          aria-hidden="true"
        >
          <GlassCard tone="muted">
            <p className="text-sm text-white">
              {reportContext.kind === "competition"
                ? "Competition context"
                : "Community message context"}
            </p>
            <p className="mt-2 text-sm text-white/60">
              {reportContext.kind === "competition"
                ? `${reportContext.subject} was selected for review.`
                : "A message you chose to review appears here."}
            </p>
          </GlassCard>
        </div>
        <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
        <section
          ref={reportSheetRef}
          role="dialog"
          aria-modal={overlay ? undefined : "true"}
          aria-hidden={overlay ? "true" : undefined}
          inert={overlay ? true : undefined}
          aria-labelledby="report-sheet-title"
          className="absolute inset-x-0 bottom-0 z-10 flex max-h-[92%] flex-col rounded-t-[28px] border-t border-white/10 bg-ink-900"
        >
          <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-white/20" />
          <header className="flex items-center border-b border-white/10 px-5 py-2">
            <div className="flex flex-1 justify-start">
              <button
                type="button"
                className="focus-ring min-h-11 rounded-xl px-2 text-left text-sm text-white/60"
                onClick={() => {
                  if (missing) {
                    setStatus(
                      "The unavailable source route was not opened. Close this standalone preview manually."
                    );
                  } else if (submitted) {
                    setStatus("Submitted report remains pending review.");
                  } else {
                    setOverlay("cancel");
                  }
                }}
              >
                Cancel
              </button>
            </div>
            <h1
              ref={reportHeadingRef}
              id="report-sheet-title"
              tabIndex={-1}
              className="text-base font-semibold text-white outline-none"
            >
              Report
            </h1>
            <span className="flex-1" />
          </header>
          <main className="hide-scrollbar flex-1 space-y-4 overflow-y-auto px-5 py-4">
            {fixture === "skeleton-context" ? (
              <div className="space-y-3 animate-pulse motion-reduce:animate-none">
                <div className="h-24 rounded-[24px] bg-white/10" />
                <div className="h-64 rounded-[24px] bg-white/10" />
              </div>
            ) : missing ? (
              <GlassCard tone="muted">
                <AlertTriangle className="text-brand-orange" />
                <h2 className="mt-3 text-lg text-white">
                  Couldn’t load report
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  The source route is unavailable in this standalone review.
                  Close this preview manually and try again; no user or content
                  was guessed.
                </p>
                <button
                  type="button"
                  className="focus-ring mt-3 min-h-11 min-w-11 rounded-xl px-2 text-sm text-brand-orange"
                  onClick={() =>
                    setStatus(
                      "Source return is unavailable in this standalone review. Nothing changed."
                    )
                  }
                >
                  Acknowledge
                </button>
              </GlassCard>
            ) : (
              <>
                {fixture === "reason-selected" && (
                  <p
                    role="status"
                    className="rounded-xl border border-white/10 p-3 text-sm text-white/70"
                  >
                    Reason selected: {reason} · review before submitting.
                  </p>
                )}
                {fixture === "block-on" && (
                  <p
                    role="status"
                    className="rounded-xl border border-brand-orange/20 bg-brand-orange/10 p-3 text-sm text-white/75"
                  >
                    {reportContext.kind === "competition"
                      ? "Mute option ON · muting remains separate from reporting."
                      : "Block option ON · blocking remains separate from reporting."}
                  </p>
                )}
                {fixture === "submission-error" && !submitted && (
                  <p
                    role="alert"
                    className="rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300"
                  >
                    {status} Your selected reason is preserved for a local retry.
                  </p>
                )}
                {offline && (
                  <p
                    role="status"
                    className="rounded-xl bg-brand-orange/10 p-3 text-sm text-brand-orange"
                  >
                    You&apos;re offline — your report will send when you&apos;re back
                    online in the intended product. This prototype queues only a
                    local session fixture and makes no network request.
                  </p>
                )}
                {(submitted || fixture === "duplicate-report") && (
                  <GlassCard
                    tone={fixture === "duplicate-report" ? "muted" : "done"}
                  >
                    <CheckCircle2 className="text-forest-green" />
                    <h2 className="mt-2 text-lg text-white">
                      {fixture === "duplicate-report"
                        ? "Already reported"
                        : offline
                        ? "Queued offline"
                        : "Pending review"}
                    </h2>
                    <p className="mt-1 text-sm text-white/60">
                      {fixture === "duplicate-report"
                        ? "You've already reported this. No duplicate was created."
                        : offline
                        ? "Queued in this local session preview. No reviewer can see it until a real product reconnects and submits it; this prototype sends nothing."
                        : "This prototype stores the pending state only in your local preview; nothing was sent to a moderation reviewer and no outcome or punishment is promised."}
                    </p>
                    {submitted && block && (
                      <BtnSecondary
                        className="mt-3"
                        onClick={() => {
                          setBlock(false);
                          setStatus(secondaryActionUndone);
                        }}
                      >
                        {secondaryActionUndoLabel}
                      </BtnSecondary>
                    )}
                  </GlassCard>
                )}
                <GlassCard tone="muted">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-xs text-white/60">
                      {reportContext.initials}
                    </div>
                    <div>
                      <p className="text-sm text-white">
                        {reportContext.subject}
                      </p>
                      <p className="text-xs text-white/50">
                        {reportContext.detail}
                      </p>
                      <Provenance
                        items={[
                          `Category: ${reportContext.category}`,
                          `Source: ${reportContext.source}`,
                          `Scope: ${reportContext.scope}`,
                        ]}
                      />
                    </div>
                  </div>
                </GlassCard>
                <section>
                  <SectionTitle title="Why are you reporting this?" />
                  <div
                    role="radiogroup"
                    aria-label="Report reason"
                    className="mt-2 rounded-2xl border border-white/10"
                  >
                    {reasons.map((r) => (
                      <button
                        key={r}
                        role="radio"
                        aria-checked={reason === r}
                        disabled={submitted}
                        className="focus-ring relative flex min-h-11 w-full items-center justify-between rounded-xl border-b border-white/5 px-4 text-left text-sm text-white outline-none focus-visible:z-10 focus-visible:bg-brand-orange/10 last:border-0"
                        onClick={() => setReason(r)}
                      >
                        {r}
                        <Circle
                          className={`h-5 w-5 ${
                            reason === r
                              ? "fill-brand-orange text-brand-orange"
                              : "text-white/25"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </section>
                <label className="block text-sm text-white/70">
                  Tell us more{" "}
                  {reason === "Other" ? "(required for Other)" : "(optional)"}
                  <textarea
                    value={description}
                    maxLength={500}
                    required={reason === "Other"}
                    disabled={submitted}
                    aria-invalid={otherMissing || undefined}
                    aria-describedby="report-description-requirement"
                    onChange={(e) => setDescription(e.target.value)}
                    className="focus-ring mt-1 min-h-24 w-full rounded-[20px] border border-white/10 bg-white/5 p-3 text-base text-white outline-none"
                  />
                  <span className="mt-1 block text-right text-xs tabular-nums text-white/55">
                    {description.length}/500
                  </span>
                  <span
                    id="report-description-requirement"
                    role={otherMissing ? "alert" : undefined}
                    className={`mt-1 block text-xs ${
                      otherMissing ? "text-red-400" : "text-white/50"
                    }`}
                  >
                    {reason === "Other"
                      ? "A description is required only because Other is selected."
                      : "A description is optional for this reason and required only for Other."}
                  </span>
                </label>
                <label className="flex min-h-16 items-center gap-3 rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <input
                    type="checkbox"
                    role="switch"
                    checked={block}
                    disabled={submitted}
                    onChange={(e) => setBlock(e.target.checked)}
                    className="focus-ring h-5 w-5 rounded accent-brand-orange"
                  />
                  <span>
                    <span className="block text-sm font-medium text-white">
                      {secondaryActionLabel}
                    </span>
                    <span className="text-xs text-white/50">
                      {reportContext.kind === "competition"
                        ? "Separate local preference · source preview remains visible here · unmute remains available."
                        : "Separate local preference · source context remains visible here · unblock remains available."}
                    </span>
                  </span>
                </label>
                <div
                  role="group"
                  aria-label="Report data lifecycle"
                  className="flex flex-wrap gap-2"
                >
                  <Chip>Category: moderation</Chip>
                  <Chip>Source: user report</Chip>
                  <Chip>Scope: {reportContext.scope}</Chip>
                  <Chip>Freshness: this session</Chip>
                  <Chip>Confidence: user selected</Chip>
                  <Chip>Retention: policy-controlled</Chip>
                  <Chip>Export: unavailable</Chip>
                  <Chip>Revoke: unavailable after submit</Chip>
                  <Chip>Delete draft: before submit</Chip>
                </div>
              </>
            )}
            <p
              aria-live="polite"
              className={`min-h-5 text-sm ${
                fixture === "submission-error" && !submitted
                  ? "text-red-400"
                  : "text-forest-green"
              }`}
            >
              {status}
            </p>
          </main>
          {!missing && (
            <footer className="border-t border-white/10 p-4">
              <BtnPrimary
                className="w-full"
                disabled={
                  !reason ||
                  otherMissing ||
                  fixture === "duplicate-report" ||
                  fixture === "success-pending" ||
                  fixture === "report-status" ||
                  submitted
                }
                onClick={() => setOverlay("submit")}
              >
                {submitted ? "Pending review" : "Submit report"}
              </BtnPrimary>
            </footer>
          )}
        </section>
      </div>
    </HifiShell>
  );
}
