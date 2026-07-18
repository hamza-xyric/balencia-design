# D1 before-source evidence

- Captured: 2026-07-11 before any D1 product edit
- Active production verification origin: `http://localhost:3002`
- Production build at transition: `EeCHMg26d0yGZbyL-aWUG`
- C1 accepted product digest: `013bea5d034ab47df29de461b1791d037f988e0bb98aefbfcf6a2d4b26fb397e`
- S12 byte lock: `107b59b58bca73a05045dfd90a68cdf4219176f72aa7e6dcf48b59165f75df67`

## D1 product SHA-256 baseline

| File | SHA-256 |
|---|---|
| `balencia-screens/src/components/hifi/screens/profile/S17MeMain.tsx` | `7bfe03e8a3e01904f56aa3a3597c1f2652a508bb8f5fa3339fad141226a3a44f` |
| `balencia-screens/src/components/hifi/screens/profile/S18Explore.tsx` | `a847b4589d26dfe21f03c076f6ea20051614e0f0f1ec32e690bed9866f085e77` |
| `balencia-screens/src/components/hifi/screens/profile/S21Settings.tsx` | `121276ed7185bbec8c9fe3ea5183b5c500fa91d27059fef77631fd3957b0ecf5` |
| `balencia-screens/src/components/hifi/screens/profile/S22ConnectedServices.tsx` | `c09e517db5e6ecdb0f6be54f775802d0cdea8745afe1efc17e6c1b0e4ea1d152` |
| `balencia-screens/src/components/hifi/screens/profile/S23SubscriptionBilling.tsx` | `3c16811e2a4fe978fa56c8516bf0617c57fe2137e2d30f519b733e90854b35e8` |
| `balencia-screens/src/components/hifi/screens/profile/S24NotificationHistory.tsx` | `ce1ecd433683ab72dde3f71be5ff512b84917e1993a81727dd165083ed9df1a3` |
| `balencia-screens/src/components/hifi/screens/profile/S25HelpCenter.tsx` | `0b6490ffbc76a9d09cc3bfc520f95073fd390508a3208592193238a5d0b4ce3a` |
| `balencia-screens/src/components/hifi/screens/profile/S50ProfileEdit.tsx` | `83de0fdee6123f3cd0461fb13f713c057e4245c3e3057924e00721f09d231f17` |

## Baseline rules

- The running `:3002` server is the fresh production build retained from C1 closure and includes these unmodified D1 sources.
- Strict before capture completed against `http://localhost:3002`: 8/8 rendered, zero issues, two warning screens, eight PNGs in `evidence/before/`, report `evidence/d1-before-strict.json`.
- Pre-existing strict warnings: S22 `Force sync` measured 90x36; S23 `Update` 63x36, `Buy credits` 36x36, and `Credits ledger` 36x36. These are D1 repair inputs, not accepted waivers.
- Sol full-resolution baseline inspection confirmed the expected visible defects, including S24 literal markup leakage and clipped below-fold operational content on multiple screens.
- No evidence from dev `:3001` is admissible.
