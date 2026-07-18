"use client";

import { useEffect, useState } from "react";
import { Check, Pencil, Plus, RotateCcw } from "lucide-react";
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  Chip,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassCard,
  HifiShell,
  ProgressBar,
  SectionTitle,
  SolidCard,
  TopBar,
  cx,
} from "@/components/hifi/kit";

type Item = {
  id: number;
  name: string;
  qty: string;
  source: string;
  checked: boolean;
};
const BASE: Item[] = [
  { id: 1, name: "Avocados", qty: "2", source: "Meal plan", checked: true },
  {
    id: 2,
    name: "Spinach",
    qty: "200 g",
    source: "Recipe · chicken bowl",
    checked: false,
  },
  {
    id: 3,
    name: "Chicken thigh",
    qty: "1 pack",
    source: "Meal plan",
    checked: false,
  },
  {
    id: 4,
    name: "Salmon fillet",
    qty: "2 servings",
    source: "Meal plan",
    checked: false,
  },
  {
    id: 5,
    name: "Brown rice",
    qty: "1 bag",
    source: "Recipe · grain bowl",
    checked: false,
  },
  {
    id: 6,
    name: "Greek yogurt",
    qty: "4 cups",
    source: "Meal plan",
    checked: true,
  },
  {
    id: 7,
    name: "Lemons",
    qty: "3",
    source: "Recipe · salmon",
    checked: false,
  },
  { id: 8, name: "Oats", qty: "1 bag", source: "Meal plan", checked: false },
];

