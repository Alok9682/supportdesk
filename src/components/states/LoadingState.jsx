function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 border-b border-[var(--color-border)] px-5 py-4">
      <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-[var(--color-border)]" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-40 animate-pulse rounded bg-[var(--color-border)]" />
        <div className="h-3 w-64 max-w-full animate-pulse rounded bg-[var(--color-border)]" />
      </div>
      <div className="hidden h-6 w-20 shrink-0 animate-pulse rounded-full bg-[var(--color-border)] sm:block" />
      <div className="hidden h-6 w-24 shrink-0 animate-pulse rounded-full bg-[var(--color-border)] md:block" />
      <div className="hidden h-3.5 w-20 shrink-0 animate-pulse rounded bg-[var(--color-border)] lg:block" />
    </div>
  )
}

export default function LoadingState() {
  return (
    <div
      className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
      role="status"
      aria-live="polite"
      aria-label="Loading tickets"
    >
      {Array.from({ length: 7 }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  )
}
