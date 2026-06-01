# R08 - Identity, Settings, Billing

- Status: `reviewed`
- Reviewed: 2026-05-27
- Prototype URL: `http://localhost:3000`
- Screens: `19`, `20`, `21`, `22`, `23`
- Routes: `/tabs/me/rpg`, `/tabs/me/personal-wiki`, `/tabs/me/settings`, `/tabs/me/connected-services`, `/tabs/me/subscription`
- Sources: `../batches/batch-08.md`, `../update-batches/batch-u04.md`, `../screen-iteration-batches/P08-identity-settings-billing.md`
- Evidence directory: `../../balencia-screens/output/a-plus-plus-review/R08/`
- Interaction evidence: `../../balencia-screens/output/a-plus-plus-review/R08/states/r08-state-capture.json`
- Build gate: no
- Finding IDs: `R08-F01` through `R08-F05`

## Focus

Validate identity, memory, settings, connected services, and billing. A++ requires premium but responsible RPG framing, transparent SIA memory, platform-grade settings, provider trust, and billing clarity.

## Batch Summary

- Grade count: A++ `0`, A+ `2`, A `3`, below A `0`.
- A++ screens: none.
- Needs polish: 19 RPG character, 20 Personal wiki, 21 Settings, 22 Connected services, 23 Subscription & billing.
- New findings: `R08-F01` through `R08-F05`.
- Build: not required for R08.

## Evidence And Verification

| Item | Result | Notes |
| --- | --- | --- |
| Base URL | `http://localhost:3000` | Existing local prototype used for baseline and interaction evidence. |
| Baseline route evidence | passed | Initial screenshots and route JSON already existed under `../../balencia-screens/output/a-plus-plus-review/R08/`. Baseline found 0 console errors, 0 small-target candidates, and 0 nested-control candidates on all five R08 routes. |
| Interaction capture | completed with expected finding signal | `node scripts/capture-r08-states.mjs` saved state screenshots under `../../balencia-screens/output/a-plus-plus-review/R08/states/`; the script returned non-zero because the tested RPG Sleep Dashboard CTA produced a 404 console error, recorded as `R08-F01`. |
| `npm run check` | passed | Run from `balencia-screens` on 2026-05-27. `eslint`, `tsc --noEmit`, `verify:routes`, `verify:assets`, `verify:copy`, and `verify:brand` passed. |

## Screen Notes

### 19 - RPG character

- Status: reviewed
- Route: `/tabs/me/rpg`
- Five-second read: A premium character sheet with a clear avatar, level, Life Power number, domain stats, streak rewards, and mission history.
- Screen purpose and journey fit: Strong fit for the Me stack; it makes progress feel tangible and supports mature RPG motivation.
- Primary action clarity: Reviewing progression is immediately clear; domain cards clearly open sub-stats, but the sheet's Dashboard CTA is not reliable for every visible domain.
- Emotional tone: Celebratory, mature, and on-brand without cartoonish pressure.
- Evidence paths: `../../balencia-screens/output/a-plus-plus-review/R08/19-tabs-me-rpg-phone.png`, `../../balencia-screens/output/a-plus-plus-review/R08/states/19-rpg-fitness-substats.png`, `../../balencia-screens/output/a-plus-plus-review/R08/states/19-rpg-sleep-dashboard-click.png`

