"use client";

import { useEffect, useState } from "react";
import { Receipt, X } from "lucide-react";
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  Chip,
  CIAInsightCard,
  ConsentRail,
  FULL_DATA_CONTROLS,
  HifiShell,
  ProgressBar,
  ProgressRing,
  Provenance,
  SolidCard,
  TopBar,
  cx,
} from "@/components/hifi/kit";
import { E1Modal } from "../intelligence/E1Modal";

const states = new Set([
  "budget-default",
  "transaction-default",
  "budget-low-confidence",
  "transaction-pending",
  "budget-honest-null",
  "transaction-honest-null",
  "skeleton",
  "error-cached",
  "offline",
  "budget-edit-disabled",
  "budget-save-success",
  "category-picker",
  "receipt-options",
  "delete-confirm",
  "delete-failure",
  "data-controls",
]);
export function S31BudgetDetail() {
  const [fixture, setFixture] = useState("budget-default");
  const [mode, setMode] = useState<"Budget" | "Transaction">("Budget");
  const [panel, setPanel] = useState<
    "edit" | "category" | "receipt" | "delete" | "data" | null
  >(null);
  const [status, setStatus] = useState(
    "Bundled finance demo · refreshed Apr 12, 9:30 · confirmed."
  );
  useEffect(() => {
    const q =
      new URLSearchParams(window.location.search).get("state") ??
      "budget-default";
    const f = states.has(q) ? q : "budget-default";
    queueMicrotask(() => {
      setFixture(f);
      setMode(f.startsWith("transaction") ? "Transaction" : "Budget");
      if (f === "category-picker") setPanel("category");
      if (f === "receipt-options") setPanel("receipt");
      if (f === "delete-confirm" || f === "delete-failure") setPanel("delete");
      if (f === "data-controls") setPanel("data");
    });
  }, []);
  const offline = fixture === "offline",
    pending = fixture === "transaction-pending",
    low = fixture === "budget-low-confidence",
    nil = fixture.endsWith("honest-null"),
    skeleton = fixture === "skeleton";
  const editingDisabled =
    offline || fixture === "budget-edit-disabled" || pending;
  const title =
    panel === "data"
      ? "Finance data controls"
      : panel === "delete"
      ? "Delete Trader Joe’s · $42.10?"
      : panel === "category"
      ? "Choose a category"
      : panel === "receipt"
      ? "Receipt options"
      : "Edit Dining budget";
  const overlay = panel ? (
    <E1Modal label={title} onClose={() => setPanel(null)}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
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
            Finance category · bundled demo source · this detail only ·
            refreshed Apr 12, 9:30 · confirmed · session retention · export
            unavailable · revoke preview · delete preview.
          </p>
          <ConsentRail controls={FULL_DATA_CONTROLS} />
        </>
      ) : panel === "delete" ? (
        <>
          {fixture === "delete-failure" && (
            <p
              role="alert"
              className="mt-3 rounded-xl border border-brand-orange/30 bg-brand-orange/10 p-3 text-sm text-white"
            >
              Previous local delete attempt failed. Trader Joe’s remains posted.
            </p>
          )}
          <p className="mt-3 text-sm text-white/65">
            Posted demo transaction. Confirmation only changes this local
            preview and cannot affect a bank. This cannot be undone inside the
            preview.
          </p>
          <div className="mt-4 flex gap-2">
            <BtnSecondary onClick={() => setPanel(null)}>Cancel</BtnSecondary>
            <BtnGhost
              onClick={() => {
                setStatus(
                  fixture === "delete-failure"
                    ? "Delete failed locally; Trader Joe’s remains posted."
                    : "Trader Joe’s · $42.10 deleted from the local preview."
                );
                setPanel(null);
              }}
            >
              Confirm delete
            </BtnGhost>
          </div>
        </>
      ) : panel === "category" ? (
        <div className="mt-3 grid gap-2">
          {["Groceries", "Dining", "Other"].map((x) => (
            <button
              key={x}
              className="min-h-11 rounded-xl border border-white/10 text-left px-3"
              onClick={() => {
                setStatus(`${x} selected locally.`);
                setPanel(null);
              }}
            >
              {x}
            </button>
          ))}
        </div>
      ) : panel === "receipt" ? (
        <>
          <p className="mt-3 text-sm text-white/65">
            Receipt metadata only. File and camera capabilities are unavailable.
          </p>
          <BtnSecondary
            className="mt-3"
            onClick={() => {
              setStatus("Receipt attachment removed from local preview.");
              setPanel(null);
            }}
          >
            Remove receipt
          </BtnSecondary>
        </>
      ) : (
        <>
          <label className="mt-3 block text-sm">
            Allocation
            <input
              defaultValue="620"
              className="mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3"
            />
          </label>
          <div className="mt-4 flex gap-2">
            <BtnSecondary onClick={() => setPanel(null)}>Cancel</BtnSecondary>
            <BtnPrimary
              onClick={() => {
                setStatus("Dining budget saved locally at $620.");
                setPanel(null);
              }}
            >
              Save budget
            </BtnPrimary>
          </div>
        </>
      )}
    </E1Modal>
  ) : undefined;
  return (
    <HifiShell
      header={
        <TopBar
          title={mode === "Budget" ? "Dining budget" : "Transaction detail"}
          back
          right={
            <button
              disabled={editingDisabled}
              aria-describedby={editingDisabled ? "edit-reason" : undefined}
              className="min-h-11 px-3 text-sm disabled:opacity-40"
              onClick={() => setPanel(mode === "Budget" ? "edit" : "category")}
            >
              Edit
            </button>
          }
        />
      }
      showTabBar={false}
      atmosphere="you"
      overlay={overlay}
    >
      <main
        data-g1-state={`31-${fixture}`}
        className="space-y-4 px-4 pb-10 pt-2"
      >
        <div
          role="tablist"
          aria-label="Detail context"
          className="grid grid-cols-2 rounded-full bg-white/5 p-1"
        >
          {(["Budget", "Transaction"] as const).map((x) => (
            <button
              key={x}
              role="tab"
              aria-selected={mode === x}
              aria-controls={`31-${x.toLowerCase()}-panel`}
              className={cx(
                "min-h-11 rounded-full text-sm",
                mode === x ? "bg-white/10 text-white" : "text-white/55"
              )}
              onClick={() => {
                setMode(x);
                setStatus(`${x} mode selected locally.`);
              }}
            >
              {x}
            </button>
          ))}
        </div>
        {editingDisabled && (
          <p id="edit-reason" className="text-xs text-white/55">
            Editing and deletion are unavailable{" "}
            {pending ? "until the bank status is posted" : "in this state"}.
          </p>
        )}
        {(offline || fixture === "error-cached") && (
          <SolidCard>
            <p role="alert" className="font-semibold">
              {offline
                ? "Offline · cached detail"
                : "Refresh failed · cached detail"}
            </p>
            <p className="mt-1 text-xs text-white/60">
              Last safe demo snapshot Apr 12, 9:30. No provider request was
              made.
            </p>
          </SolidCard>
        )}
        {skeleton ? (
          <SolidCard>
            <div className="h-40 animate-pulse rounded-2xl bg-white/5" />
          </SolidCard>
        ) : mode === "Budget" ? (
          <section
            id="31-budget-panel"
            role="tabpanel"
            aria-label="Budget panel"
            className="space-y-4"
          >
            {nil ? (
              <SolidCard>
                <h2 className="text-xl">Budget fully available</h2>
                <p className="mt-2 text-sm text-white/55">
                  No spending in Dining yet. Cycle dates unknown.
                </p>
              </SolidCard>
            ) : (
              <>
                <SolidCard>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-white/45">
                      Allocated this month
                    </span>
                    <Provenance
                      items={[
                        low
                          ? "Demo estimate · low confidence"
                          : "Bundled demo · Apr 12",
                      ]}
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-5">
                    <div data-testid="budget-progress-ring">
                      <ProgressRing
                        percent={77}
                        value="77%"
                        label="Spent"
                        size={104}
                        tone="you"
                      />
                      <span className="sr-only">
                        $480 spent of $620 allocated; 12 days left; on pace;
                        bundled demo; rounded from 77.42%; confirmed.
                      </span>
                    </div>
                    <div>
                      <p className="text-2xl tabular-nums">
                        $480{" "}
                        <span className="text-sm text-white/40">/ $620</span>
                      </p>
                      <p className="text-xs text-white/55">
                        12 days left · On pace · rounded from 77.42%
                      </p>
                      <div data-testid="budget-progress-bar">
                        <ProgressBar value={77} tone="you" />
                      </div>
                    </div>
                  </div>
                </SolidCard>
                <CIAInsightCard
                  eyebrow="Pattern · demo association"
                  provenance={[
                    "3-month demo average · calculated",
                    "Sleep check-ins · user entered",
                  ]}
                  actions={
                    <BtnSecondary
                      onClick={() =>
                        setStatus(
                          "CIA evidence: three demo months, medium confidence, association only."
                        )
                      }
                    >
                      Ask CIA
                    </BtnSecondary>
                  }
                >
                  Dining is 40% higher after shorter{" "}
                  <span className="text-emphasis">sleep</span> windows in this
                  bundled demo. This is not causation.
                </CIAInsightCard>
                <SolidCard>
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Recent activity</h2>
                    <button
                      className="min-h-11 px-2 text-sm text-brand-orange"
                      onClick={() =>
                        setStatus("All two Dining transactions shown.")
                      }
                    >
                      See all
                    </button>
                  </div>
                  {[
                    ["Joe’s Pizza", "-$24.00"],
                    ["Corner Cafe", "-$11.99"],
                  ].map(([n, a]) => (
                    <button
                      key={n}
                      className="flex min-h-14 w-full items-center justify-between border-t border-white/5"
                      onClick={() => setStatus(`${n} detail opened locally.`)}
                    >
                      <span>{n}</span>
                      <span>{a}</span>
                    </button>
                  ))}
                </SolidCard>
                <BtnPrimary
                  disabled={editingDisabled}
                  onClick={() => setPanel("edit")}
                >
                  Edit budget
                </BtnPrimary>
              </>
            )}
          </section>
        ) : (
          <section
            id="31-transaction-panel"
            role="tabpanel"
            aria-label="Transaction panel"
            className="space-y-4"
          >
            {nil ? (
              <SolidCard>
                <h2 className="text-xl">Transaction details unavailable</h2>
                <p className="mt-2 text-sm text-white/55">
                  Amount, merchant, category, and receipt have not been
                  provided.
                </p>
              </SolidCard>
            ) : (
              <SolidCard>
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5">
                      <Receipt />
                    </span>
                    <div>
                      <p className="text-xl tabular-nums">-$42.10</p>
                      <p className="text-sm text-white/55">Trader Joe’s</p>
                    </div>
                  </div>
                  <Chip tone="done">Groceries</Chip>
                </div>
                <dl className="mt-4 space-y-3 border-t border-white/5 pt-4 text-sm">
                  {[
                    ["Category", "Groceries"],
                    ["Receipt", "Attached metadata"],
                    ["Status", pending ? "Pending bank" : "Posted"],
                    ["Source", "Bundled demo · no Plaid connection"],
                    ["Freshness", "Apr 12, 9:30 · confirmed"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <dt className="text-white/45">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <BtnSecondary
                    disabled={editingDisabled}
                    onClick={() => setPanel("category")}
                  >
                    Recategorize
                  </BtnSecondary>
                  <BtnSecondary
                    disabled={editingDisabled}
                    onClick={() => setPanel("receipt")}
                  >
                    Receipt options
                  </BtnSecondary>
                </div>
                <BtnGhost
                  className="mt-2"
                  disabled={editingDisabled}
                  onClick={() => setPanel("delete")}
                >
                  Delete transaction
                </BtnGhost>
                <BtnSecondary
                  className="mt-2"
                  onClick={() =>
                    setStatus(
                      "Note editor opened locally; no bank data changed."
                    )
                  }
                >
                  Add note
                </BtnSecondary>
              </SolidCard>
            )}
          </section>
        )}
        {fixture === "budget-save-success" && (
          <Chip tone="done">Budget saved locally</Chip>
        )}
        <BtnGhost onClick={() => setPanel("data")}>Data controls</BtnGhost>
        <p role="status" className="text-xs text-white/60">
          {status}
        </p>
      </main>
    </HifiShell>
  );
}
