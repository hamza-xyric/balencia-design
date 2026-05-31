# Reviewer Personas (the audit team)

Each file is **one reviewer persona = one risk lens** (FRAMEWORK.md move Verify (A6), principle #7). Run an item past all of them; together they catch risk classes a single reviewer misses. They are **audit-only** — personas surface findings, they do not edit.

The six here are generalized from a UI/UX build. **Rename / retarget them to your domain's risk lenses** — keep the `Focus / Questions / Output` shape:

| Persona file | The lens | Non-UI analogue |
|--------------|----------|-----------------|
| `strategist.md` | does this make sense / belong here? | product/architecture fit |
| `competitive.md` | is it best-in-class? | prior-art / benchmark |
| `content-trust.md` | clear, honest, safe? | docs clarity / security / privacy |
| `brand-guardian.md` | on-brand, premium, consistent? | API/style consistency |
| `interaction-qa.md` | does it work, ergonomically? | correctness / operability QA |
| `release-readiness.md` | is the build TRUE? | CI/build verification sign-off |

All personas share one **finding format** (see `../AGENTS.md`): item id · locator · severity (`critical`/`major`/`minor`/`nit`) · category · evidence · impact · recommendation · decision status.
