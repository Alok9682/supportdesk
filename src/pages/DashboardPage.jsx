import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTicketStore } from '../store/ticketStore'
import { filterTickets, computeStats } from '../utils/ticketUtils'
import Header from '../components/layout/Header'
import StatsRow from '../components/layout/StatsRow'
import FilterBar from '../components/tickets/FilterBar'
import TicketTable from '../components/tickets/TicketTable'
import TicketDetailsPanel from '../components/tickets/TicketDetailsPanel'
import LoadingState from '../components/states/LoadingState'
import ErrorState from '../components/states/ErrorState'
import EmptyState from '../components/states/EmptyState'
import StatsRowSkeleton from '../components/states/StatsRowSkeleton'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { id: selectedTicketId } = useParams()

  const tickets = useTicketStore((s) => s.tickets)
  const loading = useTicketStore((s) => s.loading)
  const error = useTicketStore((s) => s.error)
  const searchQuery = useTicketStore((s) => s.searchQuery)
  const statusFilter = useTicketStore((s) => s.statusFilter)
  const priorityFilter = useTicketStore((s) => s.priorityFilter)
  const updatingTicketIds = useTicketStore((s) => s.updatingTicketIds)
  const fetchTickets = useTicketStore((s) => s.fetchTickets)
  const updateTicketStatus = useTicketStore((s) => s.updateTicketStatus)
  const clearFilters = useTicketStore((s) => s.clearFilters)

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  const filteredTickets = useMemo(
    () => filterTickets(tickets, { query: searchQuery, status: statusFilter, priority: priorityFilter }),
    [tickets, searchQuery, statusFilter, priorityFilter]
  )

  const stats = useMemo(() => computeStats(tickets), [tickets])

  const selectedTicket = selectedTicketId
    ? tickets.find((t) => t.id === selectedTicketId) || null
    : null

  const handleOpenTicket = (ticketId) => navigate(`/tickets/${ticketId}`)
  const handleCloseDetails = () => navigate('/')
  const handleStatusChange = (ticketId, status) => updateTicketStatus(ticketId, status)

  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'All' || priorityFilter !== 'All'

  return (
    <div className="min-h-screen bg-[var(--color-app)]">
      <Header />

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-[var(--color-ink)]">Tickets</h1>
          <p className="mt-0.5 text-sm text-[var(--color-ink-soft)]">
            Track and manage incoming customer support requests.
          </p>
        </div>

        <div className="mb-6">
          {loading ? <StatsRowSkeleton /> : <StatsRow stats={stats} />}
        </div>

        {!loading && !error && (
          <div className="mb-4">
            <FilterBar />
          </div>
        )}

        {loading && <LoadingState />}

        {!loading && error && <ErrorState message={error} onRetry={fetchTickets} />}

        {!loading && !error && tickets.length === 0 && <EmptyState variant="no-tickets" />}

        {!loading && !error && tickets.length > 0 && filteredTickets.length === 0 && (
          <EmptyState variant="filtered" onClearFilters={hasActiveFilters ? clearFilters : undefined} />
        )}

        {!loading && !error && filteredTickets.length > 0 && (
          <TicketTable
            tickets={filteredTickets}
            updatingTicketIds={updatingTicketIds}
            onOpen={handleOpenTicket}
            onStatusChange={handleStatusChange}
          />
        )}
      </main>

      {selectedTicket && (
        <TicketDetailsPanel
          ticket={selectedTicket}
          isUpdating={updatingTicketIds.includes(selectedTicket.id)}
          onClose={handleCloseDetails}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  )
}
