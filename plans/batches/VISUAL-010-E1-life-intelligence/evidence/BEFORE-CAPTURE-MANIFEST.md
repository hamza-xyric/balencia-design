# E1 before-capture manifest

- Fresh production build `_B48tktmzlneYs-G6PIeK` served on `:3002`.
- Strict baseline: `8/8` loaded, zero core issues/missing frames/console errors; expected warnings only on S90 (six 34px segmented targets) and S93 (four 34px timeframe targets).
- Evidence: `e1-before-strict.json` and `before/{16,20,48,72,84,90,93,96}.png`.
- PNG SHA-256: S16 `52a7a60ddd4c05fb552c864709cc05e9046a196cca1fe3892b3ca43aa9b196`; S20 `43017baadbb6d909a9e3bd44b0867dd840d9d0a0a157b2dd02714590b41adb3b`; S48 `a009b26ce686187fb5dc5e72f3e0d5018af1622c191b379e4eac04550991f0da`; S72 `3b1206a0f273c837f7fa3a8e9571b97a019baea576fa57edf9753920cdbde054`; S84 `82c2c6ef8ad7d66f89775f183f58b43c3f9df9ef1ec830155b5725cd575c6e82`; S90 `0aae0bdea8b2f16badaca658df581449c29dd962d03fd9de02d091c47acc3fb0`; S93 `e11423d96a04fa4831dc3289754fe54a772394e43096523fc298f3264e6d4b1e`; S96 `8dc9e7710d3e04b1ff16069308481a096808219efc05d754426aed1eb84810c9`.
- These images are immutable before evidence. Final evidence must use a new directory.
