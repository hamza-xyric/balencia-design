# Habitica UI/UX Notes

## Evidence Reviewed

- Public App Store iPhone screenshots for dailies, task states, task creation, rewards, party quests, and collection progression.
- Habitica App Store metadata and public iOS wiki for platform/context references.
- YouTube evidence: third-party Habitica tutorial/review, Habitica versus LifeUp comparison, and supplemental gamified-productivity review videos.

## Visual System

- Habitica uses a strong retro RPG aesthetic: pixel typography in marketing frames, pixel art rewards, saturated gradients, and fantasy game metaphors.
- In-app task surfaces are more conventional than the marketing shell: cards, checkboxes, tab bars, list rows, and form fields.
- Color is highly functional. Task colors indicate habit/task value or type, and progress bars make health/experience/mana visible.
- The palette is broad and saturated, with purple as the strongest brand anchor.
- The UI can feel playful and motivating for game-aligned users, but visually busy for users who want calm productivity.

## Layout Patterns

- The main task screen shows avatar/status at the top, then task lists below.
- Dailies/tasks use stacked rows with colored left rails, square checkboxes, metadata, checklist expansion, and small icon indicators.
- Task creation is a modal/form with title, notes, checklist, difficulty, and scheduling controls.
- Rewards screen connects real-world treats to in-game currency, using list rows with coin costs.
- Party quest screen shows group accountability through a shared boss/goal card, participant list, and progress bars.
- Collection screen uses a dense grid with locked/unlocked states and a count indicator.
- Video evidence confirms the core taxonomy: habits for behaviors to repeat or break, dailies for scheduled recurring actions, and to-dos for discrete tasks.
- Tutorial evidence adds that difficulty/reward tuning is a meaningful setup pattern, but can become extra work if the user has to calibrate too much.

## Navigation

- Habitica is task-tab based: habits, dailies, to-dos, rewards, and menu are primary anchors.
- Deep areas such as party, collections, and task creation sit behind stack/modal flows.
- The app exposes many systems directly, which rewards committed users but creates a steeper learning curve.
- Third-party review evidence highlights an IA limitation: to-dos can feel crowded when the user wants project/category organization beyond Habitica's simple task buckets.

## Interaction Design

- Checking off tasks creates immediate reward feedback through gold, XP, items, and progress changes.
- Task creation has meaningful controls: difficulty, schedule, checklist, and repeat cadence.
- Rewards are user-understandable because the cost/reward exchange is visible.
- Party quests turn individual task completion into shared progress, adding social pressure.
- Locked collection items communicate long-term goals without needing explanatory copy.
- Completing actions produces immediate XP/gold feedback, while longer-term systems include class choice, character skills, gear, pets, mounts, and quests.
- Custom rewards let users turn earned currency into personal real-world incentives.
- Party and boss-battle mechanics add accountability, but missed dailies can create group pressure.

## Motivation Model

- Habitica motivates through game loops: completion, currency, leveling, rewards, quests, party accountability, and collection.
- It makes progress visible at multiple time scales: per-task, daily list, level, party battle, and collection count.
- The strongest engagement mechanic is social consequence. A missed or completed task affects the group journey, not only the individual.
- The risk is that motivation can become pressure, and the RPG layer may alienate mainstream users.
- Third-party critique suggests Habitica can make productivity more fun without necessarily making users more productive; some users spend time leveling, shopping, configuring rewards, and tuning tasks.
- Habitica works best for users already motivated by game systems. The mechanics are strong, but the UI/UX should not be treated as universally appealing.

## Balencia Takeaways

### Borrow

- Give Balencia users a visible exchange between real actions and rewards.
- Add user-defined rewards so XP/gold-like systems connect to real-life motivation.
- Use group challenges or shared quests for accountability, not only leaderboards.
- Make difficulty and cadence explicit when creating recurring actions.
- Show locked/future collectibles or milestones as long-term motivation.
- Map repeated Balencia actions to real-life skills/domains so progress feels useful, not purely cosmetic.
- Support custom rewards that users can price with earned points.

### Avoid

- Do not let game mechanics dominate the whole product surface.
- Do not use punishment-heavy mechanics as the default motivation model.
- Do not make every feature visible at once; Balencia needs progressive disclosure for the Mother Test.
- Do not make reward setup, shop browsing, or task tuning a distraction from the action Balencia is meant to encourage.
- Do not rely on simple task buckets if Balencia needs domain, goal, and project planning.

### Adapt Carefully

- Habitica's RPG depth is proven but polarizing. Balencia should keep the mechanics mature, optional-feeling, and attached to real coaching value.
- Party quests are powerful, but Balencia should adapt them into supportive shared goals rather than stressful obligation.
- Collection and cosmetic loops can help retention, but the primary reward should remain improved life clarity.
- Difficulty and reward weighting can make effort feel fair, but Balencia should let SIA suggest defaults so users are not forced into manual calibration.
