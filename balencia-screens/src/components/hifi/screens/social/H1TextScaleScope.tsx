const H1_SCREEN_IDS = [39, 40, 46, 47, 64, 78, 82, 91, 94, 95] as const;

// The shared kit is an accepted cross-family surface, so H1 keeps its text-size
// compatibility local. These values are pixel-identical at the 16px default
// root and respond to browser/user root text scaling as rem units should.
const KIT_FIXED_TEXT_SIZES = [
  10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 28, 38,
] as const;

const h1Scope = `[data-testid="phone-frame"]:has(:is(${H1_SCREEN_IDS.map(
  (id) => `[data-h1-state^="${id}-"]`
).join(",")}))`;

const remCompatibility = KIT_FIXED_TEXT_SIZES.map(
  (pixels) =>
    `${h1Scope} .text-\\[${pixels}px\\] { font-size: ${pixels / 16}rem !important; }`
)
  .concat(
    [3, 4, 5, 6, 7, 8, 10].map(
      (step) =>
        `${h1Scope} .leading-${step} { line-height: ${step / 4}rem !important; }`
    ),
    `${h1Scope} .leading-\\[21px\\] { line-height: 1.3125rem !important; }`,
    `${h1Scope} .truncate.text-\\[17px\\] { overflow: visible !important; text-overflow: clip !important; white-space: normal !important; overflow-wrap: anywhere; }`
  )
  .join("\n");

export function H1TextScaleScope() {
  return <style data-h1-scale-ignore>{remCompatibility}</style>;
}
