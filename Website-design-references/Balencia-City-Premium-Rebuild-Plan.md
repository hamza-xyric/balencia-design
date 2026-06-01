---
type: execution-plan
title: Balencia City Premium Rebuild Plan
status: Draft
version: 1.0
owner: Hamza Muqeem
last_updated: 2026-05-19
product: Balencia
kb_summary: Comprehensive rebuild plan for Balencia City 3D visualization — premium buildings, full interiors, Blender MCP pipeline
---

# Balencia City Premium Rebuild Plan

> **Version**: 1.0
> **Date**: 2026-05-19
> **Status**: Planning — no implementation until this document is approved
> **Supersedes**: Existing M-001 through M-007 milestone approach

---

## 1. Executive Summary

Balencia City is a 3D interactive city visualization where 10 "life modules" (Sleep, Fitness, Nutrition, Wellbeing, Career, Productivity, Finance, Relationships, Faith, Meditation) are represented as unique buildings in a dark premium cityscape. Users scroll to watch modules light up sequentially, revealing connections between life areas.

**Current state:** 10 GLB buildings (1.1MB total) generated via Blender Python script. Despite 7 milestone upgrades, buildings remain architecturally simple — procedural geometry with window grids. The result is a "toy city" that doesn't match the premium brand vision.

**Target state:** Each building is a recognizable architectural landmark with PBR materials, cinematic lighting, and a full 3D interior room. Users click a building to fly inside and explore module-specific content.

**Key principle:** Don't reinvent the wheel. Source existing assets from Sketchfab (CC0/CC-BY), generate custom pieces via AI (Hyper3D Rodin, Hunyuan 3D), refine in Blender via MCP, apply PBR textures from Poly Haven.

---

## 2. Tool Inventory

### Primary: Blender MCP (Port 9876)

All 3D work flows through Blender MCP. Confirmed active integrations:

| Integration | Status | Use Case |
|-------------|--------|----------|
| **Blender Core** | Active | Python scripting, scene assembly, material editing, GLB export |
| **Sketchfab** | Active (logged in: Hamza-MuqqeemSketchfab) | Search and download CC-BY models |
| **Poly Haven** | Active | PBR textures (concrete, metal, wood, brick), dark-city HDRIs |
| **Hyper3D Rodin** | Active (hyper3d.ai) | AI text/image-to-3D model generation |
| **Hunyuan 3D** | Active (local API, localhost:8081) | Tencent AI 3D generation, 256 octree, 20 inference steps |

### MCP Tool Reference

| Tool | Purpose |
|------|---------|
| `execute_blender_code` | Run Python in Blender — import, cleanup, materials, export |
| `get_scene_info` | Check scene objects, materials, counts |
| `get_viewport_screenshot` | Visual preview before export |
| `search_sketchfab_models` | Find CC-BY downloadable models |
| `download_sketchfab_model` | Import model directly into Blender |
| `search_polyhaven_assets` | Find HDRIs and PBR textures |
| `download_polyhaven_asset` | Apply textures/HDRIs in Blender |
| `generate_hyper3d_model_via_text` | AI text-to-3D generation |
| `generate_hyper3d_model_via_images` | AI image-to-3D generation |
| `generate_hunyuan3d_model` | Tencent AI 3D generation (local) |
| `set_texture` | Apply texture to object materials |

### Free Online Asset Sources

| Source | URL | License | Best For |
|--------|-----|---------|----------|
| Sketchfab (Free) | sketchfab.com | CC-BY / CC0 | Complete buildings, city packs, interior props |
| Poly Haven | polyhaven.com | CC0 | PBR textures, HDRIs |
| Kenney.nl | kenney.nl/assets | CC0 | Modular building kits, lowpoly assets |
| Quaternius | quaternius.com | CC0 | Stylized 3D characters and props |
| OpenGameArt | opengameart.org | Various CC | Game-ready 3D models |
| Mixamo | mixamo.com | Free for use | Character animations (if needed for plaza) |

### Existing Reference Assets (PLAYGROUND/3d cities/)

| Pack | Size | Style | Reuse Potential |
|------|------|-------|-----------------|
| `darkcity/` | 8.6MB | Dark isometric | **High** — matches target aesthetic, extractable buildings |
| `cyberpunk_city/` | 516MB | Detailed futuristic | **Medium** — extract lighting/material techniques, too heavy for direct use |
| `neighbour poly/` | 231MB | Modular lowpoly | **Medium** — individual buildings could be adapted for generic filler |
| `city scene/` | 247MB | PBR textured | **Low** — study PBR setup, textures too specific |
| `renders/procedural_city.glb` | 1MB | Procedural | **Low** — reference for procedural generation patterns |

---

## 3. Art Direction Specifications

### 3.1 Visual Identity

**Target:** Premium dark city — buildings are near-monochrome silhouettes when inactive, with module-colored light accents that glow when activated. Think Gotham meets premium SaaS, not Lego City.

