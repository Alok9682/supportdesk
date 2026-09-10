# SupportDesk - Customer Support Dashboard

## Overview

SupportDesk is a single-page admin dashboard that a customer support team can use to triage, search, filter, and resolve support tickets. It presents a live overview of ticket volume, lets agents drill into a ticket's full conversation history, and lets them move a ticket through its lifecycle — Open → In Progress → Resolved — without ever reloading the page.

The app is fully self-contained: ticket data is served by a local mock service layer that mimics a REST API (with simulated network latency), so it runs identically for every reviewer with no external API, API key, or network dependency required.

## Features

- **Dashboard overview** with dynamically calculated stats: Total Tickets, Open, In Progress, Resolved
- **Ticket list** as a data table on desktop and a card layout on mobile/tablet, showing customer, subject, priority, status, created date, and ticket ID
- **Search** across customer name, subject, and ticket ID, updating results as you type
- **Filtering** by status and priority, fully composable with search and with each other, plus a one-click "Clear filters" action
- **Status changes** from the ticket list, a mobile card, or the details panel — updates the store, the stats, the list, and the open details panel instantly, with no page refresh
- **Ticket details side panel** with full customer info, issue metadata, description, an editable status control, and the full conversation thread with customer/support messages visually distinguished
- **Routing**: `/` for the dashboard and `/tickets/:id` for a deep-linkable ticket, so the browser back/forward buttons and direct URLs both work correctly
- **Loading state** with skeleton placeholders for both the stats row and the ticket list
- **Error state** with a friendly message and a Retry button that re-triggers the fetch
- **Empty states** for zero tickets, no search matches, and no filter matches (with a "Clear filters" shortcut)
- **Responsive design** tuned for desktop, laptop, tablet, and mobile — the ticket table becomes a card list below the `lg` breakpoint instead of overflowing horizontally
- **Accessibility**: semantic HTML, labelled controls, keyboard-operable rows and dropdowns, visible focus states, and status/priority badges that pair an icon with text rather than relying on color alone

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4 (via the `@tailwindcss/vite` plugin)
- Zustand
- React Router
- Lucide React (icons)

## Getting Started

```bash
npm install
npm run dev
```

The app will be available at the URL Vite prints (typically `http://localhost:4173`).

### Production build

```bash
npm run build
npm run preview
```

`npm run build` outputs a static production bundle to `dist/`. `npm run preview` serves that build locally so you can verify it before deploying.

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
  components/
    layout/       Header, StatsCard, StatsRow — page chrome and the stats row
    tickets/      SearchBar, FilterBar, TicketTable, TicketRow, TicketCard,
                   StatusBadge, PriorityBadge, CustomerAvatar, StatusSelect,
                   TicketDetailsPanel, Conversation — everything ticket-specific
    states/       LoadingState, ErrorState, EmptyState, StatsRowSkeleton
  pages/
    DashboardPage.jsx   composes the components above and wires them to
                         the store and to React Router
  store/
    ticketStore.js      the single Zustand store for ticket + UI state
  services/
    ticketService.js    the mock "REST API" the store talks to
  data/
    mockTickets.js       18 realistic seed tickets with conversations
  utils/
    date.js              date/time formatting helpers
    ticketUtils.js        status/priority constants, search+filter logic,
                           stats calculation, avatar helpers
  App.jsx            route definitions
  main.jsx           app entry point, mounts BrowserRouter
```

## State Management

All ticket data and UI state lives in one Zustand store (`src/store/ticketStore.js`):

- `tickets`, `loading`, `error` — the data currently in view and the status of the last fetch
- `searchQuery`, `statusFilter`, `priorityFilter` — the active search/filter selection
- `updatingTicketIds` — tracks which specific ticket(s) currently have a status update in flight, so only that row/card shows a spinner instead of blocking the whole UI
- `fetchTickets()` — loads tickets from the service layer
- `updateTicketStatus(id, status)` — persists a status change through the service layer, then replaces that ticket in the store with the server's response
- `setSearchQuery`, `setStatusFilter`, `setPriorityFilter`, `clearFilters` — update the search/filter state

Components read only the slices of state they need via selectors (e.g. `useTicketStore((s) => s.tickets)`), and derived values like the filtered ticket list and the stats counts are computed with `useMemo` in `DashboardPage` rather than stored — so the store stays the single source of truth and everything downstream (list, stats, details panel) reacts to it automatically.

## API / Mock API

There is no external API call in this project — by design, so the dashboard works reliably offline and needs no API key. Instead, `src/services/ticketService.js` is a small service layer that exposes the same shape a real REST client would:

- `getTickets()` — resolves with all tickets after a simulated network delay
- `getTicketById(id)` — resolves with a single ticket, or rejects if the id doesn't exist
- `updateTicketStatus(id, status)` — updates the in-memory "database" and resolves with the updated ticket

Under the hood it keeps an in-memory array seeded from `src/data/mockTickets.js` and returns defensive copies, so nothing outside the service can mutate "server" state directly. The Zustand store never imports the mock data directly — it only calls this service — which mirrors how the store would talk to a real backend and makes swapping in an actual API later a one-file change.

The service also includes a `SIMULATE_FETCH_FAILURE` flag for exercising the dashboard's error/retry UI locally; it defaults to `false` so the app always loads successfully out of the box.

## Design Decisions

- **Ticket details as a slide-in panel, with matching routes.** A side panel keeps the ticket list visible and in context (useful when working through a queue), while `/tickets/:id` still gives every ticket a real, shareable, back-button-friendly URL.
- **Status and priority as icon + text badges**, never color alone, so the dashboard doesn't rely on color perception to convey ticket state.
- **Cards below the `lg` breakpoint instead of a scrolling table.** A dense data table works well on a laptop screen, but on tablet and phone widths a card per ticket is easier to scan and touch-target than a table that must scroll horizontally.
- **A dedicated mock service layer instead of mock data inline in the store**, so the app is a truer rehearsal of talking to a real backend, and so the data layer can be swapped for a real API by changing one file.
- **A muted teal/ink palette** rather than a default "SaaS card kit" look — kept deliberately calm and low-decoration since this is an internal operations tool where legibility and scanability matter more than visual flourish.


