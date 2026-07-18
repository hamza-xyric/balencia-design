"use client";

import { useEffect, useState } from "react";
import { Plus, ScanLine, TrendingUp, X } from "lucide-react";
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  Chip,
  CIAInsightCard,
  ConsentRail,
  DonutHub,
  FULL_DATA_CONTROLS,
  GlassCard,
  HifiShell,
  ProgressBar,
  Provenance,
  SolidCard,
  TopBar,
} from "@/components/hifi/kit";
import { E1Modal } from "../intelligence/E1Modal";

const states = new Set([
  "default-real",
  "low-confidence",
  "honest-null",
  "skeleton",
  "section-error-cached",
  "offline",
  "pending-transaction",
  "category-selected",
  "trend-scrub",
  "add-transaction",
  "scan-disabled",
  "delete-confirm",
  "save-success",
  "data-controls",
]);
const categories = [
  { name: "Dining", amount: 650, percent: 30, color: "bg-brand-orange" },
  { name: "Transit", amount: 400, percent: 19, color: "bg-white/45" },
  { name: "Groceries", amount: 300, percent: 14, color: "bg-forest-green" },
  { name: "Other", amount: 800, percent: 37, color: "bg-white/20" },
];

export function S30FinanceMoneyMap() {
  const [fixture, setFixture] = useState("default-real");
  const [panel, setPanel] = useState<"add" | "scan" | "delete" | "data" | null>(
    null
  );
  const [selected, setSelected] = useState("Dining");
  const [status, setStatus] = useState(
    "Bundled finance demo · refreshed Apr 12, 9:30 · confirmed fixture."
  );
  useEffect(() => {
    const q =
      new URLSearchParams(window.location.search).get("state") ??
      "default-real";
    const f = states.has(q) ? q : "default-real";
    queueMicrotask(() => {
      setFixture(f);
      if (f === "category-selected") setSelected("Groceries");
      if (f === "add-transaction") setPanel("add");
      if (f === "scan-disabled") setPanel("scan");
      if (f === "delete-confirm") setPanel("delete");
      if (f === "data-controls") setPanel("data");
    });
  }, []);
  const low = fixture === "low-confidence",
    nil = fixture === "honest-null",
    skeleton = fixture === "skeleton",
    offline = fixture === "offline",
    pending = fixture === "pending-transaction";
  const overlay = panel ? (
    <E1Modal
      label={
        panel === "delete"
          ? "Delete Trader Joe’s transaction"
          : panel === "data"
          ? "Finance data controls"
          : panel === "scan"
          ? "Receipt scan availability"
          : "Add transaction"
      }
      onClose={() => setPanel(null)}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {panel === "delete"
            ? "Delete Trader Joe’s · $42.10?"
            : panel === "data"
            ? "Finance data controls"
            : panel === "scan"
            ? "Receipt scan unavailable"
            : "Add transaction locally"}
        </h2>
        <button
          aria-label="Close dialog"
          className="grid h-11 w-11 place-items-center"
          onClick={() => setPanel(null)}
        >
          <X />
        </button>
      </div>
      {panel === "data" ? (
        <>
          <p className="mt-2 text-sm text-white/65">
            Finance category · bundled demo source · this Money Map only ·
            refreshed Apr 12, 9:30 · confirmed · retained for this session ·
            export unavailable · revoke preview · delete preview.
          </p>
          <ConsentRail controls={FULL_DATA_CONTROLS} />
        </>
      ) : panel === "scan" ? (
        <>
          <p className="mt-3 text-sm text-white/65">
            Camera and file access are not available in this visual prototype.
            Add the merchant, category, and amount manually.
          </p>
          <BtnSecondary
            className="mt-4"
            onClick={() => {
              setPanel("add");
              setStatus(
                "Manual transaction form opened; no device capability used."
              );
            }}
          >
            Use manual entry
          </BtnSecondary>
        </>
      ) : panel === "delete" ? (
        <>
          <p className="mt-3 text-sm text-white/65">
            This local preview names the posted item and cannot affect a bank or
            external provider. Nothing changes before confirmation.
          </p>
          <div className="mt-4 flex gap-2">
            <BtnSecondary onClick={() => setPanel(null)}>Cancel</BtnSecondary>
            <BtnGhost
              onClick={() => {
                setStatus(
                  "Trader Joe’s · $42.10 marked delete pending in the local preview."
                );
                setPanel(null);
              }}
            >
              Confirm delete
            </BtnGhost>
          </div>
        </>
      ) : (
        <>
          <label className="mt-3 block text-sm text-white/70">
            Merchant
            <input
              defaultValue="Local market"
              className="mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-white"
            />
          </label>
          <div className="mt-4 flex gap-2">
            <BtnSecondary onClick={() => setPanel(null)}>Cancel</BtnSecondary>
            <BtnPrimary
              onClick={() => {
                setStatus(
                  "Local market transaction saved to this preview only."
                );
                setPanel(null);
              }}
            >
              Save locally
            </BtnPrimary>
          </div>
        </>
      )}
    </E1Modal>
  ) : undefined;
  return (
    <HifiShell
      header={<TopBar title="Finance" />}
      activeTab="today"
      atmosphere="cia"
      overlay={overlay}
    >
      <main
        data-g1-state={`30-${fixture}`}
        className="space-y-4 px-4 pb-28 pt-3"
      >
        {fixture === "trend-scrub" && (
          <Chip tone="you">Trend focus · Apr 12 · $2,150 logged</Chip>
        )}
        {(offline || fixture === "section-error-cached") && (
          <SolidCard>
            <p role="alert" className="font-semibold">
              {offline
                ? "Offline · cached Money Map"
                : "Category refresh failed · cached values"}
            </p>
            <p className="mt-1 text-xs text-white/60">
              Last safe demo snapshot: Apr 12, 9:30. Editing and deletion are
              unavailable offline.
            </p>
          </SolidCard>
        )}
        {!nil && !skeleton && (
          <CIAInsightCard
            eyebrow="Pattern · bundled demo"
            provenance={[
              low ? "Estimated · low confidence" : "Finance demo · confirmed",
              "Wellbeing check-in · user entered",
            ]}
            actions={
              <button
                className="min-h-11 px-2 text-xs text-royal-purple"
                onClick={() =>
                  setStatus(
                    "CIA evidence opened locally: 3 check-ins, directional association only."
                  )
                }
              >
                Ask CIA
              </button>
            }
          >
            Dining spend and stress check-ins overlap in this demo. This is an{" "}
            <span className="text-emphasis">association</span>, not causation.
          </CIAInsightCard>
        )}
        <GlassCard tone="you">
          <p className="text-xs uppercase tracking-wider text-white/45">
            Spend by category
          </p>
          {skeleton ? (
            <div className="mt-4 h-40 animate-pulse rounded-3xl bg-white/5" />
          ) : nil ? (
            <div className="py-8">
              <p className="text-xl text-white">Not enough data yet</p>
              <p className="mt-2 text-sm text-white/55">
                Add a transaction to build your category map.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-1 flex items-center justify-between gap-2">
                <p className="text-2xl font-semibold tabular-nums">
                  $2,150 total
                </p>
                <Provenance
                  items={[
                    low
                      ? "Demo estimate · low confidence"
                      : "Bundled demo · Apr 12",
                  ]}
                />
              </div>
              <div className="mt-4 flex items-center gap-4">
                <DonutHub
                  value="$2,150"
                  label="Spend total $2,150. Dining $650, Transit $400, Groceries $300, Other $800. Bundled demo source, confirmed; no pending values."
                  segments={categories.map((c) => ({
                    percent: c.percent,
                    className: c.color.replace("bg-", "text-"),
                  }))}
                />
                <div className="flex-1">
                  {categories.map((c) => (
                    <button
                      key={c.name}
                      aria-pressed={selected === c.name}
                      onClick={() => {
                        setSelected(c.name);
                        setStatus(
                          `${c.name} selected · $${c.amount} of $2,150.`
                        );
                      }}
                      className="flex min-h-11 w-full items-center justify-between rounded-lg px-2 text-sm aria-pressed:bg-white/10"
                    >
                      <span>{c.name}</span>
                      <span className="tabular-nums">${c.amount}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </GlassCard>
        {!nil && !skeleton && (
          <>
            <div className="grid grid-cols-3 gap-2">
              {[
                ["Income", "$5,000"],
                ["Spent", "$2,150"],
                ["Savings", "$1,000"],
              ].map(([a, b]) => (
                <SolidCard key={a}>
                  <p className="text-xs text-white/45">{a}</p>
                  <p className="mt-1 break-words text-base font-semibold tabular-nums">
                    {b}
                  </p>
                </SolidCard>
              ))}
            </div>
            <p className="flex items-center gap-2 text-sm text-white/70">
              <TrendingUp className="h-4 w-4 text-forest-green" />
              Net change:{" "}
              <span className="tabular-nums text-forest-green">+$2,850</span>
            </p>
            <SolidCard>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Budgets</h2>
                <button
                  className="min-h-11 px-2 text-sm text-brand-orange"
                  onClick={() =>
                    setStatus("All budgets shown: Groceries and Dining.")
                  }
                >
                  View all
                </button>
              </div>
              <p className="text-sm">
                Groceries{" "}
                <span className="float-right tabular-nums">$300 / $400</span>
              </p>
              <ProgressBar value={75} tone="you" />
              <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                <p className="text-sm">Dining · over by $50</p>
                <button
                  className="min-h-11 rounded-full border border-white/10 px-3 text-xs"
                  onClick={() =>
                    setStatus("Dining adjustment preview opened locally.")
                  }
                >
                  Adjust or roll
                </button>
              </div>
            </SolidCard>
            <SolidCard>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Transactions</h2>
                <button
                  className="min-h-11 px-2 text-sm text-brand-orange"
                  onClick={() => setStatus("Two demo transactions shown.")}
                >
                  View all
                </button>
              </div>
              {[
                ["Trader Joe’s", "-$42.10"],
                [pending ? "Uber · pending bank" : "Uber", "-$18.50"],
              ].map(([n, a], i) => (
                <button
                  key={n}
                  className="flex min-h-14 w-full items-center justify-between border-t border-white/5 text-left"
                  onClick={() =>
                    i === 0
                      ? setPanel("delete")
                      : setStatus(
                          `${n} detail opened locally; delete unavailable while pending.`
                        )
                  }
                >
                  <span>{n}</span>
                  <span className="tabular-nums">{a}</span>
                </button>
              ))}
            </SolidCard>
            <SolidCard>
              <p className="text-sm">
                Emergency fund{" "}
                <span className="float-right tabular-nums">
                  $6,000 / $10,000 · 60%
                </span>
              </p>
              <ProgressBar value={60} tone="you" />
            </SolidCard>
            <SolidCard>
              <h2 className="font-semibold">Spending trend</h2>
              <div
                role="img"
                aria-label="Past demo spending is a solid orange line; projected spending is a dashed purple line, based on a low-stakes local estimate."
                className="mt-3 h-20 rounded-xl border-b border-l border-white/10 p-3"
              >
                <div className="mt-5 border-t-2 border-brand-orange" />
                <div className="mt-3 border-t-2 border-dashed border-royal-purple" />
              </div>
              <button
                className="mt-2 min-h-11 text-sm text-brand-orange"
                onClick={() =>
                  setStatus(
                    "Apr 10 scrub: $74 demo spend; projection $81, estimated."
                  )
                }
              >
                Scrub trend
              </button>
            </SolidCard>
          </>
        )}
        {fixture === "save-success" && (
          <Chip tone="done">Transaction saved locally</Chip>
        )}
        <div className="grid grid-cols-2 gap-2">
          <BtnPrimary onClick={() => setPanel("add")}>
            <Plus />
            Add transaction
          </BtnPrimary>
          <BtnSecondary
            disabled={offline}
            aria-describedby={offline ? "scan-reason" : undefined}
            onClick={() => setPanel("scan")}
          >
            <ScanLine />
            Scan receipt
          </BtnSecondary>
        </div>
        {offline && (
          <p id="scan-reason" className="text-xs text-white/55">
            Scan disabled offline; no local queue.
          </p>
        )}
        <BtnGhost onClick={() => setPanel("data")}>Data controls</BtnGhost>
        <p role="status" className="text-xs text-white/60">
          {status}
        </p>
      </main>
    </HifiShell>
  );
}
