# Balencia City — 3D Design Brief

> **Project**: Balencia (by Xyric Solutions)
> **Document**: 3D Asset Design Brief for External Designer
> **Version**: 1.0
> **Date**: 2026-05-21
> **Prepared by**: Hamza Muqeem

---

## 1. Project Overview

### What Is Balencia City?

Balencia is a personal life-tracking platform built around a single metaphor: **your life is an ecosystem**. The centerpiece of the product's landing page is an interactive 3D cityscape — **Balencia City** — where each building represents one dimension of the user's life.

There are **10 life modules**, each with its own architecturally distinct building:

| # | Module | Building Type | Concept |
|---|--------|--------------|---------|
| 1 | Sleep & Rest | Victorian Home | Rest as the foundation of everything |
| 2 | Fitness | Sports Arena | Physical vitality and movement |
| 3 | Nutrition | Farmer's Market & Bistro | Nourishment and mindful eating |
| 4 | Wellbeing | Wellness Center & Spa | Emotional and mental health |
| 5 | Career | Corporate Tower | Professional growth and ambition |
| 6 | Productivity | Co-Working Campus | Systems, focus, and output |
| 7 | Finance | Neoclassical Bank | Wealth, security, and stability |
| 8 | Relationships | Community Plaza | Connection and belonging |
| 9 | Faith & Spirituality | Universal Pavilion | Meaning, purpose, and transcendence |
| 10 | Meditation | Zen Garden | Stillness, mindfulness, and inner peace |

The city is viewed from an elevated isometric-like camera angle. Buildings start as dark silhouettes, then progressively illuminate with colored accents as the user scrolls — revealing the interconnected nature of life's dimensions.

### What We Need From You

**20 GLB model files** — one exterior and one interior scene per building.

Each building must:
- Be instantly recognizable by its function from silhouette alone
- Use a dark, premium material palette with colored light accents
- Follow the 5-slot material naming system described in Section 4
- Have a matching interior room that reflects the module's theme

---

## 2. Art Direction

### 2.1 Overall Aesthetic

**"Gotham meets premium SaaS."**

Think of a high-end tech product visualization crossed with a cinematic dark city. The city is viewed at night under warm artificial light. Buildings are near-monochrome dark forms — almost black — with module-specific colored light as the only vivid color.

**What this IS:**
- Dark, sophisticated, cinematic
- High contrast — very dark surfaces, very bright emissive highlights
- Premium and polished, like a luxury brand product render
- Each building architecturally distinct and recognizable at a glance

**What this is NOT:**
- Not Lego City or cartoon/toy aesthetic
- Not neon-soaked cyberpunk
- Not photorealistic or hyper-detailed
- Not bright, cheerful, or daytime
- Not low-effort procedural boxes with window grids

### 2.2 Design Inspiration

The city draws from several influences:

**Rollercoaster Tycoon** — Every building type is instantly recognizable by its function from a bird's-eye view. A hospital looks like a hospital. A gym looks like a gym. Apply this clarity to all 10 buildings.

**Valencia, Spain architecture** — The product name "Balencia" evokes Valencia — a city known for mixing Gothic, Baroque, and ultra-modern architecture. The City of Arts and Sciences (Calatrava) is a reference for the futuristic-meets-classical tension.

**Premium SaaS landing pages** — The dark canvas, sophisticated color accents, and cinematic atmosphere are drawn from premium software product pages (Linear, Vercel, Raycast). Clean, intentional, nothing extraneous.

### 2.3 Lighting

The city uses cinematic 3-point lighting:

**Key Light** — A warm directional light from the upper-left, casting long shadows. Color: warm off-white with a slight orange tint. This is the primary light source, as if from a distant warm streetlight or setting sun.

**Fill Light** — A cool hemisphere light. Sky color is a deep cool blue. Ground color is near-black. This prevents pure-black shadows while maintaining the dark mood.

**Rim Light** — A warm orange spotlight from the upper-right-rear, creating subtle edge highlights on building silhouettes. This separates buildings from the dark background.

**Street Lights** — 6 warm orange point lights positioned along the roads between buildings, creating soft pools of light on the ground. Each has a visible lamp post.

**Environment** — A dark nighttime HDRI provides subtle reflections on glass and metal surfaces. The HDRI is used for reflections only, not as a visible sky.

### 2.4 Atmosphere

The city has layered atmospheric effects:

- **Ground fog**: Thick near ground level (Y=0), fading by mid-building height. Dark smoke-grey color. Buildings appear to emerge from a dark mist.
- **Dust motes**: Slow-drifting particles throughout the scene. Very subtle, low opacity. Adds organic life to the scene.
- **Light shafts**: 2-3 faint cone-shaped volumetric light beams angling down through the scene. Warm-tinted, extremely subtle. Creates the impression of light breaking through darkness.

---

## 3. City Layout

### 3.1 Arrangement

The 10 buildings are arranged in a roughly 3-column, 4-row grid pattern, connected by roads and walkways. The city is viewed from above at an angle (approximately 45-degree elevation).

