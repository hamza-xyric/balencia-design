# VISUAL-005 A2 asset disposition

All seven current A2 specs explicitly state `Image Slots — None required`:

- `05-forgot-password.md`
- `05b-reset-password.md`
- `06-guest-mode-preview.md`
- `07-cia-onboarding-conversation.md`
- `08-initial-plan-summary.md`
- `65-force-update.md`
- `66-notification-permission.md`

No bitmap slot was silently deleted, waived or replaced. No ImageGen asset was required for this family. Screens 05, 05b, 06 and 65 use existing official immutable Balencia assets from `public/logos/`; screen 65 places the unmodified black official mark on a high-contrast orange badge surface. Radar, constellation, CIA, permission and system-state visuals remain code/SVG-native UI rather than flattened raster UI.
