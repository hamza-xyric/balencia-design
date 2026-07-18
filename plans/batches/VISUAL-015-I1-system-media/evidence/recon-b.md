# I1 recon B — S80/S81 evidence

## S80 accepted sentinel

- Current accepted worktree module SHA-256: `250fe435013c40a7060b3c91f49be39f5328c213095323c1d2072d3100fc38fb`; accepted HIFI-80-01 SHA-256: `01a6aa68730a7492a71f175c7fe6f0e5292ed0628347fcc66e28b9e1adefa465` (1024×1024 RGB PNG).
- S80 was accepted in the seven-screen pilot under DVF-10 and is included in the inherited 90-file sentinel set. Byte-lock means current worktree bytes, not Git HEAD.
- Current source already satisfies the stale audit’s live defects: connected Spotify source/freshness (`S80MusicCoach.tsx:134-147`), native labeled `0..192` range at `118 = 1:58` (`:76-105`), active Pause frame (`:117-123`), coherent `154–158` / `156 BPM` claims (`:148-178`), low-confidence recommendation (`:194-208`), full linked controls plus Export/Revoke/Disconnect/Delete (`:212-260`), and Manage Spotify with no Connect copy (`:263-269`).
- Asset disposition is fulfilled and immutable: abstract decorative art, no provider mark, text, logo, UI control, or person. Empty alt is correct because track/provider/playback meaning is exposed in adjacent content.
- Exact verification contexts: default; keyboard seek/focus (`118→119`, Home `0`, End `192`); listening/privacy section; provider CTA; actual 125% proof; reduced-motion focus replay. Do not claim click transitions for handler-free transport/provider/data buttons.
- Residual evidence limits: W-TRUNC-80 remains; physical AT should validate range value phrasing; decorative waveform does not recompute after DOM-range input and must not be described as live playback capability.

## S81

- Current positives: native search field shell, named featured Play/Save controls, visible 43% and 12% progress, unavailable row, recommendation provenance, and explicit external-browser/no-share copy.
- Current defects: category chips are inert spans; See all is 36×16 and row bookmarks are 32×44; next-video row bodies are not playable; two orphaned `role=listitem` nodes lack a list; search has no local result behavior; unavailable/retry and external-search controls have no local outcome; progress purple is used for a non-CIA playback metric; code-native media disposition is implicit (`S81VideoLibrary.tsx:1-174`; baseline strict evidence; audit row `I1-system-media.md:68`).
- Frozen repair: native labeled search; pressed category buttons; sibling whole-row play/resume and 44px save actions without nested interactives; coherent playing/resume/saved/unavailable/error/offline states; external-search confirmation before a blocked local preview; full data controls. HIFI-81-01 is an explicit code-native abstract/honest-null treatment with no people, logos, provider marks, or private text.
- Exact states are frozen in `FROZEN-MATRIX.md`; verifier must assert the 43%/12% values only on corresponding playable fixtures, unavailable/processing states do not expose Play, and no browser/share/provider event occurs.
