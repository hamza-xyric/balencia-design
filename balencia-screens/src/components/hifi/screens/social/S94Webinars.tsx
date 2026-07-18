"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  PlayCircle,
  Search,
  Share2,
  Video,
} from "lucide-react";
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  CIAInsightCard,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassCard,
  HifiShell,
  IconButton,
  ProgressBar,
  SolidCard,
  TopBar,
} from "@/components/hifi/kit";
import { E1Modal } from "../intelligence/E1Modal";
import { H1TextScaleScope } from "./H1TextScaleScope";

const STATES = [
  "upcoming-default",
  "registered",
  "recordings",
  "schedule-low-confidence",
  "schedule-honest-null",
  "skeleton",
  "empty-upcoming",
  "registration-error",
  "offline-cached",
  "register-review",
  "register-success",
  "sold-out-disabled",
  "calendar-preview",
  "recording-unpublished",
  "watch-progress",
  "public-share-preview",
  "data-controls",
  "media-honest-null",
] as const;
type Fixture = (typeof STATES)[number];
type Tab = "Upcoming" | "Registered" | "Recordings";
type Panel = "register" | "calendar" | "share" | "watch" | "data" | null;
type ShareTarget = { title: string; url: string };

const STRESS_RESET_SHARE: ShareTarget = {
  title: "Stress reset workshop",
  url: "https://balencia.example/webinars/stress-reset-workshop",
};

const OPAQUE_MODAL_CLASS =
  "!bg-ink-900 border border-white/15 shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand-orange";

function initialPanel(fixture: Fixture): Panel {
  if (fixture === "register-review") return "register";
  if (fixture === "calendar-preview") return "calendar";
  if (fixture === "public-share-preview") return "share";
  if (fixture === "watch-progress") return "watch";
  if (fixture === "data-controls") return "data";
  return null;
}

function initialTab(fixture: Fixture): Tab {
  if (fixture === "registered" || fixture === "register-success")
    return "Registered";
  if (fixture === "recordings") return "Recordings";
  return "Upcoming";
}

