import TicketRow from './TicketRow'
import TicketCard from './TicketCard'

const COLUMN_HEADERS = ['Ticket', 'Customer', 'Subject', 'Priority', 'Status', 'Created', 'Update status']

export default function TicketTable({ tickets, updatingTicketIds, onOpen, onStatusChange }) {
  return (
    <>
      {/* Mobile & tablet: card list */}
      <div className="flex flex-col gap-3 lg:hidden">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            isUpdating={updatingTicketIds.includes(ticket.id)}
            onOpen={onOpen}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-app)]">
                {COLUMN_HEADERS.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <TicketRow
                  key={ticket.id}
                  ticket={ticket}
                  isUpdating={updatingTicketIds.includes(ticket.id)}
                  onOpen={onOpen}
                  onStatusChange={onStatusChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
