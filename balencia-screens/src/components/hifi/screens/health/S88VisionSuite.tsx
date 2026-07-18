"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Pause, Play, ShieldCheck, X } from "lucide-react";
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  Chip,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassCard,
  HifiShell,
  ProgressRing,
  SolidCard,
  TopBar,
  cx,
} from "@/components/hifi/kit";
import { E1Modal } from "../intelligence/E1Modal";

export function S88VisionSuite() {
  const [fixture, setFixture] = useState("default");
  const [tab, setTab] = useState("Exercises");
  const [timer, setTimer] = useState<"idle" | "active" | "paused" | "done">(
    "idle"
  );
  const [consent, setConsent] = useState(true);
  const [panel, setPanel] = useState<"urgent" | "data" | null>(null);
  const [status, setStatus] = useState(
    "Non-diagnostic local wellbeing preview."
  );
  useEffect(() => {
    const q =
      new URLSearchParams(window.location.search).get("state") ?? "default";
    queueMicrotask(() => {
      setFixture(q);
      setConsent(q !== "consent-off");
      if (q === "eye-test-null") setTab("Eye test");
      if (q === "strain-low-confidence") setTab("Strain");
      if (q === "exercise-active") setTimer("active");
      if (q === "exercise-success") setTimer("done");
      if (q === "data-controls") setPanel("data");
    });
  }, []);
  const skeleton = fixture === "skeleton";
  const empty = fixture === "empty";
  const error = fixture === "error";
  const disabled = fixture === "disabled";
  const offline = fixture === "offline";
  const nullTest = fixture === "eye-test-null";
  const low = fixture === "strain-low-confidence";
  const overlay = panel ? (
    <E1Modal
      label={
        panel === "urgent" ? "Urgent vision guidance" : "Vision data controls"
      }
      onClose={() => setPanel(null)}
    >
      <div className="flex justify-between">
        <h2 className="text-[18px] font-semibold">
          {panel === "urgent"
            ? "Seek qualified care now"
            : "Vision log controls"}
        </h2>
        <button
          aria-label="Close dialog"
          className="grid h-11 w-11 place-items-center"
          onClick={() => setPanel(null)}
        >
          <X />
        </button>
      </div>
      {panel === "urgent" ? (
        <>
          <p className="mt-3 text-[13px] leading-5 text-white/75">
            Sudden loss or change of vision, flashes, many new floaters, or
            sharp pain need urgent clinician guidance. This prototype does not
            place calls or diagnose.
          </p>
          <Link
            href="/screens/25?support=vision-urgent"
            className="focus-ring mt-4 flex min-h-11 items-center rounded-xl bg-paper-100 px-4 font-semibold text-ink-900"
          >
            Open qualified support guidance
          </Link>
        </>
      ) : (
        <>
          <p className="mt-3 text-[13px] text-white/70">
            Health wellbeing category · manual app log · this vision suite ·
            refreshed today · confidence shown · retained locally until
            deletion.
          </p>
          <ConsentRail controls={FULL_DATA_CONTROLS} />
        </>
      )}
    </E1Modal>
  ) : undefined;
  return (
    <HifiShell
      header={
        <TopBar
          title={
            <>
              Vision <span className="text-emphasis">suite</span>
            </>
          }
        />
      }
      atmosphere="you"
      overlay={overlay}
    >
      <main
        data-f2-state={`88-${fixture}`}
        className="space-y-4 px-4 pb-24 pt-3"
      >
        <GlassCard tone="you">
          <p className="text-[11px] uppercase tracking-widest text-brand-orange">
            Non-diagnostic eye care
          </p>
          {skeleton ? (
            <div className="mt-3 h-16 animate-pulse rounded-xl bg-white/5" />
          ) : (
            <>
              <h2 className="mt-1 text-[20px] font-semibold">
                {empty || nullTest
                  ? "No eye task result yet"
                  : timer === "done"
                  ? "Exercise complete"
                  : "Eye care today"}
              </h2>
              <p className="mt-2 text-[13px] text-white/60">
                {nullTest
                  ? "No acuity or color score is stored. Start only when conditions feel comfortable."
                  : low
                  ? "Two manual strain notes · trend confidence is low."
                  : "Manual wellbeing log · refreshed today."}
              </p>
            </>
          )}
        </GlassCard>
        <div
          role="tablist"
          aria-label="Vision tools"
          className="grid grid-cols-3 gap-1"
        >
          {["Eye test", "Exercises", "Strain"].map((x) => (
            <button
              key={x}
              role="tab"
              id={`vision-tab-${x.toLowerCase().replace(" ", "-")}`}
              aria-controls={`vision-panel-${x
                .toLowerCase()
                .replace(" ", "-")}`}
              aria-selected={tab === x}
              onClick={() => setTab(x)}
              className={cx(
                "min-h-11 rounded-xl px-2 text-[12px]",
                tab === x
                  ? "bg-brand-orange text-white"
                  : "bg-white/5 text-white/60"
              )}
            >
              {x}
            </button>
          ))}
        </div>
        {(error || disabled || offline) && (
          <SolidCard>
            <p role="alert" className="font-semibold">
              {error
                ? "Exercise tool could not load"
                : disabled
                ? "Eye task unavailable for this setting"
                : "Offline · local exercise remains available"}
            </p>
            <p className="mt-1 text-[12px] text-white/60">
              No diagnostic result was created. Urgent guidance remains
              available.
            </p>
            {error && (
              <BtnSecondary
                className="mt-3"
                onClick={() => setStatus("Tool retry completed locally.")}
              >
                Retry tool
              </BtnSecondary>
            )}
          </SolidCard>
        )}
        {!skeleton && !empty && tab === "Eye test" && (
          <div
            role="tabpanel"
            id="vision-panel-eye-test"
            aria-labelledby="vision-tab-eye-test"
          >
            <SolidCard>
              <h3 className="font-semibold">Non-diagnostic eye task</h3>
              <p className="mt-2 text-[13px] leading-5 text-white/65">
                No result is stored. Check one eye at a time in comfortable
                light; this cannot measure acuity or replace an exam.
              </p>
              <BtnPrimary
                className="mt-4"
                disabled={disabled || !consent}
                onClick={() =>
                  setStatus("Non-diagnostic eye task preview started locally.")
                }
              >
                Start eye task
              </BtnPrimary>
            </SolidCard>
          </div>
        )}
        {!skeleton && !empty && tab === "Strain" && (
          <div
            role="tabpanel"
            id="vision-panel-strain"
            aria-labelledby="vision-tab-strain"
          >
            <SolidCard>
              <h3 className="font-semibold">Screen-strain notes</h3>
              <p className="mt-2 text-[13px] text-white/65">
                {low
                  ? "Two manual notes · estimated trend · low confidence."
                  : "No strain diagnosis · manual notes only."}
              </p>
              <BtnPrimary
                className="mt-4"
                disabled={disabled || !consent}
                onClick={() =>
                  setStatus("Screen-strain note preview opened locally.")
                }
              >
                Log strain note
              </BtnPrimary>
            </SolidCard>
          </div>
        )}
        {!skeleton && !empty && tab === "Exercises" && (
          <div
            role="tabpanel"
            id="vision-panel-exercises"
            aria-labelledby="vision-tab-exercises"
          >
            <GlassCard>
              <div
                data-asset-disposition="HIFI-88-01-code-native-non-diagnostic"
                role="img"
                aria-label="Non-diagnostic focus exercise visual"
                className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-brand-orange/35 bg-brand-orange/5"
              >
                <div className="h-8 w-8 rounded-full border-4 border-brand-orange" />
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold">20-20-20 reset</h3>
                  <p className="mt-1 text-[12px] text-white/60">
                    Look 20 feet away for 20 seconds.
                  </p>
                </div>
                <ProgressRing
                  percent={timer === "done" ? 100 : timer === "active" ? 50 : 0}
                  value={timer === "done" ? "Done" : "20s"}
                  label={timer === "paused" ? "Paused" : "Exercise"}
                  size={72}
                />
              </div>
              <div className="mt-4 flex gap-2">
                {timer === "done" ? (
                  <Chip tone="done">
                    <Check />
                    Completed locally
                  </Chip>
                ) : (
                  <BtnPrimary
                    disabled={disabled || !consent}
                    onClick={() =>
                      setTimer(timer === "active" ? "paused" : "active")
                    }
                  >
                    {timer === "active" ? <Pause /> : <Play />}
                    {timer === "active"
                      ? "Pause"
                      : timer === "paused"
                      ? "Resume"
                      : "Start exercise"}
                  </BtnPrimary>
                )}
                <BtnGhost
                  disabled={disabled || !consent}
                  onClick={() => {
                    setTimer("done");
                    setStatus(
                      "Exercise completed. Non-diagnostic completion saved locally."
                    );
                  }}
                >
                  Complete
                </BtnGhost>
              </div>
            </GlassCard>
          </div>
        )}
        <SolidCard>
          <h3 className="font-semibold">Not a diagnosis</h3>
          <p className="mt-1 text-[12px] leading-5 text-white/65">
            Sudden vision changes need a clinician. Flashes, floaters, or sharp
            pain need urgent care.
          </p>
          <button
            type="button"
            className="focus-ring mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/15"
            onClick={() => setPanel("urgent")}
          >
            <ShieldCheck />
            Find urgent guidance
          </button>
        </SolidCard>
        <GlassCard>
          <div className="flex min-h-11 items-center justify-between">
            <div>
              <p className="font-semibold">Wellbeing log</p>
              <p className="text-[11px] text-white/50">
                Local only · no cloud sync
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={consent}
              aria-label="Toggle wellbeing log consent"
              onClick={() => {
                setConsent(!consent);
                setStatus(
                  `Wellbeing log consent ${
                    consent ? "revoked" : "accepted"
                  } locally.`
                );
              }}
              className={cx(
                "relative h-11 w-12 rounded-full",
                consent ? "bg-brand-orange" : "bg-white/15"
              )}
            >
              <span
                className={cx(
                  "absolute top-3 h-5 w-5 rounded-full bg-white transition-none",
                  consent ? "right-1" : "left-1"
                )}
              />
            </button>
          </div>
          <BtnGhost className="mt-3" onClick={() => setPanel("data")}>
            Data controls
          </BtnGhost>
        </GlassCard>
        <p role="status" className="text-[12px] text-white/60">
          {status}
        </p>
      </main>
    </HifiShell>
  );
}
