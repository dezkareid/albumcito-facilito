# Tasks: New User Onboarding Flow

Reference spec: `spec.md` | Reference plan: `plan.md`

Legend: `[ ]` pending · `[x]` completed

---

## Phase 1 — Backend: User Model & Onboarding State

- [x] **1.1** Add `createdAt: Date` and `onboardingCompleted: boolean | null` to `src/auth/interfaces/user.interface.ts`
- [x] **1.2** Update `AuthService.signup()` to set `createdAt: new Date()` and `onboardingCompleted: false` on the new user record
- [x] **1.3** Add `AuthService.completeOnboarding(userId, stickerId, albumId)` — sets `onboardingCompleted = true`, emits `OnboardingCompletedEvent` with `durationMs`
- [x] **1.4** Add `AuthService.getUser(userId)` helper to expose a user record to other modules
- [x] **1.5** Update `GET /auth/me` response to include `onboardingCompleted`
- [x] **1.6** Install `@nestjs/event-emitter` package and register `EventEmitterModule.forRoot({ global: true })` in `AppModule`
- [x] **1.7** Create `src/collection/events/onboarding-completed.event.ts` with `OnboardingCompletedEvent` class
- [x] **1.8** Create `src/collection/listeners/onboarding.listener.ts` — listens for `OnboardingCompletedEvent` and logs it to console

## Phase 2 — Backend: Sticker Collection API

- [x] **2.1** Create `src/collection/interfaces/collection-entry.interface.ts` with `CollectionEntry` interface
- [x] **2.2** Create `src/collection/dto/add-sticker.dto.ts` with `AddStickerDto` (`stickerId: number`, `albumId: number`)
- [x] **2.3** Create `src/collection/collection.service.ts` — in-memory store; `addSticker(userId, dto)` (throws `ConflictException` on duplicate; calls `AuthService.completeOnboarding()` on first sticker); `getCollection(userId)`
- [x] **2.4** Create `src/collection/collection.controller.ts` — `POST /collection/stickers` (201) and `GET /collection/stickers` (200), both guarded by `JwtAuthGuard`
- [x] **2.5** Create `src/collection/collection.module.ts`, import `AuthModule` and `EventEmitterModule`, declare controller, service, and listener
- [x] **2.6** Register `CollectionModule` in `src/app.module.ts`

## Phase 3 — Frontend: Onboarding Route

- [x] **3.1** Create `app/api/collection/stickers/route.ts` — proxies `POST` and `GET /collection/stickers` to NestJS API, forwarding `auth_token` cookie as `Authorization: Bearer`
- [x] **3.2** Create `lib/collection.ts` with `fetchCollectionForUser(token)` and `addStickerToCollection(stickerId, albumId)` helpers
- [x] **3.3** Create `app/onboarding/page.tsx` — fetches stickers for album 1, renders interactive sticker picker, calls `addStickerToCollection` on confirm, redirects to dashboard
- [x] **3.4** Modify `app/signup/page.tsx` to redirect to `/onboarding` after successful signup
- [x] **3.5** Modify `app/dashboard/layout.tsx` — after auth check, read `onboardingCompleted` from `/auth/me` response; if `false` redirect to `/onboarding`

## Phase 4 — Dashboard: Show Collected Stickers

- [x] **4.1** Create `app/dashboard/[username]/_components/MyStickers.tsx` — renders owned sticker cards or empty state
- [x] **4.2** Modify `app/dashboard/[username]/page.tsx` — fetch collection server-side and pass to `MyStickers`

## Phase 5 — BDD Acceptance Tests

- [x] **5.1** Create `apis/albumcito-facilito-api/features/collection.feature` — scenarios: add sticker (201), duplicate (409), unauthenticated (401), get collection (200)
- [x] **5.2** Create `apis/albumcito-facilito-api/features/step-definitions/collection.steps.ts`
- [x] **5.3** Create `apis/albumcito-facilito-api/features/onboarding-event.feature` — scenarios: `onboardingCompleted` becomes `true` after first sticker; `false` before any sticker
- [x] **5.4** Create `apps/albumcito-facilito-app/features/onboarding.feature`
- [x] **5.5** Create `apps/albumcito-facilito-app/src/__tests__/onboarding.feature.spec.mts`
