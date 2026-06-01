# Initial Observations

These are hypotheses to validate during Batch 01. They are not final decisions.

## Screen 03 - Sign Up

### Hypothesis

The current sign-up screen may be asking for too much information too early.

### Evidence To Validate

- The first account creation step asks for first name, last name, email, password, date of birth, and gender.
- Date of birth and gender may be better deferred until the product has explained why it needs them.
- Social auth buttons are present, but the Google and Apple marks should be reviewed for polish, recognizability, and alignment with platform conventions.

### Questions

- Can the first step be reduced to email/password plus social auth?
- Should name collection move to profile completion or SIA onboarding?
- Should date of birth be asked only when age gating or personalization requires it?
- Should gender be optional, deferred, or reframed around personalization?
- Do the Google and Apple buttons feel official, trustworthy, and visually balanced?

### Potential Direction

Consider splitting registration into:

1. low-friction account creation
2. OTP verification
3. consent and privacy explanation
4. progressive profile completion only when the value is clear

Batch 01 should decide whether this is a must-fix onboarding issue or an acceptable MVP tradeoff.
