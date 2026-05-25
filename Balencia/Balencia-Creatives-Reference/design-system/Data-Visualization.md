# Balencia Data Visualization Guidelines

> Progressive disclosure approach: glanceable home → detailed insights → rich analytics.

---

## Visualization Philosophy

### Design Principles

1. **Progressive Disclosure**: Show what's needed when it's needed.
2. **Glanceable First**: 3-second comprehension for home dashboard.
3. **Coach-Driven Insights**: AI explains data verbally; visuals support.
4. **Pillar Color Consistency**: Each pillar has its distinct visual identity.
5. **Actionable Focus**: Every visualization should suggest a next step.

### Information Hierarchy

```
Level 1: Home Dashboard (Glanceable)
├── Single aggregate score
├── 3 pillar progress rings
└── AI Coach summary

Level 2: Pillar Detail (Expandable)
├── Daily/Weekly trends
├── Key metrics breakdown
└── Insight highlights

Level 3: Deep Analytics (Rich)
├── Historical trends (7/30/90 days)
├── Correlation charts
└── Detailed breakdowns
```

---

## Chart Types

### Progress Ring

**Purpose:** At-a-glance progress toward goals.

**Usage:**
- Daily pillar scores (Fitness, Nutrition, Wellbeing)
- Goal completion percentage
- Recovery/Readiness scores

**Specifications:**
```
┌─────────────────┐
│     ╭───╮      │
│    │ 85 │      │  ← Large centered number
│     ╰───╯      │
│   Recovery     │  ← Label below
└─────────────────┘
```

