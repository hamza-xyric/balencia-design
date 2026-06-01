# P13 - Habits, Social, Rewards, Paywall

- Status: `planned`
- Screens: `38`, `39`, `40`, `42`, `43`
- Routes: `/features/habits`, `/features/leaderboard`, `/features/community`, `/features/celebration`, `/features/paywall`
- Sources: `../batches/batch-13.md`, `../update-batches/batch-u07.md`
- Build gate: no

## Focus

Verify habit/reward/social surfaces motivate without turning Balencia into a noisy game or unsafe public network.

## Review Checklist

- Confirm habits are completable and celebration can remain a QA route while production triggers are documented.
- Confirm social V1 is friends/private-first.
- Confirm paywall models IAP-adjacent states without live billing.

## Required Close Evidence

- Browser QA for habit completion, leaderboard/community privacy, celebration fixture, paywall states.
- `npm run check` result.
