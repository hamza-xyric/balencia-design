const FIXED_TEXT_SIZES = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 28, 30, 34, 38] as const

// I1 keeps user text scaling local because the shared kit and globals are
// accepted cross-family surfaces. Values are pixel-identical at the default
// 16px root and follow a browser/user root-size increase as rem units.
const scope = '[data-testid="phone-frame"]:has([data-i1-state])'

const rules = FIXED_TEXT_SIZES.map(
  pixels => `${scope} .text-\\[${pixels}px\\] { font-size: ${pixels / 16}rem !important; }`,
)
  .concat(
    [3, 4, 5, 6, 7, 8, 10].map(
      step => `${scope} .leading-${step} { line-height: ${step / 4}rem !important; }`,
    ),
    ...[18, 21, 32, 34].map(
      pixels => `${scope} .leading-\\[${pixels}px\\] { line-height: ${pixels / 16}rem !important; }`,
    ),
    `${scope} .truncate { overflow: visible !important; text-overflow: clip !important; white-space: normal !important; overflow-wrap: anywhere; }`,
  )
  .join('\n')

export function I1TextScaleScope() {
  return <style data-i1-scale-ignore>{rules}</style>
}
