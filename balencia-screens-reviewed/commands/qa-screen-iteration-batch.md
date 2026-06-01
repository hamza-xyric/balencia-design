# QA Screen Iteration Batch

Use this command after implementing a P batch, before closing it.

## Mechanical Checks

```bash
cd balencia-screens
npm run check
```

Run the production build for P00 and every third polish batch: P03, P06, P09, P12, P15, P18.

```bash
cd balencia-screens
npm run build
```

Run visual overlap checks against the active local server. If the server is not on port 3005, replace the URL with the one printed by Next.js.

```bash
cd balencia-screens
VISUAL_AUDIT_BASE_URL=http://localhost:3005 npm run verify:visual
```

## Browser QA

For every route in the active P batch:

- route loads without console/runtime errors
- primary CTA performs a visible action or navigates as specified
- obvious secondary actions work or are honestly disabled
- text does not clip or overlap
- bottom actions avoid tab bar and home indicator collisions
- touch targets are at least 44px where practical
- privacy/consent copy appears before sensitive action
- SIA behavior is explicit and not always-on in social contexts

Record route-level evidence in the P batch file before closing.
