# D2 strict before-capture manifest

- Captured from fresh production origin `http://localhost:3002`
- Production build: `4DIYzXDGWaIiSUi5HAbHZ`
- Result: `7/7` rendered, `0` issue screens, `0` warning screens, `0` missing phone frames, and `0` console-error screens
- Instrumentation only: visible wrong-case CIA detector flagged all seven baseline screens; interactive counts were `19=4`, `42=3`, `43=3`, `68=14`, `71=5`, `83=8`, `92=6`. D2 reconciliation/verifier must classify the detector evidence rather than treating scanner silence as proof.
- Sol inspected all seven native-pixel baseline PNGs. The visible D2 defects match the audit: S42's Share is clipped, S68 combines incompatible states/counts, S71's 48px ring collides and uses Mission/emoji/literal color drift, S83 hides the third mission beneath a `2 active` claim and coexists with an empty prompt, and S92 mixes default/offline/sync-error while exposing a dead-end premium row. S19's ten-axis radar is present but its above-fold hierarchy and actionable/nonvisual contracts remain incomplete. S43 is the accepted sentinel and is unchanged.

| Artifact | SHA-256 |
|---|---|
| `before/19.png` | `d26595701a86f8cc5525d1b73bbeba3ed5419d4f5e8f9c006072fe5c74c610d3` |
| `before/42.png` | `d39740770325e0850a6a665a685971b782fb51cdf0c45fea45a0b33bf7ff7e12` |
| `before/43.png` | `8ff1f27a00a1cb251f3dac4be28b5e5da5c339fcbd6761ac772969678a5aafa3` |
| `before/68.png` | `691ba520976d58a99f9efe7b1cce13272d80e575192bf8d386f1a4c6455d557f` |
| `before/71.png` | `5d7cb949e124ff1dd79ba0efa8e349ab63f5efa0ba24e5c90db62e90c91d8415` |
| `before/83.png` | `643e8edf0537b8d595ad2b828ab0db276d1be3dccfc910212cc6e4c0f8fce711` |
| `before/92.png` | `c149c0ea301c9688bb891519b2ac5f83bca8bf811a9c169b374b1b263e0a1bbc` |
| `d2-before-strict.json` | `e251ef5239e08e4d895056ff7a90dfe13ce70eb61858002bb098386830dfbfa6` |

These are immutable before-evidence inputs. After evidence uses a separate pass-atomic directory and may not overwrite them.
