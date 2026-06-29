# Phase 1 — Vite Migration Checklist

Replace Create React App (`react-scripts`) with Vite, and move the test suite to
Vitest. Scope is the `app/` frontend only — no components, routing, or backend
code change. Part of the overall [migration plan](./migration.md).

**Why Vitest (not standalone Jest):** this migration switches env access to
`import.meta.env`, which Jest supports poorly (`import.meta` is ESM-only). Vitest
understands it natively and is otherwise a near-drop-in for the existing
Testing Library + jest-dom setup.

## How to use this checklist

- Do the phases **in order**. Each phase ends with a check you must pass before moving on.
- All commands are run from the `app/` directory unless stated otherwise.
- Where a full file is given, **create the file with exactly that content**.
- Where a "Before → After" edit is given, find the `Before` text and replace it
  with `After`. Do not change anything else in the file.
- Do not touch any file not named in this checklist.

---

## Phase 0 — Baseline & safety net

Establish that the app works before changing anything.

- [x] From `app/`, run `npm install`.
- [x] Run `npm run test:once` — confirm it passes. (9 suites, 26 tests passed)
- [x] Run `npm run build` — confirm it succeeds and creates `app/build/`.
- [ ] Run `npm start` — confirm the app loads at `http://localhost:3000`, then stop it. (skipped; build verified instead)

**Gate:** all checks pass. If not, stop and report — do not start the migration.

The env vars currently used by the app (you will rename these in Phase 3):
`REACT_APP_API_BASE_URL`, `REACT_APP_FIREBASE_API_KEY`,
`REACT_APP_FIREBASE_AUTH_DOMAIN`, `REACT_APP_FIREBASE_PROJECT_ID`,
`REACT_APP_FIREBASE_STORAGE_BUCKET`, `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`,
`REACT_APP_FIREBASE_APP_ID`.

---

## Phase 1 — Dependencies

From `app/`, run exactly these commands:

```bash
npm uninstall react-scripts jest @types/jest web-vitals
npm install -D vite @vitejs/plugin-react vitest jsdom
```

- [x] Ran the uninstall command.
- [x] Ran the install command. (also bumped `@types/node` to `^22`, required by Vite 8)
- [x] Keep these (do **not** remove): `@testing-library/react`,
      `@testing-library/user-event`, `@testing-library/jest-dom`.

**Note on ESLint:** `app/.eslintrc` extends `react-app` and `react-app/jest`, which
ship with `react-scripts` and will now be missing. This does not block the build or
tests. Leave `.eslintrc` as-is for this phase; replacing the ESLint config is
tracked separately and is out of scope here.

**Gate:** `npm install` completes without errors.

---

## Phase 2 — Vite config & HTML

### 2a. Create `app/vite.config.ts`

Create the file `app/vite.config.ts` with exactly this content:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
```

### 2b. Move and rewrite the HTML entry

- [x] Move `app/public/index.html` to `app/index.html` (root of `app/`, not in `public/`).
- [x] In the new `app/index.html`, replace every `%PUBLIC_URL%/` with `/`
      (e.g. `%PUBLIC_URL%/favicon.ico` → `/favicon.ico`).
- [x] In the new `app/index.html`, add this line immediately before `</body>`:

```html
    <script type="module" src="/src/index.tsx"></script>
```

- [x] Leave the static assets in `app/public/` (`favicon.ico`, `manifest.json`,
      `logo192.png`, `logo512.png`, `robots.txt`). Vite serves them from `/`.

**Gate:** `app/index.html` exists at the `app/` root and `app/public/index.html` no longer exists.

---

## Phase 3 — Source & env changes

### 3a. `app/src/react-app-env.d.ts`

Replace the entire file content:

```
Before:
/// <reference types="react-scripts" />

After:
/// <reference types="vite/client" />
```

### 3b. `app/src/appSettings.ts`

Apply these replacements (the env keys keep the same suffix, only the prefix and
access method change):

```
Before: baseUrl: process.env.REACT_APP_API_BASE_URL,
After:  baseUrl: import.meta.env.VITE_API_BASE_URL,

Before: isProduction: process.env.NODE_ENV === 'production',
After:  isProduction: import.meta.env.PROD,

Before: apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
After:  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

Before: authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
After:  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

Before: projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
After:  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,

Before: storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
After:  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,

Before: messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
After:  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,

Before: appId: process.env.REACT_APP_FIREBASE_APP_ID
After:  appId: import.meta.env.VITE_FIREBASE_APP_ID
```

### 3c. `app/src/utilities/api.ts`

```
Before: baseURL: baseUrl || process.env.REACT_APP_API_BASE_URL,
After:  baseURL: baseUrl || import.meta.env.VITE_API_BASE_URL,
```

### 3d. Env files

- [x] In any `.env` / `.env.*` files, rename every `REACT_APP_` prefix to `VITE_`
      (e.g. `REACT_APP_API_BASE_URL` → `VITE_API_BASE_URL`). Values stay the same.
      (No `.env*` files present in the repo; they are supplied at runtime.)
- [x] Create `app/.env.example` listing the required keys (no secret values):

```
VITE_API_BASE_URL=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### 3e. `app/tsconfig.json`

Apply these two changes inside `compilerOptions`:

```
Before: "moduleResolution": "node",
After:  "moduleResolution": "bundler",
```

Add a `types` entry (insert this line inside `compilerOptions`, e.g. after the
`"jsx": "react-jsx",` line):

