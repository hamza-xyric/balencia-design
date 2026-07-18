# R11 environment pin — pre-authorization intake

This file records the configuration that must be re-read and frozen after founder authorization. It is not yet the final immutable manifest.

## Accepted intake

- observed branch / baseline HEAD: `hifi-build` / `5e933f6016f8e550244663d9383d19885113b7d0`
- host: `Darwin 24.6.0 arm64`
- Node / npm: `v26.0.0` / `11.12.1`
- Next / React / React DOM: `16.2.6` / `19.2.4` / `19.2.4`
- Playwright core: `1.60.0`
- bundled browser: Google Chrome for Testing `148.0.7778.96` (`chromium-1223`, macOS arm64)
- package-lock SHA-256: `c98ac50e650dc57702cedcd5b7e18e5d768c1bdab211dea19237c8eaa3c7d92d`
- strict verifier SHA-256: `63ce744a4f83dbfc5bc46a9c4a9a02f99edd1f0d5d3f653282c036695ee8fa34`
- current accepted I1 production build: `Qn4oB4x3eDtW9xG-vnrPE`
- production verification origin: `http://localhost:3002`
- viewport: `390 × 844`
- DPR: `1`
- reduced motion: enabled for deterministic capture, with explicit motion/reduced-motion state checks
- route set/order: canonical 104-route registry
- product digest: `ff6f33cbf268056163765e7bfac1a6bfc2f680e6f72e2956f5e38f294ce4cda8`
- API/verifier digest: `a55bc55db17fb67e2f0d30a7418db5991769806adb0d097f01d64aeb8d297c2a`
- production-input digest: `b6d39393686b8bbdd6834760c8e9300d172f959791cc545406c099e914e3dda4`
- accepted 100-file pre-I1 digest: `8616b67d6b2977d8c141838f41e4cb9bd7ee680faf346ec6c9bac84e5415ab05`
- canonical I1 acceptance SHA-256: `b36e30e53795353886787d721d75db3f6ab3450d2b4e69933596d2e94c493b5d`
- canonical I1 strict SHA-256: `d1900d1bfa1ee4d00acf698c0934feb88e6fd96b81becd1a640125d3d95140fd`
- accepted HIFI-26-01 SHA-256 (both filenames): `666a4e746cddfc56a2647840904b5a32542bc29d3b6510620ef01f133afaead8`
- accepted HIFI-75-01 SHA-256: `2e3f7674fe6100ec75ee77a02e9beff87c55870af8c6e44462625311f7590b39`
- accepted HIFI-80-01 SHA-256: `01a6aa68730a7492a71f175c7fe6f0e5292ed0628347fcc66e28b9e1adefa465`

## Final pin requirements

At R11 execution, `ENVIRONMENT-MANIFEST.md` must record:

- candidate Git tree ID and resulting commit SHA;
- branch and parent SHA;
- OS/architecture;
- Node, npm, Next, React, Playwright package and browser binary versions;
- package-lock/config hashes and production build ID;
- viewport, DPR, locale, timezone, color scheme, reduced-motion value, font readiness, and network policy;
- strict scanner thresholds and hash of `verify-visual-104.mjs`;
- hash/version of the dedicated R11 verifier;
- exact 104 route IDs/order and registry hash;
- accepted product/sentinel/asset hashes;
- both capture JSON hashes, per-PNG manifest digests, aggregate equality result, and evidence paths;
- clean staged-tree comparison plus root/read-only-submodule diff-check results.

No version or threshold may be inferred from memory. Every final value must be captured by a command or file hash after authorization and before the staged tree is committed.
