import { Search, X } from 'lucide-react'
import { useTicketStore } from '../../store/ticketStore'

export default function SearchBar({ className = '' }) {
  const searchQuery = useTicketStore((s) => s.searchQuery)
  const setSearchQuery = useTicketStore((s) => s.setSearchQuery)

  return (
    <div className={`relative ${className}`}>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-ink-soft)]"
        aria-hidden="true"
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by customer, subject, or ticket ID"
        aria-label="Search tickets by customer, subject, or ticket ID"
        className="h-10 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-app)] pl-9 pr-9 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)] transition-colors focus:border-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:outline-none"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => setSearchQuery('')}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-[var(--color-ink-soft)] hover:bg-[var(--color-border)] hover:text-[var(--color-ink)]"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
