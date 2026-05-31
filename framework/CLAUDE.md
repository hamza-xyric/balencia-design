# CLAUDE.md — you are looking at the Production Framework

This folder (`framework/`) is the **Production Framework**: a reusable, domain-agnostic method for getting high-quality output from AI models on serious work, plus the templates and a ready-to-drop starter payload to apply it. It is meant to be **copied into a project and used** — it is not itself a project.

## If you want to…
- **Understand the method** → read `FRAMEWORK.md` Part A (the 8 moves), skim Part B (the Balencia case study), keep Part C as the working reference.
- **Start a new project with it** → see `START-HERE.md` (one screen) or `README.md`. The on-ramp is: copy this folder into your project, activate the `starter/` payload at the project root, then run `/onboard`.
- **Build or extend a capability** → use the blank scaffolds in `templates/capabilities/` and the build loop in `FRAMEWORK.md` §C11.
- **Know what travels vs what you build** → see `FRAMEWORK.md` → *"What this folder assumes, ships, and expects you to build."*

## What's here (map)
- `FRAMEWORK.md` — the master guide (Part A method · Part B case study · Part C mechanics).
- `README.md` / `START-HERE.md` — quickstart + one-screen index + file-map.
- `templates/` — blank, `<PLACEHOLDER>`-tokened scaffolds for every artifact the method uses. **These stay blank** — fill *copies* in your project, never the templates in place.
- `starter/` — the **working** payload: a real self-activating `CLAUDE.md`, the `research-first` skill, the `/handoff` · `/start-handoff` · `/onboard` commands, and a `memory/` scaffold. Copy its contents into a new project's root to activate.
- `verify/portability-check.mjs` — self-check: scans a project for dangling references the framework names.
- `VERSION` / `CHANGELOG.md` — which framework version/method seeded a project.

## The one rule that keeps this folder coherent
`templates/` = **blank** scaffolds (build new things from these). `starter/` = **working** files (already filled, ready to run). Keep the two separate — never fill the templates in place, and never strip the starter back to placeholders.