| Visible control | Purpose | State / evidence |
| --- | --- | --- |
| Back | Return to Me stack root. | Semantic 44x44 button in baseline evidence. |
| 10 domain skill cards | Open domain sub-stats bottom sheet. | Semantic buttons, 108x88; Fitness and Sleep sheets captured. |
| Sub-stats Close | Dismiss sheet. | Works in interaction capture. |
| Sub-stats Dashboard | Route to the matching domain/feature destination. | Fitness points to `/domains/fitness`; Sleep points to `/domains/sleep` and 404s. |
| View all | Open streak details/rewards. | Link to `/tabs/goals/streaks`, 68x44. |
| Mission history rows | Open archived mission detail. | Links to `/tabs/goals/detail`, 72-73px high. |
| View full journal | Open Mission Journal. | Link to `/tabs/goals/journal`, 44px high. |
| Bottom tabs | Global app navigation. | Present with Me active. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | The screen belongs in Me and makes progress legible. |
| User friction | 4 | Core reading and sheet opening work, but invalid dashboard links break a key drill-down path. |
| Visual appeal | 5 | Strong hierarchy, premium dark cards, and restrained domain color. |
| Brand fit | 5 | RPG language feels adult and Balencia-native. |
| Mobile ergonomics | 5 | Targets clear the 44px gate in baseline and state evidence. |
| Accessibility | 5 | Main controls are semantic and labeled. |
| Trust/privacy | 5 | No sensitive ask; progress data is presented cleanly. |
| Industry best practice | 4 | Profile/stat sheets should not expose dead drill-down links. |

- Grade: `A`
- Grade cap: Major navigation finding prevents `A+` or `A++`.

| Finding | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R08-F01 | major | navigation | `states/19-rpg-sleep-substats.png` shows the Sleep sub-stats Dashboard CTA with `href="/domains/sleep"`; `states/19-rpg-sleep-dashboard-click.png` lands on `http://localhost:3000/domains/sleep` with 404 text and console output. Current route construction also maps visible Sleep, Wellbeing, Productivity, and Meditation cards to non-registered `/domains/...` paths. | Users who explore several domain stats hit a dead route from a high-confidence progress screen, breaking trust in the RPG drill-down model. | Map every domain Dashboard CTA to a registered canonical destination, such as Sleep to `/features/sleep`, Meditation to `/features/meditation`, and Wellbeing/Productivity to their appropriate dashboards/features; otherwise disable or relabel unavailable dashboard CTAs. | proposed | Prevents A+ and A++ |

Decision: `needs polish`

### 20 - Personal wiki

- Status: reviewed
- Route: `/tabs/me/personal-wiki`
- Five-second read: SIA memory is transparent, searchable, and visibly controllable through edit and correction actions.
- Screen purpose and journey fit: Strong trust feature in the Me stack; it gives users direct visibility into what SIA knows.
- Primary action clarity: Search, chapter browsing, edit, save, and "This is wrong" are clear and work in the captured flow.
- Emotional tone: Calm and trust-building, with appropriate seriousness around incorrect memories.
- Evidence paths: `../../balencia-screens/output/a-plus-plus-review/R08/20-tabs-me-personal-wiki-phone.png`, `../../balencia-screens/output/a-plus-plus-review/R08/states/20-wiki-search-sleep.png`, `../../balencia-screens/output/a-plus-plus-review/R08/states/20-wiki-edit-mode.png`, `../../balencia-screens/output/a-plus-plus-review/R08/states/20-wiki-review-memory-sheet.png`

| Visible control | Purpose | State / evidence |
| --- | --- | --- |
| Back | Return to Me. | Semantic 44x44 button. |
| Search input and clear | Search memory entries across chapters. | Search for `sleep` returned one correlation result; clear returned to chapter mode. |
| Chapter tabs | Switch memory categories. | 44px tabs work, but counts do not match available entries in empty chapters. |
| Show more / Show less | Expand or collapse long memory copy. | Visible on memory cards. |
| Edit | Enter inline edit mode. | Captured with Title and Memory fields plus Save/Cancel/Delete. |
| This is wrong | Open review/removal sheet. | Captured with remove, edit instead, and cancel choices. |
| Save / Cancel / Delete | Complete or exit inline memory edit. | Save updates source to edited-by-you for the session. |
| Bottom tabs | Global app navigation. | Present with Me active. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | Making SIA memory visible and editable is central to trust. |
| User friction | 4 | Main controls work, but empty chapters contradict their visible counts. |
| Visual appeal | 5 | Compact, premium, readable memory cards. |
| Brand fit | 5 | SIA memory is handled with restraint instead of purple overstatement. |
| Mobile ergonomics | 5 | Search, tabs, and memory controls meet the target-size gate. |
| Accessibility | 5 | Search is a real input; tabs and buttons are semantic. |
| Trust/privacy | 4 | Control model works, but inconsistent chapter counts weaken confidence in SIA memory accuracy. |
| Industry best practice | 4 | AI memory centers should keep counts, empty states, and data surfaces exact. |

