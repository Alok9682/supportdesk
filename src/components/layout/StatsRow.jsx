import { LayoutGrid, Circle, Clock, CheckCircle2 } from 'lucide-react'
import StatsCard from './StatsCard'

export default function StatsRow({ stats }) {
  const cards = [
    {
      label: 'Total Tickets',
      value: stats.total,
      icon: LayoutGrid,
      accentClassName: 'bg-[var(--color-brand-soft)] text-[var(--color-brand)]',
    },
    {
      label: 'Open',
      value: stats.open,
      icon: Circle,
      accentClassName: 'bg-[var(--color-status-open-bg)] text-[var(--color-status-open)]',
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      accentClassName: 'bg-[var(--color-status-progress-bg)] text-[var(--color-status-progress)]',
    },
    {
      label: 'Resolved',
      value: stats.resolved,
      icon: CheckCircle2,
      accentClassName: 'bg-[var(--color-status-resolved-bg)] text-[var(--color-status-resolved)]',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {cards.map((card) => (
        <StatsCard key={card.label} {...card} />
      ))}
    </div>
  )
}
