"use client";

import { useEffect, useState } from "react";
import { FileText, Plus, ShieldCheck, Sparkles } from "lucide-react";
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
  ProgressRing,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
} from "@/components/hifi/kit";
import { E1Modal } from "../intelligence/E1Modal";
import { H1TextScaleScope } from "./H1TextScaleScope";

const states = [
  "default-demo",
  "low-confidence",
  "honest-null",
  "skeleton",
  "error-source-cached",
  "offline",
  "report-preview",
  "privacy-review",
  "share-disabled-review",
  "share-success-local",
  "new-report-builder",
  "report-delete-confirm",
  "data-controls",
  "matrix-detail",
] as const;
type Fixture = (typeof states)[number];

export function S78ReportsCenter() {
  const [fixture, setFixture] = useState<Fixture>("default-demo");
  const [overlay, setOverlay] = useState<string | null>(
    fixture === "report-preview"
      ? "preview"
      : fixture === "privacy-review"
      ? "privacy"
      : fixture === "new-report-builder"
      ? "new"
      : fixture === "report-delete-confirm"
      ? "delete"
      : fixture === "data-controls"
      ? "data"
      : fixture === "matrix-detail"
      ? "matrix"
      : null
  );
  const [reviewed, setReviewed] = useState(fixture === "share-success-local");
  const [doctorDeleted, setDoctorDeleted] = useState(false);
  const [accessRevoked, setAccessRevoked] = useState(false);
  const [newDraftCreated, setNewDraftCreated] = useState(false);
  const [newDraftType, setNewDraftType] = useState<
    "Weekly life report" | "Doctor summary"
  >("Weekly life report");
  const [associationCorrected, setAssociationCorrected] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<"new" | "doctor" | null>(
    fixture === "report-delete-confirm" ? "doctor" : null
  );
  const [status, setStatus] = useState(
    fixture === "share-success-local"
      ? "Weekly life report export preview completed locally."
      : ""
  );
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("state") as Fixture;
    const next = states.includes(q) ? q : "default-demo";
    queueMicrotask(() => {
      setFixture(next);
      setOverlay(
        next === "report-preview"
          ? "preview"
          : next === "privacy-review"
          ? "privacy"
          : next === "new-report-builder"
          ? "new"
          : next === "report-delete-confirm"
          ? "delete"
          : next === "data-controls"
          ? "data"
          : next === "matrix-detail"
          ? "matrix"
          : null
      );
      setReviewed(next === "share-success-local");
      setDoctorDeleted(false);
      setAccessRevoked(false);
      setNewDraftCreated(false);
      setNewDraftType("Weekly life report");
      setAssociationCorrected(false);
      setDeleteTarget(next === "report-delete-confirm" ? "doctor" : null);
      setStatus(
        next === "share-success-local"
          ? "Weekly life report export preview completed locally."
          : ""
      );
    });
  }, []);
  const honestNull = fixture === "honest-null",
    empty = honestNull && !newDraftCreated,
    low = fixture === "low-confidence",
    offline = fixture === "offline";
  const sourceUnavailable = fixture === "error-source-cached" || offline;
  const exportDisabled =
    honestNull ||
    low ||
    sourceUnavailable ||
    accessRevoked ||
    fixture === "share-disabled-review";
  const exportDisabledReason = honestNull
    ? "Add source coverage before reviewing export from this local draft."
    : accessRevoked
    ? "Audience access is revoked. Select and review a new audience before another export preview."
    : low
    ? "Export preview stays disabled until source coverage and report readiness are confirmed."
    : fixture === "share-disabled-review"
    ? "Export preview stays disabled until scope and audience review is complete."
    : offline
    ? "Export preview stays disabled while this cached preview is offline."
    : fixture === "error-source-cached"
    ? "Export preview stays disabled until the missing demo source is available."
    : "";
  const recentReports = [
    ...(
    honestNull
      ? []
      : sourceUnavailable
      ? [
          {
            name: "Weekly life report",
            percent: null,
            coverage: "Cached preview",
            state: "Stale · low confidence",
          },
          {
            name: "Doctor summary",
            percent: null,
            coverage: "Cached draft",
            state: "Stale · low confidence",
          },
        ]
      : low
      ? [
          {
            name: "Weekly life report",
            percent: null,
            coverage: "Coverage incomplete",
            state: "Readiness pending",
          },
          {
            name: "Doctor summary",
            percent: null,
            coverage: "Coverage incomplete",
            state: "Status pending",
          },
        ]
      : [
          {
            name: "Weekly life report",
            percent: 86,
            coverage: "6 of 7 days",
            state: "Ready",
          },
          {
            name: "Doctor summary",
            percent: 43,
            coverage: "3 of 7 days",
            state: "Draft",
          },
        ]
    ).filter(({ name }) => name !== "Doctor summary" || !doctorDeleted),
    ...(newDraftCreated
      ? [
          {
            name: `${newDraftType} · new draft`,
            percent: null,
            coverage: "No days selected",
            state: "Draft created locally",
          },
        ]
      : []),
  ];
  const recentReadyCount = recentReports.filter(
    ({ state }) => state === "Ready"
  ).length;
  const recentDraftCount = recentReports.length - recentReadyCount;
  const localDraftCount = recentReports.filter(({ name }) =>
    name.endsWith(" · new draft")
  ).length;
  const sourcedReportCount = recentReports.length - localDraftCount;
  const recentReportMeta = sourceUnavailable
    ? `${sourcedReportCount} cached · stale · low confidence${
        localDraftCount
          ? ` · ${localDraftCount} local ${
              localDraftCount === 1 ? "draft" : "drafts"
            }`
          : ""
      }`
    : low
    ? `${sourcedReportCount} reports · readiness pending${
        localDraftCount
          ? ` · ${localDraftCount} local ${
              localDraftCount === 1 ? "draft" : "drafts"
            }`
          : ""
      }`
    : `${recentReadyCount} ready · ${recentDraftCount} ${
        recentDraftCount === 1 ? "draft" : "drafts"
      }`;
  const resolvedDeleteTarget =
    deleteTarget ??
    (newDraftCreated
      ? "new"
      : honestNull || doctorDeleted
      ? null
      : "doctor");
  const activeDeleteTarget = resolvedDeleteTarget === "new"
    ? `${newDraftType} local draft`
    : resolvedDeleteTarget === "doctor"
    ? "Doctor summary draft"
    : null;
  return (
    <HifiShell
      header={
        <TopBar
          title="Reports"
          back
          right={<ShieldCheck className="h-5 w-5 text-royal-purple" />}
        />
      }
      activeTab="me"
      atmosphere="cia"
      overlay={
        overlay && (
          <E1Modal
            label={`${overlay} report dialog`}
            onClose={() => {
              if (overlay === "delete") setDeleteTarget(null);
              setOverlay(null);
            }}
            className="!bg-ink-900 outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            <h2 className="text-xl text-white">
              {overlay === "preview"
                ? "Weekly life report preview"
                : overlay === "privacy"
                ? "Privacy and audience review"
                : overlay === "new"
                ? "Create report preview"
                : overlay === "delete"
                ? `Delete ${activeDeleteTarget ?? "report draft"}?`
                : overlay === "data"
                ? "Report data controls"
                : overlay === "guide"
                ? "Screenshot guide"
                : "Association detail"}
            </h2>
            {overlay === "preview" ? (
              <div className="mt-3 space-y-2 text-sm text-white/70">
                <p>
                  {sourceUnavailable
                    ? "Cached report preview · stale · low confidence · completion unavailable until the source refreshes."
                    : low
                    ? "Generated summary · bundled demo · completion and readiness unavailable while source coverage is incomplete."
                    : "Generated summary · bundled demo · 6 of 7 days · 86% complete."}
                </p>
                <p>
                  Included: sleep consistency and work adherence summaries.
                  Excluded: raw journal entries, private notes, and hidden
                  photos.
                </p>
                <div className="flex flex-wrap gap-2">
                  <BtnSecondary
                    disabled={exportDisabled}
                    aria-describedby={
                      exportDisabled
                        ? "report-preview-export-disabled-reason"
                        : undefined
                    }
                    onClick={() => setOverlay("privacy")}
                  >
                    Review and export
                  </BtnSecondary>
                  <BtnGhost
                    onClick={() => setOverlay("guide")}
                  >
                    Screenshot guide
                  </BtnGhost>
                </div>
                {exportDisabledReason && (
                  <p
                    id="report-preview-export-disabled-reason"
                    className="text-xs text-white/55"
                  >
                    {exportDisabledReason}
                  </p>
                )}
              </div>
            ) : overlay === "privacy" ? (
              <div className="mt-3 space-y-3">
                <p className="text-sm text-white/70">
                  Audience: Only me · destination: local preview only.
                </p>
                {["Raw journal entries", "Private notes", "Hidden photos"].map(
                  (x) => (
                    <label
                      key={x}
                      className="flex min-h-11 items-center gap-3 text-sm text-white"
                    >
                      <input type="checkbox" disabled className="h-5 w-5" />
                      {x} excluded by default
                    </label>
                  )
                )}
                <label className="flex min-h-11 items-center gap-3 text-sm text-white">
                  <input
                    type="checkbox"
                    checked={reviewed}
                    onChange={(e) => setReviewed(e.target.checked)}
                    className="h-5 w-5 accent-brand-orange"
                  />
                  I reviewed scope and audience
                </label>
                <BtnPrimary
                  disabled={!reviewed || exportDisabled}
                  onClick={() => {
                    setStatus(
                      "Weekly life report export preview completed locally."
                    );
                    setOverlay(null);
                  }}
                >
                  Export preview
                </BtnPrimary>
                {exportDisabledReason && (
                  <p className="text-xs text-white/55">
                    {exportDisabledReason}
                  </p>
                )}
              </div>
            ) : overlay === "guide" ? (
              <div className="mt-3 space-y-3 text-sm text-white/70">
                <p>
                  Balencia does not capture screenshots. To save a reference,
                  first review the included and excluded fields in this report.
                </p>
                <ol className="list-decimal space-y-2 pl-5">
                  <li>Close this guide and keep sensitive fields excluded.</li>
                  <li>Use your device&apos;s own screenshot controls.</li>
                  <li>Crop or delete the image in your device photo library.</li>
                </ol>
                <p className="text-xs text-white/55">
                  No screenshot, clipboard, file, or photo-library capability is
                  invoked by this preview.
                </p>
              </div>
            ) : overlay === "new" ? (
              <div className="mt-3 space-y-3">
                <label className="block text-sm text-white">
                  Report type
                  <select
                    value={newDraftType}
                    onChange={(event) =>
                      setNewDraftType(
                        event.target.value as
                          | "Weekly life report"
                          | "Doctor summary"
                      )
                    }
                    className="mt-1 h-12 w-full rounded-xl bg-white/10 px-3 text-base text-white"
                  >
                    <option>Weekly life report</option>
                    <option>Doctor summary</option>
                  </select>
                </label>
                <p className="text-xs text-white/55">
                  No medical validation or recipient is implied.
                </p>
                <BtnPrimary
                  disabled={newDraftCreated}
                  onClick={() => {
                    if (newDraftCreated) return;
                    setNewDraftCreated(true);
                    setStatus(
                      `${newDraftType} draft created locally and added to Recent reports.`
                    );
                    setOverlay(null);
                  }}
                >
                  Create draft
                </BtnPrimary>
              </div>
            ) : overlay === "delete" ? (
              <div className="mt-3 space-y-3">
                <p className="text-sm text-white/70">
                  Deletes only the {activeDeleteTarget ?? "selected local draft"}.
                  Underlying source data stays unchanged.
                </p>
                <div className="flex gap-2">
                  <BtnPrimary
                    onClick={() => {
                      if (resolvedDeleteTarget === "new") {
                        setNewDraftCreated(false);
                        setStatus(`${newDraftType} local draft deleted.`);
                      } else if (resolvedDeleteTarget === "doctor") {
                        setDoctorDeleted(true);
                        setStatus("Doctor summary draft deleted locally.");
                      }
                      setDeleteTarget(null);
                      setOverlay(null);
                    }}
                  >
                    Confirm delete
                  </BtnPrimary>
                  <BtnGhost
                    onClick={() => {
                      setDeleteTarget(null);
                      setOverlay(null);
                    }}
                  >
                    Cancel
                  </BtnGhost>
                </div>
              </div>
            ) : overlay === "data" ? (
              <div className="mt-3">
                <p className="text-sm text-white/70">
                  {honestNull
                    ? newDraftCreated
                      ? `${newDraftType} local draft · no source coverage · ${
                          accessRevoked ? "audience access revoked" : "Only me"
                        } · no export recipient · session-only retention.`
                      : "No report, source coverage, audience subject, or export recipient is available · session-only retention · nothing inferred."
                    : accessRevoked
                    ? "Generated report preview · bundled demo · audience access revoked · export scope off · session-only retention."
                    : sourceUnavailable
                    ? "Generated report preview · cached bundled demo · Only me · refresh unavailable · stale · low confidence · session-only retention."
                    : low
                    ? "Generated report preview · partial bundled demo · Only me · refresh pending · low confidence · session-only retention."
                    : "Generated report preview · bundled demo · Only me · refreshed Nov 18 · confirmed · session-only retention."}
                </p>
                <ConsentRail controls={FULL_DATA_CONTROLS} />
                <div className="mt-3 flex gap-2">
                  <BtnSecondary
                    onClick={() => {
                      const nextRevoked = !accessRevoked;
                      setAccessRevoked(nextRevoked);
                      setReviewed(false);
                      setStatus(
                        nextRevoked
                          ? "Audience access revoked locally. Export scope is now off."
                          : "Only me preview access restored locally. Review scope before export."
                      );
                    }}
                  >
                    {accessRevoked
                      ? "Restore Only me preview access"
                      : "Revoke access"}
                  </BtnSecondary>
                  <BtnGhost
                    disabled={!activeDeleteTarget}
                    onClick={() => {
                      setDeleteTarget(newDraftCreated ? "new" : "doctor");
                      setOverlay("delete");
                    }}
                  >
                    {activeDeleteTarget
                      ? `Delete ${activeDeleteTarget}`
                      : "No draft to delete"}
                  </BtnGhost>
                </div>
              </div>
            ) : (
              <div className="mt-3 space-y-2 text-sm text-white/70">
                <p>
                  {sourceUnavailable
                    ? "A cached, stale preview suggests sleep consistency and work adherence moved together in 4 of 7 demo days."
                    : "Sleep consistency and work adherence moved together in 4 of 7 demo days."}
                </p>
                <p>
                  Window: Nov 12–18 · sample 7 ·{" "}
                  {sourceUnavailable
                    ? "cached Nov 18 · stale · low confidence"
                    : "refreshed Nov 18 · low confidence"}
                  {" · association, not causation."}
                </p>
                <button
                  className="min-h-11 text-brand-orange"
                  onClick={() => {
                    setAssociationCorrected(true);
                    setStatus(
                      "Association marked not useful and hidden locally. Restore remains available."
                    );
                    setOverlay(null);
                  }}
                >
                  Mark as not useful
                </button>
              </div>
            )}
            <BtnGhost
              className="mt-3"
              onClick={() => {
                if (overlay === "delete") setDeleteTarget(null);
                setOverlay(null);
              }}
            >
              Close
            </BtnGhost>
          </E1Modal>
        )
      }
    >
      <main
        data-h1-state={`78-${fixture}`}
        data-source-quality={
          honestNull
            ? "no-source-coverage"
            : sourceUnavailable
            ? "cached-stale-low-confidence"
            : low
            ? "low-confidence"
            : "current-demo"
        }
        data-report-count={recentReports.length}
        data-doctor-summary={
          honestNull ? "absent" : doctorDeleted ? "deleted" : "present"
        }
        data-audience-access={
          honestNull && !newDraftCreated
            ? "none"
            : accessRevoked
            ? "revoked"
            : "available"
        }
        data-new-report-draft={newDraftCreated ? "created" : "none"}
        data-association-signal={associationCorrected ? "hidden" : "visible"}
        className="hide-scrollbar space-y-5 px-4 pb-8 pt-3"
      >
        <H1TextScaleScope />
        {associationCorrected && (
          <SolidCard data-association-correction="recorded" className="p-4">
            <p className="text-sm text-white/75">
              Sleep/work association hidden locally because you marked it not
              useful. No source data changed.
            </p>
            <BtnSecondary
              className="mt-3"
              onClick={() => {
                setAssociationCorrected(false);
                setStatus("Sleep/work association restored locally.");
              }}
            >
              Restore association
            </BtnSecondary>
          </SolidCard>
        )}
        {fixture === "skeleton" ? (
          <div
            className="space-y-3 animate-pulse motion-reduce:animate-none"
            aria-label="Loading reports"
          >
            <div className="h-28 rounded-[28px] bg-white/10" />
            <div className="h-32 rounded-[28px] bg-white/10" />
            <div className="h-32 rounded-[28px] bg-white/10" />
          </div>
        ) : (
          <>
            {(fixture === "error-source-cached" || offline) && (
              <SolidCard className="p-4">
                <p className="font-medium text-white">
                  {offline
                    ? "Offline — cached report previews only"
                    : "Fitness demo source unavailable"}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Cached, stale, low-confidence report and metric previews
                  remain. Export preview is disabled.
                </p>
                <BtnSecondary
                  className="mt-3"
                  onClick={() => setStatus("Source retry simulated locally.")}
                >
                  Retry source
                </BtnSecondary>
              </SolidCard>
            )}
            <section>
              <p className="text-xs uppercase tracking-wider text-white/55">
                Report builder
              </p>
              <h1 className="mt-2 text-[1.625rem] font-semibold text-white">
                Build reports <span className="text-emphasis">CIA</span> helps
                you understand.
              </h1>
              <p className="mt-2 text-sm text-white/60">
                Review bundled demo data, then choose what a local export
                preview would include.
              </p>
              <div className="mt-3 flex gap-2">
                <Chip tone="cia">
                  <Sparkles size={13} />
                  {honestNull
                    ? "CIA unavailable"
                    : sourceUnavailable
                    ? "CIA cached summary"
                    : "CIA summary"}
                </Chip>
                <Chip>Private by default</Chip>
              </div>
            </section>
            {empty ? (
              <GlassCard tone="muted">
                <FileText className="text-brand-orange" />
                <h2 className="mt-3 text-xl text-white">
                  Create your first report
                </h2>
                <p className="mt-2 text-sm text-white/60">
                  No reports, weekly metrics, or CIA comparisons yet.
                </p>
                <BtnPrimary className="mt-4" onClick={() => setOverlay("new")}>
                  <Plus size={16} />
                  Create report
                </BtnPrimary>
              </GlassCard>
            ) : (
              <>
                <section>
                  <SectionTitle
                    title="Recent reports"
                    meta={recentReportMeta}
                  />
                  <div className="mt-2 space-y-2">
                    {recentReports.map(
                      ({ name, percent, coverage, state }) => (
                        <button
                          key={name}
                          aria-label={
                            name === "Weekly life report"
                              ? "Preview Weekly life report"
                              : name.endsWith(" · new draft")
                              ? `Select ${name}`
                              : low || sourceUnavailable
                              ? "Review Doctor summary draft status"
                              : "Delete Doctor summary draft"
                          }
                          className="flex min-h-24 w-full items-center gap-3 rounded-[24px] border border-white/10 bg-white/5 p-4 text-left"
                          onClick={() => {
                            if (name === "Weekly life report") {
                              setOverlay("preview");
                            } else if (name.endsWith(" · new draft")) {
                              setStatus(
                                `${name.replace(
                                  " · new draft",
                                  ""
                                )} draft selected locally; no export or recipient exists.`
                              );
                            } else if (low) {
                              setStatus(
                                "Doctor summary status remains pending until source coverage improves."
                              );
                            } else if (sourceUnavailable) {
                              setStatus(
                                "Doctor summary is a cached, stale, low-confidence preview."
                              );
                            } else {
                              setDeleteTarget("doctor");
                              setOverlay("delete");
                            }
                          }}
                        >
                          <FileText className="text-brand-orange" />
                          <span className="flex-1">
                            <span className="block text-sm font-medium text-white">
                              {name}
                            </span>
                            <span className="text-xs text-white/50">
                              {coverage} · {state} ·{" "}
                              {name.endsWith(" · new draft")
                                ? "local session draft"
                                : "bundled demo"}
                            </span>
                          </span>
                          {percent === null ? (
                            <span className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border border-white/10 text-lg text-white/55">
                              <span aria-hidden="true">—</span>
                              <span className="sr-only">
                                Completion unavailable
                              </span>
                            </span>
                          ) : (
                            <ProgressRing
                              percent={percent}
                              value={`${percent}%`}
                              size={54}
                              tone="you"
                            />
                          )}
                        </button>
                      )
                    )}
                  </div>
                </section>
                {!honestNull && (
                  <>
                    <section>
                      <SectionTitle
                        title="This week"
                    meta={
                      sourceUnavailable
                        ? "Cached · stale · low confidence"
                        : "Nov 12–18 · demo"
                    }
                      />
                      <div className="grid grid-cols-2 gap-2">
                    <SolidCard className="p-3">
                      <p className="text-xs text-white/50">Sleep consistency</p>
                      <p className="mt-1 text-2xl tabular-nums text-white">
                        {low ? "—" : "82%"}
                      </p>
                      <Provenance
                        items={
                          sourceUnavailable
                            ? ["Cached demo", "Stale · low confidence"]
                            : low
                            ? ["Missing days", "Low confidence"]
                            : ["Bundled demo", "Confirmed"]
                        }
                      />
                    </SolidCard>
                    <SolidCard className="p-3">
                      <p className="text-xs text-white/50">Work adherence</p>
                      <p className="mt-1 text-2xl tabular-nums text-white">
                        {low ? "—" : "64%"}
                      </p>
                      <Provenance
                        items={
                          sourceUnavailable
                            ? ["Cached demo", "Stale · low confidence"]
                            : low
                            ? ["Partial demo", "Low confidence"]
                            : ["User-entered demo", "Fresh Nov 18"]
                        }
                      />
                    </SolidCard>
                      </div>
                    </section>
                    {!low && !associationCorrected && (
                      <CIAInsightCard
                    eyebrow="CIA demo synthesis"
                    provenance={
                      sourceUnavailable
                        ? ["Cached 7-day demo", "Stale", "Low confidence"]
                        : ["7-day demo", "Low confidence"]
                    }
                    actions={
                      <button
                        className="min-h-11 text-sm text-brand-orange"
                        onClick={() => setOverlay("matrix")}
                      >
                        Explore association
                      </button>
                    }
                  >
                    <p className="text-sm text-white/75">
                      {sourceUnavailable
                        ? "A cached, stale pattern suggests sleep and work adherence may have moved together. Confidence is low; this is not a fresh result."
                        : "Sleep and work adherence may have moved together this week. This is an association, not causation."}
                    </p>
                      </CIAInsightCard>
                    )}
                  </>
                )}
              </>
            )}
            {!empty && (
              <div>
                <div className="flex flex-wrap gap-2">
                  <BtnPrimary
                    disabled={exportDisabled}
                    aria-describedby={
                      exportDisabled ? "report-export-disabled-reason" : undefined
                    }
                    onClick={() => setOverlay("privacy")}
                  >
                    Review export
                  </BtnPrimary>
                  <BtnGhost
                    onClick={() => setOverlay("guide")}
                  >
                    Screenshot guide
                  </BtnGhost>
                  <BtnSecondary
                    disabled={newDraftCreated}
                    aria-describedby={
                      newDraftCreated
                        ? "report-new-draft-disabled-reason"
                        : undefined
                    }
                    onClick={() => setOverlay("new")}
                  >
                    {newDraftCreated ? "Local draft created" : "New report"}
                  </BtnSecondary>
                  <BtnGhost onClick={() => setOverlay("data")}>
                    Data controls
                  </BtnGhost>
                </div>
                {exportDisabledReason && (
                  <p
                    id="report-export-disabled-reason"
                    className="mt-2 text-xs text-white/55"
                  >
                    {exportDisabledReason}
                  </p>
                )}
                {newDraftCreated && (
                  <p
                    id="report-new-draft-disabled-reason"
                    className="mt-2 text-xs text-white/55"
                  >
                    Delete the current local draft before creating another in
                    this visual preview.
                  </p>
                )}
              </div>
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
