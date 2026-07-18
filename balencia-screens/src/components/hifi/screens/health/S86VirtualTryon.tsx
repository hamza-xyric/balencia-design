"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Camera, Clock, ImagePlus, Sparkles, Trash2, X } from "lucide-react";
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  CIAInsightCard,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassCard,
  HifiShell,
  SolidCard,
  StepperRail,
  TopBar,
} from "@/components/hifi/kit";
import { E1Modal } from "../intelligence/E1Modal";

export function S86VirtualTryon() {
  const [fixture, setFixture] = useState("default-consented");
  const [panel, setPanel] = useState<"delete" | "data" | null>(null);
  const [split, setSplit] = useState(50);
  const [status, setStatus] = useState(
    "Local privacy-safe preview. No camera, file, share, account, or network capability is active."
  );
  useEffect(() => {
    queueMicrotask(() =>
      setFixture(
        new URLSearchParams(window.location.search).get("state") ??
          "default-consented"
      )
    );
  }, []);
  useEffect(() => {
    if (fixture === "delete-confirm") queueMicrotask(() => setPanel("delete"));
    if (fixture === "data-controls") queueMicrotask(() => setPanel("data"));
  }, [fixture]);
  const unconsented =
    fixture === "empty-unconsented" || fixture === "consent-revoked";
  const success = fixture === "success";
  const unclear = fixture === "safety-unclear";
  const renderError = fixture === "render-error";
  const offline = fixture === "offline-disabled";
  const skeleton = fixture === "skeleton";
  const overlay = panel ? (
    <E1Modal
      label={panel === "delete" ? "Delete try-on data" : "Try-on data controls"}
      onClose={() => setPanel(null)}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-semibold text-paper-100">
          {panel === "delete"
            ? "Choose what to delete"
            : "Photo privacy controls"}
        </h2>
        <button
          className="focus-ring grid h-11 w-11 place-items-center rounded-full"
          aria-label="Close dialog"
          onClick={() => setPanel(null)}
        >
          <X />
        </button>
      </div>
      {panel === "delete" ? (
        <>
          <p className="mt-3 text-[13px] leading-5 text-paper-100/70">
            Delete the source photo, generated look, or all try-on data. This
            local preview never contacts an account.
          </p>
          <div className="mt-4 grid gap-2">
            {["Source photo", "Generated look", "All try-on data"].map((x) => (
              <button
                key={x}
                type="button"
                className="focus-ring min-h-11 rounded-xl border border-white/15 px-3 text-left text-[13px]"
                onClick={() => {
                  setStatus(`${x} deletion queued locally.`);
                  setPanel(null);
                }}
              >
                {x}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="mt-3 text-[13px] leading-5 text-paper-100/70">
            Category: photo-adjacent wellbeing · source: local choice · scope:
            this preview · fresh now · confidence shown per render · retained 30
            days unless saved.
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
              <span className="text-emphasis">Virtual</span> try-on
            </>
          }
          right={
            <Link
              href="/screens/87"
              aria-label="View try-on history"
              className="focus-ring grid h-11 w-11 place-items-center rounded-full"
            >
              <Clock />
            </Link>
          }
        />
      }
      atmosphere="you"
      showTabBar={false}
      overlay={overlay}
    >
      <main
        data-f2-state={`86-${fixture}`}
        data-consent-state={
          unconsented
            ? fixture === "consent-revoked"
              ? "revoked"
              : "not-accepted"
            : "accepted"
        }
        className="space-y-4 px-4 pb-8 pt-3"
      >
        <GlassCard tone="you">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-orange">
            Photo consent
          </p>
          <h2 className="mt-1 text-[17px] font-semibold text-white">
            {fixture === "consent-revoked"
              ? "Photo access revoked"
              : unconsented
              ? "No photo access accepted yet"
              : "Preview-only access accepted"}
          </h2>
          <p className="mt-2 text-[13px] leading-5 text-white/65">
            Purpose: this look only · retention: 30 days unless saved · never
            used for model training.
          </p>
          <div className="mt-3 flex gap-2">
            {unconsented ? (
              <BtnSecondary
                onClick={() => {
                  setFixture("default-consented");
                  setStatus("Preview-only photo access accepted locally.");
                }}
              >
                Accept preview-only access
              </BtnSecondary>
            ) : (
              <BtnSecondary
                onClick={() => {
                  setFixture("consent-revoked");
                  setStatus("Photo access revoked locally.");
                }}
              >
                Revoke access
              </BtnSecondary>
            )}
            <BtnGhost onClick={() => setPanel("delete")}>Delete</BtnGhost>
          </div>
        </GlassCard>
        {skeleton ? (
          <SolidCard className="h-[250px] animate-pulse">
            <span className="sr-only">Try-on preview loading</span>
          </SolidCard>
        ) : (
          <GlassCard>
            <div
              className="grid grid-cols-2 gap-3"
              data-asset-disposition="HIFI-86-01-code-native-no-identifiable-person"
            >
              {["Source photo", "Generated look"].map((label, i) => (
                <div key={label}>
                  <div
                    className={`grid aspect-[3/4] place-items-center rounded-xl border ${
                      i
                        ? "border-royal-purple/25 bg-royal-purple/10"
                        : "border-white/10 bg-white/[0.04]"
                    }`}
                    role="img"
                    aria-label={`${label}: privacy-safe garment silhouette, no identifiable person`}
                  >
                    <div className="h-20 w-14 rounded-t-full border-2 border-current text-white/25" />
                  </div>
                  <p className="mt-2 text-center text-[12px] text-white/70">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            {success && (
              <label className="mt-4 block text-[12px] text-white/65">
                Compare source and generated look: {split}%
                <input
                  className="mt-2 h-11 w-full accent-brand-orange"
                  type="range"
                  min="0"
                  max="100"
                  value={split}
                  onChange={(e) => setSplit(Number(e.target.value))}
                  aria-label="Compare source and generated look"
                />
              </label>
            )}
            {!success && (
              <p className="mt-4 text-center text-[12px] text-white/55">
                {unconsented
                  ? "Choose consent before adding a photo."
                  : unclear
                  ? "Safety scan unclear. Source remains private."
                  : renderError
                  ? "Render failed. Safe source retained."
                  : "Source ready · no generated look yet."}
              </p>
            )}
          </GlassCard>
        )}
        <StepperRail
          steps={["Upload", "Safety scan", "Render", "Review"]}
          current={
            success ? 3 : unclear ? 1 : renderError ? 2 : unconsented ? 0 : 1
          }
        />
        {!unconsented && (
          <CIAInsightCard
            provenance={
              success
                ? ["Saved color preference", "Manual prompt"]
                : ["Awaiting render evidence"]
            }
          >
            {success
              ? "CIA can explain this neutral palette using your saved preference and manual prompt."
              : "CIA guidance waits until consent and render evidence are both available."}
          </CIAInsightCard>
        )}
        <div className="grid grid-cols-2 gap-2">
          <BtnSecondary
            disabled={unconsented || offline || unclear}
            onClick={() =>
              setStatus(
                "Camera preview selected locally. No camera capability was opened."
              )
            }
          >
            <Camera />
            Use camera
          </BtnSecondary>
          <BtnSecondary
            disabled={unconsented || offline || unclear}
            onClick={() =>
              setStatus(
                "Photo chooser preview selected locally. No file picker was opened."
              )
            }
          >
            <ImagePlus />
            Choose photo
          </BtnSecondary>
        </div>
        <BtnPrimary
          disabled={!success && (unconsented || unclear || offline)}
          onClick={() => {
            setFixture("success");
            setStatus("Privacy-safe render preview completed locally.");
          }}
        >
          <Sparkles />
          {renderError ? "Retry render" : "Generate preview"}
        </BtnPrimary>
        {offline && (
          <SolidCard>
            <p role="status" className="font-semibold text-white">
              Offline · capture and render unavailable
            </p>
            <p className="mt-1 text-[12px] text-white/60">
              Local deletion remains available.
            </p>
          </SolidCard>
        )}
        <div className="flex gap-2">
          <BtnGhost onClick={() => setPanel("data")}>Data controls</BtnGhost>
          <BtnGhost onClick={() => setPanel("delete")}>
            <Trash2 />
            Delete data
          </BtnGhost>
        </div>
        <p role="status" className="text-[12px] leading-5 text-white/60">
          {status}
        </p>
      </main>
    </HifiShell>
  );
}
