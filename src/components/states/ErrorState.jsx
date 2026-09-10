import { AlertTriangle } from 'lucide-react'

export default function ErrorState({ message, onRetry }) {
  return (
    <div
      className="flex flex-col items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-16 text-center"
      role="alert"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-priority-high-bg)]">
        <AlertTriangle className="h-6 w-6 text-[var(--color-priority-high)]" aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <p className="text-base font-semibold text-[var(--color-ink)]">Couldn't load tickets</p>
        <p className="max-w-sm text-sm text-[var(--color-ink-soft)]">
          {message || 'Something went wrong while fetching ticket data.'}
        </p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-[var(--color-brand)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-dark)]"
      >
        Retry
      </button>
    </div>
  )
}
