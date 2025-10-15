# 🎯 Assignment: Expense Violations Mini Dashboard

## Domain

A simplified internal dashboard for reviewing company **expense policy violations** (like missing receipts or over-limit purchases).

---

## Step 1 — Frontend System Design (40–45 min)

### Goal

Design how you’d build the **Violations Dashboard** using **React + Next.js** (or any SPA framework). You’ll explain your **component structure**, **data flow**, and **API contract**.

### Core user stories

1. User can **view** a list of expense violations.
2. User can **filter** by status (`open`, `resolved`) and policy type (`missing_receipt`, `daily_limit`).
3. User can **mark** one or more violations as resolved.
4. User can **open details** of a violation in a side panel.
5. Table should stay **performant** for thousands of rows.
6. Real-time updates for resolved rows are optional (stretch goal).

### What to produce

* **Component diagram** (page → filters → table → drawer).
* **Data flow** (frontend ↔ API ↔ DB).
* **API endpoints**

  ```ts
  GET /violations?status=&policy=&cursor=
  GET /violations/:id
  PATCH /violations/bulk-resolve
  ```
* **Pagination strategy**: cursor-based, 50 rows per page.
* **State split**: local UI (selection, filters) vs server data (list, cache).
* **Error/loading states**: skeletons, retry button, toast for errors.
* **Accessibility/performance**: virtualized list, keyboard nav, minimal re-renders.

### Concepts you’ll practice

* React component composition
* Server-side pagination & caching (TanStack Query, SWR)
* Virtualization & skeletons
* Clean API contracts
* Optimistic UI for actions

---

## Step 2 — Coding Challenge (45–60 min)

### MVP scope

Implement a working `/violations` page that supports:

* Fetch & display paginated violations (seeded mock API).
* Filter by status & policy.
* Bulk resolve (checkbox + “Resolve selected”).
* Drawer with details when clicking a row.
* Loading & empty states.

Use **mock data or Prisma + SQLite**—your choice. No auth, no fancy design needed.

### Suggested stack

* **Next.js (App Router)**
* **tRPC or REST API routes**
* **Prisma + SQLite** or mocked data file
* **React Query / TanStack Query** for data fetching
* **shadcn/ui or MUI DataGrid** for table

### Stretch ideas

* Real-time update with polling or WebSocket.
* CSV export for current filters.
* Role check for “approver” vs “viewer.”

### Example schema

```ts
model Violation {
  id           String   @id @default(cuid())
  employeeName String
  policyType   String   // "missing_receipt" | "daily_limit"
  amount       Int
  status       String   // "open" | "resolved"
  createdAt    DateTime @default(now())
}
```

### Evaluation focus

| Category                | What matters                                 |
| ----------------------- | -------------------------------------------- |
| System design           | Modular components, clean data flow          |
| Coding                  | Functional MVP, correct pagination & actions |
| Frontend best practices | A11y, virtualization, UX polish              |
| AI collaboration        | Clear, iterative prompts, good edits         |
| Clarity                 | Ability to explain trade-offs clearly        |
