import CustomerAvatar from './CustomerAvatar'
import StatusBadge from './StatusBadge'
import PriorityBadge from './PriorityBadge'
import StatusSelect from './StatusSelect'
import { formatDate } from '../../utils/date'

export default function TicketRow({ ticket, isUpdating, onOpen, onStatusChange }) {
  return (
    <tr
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
      className="cursor-pointer border-b border-[var(--color-border)] transition-colors last:border-b-0 hover:bg-[var(--color-app)] focus-visible:bg-[var(--color-app)]"
    >
      <td className="px-5 py-4 align-middle">
        <span className="font-mono text-xs text-[var(--color-ink-soft)]">{ticket.id}</span>
      </td>
      <td className="px-5 py-4 align-middle">
        <div className="flex items-center gap-3">
          <CustomerAvatar name={ticket.customer.name} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[var(--color-ink)]">
              {ticket.customer.name}
            </p>
            <p className="truncate text-xs text-[var(--color-ink-soft)]">{ticket.customer.email}</p>
          </div>
        </div>
      </td>
      <td className="max-w-xs px-5 py-4 align-middle">
        <p className="truncate text-sm text-[var(--color-ink)]">{ticket.subject}</p>
      </td>
      <td className="px-5 py-4 align-middle">
        <PriorityBadge priority={ticket.priority} />
      </td>
      <td className="px-5 py-4 align-middle">
        <StatusBadge status={ticket.status} />
      </td>
      <td className="whitespace-nowrap px-5 py-4 align-middle text-sm text-[var(--color-ink-soft)]">
        {formatDate(ticket.createdAt)}
      </td>
      <td className="px-5 py-4 align-middle">
        <StatusSelect
          status={ticket.status}
          isUpdating={isUpdating}
          label={`Change status for ${ticket.id}`}
          onChange={(status) => onStatusChange(ticket.id, status)}
        />
      </td>
    </tr>
  )
}
