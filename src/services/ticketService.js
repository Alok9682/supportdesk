import { mockTickets } from '../data/mockTickets'

// Simulated in-memory "database". Kept outside the store so the store never
// touches raw mock data directly — it only ever talks to this service layer,
// the same way it would talk to a real REST API.
let db = mockTickets.map((t) => ({ ...t, messages: [...t.messages] }))

const NETWORK_DELAY_MS = 550

// Flip this to `true` locally to exercise the dashboard's error state.
// Left `false` so the app loads reliably out of the box.
const SIMULATE_FETCH_FAILURE = false

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * GET /tickets
 * Fetches every ticket. Simulates network latency and, optionally, a
 * failure so the UI's error/retry path can be demonstrated.
 */
export async function getTickets() {
  await delay(NETWORK_DELAY_MS)

  if (SIMULATE_FETCH_FAILURE) {
    throw new Error('Unable to reach the support ticket service. Please check your connection and try again.')
  }

  // Return a defensive copy so callers can never mutate the "server" state directly.
  return db.map((t) => ({ ...t, customer: { ...t.customer }, messages: [...t.messages] }))
}

/**
 * GET /tickets/:id
 */
export async function getTicketById(id) {
  await delay(300)
  const found = db.find((t) => t.id === id)
  if (!found) {
    throw new Error(`Ticket ${id} could not be found.`)
  }
  return { ...found, customer: { ...found.customer }, messages: [...found.messages] }
}

/**
 * PATCH /tickets/:id/status
 */
export async function updateTicketStatus(id, status) {
  await delay(350)
  const index = db.findIndex((t) => t.id === id)
  if (index === -1) {
    throw new Error(`Ticket ${id} could not be found.`)
  }
  const updated = {
    ...db[index],
    status,
    updatedAt: new Date().toISOString(),
  }
  db = [...db.slice(0, index), updated, ...db.slice(index + 1)]
  return { ...updated, customer: { ...updated.customer }, messages: [...updated.messages] }
}
