# Capture Screenshots

Use visual screenshots as evidence, but keep markdown findings as the durable source of truth.

```bash
cd balencia-screens
VISUAL_AUDIT_BASE_URL=http://localhost:3000 npm run verify:visual -- --screenshots
```

The script saves screenshots to the configured visual audit screenshot directory. Note screenshot paths in screen findings only when they clarify a specific issue.

For compiled batch audits, record the screenshot path for every reviewed screen in the active batch file under that screen's `Screenshot:` line. Use a focused screenshot directory when the generic visual script does not cover all active routes.

## A++ Re-Review Evidence

The existing `verify:visual` script covers a curated high-risk subset, not all 90 screens. For the A++ pass, every active batch must capture fresh route evidence for every listed screen.

Required evidence per screen:

- initial mobile screenshot at 375px width or the phone-frame screenshot from the local prototype
- browser observation of primary action behavior
- screenshots or notes for important modal, bottom-sheet, disabled, error, empty, keyboard, or permission states
- active local URL and date in the R batch file

Save A++ evidence under:

```text
balencia-screens/output/a-plus-plus-review/RXX/
```

Use the generic visual script as a supplemental high-risk layout scan, not as the only evidence source.
