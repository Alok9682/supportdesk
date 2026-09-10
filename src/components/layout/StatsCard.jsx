export default function StatsCard({ label, value, icon: Icon, accentClassName }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${accentClassName}`}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-semibold leading-tight text-[var(--color-ink)]">{value}</p>
        <p className="text-sm leading-snug text-[var(--color-ink-soft)]">{label}</p>
      </div>
    </div>
  )
}
