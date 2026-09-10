import { Inbox, SearchX } from 'lucide-react'

export default function EmptyState({ variant = 'no-tickets', onClearFilters }) {
  const isFiltered = variant === 'filtered'
  const Icon = isFiltered ? SearchX : Inbox

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface)] px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-app)]">
        <Icon className="h-6 w-6 text-[var(--color-ink-soft)]" aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <p className="text-base font-semibold text-[var(--color-ink)]">
          {isFiltered ? 'No tickets found' : 'No tickets yet'}
        </p>
        <p className="max-w-sm text-sm text-[var(--color-ink-soft)]">
          {isFiltered
            ? 'Try a different search term, or adjust your status and priority filters.'
            : 'New support tickets will show up here as soon as they come in.'}
        </p>
      </div>
      {isFiltered && onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-app)]"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
