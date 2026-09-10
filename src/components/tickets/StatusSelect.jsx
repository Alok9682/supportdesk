import { Loader2, ChevronDown } from 'lucide-react'
import { STATUS_OPTIONS } from '../../utils/ticketUtils'

export default function StatusSelect({ status, onChange, isUpdating, className = '', label }) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <select
        value={status}
        onChange={(e) => onChange(e.target.value)}
        disabled={isUpdating}
        aria-label={label || 'Change ticket status'}
        onClick={(e) => e.stopPropagation()}
        className="h-9 appearance-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] pl-3 pr-8 text-sm font-medium text-[var(--color-ink)] transition-colors focus:border-[var(--color-brand)] focus:outline-none disabled:opacity-60"
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {isUpdating ? (
        <Loader2
          className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 animate-spin text-[var(--color-ink-soft)]"
          aria-hidden="true"
        />
      ) : (
        <ChevronDown
          className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-[var(--color-ink-soft)]"
          aria-hidden="true"
        />
      )}
    </div>
  )
}
