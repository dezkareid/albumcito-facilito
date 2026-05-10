# Spec: New User Onboarding Flow

## Intention

When a user creates an account, they should immediately add at least one sticker to their album before reaching the dashboard. This "first sticker moment" drives early engagement and supports the company's acquisition strategy by creating a tangible reward tied to registration.

## Problem

Currently, after signup the user lands on `/dashboard/{username}` with only a welcome message and a link to browse albums. There is no guided action, no sense of immediate value, and no reason to stay. Users who do not feel invested early are likely to churn before ever collecting a sticker.

## Goal

Reduce time-to-first-value by ensuring every new user owns at least one sticker by the time they see their dashboard for the first time. Measure that reduction with a concrete event so the acquisition team can evaluate the flow's effectiveness.

## User Story

> **As a new user**, after I create my account I want to be guided to pick my first sticker so that I immediately feel invested in completing my album.

## Acceptance Criteria

1. After a successful signup the user is taken to an onboarding screen instead of directly to the dashboard.
2. The onboarding screen presents an album and its stickers so the user can choose one.
3. The user selects exactly one sticker and confirms the choice.
4. The sticker is saved to the user's collection on the backend.
5. After confirming, the user is redirected to their dashboard.
6. The dashboard reflects the sticker they just collected.
7. The onboarding flow is only shown once — returning users (login) skip it entirely.
8. If a user navigates away before completing onboarding, they can resume from the same onboarding screen on their next visit (while `onboardingCompleted` is `false`).

## Onboarding State

The `User` record carries an explicit `onboardingCompleted` field that tracks the three possible states:

| Value | Meaning |
|-------|---------|
| `null` | Pre-feature user (legacy); onboarding state unknown |
| `false` | Account created, onboarding not yet finished |
| `true` | First sticker added; onboarding complete |

`null` is the schema default. On account creation the field is immediately set to `false`. When the user adds their first sticker during onboarding it is set to `true`.

## Onboarding Event

When a user completes onboarding (transitions from `false` → `true`) an event is emitted:

```
event: onboarding_completed
payload:
  userId: string
  username: string
  stickerId: number
  albumId: number
  accountCreatedAt: Date        # timestamp from signup
  onboardingCompletedAt: Date   # timestamp when first sticker added
  durationMs: number            # onboardingCompletedAt - accountCreatedAt
```

This event enables the acquisition team to measure the median and distribution of time-to-first-sticker across new cohorts.

## Out of Scope

- Collecting more than one sticker during onboarding.
- Album selection (show a single default album in onboarding).
- Persisting events to a database or external analytics service (console/in-memory log is sufficient for now).
- Sticker trading or gifting.
- Push/email notifications.

## Success Metric

≥ 80% of newly registered users have at least one sticker in their collection within the same session, as evidenced by `onboardingCompleted = true` records and `durationMs` distributions from the emitted events.
