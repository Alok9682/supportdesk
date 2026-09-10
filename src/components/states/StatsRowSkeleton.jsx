export default function StatsRowSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4" role="status" aria-label="Loading statistics">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4"
        >
          <div className="h-11 w-11 shrink-0 animate-pulse rounded-lg bg-[var(--color-border)]" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-6 w-10 animate-pulse rounded bg-[var(--color-border)]" />
            <div className="h-3 w-16 animate-pulse rounded bg-[var(--color-border)]" />
          </div>
        </div>
      ))}
    </div>
  )
}
