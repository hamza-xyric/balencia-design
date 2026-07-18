"use client";

import { useEffect, useState } from "react";
import {
  Check,
  FileText,
  Lock,
  MoreHorizontal,
  ShieldCheck,
} from "lucide-react";
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  Chip,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassCard,
  HifiShell,
  IconButton,
  ProgressBar,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
} from "@/components/hifi/kit";
import { E1Modal } from "../intelligence/E1Modal";
import { H1TextScaleScope } from "./H1TextScaleScope";

const states = [
  "default-active",
  "low-confidence-stale",
  "honest-null",
  "skeleton",
  "error-proof-cached",
  "offline",
  "check-detail",
  "terms-history",
  "sign-disabled-no-change",
  "sign-review",
  "sign-success",
  "pause-confirm",
  "paused",
  "resume-confirm",
  "cancel-confirm",
  "sharing-controls",
  "witness-disabled",
  "eligible-delete-confirm",
] as const;
type Fixture = (typeof states)[number];

const OPAQUE_MODAL_CLASS =
  "!bg-ink-900 border border-white/15 shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand-orange";

export function S82AccountabilityContract() {
  const [fixture, setFixture] = useState<Fixture>("default-active");
  const [overlay, setOverlay] = useState<string | null>(
    fixture === "check-detail"
      ? "check"
      : fixture === "terms-history"
      ? "terms"
      : fixture === "sign-review"
      ? "sign"
      : fixture === "pause-confirm"
      ? "pause"
      : fixture === "resume-confirm"
      ? "resume"
      : fixture === "cancel-confirm"
      ? "cancel"
      : fixture === "sharing-controls"
      ? "sharing"
      : fixture === "witness-disabled"
      ? "witness"
      : fixture === "eligible-delete-confirm"
      ? "delete"
      : null
  );
  const [status, setStatus] = useState(
    fixture === "sign-success"
      ? "Update signed locally by Amira · Jun 1, 9:30."
      : ""
  );
  const [paused, setPaused] = useState(
    fixture === "paused" || fixture === "resume-confirm"
  );
  const [cancelled, setCancelled] = useState(
    fixture === "eligible-delete-confirm"
  );
  const [signed, setSigned] = useState(fixture === "sign-success");
  const [proofSharingRevoked, setProofSharingRevoked] = useState(false);
  const [recordDeleted, setRecordDeleted] = useState(false);
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("state") as Fixture;
    const next = states.includes(q) ? q : "default-active";
    queueMicrotask(() => {
      setFixture(next);
      setOverlay(
        next === "check-detail"
          ? "check"
          : next === "terms-history"
          ? "terms"
          : next === "sign-review"
          ? "sign"
          : next === "pause-confirm"
          ? "pause"
          : next === "resume-confirm"
          ? "resume"
          : next === "cancel-confirm"
          ? "cancel"
          : next === "sharing-controls"
          ? "sharing"
          : next === "witness-disabled"
          ? "witness"
          : next === "eligible-delete-confirm"
          ? "delete"
          : null
      );
      setStatus(
        next === "sign-success"
          ? "Update signed locally by Amira · Jun 1, 9:30."
          : ""
      );
      setPaused(next === "paused" || next === "resume-confirm");
      setCancelled(next === "eligible-delete-confirm");
      setSigned(next === "sign-success");
      setProofSharingRevoked(false);
      setRecordDeleted(false);
    });
  }, []);
  const empty = fixture === "honest-null",
    low = fixture === "low-confidence-stale",
    offline = fixture === "offline";
  const proofUnavailable = fixture === "error-proof-cached";
  const sourceLocked = proofUnavailable || offline;
  const sharingDisabled = sourceLocked || cancelled || proofSharingRevoked;
  const canSign = fixture === "sign-review" && !signed && !paused && !cancelled;
  const signDisabledReason = signed
    ? "This local update is already signed; no pending change remains."
    : cancelled
    ? "Cancelled contracts cannot be updated."
    : proofUnavailable
    ? "Signing is disabled while proof data is unavailable."
    : offline
    ? "Signing is disabled while this cached preview is offline."
    : paused
    ? "Resume the contract before signing an update."
    : "No changed terms to sign.";
  const sharingDisabledReason = cancelled
    ? "Proof sharing cannot change after this contract is cancelled."
    : proofSharingRevoked
    ? "Proof-status sharing is revoked in this local preview."
    : offline
    ? "Proof sharing changes are disabled while this cached preview is offline."
    : "Proof sharing changes are disabled until proof data is available.";
  const close = (message: string) => {
    setStatus(message);
    setOverlay(null);
  };
  return (
    <HifiShell
      header={
        <TopBar
          title="Accountability contract"
          back
          right={
            <IconButton
              label="Terms and history"
              disabled={empty || recordDeleted}
              title={
                recordDeleted
                  ? "The local contract record was deleted"
                  : empty
                  ? "No contract terms yet"
                  : undefined
              }
              className={empty || recordDeleted ? "text-white/30" : undefined}
              onClick={() => setOverlay("terms")}
            >
              <MoreHorizontal size={18} />
            </IconButton>
          }
        />
      }
      showTabBar={false}
      atmosphere="you"
      bottomAction={
        !empty && !recordDeleted && !overlay && (
          <div className="space-y-1">
            <BtnPrimary
              className="w-full"
              disabled={!canSign}
              aria-describedby={!canSign ? "contract-sign-disabled-reason" : undefined}
              onClick={() => setOverlay("sign")}
            >
              Sign update
            </BtnPrimary>
            {!canSign && (
              <p
                id="contract-sign-disabled-reason"
                className="text-center text-xs text-white/55"
              >
                {signDisabledReason}
              </p>
            )}
          </div>
        )
      }
      overlay={
        overlay && (
          <E1Modal
            label={`${overlay} contract dialog`}
            onClose={() => setOverlay(null)}
            className={OPAQUE_MODAL_CLASS}
          >
            <h2 className="text-xl text-white">
              {overlay === "check"
                ? "Morning run proof"
                : overlay === "weekly"
                ? "Weekly review detail"
                : overlay === "terms"
                ? "Terms and history"
                : overlay === "sign"
                ? "Review contract update"
                : overlay === "pause"
                ? "Pause this contract?"
                : overlay === "resume"
                ? "Resume this contract?"
                : overlay === "cancel"
                ? "Cancel this active contract?"
                : overlay === "sharing"
                ? "Proof sharing controls"
                : overlay === "witness"
                ? "Witness verification"
                : "Delete cancelled contract record?"}
            </h2>
            {overlay === "check" ? (
              <div className="mt-3 space-y-2 text-sm text-white/70">
                <p>
                  {sourceLocked || low
                    ? "Cached proof status: previously complete · local photo metadata fixture · not revalidated."
                    : "Proof status: complete · local photo metadata fixture · Jun 1."}
                </p>
                <p>
                  {proofSharingRevoked
                    ? "Historical completion is preserved for you. Current proof fields are no longer shared with Aisha."
                    : sourceLocked || low
                    ? "The last cached sharing state was status-only. No current visibility or transmission is claimed."
                    : "Aisha sees completion status only. No image/file is shown or transmitted. Private journal remains excluded."}
                </p>
              </div>
            ) : overlay === "weekly" ? (
              <div className="mt-3 space-y-2 text-sm text-white/70">
                <p>
                  Weekly review · Monday evening · status-only proof check for
                  the Run a half marathon Mission.
                </p>
                <p>
                  {cancelled
                    ? "Contract closed · this review is not due and remains historical only."
                    : paused
                    ? "Contract paused · this review is not due until the contract resumes."
                    : "Due next Monday · completion is not inferred before the review."}
                </p>
                <p>
                  Aisha can see completion status only while sharing is active;
                  no journal, image, file, or notification is included.
                </p>
              </div>
            ) : overlay === "terms" ? (
              <div className="mt-3 space-y-2 text-sm text-white/70">
                <p>Start May 5 · end Jun 30 · owner: Amira.</p>
                <p>
                  Mission: Run a half marathon · weekly proof status · no
                  financial stake.
                </p>
                <p>
                  Signed locally by Amira on May 5. Aisha separately accepted
                  the accountability-partner role.
                </p>
              </div>
            ) : overlay === "sign" ? (
              <div className="mt-3 space-y-3 text-sm text-white/70">
                <p>
                  Changed term: weekly review moves to Monday. Proof remains
                  status-only. Aisha visibility unchanged. No stake or automatic
                  notification.
                </p>
                <p>Effective after owner signature and partner acceptance.</p>
                <div className="flex gap-2">
                  <BtnPrimary
                    onClick={() => {
                      setSigned(true);
                      close(
                        "Update signed locally by Amira · Jun 1, 9:30. Partner acceptance remains pending."
                      );
                    }}
                  >
                    Sign locally
                  </BtnPrimary>
                  <BtnGhost onClick={() => setOverlay(null)}>Cancel</BtnGhost>
                </div>
              </div>
            ) : overlay === "pause" ? (
              <div className="mt-3 space-y-3">
                <p className="text-sm text-white/70">
                  Proof checks stop in this preview. History remains. Pause does
                  not delete or notify Aisha.
                </p>
                <div className="flex gap-2">
                  <BtnPrimary
                    onClick={() => {
                      setPaused(true);
                      close("Contract paused locally.");
                    }}
                  >
                    Confirm pause
                  </BtnPrimary>
                  <BtnGhost onClick={() => setOverlay(null)}>
                    Keep active
                  </BtnGhost>
                </div>
              </div>
            ) : overlay === "resume" ? (
              <div className="mt-3 space-y-3">
                <p className="text-sm text-white/70">
                  Proof checks resume from today. No contact notification
                  occurs.
                </p>
                <BtnPrimary
                  onClick={() => {
                    setPaused(false);
                    close("Contract resumed locally.");
                  }}
                >
                  Resume locally
                </BtnPrimary>
              </div>
            ) : overlay === "cancel" ? (
              <div className="mt-3 space-y-3">
                <p className="text-sm text-white/70">
                  Cancellation closes the active contract and preserves
                  proof/violation history. It does not delete the record or
                  notify anyone.
                </p>
                <div className="flex gap-2">
                  <BtnPrimary
                    onClick={() => {
                      setCancelled(true);
                      setPaused(true);
                      close(
                        "Contract cancelled locally. Record is now eligible for separate delete confirmation."
                      );
                    }}
                  >
                    Confirm cancel
                  </BtnPrimary>
                  <BtnGhost onClick={() => setOverlay(null)}>
                    Keep contract
                  </BtnGhost>
                </div>
              </div>
            ) : overlay === "sharing" ? (
              <div className="mt-3 space-y-3">
                <p className="text-sm text-white/70">
                  Aisha sees proof status only. Raw photo/file and private
                  journal are excluded.
                </p>
                <ConsentRail controls={FULL_DATA_CONTROLS} />
                <BtnSecondary
                  onClick={() => {
                    setProofSharingRevoked(true);
                    setPaused(true);
                    close(
                      "Proof-status sharing revoked locally. Contract remains active but verification is paused."
                    );
                  }}
                >
                  Revoke proof sharing
                </BtnSecondary>
              </div>
            ) : overlay === "witness" ? (
              <div className="mt-3 space-y-2">
                <p className="text-sm text-white/70">
                  Witness verification is unavailable in this preview. No
                  witness is invited and no verdict is claimed.
                </p>
                <p className="text-xs text-white/50">
                  Aisha is an accountability partner, not a witness or
                  co-signer.
                </p>
              </div>
            ) : (
              <div className="mt-3 space-y-3">
                <p className="text-sm text-white/70">
                  This contract is cancelled and eligible for deletion. Deleting
                  removes only the local contract record; preserved source
                  Mission data stays unchanged.
                </p>
                <div className="flex gap-2">
                  <BtnPrimary
                    onClick={() => {
                      setRecordDeleted(true);
                      close("Cancelled contract record deleted locally.");
                    }}
                  >
                    Confirm delete
                  </BtnPrimary>
                  <BtnGhost onClick={() => setOverlay(null)}>Cancel</BtnGhost>
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
        data-h1-state={`82-${fixture}`}
        data-contract-lifecycle={
          recordDeleted
            ? "deleted"
            : cancelled
            ? "cancelled"
            : paused
            ? "paused"
            : "active"
        }
        data-proof-sharing={
          cancelled || proofSharingRevoked ? "off" : "status-only"
        }
        className="space-y-4 px-4 pb-8 pt-3"
      >
        <H1TextScaleScope />
        {fixture === "skeleton" ? (
          <div
            className="space-y-3 animate-pulse motion-reduce:animate-none"
            aria-label="Loading accountability contract"
          >
            <div className="h-44 rounded-[28px] bg-white/10" />
            <div className="h-32 rounded-[28px] bg-white/10" />
            <div className="h-36 rounded-[28px] bg-white/10" />
          </div>
        ) : (
          <>
            {(fixture === "error-proof-cached" || offline) && (
              <SolidCard className="p-4">
                <p className="font-medium text-white">
                  {offline
                    ? "Offline — cached contract preview"
                    : "Proof fixture unavailable"}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Safe cached terms remain. Signing and sharing changes are
                  disabled.
                </p>
              </SolidCard>
            )}
            {fixture === "sign-disabled-no-change" && (
              <SolidCard className="p-4">
                <p className="font-medium text-white">
                  No contract changes to sign
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Edit a term, proof requirement, or visibility choice before
                  signing an update.
                </p>
              </SolidCard>
            )}
            {recordDeleted ? (
              <GlassCard tone="muted">
                <FileText className="text-white/55" />
                <h2 className="mt-3 text-xl text-white">
                  Contract record deleted
                </h2>
                <p className="mt-2 text-sm text-white/60">
                  The cancelled local contract record and its shared-field
                  preview are no longer shown. The source Mission remains
                  unchanged.
                </p>
              </GlassCard>
            ) : empty ? (
              <GlassCard tone="muted">
                <FileText className="text-brand-orange" />
                <h2 className="mt-3 text-xl text-white">No active contract</h2>
                <p className="mt-2 text-sm text-white/60">
                  Create a private draft, review proof visibility, and invite a
                  partner only with consent.
                </p>
                <BtnPrimary
                  className="mt-4"
                  onClick={() =>
                    setStatus(
                      "Contract draft flow is unavailable in this visual preview. Nothing was created."
                    )
                  }
                >
                  Review draft availability
                </BtnPrimary>
              </GlassCard>
            ) : (
              <>
                <GlassCard tone="you">
                  <div className="flex justify-between">
                    <p className="text-xs uppercase tracking-wider text-brand-orange">
                      {cancelled ? "Cancelled" : paused ? "Paused" : "Active"}{" "}
                      contract
                    </p>
                    <ShieldCheck className="text-brand-orange" />
                  </div>
                  <h2 className="mt-3 text-xl text-white">
                    Half marathon consistency
                  </h2>
                  <p className="mt-1 text-sm text-white/55">
                    {cancelled
                      ? "Mission: Run a half marathon · contract cancelled locally Jun 1"
                      : "Mission: Run a half marathon · May 5–Jun 30 · 4 weeks left"}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip tone="you">Owner signed · Amira · May 5</Chip>
                    <Chip>1 accountability partner</Chip>
                  </div>
                  <Provenance
                    items={
                      cancelled
                        ? [
                            "Bundled local demo",
                            "Cancelled Jun 1",
                            "Confirmed lifecycle",
                          ]
                        : low
                        ? ["Cached May 28", "Low confidence"]
                        : sourceLocked
                        ? [
                            "Cached Jun 1",
                            offline ? "Offline · not revalidated" : "Proof unavailable",
                          ]
                        : [
                            "Bundled local demo",
                            "Fresh Jun 1",
                            "Confirmed fixture",
                          ]
                    }
                  />
                </GlassCard>
                <section>
                  <SectionTitle
                    title="Verification checks"
                    meta={
                      cancelled
                        ? "Historical 5 of 6 · contract closed"
                      : proofUnavailable
                        ? "Status unavailable"
                        : paused
                        ? "5 completed · pending check paused"
                        : sourceLocked || low
                        ? "Cached 5 of 6 · not revalidated"
                        : "5 of 6 · 83%"
                    }
                  />
                  {cancelled ? (
                    <p className="text-sm text-white/55">
                      Historical record: 5 of 6 checks were completed before
                      cancellation. No pending check or current verdict remains.
                    </p>
                  ) : proofUnavailable ? (
                    <p className="text-sm text-white/55">
                      Proof completion could not be refreshed. No completion
                      count or verdict is inferred.
                    </p>
                  ) : (
                    <ProgressBar value={83} tone="you" />
                  )}
                  <div className="mt-3 space-y-2">
                    <button
                      disabled={proofUnavailable}
                      className="flex min-h-14 w-full items-center gap-3 rounded-[20px] bg-ink-brown-800 p-3 text-left disabled:opacity-55"
                      onClick={() => setOverlay("check")}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-green/15 text-forest-green">
                        <Check size={16} />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm text-white">
                          Morning run proof
                        </span>
                        <span className="text-xs text-white/50">
                          {cancelled
                            ? "Historical completion · preserved after cancellation"
                            : proofUnavailable
                            ? "Proof detail unavailable · cached terms only"
                            : paused
                            ? "Historical completion · preserved while paused"
                            : sourceLocked || low
                            ? "Cached completion · not revalidated"
                            : "Status-only confirmation · local metadata"}
                        </span>
                      </span>
                      {proofUnavailable ? (
                        <Chip>Unavailable</Chip>
                      ) : (
                        <Chip tone="done">Done</Chip>
                      )}
                    </button>
                    <button
                      className="flex min-h-14 w-full items-center gap-3 rounded-[20px] bg-ink-brown-800 p-3 text-left"
                      onClick={() => setOverlay("weekly")}
                    >
                      <span className="h-3 w-3 rounded-full bg-brand-orange" />
                      <span className="flex-1">
                        <span className="block text-sm text-white">
                          Weekly review
                        </span>
                        <span className="text-xs text-white/50">
                          {cancelled
                            ? "Contract closed · not due"
                            : paused
                            ? "Paused · not due"
                            : "Due Monday evening"}
                        </span>
                      </span>
                      <Chip tone={paused || cancelled ? "muted" : "you"}>
                        {cancelled ? "Closed" : paused ? "Paused" : "Due"}
                      </Chip>
                    </button>
                  </div>
                </section>
                <SolidCard className="p-4">
                  <div className="flex gap-3">
                    <Lock className="text-royal-purple" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        Accountability partner
                      </p>
                      <p className="mt-1 text-sm text-white/60">
                        {cancelled
                          ? "Contract closed. Aisha no longer sees current proof fields; historical partner acceptance remains in the owner-only record."
                          : proofSharingRevoked
                          ? "Proof-status sharing is revoked. Aisha no longer sees current proof fields; private journal and image/file content remain excluded."
                          : "Aisha sees proof status only. Private journal and image/file content stay off."}
                      </p>
                      <p className="mt-2 text-xs text-white/55">
                        {cancelled
                          ? "Historical acceptance preserved · current sharing off"
                          : proofSharingRevoked
                          ? "Historical partner acceptance preserved · current sharing off"
                          : "Partner acceptance · separate from owner signature"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <BtnSecondary
                      disabled={sharingDisabled}
                      aria-describedby={
                        sharingDisabled
                          ? "contract-sharing-disabled-reason"
                          : undefined
                      }
                      onClick={() => setOverlay("sharing")}
                    >
                      Sharing controls
                    </BtnSecondary>
                    <BtnGhost onClick={() => setOverlay("witness")}>
                      Witness status
                    </BtnGhost>
                  </div>
                  {sharingDisabled && (
                    <p
                      id="contract-sharing-disabled-reason"
                      className="mt-2 text-xs text-white/50"
                    >
                      {sharingDisabledReason}
                    </p>
                  )}
                </SolidCard>
                <section className="grid gap-2">
                  {cancelled ? (
                    <>
                      <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-white/60">
                        Cancelled locally · history preserved · this record is
                        eligible for a separate delete confirmation.
                      </p>
                      <BtnGhost onClick={() => setOverlay("delete")}>
                        Delete cancelled record
                      </BtnGhost>
                    </>
                  ) : (
                    <>
                      <BtnSecondary
                        onClick={() =>
                          paused ? setOverlay("resume") : setOverlay("pause")
                        }
                      >
                        {paused ? "Resume contract" : "Pause contract"}
                      </BtnSecondary>
                      <BtnSecondary onClick={() => setOverlay("cancel")}>
                        Cancel contract
                      </BtnSecondary>
                      <button
                        disabled
                        className="min-h-11 rounded-full text-sm text-white/35"
                        title="Active and paused contracts cannot be deleted. Cancel first."
                      >
                        Delete unavailable · cancel first
                      </button>
                    </>
                  )}
                </section>
              </>
            )}
            {!empty && !recordDeleted && (
              <section>
                <SectionTitle title="Contract data controls" />
                <p className="text-xs text-white/55">
                  {cancelled
                    ? "Category: contract · source: local demo · scope: owner and partner status history · freshness: cancelled Jun 1 · confidence: confirmed lifecycle · session retention."
                    : proofSharingRevoked
                    ? "Category: contract · source: local demo · scope: owner only; partner proof fields suppressed · freshness: revoked this session · confidence: local action · session retention."
                    : sourceLocked
                    ? "Category: contract · source: cached local terms · scope: owner and Aisha status-only · freshness: last cached Jun 1 · confidence: proof unavailable · session retention."
                    : low
                    ? "Category: contract · source: cached local demo · scope: owner and Aisha status-only · freshness: cached May 28 · confidence: low · session retention."
                    : "Category: contract · source: local demo · scope: owner and Aisha status-only · freshness: Jun 1 · confidence: confirmed fixture · session retention."}
                </p>
                {sourceLocked ? (
                  <div
                    className="mt-3"
                    role="group"
                    aria-label="Unavailable contract data controls"
                  >
                    <Provenance items={[...FULL_DATA_CONTROLS]} />
                    <p className="mt-2 text-xs text-white/50">
                      Controls are listed for transparency; no sharing or data
                      change is available in this state.
                    </p>
                  </div>
                ) : (
                  <ConsentRail controls={FULL_DATA_CONTROLS} />
                )}
              </section>
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