| Property | Value |
|----------|-------|
| Size | 64px (compact), 120px (standard), 160px (hero) |
| Stroke width | 6px (compact), 8px (standard), 10px (hero) |
| Track color | `muted` (#2C2C2C) |
| Progress color | Pillar color |
| Animation | 1s ease-out on load |
| Text | Metric value centered, label below |

**Color by Pillar:**
- Fitness: `fitness-500` (#FF9800)
- Nutrition: `nutrition-500` (#4CAF50)
- Wellbeing: `wellbeing-500` (#5C9CE6)

### Bar Chart

**Purpose:** Comparisons across time or categories.

**Usage:**
- Weekly activity overview
- Macro nutrient breakdown
- Sleep stage distribution

**Specifications:**
```
Mon  ████████░░░░
Tue  ██████████░░
Wed  ████████████
Thu  ██████░░░░░░
```

| Property | Value |
|----------|-------|
| Bar width | 24px (mobile), 32px (desktop) |
| Bar gap | 8px |
| Bar radius | 4px (top corners) |
| Color | Single pillar color or gradient |
| Axis labels | `caption` size (12px), `muted-foreground` |
| Grid lines | `border-subtle` (#2E2E2E) |

### Line Chart

**Purpose:** Trends over time.

**Usage:**
- Weight trends
- Sleep quality over time
- Mood patterns

**Specifications:**
```
      ●
     / \    ●
    /   \  /
   ●     \/
```

| Property | Value |
|----------|-------|
| Line width | 2px |
| Line color | `primary-500` or pillar color |
| Point size | 6px diameter |
| Point on hover | 8px diameter |
| Fill | Optional gradient below line (10% opacity) |
| Grid | Horizontal only, `border-subtle` |

### Donut/Pie Chart

**Purpose:** Part-to-whole relationships.

**Usage:**
- Macro distribution (carbs/protein/fat)
- Activity type breakdown
- Time allocation

**Specifications:**
| Property | Value |
|----------|-------|
| Size | 120px (standard), 160px (large) |
| Stroke width | 24px |
| Gap between segments | 2px |
| Colors | Pillar palette or semantic |
| Center | Total or primary metric |

### Area Chart

**Purpose:** Volume over time with emphasis on magnitude.

**Usage:**
- Calorie intake trends
- Activity duration
- Sleep duration

**Specifications:**
| Property | Value |
|----------|-------|
| Line | 2px stroke |
| Fill | 20% opacity gradient |
| Color | Pillar color |

### Gauge/Arc

**Purpose:** Score on a scale with context.

**Usage:**
- Overall health score
- Recovery readiness
- Stress level

**Specifications:**
```
      ◠◡◠◡◠
        72
       Good
```

| Property | Value |
|----------|-------|
| Arc | 180° or 270° |
| Segments | Color-coded (red→yellow→green) |
| Pointer | Optional needle or highlighted segment |
| Score | Large centered number |
| Label | Contextual (Poor/Fair/Good/Excellent) |

---

## Dashboard Layouts

### Home Dashboard (Level 1)

**Design Goal:** Understand health status in 3 seconds.

```
┌──────────────────────────────────────────┐
│  Good morning, Alex                      │
│  Tuesday, December 7                     │
├──────────────────────────────────────────┤
│                                          │
│  ┌─────────┐  ┌─────────┐               │
│  │  ○ 85   │  │  ○ 72   │               │
│  │ Fitness │  │Nutrition│               │
│  └─────────┘  └─────────┘               │
│                                          │
│  ┌─────────┐  ┌─────────┐               │
│  │  ○ 78   │  │  ○ 81   │               │
│  │Wellbeing│  │  Sleep  │               │
│  └─────────┘  └─────────┘               │
│                                          │
│  ┌──────────────────────────────────────┐│
│  │ 💡 Your workouts are 40% better     ││
│  │    after 7+ hours of sleep.         ││
│  │                        [Learn More] ││
│  └──────────────────────────────────────┘│
│                                          │
└──────────────────────────────────────────┘
```

**Key Elements:**
1. **Greeting & Date** - Personal, time-aware
2. **4 Pillar Rings** - Glanceable scores
3. **AI Insight Card** - One actionable insight

### Pillar Detail (Level 2)

**Design Goal:** Understand one pillar deeply.

```
┌──────────────────────────────────────────┐
│  ← Fitness                               │
├──────────────────────────────────────────┤
│                                          │
│  ┌──────────────────────────────────────┐│
│  │        ○ 85                          ││
│  │     Recovery Score                   ││
│  │     ▲ 12% from yesterday             ││
│  └──────────────────────────────────────┘│
│                                          │
│  [Day] [Week] [Month]                    │
│                                          │
│  Weekly Trend                            │
│  ┌──────────────────────────────────────┐│
│  │    ●                                 ││
│  │   / \    ●                           ││
│  │  /   \  / \   ●                      ││
│  │ ●     \/   \ /                       ││
│  │             ●                        ││
│  │ M  T  W  T  F  S  S                  ││
│  └──────────────────────────────────────┘│
│                                          │
│  Today's Metrics                         │
│  ┌────────────┐ ┌────────────┐          │
│  │ 8,432      │ │ 45 min     │          │
│  │ Steps      │ │ Active     │          │
│  └────────────┘ └────────────┘          │
│                                          │
└──────────────────────────────────────────┘
```

**Key Elements:**
1. **Hero Score** - Primary metric large
2. **Time Range Toggle** - Day/Week/Month
3. **Trend Chart** - Line chart for pattern
4. **Supporting Metrics** - Compact cards

### Deep Analytics (Level 3)

**Design Goal:** Data exploration for enthusiasts.

```
┌──────────────────────────────────────────┐
│  ← Analytics                             │
├──────────────────────────────────────────┤
│  [7D] [30D] [90D] [1Y]                   │
│                                          │
│  Sleep vs Performance Correlation        │
│  ┌──────────────────────────────────────┐│
│  │     ●  ●                             ││
│  │   ●  ●●  ●                           ││
│  │  ●    ●●   ●                         ││
│  │ ●       ●                            ││
│  │________________________              ││
│  │ Sleep Hours                          ││
│  └──────────────────────────────────────┘│
│                                          │
│  Key Insight                             │
│  "Performance peaks at 7.5h sleep"       │
│                                          │
│  Detailed Breakdown                      │
│  ┌──────────────────────────────────────┐│
│  │ Metric        Avg    Best   Trend    ││
│  │ Sleep         7.2h   8.5h   ▲ 5%     ││
│  │ Recovery      78     92     ▲ 8%     ││
│  │ Strain        12.4   18.2   ▼ 3%     ││
│  └──────────────────────────────────────┘│
│                                          │
└──────────────────────────────────────────┘
```

**Key Elements:**
1. **Extended Time Ranges** - Up to 1 year
2. **Correlation Charts** - Scatter plots, multi-line
3. **AI-Generated Insights** - Key findings highlighted
4. **Data Tables** - Detailed metrics

---

## Color Usage in Charts

### Single Pillar Context

When showing data for one pillar, use that pillar's color:

| Pillar | Primary | Light | Dark |
|--------|---------|-------|------|
| Fitness | `#FF9800` | `#FFE0B2` | `#E65100` |
| Nutrition | `#4CAF50` | `#C8E6C9` | `#2E7D32` |
| Wellbeing | `#5C9CE6` | `#BBDEFB` | `#1565C0` |

### Multi-Pillar Context

When comparing across pillars:
- Use each pillar's primary color
- Ensure sufficient contrast between colors
- Consider colorblind-safe palettes

### Semantic Colors in Charts

| Meaning | Color | Usage |
|---------|-------|-------|
| Positive trend | `success` (#81C784) | Improvements |
| Negative trend | `error` (#E57373) | Declines |
| Neutral/average | `muted-foreground` | Baseline |
| Target/goal | `primary-500` | Goal lines |

### Data Density Coloring

For heat maps or density visualizations:

```
Low ────────────────────────────── High
#2C2C2C  #1E4D2E  #2E7D32  #4CAF50  #81C784
```

---

## Animation Guidelines

### Chart Load Animations

| Chart Type | Animation | Duration |
|------------|-----------|----------|
| Progress Ring | Draw stroke clockwise | 1s |
| Bar Chart | Grow from bottom | 600ms staggered |
| Line Chart | Draw left to right | 800ms |
| Donut | Segments appear sequentially | 800ms |

### Data Update Animations

| Change Type | Animation |
|-------------|-----------|
| Value increase | Count up + scale pulse |
| Value decrease | Count down |
| New data point | Fade in + slide |
| Trend change | Smooth morph |

### Interaction Animations

| Interaction | Animation |
|-------------|-----------|
| Hover on data point | Scale up, show tooltip |
| Select time range | Cross-fade charts |
| Expand detail | Slide/expand transition |

---

## Accessibility

### Color Independence

Never rely on color alone:
- Add patterns to differentiated areas
- Include value labels
- Use icons alongside color indicators

```
✓ Goal Met (green checkmark + text)
✗ Not Met (red x + text)
```

### Screen Reader Support

```html
<!-- Chart with accessible description -->
<div role="img" aria-label="Recovery score: 85 out of 100, up 12% from yesterday">
  <svg><!-- Progress ring --></svg>
</div>

<!-- Data table alternative -->
<table class="sr-only">
  <caption>Weekly fitness scores</caption>
  <!-- Full data in table format -->
</table>
```

### Touch Targets

- Data points: Minimum 44×44px touch area
- Legend items: Minimum 44px height
- Time range toggles: 44×44px

---

## Responsive Behavior

### Mobile (< 640px)

- Single column layout
- Compact chart sizes (64px rings)
- Simplified labels
- Swipe for time ranges

### Tablet (640px - 1024px)

- 2-column grid for cards
- Standard chart sizes
- Full labels
- Tabs for time ranges

### Desktop (> 1024px)

- Multi-column layouts
- Large chart sizes
- Detailed tooltips on hover
- Side-by-side comparisons

---

## Chart Component Specs

### Progress Ring Component

```tsx
interface ProgressRingProps {
  value: number;           // 0-100
  max?: number;            // Default 100
  size: 'sm' | 'md' | 'lg' | 'xl';
  pillar: 'fitness' | 'nutrition' | 'wellbeing' | 'primary';
  label?: string;
  showValue?: boolean;
  animated?: boolean;
}

// Sizes
const sizes = {
  sm: { diameter: 48, stroke: 4 },
  md: { diameter: 80, stroke: 6 },
  lg: { diameter: 120, stroke: 8 },
  xl: { diameter: 160, stroke: 10 }
};
```

### Line Chart Component

```tsx
interface LineChartProps {
  data: { x: Date | number; y: number }[];
  xAxis: { label: string; format: (v) => string };
  yAxis: { label: string; min?: number; max?: number };
  color: string;
  showGrid?: boolean;
  showPoints?: boolean;
  fillArea?: boolean;
  height: number;
}
```

### Bar Chart Component

```tsx
interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  orientation: 'horizontal' | 'vertical';
  showLabels?: boolean;
  showValues?: boolean;
  height: number;
  barWidth?: number;
  gap?: number;
}
```

---

## Best Practices

### Do's

- Use consistent pillar colors across all charts
- Provide context (vs yesterday, vs goal, vs average)
- Show trends, not just current values
- Include AI-generated insights with data
- Animate meaningful changes
- Provide drill-down paths

### Don'ts

- Don't show more than 5 data series on one chart
- Don't use 3D effects
- Don't truncate axes in misleading ways
- Don't auto-play complex animations
- Don't require hover for essential info
- Don't use pie charts for more than 5 segments

---

## Empty States

### No Data Yet

```
┌──────────────────────────────────────────┐
│                                          │
│           [Illustration]                 │
│                                          │
│      Start logging to see trends         │
│                                          │
│         [Log Your First Entry]           │
│                                          │
└──────────────────────────────────────────┘
```

### Insufficient Data

```
┌──────────────────────────────────────────┐
│                                          │
│         3 more days needed               │
│      to show weekly trends               │
│                                          │
│          ○ ○ ○ ● ● ● ●                  │
│                                          │
└──────────────────────────────────────────┘
```

### Error State

```
┌──────────────────────────────────────────┐
│                                          │
│      Couldn't load your data             │
│                                          │
│            [Try Again]                   │
│                                          │
└──────────────────────────────────────────┘
```

---

*Balencia Data Visualization v1.0 | Progressive disclosure, pillar-aware, accessible*
