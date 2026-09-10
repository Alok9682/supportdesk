/** Formats an ISO date string like "Mar 14, 2026". */
export function formatDate(isoString) {
  if (!isoString) return '—'
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/** Formats an ISO date string like "Mar 14, 2026, 9:15 AM". */
export function formatDateTime(isoString) {
  if (!isoString) return '—'
  const date = new Date(isoString)
  const datePart = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
  return `${datePart}, ${timePart}`
}

/** Formats an ISO date string as a short relative time, e.g. "2d ago". */
export function formatRelative(isoString) {
  if (!isoString) return '—'
  const then = new Date(isoString).getTime()
  const now = Date.now()
  const diffMs = Math.max(now - then, 0)
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  if (diffMs < hour) {
    const mins = Math.max(1, Math.round(diffMs / minute))
    return `${mins}m ago`
  }
  if (diffMs < day) {
    return `${Math.round(diffMs / hour)}h ago`
  }
  const days = Math.round(diffMs / day)
  if (days < 30) return `${days}d ago`
  return formatDate(isoString)
}
