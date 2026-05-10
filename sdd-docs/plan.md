# Plan: New User Onboarding Flow

Reference spec: `spec.md`

## Technical Context

| Layer | Tech | Key detail |
|-------|------|------------|
| Frontend | Next.js 16 (App Router), Tailwind v4 | Auth cookie set by `/api/auth/signup` route handler; post-signup redirect currently goes to `/dashboard/[username]` |
| Backend | NestJS v11, in-memory store | No collection endpoint exists; albums module has hardcoded sticker data |
| Auth | JWT (httpOnly cookie `auth_token`, 7-day TTL) | `Authorization: Bearer` header used by API; frontend forwards cookie through Next.js route handlers |

## Constraints

- In-memory storage only — no database migrations needed, but state resets on server restart.
- A single default album will be used for onboarding (album id `1`, "Cody's Adventure 2024", 30 stickers).
- Collection ownership is per-user and stored in memory on the backend.
- Events are emitted to the console / in-memory log (no external service).

---

## Phase 1 — Backend: User Model & Onboarding State

Extend the `User` interface and `AuthService` to carry explicit onboarding state.

### 1.1 Updated User interface

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  passwordHash: string;
  createdAt: Date;                        // set at signup
  onboardingCompleted: boolean | null;    // null=legacy, false=pending, true=done
}
```

### 1.2 AuthService changes

- `signup()` → set `createdAt: new Date()` and `onboardingCompleted: false` on the new user record.
- Add `completeOnboarding(userId: string)` method:
  - Sets `onboardingCompleted = true`.
  - Emits the `onboarding_completed` event (see spec) with `durationMs = now - user.createdAt`.
- Expose `getUser(userId)` helper so other modules can read the user record.

### 1.3 Event emission

Use NestJS `EventEmitter2` (`@nestjs/event-emitter` package). Define an `OnboardingCompletedEvent` class. `AuthService` emits it; an `OnboardingListener` logs it to console. This keeps the event bus decoupled from business logic.

---

## Phase 2 — Backend: Sticker Collection API

Add a `collection` module to the NestJS API.

### 2.1 Collection data model

```typescript
interface CollectionEntry {
  userId: string;
  stickerId: number;
  albumId: number;
  addedAt: Date;
}
```

### 2.2 New endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/collection/stickers` | JWT required | Add one sticker. Body: `{ stickerId, albumId }`. Returns `201` + entry, or `409` if already owned. On first sticker added, calls `AuthService.completeOnboarding()`. |
| `GET` | `/collection/stickers` | JWT required | Return all stickers the authenticated user owns. |

### 2.3 Module structure

```
src/collection/
  collection.module.ts
  collection.controller.ts
  collection.service.ts
  dto/add-sticker.dto.ts
  interfaces/collection-entry.interface.ts
  events/onboarding-completed.event.ts
  listeners/onboarding.listener.ts
```

`CollectionModule` imports `AuthModule` (for `JwtAuthGuard` and `AuthService`) and `EventEmitterModule`.

---

## Phase 3 — Frontend: Onboarding Route

Add a protected onboarding page the user is redirected to after signup.

### 3.1 New route

`/onboarding` — Server Component shell, client interactive component for sticker picking.

### 3.2 Redirect logic

- Modify `/api/auth/signup/route.ts`: redirect to `/onboarding` after successful signup.
- Onboarding guard in `app/dashboard/layout.tsx`: after auth check, read `onboardingCompleted` from `/auth/me`. If `false`, redirect to `/onboarding`. If `true` or `null`, proceed.

### 3.3 Expose `onboardingCompleted` from `/auth/me`

Update the `GET /auth/me` response to include `onboardingCompleted` so the frontend does not need a separate request.

### 3.4 Onboarding page behaviour

1. Fetch stickers for album `1` (existing `fetchStickers` helper).
2. Render interactive sticker grid; user taps one to select (visual highlight).
3. "Add to my album" button calls `POST /api/collection/stickers`.
4. On success, redirect to `/dashboard/{username}`.

### 3.5 New Next.js route handler

`app/api/collection/stickers/route.ts` — Proxies `POST` and `GET` to NestJS, forwarding `auth_token` as `Authorization: Bearer`.

### 3.6 New frontend lib helper

`lib/collection.ts` — `fetchMyCollection()` and `addStickerToCollection(stickerId, albumId)`.

---

## Phase 4 — Dashboard: Show Collected Stickers

### 4.1 Fetch collection on dashboard load

`app/dashboard/[username]/page.tsx` fetches `GET /api/collection/stickers` server-side and passes the list to a `MyStickers` component.

### 4.2 `MyStickers` component

`app/dashboard/[username]/_components/MyStickers.tsx` — Renders owned sticker cards; shows empty-state copy if list is empty (defensive, should not be reachable post-onboarding).

---

## Phase 5 — BDD Acceptance Tests

### 5.1 Backend — `features/collection.feature`

Scenarios:
- Authenticated user adds a sticker → 201 + entry
- Authenticated user adds the same sticker twice → 409
- Unauthenticated request → 401
- Authenticated user retrieves their collection

### 5.2 Backend — `features/onboarding-event.feature`

Scenarios:
- After first sticker is added, `onboardingCompleted` on the user is `true`
- Event payload contains `userId`, `durationMs`, `stickerId`, `albumId`

### 5.3 Frontend — `features/onboarding.feature`

Scenarios:
- New user (`onboardingCompleted: false`) is redirected to `/onboarding` after signup
- User selects a sticker and confirms → redirected to dashboard
- Returning user (`onboardingCompleted: true`) is not redirected to onboarding

### 5.4 Step definitions

- `apis/.../features/step-definitions/collection.steps.ts`
- `apis/.../features/step-definitions/onboarding-event.steps.ts`
- `apps/.../features/step-definitions/onboarding.steps.ts`

---

## Phase order and dependencies

```
Phase 1 (User model + event) → Phase 2 (Collection API) → Phase 3 (Frontend) → Phase 4 (Dashboard) → Phase 5 (BDD tests)
```
