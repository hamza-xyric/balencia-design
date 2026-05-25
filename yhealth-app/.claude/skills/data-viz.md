# Data Visualization

Use this skill for charts, metrics, KPI cards, progress displays, and any numerical data presentation. All visualizations must use the Balencia brand palette.

## Technology Mapping

| Visualization | Tool | Reason |
|---------------|------|--------|
| Line/area/bar charts | Recharts (`LineChart`, `AreaChart`, `BarChart`) | Already used across 10+ files in codebase |
| Donut/pie charts | Recharts `PieChart` | Consistency |
| Progress rings/arcs | SVG + Framer Motion | More control for single-metric displays |
| Sparklines (inline mini) | SVG path or Recharts with hidden axes | Lightweight |
| Stat counters (animated) | GSAP + CountUp pattern | Scroll-triggered |
| Radial gauges | SVG `circle` with `stroke-dashoffset` | Existing pattern in codebase |
| Heat maps/calendars | Custom CSS grid | Recharts doesn't handle well |

## Recharts Brand Config

Create a reusable theme. Never use Recharts default colors:

```tsx
export const CHART_THEME = {
  colors: {
    primary: "var(--bal-orange)",      // #FF5E00
    secondary: "var(--bal-green)",     // #34A853
    accent: "var(--bal-purple)",       // #7F24FF
    muted: "#5C5750",
    grid: "rgba(255, 255, 255, 0.06)",
    axis: "#5C5750",
  },
  pillars: {
    fitness: "#FF5E00",    // orange
    nutrition: "#34A853",  // green
    wellbeing: "#7F24FF",  // purple
  },
  sequential: ["#1a0900", "#3d1600", "#662600", "#993800", "#CC4C00", "#FF5E00"],
} as const;
```

**Data line conventions (from brand guidelines):**
- Solid orange line = past/actual data
- Dashed purple line = AI projection/forecast
- Green dots = milestones/achievements
- Use brand gradients for area chart fills

## Chart Wrapper

Every chart lives inside a glass card with consistent structure:

```tsx
<Card data-variant="surface" className="p-6">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-base font-semibold text-white">{title}</h3>
    <span className="text-[13px] text-[#A09A92]">{timeRange}</span>
  </div>
  <ResponsiveContainer width="100%" height={chartHeight}>
    {/* chart */}
  </ResponsiveContainer>
  {/* Legend below chart, not inside */}
</Card>
```

Default aspect ratios: Landscape charts 16:9, Square gauges 1:1, Sparklines 4:1.

## Axis & Grid Styling

Exact Recharts props for brand consistency:

```tsx
<CartesianGrid
  strokeDasharray="3 3"
  stroke="rgba(255, 255, 255, 0.06)"
  vertical={false}
/>
<XAxis
  dataKey="date"
  tick={{ fill: "#5C5750", fontSize: 12, fontFamily: "var(--font-sora)" }}
  axisLine={{ stroke: "rgba(255, 255, 255, 0.08)" }}
  tickLine={false}
  tickMargin={8}
/>
<YAxis
  tick={{ fill: "#5C5750", fontSize: 12, fontFamily: "var(--font-sora)" }}
  axisLine={false}
  tickLine={false}
  tickMargin={8}
  width={48}
/>
```

## Custom Tooltip

Brand-consistent tooltip component:

```tsx
const BrandTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[var(--ink-brown-800)]/95 backdrop-blur-lg border border-white/[0.07] rounded-[var(--r-md)] px-4 py-3 shadow-[var(--shadow-2)]">
      <p className="text-[#A09A92] text-[13px] mb-1">{label}</p>
      {payload.map(entry => (
        <div key={entry.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-white text-sm font-medium tabular-nums">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};
```

## KPI Card Template

The most common data display — compact metric card with accent stripe:

```tsx
<Card data-variant="kpi" className="relative overflow-hidden">
  {/* 2px accent stripe */}
  <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-[var(--bal-orange)] to-[var(--bal-orange-light)]" />
  <CardContent className="pt-5 pb-4 px-5">
    <div className="flex items-center justify-between mb-3">
      <span className="text-[#A09A92] text-[13px]">{label}</span>
      <Icon className="w-4 h-4 text-[var(--bal-orange)]" />
    </div>
    <div className="text-2xl font-bold text-white tabular-nums">{value}</div>
    {/* Trend indicator */}
    <div className="flex items-center gap-1 mt-2 text-[13px]">
      {isPositive ? (
        <TrendingUp className="w-3 h-3 text-[var(--bal-green)]" />
      ) : (
        <TrendingDown className="w-3 h-3 text-red-400" />
      )}
      <span className={isPositive ? "text-[var(--bal-green)]" : "text-red-400"}>{delta}</span>
      <span className="text-[#5C5750]">vs last week</span>
    </div>
  </CardContent>
</Card>
```

For multi-card KPI grids, cycle accent stripe colors: 1st orange, 2nd green, 3rd purple, repeat.

## Progress Ring (SVG)

For single-metric circular gauges:

```tsx
const size = 120;
const strokeWidth = 8;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;
const offset = circumference - (percentage / 100) * circumference;
```

Animate with GSAP: `gsap.to(circleRef, { attr: { "stroke-dashoffset": offset }, duration: 1.2, ease: "power3.out" })`

**Color thresholds:** `--bal-orange` for 0-39%, `--bal-green` for 40-79%, `--bal-purple` for 80-100%.

## Counter Animation

For stat numbers that count up on scroll entry:
- Duration: 1800ms
- Easing: `power4.out`
- Format: `Intl.NumberFormat` for locale separators
- Trigger: ScrollTrigger at `start: "top 80%"`
- Fire only once per page load
- Use `tabular-nums` font feature for stable layout during animation

## Anti-Patterns

1. Never use Recharts default colors (must use `CHART_THEME`)
2. Never show more than 4 data series on a single chart — split into multiple
3. Never use 3D charts (no perspective on bar/pie)
4. Never animate chart on every re-render — only on first mount or tab switch
5. Never truncate Y-axis without marking the break
6. Never use red for positive trends or green for negative trends
7. Always show a loading skeleton for charts fetching data
8. Never render a chart without `ResponsiveContainer` wrapper
9. Never use inline `font-family` in chart components — use `var(--font-sora)`
10. Never use three-color gradients, dark gradients, or unrelated colors in chart fills