**Front Row (closest to camera):**
- Left: **Sleep & Rest** (Victorian Home)
- Center: **Fitness** (Sports Arena)
- Right: **Nutrition** (Farmer's Market)

**Middle Row:**
- Left: **Wellbeing** (Wellness Center)
- Center-Left: **Career** (Corporate Tower) — tallest building, dominates the center
- Center-Right: **Productivity** (Co-Working Campus)
- Right: **Finance** (Bank)

**Back Row (furthest from camera):**
- Left: **Relationships** (Community Plaza)
- Center: **Faith & Spirituality** (Universal Pavilion) — second tallest, prominent dome
- Right: **Meditation** (Zen Garden) — lowest structure

### 3.2 City Dressing

Between and around the buildings:

- **Roads**: Dark grey asphalt connecting all buildings in a grid. Subtle lane markings.
- **Sidewalks**: Slightly lighter grey borders along roads.
- **Generic filler buildings**: 8-12 small, featureless dark buildings scattered around the periphery. These are background props — simple rectangular forms in varying heights, no detail needed. They establish that this is a city, not 10 isolated buildings.
- **Trees**: 15-20 stylized dark trees (conical/evergreen silhouette) placed along roads and in clusters. Low detail.
- **Street lamps**: 6 warm-glow lamp posts positioned at road intersections.
- **Ground plane**: Large dark ground surface extending beyond the city edges, fading into darkness.
- **Ground circles**: Each module building sits on a subtle circular ground highlight that glows with the module's accent color when the building is active.

### 3.3 Height Variation

Height variation is critical for a readable skyline:

| Building | Relative Height | Notes |
|----------|----------------|-------|
| Career (Tower) | Tallest (6 units) | Dominates the skyline — must be significantly taller than everything else |
| Faith (Pavilion) | Second tallest (3.6 units) | The dome peak is the second-highest point |
| Fitness (Arena) | Tall (3.8 units) | Curved roof adds dramatic height |
| Finance (Bank) | Medium-tall (3.5 units) | Classical pediment adds visual height |
| Wellbeing (Center) | Medium (3.2 units) | Gazebo peak is the high point |
| Productivity (Campus) | Medium (3.2 units) | Clock tower element is the high point |
| Sleep (Home) | Medium (3.0 units) | Roof peak with chimney |
| Relationships (Plaza) | Medium-low (2.9 units) | Archway is the high point — otherwise open and flat |
| Nutrition (Market) | Medium-low (2.8 units) | Restaurant building is the high point; stalls are lower |
| Meditation (Garden) | Lowest (2.5 units) | Deliberately horizontal and ground-hugging — emphasizes stillness |

---

## 4. Material System

### 4.1 The 5-Slot Convention

Every building uses exactly **5 named materials**. This naming is required for the web application to control lighting and animation programmatically. The designer must name materials exactly as specified.

| Slot | Material Name | What It Covers | Inactive Look | Active Look |
|------|--------------|----------------|---------------|-------------|
| **base** | `base` | Primary walls, floors, structural surfaces | Very dark charcoal (#1E1E28), matte, no glow | No change — stays dark |
| **accent** | `accent` | Module-colored architectural features (roof trim, signage, decorative elements) | Dark grey (#2A2A38), no glow | Glows with the module's accent color |
| **glass** | `glass` | Windows, transparent/reflective panels | Very dark (#0F0F18), slightly reflective | Warm interior glow, as if lights turned on inside |
| **detail** | `detail` | Columns, fences, railings, small props, trim | Near-black (#16161E), matte | No change — stays dark |
| **emissive** | `emissive` | LED strips, signage text, lanterns, light fixtures — anything that glows | Faint dim glow (barely visible) | Bright, vivid glow in the module's accent color |

### 4.2 Key Rules

1. **Module color appears ONLY on accent and emissive materials.** Never paint a building surface in the module color. The base and detail materials are always dark neutrals.
2. **All buildings share the same dark palette** for base and detail. The only visual difference between buildings comes from their architecture and their accent/emissive color.
3. **Glass shows interior life.** When a building is "active," its windows should glow warmly, as if someone turned the lights on inside. When inactive, windows are dark and reflective.
4. **Emissive is for light sources only.** Signage letters, LED strips, lanterns, light fixtures, glowing architectural features. These are the brightest elements in the scene.

### 4.3 The 10 Module Colors

These colors appear ONLY as emissive/accent glow, never as surface paint:

| Module | Color Name | Hex Code | Visual |
|--------|-----------|----------|--------|
| Sleep & Rest | Indigo | `#6366F1` | Cool purple-blue — calming, nighttime |
| Fitness | Orange | `#FF6B00` | Warm, energetic, dynamic |
| Nutrition | Green | `#81C784` | Fresh, natural, organic |
| Wellbeing | Blue | `#64B5F6` | Serene, clear, balanced |
| Career | Gold | `#FFD700` | Ambitious, prestigious, warm |
| Productivity | Lime | `#84CC16` | Sharp, focused, digital |
| Finance | Emerald | `#10B981` | Stable, prosperous, trustworthy |
| Relationships | Red | `#FF6B6B` | Warm, passionate, human |
| Faith & Spirituality | Amber | `#F59E0B` | Sacred, warm, transcendent |
| Meditation | Teal | `#00BCD4` | Still, reflective, deep |

---

## 5. Building Specifications — Exteriors

Each building below is described with enough architectural detail to model from description alone. Every building must be recognizable by silhouette at thumbnail size.

---

### 5.1 Sleep & Rest — Victorian Home

**Architectural Style**: Cozy 2-story Victorian residence — the only residential building in the city.

**Why It Works**: In a city of commercial and public buildings, a house immediately reads as "home" and "rest." The pitched roof and chimney are universal symbols of domestic comfort.

**Key Exterior Elements**:
- Steep mansard or gabled roof with slate-like texture
- Prominent brick chimney with a faint indigo glow from inside (emissive)
- 2 dormer windows on the upper floor, 3 windows on the ground floor
- Wraparound front porch with 4 thin columns and a railing
- Crescent moon weather vane on the roof peak (emissive — glows indigo when active)
- White picket fence along the front, with a garden path leading to the front door
- Mailbox at the curb
- Small garden beds flanking the path

**Silhouette Test**: Pitched roof + chimney = instant "house" read. No other building in the city has a residential roofline.

**Color Treatment**:
- `base`: Dark wood/stone walls (#1E1E28)
- `accent`: Indigo (#6366F1) on roof trim, door frame, porch light housing
- `glass`: Windows glow warm amber (#FEF3C7) when active — like a cozy lit home at night
- `detail`: Fence, porch columns, mailbox (#16161E)
- `emissive`: Chimney inner glow, crescent moon weather vane, window edge light strips

---

### 5.2 Fitness — Modern Sports Arena

**Architectural Style**: Contemporary sports facility with a dramatic curved roof — the most dynamic silhouette in the city.

**Why It Works**: The sweeping curved roof (like a natatorium or velodrome) is unmistakably athletic. Flood lights and a running track complete the "sports" read.

**Key Exterior Elements**:
- Main building with a dramatic curved/arched roof (imagine a modern Olympic venue)
- Large glass curtain wall on the front face, showing the gym interior when active
- Outdoor training area beside the building (pull-up bars, equipment racks)
- Running track loop with orange lane markings wrapping around the base
- Electronic scoreboard mounted on the side wall (emissive)
- 2 tall stadium flood lights on poles flanking the entrance
- "FITNESS" signage above the entrance (emissive)
- Revolving door entrance

**Silhouette Test**: The curved roof is unique in the city. No other building has this swooping, athletic form.

**Color Treatment**:
- `base`: Dark concrete walls (#1E1E28)
- `accent`: Orange (#FF6B00) on curved roof edge, running track lanes, scoreboard frame, equipment highlights
- `glass`: Dark reflective curtain wall; active: orange-tinted interior glow
- `detail`: Flood light poles, pull-up bars, door frames (#16161E)
- `emissive`: Scoreboard display, "FITNESS" signage, floor-level light strips along entrance

---

### 5.3 Nutrition — Farmer's Market & Bistro

**Architectural Style**: An open-air market complex with a restaurant building — part upscale farmers market, part trendy bistro.

**Why It Works**: Striped awnings, a food truck, and visible produce displays instantly communicate "food." The hybrid market/restaurant format feels premium and curated.

**Key Exterior Elements**:
- Main restaurant building with a glass-fronted bar counter visible inside
- 3 adjacent open-air market stalls with striped canvas awnings (green-and-white stripes)
- A parked food truck to one side (detailed: visible wheels, serving window, small menu board)
- Wooden crates and pallets stacked with produce (simple box forms, green accent)
- Herb planters on the sidewalk (small green forms)
- Kitchen vent/chimney on the restaurant roof
- Chalkboard menu sign at the entrance
- String lights strung between the stalls (emissive)

**Silhouette Test**: The cluster of awnings + food truck is unique. No other building has this market-stall arrangement.

**Color Treatment**:
- `base`: Dark wood/brick walls (#1E1E28)
- `accent`: Green (#81C784) on awning stripes, herb planters, produce highlights, "FRESH" signage
- `glass`: Restaurant windows; active: warm interior glow showing bar counter
- `detail`: Wooden crates, table, stall frame posts (#16161E)
- `emissive`: String lights, menu board backlight, kitchen window glow, signage

---

### 5.4 Wellbeing — Wellness Center & Spa

**Architectural Style**: A garden wellness compound with a hexagonal gazebo as its centerpiece — organic and open, contrasting with the angular buildings around it.

**Why It Works**: The hexagonal form and fountain create a distinctly organic, peaceful silhouette. This is the "breathing room" building — softer and more natural than its neighbors.

**Key Exterior Elements**:
- Central hexagonal gazebo with a peaked roof and 6 thin columns
- Circular 3-tier fountain in the center of the gazebo (water glows blue when active)
- Walking paths with stepping stones radiating outward from the gazebo
- Flower beds in concentric rings (small colored planes — subtle)
- A meditation bench along one path
- Small clinic/spa building adjacent, with large glass panels
- Lattice panels with climbing vine geometry along the perimeter
- Paper lanterns on thin wires between posts (emissive)

**Silhouette Test**: The hexagonal peaked roof + circular fountain is unique. No other building has this organic, gazebo-centered layout.

**Color Treatment**:
- `base`: Dark stone walls (#1E1E28)
- `accent`: Blue (#64B5F6) on fountain water, clinic glass glow, walking path embedded lights
- `glass`: Clinic/spa windows; active: cool blue interior light
- `detail`: Gazebo columns, lattice panels, bench (#16161E)
- `emissive`: Fountain water surface, path edge lights, paper lanterns, clinic signage

---

### 5.5 Career — Corporate Tower

**Architectural Style**: A sleek glass-and-steel skyscraper with a distinctive angular crown — the tallest building in the city by a significant margin.

**Why It Works**: The corporate tower is the most universally understood symbol for "career" and "ambition." Its height dominance over every other building reinforces the message of aspiration and growth.

**Key Exterior Elements**:
- Glass curtain wall facade showing visible floor plates (4-5 floors visible through the glass)
- Angular crown/spire at the top with a gold finial (the highest point in the city)
- Ground-level: revolving door entrance with a modern glass canopy
- Smaller annexe building connected by an enclosed skybridge at the 3rd floor
- Rooftop helipad on the annexe (circle with H marking)
- Flagpole at the main entrance
- Parking structure visible at the base (simple ramp form)
- Corporate logo/name signage near the top (emissive gold)

**Silhouette Test**: The tallest structure by far, with a distinctive crown/spire. Unmistakable.

**Color Treatment**:
- `base`: Dark steel/glass (#1E1E28)
- `accent`: Gold (#FFD700) on crown/spire, logo, entrance signage, elevator shaft trim
- `glass`: Full curtain wall — dark reflective when inactive; warm gold floor-by-floor glow when active
- `detail`: Skybridge structure, helipad surface, entrance canopy (#16161E)
- `emissive`: Crown peak beacon, corporate signage, window edge lights per floor, helipad lights

---

### 5.6 Productivity — L-Shaped Co-Working Campus

**Architectural Style**: A modern L-shaped campus building with a rooftop terrace and a clock tower element — Silicon Valley tech office meets dark mode.

**Why It Works**: The L-shape creates an interesting footprint distinct from the rectangular tower nearby. The clock tower subtly references "time management" and "productivity." The rooftop terrace with visible greenery signals a modern, progressive workspace.

**Key Exterior Elements**:
- L-shaped footprint, 2-3 stories with a modern flat roof
- Visible rooftop terrace with tables, chairs, railing, and planter boxes
- Large front window wall showing the open-plan workspace inside
- Clock tower element on one corner (analog clock face, emissive hands and numbers)
- Solar panels on one section of the roof (flat geometric grid)
- Bike rack at the main entrance
- "PRODUCTIVITY HUB" signage over the entrance
- Green rooftop planters visible from ground level

**Silhouette Test**: The L-shape + clock tower element is unique. Visually distinct from the rectangular Career tower.

**Color Treatment**:
- `base`: Dark concrete (#1E1E28)
- `accent`: Lime (#84CC16) on rooftop planters, clock face glow, digital display frames, entrance signage
- `glass`: Large front windows; active: lime-tinted interior glow
- `detail`: Solar panels, bike rack, door frames (#16161E)
- `emissive`: Clock face and hands, monitor/screen glow visible through windows, signage text

---

### 5.7 Finance — Neoclassical Bank

**Architectural Style**: A grand neoclassical bank with fluted columns and a pediment — the only classical building in a modern city, creating deliberate contrast and gravitas.

**Why It Works**: Classical bank architecture is a universal symbol for "finance," "wealth," and "stability." The 6 columns create an imposing facade that reads as authority and permanence. In a city of modern buildings, this classical outlier demands attention.

**Key Exterior Elements**:
- 6 tall fluted columns across the front portico (Corinthian or Ionic capitals)
- Deep entablature above the columns (architrave + frieze + cornice)
- Triangular pediment with a coin or shield relief in the tympanum
- Grand entrance staircase — 8 wide stone steps with brass handrails
- Massive vault door visible behind the glass entrance (circular, heavy, industrial)
- ATM kiosk beside the main entrance (small, emissive screen)
- Security cameras mounted at corners (small detail)
- "FINANCE INSTITUTE" text engraved in stone above the columns

**Silhouette Test**: The colonnade + pediment is completely unique in the city. No other building has a classical facade.

**Color Treatment**:
- `base`: Dark stone (#1E1E28) — imagine dark granite or basalt
- `accent`: Emerald (#10B981) on vault door rim glow, column capital highlights, ticker display frames
- `glass`: Windows behind columns; active: shows emerald-tinted vault interior glow
- `detail`: Columns, staircase, handrails, security fixtures (#16161E)
- `emissive`: Vault door rim light, ATM screen, stock ticker displays, engraved signage letters

---

### 5.8 Relationships — Open-Air Community Plaza

**Architectural Style**: An open-air gathering space — the only structure without full walls or a roof. This is a plaza, not a building, creating visual breathing room in the city.

**Why It Works**: The openness is the point. While other modules have enclosed buildings, "relationships" is represented by shared space — where people come together. The heart sculpture and amphitheater seating are immediate symbols of community and connection.

**Key Exterior Elements**:
- Central raised stage platform with 3 steps on all sides
- Amphitheater-style semicircular seating (3 tiered rows of stone benches)
- Decorative archway as the main entrance (tall, welcoming, red accent trim)
- String lights crisscrossing overhead between 4 tall lamp posts
- Playground swing set to one side (2 swings, A-frame)
- Heart-shaped sculpture on a pedestal at center stage (the glowing centerpiece)
- Benches arranged in conversational groupings around the perimeter (3-4 clusters)
- Community bulletin board near the entrance

**Silhouette Test**: The archway + amphitheater seating + heart sculpture create a uniquely open profile. No other structure is this horizontal and open.

**Color Treatment**:
- `base`: Dark stone/concrete (#1E1E28)
- `accent`: Red (#FF6B6B) on heart sculpture, archway trim, string light housings
- `glass`: Not applicable (open-air structure)
- `detail`: Stone seating tiers, lamp posts, bench legs, swing frame (#16161E)
- `emissive`: Heart sculpture (vivid glowing red), string lights, stage footlights, bulletin board backlight

---

### 5.9 Faith & Spirituality — Universal Pavilion

**Architectural Style**: A domed spiritual pavilion that blends elements from multiple traditions — the most architecturally ornate building in the city, and the second tallest after the Career tower.

**Why It Works**: The dome is the most distinctive architectural form in the city. It is designed to be inclusive — not identifiable as any single religion. The combination of dome, columns, stained glass, and bell tower creates a universally "sacred" feeling.

**Key Exterior Elements**:
- Large dome (smooth, 48+ segments) with a gold finial at the peak — a combined crescent and orb symbol
- 8 columns around the base of the dome with stained glass panels between them
- Adjacent bell tower (shorter than the dome, with a visible bell)
- 7 wide ceremonial approach steps leading up to the main entrance
- Candle array at the entrance — 10-12 individual candle holders (emissive flames)
- 5 meditation stones arranged near the approach (smooth natural boulders)
- Ornate double doors with arched tops
- The design avoids any single religious iconography — it is universal and inclusive

**Silhouette Test**: The dome + finial is the most unique form in the city. The bell tower adds asymmetry. Unmistakable.

**Color Treatment**:
- `base`: Dark stone (#1E1E28)
- `accent`: Amber (#F59E0B) on dome surface highlights, stained glass warm tones, candle flames, finial
- `glass`: Stained glass panels between columns — multicolor but amber-dominant; active: warm amber light spills outward
- `detail`: Columns, steps, meditation stones, door frame (#16161E)
- `emissive`: Gold finial, candle flames, interior floor glow visible through stained glass, bell

---

### 5.10 Meditation — Japanese Zen Garden

**Architectural Style**: A horizontal Japanese zen garden compound — the lowest, most spread-out structure in the city. It hugs the ground while everything else reaches upward.

**Why It Works**: The deliberate horizontal emphasis communicates groundedness and stillness. The torii gate and raked sand garden are immediately recognizable as "zen" and "meditation." Being the lowest structure reinforces the contrast with the Career tower's ambition.

**Key Exterior Elements**:
- Torii gate at the entrance (traditional proportions, teal accent color)
- Raked sand garden (karesansui) — visible parallel lines in the sand with 5 carefully placed stones
- Koi pond with a small arched bridge crossing it
- Open-sided meditation pavilion with a curved Japanese-style roof and 4 pillars
- Bamboo fence along the perimeter
- Stone lantern (ishidoro) beside the path (emissive)
- Bonsai tree on a pedestal near the pavilion
- Stepping stones leading through the garden from torii gate to pavilion

**Silhouette Test**: The torii gate + curved pavilion roof + horizontal spread is unique. The only ground-level structure in the city.

**Color Treatment**:
- `base`: Dark wood (#1E1E28)
- `accent`: Teal (#00BCD4) on torii gate crossbeams, pond water surface glow, pavilion roof edge
- `glass`: Not applicable (open-sided pavilion)
- `detail`: Bamboo fence, stone lantern body, bridge, stepping stones (#16161E)
- `emissive`: Koi pond water glow, stone lantern light, stepping stone edge lights, pavilion roof trim glow

---

## 6. Building Specifications — Interiors

Each building has a matching interior room. The interior represents what happens "inside" each life module — the personal, private experience of that dimension.

Interiors are separate scenes (separate GLB files) that load when a user clicks a building. They should feel like zooming into the heart of each module.

**General Interior Guidelines**:
- Each room has 3-4 walls, a floor, and a ceiling (or open roof where appropriate)
- One wall should have a window or opening that implies connection to the outside
- Each room has a **focal point** — a single central element the camera will target
- 6-8 props that tell the story of the module
- Same 5-slot material system as exteriors
- Lighting should feel intimate and warm compared to the city exterior

---

### 6.1 Sleep & Rest — The Bedroom

**Focal Point**: A large, inviting bed with pillows and a blanket — center of the room.

**Room Mood**: Warm, safe, cozy. Moonlight streams through the window. Everything says "rest."

**Key Props**:
1. Large bed with pillows and draped blanket (center)
2. Nightstand with a glowing bedside lamp (emissive, warm)
3. Window with moonlight streaming in (blue-white light cone)
4. Sleep tracker device on the nightstand (small screen with ambient indigo glow)
5. Star projector casting dots on the ceiling (emissive points)
6. Soft area rug on a wooden floor
7. Framed artwork on the wall (simple rectangular frame)
8. Small bookshelf against one wall

**Surfaces**:
- Floor: Dark wood planks
- Walls: Dark matte plaster
- Ceiling: Dark with star projector dots (emissive indigo)

---

### 6.2 Fitness — The Gym Floor

**Focal Point**: A weight rack with barbells — center-left of the room.

**Room Mood**: Industrial, energetic, gritty. Exposed ceiling ducts and pendant lights. Rubber floor mats.

**Key Props**:
1. Weight rack with barbells and dumbbells (center-left)
2. 2 treadmills against the back wall
3. Punching bag hanging from the ceiling
4. Rubber floor mats (textured)
5. Large mirror on one wall (reflective material)
6. Digital workout stats display (emissive screen, orange)
7. Kettlebells and medicine balls grouped on the floor
8. Exposed ceiling ducts with industrial pendant lights

**Surfaces**:
- Floor: Dark rubber gym matting
- Walls: Dark concrete/industrial
- Ceiling: Open — visible ducts, beams, hanging lights

---

### 6.3 Nutrition — The Kitchen & Dining Room

**Focal Point**: An open chef's counter with a cutting board — center of the room.

**Room Mood**: Warm, inviting, artisanal. A space where food is prepared with care. Hanging copper pots, fresh ingredients.

**Key Props**:
1. Open kitchen counter with cutting boards and vegetables (center)
2. Hanging pots and pans rack suspended from the ceiling
3. Smoothie/juice bar station with a blender
4. Nutritional info display on the wall (emissive screen, green)
5. Fresh produce baskets on a shelf (colorful accents)
6. Meal prep station with plates and bowls
7. Dining table with 4 chairs (one side of the room)
8. Herbs growing in small pots on the windowsill

**Surfaces**:
- Floor: Dark tile or polished concrete
- Walls: Dark brick / dark wood paneling
- Ceiling: Warm pendant lights over the counter

---

### 6.4 Wellbeing — The Therapy Room

**Focal Point**: Two comfortable armchairs facing each other — center of the room.

**Room Mood**: Calming, intimate, safe. A space for conversation and self-reflection. Natural light and plants.

**Key Props**:
1. 2 comfortable armchairs facing each other (center)
2. Living plant wall covering the back wall (lush green geometry)
3. Warm pendant lamp hanging between the chairs
4. Wellness dashboard on a tablet/screen on the side table (emissive, blue)
5. Aromatherapy diffuser — small cylinder with a faint mist effect
6. Large floor-to-ceiling window overlooking the garden outside
7. Soft area rug on a wooden floor
8. Wall-mounted water feature sculpture (flowing organic form)

**Surfaces**:
- Floor: Warm dark wood
- Walls: Dark matte with the plant wall as a feature
- Ceiling: Simple, warm pendant light as the primary source

---

### 6.5 Career — The Executive Boardroom

**Focal Point**: A long conference table with 8 chairs — center of the room.

**Room Mood**: Powerful, ambitious, prestigious. Floor-to-ceiling windows. Polished surfaces. The view from the top.

**Key Props**:
1. Long conference table with 8 leather chairs (center)
2. Floor-to-ceiling windows spanning one full wall (city view implied)
3. 2 standing desks with dual monitors along the side wall
4. Achievement/trophy wall — plaques, awards, framed certificates
5. Large digital display showing a career growth chart (emissive, gold)
6. Elevator lobby doors with lit floor indicators
7. Executive leather chair at the head of the table
8. Recessed LED panel lighting in the ceiling

**Surfaces**:
- Floor: Dark polished stone or marble
- Walls: Dark glass and dark wood paneling
- Ceiling: Recessed LED panels (emissive gold accents)

---

### 6.6 Productivity — The Co-Working Space

**Focal Point**: A whiteboard with sticky notes and diagrams — center of the back wall.

**Room Mood**: Focused, energized, collaborative. Open-plan with natural light from a skylight. The hum of a productive workspace.

**Key Props**:
1. Whiteboard with colored sticky notes and drawn diagrams (back wall)
2. 4-6 desks with monitors in an open layout
3. Standing meeting area — high table with 4 stools
4. Coffee machine on a counter (detail)
5. Large Pomodoro timer on the wall (analog, emissive lime hands)
6. Kanban board with color-coded task cards
7. Natural light from a large skylight in the ceiling
8. Plants on desks and floating shelves

**Surfaces**:
- Floor: Dark polished concrete
- Walls: Dark with whiteboard and Kanban board as features
- Ceiling: Skylight opening with warm natural light

---

### 6.7 Finance — The Vault

**Focal Point**: A massive circular vault door, partially open — back wall.

**Room Mood**: Imposing, secure, wealthy. The weight and permanence of the vault door contrasts with the gleam of gold accents. This is where value is stored and protected.

**Key Props**:
1. Massive circular vault door — partially open, with emerald-lit rim (emissive)
2. Safe deposit boxes lining both side walls (grid pattern, brass fronts)
3. Teller counter with brass fixtures and a glass partition
4. 2 large financial chart displays on screens (emissive, emerald)
5. Marble-textured floor
6. Gold-accented fixtures — door handles, lamp bases, counter trim
7. Financial planning desk with papers and a calculator
8. Ornate coffered ceiling with recessed lights

**Surfaces**:
- Floor: Dark marble or polished stone
- Walls: Dark stone with brass safe deposit box grid
- Ceiling: Coffered pattern with recessed emerald-tinted lights

---

### 6.8 Relationships — The Plaza (Ground Level)

**Focal Point**: The heart sculpture on its pedestal — center stage.

**Room Mood**: Warm, communal, alive. Since this is an open-air structure, "entering" means descending to ground level and seeing the plaza up close. String lights overhead create an intimate evening atmosphere.

**Key Props**:
1. Heart sculpture on pedestal at center stage (emissive red glow)
2. Microphone stand on the stage
3. Long communal dining table with 8 seats
4. Community bulletin board wall with pinned photos and notes
5. Playground detail visible nearby — swing, small slide
6. 2-3 simple human silhouette forms seated on benches (very abstract, not detailed characters)
7. Flower pots and planters along the paths
8. String lights overhead (emissive red-warm)

**Surfaces**:
- Floor: Dark stone pavers
- Stage: Raised dark wood platform
- No ceiling — open to the dark sky, string lights crossing overhead

---

### 6.9 Faith & Spirituality — The Sacred Space

**Focal Point**: A glowing orb or eternal flame at the center — the spiritual heart of the room.

**Room Mood**: Transcendent, reverent, warm. Amber light fills the space. Stained glass casts colored light patterns on the floor. Incense smoke rises. This is a space for awe.

**Key Props**:
1. Central glowing orb or flame on a pedestal (emissive amber — the brightest element)
2. Stained glass panels casting colored light patterns on the floor (projected color planes)
3. Soft upward-pointing amber light from floor-embedded fixtures
4. 8 prayer/meditation mats arranged in a circle around the central flame
5. Open sacred book on a wooden stand (center-left)
6. Candle holders along the walls with flame geometry (emissive)
7. Incense holder with a thin rising smoke trail
8. Domed ceiling interior with a painted or patterned surface

**Surfaces**:
- Floor: Dark stone with embedded amber floor lights
- Walls: Dark stone with stained glass panel openings
- Ceiling: Dome interior — patterned, warm-lit from below

---

### 6.10 Meditation — The Meditation Chamber

**Focal Point**: A singing bowl on a wooden stand — center of the room.

**Room Mood**: Absolutely still. Minimal. The quietest room in the city. Everything is stripped to essentials. Natural materials, no technology, no clutter.

**Key Props**:
1. Singing bowl on a wooden stand (center — teal-tinted metallic surface)
2. 6 zafu meditation cushions arranged in a circle
3. Incense holder with a thin rising smoke trail
4. Large decorative sand timer (hourglass form)
5. Ambient wave-form visualization on a subtle wall screen (emissive teal — the only technology)
6. Window/opening looking out to the zen garden
7. Tatami mat floor texture
8. Ikebana flower arrangement in a simple vase (corner)

**Surfaces**:
- Floor: Tatami mats (woven texture, dark natural tone)
- Walls: Dark wood panels, minimal
- Ceiling: Open wooden beam structure, simple

---

## 7. Interaction States

Each building exists in three visual states. The designer should consider how materials will look in each:

### 7.1 Inactive (Default)

- All 10 buildings start in this state
- The entire city is dark — buildings are barely distinguishable silhouettes
- `base` and `detail` materials are in their default dark state
- `accent` materials show no glow — just dark grey
- `glass` is dark and reflective — no interior light
- `emissive` materials have only the faintest dim glow (barely perceptible)
- The city feels dormant, waiting to wake up

### 7.2 Active (Illuminated)

- Buildings activate one at a time as the user scrolls
- When a building activates:
  - `accent` surfaces begin to glow with the module's color
  - `glass` windows light up with a warm interior glow
  - `emissive` elements light up brightly — signage, lanterns, LED strips
  - A ground circle beneath the building glows with the module color
  - A floating text label appears above the building
- The transition is gradual (not instant) — a slow bloom of light

### 7.3 Hovered (Highlighted)

- When the user's cursor hovers over an active building:
  - Emissive intensity increases slightly (brighter glow)
  - The building subtly scales up (1.02x) for a "pop" effect
  - The ground circle becomes more prominent
  - A tooltip/card appears with the module name and description

---

## 8. Deliverables

### 8.1 File List

Please deliver 20 GLB files:

**Exteriors** (10 files):

| File Name | Building |
|-----------|----------|
| `sleep-home.glb` | Sleep & Rest — Victorian Home |
| `sports-complex.glb` | Fitness — Sports Arena |
| `restaurant-market.glb` | Nutrition — Farmer's Market & Bistro |
| `wellbeing-garden.glb` | Wellbeing — Wellness Center & Spa |
| `career-office.glb` | Career — Corporate Tower |
| `productivity-hub.glb` | Productivity — Co-Working Campus |
| `finance-bank.glb` | Finance — Neoclassical Bank |
| `community-plaza.glb` | Relationships — Community Plaza |
| `faith-pavilion.glb` | Faith & Spirituality — Universal Pavilion |
| `meditation-garden.glb` | Meditation — Zen Garden |

**Interiors** (10 files):

| File Name | Room |
|-----------|------|
| `sleep-home-interior.glb` | The Bedroom |
| `sports-complex-interior.glb` | The Gym Floor |
| `restaurant-market-interior.glb` | The Kitchen & Dining Room |
| `wellbeing-garden-interior.glb` | The Therapy Room |
| `career-office-interior.glb` | The Executive Boardroom |
| `productivity-hub-interior.glb` | The Co-Working Space |
| `finance-bank-interior.glb` | The Vault |
| `community-plaza-interior.glb` | The Plaza (Ground Level) |
| `faith-pavilion-interior.glb` | The Sacred Space |
| `meditation-garden-interior.glb` | The Meditation Chamber |

### 8.2 Material Naming (Critical)

Every model must have exactly 5 materials named:
- `base`
- `accent`
- `glass`
- `detail`
- `emissive`

These exact names are required. The web application uses them to programmatically control which surfaces glow and when. If a building doesn't use glass (like the open-air Relationships plaza), include the material anyway as an unused slot.

### 8.3 Interior Light Markers

Each interior GLB should include **empty objects** (no geometry, just positioned markers) at the locations where lights should be placed:
- Name them `light_0`, `light_1`, `light_2`, etc.
- Place one at each major light source position in the room
- The web application reads these positions and creates dynamic lights

Also include one empty object named `camera_target` positioned at the room's focal point (where the camera should look).

### 8.4 Export Settings

- Format: GLB (binary glTF)
- Compression: Draco mesh compression enabled
- Y-axis up
- Apply all transforms before export
- Include normals and texture coordinates
- Origin point: bottom-center of each model (the building should sit on Y=0)

### 8.5 General Quality Targets

- **Premium quality**: These assets are the centerpiece of a product landing page. They should look polished and intentional.
- **Stylistic cohesion**: All 10 buildings must feel like they belong in the same city. Consistent material treatment, consistent level of detail, consistent scale language.
- **Readability over detail**: Silhouette clarity is more important than surface detail. A recognizable shape at 200px height matters more than intricate molding that's invisible at that scale.
- **Dark-first**: When in doubt, make it darker. The city's beauty comes from light emerging from darkness, not from bright surfaces.
- **Web-optimized**: These models will load in a web browser. Keep geometry clean and efficient. Avoid unnecessary subdivisions. Use geometry for shape, not for detail that could be implied by materials.

---

## 9. Reference — Current State

The screenshots below show the current implementation. These models are procedurally generated placeholders. Your task is to replace them with premium, architecturally detailed versions that maintain the same dark aesthetic but with dramatically improved quality, recognizability, and craftsmanship.

**What to keep from the current version:**
- The dark-first color palette
- The isometric-like viewing angle
- The grid-based city layout with roads between buildings
- The colored emissive accents (not surface paint)
- The overall mood — sophisticated, premium, nighttime

**What to improve:**
- Architectural distinctiveness — each building should be unmistakably identifiable
- Surface detail — PBR materials with visible texture, not flat color
- Silhouette variety — more dramatic height differences, unique rooflines, varied footprints
- Environmental props — more trees, street furniture, dressing that makes the city feel alive
- Interior rooms — entirely new (the current version has no interiors)

---

*End of brief. For questions or clarifications, contact Hamza Muqeem at support@xyric.ai.*
