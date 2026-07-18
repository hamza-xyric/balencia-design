"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ChefHat,
  Check,
  Flame,
  Heart,
  Plus,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  CIAInsightCard,
  Chip,
  ConsentRail,
  FULL_DATA_CONTROLS,
  GlassPillInput,
  HifiShell,
  IconButton,
  Provenance,
  SolidCard,
  TopBar,
} from "@/components/hifi/kit";

type Recipe = {
  id: string;
  name: string;
  calories: number | null;
  tags: string[];
  source: "Recipe DB" | "Estimated · low confidence";
  allergen?: string;
};
const recipes: Recipe[] = [
  {
    id: "oats",
    name: "Overnight oats & berries",
    calories: 320,
    tags: ["Vegan", "Breakfast"],
    source: "Recipe DB",
    allergen: "Tree nuts",
  },
  {
    id: "tempeh",
    name: "Tempeh grain bowl",
    calories: 450,
    tags: ["Vegan", "High-protein", "Lunch"],
    source: "Estimated · low confidence",
  },
  {
    id: "chicken",
    name: "Grilled chicken plate",
    calories: 410,
    tags: ["High-protein", "Dinner"],
    source: "Recipe DB",
  },
  {
    id: "stew",
    name: "Lentil stew",
    calories: 380,
    tags: ["Vegan", "Dinner"],
    source: "Recipe DB",
  },
  {
    id: "pasta",
    name: "Pesto pasta",
    calories: null,
    tags: ["Dinner"],
    source: "Recipe DB",
    allergen: "Tree nuts",
  },
];

