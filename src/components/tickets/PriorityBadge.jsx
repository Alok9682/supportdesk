import { ChevronUp, ChevronsUp, Minus } from 'lucide-react'

const PRIORITY_STYLES = {
  Low: {
    icon: Minus,
    className: 'bg-[var(--color-priority-low-bg)] text-[var(--color-priority-low)]',
  },
  Medium: {
    icon: ChevronUp,
    className: 'bg-[var(--color-priority-medium-bg)] text-[var(--color-priority-medium)]',
  },
  High: {
    icon: ChevronsUp,
    className: 'bg-[var(--color-priority-high-bg)] text-[var(--color-priority-high)]',
  },
}

export default function PriorityBadge({ priority, className = '' }) {
  const config = PRIORITY_STYLES[priority] || PRIORITY_STYLES.Low
  const Icon = config.icon

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${config.className} ${className}`}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
      {priority}
    </span>
  )
}