**Brand alignment (v2.0 Guidelines):**
- 60-30-10 color rule: Burnt Orange `#FF5E00` (60%) / Forest Green `#34A853` (30%) / Royal Purple `#7F24FF` (10%)
- Dark-first canvas: Ink-900 `#0A0A0F`
- Module colors appear ONLY as emissive accents (window glow, LED strips, signage), NOT as surface paint
- Building surfaces are dark neutrals (#1C1C24, #18181F, #111118) with PBR texture variation

### 3.2 Lighting Model (Cinematic 3-Point + Environment)

Replace the current single directional + ambient setup with a cinematic rig:

**Key Light (Warm Directional)**
```
Type: DirectionalLight
Color: #FFE4CC (warm, slightly orange-tinted)
Intensity: 0.8
Position: [-8, 20, -6] (existing)
Shadow: PCFShadowMap, 2048x2048 (upgrade from 1024)
Shadow bias: -0.0001
```

**Fill Light (Cool Hemisphere)**
```
Type: HemisphereLight
Sky color: #1a1a40 (cool blue, shifted from current #1a1a2e)
Ground color: #0A0A0F (keep existing)
Intensity: 0.35 (slightly up from 0.28)
```

**Rim/Back Light (Accent Spotlight)**
```
Type: SpotLight
Color: #FF8C40 (warm orange, matches street lights)
Intensity: 0.4
Position: [10, 18, -14]
Angle: 0.8
Penumbra: 0.9
Target: scene center [0, 0, -3]
```

**Environment Map (HDRI)**
```
Source: Poly Haven "modern_buildings_night" (ID: modern_buildings_night)
Alt: "cobblestone_street_night" (ID: cobblestone_street_night)
R3F: <Environment files={hdriPath} background={false} />
envMapIntensity: 0.4 (subtle reflections, not overpowering)
```

**Street Lights (keep existing 6 positions, enhance)**
```
Color: #FF8C40
Intensity: 0.7 (up from 0.58)
Penumbra: 0.9 (softer pools)
Add: ground-level glow mesh per light (additive blending, 0.15 opacity)
```

### 3.3 Material Language (PBR)

Upgrade from flat single-color materials to PBR with texture maps:

**5-Slot Material System (preserved for GLBLandmark.tsx compatibility):**

| Slot | Name Pattern | Purpose | Default Look (Inactive) | Active Look |
|------|-------------|---------|------------------------|-------------|
| `base` | "base", "wall", "body" | Structural surfaces | Dark #1E1E28, roughness 0.8, metalness 0.05 | Same (no change) |
| `accent` | "accent", "highlight", "roof" | Module-colored elements | Dark #2A2A38, emissive 0.0 | Module color, emissive 0.55 |
| `glass` | "glass", "window" | Windows and reflective panels | Dark #0F0F18, roughness 0.1, metalness 0.3 | Emissive 0.38, warm interior glow |
| `detail` | "detail", "trim", "prop" | Trim, columns, props | #16161E, roughness 0.6, metalness 0.15 | Same (no change) |
| `emissive` | "emissive", "light", "glow" | LED strips, signs, lanterns | Dim emissive 0.18 | Full emissive 1.85 |

**PBR Textures from Poly Haven (apply in Blender before export):**

| Building Surface | Texture ID | Category |
|------------------|-----------|----------|
| Concrete walls | `concrete_layers_02` | plaster-concrete |
| Rough concrete ground | `brushed_concrete` | concrete |
| Metal cladding | `metal_plate` | metal |
| Corrugated metal | `corrugated_iron` | metal |
| Factory/industrial | `factory_wall` | metal |
| Interior floors | `concrete_floor_worn_001` | concrete |

**Texture resolution:** 512x512 max (balance quality vs file size for WebGL)

### 3.4 Camera Composition

**Overview Camera (scrolling)**
```
Current: position [0, 16, 14], lookAt [0, 0, -1], FOV 48
New:     position [0, 12, 18], lookAt [0, -1, -2], FOV 45

Changes:
- Lower camera (16→12 Y) for more dramatic perspective
- Pull back slightly (14→18 Z) for wider field
- Tighter FOV (48→45) for less distortion
- LookAt shifted down to see building tops/silhouettes
```

**Scroll-Driven Camera Path:**
```
Phase 1 (Approach, 0-15%):
  Start: [0, 28, 22] — high birds-eye, city appears small and dark
  End:   [0, 12, 18] — sweep down to cinematic angle
  Effect: Dramatic reveal, city rises toward you

Phase 2 (Propagation, 15-65%):
  Hold at [0, 12, 18] — stable view as modules light up
  Subtle: 0.3-degree sway (Perlin noise, 0.05Hz) for organic feel

Phase 3 (Connections, 65-85%):
  Gentle pull-back: [0, 14, 20] — slightly wider to see full connection network
  
Phase 4 (Complete, 85-100%):
  Return to [0, 12, 18] — settled, inviting click interaction
```

**Module Click Camera (fly-in to interior):** See Section 6.

### 3.5 Atmosphere

**Height Fog (replace current FogExp2)**
```
Type: Custom shader fog OR layered FogExp2
Ground density: 0.008 (thick at Y=0)
Falloff: exponential, half-density at Y=3
Color: #08080C (keep existing)
Effect: Buildings emerge from a dark mist base
```

**Ground Mist Particles**
```
Count: 300 (up from 80)
Y range: 0 to 0.5 (constrained near ground)
Size: 0.08
Opacity: 0.04
Drift: horizontal, 0.02 units/sec
Use: drei <Points> for instanced rendering
```

**Light Shafts (2-3 fake volumetric cones)**
```
Geometry: ConeGeometry(2, 0, 20, 8) — thin cone pointing down
Material: MeshBasicMaterial, additive blending, opacity 0.03
Color: #FFE4CC (warm, matching key light)
Position: 2-3 placed above key buildings
Rotation: slight tilt toward city center
Purpose: Creates impression of light breaking through darkness
```

**Ambient Dust Motes**
```
Count: 150 (up from 120)
Size: 0.03
Opacity: 0.06
Behavior: slow upward drift (0.01 Y/sec), random horizontal wobble
Activation: spawn extra 30 particles near hovered building
```

### 3.6 Post-Processing Stack

Update `CityPostProcessing.tsx`:

| Effect | Current | Target | Settings |
|--------|---------|--------|----------|
| **Bloom** | ON (threshold 0.44, intensity 0.72) | Keep, tune slightly | threshold: 0.4, intensity: 0.8, smoothing: 0.3 |
| **Vignette** | ON (darkness 0.34, offset 0.46) | Keep | No change |
| **SSAO** | OFF (was removed) | RE-ENABLE | samples: 8, radius: 0.35, rings: 3, halfRes: true |
| **Depth of Field** | OFF | ADD (on building select) | bokehScale: 1.5, focusDistance: auto, focalLength: 0.03 |
| **Color Grading** | OFF | ADD (subtle) | Teal shadows, warm highlights, slight desaturation |

**Device tier gating:**
- `full-capability` (desktop): All effects enabled
- `reduced-3d` (tablet): Bloom + Vignette only (no SSAO, no DoF)
- `static-fallback` (mobile): No post-processing

---

## 4. Per-Module Building Design Specifications

### Design Principles (Apply to All 10)

1. **Silhouette-first:** Each building must be identifiable from outline alone at 200px height
2. **Dark-first materials:** Base surfaces are dark neutrals. Module color appears ONLY as emissive accents
3. **5-slot material convention:** All buildings use base/accent/glass/detail/emissive naming for `GLBLandmark.tsx` compatibility
4. **Polygon budget:** 5K-15K triangles exterior, 3K-8K triangles interior
5. **File size target:** 100-300KB per building GLB (Draco compressed)
6. **Height variation:** Vary dramatically — Career tower at 4.2 units, Meditation garden at 2.5 units

---

### Module 1: Sleep & Rest

**Identity:** A cozy Victorian-inspired home — the only residential building in the city. Immediately reads as "home" from its silhouette (pitched roof, chimney, porch).

**Exterior Architecture:**
- 2-story house with a steep mansard/gabled roof
- Prominent chimney with subtle glow (emissive)
- Dormer windows with warm amber light spilling out
- Wraparound porch with thin columns
- Crescent moon weather vane on roof peak
- Picket fence and garden path to front door
- Mailbox at the curb
- Roof: slate texture (Poly Haven `roofing` category)

**Interior Room: The Bedroom**
- Large bed with pillows and blanket geometry (center focal point)
- Nightstand with a glowing bedside lamp (emissive)
- Window with moonlight streaming in (volumetric cone, blue-white)
- Sleep tracker device on nightstand (small screen with ambient glow)
- Star projector on ceiling (emissive points)
- Soft rug on wooden floor
- Wall art (simple frame geometry)
- Ambient: floating dust particles in moonbeams

**Color Treatment:**
- Base: Dark wood/stone (#1E1E28)
- Accent: Indigo (#6366F1) on roof trim, door frame, porch light
- Glass: Warm amber glow (#FEF3C7) through windows
- Detail: Dark wood (#16161E) for fence, porch columns
- Emissive: Indigo on chimney glow, moon weathervane, window edge lights

**Sketchfab Search Terms:**
- Exterior: "lowpoly house" (UID: 3b8b090435164ed29af88019b04f1977, CC-BY, 4K faces)
- Exterior alt: "Forest House" (UID: 5646e6a3c8834022a0e289465f0bbc5d, CC-BY, 4.8K faces)
- Interior: "Isometric Bedroom" (UID: ea81c014b7e04c91a363400c40785aa9, CC-BY, 13K faces)
- Interior alt: "Cozy Isometric Bedroom" (UID: fde5da58531d4556a540d73365ad1142, CC-BY, 710K — decimate heavily)

**AI Generation Prompts (Hyper3D Rodin):**
- Exterior: "Victorian style cozy house, steep pitched roof, chimney, wraparound porch, picket fence, lowpoly stylized, dark materials"
- Interior props: "bedside lamp with warm glow, sleep tracker device, star projector ceiling light, lowpoly stylized"

---

### Module 2: Fitness

**Identity:** A modern sports arena/gym complex — dynamic curved roof creates the strongest silhouette. Reads as "sports" immediately.

**Exterior Architecture:**
- Main building: modern gym with dramatic curved/arched roof (like a natatorium or velodrome)
- Large glass curtain wall on front showing gym equipment inside (when active)
- Smaller outdoor training area beside it (pull-up bars, racks)
- Running track loop around the perimeter (orange lane markings)
- Scoreboard on the side wall (emissive numbers/text)
- Stadium-style flood lights on 2 tall poles
- Entrance with revolving door and "FITNESS" signage

**Interior Room: The Gym Floor**
- Weight racks with barbells and dumbbells (center left)
- 2 treadmills (against wall)
- Punching bag hanging from ceiling
- Rubber floor mats (textured)
- Large mirror on wall (reflective material)
- Digital display showing workout stats (emissive screen)
- Jump rope, medicine balls, kettlebells scattered
- Ceiling: exposed ducts, industrial pendant lights

**Color Treatment:**
- Base: Dark concrete (#1E1E28)
- Accent: Orange (#FF6B00) on curved roof edge, track lanes, scoreboard, equipment highlights
- Glass: Dark, reflective curtain wall. Active: shows orange interior glow
- Detail: Steel grey (#16161E) for flood light poles, pull-up bars, door frames
- Emissive: Orange on scoreboard, entrance signage, floor light strips

**Sketchfab Search Terms:**
- Exterior: Search "gym building" or "sports arena 3d"
- Interior: Search "gym interior lowpoly" or "fitness equipment 3d"
- Props: "dumbbell" (UID: 3381b102358a4bb0b73371d6f5bfaf1b, CC-BY, 22K faces)

**AI Generation Prompts:**
- Exterior: "Modern gym sports complex building, dramatic curved arched roof, glass curtain wall front, dark premium materials, lowpoly architectural style"
- Interior: "Gym interior with weight racks, treadmills, punching bag, rubber floor, industrial ceiling, lowpoly stylized"

---

### Module 3: Nutrition

**Identity:** An upscale farmer's market / bistro hybrid — open-air market stalls with a restaurant building. Reads as "food" from awnings, produce displays, and food truck.

**Exterior Architecture:**
- Main restaurant building with glass-fronted bar counter visible inside
- 3 adjacent open-air market stalls with striped awnings
- Food truck parked to one side (detailed: wheels, serving window, menu board)
- Produce crates stacked artfully on wooden pallets
- Herb planters on the sidewalk (small green accent)
- Visible kitchen vent/chimney on restaurant roof
- Chalkboard menu sign at entrance
- String lights between stalls

**Interior Room: The Kitchen & Dining**
- Open kitchen with chef's counter (center)
- Cutting boards with vegetables (simple colored geometry)
- Hanging pots and pans rack (ceiling)
- Smoothie/juice bar with blender
- Nutritional info display (emissive screen on wall)
- Fresh produce baskets (colorful accent)
- Meal prep station with plates
- Dining table with 4 chairs

**Color Treatment:**
- Base: Dark wood/brick (#1E1E28)
- Accent: Green (#81C784) on awnings, herb planters, produce highlight, "FRESH" signage
- Glass: Warm interior glow from restaurant windows
- Detail: Wood tone (#16161E) for crates, table, stall frames
- Emissive: Green on signage, menu board backlight, kitchen lights

**Sketchfab Search Terms:**
- Exterior: "restaurant 3D Model" (UID: 3328ee2725214fbea674e8b097a252ee, CC-BY, 12K faces)
- Exterior alt: "Cartoon-Shop Town" (UID: 5ca7e02f43b04729acc142351eaac3ed, CC-BY, 19K faces)
- Interior: "Cartoon Kitchen Interior" (UID: b42fec3f1fd44894b3a032e8a844ab90, Free, 13K faces)

**AI Generation Prompts:**
- Exterior: "Upscale farmer's market with restaurant building, striped awnings, food truck, produce displays, dark premium materials, lowpoly stylized"
- Interior: "Restaurant kitchen interior, open kitchen counter, hanging pots, produce baskets, warm lighting, lowpoly"

---

### Module 4: Wellbeing

**Identity:** A wellness center/spa with Japanese-garden influence — the open-air gazebo and fountain create a unique organic silhouette among angular buildings.

**Exterior Architecture:**
- Central hexagonal gazebo with thin columns and peaked roof
- Circular fountain with 3-tier water feature (center of gazebo)
- Walking paths with stepping stones radiating outward
- Flower beds in concentric rings (small colored planes)
- Meditation bench along path
- Small clinic building adjacent with large glass panels
- Lattice panels with climbing vine geometry
- Paper lanterns on thin wires

**Interior Room: The Therapy Room**
- Comfortable seating (2 armchairs facing each other)
- Indoor plant wall (green geometry along back wall)
- Mood lighting: warm pendant lamps
- Wellness dashboard on tablet (emissive screen on side table)
- Aromatherapy diffuser (small cylinder with mist particles)
- Large floor-to-ceiling window overlooking garden
- Soft rug on wooden floor
- Water feature sound sculpture (wall-mounted, flowing form)

**Color Treatment:**
- Base: Dark stone (#1E1E28)
- Accent: Blue (#64B5F6) on water features, clinic glass glow, walking path embedded lights
- Glass: Clinic windows with cool blue interior light
- Detail: Stone/wood (#16161E) for gazebo columns, lattice, bench
- Emissive: Blue on fountain water, path lights, lanterns

**Sketchfab Search Terms:**
- Exterior: Search "zen garden" or "spa building lowpoly"
- Interior: Search "therapy room interior" or "wellness space 3d"

**AI Generation Prompts:**
- Exterior: "Japanese-inspired wellness garden with hexagonal gazebo, three-tier fountain, walking paths, flower beds, lattice panels, dark premium materials, lowpoly"
- Interior: "Therapy room with two armchairs, plant wall, warm pendant lamps, large window, calming atmosphere, lowpoly stylized"

---

### Module 5: Career

**Identity:** The tallest building in the city — a sleek glass-and-steel corporate tower with distinctive crown. The vertical dominance makes it unmistakable.

**Exterior Architecture:**
- Tallest structure (4.2 units) — glass curtain wall showing floor plates
- Distinctive crown/spire at top (angular, modern, gold-accented)
- Full glass facade with visible floor divisions
- Ground-level: revolving door entrance with canopy
- Smaller annexe building connected by skybridge at mid-height
- Rooftop helipad on the annexe
- Flagpole at entrance
- Parking structure visible at base

**Interior Room: The Executive Boardroom**
- Long conference table (8 seats, center focal point)
- Floor-to-ceiling windows with city view (environment reflection)
- Standing desks with dual monitors (2 workstations along wall)
- Achievement/trophy wall with plaques and awards
- Large digital display with career growth chart (emissive)
- Elevator lobby (doors with lit indicators)
- Leather executive chair at head of table
- Ceiling: recessed LED panel lighting

**Color Treatment:**
- Base: Dark steel/glass (#1E1E28)
- Accent: Gold (#FFD700) on crown, corporate logo, signage, elevator trim
- Glass: Dark reflective with visible floor plates. Active: warm gold interior glow
- Detail: Steel (#16161E) for skybridge, helipad, entrance canopy
- Emissive: Gold on crown peak, signage, window edge lights per floor

**Sketchfab Search Terms:**
- Exterior: "Tower" (UID: 223588d8a21f4c72902d13d60d44df4a, CC-BY, 54K faces — decimate to ~12K)
- Interior: "Stylized Isometric Room" (UID: ea60391b2ef043d29da24aa860ad8cd4, CC-BY, 119K — adapt to boardroom)

**AI Generation Prompts:**
- Exterior: "Modern glass corporate skyscraper tower with angular crown spire, glass curtain wall, ground entrance canopy, skybridge to smaller annexe, dark premium, lowpoly architectural"
- Interior: "Executive boardroom, long conference table, floor-to-ceiling windows, dual monitor workstations, trophy wall, corporate atmosphere, lowpoly"

---

### Module 6: Productivity

**Identity:** An L-shaped co-working/tech campus — modern flat roof with rooftop terrace, clock tower element. Silicon Valley meets dark mode.

**Exterior Architecture:**
- L-shaped building, 2-3 stories
- Modern flat roof with visible rooftop terrace (tables, railing)
- Large front window wall showing open-plan workspace
- Clock tower element on one corner (analog clock face, emissive)
- Solar panels on roof (geometric grid)
- Bike rack at entrance (detailed)
- "PRODUCTIVITY HUB" signage over entrance
- Green rooftop planters visible from ground

**Interior Room: The Co-Working Space**
- Open desk layout with 6 desks and monitors
- Whiteboard with sticky notes and diagrams (wall)
- Standing meeting area (high table, 4 stools)
- Coffee machine on counter
- Pomodoro timer (large analog, wall-mounted, emissive)
- Kanban board (color-coded cards on wall)
- Natural light from large skylight in ceiling
- Plants on desks and shelves

**Color Treatment:**
- Base: Dark concrete (#1E1E28)
- Accent: Lime (#84CC16) on rooftop planters, clock face glow, digital displays, entrance signage
- Glass: Large windows, active: lime-tinted interior light
- Detail: Medium dark (#16161E) for solar panels, bike rack, door frames
- Emissive: Lime on clock, monitor screens, data visualization fins

**Sketchfab Search Terms:**
- Search "coworking space building" or "modern office lowpoly"
- Interior: Search "office interior isometric" or "coworking interior 3d"

**AI Generation Prompts:**
- Exterior: "L-shaped modern coworking building, flat roof with rooftop terrace, clock tower corner, large front windows, solar panels, bike rack, dark materials, lowpoly"
- Interior: "Open plan coworking space, multiple desks with monitors, whiteboard with sticky notes, coffee machine, standing meeting area, natural light, lowpoly"

---

### Module 7: Finance

**Identity:** A neoclassical bank — fluted columns, pediment, grand staircase. The only classical building in a modern city, creating strong contrast and gravitas.

**Exterior Architecture:**
- Neoclassical facade: 6 fluted columns across the portico
- Deep entablature (architrave + frieze + cornice)
- Triangular pediment with coin/shield relief
- Grand entrance staircase (8 wide steps) with brass handrails
- Prominent vault door visible behind glass (circular, detailed)
- ATM kiosk beside entrance
- Security cameras (small detail)
- "FINANCE INSTITUTE" engraved in stone above columns

**Interior Room: The Vault**
- Massive vault door (partially open, circular, emissive rim)
- Safe deposit boxes lining walls (grid pattern, brass fronts)
- Teller counter with brass fixtures and glass partition
- Financial charts on screens (2 large monitors, emissive)
- Marble floor (textured)
- Gold-accented fixtures (handles, trim, lamp bases)
- Financial planning desk with papers and calculator
- Ceiling: ornate coffered pattern with recessed lights

**Color Treatment:**
- Base: Dark stone (#1E1E28)
- Accent: Emerald (#10B981) on vault glow, ticker displays, column capital trim
- Glass: Behind columns, shows vault interior glow when active
- Detail: Stone/brass (#16161E) for columns, steps, handrails
- Emissive: Emerald on vault door rim, ATM screen, signage letters

**Sketchfab Search Terms:**
- Exterior: Search "neoclassical building" or "bank building columns"
- Interior: Search "bank vault interior" or "safe deposit boxes 3d"

**AI Generation Prompts:**
- Exterior: "Neoclassical bank building with six fluted columns, triangular pediment, grand staircase with handrails, vault door visible behind glass, dark stone materials, lowpoly architectural"
- Interior: "Bank vault room, circular vault door partially open, safe deposit boxes on walls, teller counter with brass fixtures, marble floor, gold accents, lowpoly"

---

### Module 8: Relationships

**Identity:** An open-air community gathering space — the only truly open structure, creating visual breathing room among enclosed buildings.

**Exterior Architecture:**
- Central raised stage platform with steps
- Amphitheater-style seating in semicircle (3 tiers)
- Decorative archway as main entrance
- String lights crisscrossing overhead between 4 lamp posts
- Playground swing set to one side
- Heart-shaped sculpture on pedestal (centerpiece, emissive)
- Benches arranged in conversational groupings (3-4 clusters)
- Community bulletin board at entrance

**Interior (Open-Air Zoom-In): The Plaza Level**
Since this is an open-air structure, "entering" means camera descends to plaza level:
- Close-up of stage with microphone stand
- Social connection visualization (floating light threads between bench clusters)
- Photo frames on the community board wall
- Shared dining table (long, 8 seats)
- Playground detail: swing, small slide
- People silhouettes (2-3 simple humanoid forms, positioned on benches)
- Flowers and potted plants along paths

**Color Treatment:**
- Base: Dark stone/concrete (#1E1E28)
- Accent: Red (#FF6B6B) on heart sculpture, archway trim, string light warmth
- Glass: N/A (open-air)
- Detail: Stone/wood (#16161E) for seating, lamp posts, bench legs
- Emissive: Red on heart sculpture glow, string lights, stage footlights

**Sketchfab Search Terms:**
- Search "amphitheater lowpoly" or "town square park"
- Props: Search "park bench" or "playground equipment 3d"

**AI Generation Prompts:**
- Exterior: "Community gathering plaza with semicircle amphitheater seating, central stage, decorative archway entrance, string lights between lamp posts, heart sculpture, dark materials, lowpoly"
- Interior: "Open air plaza level, stage with microphone, long communal dining table, playground swing, park benches, community board, evening lighting, lowpoly"

---

### Module 9: Faith & Spirituality

**Identity:** A universal spiritual pavilion blending multi-tradition elements — the dome is the most architecturally unique element in the city.

**Exterior Architecture:**
- Tall dome (48-segment, gold finial — crescent + orb) — highest point after Career tower
- 8 columns around perimeter with stained glass panels between them
- Bell tower adjacent (shorter, with visible bell)
- Approach steps leading up (7 wide steps, ceremonial feel)
- Candle array at entrance (10-12 candle holders)
- Meditation stones nearby (5 smooth boulders)
- The design is inclusive — NOT identifiable as any single religion
- Ornate door (double, arched)

**Interior Room: The Sacred Space**
- Central focal point: glowing orb or flame (emissive, amber)
- Stained glass panels casting colored light patterns on floor (projected color planes)
- Soft upward-pointing light from floor (amber volumetric cones)
- Prayer/meditation mats arranged in circle (8 mats)
- Open sacred book on a stand (center-left)
- Candle holders along walls with flame geometry
- Incense trail (particle system, thin rising smoke)
- Domed ceiling with painted/patterned interior (texture map)

**Color Treatment:**
- Base: Dark stone (#1E1E28)
- Accent: Amber (#F59E0B) on dome, stained glass warm glow, candle flames, finial
- Glass: Stained glass panels — multicolor but amber-dominant
- Detail: Stone (#16161E) for columns, steps, meditation stones
- Emissive: Amber on dome finial, candle flames, interior floor lights, bell

**Sketchfab Search Terms:**
- Search "dome pavilion" or "spiritual building 3d" or "temple lowpoly"
- Interior: Search "temple interior" or "sacred space 3d"

**AI Generation Prompts:**
- Exterior: "Universal spiritual pavilion with large dome, gold crescent finial, eight columns with stained glass panels between them, bell tower, ceremonial entrance steps, candle array, dark stone, lowpoly architectural"
- Interior: "Sacred meditation space, central glowing orb, stained glass casting colored light on floor, prayer mats in circle, candle holders, incense smoke, domed ceiling, warm amber atmosphere, lowpoly"

---

### Module 10: Meditation

**Identity:** A Japanese zen garden compound — the lowest, most horizontally spread structure. Emphasizes groundedness and stillness.

**Exterior Architecture:**
- Torii gate at entrance (traditional proportions, red accent)
- Raked sand garden (karesansui) with 5 carefully placed stones
- Koi pond with small arched bridge
- Open-sided meditation pavilion (curved roof, 4 pillars)
- Bamboo fence along perimeter
- Stone lantern (ishidoro) beside path
- Bonsai tree on pedestal
- Stepping stones leading through garden

**Interior (Pavilion Interior): The Meditation Chamber**
- Zafu meditation cushions arranged in circle (6 cushions)
- Central singing bowl on wooden stand
- Incense holder with rising smoke particles
- Minimalist sand timer (large, decorative)
- Ambient sound visualization (subtle wave forms on a wall screen, emissive)
- Window/opening looking out to zen garden
- Tatami mat floor texture
- Simple flower arrangement (ikebana) in corner

**Color Treatment:**
- Base: Dark wood (#1E1E28)
- Accent: Teal (#00BCD4) on torii gate, pond water glow, pavilion roof edge
- Glass: N/A (open-sided pavilion)
- Detail: Natural wood/stone (#16161E) for fence, lantern, bridge, stepping stones
- Emissive: Teal on pond water surface, stepping stone edge lights, pavilion roof trim

**Sketchfab Search Terms:**
- Exterior: "Japanese zen garden" (UID: 7b88c724f59d4dfd85e885817f819bb5, Free Standard, 51K faces)
- Props: Search "torii gate 3d" or "bonsai tree lowpoly"

**AI Generation Prompts:**
- Exterior: "Japanese zen garden compound, torii gate entrance, raked sand garden with placed stones, koi pond with arched bridge, open meditation pavilion with curved roof, bamboo fence, stone lantern, lowpoly"
- Interior: "Zen meditation pavilion interior, meditation cushions in circle, singing bowl, incense smoke, tatami mats, window overlooking garden, minimalist, calm atmosphere, lowpoly"

---

## 5. Technical Pipeline

### 5.1 Per-Building Workflow (Blender MCP)

For each of the 10 buildings, follow this workflow:

**Step 1: Source base mesh**
```
Option A: Download from Sketchfab
  → mcp__blender__search_sketchfab_models (find candidate)
  → mcp__blender__download_sketchfab_model (import into Blender)

Option B: AI generate
  → mcp__blender__generate_hyper3d_model_via_text (send prompt)
  → mcp__blender__get_hyper3d_status (poll until complete)
  → mcp__blender__import_generated_asset (import result)

Option C: AI generate (Hunyuan)
  → mcp__blender__generate_hunyuan3d_model (send prompt)
  → mcp__blender__poll_hunyuan_job_status (poll until complete)
  → mcp__blender__import_generated_asset_hunyuan (import result)
```

**Step 2: Cleanup in Blender**
```python
# Via mcp__blender__execute_blender_code
import bpy

# Select imported mesh
obj = bpy.context.selected_objects[0]

# Remove interior faces not visible from outside
# Decimate to target polygon count
mod = obj.modifiers.new(name="Decimate", type='DECIMATE')
mod.ratio = target_faces / current_faces
bpy.ops.object.modifier_apply(modifier="Decimate")

# Merge disconnected vertices
bpy.ops.object.mode_set(mode='EDIT')
bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.mesh.remove_doubles(threshold=0.001)
bpy.ops.object.mode_set(mode='OBJECT')

# Apply all transforms
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)

# Set origin to bottom-center
bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
obj.location.z = obj.dimensions.z / 2
bpy.ops.object.origin_set(type='ORIGIN_CURSOR')
```

**Step 3: Material assignment (5-slot system)**
```python
# Create 5 named materials matching GLBLandmark.tsx expectations
material_slots = {
    'base': {'color': (0.118, 0.118, 0.157, 1), 'roughness': 0.8, 'metalness': 0.05},
    'accent': {'color': MODULE_COLOR, 'roughness': 0.5, 'metalness': 0.2},
    'glass': {'color': (0.059, 0.059, 0.094, 1), 'roughness': 0.1, 'metalness': 0.3},
    'detail': {'color': (0.086, 0.086, 0.118, 1), 'roughness': 0.6, 'metalness': 0.15},
    'emissive': {'color': MODULE_COLOR, 'emission': 1.35},
}

for name, props in material_slots.items():
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = props['color']
    bsdf.inputs["Roughness"].default_value = props['roughness']
    bsdf.inputs["Metallic"].default_value = props['metalness']
    if 'emission' in props:
        bsdf.inputs["Emission Strength"].default_value = props['emission']
        bsdf.inputs["Emission Color"].default_value = props['color']
    obj.data.materials.append(mat)
```

**Step 4: Apply PBR textures (from Poly Haven)**
```
→ mcp__blender__download_polyhaven_asset (download texture)
→ mcp__blender__set_texture (apply to base material)
```

**Step 5: Visual check**
```
→ mcp__blender__get_viewport_screenshot (preview)
→ Verify: silhouette readable, materials correct, scale appropriate
```

**Step 6: Export**
```python
bpy.ops.export_scene.gltf(
    filepath=f"/path/to/public/models/balencia-city/{landmark_type}.glb",
    export_format='GLB',
    export_draco_mesh_compression_enable=True,
    export_draco_mesh_compression_level=6,
    export_apply=True,
    export_yup=True,
    export_texcoords=True,
    export_normals=True,
    export_materials='EXPORT',
    export_colors=False,
)
```

### 5.2 Interior Building Pipeline

Each interior is a separate GLB file following the same pipeline:

1. Source interior props (Sketchfab CC-BY or AI-generated)
2. Assemble room in Blender: floor + walls + ceiling + furniture + focal point
3. Apply same 5-slot material system
4. Add empty objects named `light_0`, `light_1`, `light_2` at light positions (R3F reads these)
5. Add empty object named `camera_target` at the focal point
6. Export as `{landmark-type}-interior.glb`

**Interior file naming:** `public/models/balencia-city/interiors/{landmark-type}-interior.glb`

### 5.3 R3F Code Changes

**Modified files:**

| File | Changes |
|------|---------|
| `module-config.ts` | Add `interiorModelPath`, `interiorCameraPosition`, `interiorLightPositions` to `ModuleConfig` |
| `city-constants.ts` | Add interior-related constants (camera transition duration, interior light intensity) |
| `GLBLandmark.tsx` | Add `isEntered` prop to toggle exterior visibility |
| `CityCamera.tsx` | Add GSAP fly-in timeline, interior camera state, Perlin noise sway |
| `BalenciaCityScene.tsx` | Add `<Environment>` component, upgrade lighting to 3-point setup |
| `CityPostProcessing.tsx` | Re-enable SSAO, add DoF on building select, add color grading |
| `ModuleBuilding.tsx` | Add interior loading trigger on click, manage exterior/interior swap |

**New files:**

| File | Purpose |
|------|---------|
| `BuildingInterior.tsx` | Loads interior GLB, manages interior lights, handles disposal |
| `InteriorCamera.tsx` | Fixed-position camera with subtle orbit for interior view |
| `InteriorTransition.tsx` | Fade overlay + exterior/interior swap timing |
| `interior-config.ts` | Per-module interior configuration |

### 5.4 Performance Budgets

| Metric | Budget | Current |
|--------|--------|---------|
| **Per-building exterior** | 5K-15K triangles | ~1.5K (too low) |
| **Per-building interior** | 3K-8K triangles | N/A |
| **Total scene triangles** | 150K max | ~15K |
| **Per-building GLB (exterior)** | 100-300KB | 75-179KB |
| **Per-building GLB (interior)** | 50-150KB | N/A |
| **Total exterior GLBs** | 3MB max | 1.1MB |
| **Total interior GLBs** | 1.5MB max (on-demand) | N/A |
| **Draw calls** | 60 max | ~25 |
| **Frame time (1440p desktop)** | < 16.6ms (60fps) | TBD |
| **Interior load time** | < 500ms | N/A |
| **Pixel ratio** | 1.5 max | 1.5 |

---

## 6. Interior Exploration — Full 3D Fly-In

### 6.1 Interaction Flow

```
User clicks building
  → Phase 1: Camera approaches building front (0.8s)
  → Phase 2: Fullscreen fade to black (0.3s)
  → Phase 3: Swap exterior for interior (during black)
  → Phase 4: Fade from black to interior view (0.3s)
  → Phase 5: Interior camera settles on focal point (0.5s)
  
Total transition: ~1.9 seconds
```

### 6.2 Camera Fly-In (GSAP Timeline)

```typescript
// In CityCamera.tsx — new GSAP timeline for building entry

const enterTimeline = gsap.timeline({ paused: true });

// Phase 1: Approach building front
enterTimeline.to(cameraPosition, {
  x: buildingPos.x + 1.5,
  y: buildingPos.y + 2,
  z: buildingPos.z + 4,
  duration: 0.8,
  ease: "power2.inOut"
});

// Phase 2-4 handled by InteriorTransition.tsx (fade overlay)

// Phase 5: Interior camera settle
enterTimeline.to(interiorCameraPosition, {
  x: interiorConfig.cameraX,
  y: interiorConfig.cameraY,
  z: interiorConfig.cameraZ,
  duration: 0.5,
  ease: "power1.out"
});
```

### 6.3 Interior Scene Structure

Each interior GLB contains:
- **Room shell:** Floor, 3-4 walls (one open or windowed), ceiling
- **Furniture:** 4-8 key props specific to the module
- **Focal point:** One central element the camera targets (bed, conference table, vault door, etc.)
- **Light markers:** Empty objects named `light_0`, `light_1` at light positions
- **Camera target:** Empty object named `camera_target` at focal point

### 6.4 Interior Rendering

```tsx
// BuildingInterior.tsx (new component)

function BuildingInterior({ moduleId, onLoaded }) {
  const config = getInteriorConfig(moduleId);
  const { scene } = useGLTF(config.modelPath);
  
  // Extract light positions from empty objects
  const lights = useMemo(() => {
    const result = [];
    scene.traverse((child) => {
      if (child.name.startsWith('light_')) {
        result.push(child.position.clone());
      }
    });
    return result;
  }, [scene]);

  // Apply material system (same as GLBLandmark.tsx)
  useEffect(() => {
    applyModuleMaterials(scene, config.moduleColor, 1.0);
    onLoaded();
  }, [scene]);

  return (
    <group>
      <primitive object={scene} />
      {lights.map((pos, i) => (
        <pointLight
          key={i}
          position={pos}
          color={config.moduleColor}
          intensity={1.2}
          distance={8}
          decay={2}
        />
      ))}
    </group>
  );
}
```

### 6.5 UI Overlay While Inside

When inside a building, `CityOverlay.tsx` transforms:

| Element | City View | Interior View |
|---------|-----------|---------------|
| Module name | Label above building | Large header, top-left |
| Description | In detail panel | Expanded, with module stats |
| Correlations | Ground paths + matrix | "Connected to: [module list]" text |
| CTA button | "Start tracking" | "Open [module name] module" |
| Navigation | Scroll to explore | Back arrow / Escape to exit |
| Background | 3D city | 3D interior room |

### 6.6 Exit Interaction

- **Escape key:** Triggers exit (existing keyboard handler)
- **Back arrow button:** Top-left, visible during interior view
- **Click outside panel:** Triggers exit
- **Process:** Reverse of entry — fade to black, swap interior for exterior, fade in, camera returns

### 6.7 Lazy Loading Strategy

```
Interior GLBs are NOT preloaded. Strategy:

1. User clicks building
2. Start camera approach (Phase 1, 0.8s)
3. Simultaneously: fetch interior GLB via useGLTF
4. If GLB loads before fade: seamless transition
5. If GLB still loading: show loading spinner in black phase
6. Interior loads: fade in to interior view

On exit:
- Dispose interior scene geometry and materials
- Release GPU memory
- Only one interior loaded at any time
```

---

## 7. Inspiration Sources

### Rollercoaster Tycoon Influence
The key insight from Rollercoaster Tycoon: each building type is **instantly recognizable by its function** from a bird's-eye view. A hospital looks like a hospital. A restaurant looks like a restaurant. The gym has visible equipment. Apply this:
- Sleep → house with chimney and pitched roof
- Fitness → arena with curved roof and floodlights
- Nutrition → market stalls with awnings and food truck
- Career → tallest glass tower with crown
- Finance → classical bank with columns
- Meditation → zen garden with torii gate

### Real Valencia/Balencia Architecture
The product name "Balencia" evokes Valencia, Spain — known for:
- City of Arts and Sciences (Santiago Calatrava) — futuristic white curves
- Mediterranean terracotta and warm stone tones
- Mix of Gothic, Baroque, and ultra-modern architecture
- Warm evening lighting against dark blue sky

Apply: warm accent lighting, mix of classical and modern architectural styles, evening atmosphere.

### Dark City / Cyberpunk Aesthetic
Reference: `PLAYGROUND/3d cities/darkcity/` and `cyberpunk_city/`
- Buildings as dark silhouettes with light accents
- Neon/emissive elements as the primary visual interest
- High contrast: very dark surfaces, very bright highlights
- Fog/atmosphere creating depth layers

### Sketchfab Model Reference
The user specifically referenced: `poly-style-cartoon-city-pack-fe3ad574c4ab498d9c3e41b0af888f8a`
Key takeaway: Buildings in a grey/neutral palette where selective colorization highlights different zones/modules.

### Discovered Sketchfab Packs (CC-BY, Free)

| Pack | UID | Faces | Use |
|------|-----|-------|-----|
| Simple Cartoon City Mega Pack (Free) | 8d5e54ad61a34fd9b36958e56904ca49 | 262K | Extract individual buildings, decimate |
| Cartoon City Packs by Arham Abdullah | 40a605af88ac4cb2a9f828d30a587081 | 83K | Variety of building types |
| Low Poly City CartoCity Pack | d56ffa39bb7440afb1d09aa615a743d6 | 15K | Lightweight, clean geometry |
| Free Low Poly Simple Urban City | 310c806355814c3794f5e3022b38db85 | 37K | Clean urban baseline |
| Stylized Industrial Buildings Pack | 9053692207a04063a77e30e3d0700ad8 | 55K | Industrial/commercial variety |

---

## 8. Implementation Phases

### Phase 1: Art Direction Reset (2-3 days)

**Goal:** Upgrade lighting, camera, atmosphere, and post-processing. These improvements apply to ALL buildings immediately, making even the current procedural buildings look significantly better.

**Tasks:**
1. Download and apply dark-city HDRI from Poly Haven (`modern_buildings_night`)
2. Implement 3-point lighting in `BalenciaCityScene.tsx`
3. Update camera positions and scroll path in `CityCamera.tsx`
4. Add Perlin noise camera sway
5. Enhance ground mist particles (300 count, ground-constrained)
6. Add 2-3 fake volumetric light shafts
7. Re-enable SSAO in `CityPostProcessing.tsx`
8. Add subtle color grading
9. Update bloom settings (threshold 0.4, intensity 0.8)

**Success Criteria:**
- Side-by-side screenshot comparison shows dramatic improvement
- Frame time still < 16.6ms at 1440p
- Buildings read as dark silhouettes with glowing accents
- Scene feels cinematic, not flat

**Files Modified:** `BalenciaCityScene.tsx`, `CityCamera.tsx`, `CityPostProcessing.tsx`, `city-constants.ts`, `CityParticles.tsx`

---

### Phase 2: Prototype One Building (2-3 days)

**Goal:** Validate the entire asset pipeline end-to-end with one building — Career Office (tallest, most visually impactful).

**Tasks:**
1. Search Sketchfab for office tower candidates (or AI-generate via Hyper3D)
2. Import into Blender via MCP
3. Cleanup: decimate to 12K triangles, fix normals, merge vertices
4. Assign 5-slot materials (base, accent=gold, glass, detail, emissive)
5. Apply PBR textures from Poly Haven (concrete walls, metal cladding)
6. Export as GLB with Draco, verify < 300KB
7. Replace `career-office.glb` in public/models/
8. Test in browser — verify material emissive control works
9. Build Career Office interior (boardroom: table, chairs, windows, screens)
10. Export interior as `career-office-interior.glb`
11. Implement `BuildingInterior.tsx`, `InteriorTransition.tsx`
12. Test full flow: scroll → click → fly-in → interior → exit

**Success Criteria:**
- Career Office is recognizable as an office tower from silhouette alone
- Building has visible PBR surface texture, not flat color
- Click-to-enter transition works smoothly (< 2 seconds)
- Interior loads on-demand (< 500ms)
- Exterior emissive control still works with scroll activation

**Files Modified:** `GLBLandmark.tsx`, `CityCamera.tsx`, `ModuleBuilding.tsx`, `module-config.ts`
**Files Created:** `BuildingInterior.tsx`, `InteriorCamera.tsx`, `InteriorTransition.tsx`, `interior-config.ts`

---

### Phase 3: Remaining 9 Exterior Buildings (5-7 days)

**Goal:** Replace all remaining buildings with premium models using the validated pipeline.

**Order (highest visual impact first):**

| Priority | Building | Reason |
|----------|----------|--------|
| 1 | Finance Bank | Classical columns — most architecturally distinctive |
| 2 | Faith Pavilion | Dome — most unique silhouette element |
| 3 | Sleep Home | Cozy house — high emotional resonance |
| 4 | Sports Complex | Curved roof — dynamic silhouette |
| 5 | Meditation Garden | Horizontal layout — unique among vertical buildings |
| 6 | Nutrition (Restaurant) | Market stalls — visual variety |
| 7 | Community Plaza | Open-air — breaks building rhythm |
| 8 | Wellbeing Garden | Gazebo + fountain — organic contrast |
| 9 | Productivity Hub | Most similar to Career Office — do last |

**Per-building time estimate:** 3-5 hours (source/generate → Blender cleanup → materials → export → test)

**Success Criteria:**
- All 10 buildings have distinct, recognizable silhouettes
- Total exterior GLB size < 3MB
- All material emissive control works
- Consistent dark-first palette across all buildings

---

### Phase 4: All 10 Interior Rooms (5-7 days)

**Goal:** Build interior scenes for every module and fully implement the fly-in interaction.

**Order:** Same as Phase 3 (Career Office already done in Phase 2).

**Per-interior time estimate:** 3-5 hours (source props → assemble in Blender → materials → export → test transition)

**Success Criteria:**
- Each interior has 4-8 recognizable module-specific props
- Interior loads < 500ms per building
- Transition is smooth (fade approach, no jarring geometry swaps)
- Only one interior loaded at any time (memory management)
- Exit returns cleanly to city overview

---

### Phase 5: Polish & Integration (3-4 days)

**Goal:** Performance optimization, accessibility, brand alignment, and landing page integration.

**Tasks:**
1. Performance profiling on target devices (MacBook Air 2020, iPhone 12, Galaxy S21)
2. Verify 60fps at 1440px desktop with all effects
3. Accessibility audit: keyboard navigation into/out of interiors, screen reader announcements
4. `prefers-reduced-motion`: disable camera sway, particles, interior transition animation
5. Brand alignment check: screenshot key states, verify 60-30-10 color rule
6. Cross-device testing (touch interactions for interior entry on mobile)
7. Landing page integration (existing NS-006 task)
8. Final licensing audit: all sources documented in LICENSES.md

**Success Criteria:**
- 60fps on desktop, 30fps on tablet, static fallback on mobile
- WCAG 2.1 AA compliance for interactive elements
- Brand guidelines v2 compliance verified
- All asset licenses documented

---

## 9. Risk Register

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Sketchfab CC-BY models too high-poly | Medium | Decimate in Blender to target. Verify face count before download. |
| AI-generated models have bad topology | Medium | Use AI for base shape, rebuild clean geometry in Blender. Budget 1 extra hour per AI model. |
| Interior loading causes frame drops | High | Show loading spinner during fade phase. Dispose aggressively on exit. Limit to one interior at a time. |
| Total GLB exceeds 3MB budget | Medium | Draco compression level 6, 512px textures max. Monitor cumulative size after each building. |
| Sourced model licenses change | Low | Screenshot license page at download time. Store in LICENSES.md. |
| Fly-in transition feels jarring | Medium | Fade-to-black approach (0.3s) is forgiving. Test on slow devices early. |
| Post-processing tanks mobile | High | All effects gated behind deviceTier check. Mobile gets static fallback. |
| Scope creep on interior detail | Medium | Hard limit: 8 props per interior, 8K triangles max. No animated characters. |

---

## 10. Milestone Timeline

| Phase | Duration | Start Condition | Deliverable |
|-------|----------|-----------------|-------------|
| **Phase 1** Art Direction | 2-3 days | This plan approved | Cinematic lighting, camera, atmosphere, post-processing |
| **Phase 2** Prototype (Career) | 2-3 days | Phase 1 complete | One building validated end-to-end (exterior + interior + fly-in) |
| **Phase 3** 9 Exteriors | 5-7 days | Phase 2 validated | All 10 premium exterior buildings |
| **Phase 4** 10 Interiors | 5-7 days | Phase 3 complete + fly-in code from Phase 2 | All 10 interior rooms with transitions |
| **Phase 5** Polish | 3-4 days | Phases 3+4 complete | Performance, accessibility, integration |
| **Total** | **17-24 days** | | Complete premium rebuild |

---

## 11. Appendix: Current Code Reference

### Existing Material Name Matching (GLBLandmark.tsx)

The following name patterns are scanned in GLB materials and auto-categorized:

```typescript
// Emissive materials: names containing "emissive" or "light"
// Accent materials: names containing "accent", "highlight", or "roof"  
// Glass materials: names containing "glass" or "window"
// Base materials: names containing "base", "wall", or "body"
// Fallback: if no matches, all materials treated as accents
```

All new buildings MUST use materials named to match these patterns. Recommended: use exact names `base`, `accent`, `glass`, `detail`, `emissive`.

### Current Module Positions (module-config.ts)

| Module | Raw Position | Spread Position (x1.4) |
|--------|-------------|----------------------|
| Sleep | [-5.2, 0, 2.8] | [-7.28, 0, 3.92] |
| Fitness | [0, 0, 3.1] | [0, 0, 4.34] |
| Nutrition | [5.2, 0, 2.6] | [7.28, 0, 3.64] |
| Wellbeing | [-5.3, 0, -2.1] | [-7.42, 0, -2.94] |
| Career | [-2.1, 0, -3.0] | [-2.94, 0, -4.2] |
| Productivity | [1.9, 0, -3.0] | [2.66, 0, -4.2] |
| Finance | [5.4, 0, -2.3] | [7.56, 0, -3.22] |
| Relationships | [-4.9, 0, -7.2] | [-6.86, 0, -10.08] |
| Faith | [0, 0, -7.6] | [0, 0, -10.64] |
| Meditation | [4.8, 0, -7.3] | [6.72, 0, -10.22] |

### Poly Haven HDRIs for Environment

| ID | Name | Best For |
|----|------|----------|
| `modern_buildings_night` | Modern Buildings Night | **Primary choice** — urban night, warm artificial lights |
| `cobblestone_street_night` | Cobblestone Street Night | Alternative — street-level, more intimate |
| `courtyard_night` | Courtyard Night | Alternative — clear sky, high contrast |
| `blaubeuren_night` | Blaubeuren Night | Backup — partly cloudy, softer |

### Poly Haven Textures for Buildings

| ID | Name | Use On |
|----|------|--------|
| `concrete_layers_02` | Concrete Layers 02 | Base walls (all buildings) |
| `brushed_concrete` | Brushed Concrete | Ground, floors |
| `metal_plate` | Metal Plate | Metal cladding (Career, Productivity) |
| `factory_wall` | Factory Wall | Industrial surfaces (Fitness) |
| `corrugated_iron` | Corrugated Iron | Roofing detail |
| `concrete_block_wall` | Concrete Block Wall | Foundation walls |

---

*This document is the single source of truth for the Balencia City premium rebuild. No implementation should begin until this plan is approved. All decisions, sources, and specifications are documented here for reference during development.*
