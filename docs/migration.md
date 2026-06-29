# Mat Do — Migration Plan

This document tracks the phased plan to modernize Mat Do's tooling and decouple
the codebase from its current platform vendors, while keeping the app shippable
at every step.

## Overview

Three motivations drive this work:

1. **Get off end-of-life tooling.** The frontend is on Create React App
   (`react-scripts`), which is effectively unmaintained.
2. **Remove vendor coupling and type drift.** Firebase types leak across our
   internal boundaries, and the domain models are duplicated and already drifting
   between the backend and the frontend (see below).
3. **Keep platform optionality.** The architecture is already well-layered; with a
   little hardening, swapping platforms later becomes a per-adapter change rather
   than a rewrite.

We are **staying on Firebase for now.** Phases 1 and 2 deliver value regardless of
whether we ever migrate platforms.

## Current architecture & seams

The app talks to its vendors through four boundaries. Three of them are a single
file; the fourth (frontend auth) is the deepest.

| Seam | File(s) | Vendor coupling | Blast radius |
|---|---|---|---|
| Backend DB | `firebase/functions/src/db.ts` (+ `Timestamp`/`CollectionReference` leaking into the service files) | `getCollection()`, `transaction()`, `CollectionReference<T>` | Small–medium |
| Backend auth | `firebase/functions/src/auth.ts` | `verifyIdToken()` returns `DecodedIdToken` | One file |
| Frontend API | `app/src/utilities/api.ts` | none — just an env-based base URL | Trivial |
| Frontend auth | `app/src/App.tsx`, `app/src/index.tsx`, `app/src/hooks/useFirebaseEmailAuth.ts`, auth components | reactfire `AuthProvider`/`useAuth`/`useFirebaseApp`, `firebase/auth` `User` | Medium (deepest) |

The middleware (`validate-token.middleware.ts`), controllers, custom errors,
`handleError`, validation, and ownership checks are already vendor-agnostic — they
consume our own abstractions, not Firebase directly.

### Known type drift / leaks to fix

- `firebase/functions/src/core.d.ts` — `UserRequest.user?: DecodedIdToken`
  (Firebase Auth type on every request).
- `firebase/functions/src/items/item-type.d.ts` /
  `firebase/functions/src/scan/scan-types.d.ts` — timestamps typed as Firestore
  `Timestamp`.
- `app/src/models/firestore.d.ts` — `FirestoreTimestamp` references `Timestamp`
  **without importing it** (broken type).
- The `Item` / `ScannedItem` types are **duplicated** across backend and frontend
  and have **drifted**: backend `Item.createdAt` is a Firestore `Timestamp`, but
  frontend `Item.createdAt` is a `string`; `lastUpdated` differs similarly. This is
  a latent serialization bug, not just untidiness.

## Phased plan

Each phase is independently shippable with no behavior change. Ports & adapters
(anti-corruption layer) is the guiding principle: our code speaks our own types,
and vendor specifics live only in adapters at the edges.

### Phase 1 — Vite migration (frontend tooling)

Replace Create React App with Vite, and move tests to Vitest. This touches only
the frontend build/tooling; no components, routing, or backend code change.

See the detailed, executable task list: [`vite-migration-checklist.md`](./vite-migration-checklist.md).

### Phase 2 — Boundary hardening (stay on Firebase)

Invert the dependencies so every boundary exposes data and functions through our
own interfaces and types. Firebase remains the implementation behind each adapter.

- **Time scalar.** Introduce one serializable time type (epoch-millis `number` or
  ISO string) used by *every* domain model on both sides. Firestore `Timestamp` ↔
  scalar conversion is confined to adapters. Removes the leak from four type files
  and fixes the client/server drift in one change.
- **`AuthUser` (own type).** Replaces `DecodedIdToken` in
  `TokenVerificationResult` (`auth.ts`) and `UserRequest` (`core.d.ts`). `auth.ts`
  becomes the adapter that maps Firebase's token → `AuthUser`. The middleware does
  not change.
- **`ItemRepository` (own interface).** Domain methods (`findByUser`, `findById`,
  `add`, `update`, `isFound`) with domain types in/out, replacing the
  `CollectionReference<Item>` handed into `ItemService`. A `FirestoreItemRepository`
  implements it and becomes the *only* place the Firestore query API
  (`.where`/`.doc`/`.add`/`Timestamp`) appears. Enables an in-memory repository for
  service unit tests.
- **Frontend `AuthClient` / `AuthUser`.** Hide reactfire behind our own provider
  and hook; `useFirebaseEmailAuth` stops returning `firebase/auth` `User` and
  returns our `AuthUser`.
- **Shared wire DTOs.** Define the HTTP API's JSON contract once in our own types
  (ideally a shared package) so client and server cannot drift again. Each side
  maps internal ↔ DTO at its edge.
- **Cleanup.** Fix the broken `FirestoreTimestamp` and converge the duplicated
  `Item` / `ScannedItem` definitions.

This phase is the highest-value one even if we never migrate platforms: it kills
the type drift and makes the services testable in isolation.

### Phase 3 — Platform migration (future, optional)

Minimal-rewrite target if/when we leave Firebase:

- **Host:** keep the Express app; deploy as a Node service on Render or Railway
  (only `functions/src/index.ts` changes — drop the `firebase-functions` wrapper
  for `app.listen()`).
- **Database:** MongoDB Atlas (M0 free) to stay document-model, so the domain
  shapes map straight to documents.
- **Auth:** Clerk (least glue) or Auth0 (previously used here; fits the SSO sketch
  in `design.md`).

After Phase 2, this collapses to writing new adapters that satisfy the existing
ports. Controllers, middleware, errors, validation, ownership checks, and tests
stay put.

## Guiding principle

Ports & adapters / anti-corruption layer. Keep business logic and UI dependent on
our own interfaces and types; isolate every vendor behind an adapter. Ship each
phase independently with no behavior change.
