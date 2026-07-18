# G1 frozen implementation and evidence matrix

## Sol source decisions

- RPG registry stays exactly ten starting domains. `Spirituality` is member-facing copy for RPG `Faith` / `domain-faith`; it is not an eleventh stat.
- Learning and Creativity remain current Explore/category surfaces but are non-scored future RPG extensions: no Domain Stat, Life Power contribution, or level badge is shown.
- Unsupported/conflicting `Lv 12`, `Lv 8`, `Lvl 5`, and `Lv 3` labels are removed throughout G1. No character/domain level is inferred from unrelated fixtures.
- S38 uses registered `Wellbeing`, not the unregistered `Health` category.
- Finance/Plaid/Prayer/location/import/contact/calendar data is a bundled local demo, user-entered preview, cached fixture, or unavailable-provider state. No provider/readiness, credential, device, file, camera, storage, or network capability is implied or invoked.
- S30's category payload is exact: Dining `$650`, Transit `$400`, Groceries `$300`, Other `$800` = `$2,150`; income `$5,000`, net change `+$2,850`; Savings `$1,000` is an allocation subset; emergency fund `$6,000 / $10,000 = 60%` and is not green/done.
- S31 defaults to one Budget mode; Budget `$480 / $620` displays mathematically correct nearest-integer `77%` (from `77.42%`). Transaction mode is exclusive. Spotify is not Dining. Posted delete confirms exact item; pending/offline cannot delete.
- S32 shows `1 remaining`, skill targets are 10, shared `PaywallLock` is used, and no unsupported XP outcome is added.
- S33 shows `84 out of 99`, uses `domain-relationships`, and keeps real/estimated/null mutually exclusive.
- S34 removes the unsourced competing Today mission; prayer times are bundled demo unless the location-consent preview is selected; completion derives from checked rows.
- S35 daily mission is `9/15 = 60%`; separately named book completion may remain 62%. S36 partial progress never uses done green. S37 sensitive content is private/local with explicit voice-preview consent. S38 displays `5/8 = 63%` under nearest-integer rounding and labels correlation as association, not causation.
- All nine screens require full category/source/scope/freshness/confidence/retention/export/revoke/delete controls where personal/derived/provider data appears. Destructive previews confirm a named subject and never mutate external data.
- Asset disposition: all nine specs require no image; G1 is code-native only, no new raster/generated/provider/personal imagery.

## Exact state and proof matrix

| ID | PNG fixtures | Count | 125% proof |
|---|---|---:|---|
| 30 | `default-real,low-confidence,honest-null,skeleton,section-error-cached,offline,pending-transaction,category-selected,trend-scrub,add-transaction,scan-disabled,delete-confirm,save-success,data-controls` | 14 | `default-real` |
| 31 | `budget-default,transaction-default,budget-low-confidence,transaction-pending,budget-honest-null,transaction-honest-null,skeleton,error-cached,offline,budget-edit-disabled,budget-save-success,category-picker,receipt-options,delete-confirm,delete-failure,data-controls` | 16 | `budget-default` |
| 32 | `default,low-confidence,empty,error,offline,success,disabled,data-controls,premium-preview,log-action` | 10 | `default` |
| 33 | `default,low-confidence,empty,error,offline,person-expanded,log-success,suggestion-skipped,data-controls,log-quality-time` | 10 | `default` |
| 34 | `default,low-confidence,empty,prayer-api-error,offline,practice-success,disabled,data-controls,read-more,location-consent,reflection,contemplation-timer,breathing-timer,log-practice` | 14 | `default` |
| 35 | `default-real,low-confidence,honest-null,skeleton,error-import,offline,success-log,disabled-import,suggestion-done,log-sheet,course-controls` | 11 | `default-real` |
| 36 | `default-real,low-confidence,honest-null,skeleton,error-upload,offline,success-log,disabled-media,prompt-session,journal-reflect,milestone-detail,data-controls` | 12 | `default-real` |
| 37 | `default-entries,check-ins,honest-null,voice-null,low-confidence,skeleton,error-cached,offline,compose-text,compose-voice-consent,save-success,delete-confirm,data-controls,safety-open` | 14 | `default-entries` |
| 38 | `today-real,week,month,low-confidence,honest-null,skeleton,error-cached,offline,check-success,reminder-disabled,add-habit,data-controls,cia-detail` | 13 | `today-real` |

Exact acceptance: **114 PNG fixtures + nine screenshot-free actual 125% proofs = 123 isolated contexts**. Every PNG must be deterministic and meaningfully unique; long screens use full top-and-lower-view phone proofs without product-style mutation.

## Hard assertions

- Exact state marker, query fallback, 390×844 frame, <=1px horizontal overflow, no hidden bottom action, all named native controls >=44px, no nested interactive controls, visible focus, reduced-motion settlement, actual 125% font-size ratio, isolated storage/cookies, zero console/page/capability events.
- Every action-looking control has a deterministic local outcome, same-origin route, or disabled reason. Tabs map to named panels; dialog/sheet focus enters, traps, Escapes/closes, and restores; destructive action cannot occur before confirmation.
- Numeric/source assertions from the Sol decisions above are parsed from visible/accessible output, not marker-only checks. Null/low-confidence/error/offline states suppress unsupported values and derived CIA claims.
- Full nine-field data controls and local-only/dependency-honest provenance are visible and operable. No API/provider/device/storage/clipboard/share/payment/notification/external-navigation call occurs.
- Product/API/registry/verifier and 81-file accepted-through-F2 fingerprints are identical at verifier start/end. Exact context/PNG/check counts fail closed; promotion is atomic only after all assertions pass.

## Disjoint ownership

- Terra A: S30–S31 only.
- Terra B: S32–S34 only.
- Terra C: S35–S38 only.
- Sol only: verifier, shared kit/registry/routes/package surfaces, matrix, sentinels, ledgers, handoff, acceptance, and any source/privacy/finance/RPG adjudication.
