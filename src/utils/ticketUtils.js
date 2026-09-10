export const STATUS_OPTIONS = ['Open', 'In Progress', 'Resolved']
export const PRIORITY_OPTIONS = ['Low', 'Medium', 'High']

export const STATUS_FILTERS = ['All', ...STATUS_OPTIONS]
export const PRIORITY_FILTERS = ['All', ...PRIORITY_OPTIONS]

/** Returns the initials to show in a customer avatar, e.g. "Suman Prajapati" -> "SJ". */
export function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/** Deterministically maps a name to one of a small set of avatar accent colors. */
const AVATAR_PALETTE = [
  { bg: '#e4efee', fg: '#205e5b' },
  { bg: '#eef0fb', fg: '#39408f' },
  { bg: '#fbf0dc', fg: '#93590a' },
  { bg: '#fbe9e6', fg: '#a3352a' },
  { bg: '#eaf3ec', fg: '#3d6b4f' },
  { bg: '#f2ecf9', fg: '#6a3fa0' },
]

export function getAvatarColors(name = '') {
  let hash = 0
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  }
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length]
}

/** Applies search + status + priority filters together (AND semantics). */
export function filterTickets(tickets, { query, status, priority }) {
  const normalizedQuery = query.trim().toLowerCase()

  return tickets.filter((ticket) => {
    const matchesStatus = status === 'All' || ticket.status === status
    const matchesPriority = priority === 'All' || ticket.priority === priority

    if (!matchesStatus || !matchesPriority) return false
    if (!normalizedQuery) return true

    const haystack = [ticket.id, ticket.customer.name, ticket.subject]
      .join(' ')
      .toLowerCase()

    return haystack.includes(normalizedQuery)
  })
}

export function computeStats(tickets) {
  return {
    total: tickets.length,
    open: tickets.filter((t) => t.status === 'Open').length,
    inProgress: tickets.filter((t) => t.status === 'In Progress').length,
    resolved: tickets.filter((t) => t.status === 'Resolved').length,
  }
}