- Grade: `A+`
- Grade cap: Minor memory-data fidelity finding prevents `A++`.

| Finding | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R08-F02 | minor | trust-privacy | `states/20-wiki-preferences-tab.png` shows `Preferences (16)` but the selected chapter renders `0 entries - last updated today` and an empty-state card. The same fixture only contains visible entries for Patterns and Correlations despite non-zero counts on other tabs. | Users may doubt whether SIA memory counts are accurate or whether memories are hidden/missing. | Align chapter counts with actual entries in the prototype data, or present a clearly documented loading/sample-data state for chapters that are not populated yet. | proposed | Prevents A++ |

Decision: `needs polish`

### 21 - Settings

- Status: reviewed
- Route: `/tabs/me/settings`
- Five-second read: A comprehensive, organized settings surface with clear account, SIA, notification, privacy, legal, and destructive sections.
- Screen purpose and journey fit: Correct utility screen for Me; the grouping is platform-familiar and easy to scan.
- Primary action clarity: Rows look adjustable and most controls open something, but the opened sheets are generic and do not match several setting-specific tasks.
- Emotional tone: Calm, controlled, and appropriate for account/privacy work.
- Evidence paths: `../../balencia-screens/output/a-plus-plus-review/R08/21-tabs-me-settings-phone.png`, `../../balencia-screens/output/a-plus-plus-review/R08/states/21-settings-face-id-toggle.png`, `../../balencia-screens/output/a-plus-plus-review/R08/states/21-settings-change-password-sheet.png`, `../../balencia-screens/output/a-plus-plus-review/R08/states/21-settings-language-sheet.png`, `../../balencia-screens/output/a-plus-plus-review/R08/states/21-settings-delete-account-confirmation.png`

| Visible control | Purpose | State / evidence |
| --- | --- | --- |
| Back | Return to Me. | Semantic 44x44 button. |
| Change password | Open password-change flow. | Opens a generic Recommended/Custom/Off sheet rather than password fields. |
| Face ID / notification / background sync rows | Toggle settings. | Full-row `role="switch"` controls; Face ID state captured. |
| Manage subscription / Connected services | Navigate to related management screens. | Links to `/tabs/me/subscription` and `/tabs/me/connected-services`. |
| SIA preference rows | Review or change coaching preferences. | Open the same generic picker sheet. |
| Quiet hours / Channels | Review notification timing/channel settings. | Open the same generic picker sheet. |
| Theme | Communicate dark-only V1 state. | Honestly disabled. |
| Language / Units / Time / Date / Privacy / Legal rows | Review or change values/legal info. | Open the same generic picker sheet, including rows that need specific options or legal content. |
| Sign out / Delete account | Confirm account-level destructive actions. | Delete-account confirmation captured with export-before-delete copy. |
| Bottom tabs | Global app navigation. | Present with Me active. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | The IA is right for a central settings hub. |
| User friction | 3 | Many rows open non-specific controls, so users cannot complete important tasks like changing password. |
| Visual appeal | 5 | Grouped rows, typography, and spacing are polished. |
| Brand fit | 5 | Utility tone stays dark, calm, and restrained. |
| Mobile ergonomics | 5 | Rows and toggles meet mobile target expectations. |
| Accessibility | 4 | Rows are semantic, but generic sheet choices create confusing control names for task-specific flows. |
| Trust/privacy | 3 | Security, privacy, legal, and retention rows need accurate flows before handoff. |
| Industry best practice | 3 | Settings rows should route to specific pickers, forms, documents, or confirmations. |

