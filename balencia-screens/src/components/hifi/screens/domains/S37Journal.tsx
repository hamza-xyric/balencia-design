"use client";

import { useEffect, useState } from "react";
import { BookOpen, Calendar, Mic, Plus, Settings, Trash2 } from "lucide-react";
import { E1Modal } from "../intelligence/E1Modal";
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
  Provenance,
  SafetyCard,
  SectionTitle,
  SolidCard,
  TopBar,
} from "@/components/hifi/kit";

const allowed = new Set([
  "default-entries",
  "check-ins",
  "honest-null",
  "voice-null",
  "low-confidence",
  "skeleton",
  "error-cached",
  "offline",
  "compose-text",
  "compose-voice-consent",
  "save-success",
  "delete-confirm",
  "data-controls",
  "safety-open",
]);
const entries = [
  {
    id: "may20",
    date: "May 20, 2026",
    text: "The morning session felt clear and focused. Ideas flowed more easily after the run.",
  },
  {
    id: "may19",
    date: "May 19, 2026",
    text: "Voice reflection · 2m 14s · transcript preview.",
  },
];

export function S37Journal() {
  const [fixture, setFixture] = useState("default-entries");
  const [tab, setTab] = useState<"entries" | "checkins">(
    fixture === "check-ins" ? "checkins" : "entries"
  );
  const [overlay, setOverlay] = useState<string | null>(
    fixture === "compose-text"
      ? "compose"
      : fixture === "compose-voice-consent"
      ? "voice"
      : fixture === "delete-confirm"
      ? "delete"
      : fixture === "data-controls"
      ? "data"
      : null
  );
  const [text, setText] = useState("");
  const [status, setStatus] = useState(
    fixture === "save-success" ? "Journal entry saved locally." : ""
  );
  const [localEntries, setLocalEntries] = useState(entries);
  const [selected, setSelected] = useState("may20");
  useEffect(() => {
    const value =
      new URLSearchParams(window.location.search).get("state") ??
      "default-entries";
    const next = allowed.has(value) ? value : "default-entries";
    queueMicrotask(() => {
      setFixture(next);
      setTab(next === "check-ins" ? "checkins" : "entries");
      setOverlay(
        next === "compose-text"
          ? "compose"
          : next === "compose-voice-consent"
          ? "voice"
          : next === "delete-confirm"
          ? "delete"
          : next === "data-controls"
          ? "data"
          : null
      );
      setStatus(next === "save-success" ? "Journal entry saved locally." : "");
    });
  }, []);
  const empty = fixture === "honest-null",
    low = fixture === "low-confidence";
  const selectedEntry = localEntries.find((e) => e.id === selected);
  return (
    <HifiShell
      header={
        <TopBar
          title="Journal"
          right={
            <div className="flex gap-1">
              <IconButton
                label="Record voice entry"
                onClick={() => setOverlay("voice")}
              >
                <Mic size={19} />
              </IconButton>
              <IconButton
                label="Journal settings"
                onClick={() => setOverlay("data")}
              >
                <Settings size={19} />
              </IconButton>
            </div>
          }
        />
      }
      activeTab="today"
      bottomAction={
        <BtnPrimary className="w-full" onClick={() => setOverlay("choice")}>
          <Plus size={18} />
          New entry
        </BtnPrimary>
      }
      overlay={
        overlay && (
          <E1Modal
            onClose={() => setOverlay(null)}
            label={
              overlay === "voice"
                ? "Voice entry consent preview"
                : overlay === "delete"
                ? "Delete journal entry"
                : overlay === "data"
                ? "Journal data controls"
                : "Compose journal entry"
            }
          >
            <div className="w-full rounded-[28px] border border-white/10 bg-ink-900 p-5">
              <h2 className="text-xl text-white">
                {overlay === "choice"
                  ? "Choose entry type"
                  : overlay === "voice"
                  ? "Voice preview consent"
                  : overlay === "delete"
                  ? `Delete ${selectedEntry?.date ?? "entry"}?`
                  : overlay === "data"
                  ? "Journal data controls"
                  : "Write an entry"}
              </h2>
              {overlay === "choice" ? (
                <div className="mt-4 grid gap-2">
                  <BtnSecondary onClick={() => setOverlay("compose")}>
                    Text entry
                  </BtnSecondary>
                  <BtnSecondary onClick={() => setOverlay("voice")}>
                    Voice preview
                  </BtnSecondary>
                </div>
              ) : overlay === "voice" ? (
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-white/70">
                    Allow a preview-only voice entry? No microphone, recording,
                    upload, or transcription capability is invoked.
                  </p>
                  <BtnPrimary
                    onClick={() => {
                      setStatus(
                        "Voice preview consent accepted. No audio was captured."
                      );
                      setOverlay(null);
                    }}
                  >
                    Accept preview-only voice
                  </BtnPrimary>
                  <BtnGhost onClick={() => setOverlay(null)}>Decline</BtnGhost>
                </div>
              ) : overlay === "delete" ? (
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-white/65">
                    This removes only the local preview entry. Nothing external
                    changes.
                  </p>
                  <BtnPrimary
                    onClick={() => {
                      setLocalEntries(
                        localEntries.filter((e) => e.id !== selected)
                      );
                      setStatus(
                        `${selectedEntry?.date} removed locally. Undo available.`
                      );
                      setOverlay(null);
                    }}
                  >
                    Confirm delete
                  </BtnPrimary>
                  <BtnGhost onClick={() => setOverlay(null)}>Cancel</BtnGhost>
                </div>
              ) : overlay === "data" ? (
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-white/65">
                    Controls distinguish entries, voice transcript previews,
                    check-ins, and opt-in CIA analysis.
                  </p>
                  <ConsentRail controls={FULL_DATA_CONTROLS} />
                  <BtnSecondary
                    onClick={() =>
                      setStatus("Journal export preview prepared locally.")
                    }
                  >
                    Export entries
                  </BtnSecondary>
                  <BtnGhost
                    onClick={() =>
                      setStatus("CIA analysis scope revoked locally.")
                    }
                  >
                    Revoke CIA analysis
                  </BtnGhost>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <label className="block text-sm text-white/70">
                    Private journal entry
                    <textarea
                      autoFocus
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="mt-1 min-h-28 w-full rounded-xl bg-white/10 p-3 text-white"
                    />
                  </label>
                  <BtnPrimary
                    disabled={!text.trim()}
                    onClick={() => {
                      setLocalEntries([
                        { id: "new", date: "Today", text },
                        ...localEntries,
                      ]);
                      setStatus("Journal entry saved locally.");
                      setOverlay(null);
                    }}
                  >
                    Save entry
                  </BtnPrimary>
                </div>
              )}
              <BtnGhost className="mt-3" onClick={() => setOverlay(null)}>
                Close
              </BtnGhost>
            </div>
          </E1Modal>
        )
      }
    >
      <main
        data-g1-state={`37-${fixture}`}
        className="space-y-4 px-4 pb-5 pt-3"
      >
        {fixture === "safety-open" && (
          <p
            role="status"
            className="rounded-xl border border-brand-orange/30 bg-brand-orange/10 p-3 text-sm text-white"
          >
            Local support guidance is highlighted below; no call or message is
            placed.
          </p>
        )}
        {fixture === "skeleton" ? (
          <div
            aria-label="Loading private journal"
            className="space-y-3 animate-pulse motion-reduce:animate-none"
          >
            <div className="h-32 rounded-[28px] bg-white/10" />
            <div className="h-12 rounded-2xl bg-white/10" />
            <div className="h-36 rounded-[28px] bg-white/10" />
          </div>
        ) : (
          <>
            {(fixture === "error-cached" || fixture === "offline") && (
              <SolidCard className="p-4">
                <p className="font-medium text-white">
                  {fixture === "offline"
                    ? "Offline — private drafts stay on this device preview"
                    : "Could not refresh entries"}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Cached entries remain readable and editable. No text is lost.
                </p>
              </SolidCard>
            )}
            <CIAInsightCard
              eyebrow="CIA reflection"
              provenance={
                low
                  ? ["Opt-in analysis", "Estimated · low confidence"]
                  : ["Opt-in CIA analysis", "This week"]
              }
            >
              <p className="text-lg text-white/90">
                What pattern have you noticed between your energy and
                creativity?
              </p>
              <button
                className="mt-3 min-h-11 text-sm text-brand-orange"
                onClick={() => setOverlay("compose")}
              >
                Write about this
              </button>
            </CIAInsightCard>
            {!empty && (
              <div
                role="tablist"
                aria-label="Journal views"
                className="flex rounded-2xl border border-white/10 bg-white/[0.03] p-1"
              >
                <button
                  role="tab"
                  id="entries-tab"
                  aria-selected={tab === "entries"}
                  aria-controls="entries-panel"
                  className={`min-h-11 flex-1 rounded-xl ${
                    tab === "entries"
                      ? "bg-white/10 text-white"
                      : "text-white/50"
                  }`}
                  onClick={() => setTab("entries")}
                >
                  <BookOpen size={16} className="mr-2 inline" />
                  Entries
                </button>
                <button
                  role="tab"
                  id="checkins-tab"
                  aria-selected={tab === "checkins"}
                  aria-controls="checkins-panel"
                  className={`min-h-11 flex-1 rounded-xl ${
                    tab === "checkins"
                      ? "bg-white/10 text-white"
                      : "text-white/50"
                  }`}
                  onClick={() => setTab("checkins")}
                >
                  <Calendar size={16} className="mr-2 inline" />
                  Check-ins
                </button>
              </div>
            )}
            {empty ? (
              <GlassCard tone="muted">
                <h2 className="text-xl text-white">
                  Your journal is private and for you alone
                </h2>
                <p className="mt-2 text-sm text-white/65">
                  No entries, check-ins, transcript, or CIA pattern exists yet.
                </p>
                <BtnSecondary
                  className="mt-4"
                  onClick={() => setOverlay("compose")}
                >
                  Write first entry
                </BtnSecondary>
              </GlassCard>
            ) : tab === "entries" ? (
              <section
                role="tabpanel"
                id="entries-panel"
                aria-labelledby="entries-tab"
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/70">12 entries this month</p>
                  <Provenance
                    items={
                      low
                        ? ["Estimated · low confidence"]
                        : ["Calculated locally"]
                    }
                  />
                </div>
                {fixture === "voice-null" && (
                  <SolidCard className="p-4">
                    <p className="text-white">
                      Audio was not captured · 0 seconds recorded
                    </p>
                    <p className="mt-1 text-sm text-white/55">
                      No transcript exists.
                    </p>
                  </SolidCard>
                )}
                {localEntries.map((e) => (
                  <SolidCard key={e.id} className="p-4">
                    <p className="text-xs uppercase tracking-wide text-white/45">
                      {e.date}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/85">
                      {e.text}
                    </p>
                    {e.id === "may19" && (
                      <Provenance
                        items={
                          low
                            ? [
                                "Transcript preview",
                                "Estimated · low confidence",
                              ]
                            : ["Local transcript fixture", "Consent on"]
                        }
                      />
                    )}
                    <button
                      className="mt-2 min-h-11 text-sm text-white/55"
                      aria-label={`Delete entry from ${e.date}`}
                      onClick={() => {
                        setSelected(e.id);
                        setOverlay("delete");
                      }}
                    >
                      <Trash2 size={16} className="mr-2 inline" />
                      Delete
                    </button>
                  </SolidCard>
                ))}
              </section>
            ) : (
              <section
                role="tabpanel"
                id="checkins-panel"
                aria-labelledby="checkins-tab"
                className="space-y-3"
              >
                <SolidCard className="p-4">
                  <SectionTitle title="This morning" />
                  <p className="mt-3 text-lg text-white">Energy 4 of 5</p>
                  <p className="mt-2 text-lg text-white">Stress 2 of 5</p>
                  <Provenance
                    items={["Logged this morning", "Private local check-in"]}
                  />
                </SolidCard>
              </section>
            )}
            <GlassCard tone="muted">
              <h2 className="text-sm font-medium text-white">Your privacy</h2>
              <p className="mt-2 text-sm text-white/65">
                Entries stay private by default. CIA reads only the scope you
                explicitly choose.
              </p>
              <ConsentRail controls={FULL_DATA_CONTROLS} />
            </GlassCard>
            <SafetyCard />
          </>
        )}
        <p aria-live="polite" className="min-h-5 text-sm text-forest-green">
          {status}
        </p>
      </main>
    </HifiShell>
  );
}