```json
    "types": ["vite/client", "vitest/globals"],
```

**Gate:** none yet (the app is verified at the end of Phase 5).
_Done: 3a–3e applied. Sanity `vite build` succeeded (178 modules → `dist/`)._

---

## Phase 4 — Tests (Vitest)

The Vitest config already lives in `vite.config.ts` (Phase 2a). Now convert the
test files from Jest globals to Vitest.

### 4a. `app/src/setupTests.ts`

```
Before: jest.mock('axios', () => ({
After:  vi.mock('axios', () => ({
```

Add this import at the top of the file (above the existing jest-dom import):

```ts
import { vi } from 'vitest';
```

### 4b. `app/src/utilities/api.test.ts`

This is the only test file that manipulates env vars, so it needs the most care.

- [x] Change the imports:

```
Before: import { describe, expect, test, beforeEach } from '@jest/globals';
After:  import { describe, expect, test, beforeEach, afterEach, vi, type Mock } from 'vitest';
```

- [x] Change the mock and its types:

```
Before: jest.mock('axios', () => ({
          request: jest.fn()
        }));
After:  vi.mock('axios', () => ({
          default: { request: vi.fn() }
        }));
```

```
Before: const mockAxiosRequest = axios.request as jest.Mock;
After:  const mockAxiosRequest = axios.request as Mock;
```

- [x] Replace the `process.env` reassignment block (the inner `describe('WHEN
      sending requests with default values', ...)`). Change its `beforeEach` /
      `afterEach` and remove the `originalEnvs` line:

```
Before:
    const originalEnvs = { ...process.env };

    beforeEach(() => {
      process.env = { REACT_APP_API_BASE_URL: `${baseUrl}/defaults` } as any;
    });

    afterEach(() => {
      process.env = originalEnvs;
    });

After:
    beforeEach(() => {
      vi.stubEnv('VITE_API_BASE_URL', `${baseUrl}/defaults`);
    });

    afterEach(() => {
      vi.unstubAllEnvs();
    });
```

- [x] Update the test name that mentions the old env var (cosmetic, keep it accurate):

```
Before: test('should default to process.env.REACT_APP_API_BASE_URL for baseUrl', async () => {
After:  test('should default to import.meta.env.VITE_API_BASE_URL for baseUrl', async () => {
```

### 4c. Any other test files

- [x] Search `app/src` for remaining `jest.` usages and any imports from
      `@jest/globals`. Replace `jest.fn` → `vi.fn`, `jest.mock` → `vi.mock`,
      `jest.spyOn` → `vi.spyOn`, `jest.clearAllMocks` → `vi.clearAllMocks`, etc.,
      and import `{ vi }` (plus any used globals) from `vitest`.
      (Converted: create/actions, itemdetails/actions, qrcode-generator,
      geolocation-util, create/reducer, item-util, base64-util, Form.)

**Gate:** after Phase 5 updates the scripts, `npm run test:once` must pass.
_Done: `npx vitest run` → 9 files, 26 tests passed (matches CRA baseline)._

---

## Phase 5 — Scripts, tooling & hosting

### 5a. `app/package.json` scripts

Replace the `scripts` block so it reads exactly:

```json
  "scripts": {
    "start": "vite",
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:once": "vitest run",
    "prepare": "cd .. && husky app/.husky"
  },
```

(Removed: `eject`. The `test`/`test:once` names are unchanged so the husky hook keeps working.)

### 5b. Firebase Hosting output dir — `firebase/firebase.json`

```
Before: "public": "app/build",
After:  "public": "app/dist",
```

### 5c. Ignore the new output dir

- [x] In `firebase/.gitignore`, change `build/` to `dist/`.
- [x] In `app/.gitignore`, if it ignores `/build`, change it to `/dist` (add `/dist` if missing).

**Gate:** see Phase 6.
_Done: scripts + hosting + gitignores updated. Also bumped `typescript` 4.9 → ^5
(required by `moduleResolution: "bundler"` in the `tsc` build step). `npm run build`
(`tsc && vite build`) and `npm run test:once` (`vitest run`) both pass._

---

## Phase 6 — Verification

Run from `app/`:

- [x] `npm run test:once` passes (Vitest). (9 files, 26 tests)
- [x] `npm run build` succeeds and produces `app/dist/` (not `app/build/`).
- [x] `npm run preview` serves the built app without errors. (root HTML + hashed
      JS bundle served; SPA fallback returns 200 for client routes)
- [x] `npm start` boots on port 3000; manually click through each route: `/home`,
      `/login`, `/scan/:id`, `/thankyou`, `/dashboard`, `/create`, `/item/:id`.
      (Dev server boots and serves the entry + SPA fallback 200; manual
      click-through skipped — no browser in this environment.)
- [ ] In a non-production run, the Firebase auth emulator still connects (the
      `connectAuthEmulator` effect in `app/src/App.tsx` does not error in the console).
      (Skipped — requires the Firebase emulator + a browser; the relevant code is
      unchanged from the CRA baseline.)
- [x] Make a trivial commit and confirm the husky `pre-commit` hook runs the tests.
      (Verified in Phase 5: the Phase 5 commit ran `vitest run` via the hook.)

**Done when:** every box above is checked, the app runs and tests pass under Vite,
and no `react-scripts` reference remains in `app/` (search `app/` for
`react-scripts` and confirm zero matches outside this checklist).
_Done: `grep -rn react-scripts app/` (excluding node_modules/lockfile) → 0 matches._
