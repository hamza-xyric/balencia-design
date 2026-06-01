# Close Screen Iteration Batch

Before marking a P batch complete:

1. Confirm every listed route was browser-reviewed.
2. Confirm the active batch file lists changed files, findings addressed, findings deferred, and verification results.
3. Confirm `npm run check` passed from `balencia-screens`.
4. Confirm `npm run build` passed when the batch has `Build gate: required`.
5. Confirm any visual audit result used the active local URL and is recorded.
6. Update `screen-iteration-batches/index.md` status for the batch.
7. If a deferred item is product/scope/privacy-related, add or update it in `findings/deferred-decisions.md`.
8. If a deferred item is implementation polish, keep it in the P batch and reference the next batch or follow-up.

Do not close a batch with vague notes such as "looks good." The close record must make it clear what was verified and what remains.