export function S56Recipes() {
  const [fixture, setFixture] = useState("default-parent");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [vegan, setVegan] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(["oats"]);
  const [selected, setSelected] = useState<Recipe | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [created, setCreated] = useState(false);
  const [recipeName, setRecipeName] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const allergyConflict = fixture === "allergy-conflict";
  const offline = fixture === "offline-disabled";
  const error = fixture === "error-retry";
  const controls = fixture === "data-controls";
  const premium = fixture === "premium-disposition";
  useEffect(() => {
    const next =
      new URLSearchParams(window.location.search).get("state") ??
      "default-parent";
    queueMicrotask(() => {
      setFixture(next);
      setQuery(
        next === "search-results"
          ? "chicken"
          : next === "no-match"
          ? "papaya"
          : ""
      );
      setFavorites(next === "favorite-toggle" ? ["chicken"] : ["oats"]);
      setSelected(next === "recipe-detail" ? recipes[1] : null);
      setCreateOpen(["create-empty", "create-validation"].includes(next));
      setCreated(next === "create-success");
    });
  }, []);

  const safeRecipes = useMemo(
    () =>
      recipes.filter(
        (recipe) => !allergyConflict || recipe.allergen !== "Tree nuts"
      ),
    [allergyConflict]
  );
  const filtered = useMemo(
    () =>
      safeRecipes.filter((recipe) => {
        const queryMatch =
          recipe.name.toLowerCase().includes(query.toLowerCase()) ||
          recipe.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          );
        const categoryMatch =
          category === "All" || recipe.tags.includes(category);
        return (
          queryMatch &&
          categoryMatch &&
          (!vegan || recipe.tags.includes("Vegan"))
        );
      }),
    [safeRecipes, query, category, vegan]
  );

  const overlay = selected ? (
    <RecipeDetail
      recipe={selected}
      close={() => setSelected(null)}
      favorite={favorites.includes(selected.id)}
      toggle={() => toggleFavorite(selected.id)}
    />
  ) : createOpen ? (
    <CreateRecipe
      name={recipeName}
      setName={setRecipeName}
      validation={fixture === "create-validation"}
      close={() => setCreateOpen(false)}
      save={() => {
        setCreateOpen(false);
        setCreated(true);
      }}
    />
  ) : undefined;
  function toggleFavorite(id: string) {
    setFavorites((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id]
    );
  }

  return (
    <HifiShell
      header={
        <TopBar
          title="Nutrition"
          eyebrow="Recipes · nested module"
          backHref="/screens/28"
        />
      }
      showTabBar={false}
      atmosphere="you"
      overlay={overlay}
    >
      <main
        data-f1-state={`56-${fixture}`}
        className="space-y-4 px-4 pb-8 pt-3"
      >
        <nav
          aria-label="Nutrition sections"
          className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4"
        >
          {["Analytics", "Plan", "Recipes", "History", "Today"].map((tab) => (
            <a
              key={tab}
              href={
                tab === "Recipes"
                  ? "/screens/56"
                  : `/screens/28?tab=${tab.toLowerCase()}`
              }
              aria-current={tab === "Recipes" ? "page" : undefined}
              className={`focus-ring flex min-h-11 shrink-0 items-center rounded-full px-4 text-[13px] ${
                tab === "Recipes"
                  ? "bg-paper-100 font-semibold text-ink-900"
                  : "border border-white/10 text-paper-100/75"
              }`}
            >
              {tab}
            </a>
          ))}
        </nav>

        <GlassPillInput
          label="Search recipes"
          icon={<Search />}
          placeholder="Search recipes"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          disabled={offline}
          trailing={
            <IconButton
              label="Open recipe filters"
              disabled={offline}
              onClick={() => setFiltersOpen((value) => !value)}
            >
              <SlidersHorizontal />
            </IconButton>
          }
        />
        <p role="status" className="text-[12px] text-paper-100/65">
          {offline
            ? "Offline · search disabled · showing bundled recipes"
            : `${filtered.length} recipes match current filters`}
        </p>

        <div
          role="tablist"
          aria-label="Recipe category"
          className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4"
        >
          {["All", "Breakfast", "Lunch", "Dinner", "Snack"].map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={category === item}
              onClick={() => setCategory(item)}
              className={`focus-ring min-h-11 shrink-0 rounded-full px-4 text-[13px] ${
                category === item
                  ? "bg-paper-100 font-semibold text-ink-900"
                  : "border border-white/10 text-paper-100/75"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip
            interactive
            pressed={vegan}
            onClick={() => setVegan((value) => !value)}
          >
            Vegan preference
          </Chip>
          {allergyConflict ? (
            <Chip tone="muted">Tree-nut allergy confirmed</Chip>
          ) : (
            <Chip tone="muted">No confirmed allergies</Chip>
          )}
          <Chip
            interactive
            pressed={filtersOpen}
            aria-label="Show more recipe filters"
            onClick={() => setFiltersOpen((value) => !value)}
          >
            {filtersOpen ? "Hide filters" : "More filters"}
          </Chip>
        </div>
        {filtersOpen && (
          <SolidCard className="p-4">
            <p role="status" className="text-[13px] text-paper-100/70">
              Advanced filters preview is open. Vegan preference and confirmed
              allergies remain separate.
            </p>
          </SolidCard>
        )}

        <SolidCard
          className={`p-4 ${allergyConflict ? "border-forest-green/35" : ""}`}
        >
          <div className="flex gap-3">
            {allergyConflict ? (
              <Check className="shrink-0 text-forest-green" />
            ) : (
              <AlertTriangle className="shrink-0 text-brand-orange" />
            )}
            <div>
              <h2 className="font-semibold text-paper-100">
                Restrictions checked before ranking
              </h2>
              <p className="mt-1 text-[13px] leading-5 text-paper-100/70">
                {allergyConflict
                  ? "Tree-nut allergy is confirmed. Two conflicting recipes are suppressed before CIA suggestions."
                  : "No confirmed allergies are stored. Vegan is a preference and does not replace an allergy check."}
              </p>
            </div>
          </div>
        </SolidCard>

        {!allergyConflict && (
          <CIAInsightCard
            eyebrow="CIA suggestions"
            provenance={[
              "Food log · 7 days",
              "Recipe DB · today",
              "Restriction check · none stored",
            ]}
          >
            Your logged protein is below your selected weekly target on four of
            seven days. These are optional coaching suggestions, not medical
            nutrition advice.
          </CIAInsightCard>
        )}

        {created && (
          <SolidCard className="border-forest-green/30 p-4">
            <div
              role="status"
              className="flex items-center gap-2 text-forest-green"
            >
              <Check /> Recipe saved
            </div>
            <p className="mt-1 text-[13px] text-paper-100/70">
              Your recipe is local to this visual preview.
            </p>
          </SolidCard>
        )}
        {premium && (
          <SolidCard className="p-4">
            <h2 className="font-semibold text-paper-100">Access disposition</h2>
            <p className="mt-1 text-[13px] leading-5 text-paper-100/70">
              Search, allergies, recipe detail, favorites, and manual creation
              are included. No bundled beginner recipe is premium-locked. Future
              advanced CIA meal-plan generation would use the canonical premium
              preview.
            </p>
          </SolidCard>
        )}

        {error ? (
          <SolidCard className="p-5 text-center">
            <p role="alert" className="font-semibold text-paper-100">
              Recipe search could not refresh
            </p>
            <p className="mt-1 text-[13px] text-paper-100/70">
              Bundled recipes remain visible. No network request ran.
            </p>
            <BtnSecondary className="mt-4" onClick={() => setQuery("")}>
              <RotateCcw /> Retry
            </BtnSecondary>
          </SolidCard>
        ) : filtered.length === 0 ? (
          <SolidCard className="p-6 text-center">
            <ChefHat className="mx-auto text-paper-100/40" />
            <h2 className="mt-3 font-semibold text-paper-100">
              No recipes match
            </h2>
            <p className="mt-1 text-[13px] text-paper-100/70">
              Clear the search or choose another category.
            </p>
            <BtnGhost
              className="mt-3"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setVegan(false);
              }}
            >
              Clear filters
            </BtnGhost>
          </SolidCard>
        ) : (
          <section>
            <div className="flex min-h-11 items-center justify-between">
              <h2 className="text-[12px] font-semibold uppercase tracking-wider text-paper-100/70">
                Safe matches
              </h2>
              <button
                type="button"
                className="focus-ring min-h-11 rounded-full px-3 text-[13px] text-brand-orange"
                onClick={() => setQuery("")}
              >
                See all
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 min-[340px]:grid-cols-2">
              {filtered.map((recipe) => (
                <RecipeTile
                  key={recipe.id}
                  recipe={recipe}
                  favorite={favorites.includes(recipe.id)}
                  open={() => setSelected(recipe)}
                  toggle={() => toggleFavorite(recipe.id)}
                />
              ))}
            </div>
          </section>
        )}

        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="hifi-action hifi-action-primary focus-ring flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full text-[16px] font-semibold"
        >
          <Plus /> Create recipe
        </button>
        {controls && (
          <SolidCard className="p-4">
            <h2 className="font-semibold text-paper-100">
              Recipe and media controls
            </h2>
            <p className="mt-1 text-[13px] text-paper-100/70">
              Nutrition category · recipe database · saved recipes · refreshed
              today · source-confirmed · retained until deleted. Media stays
              code-native unless you explicitly add it.
            </p>
            <ConsentRail compact controls={FULL_DATA_CONTROLS} />
          </SolidCard>
        )}
        {!controls && <ConsentRail compact controls={FULL_DATA_CONTROLS} />}
        <p className="text-center text-[12px] leading-5 text-paper-100/65">
          Allergies and restrictions outrank CIA suggestions. Coaching support,
          not medical nutrition advice.
        </p>
      </main>
    </HifiShell>
  );
}

function RecipeTile({
  recipe,
  favorite,
  open,
  toggle,
}: {
  recipe: Recipe;
  favorite: boolean;
  open: () => void;
  toggle: () => void;
}) {
  return (
    <SolidCard className="overflow-hidden p-0">
      <div
        className="relative grid aspect-[5/4] place-items-center bg-ink-900"
        role="img"
        aria-label={`${recipe.name}, code-native recipe placeholder`}
      >
        <ChefHat className="text-paper-100/30" />
        <button
          type="button"
          onClick={toggle}
          aria-label={
            favorite
              ? `Remove ${recipe.name} from favorites`
              : `Add ${recipe.name} to favorites`
          }
          aria-pressed={favorite}
          className={`focus-ring absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-full bg-ink-900/80 ${
            favorite ? "text-brand-orange" : "text-paper-100/70"
          }`}
        >
          <Heart fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>
      <button
        type="button"
        onClick={open}
        className="focus-ring min-h-[88px] w-full p-3 text-left"
        aria-label={`Open ${recipe.name} recipe detail`}
      >
        <strong className="block text-[14px] leading-5 text-paper-100">
          {recipe.name}
        </strong>
        <span className="mt-2 flex flex-wrap items-center justify-between gap-1 text-[12px] text-paper-100/70">
          <span className="flex items-center gap-1">
            <Flame />
            {recipe.calories === null
              ? "Macros unavailable"
              : `${recipe.calories} cal`}
          </span>
          <Chip tone={recipe.source.startsWith("Estimated") ? "cia" : "muted"}>
            {recipe.source}
          </Chip>
        </span>
      </button>
    </SolidCard>
  );
}

function RecipeDetail({
  recipe,
  close,
  favorite,
  toggle,
}: {
  recipe: Recipe;
  close: () => void;
  favorite: boolean;
  toggle: () => void;
}) {
  const { dialogRef, handleKeys } = useLocalDialog(close);
  return (
    <div className="absolute inset-0 z-50 flex items-end bg-ink-900/95">
      <section
        ref={dialogRef}
        onKeyDown={handleKeys}
        className="w-full rounded-t-[28px] border border-white/15 bg-ink-brown-800 p-5 shadow-3"
        role="dialog"
        aria-modal="true"
        aria-labelledby="recipe-detail-title"
      >
        <div className="flex items-center justify-between">
          <h2
            id="recipe-detail-title"
            className="text-[21px] font-semibold text-paper-100"
          >
            {recipe.name}
          </h2>
          <button
            type="button"
            className="focus-ring grid h-11 w-11 place-items-center rounded-full"
            aria-label="Close recipe detail"
            onClick={close}
          >
            <X />
          </button>
        </div>
        <div className="mt-4 grid h-36 place-items-center rounded-2xl bg-ink-900">
          <ChefHat className="text-paper-100/35" />
          <span className="sr-only">Code-native recipe placeholder</span>
        </div>
        <p className="mt-4 text-[14px] text-paper-100/75">
          {recipe.calories === null
            ? "Macros unavailable. Add verified values before logging."
            : `${recipe.calories} calories per serving.`}
        </p>
        <Provenance
          items={[
            recipe.source,
            "Recipe DB · today",
            "Restriction check complete",
          ]}
        />
        <div className="mt-4 grid grid-cols-2 gap-3">
          <BtnSecondary onClick={toggle}>
            <Heart fill={favorite ? "currentColor" : "none"} />
            {favorite ? "Saved" : "Favorite"}
          </BtnSecondary>
          <BtnPrimary onClick={close}>Log as meal</BtnPrimary>
        </div>
      </section>
    </div>
  );
}

function CreateRecipe({
  name,
  setName,
  validation,
  close,
  save,
}: {
  name: string;
  setName: (name: string) => void;
  validation: boolean;
  close: () => void;
  save: () => void;
}) {
  const invalid = validation || name.trim().length === 0;
  const { dialogRef, handleKeys } = useLocalDialog(close);
  return (
    <div className="absolute inset-0 z-50 flex items-end bg-ink-900/95">
      <section
        ref={dialogRef}
        onKeyDown={handleKeys}
        className="w-full rounded-t-[28px] border border-white/15 bg-ink-brown-800 p-5 shadow-3"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-recipe-title"
      >
        <div className="flex items-center justify-between">
          <h2
            id="create-recipe-title"
            className="text-[21px] font-semibold text-paper-100"
          >
            Create recipe
          </h2>
          <button
            type="button"
            className="focus-ring grid h-11 w-11 place-items-center rounded-full"
            aria-label="Close create recipe"
            onClick={close}
          >
            <X />
          </button>
        </div>
        <div className="mt-4">
          <GlassPillInput
            label="Recipe name"
            placeholder="Recipe name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={validation || undefined}
          />
          {invalid && (
            <p
              className="mt-2 text-[13px] text-paper-100/70"
              role={validation ? "alert" : undefined}
            >
              Add a recipe name before saving.
            </p>
          )}
          <SolidCard className="mt-4 p-4">
            <h3 className="font-semibold text-paper-100">
              Optional media consent
            </h3>
            <p className="mt-1 text-[13px] text-paper-100/70">
              No photo is required. A code-native chef placeholder is used until
              you explicitly add and can delete media.
            </p>
          </SolidCard>
          <BtnPrimary className="mt-4 w-full" disabled={invalid} onClick={save}>
            Save recipe
          </BtnPrimary>
        </div>
      </section>
    </div>
  );
}

function useLocalDialog(close: () => void) {
  const dialogRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current
      ?.querySelector<HTMLElement>(
        "button:not(:disabled), input:not(:disabled), textarea:not(:disabled), [href]"
      )
      ?.focus();
    return () => returnFocusRef.current?.focus();
  }, []);
  const handleKeys = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const controls = [
      ...(dialogRef.current?.querySelectorAll<HTMLElement>(
        "button:not(:disabled), input:not(:disabled), textarea:not(:disabled), [href]"
      ) ?? []),
    ];
    if (!controls.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  return { dialogRef, handleKeys };
}