- Grade: `A`
- Grade cap: Major settings-control finding prevents `A+` or `A++`.

| Finding | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R08-F03 | major | settings-control | `states/21-settings-change-password-sheet.png` shows Change password opening a generic `Recommended / Custom / Off` picker. `states/21-settings-language-sheet.png` shows the same generic options for Language. This pattern is also used by multiple preference, privacy, legal, and locale rows. | Users cannot complete task-specific settings work, and security/legal controls look wired while still lacking the actual Figma behavior. | Replace the generic sheet with row-specific flows: password form with validation, real value pickers for language/units/time/date, legal document views, privacy/data-retention explanations, and task-specific save/confirmation states. | proposed | Prevents A+ and A++ |

Decision: `needs polish`

### 22 - Connected services

- Status: reviewed
- Route: `/tabs/me/connected-services`
- Five-second read: A clear integration manager with visible provider cards, scope/storage copy, status, and connect/disconnect actions.
- Screen purpose and journey fit: Strong fit for Balencia's cross-domain intelligence and user data-control story.
- Primary action clarity: Connect, force sync, and disconnect are visually clear and stateful in the prototype.
- Emotional tone: Professional and reassuring; SIA is present without becoming noisy.
- Evidence paths: `../../balencia-screens/output/a-plus-plus-review/R08/22-tabs-me-connected-services-phone.png`, `../../balencia-screens/output/a-plus-plus-review/R08/states/22-services-apple-health-oauth-preview.png`, `../../balencia-screens/output/a-plus-plus-review/R08/states/22-services-apple-health-connected.png`, `../../balencia-screens/output/a-plus-plus-review/R08/states/22-services-whoop-syncing.png`, `../../balencia-screens/output/a-plus-plus-review/R08/states/22-services-whoop-disconnect-confirmation.png`

| Visible control | Purpose | State / evidence |
| --- | --- | --- |
| Back | Return to previous Me/settings screen. | Semantic 44x44 button. |
| Connect | Open provider OAuth preview. | Apple Health preview captured with scopes, cadence, storage, and Allow/Cancel. |
| Allow / Cancel | Complete or dismiss OAuth preview. | Allow transitions Apple Health to connected with `Last sync: just now`. |
| Force sync | Manually refresh connected service. | WHOOP captured in temporary `Syncing` state. |
| Disconnect | Open revoke/disconnect confirmation. | WHOOP confirmation captured with future-sync and delete/revocation copy. |
| Keep / Disconnect confirmation | Preserve or disconnect service. | Confirmation controls are 48px high. |
| Bottom tabs | Global app navigation. | Present with Me active. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | Integrations are essential to Balencia's coaching model. |
| User friction | 5 | Primary provider flows are clear and stateful. |
| Visual appeal | 5 | Cards are scannable and composed. |
| Brand fit | 5 | Purple is limited to SIA context; orange drives action; green communicates connection. |
| Mobile ergonomics | 5 | Integration actions meet the 44px target gate. |
| Accessibility | 4 | Buttons are semantic, but repeated accessible names like `Connect` and `Disconnect` lack provider context. |
| Trust/privacy | 5 | Scope, cadence, storage, disconnect, deletion, and revocation copy are present. |
| Industry best practice | 5 | OAuth preview, loading/sync, and disconnect confirmation are in place. |

- Grade: `A+`
- Grade cap: Minor accessibility labeling gap prevents `A++`.

| Finding | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R08-F04 | minor | accessibility | Baseline and state evidence list many service action controls with repeated accessible labels: `Connect`, `Force sync`, and `Disconnect` without the provider name. Example: `states/r08-state-capture.json` for `22-services-apple-health-connected` still reports multiple identical `Connect` controls. | Screen-reader and voice-control users must infer the provider from surrounding card context, which is slower and error-prone on a sensitive data-sharing screen. | Give each service action a provider-specific accessible name, such as `Connect Apple Health`, `Force sync WHOOP`, and `Disconnect WHOOP`, while keeping the compact visible label if desired. | proposed | Prevents A++ |

