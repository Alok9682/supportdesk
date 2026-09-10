import CustomerAvatar from './CustomerAvatar'
import StatusBadge from './StatusBadge'
import PriorityBadge from './PriorityBadge'
import StatusSelect from './StatusSelect'
import { formatDate } from '../../utils/date'

export default function TicketCard({ ticket, isUpdating, onOpen, onStatusChange }) {
  return (
    <div
      onClick={() => onOpen(ticket.id)}
      tabIndex={0}
      role="button"
      aria-label={`Open ticket ${ticket.id}: ${ticket.subject}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(ticket.id)
        }
      }}
      className="cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-colors hover:bg-[var(--color-app)] focus-visible:bg-[var(--color-app)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <CustomerAvatar name={ticket.customer.name} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[var(--color-ink)]">
              {ticket.customer.name}
            </p>
            <p className="font-mono text-xs text-[var(--color-ink-soft)]">{ticket.id}</p>
          </div>
        </div>
        <span className="shrink-0 text-xs text-[var(--color-ink-soft)]">
          {formatDate(ticket.createdAt)}
        </span>
      </div>

      <p className="mt-3 text-sm font-medium text-[var(--color-ink)]">{ticket.subject}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <PriorityBadge priority={ticket.priority} />
        <StatusBadge status={ticket.status} />
      </div>

      <div className="mt-3 border-t border-[var(--color-border)] pt-3" onClick={(e) => e.stopPropagation()}>
        <StatusSelect
          status={ticket.status}
          isUpdating={isUpdating}
          label={`Change status for ${ticket.id}`}
          onChange={(status) => onStatusChange(ticket.id, status)}
          className="w-full [&>select]:w-full"
        />
      </div>
    </div>
  )
}