export function S94Webinars() {
  const [fixture, setFixture] = useState<Fixture>("upcoming-default");
  const [tab, setTab] = useState<Tab>(initialTab(fixture));
  const [panel, setPanel] = useState<Panel>(() => initialPanel(fixture));
  const [registered, setRegistered] = useState(
    fixture === "registered" || fixture === "register-success"
  );
  const [shareTarget, setShareTarget] =
    useState<ShareTarget>(STRESS_RESET_SHARE);
  const [calendarSummarySaved, setCalendarSummarySaved] = useState(false);
  const [status, setStatus] = useState(
    fixture === "register-success"
      ? "Registration confirmed in this local preview."
      : fixture === "registration-error"
      ? "Registration preview failed. Session details remain available."
      : ""
  );
  useEffect(() => {
    const value = new URLSearchParams(location.search).get("state");
    const next = STATES.includes(value as Fixture)
      ? (value as Fixture)
      : "upcoming-default";
    queueMicrotask(() => {
      setFixture(next);
      setTab(initialTab(next));
      setPanel(initialPanel(next));
      setRegistered(next === "registered" || next === "register-success");
      setShareTarget(STRESS_RESET_SHARE);
      setCalendarSummarySaved(false);
      setStatus(
        next === "register-success"
          ? "Registration confirmed in this local preview."
          : next === "registration-error"
          ? "Registration preview failed. Session details remain available."
          : ""
      );
    });
  }, []);

  const offline = fixture === "offline-cached";
  const scheduleNull = fixture === "schedule-honest-null";
  const low = fixture === "schedule-low-confidence";
  const soldOut = fixture === "sold-out-disabled";
  const unpublished = fixture === "recording-unpublished";
  const mediaNull = fixture === "media-honest-null";
  const scheduleUnavailable = scheduleNull || low || offline;

  const overlay = panel ? (
    <E1Modal
      label={
        panel === "register"
          ? "Registration review"
          : panel === "calendar"
          ? "Calendar preview"
          : panel === "share"
          ? "Public webinar link preview"
          : panel === "watch"
          ? "Recording preview"
          : "Webinar data controls"
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
      {panel === "register" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Review registration
          </h2>
          <p className="text-sm text-white/65">
            Live reset for sleep · Nov 14, 2026 · 7:00 PM EST · bundled demo.
            No payment, calendar, or external registration is started.
          </p>
          <div className="flex gap-2">
            <BtnSecondary onClick={() => setPanel(null)}>Cancel</BtnSecondary>
            <BtnPrimary
              disabled={scheduleUnavailable || soldOut}
              onClick={() => {
                setRegistered(true);
                setTab("Registered");
                setFixture("register-success");
                setStatus("Registration confirmed in this local preview.");
                setPanel(null);
              }}
            >
              Confirm local preview
            </BtnPrimary>
          </div>
          {(scheduleUnavailable || soldOut) && (
            <p className="text-xs text-white/55">
              {low
                ? "Registration is unavailable while the event schedule is pending confirmation."
                : scheduleNull
                ? "Registration is unavailable until a date is announced."
                : offline
                ? "Registration is unavailable while this cached preview is offline."
                : "Registration is unavailable because this event is sold out."}
            </p>
          )}
        </div>
      )}
      {panel === "calendar" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Calendar preview</h2>
          <p className="text-sm text-white/65">
            Live reset for sleep · Nov 14, 2026 · 7:00 PM EST · public webinar
            URL only. No calendar or file capability is invoked.
          </p>
          <BtnPrimary
            disabled={scheduleUnavailable}
            onClick={() => {
              setCalendarSummarySaved(true);
              setStatus(
                "Live reset for sleep calendar summary saved to the local preview shown below."
              );
              setPanel(null);
            }}
          >
            Save local summary
          </BtnPrimary>
          {scheduleUnavailable && (
            <p className="text-xs text-white/55">
              {low
                ? "Calendar actions are unavailable while the event time is pending confirmation."
                : scheduleNull
                ? "Calendar actions are unavailable until a date is announced."
                : "Calendar actions are unavailable while this cached preview is offline."}
            </p>
          )}
        </div>
      )}
      {panel === "share" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Public link · {shareTarget.title}
          </h2>
          <p className="break-all text-sm text-white/65">
            {shareTarget.url}
          </p>
          <p className="text-sm text-white/55">
            Excludes Missions, health data, registration, and watch progress. No
            clipboard or native share is used.
          </p>
          <BtnSecondary
            onClick={() => {
              setStatus("Public-link preview closed. Nothing was shared.");
              setPanel(null);
            }}
          >
            Done
          </BtnSecondary>
        </div>
      )}
      {panel === "watch" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Recording preview
          </h2>
          <p className="text-sm text-white/65">
            Stress reset workshop · 38% watched · bundled Balencia library demo.
          </p>
          <ProgressBar value={38} tone="you" />
          <BtnPrimary
            onClick={() => {
              setStatus("Recording preview paused locally at 38%.");
              setPanel(null);
            }}
          >
            Pause preview
          </BtnPrimary>
        </div>
      )}
      {panel === "data" && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            Webinar data controls
          </h2>
          <p className="text-sm text-white/65">
            {offline
              ? "Category learning media · bundled cached webinar demo · this screen only · freshness and live confirmation unavailable · session retention."
              : low
              ? "Category learning media · bundled webinar demo · this screen only · schedule pending confirmation · low confidence · session retention."
              : scheduleNull
              ? "Category learning media · bundled webinar demo · this screen only · schedule unavailable · session retention."
              : "Category learning media · bundled webinar demo · this screen only · refreshed Apr 12, 2026 · confidence inline · session retention."}
          </p>
          <ConsentRail controls={FULL_DATA_CONTROLS} />
          <BtnSecondary
            onClick={() => {
              setStatus(
                "Webinar correction flow is unavailable in this visual preview. Nothing changed."
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
          title="Webinars"
          right={
            <IconButton
              label="Search webinars"
              onClick={() =>
                setStatus(
                  "Webinar search is unavailable in this visual preview. Nothing changed."
                )
              }
            >
              <Search className="h-5 w-5" />
            </IconButton>
          }
        />
      }
      activeTab="me"
      overlay={overlay}
    >
      <main
        className="space-y-5 px-4 pb-4 pt-3"
        data-h1-state={`94-${fixture}`}
        data-calendar-summary={calendarSummarySaved ? "saved" : "none"}
      >
        <H1TextScaleScope />
        <p className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/55">
          State: {fixture.replaceAll("-", " ")} · bundled webinar preview
        </p>
        {status && (
          <p
            role="status"
            className="rounded-xl border border-white/10 p-3 text-sm text-white/70"
          >
            {status}
          </p>
        )}
        {calendarSummarySaved && (
          <SolidCard data-saved-calendar-summary="true">
            <div className="space-y-2 p-4">
              <p className="font-semibold text-white">Live reset for sleep</p>
              <p className="text-sm text-white/55">
                Nov 14, 2026 · 7:00 PM EST · public webinar URL only · local
                session summary · no calendar event or file created
              </p>
              <BtnGhost
                onClick={() => {
                  setCalendarSummarySaved(false);
                  setStatus("Local webinar calendar summary deleted.");
                }}
              >
                Delete local summary
              </BtnGhost>
            </div>
          </SolidCard>
        )}
        {offline && (
          <OfflineBanner message="Offline · cached schedule from Apr 12, 2026 remains visible." />
        )}
        {fixture === "registration-error" && (
          <p
            role="alert"
            className="rounded-xl border border-white/10 p-3 text-sm text-white/70"
          >
            Registration preview failed. Retry locally when ready.
          </p>
        )}
        {fixture === "skeleton" ? (
          <div className="space-y-3" aria-label="Loading webinars">
            <SkeletonBlock className="h-72" />
            <SkeletonBlock className="h-48" />
          </div>
        ) : fixture === "empty-upcoming" ? (
          <>
            <WebinarTabs tab={tab} onChange={setTab} />
            {tab === "Upcoming" ? (
              <section
                id="webinar-upcoming-panel"
                role="tabpanel"
                aria-label="Upcoming webinars"
              >
                <HonestNullState
                  title="No upcoming webinars"
                  body="Recordings and registration history remain available in their tabs."
                />
              </section>
            ) : (
              <section
                id={`webinar-${tab.toLowerCase()}-panel`}
                role="tabpanel"
                aria-label={`${tab} webinars`}
                className="space-y-3"
              >
                {tab === "Registered" ? (
                  <SolidCard>
                    <div className="p-4">
                      <p className="font-semibold text-white">
                        Live reset for sleep
                      </p>
                      <p className="mt-1 text-sm text-white/55">
                        Registration history · bundled demo
                      </p>
                    </div>
                  </SolidCard>
                ) : (
                  <RecordingCard
                    mediaNull={mediaNull}
                    watchDisabled={offline}
                    watchDisabledReason="Watch preview is disabled while offline. Cached progress remains read-only."
                    onWatch={() => setPanel("watch")}
                    onShare={() => {
                      setShareTarget(STRESS_RESET_SHARE);
                      setPanel("share");
                    }}
                  />
                )}
              </section>
            )}
          </>
        ) : (
          <>
            <p className="text-[0.9375rem] leading-snug text-white/70">
              Join expert <span className="text-emphasis">sessions</span>{" "}
              through local, privacy-safe previews.
            </p>
            <GlassCard tone="you">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-brand-orange motion-safe:animate-pulse" />
                <span className="text-overline-mini uppercase tracking-[0.2em] text-brand-orange">
                  Bundled event
                </span>
                <span className="ml-auto text-xs text-white/55">
                  {offline
                    ? "Cached snapshot · freshness unavailable"
                    : low
                    ? "Schedule confirmation pending"
                    : scheduleNull
                    ? "Schedule unavailable"
                    : "Refreshed Apr 12, 2026"}
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Live reset for sleep
              </h2>
              <p className="mt-2 text-sm text-white/60">
                {scheduleNull
                  ? "Date not announced"
                  : low
                  ? "Nov 14, 2026 · 7:00 PM EST · pending confirmation"
                  : offline
                  ? "Cached schedule · live confirmation unavailable"
                  : "Nov 14, 2026 · 7:00 PM EST · confirmed fixture"}
              </p>
              <p className="mt-1 text-sm text-white/55">
                Speaker Dr. Anya Rana · host Balencia Wellbeing
              </p>
              <div className="mt-4 grid gap-2 border-t border-white/5 pt-3">
                <BtnPrimary
                  className="whitespace-nowrap"
                  disabled={
                    soldOut || scheduleUnavailable || registered
                  }
                  onClick={() => setPanel("register")}
                >
                  {soldOut
                    ? "Sold out"
                    : registered
                    ? "Registered locally"
                    : scheduleNull
                    ? "Date unavailable"
                    : low
                    ? "Schedule pending"
                    : offline
                    ? "Offline · unavailable"
                    : "Review registration"}
                </BtnPrimary>
                <BtnSecondary
                  className="whitespace-nowrap"
                  disabled={scheduleUnavailable}
                  onClick={() => setPanel("calendar")}
                >
                  <Calendar className="h-4 w-4" /> Calendar preview
                </BtnSecondary>
              </div>
              {(soldOut || scheduleUnavailable || registered) && (
                <p className="mt-2 text-xs text-white/55">
                  {soldOut
                    ? "Registration unavailable because this fixture is sold out."
                    : scheduleNull
                    ? "Calendar unavailable until a date is announced."
                    : low
                    ? "Registration and calendar actions are disabled while the event schedule is pending confirmation."
                    : offline
                    ? "Registration and calendar previews are disabled offline."
                    : "Registration is already confirmed in this local preview."}
                </p>
              )}
            </GlassCard>
            <WebinarTabs tab={tab} onChange={setTab} />
            <section
              id={`webinar-${tab.toLowerCase()}-panel`}
              role="tabpanel"
              aria-label={`${tab} webinars`}
              className="space-y-3"
            >
              {tab === "Upcoming" && (
                <SolidCard>
                  <div className="p-4">
                    <p className="font-semibold text-white">
                      Building resilience daily
                    </p>
                    <p className="mt-1 text-sm text-white/55">
                      Nov 21, 2026 · 6:00 PM EST · bundled demo
                    </p>
                  </div>
                </SolidCard>
              )}
              {tab === "Registered" && (
                <SolidCard>
                  <div className="p-4">
                    <p className="font-semibold text-white">
                      Live reset for sleep
                    </p>
                    <p className="mt-1 text-sm text-white/55">
                      {registered
                        ? "Confirmed locally"
                        : low
                        ? "Schedule pending · registration unavailable"
                        : offline
                        ? "Offline · registration unavailable"
                        : scheduleNull
                        ? "Schedule unavailable · registration unavailable"
                        : "Registration review available"}
                    </p>
                  </div>
                </SolidCard>
              )}
              {tab === "Recordings" &&
                (unpublished ? (
                  <HonestNullState
                    title="Recording not published"
                    body="Watch remains disabled until a recording is available."
                  />
                ) : (
                  <RecordingCard
                    mediaNull={mediaNull}
                    watchDisabled={offline}
                    watchDisabledReason="Watch preview is disabled while offline. Cached progress remains read-only."
                    onWatch={() => setPanel("watch")}
                    onShare={() => {
                      setShareTarget(STRESS_RESET_SHARE);
                      setPanel("share");
                    }}
                  />
                ))}
            </section>
            {tab !== "Recordings" && !unpublished && (
              <RecordingCard
                mediaNull={mediaNull}
                watchDisabled={offline}
                watchDisabledReason="Watch preview is disabled while offline. Cached progress remains read-only."
                onWatch={() => setPanel("watch")}
                onShare={() => {
                  setShareTarget(STRESS_RESET_SHARE);
                  setPanel("share");
                }}
              />
            )}
            <CIAInsightCard
              eyebrow="CIA topic suggestion"
              provenance={[
                offline
                  ? "Cached topic context · confidence unavailable"
                  : low
                  ? "Topic only · low confidence"
                  : "Bundled topic match",
              ]}
            >
              <p className="text-sm text-white/75">
                {offline
                  ? "This cached webinar topic may relate to general wellbeing. No live schedule, personal Mission, or health match is claimed."
                  : low
                  ? "This webinar may relate to general wellbeing topics. No personal Mission or health match is claimed."
                  : "This public session may support a general sleep routine. No private data is shared."}
              </p>
            </CIAInsightCard>
            {unpublished && tab !== "Recordings" && (
              <HonestNullState
                title="Recording not published"
                body="The recording card and watch action stay hidden until media is available."
              />
            )}
          </>
        )}
        <button
          type="button"
          className="focus-ring min-h-11 rounded-full px-3 text-sm text-brand-orange"
          onClick={() => setPanel("data")}
        >
          Webinar data controls
        </button>
      </main>
    </HifiShell>
  );
}

function WebinarTabs({
  tab,
  onChange,
}: {
  tab: Tab;
  onChange: (tab: Tab) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Webinar filters"
      className="grid grid-cols-3 gap-2"
    >
      {(["Upcoming", "Registered", "Recordings"] as const).map((item) => (
        <button
          key={item}
          type="button"
          role="tab"
          aria-selected={tab === item}
          aria-controls={`webinar-${item.toLowerCase()}-panel`}
          className={`focus-ring min-h-11 rounded-2xl border px-2 text-sm ${
            tab === item
              ? "border-brand-orange/60 bg-brand-orange text-ink-900"
              : "border-white/10 bg-white/[0.03] text-white/75"
          }`}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function RecordingCard({
  mediaNull,
  watchDisabled,
  watchDisabledReason,
  onWatch,
  onShare,
}: {
  mediaNull: boolean;
  watchDisabled: boolean;
  watchDisabledReason: string;
  onWatch: () => void;
  onShare: () => void;
}) {
  return (
    <SolidCard>
      <div className="p-4">
        <div
          role="img"
          aria-label={
            mediaNull
              ? "Recording artwork unavailable"
              : "Code-native abstract webinar artwork, no person or logo"
          }
          data-asset-disposition={
            mediaNull
              ? "HIFI-94-01-honest-null"
              : "HIFI-94-01-code-native-abstract"
          }
          className="grid h-28 place-items-center rounded-xl border border-white/10 bg-brand-orange/[0.05]"
        >
          {mediaNull ? (
            <span className="text-sm text-white/55">Media unavailable</span>
          ) : (
            <Video className="h-8 w-8 text-brand-orange/70" />
          )}
        </div>
        <p className="mt-3 font-semibold text-white">Stress reset workshop</p>
        <p className="text-sm text-white/55">
          Speaker Maya · 42 min · one recording shown
        </p>
        <div className="mt-3 flex justify-between text-xs text-white/55">
          <span>Watch progress 38%</span>
          <span>Bundled library</span>
        </div>
        <ProgressBar value={38} tone="you" />
        <div className="mt-3 grid grid-cols-2 gap-2">
          <BtnGhost onClick={onShare}>
            <Share2 className="h-4 w-4" />
            Public link
          </BtnGhost>
          <BtnSecondary disabled={mediaNull || watchDisabled} onClick={onWatch}>
            <PlayCircle className="h-4 w-4" />
            Watch preview
          </BtnSecondary>
        </div>
        {(mediaNull || watchDisabled) && (
          <p className="mt-2 text-xs text-white/55">
            {mediaNull
              ? "Watch disabled because recording media is unavailable."
              : watchDisabledReason}
          </p>
        )}
        <p className="mt-2 flex items-center gap-2 text-xs text-white/55">
          <Clock className="h-3.5 w-3.5" />
          Progress is a bundled local fixture.
        </p>
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