Decision: `needs polish`

### 23 - Subscription & billing

- Status: reviewed
- Route: `/tabs/me/subscription`
- Five-second read: Current plan, annual/monthly pricing, plan cards, billing rows, and cancellation actions are visible and understandable.
- Screen purpose and journey fit: Correct post-value monetization management surface in Me.
- Primary action clarity: Annual pricing, upgrade, restore, and cancellation controls are easy to find, but money-state confirmation copy is too generic for A++ billing handoff.
- Emotional tone: Premium and calm, with appropriate restraint around destructive subscription actions.
- Evidence paths: `../../balencia-screens/output/a-plus-plus-review/R08/23-tabs-me-subscription-phone.png`, `../../balencia-screens/output/a-plus-plus-review/R08/states/23-subscription-annual-pricing.png`, `../../balencia-screens/output/a-plus-plus-review/R08/states/23-subscription-upgrade-pro-modal.png`, `../../balencia-screens/output/a-plus-plus-review/R08/states/23-subscription-restore-modal.png`, `../../balencia-screens/output/a-plus-plus-review/R08/states/23-subscription-cancel-modal.png`

| Visible control | Purpose | State / evidence |
| --- | --- | --- |
| Back | Return to previous Me/settings/paywall screen. | Semantic 44x44 button. |
| Monthly / Annual | Switch pricing cadence. | Annual captured with `$192/yr`, `$576/yr`, `$1,152/yr`, and Save 20% badges. |
| Free Downgrade | Schedule downgrade to Free. | Opens Free downgrade modal. |
| Current plan | Communicate active plan. | Disabled button, 44px high. |
| Upgrade to Pro / Max | Open purchase confirmation. | Pro annual modal captured. |
| Payment method | Review mobile-store payment method handoff. | Opens modal. |
| Billing history | Review receipt/history details. | Opens modal. |
| Restore purchases | Trigger restore state. | Restore modal and restored status captured. |
| Downgrade plan / Cancel subscription | Open destructive subscription confirmations. | Cancel modal captured. |
| Bottom tabs | Global app navigation. | Present with Me active. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | Billing management belongs here and appears after value exposure. |
| User friction | 4 | Major paths open modals and states, but confirmation detail is too thin. |
| Visual appeal | 5 | Commercial hierarchy is polished and easy to scan. |
| Brand fit | 5 | Orange and green roles are correctly used for action and savings. |
| Mobile ergonomics | 5 | Segmented control and CTAs meet touch-target gates. |
| Accessibility | 5 | Buttons are semantic and current plan is disabled. |
| Trust/privacy | 3 | Purchase/cancellation copy lacks exact price, charge timing, and platform outcome detail. |
| Industry best practice | 3 | Subscription confirmations should restate plan, cadence, price, renewal/cancel timing, and store handoff behavior. |

- Grade: `A`
- Grade cap: Major billing clarity finding prevents `A+` or `A++`.

| Finding | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R08-F05 | major | billing | `states/23-subscription-upgrade-pro-modal.png` shows the Pro purchase modal copy as `Confirm Pro for annual billing with two months saved. Mid-cycle changes show store proration before purchase.` It does not restate the annual price, charge today, next charge date, renewal cadence, or platform-store finalization. Cancel/restore/payment modals are similarly generic handoffs. | Users may hesitate or misunderstand what they are authorizing on a money-sensitive screen; designers still need to define platform-grade billing confirmation content before Figma handoff. | Add billing-specific confirmation states with plan name, cadence, exact displayed price, proration or no-proration copy, next renewal/cancellation timing, restore result, error states, and explicit App Store/Google Play handoff behavior. | proposed | Prevents A+ and A++ |

Decision: `needs polish`
