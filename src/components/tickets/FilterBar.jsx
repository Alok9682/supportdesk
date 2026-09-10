import { X, ChevronDown } from 'lucide-react'
import { useTicketStore } from '../../store/ticketStore'
import { STATUS_FILTERS, PRIORITY_FILTERS } from '../../utils/ticketUtils'

function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-[var(--color-ink-soft)]">{label}</span>
      <span className="relative inline-flex items-center">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 appearance-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-2 pl-3 pr-8 text-sm font-medium text-[var(--color-ink)] transition-colors focus:border-[var(--color-brand)] focus:outline-none"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-[var(--color-ink-soft)]"
          aria-hidden="true"
        />
      </span>
    </label>
  )
}

export default function FilterBar() {
  const statusFilter = useTicketStore((s) => s.statusFilter)
  const priorityFilter = useTicketStore((s) => s.priorityFilter)
  const searchQuery = useTicketStore((s) => s.searchQuery)
  const setStatusFilter = useTicketStore((s) => s.setStatusFilter)
  const setPriorityFilter = useTicketStore((s) => s.setPriorityFilter)
  const clearFilters = useTicketStore((s) => s.clearFilters)

  const hasActiveFilters = statusFilter !== 'All' || priorityFilter !== 'All' || searchQuery !== ''

  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterSelect
        label="Status"
        value={statusFilter}
        options={STATUS_FILTERS}
        onChange={setStatusFilter}
      />
      <FilterSelect
        label="Priority"
        value={priorityFilter}
        options={PRIORITY_FILTERS}
        onChange={setPriorityFilter}
      />
      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-ink-soft)] transition-colors hover:bg-[var(--color-app)] hover:text-[var(--color-ink)]"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          Clear filters
        </button>
      )}
    </div>
  )
}
