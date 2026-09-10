import { useEffect, useRef } from 'react'
import { X, Mail, Phone } from 'lucide-react'
import CustomerAvatar from './CustomerAvatar'
import StatusBadge from './StatusBadge'
import PriorityBadge from './PriorityBadge'
import StatusSelect from './StatusSelect'
import Conversation from './Conversation'
import { formatDateTime } from '../../utils/date'

export default function TicketDetailsPanel({ ticket, isUpdating, onClose, onStatusChange }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    closeButtonRef.current?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!ticket) return null

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <button
        type="button"
        aria-label="Close ticket details"
        onClick={onClose}
        className="absolute inset-0 bg-[var(--color-ink)]/40"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Ticket ${ticket.id} details`}
        className="relative flex h-full w-full max-w-lg flex-col overflow-hidden bg-[var(--color-surface)] shadow-xl sm:w-[32rem]"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <div>
            <p className="font-mono text-xs text-[var(--color-ink-soft)]">{ticket.id}</p>
            <h2 className="text-base font-semibold text-[var(--color-ink)]">{ticket.subject}</h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close ticket details"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--color-ink-soft)] transition-colors hover:bg-[var(--color-app)] hover:text-[var(--color-ink)]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {/* Customer info */}
          <section className="border-b border-[var(--color-border)] px-5 py-4">
            <div className="flex items-center gap-3">
              <CustomerAvatar name={ticket.customer.name} size="lg" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[var(--color-ink)]">
                  {ticket.customer.name}
                </p>
                <p className="flex items-center gap-1.5 truncate text-xs text-[var(--color-ink-soft)]">
                  <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {ticket.customer.email}
                </p>
                {ticket.customer.phone && (
                  <p className="flex items-center gap-1.5 truncate text-xs text-[var(--color-ink-soft)]">
                    <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {ticket.customer.phone}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Issue details */}
          <section className="border-b border-[var(--color-border)] px-5 py-4">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div>
                <dt className="text-xs text-[var(--color-ink-soft)]">Priority</dt>
                <dd className="mt-1">
                  <PriorityBadge priority={ticket.priority} />
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-ink-soft)]">Status</dt>
                <dd className="mt-1">
                  <StatusBadge status={ticket.status} />
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-ink-soft)]">Created</dt>
                <dd className="mt-1 text-[var(--color-ink)]">{formatDateTime(ticket.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-ink-soft)]">Last updated</dt>
                <dd className="mt-1 text-[var(--color-ink)]">{formatDateTime(ticket.updatedAt)}</dd>
              </div>
            </dl>

            <div className="mt-4">
              <p className="text-xs text-[var(--color-ink-soft)]">Description</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink)]">{ticket.description}</p>
            </div>

            <div className="mt-4">
              <label htmlFor="details-status-select" className="text-xs text-[var(--color-ink-soft)]">
                Update status
              </label>
              <div className="mt-1.5">
                <StatusSelect
                  status={ticket.status}
                  isUpdating={isUpdating}
                  label={`Change status for ${ticket.id}`}
                  onChange={(status) => onStatusChange(ticket.id, status)}
                />
              </div>
            </div>
          </section>

          {/* Conversation */}
          <section className="px-5 py-4">
            <h3 className="mb-3 text-sm font-semibold text-[var(--color-ink)]">Conversation</h3>
            <Conversation messages={ticket.messages} />
          </section>
        </div>
      </aside>
    </div>
  )
}
