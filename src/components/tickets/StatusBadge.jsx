import { Circle, Clock, CheckCircle2 } from 'lucide-react'

const STATUS_STYLES = {
  Open: {
    icon: Circle,
    className: 'bg-[var(--color-status-open-bg)] text-[var(--color-status-open)]',
  },
  'In Progress': {
    icon: Clock,
    className: 'bg-[var(--color-status-progress-bg)] text-[var(--color-status-progress)]',
  },
  Resolved: {
    icon: CheckCircle2,
    className: 'bg-[var(--color-status-resolved-bg)] text-[var(--color-status-resolved)]',
  },
}

export default function StatusBadge({ status, className = '' }) {
  const config = STATUS_STYLES[status] || STATUS_STYLES.Open
  const Icon = config.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.className} ${className}`}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
      {status}
    </span>
  )
}