export function S57ShoppingList() {
  const [fixture, setFixture] = useState("default");
  const [items, setItems] = useState(BASE);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState(
    "Local list preview. No account, storage, sharing, or network capability is active."
  );
  const [undo, setUndo] = useState<Item | null>(null);
  useEffect(() => {
    const value =
      new URLSearchParams(window.location.search).get("state") ?? "default";
    queueMicrotask(() => {
      setFixture(value);
      if (value === "all-done")
        setItems(BASE.map((item) => ({ ...item, checked: true })));
      if (value === "check-undo") {
        const prior = BASE[1];
        setItems(
          BASE.map((item) =>
            item.id === prior.id ? { ...item, checked: true } : item
          )
        );
        setUndo(prior);
      }
    });
  }, []);
  const isNull = fixture === "honest-null";
  const visible = isNull ? [] : items;
  const purchased = visible.filter((item) => item.checked).length;
  const percent = visible.length
    ? Math.round((purchased / visible.length) * 100)
    : 0;
  const low = fixture === "low-confidence" || fixture === "offline";
  const disabled = fixture === "sync-disabled" || fixture === "offline";
  const toggle = (item: Item) => {
    if (disabled) return;
    setItems((current) =>
      current.map((value) =>
        value.id === item.id ? { ...value, checked: !value.checked } : value
      )
    );
    setUndo(item);
    setStatus(
      `${item.name} ${
        item.checked ? "restored to open items" : "marked purchased"
      }. Undo is available.`
    );
  };
  const restore = () => {
    if (!undo) return;
    setItems((current) =>
      current.map((item) => (item.id === undo.id ? undo : item))
    );
    setStatus(`${undo.name} restored.`);
    setUndo(null);
  };
  const add = () => {
    const value = draft.trim();
    if (!value) {
      setStatus("Enter an item name before adding.");
      return;
    }
    setItems((current) => [
      ...current,
      {
        id: Date.now(),
        name: value,
        qty: "1",
        source: "You added",
        checked: false,
      },
    ]);
    setDraft("");
    setStatus(`${value} added locally.`);
  };
  return (
    <HifiShell
      header={<TopBar title="Shopping list" />}
      activeTab="today"
      atmosphere="you"
    >
      <main
        data-f2-state={`57-${fixture}`}
        className="space-y-4 px-4 pb-8 pt-3"
      >
        {fixture === "data-controls" && (
          <Chip tone="you">Shopping data controls open below</Chip>
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            add();
          }}
          className="flex gap-2 rounded-pill border border-white/10 bg-white/[0.05] p-1.5"
        >
          <label className="sr-only" htmlFor="shopping-item">
            Add shopping item
          </label>
          <input
            id="shopping-item"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="focus-ring min-h-11 min-w-0 flex-1 rounded-pill bg-transparent px-3 text-[16px] text-paper-100 placeholder:text-paper-100/55"
            placeholder="Add an item…"
          />
          <BtnPrimary className="!h-11 px-4">
            <Plus size={16} />
            Add
          </BtnPrimary>
        </form>
        {fixture === "skeleton" ? (
          <SolidCard className="space-y-3" aria-label="Shopping list loading">
            <div className="h-16 animate-pulse rounded-xl bg-white/[0.06] motion-reduce:animate-none" />
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-14 animate-pulse rounded-xl bg-white/[0.04] motion-reduce:animate-none"
              />
            ))}
          </SolidCard>
        ) : (
          <>
            {(fixture === "error-cached" || fixture === "offline") && (
              <SolidCard>
                <p role="status" className="font-semibold text-paper-100">
                  {fixture === "offline"
                    ? "Offline · cached list"
                    : "Could not refresh · cached list shown"}
                </p>
                <p className="mt-1 text-[13px] text-paper-100/70">
                  Last local refresh 2h ago. Estimated values are clearly
                  labeled.
                </p>
              </SolidCard>
            )}
            <GlassCard tone="you">
              <div className="flex justify-between gap-3">
                <div>
                  <p className="text-[16px] font-semibold text-paper-100">
                    {isNull ? "---" : `${visible.length} items`} · {purchased}{" "}
                    purchased
                  </p>
                  <p className="mt-1 text-[12px] text-paper-100/70">
                    {low ? "Estimated · sync pending" : "Computed locally"}
                  </p>
                </div>
                <strong
                  className={cx(
                    "text-[18px] tabular-nums",
                    low ? "text-paper-100/65" : "text-brand-orange"
                  )}
                >
                  {isNull ? "---" : `${low ? "~" : ""}${percent}%`}
                </strong>
              </div>
              <div className="mt-3">
                <ProgressBar
                  value={percent}
                  tone={percent === 100 ? "done" : "you"}
                />
              </div>
            </GlassCard>
            {visible.length === 0 ? (
              <SolidCard className="py-8 text-center">
                <p className="text-[18px] font-semibold text-paper-100">
                  Your shopping list is empty.
                </p>
                <p className="mt-2 text-[13px] text-paper-100/70">
                  Add an item, ask CIA for a local preview, or import a
                  diet-plan preview.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <BtnGhost
                    onClick={() =>
                      setStatus(
                        "CIA list preview selected locally. No message was sent."
                      )
                    }
                  >
                    Talk to CIA
                  </BtnGhost>
                  <BtnPrimary
                    onClick={() =>
                      setStatus(
                        "Diet-plan import preview selected locally. No account data changed."
                      )
                    }
                  >
                    Import from diet plan
                  </BtnPrimary>
                </div>
              </SolidCard>
            ) : (
              <section>
                <SectionTitle
                  title={percent === 100 ? "Purchased" : "All items"}
                  meta={`${visible.length} shown`}
                />
                <SolidCard className="mt-2 p-0">
                  <div className="divide-y divide-white/[0.06]">
                    {visible.map((item) => (
                      <div
                        key={item.id}
                        className={cx(
                          "flex min-h-[68px] items-center gap-2 p-3",
                          item.checked && "opacity-60"
                        )}
                      >
                        <label className="focus-within:ring-2 focus-within:ring-brand-orange grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/15">
                          <input
                            type="checkbox"
                            checked={item.checked}
                            disabled={disabled}
                            onChange={() => toggle(item)}
                            className="peer sr-only"
                            aria-label={`${item.name}, quantity ${item.qty}, ${
                              item.checked ? "purchased" : "not purchased"
                            }`}
                          />
                          <span className="grid h-7 w-7 place-items-center rounded-lg border border-white/20 peer-checked:border-forest-green peer-checked:bg-forest-green/20">
                            {item.checked && (
                              <Check className="h-4 w-4 text-forest-green" />
                            )}
                          </span>
                        </label>
                        <div className="min-w-0 flex-1">
                          <p
                            className={cx(
                              "text-[15px] text-paper-100",
                              item.checked && "line-through"
                            )}
                          >
                            {item.name}{" "}
                            <span className="text-paper-100/65">
                              ({item.qty})
                            </span>
                          </p>
                          <Chip>{item.source}</Chip>
                        </div>
                        <button
                          type="button"
                          disabled={disabled}
                          aria-label={`Edit ${item.name}`}
                          onClick={() =>
                            setStatus(
                              `Edit ${item.name} preview opened locally.`
                            )
                          }
                          className="focus-ring grid h-11 w-11 place-items-center rounded-xl text-paper-100/75"
                        >
                          <Pencil size={17} />
                        </button>
                      </div>
                    ))}
                  </div>
                </SolidCard>
              </section>
            )}
            {percent === 100 && (
              <GlassCard tone="done">
                <p
                  role="status"
                  className="text-center text-[18px] font-semibold text-paper-100"
                >
                  All <span className="text-emphasis">done</span>. You&apos;ve
                  got everything.
                </p>
              </GlassCard>
            )}
          </>
        )}
        {fixture === "edit-item" && (
          <SolidCard>
            <p className="font-semibold text-paper-100">Edit Avocados</p>
            <label className="mt-3 block text-[13px] text-paper-100/70">
              Quantity
              <input
                defaultValue="2"
                className="focus-ring mt-2 min-h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 text-[16px] text-paper-100"
              />
            </label>
            <BtnPrimary
              className="mt-3 w-full"
              onClick={() => setStatus("Avocados edit saved locally.")}
            >
              Save item
            </BtnPrimary>
          </SolidCard>
        )}
        {undo && (
          <div
            role="status"
            className="flex items-center justify-between rounded-2xl border border-white/15 bg-ink-brown-800 p-3 text-[13px] text-paper-100"
          >
            <span>{status}</span>
            <BtnGhost onClick={restore}>
              <RotateCcw />
              Undo
            </BtnGhost>
          </div>
        )}
        {!undo && (
          <p role="status" className="text-[12px] leading-5 text-paper-100/70">
            {status}
          </p>
        )}
        <div className="flex gap-2">
          <BtnSecondary
            className="flex-1"
            disabled={disabled}
            onClick={() =>
              setStatus(
                "Purchased-item clearing needs confirmation; no items changed."
              )
            }
          >
            Clear purchased
          </BtnSecondary>
          <BtnSecondary
            className="flex-1"
            onClick={() =>
              setStatus(
                "Share preview opened locally. No share sheet or clipboard was used."
              )
            }
          >
            Share preview
          </BtnSecondary>
        </div>
        <SolidCard>
          <p className="font-semibold text-paper-100">Shopping data controls</p>
          <p className="mt-1 text-[13px] leading-5 text-paper-100/70">
            Nutrition · meal plan and member entries · this list · refreshed
            locally today · confirmed unless estimated · retained until deleted.
          </p>
          <ConsentRail compact controls={FULL_DATA_CONTROLS} />
        </SolidCard>
      </main>
    </HifiShell>
  );
}
