import { create } from 'zustand'
import { getTickets, updateTicketStatus as updateTicketStatusApi } from '../services/ticketService'

export const useTicketStore = create((set, get) => ({
  // --- data state ---
  tickets: [],
  loading: true,
  error: null,

  // --- search & filter state ---
  searchQuery: '',
  statusFilter: 'All',
  priorityFilter: 'All',

  // --- per-ticket "updating" tracking, so only the affected row shows a spinner ---
  updatingTicketIds: [],

  async fetchTickets() {
    set({ loading: true, error: null })
    try {
      const tickets = await getTickets()
      set({ tickets, loading: false })
    } catch (err) {
      set({ error: err.message || 'Something went wrong while loading tickets.', loading: false })
    }
  },

  async updateTicketStatus(ticketId, status) {
    set((state) => ({ updatingTicketIds: [...state.updatingTicketIds, ticketId] }))
    try {
      const updated = await updateTicketStatusApi(ticketId, status)
      set((state) => ({
        tickets: state.tickets.map((t) => (t.id === ticketId ? updated : t)),
        updatingTicketIds: state.updatingTicketIds.filter((id) => id !== ticketId),
      }))
      return updated
    } catch (err) {
      set((state) => ({
        updatingTicketIds: state.updatingTicketIds.filter((id) => id !== ticketId),
        error: err.message || 'Unable to update ticket status.',
      }))
      throw err
    }
  },

  setSearchQuery(query) {
    set({ searchQuery: query })
  },

  setStatusFilter(status) {
    set({ statusFilter: status })
  },

  setPriorityFilter(priority) {
    set({ priorityFilter: priority })
  },

  clearFilters() {
    set({ searchQuery: '', statusFilter: 'All', priorityFilter: 'All' })
  },

  getTicketById(id) {
    return get().tickets.find((t) => t.id === id) || null
  },
}))
