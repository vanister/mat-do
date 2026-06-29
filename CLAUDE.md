# Mat Do

Mất đồ ("lost things" in Vietnamese) — a QR-code-based, crowdsourced lost-and-found app.

## Stack

- **Frontend (`app/`):** React 18, TypeScript, Vite, SCSS (`sass`), react-router-dom 7,
  reactfire + Firebase (Auth, Firestore), axios, immer, `classnames`, qrcode
- **Backend (`firebase/functions/`):** Express on Firebase Cloud Functions, Firestore,
  firebase-admin
- **Testing:** Vitest (+ Testing Library on the frontend) — both app and functions
- **Tooling:** Prettier, ESLint, Husky (pre-commit runs the app test suite)

## Project Structure

- `app/` — React frontend (Vite)
  - `src/components/` — shared, reusable UI components
  - `src/pages/<feature>/` — a page plus its colocated `actions.ts`, `reducer.ts`,
    `<feature>-types.d.ts`, and `.scss`
  - `src/hooks/` — custom hooks (`useThunkReducer`, `useApi`, `useImmerState`, …)
  - `src/utilities/` — standalone helpers (`api.ts`, `base64-util.ts`, …) with colocated `*.test.ts`
  - `src/models/` — shared domain types (`*.d.ts`)
  - `src/appSettings.ts` — env-driven config (`import.meta.env.VITE_*`)
- `firebase/functions/src/` — Express backend
  - `<feature>/` — `*.controller.ts`, `*.service.ts`, `index.ts` (router), `*-type.d.ts`
  - `middleware/`, `errors/`, `db.ts`, `auth.ts`, `app.ts`
- `docs/` — design notes and the platform/migration plan (`migration.md`)
- `server/` (.NET) and `firebase/testapp/` are **deprecated — do not modify**

## Universal Rules

- Guard clauses, early returns, avoid deep nesting
- `if` statements must have bodies
- Comment the *why* not the *how*
- No JSDocs or XML comments unless explicitly asked
- Simple, concise, single-purpose code
- KISS and DRY principles
- Use functional paradigms over imperative ones
- Write loops as functional pipelines
- Favor immutability and determinism over pure performance

## Project Rules

### TypeScript

- `type` for typing, `interface` for true interfaces
- No primitive constructors: use `+value`, `!!value`, `` `${value}` ``
- Avoid explicit `!== null` or `!== undefined` — use `!!value` for non-falsy checks
- Use `!= null` to check for `null` or `undefined` when `0` or empty strings are valid
  - Always comment why `!= null` was used
- Keep types close to where they're used: feature-specific types go in
  `<feature>-types.d.ts` next to the feature. Move to `app/src/models/*.d.ts` only when
  shared across features
- No implicit `any`
- Components never call the API (axios) directly — data access flows through the
  `app/src/utilities/api.ts` helpers (`sendRequest` / `sendRequestWithAuth`), invoked
  from thunk actions or the `useApi` hook

### Components

- Signature: `export default function Component(props: ComponentProps) {...}`
- **Default export, one component per file** (utilities and hooks use named exports)
- Props type (`export type ComponentProps = {...}`) defined in the same file
- Arrow functions for event handlers, callbacks, and internal functions
- Single responsibility — no business logic in components; keep it in actions/hooks/helpers
- `classnames` for conditional class names
- The first/root element has a component-level `className` that is the component name in
  kebab-case:
```tsx
  export default function MyComponent(props: MyComponentProps) {
    //...
    return <div className="my-component other-classes">{...}</div>;
  }
```

### State & Data Flow

- Page/feature state uses `useThunkReducer` with a colocated `reducer.ts` and `actions.ts`
  (redux-style action constants + thunks); `useImmerState` / `useStateObject` for simpler
  local state
- Async work lives in thunk actions: dispatch a `*_REQUEST`, call the API, then dispatch
  `*_SUCCESS` / `*_FAILED`
- Forms use the `Form` compound component (`Form.Input`, `Form.Action`)

### Helpers & Utilities

- Named function declarations (not arrow functions) for standalone helpers/utilities
- Single responsibility, colocated `*.test.ts`

### Backend (`firebase/functions/`)

- Layered: `controller` → `service` → `db`; auth via the `validate-token` middleware
- Throw typed errors (`BaseError` subclasses in `src/errors/`) and let `handleError`
  translate them to responses — controllers wrap handlers in try/catch → `handleError`
- Services enforce per-user ownership (an item must belong to the requesting `userId`)

### Formatting

- Follow the formatting rules in [.prettierrc](./app/.prettierrc) (print width 100, single
  quotes, no trailing comma, 2-space indent)
- Import order: CSS → external deps → internal deps

### General

- App-level config lives in `app/src/appSettings.ts`; read env via `import.meta.env.VITE_*`
- Run `npm run build` (from `app/`) after major changes to verify there are no build errors
- Be mindful of the in-flight platform plan in [docs/migration.md](./docs/migration.md):
  prefer depending on our own interfaces/types over Firebase types at module boundaries

## Testing

- Vitest in both `app/` and `firebase/functions/`; tests are colocated as `*.test.ts(x)`
- Run once (no watch): `npm run test:once`
- Watch mode: `npm run test`
- The frontend uses Testing Library; mock with `vi.*` and import test globals from `vitest`

## Commands

```bash
# Frontend (run from app/)
npm start            # vite dev server (http://localhost:3000)
npm run build        # tsc && vite build  ->  app/dist
npm run preview      # serve the production build
npm run test:once    # vitest run

# Backend (run from firebase/functions/)
npm run test:once    # vitest run
npm run deploy       # firebase deploy --only functions
```

## Task Rules

- Complete one task at a time before asking for the next (unless told otherwise)
- Mark completed items in the relevant task/checklist file as you go
