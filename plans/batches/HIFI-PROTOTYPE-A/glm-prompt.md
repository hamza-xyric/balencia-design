Draft a concise architecture note for converting Balencia-New-Screens/hifi-screens (104 hi-fi markdown specs) into balencia-screens.

Constraints:
- Visual-only Next 16 / React 19 prototype.
- New visible UI and new code/data must use CIA, not SIA.
- Use stable /screens/<id> routes for prototype review.
- Batch A should include inventory + shell + 10 reference screens.
- Preserve source intent: focal hierarchy, data honesty, consent/safety rows, provenance chips, low-confidence/null states.
- Do not recommend backend/API/auth/state libraries.

Return Markdown only with:
1. registry shape,
2. reusable components,
3. 10-screen Batch A recommendation,
4. verification risks.
