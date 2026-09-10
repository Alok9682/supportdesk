import { Bell, LifeBuoy } from 'lucide-react'
import CustomerAvatar from '../tickets/CustomerAvatar'
import SearchBar from '../tickets/SearchBar'

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-brand)] text-white">
            <LifeBuoy className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="hidden text-lg font-semibold tracking-tight text-[var(--color-ink)] sm:inline">
            SupportDesk
          </span>
        </div>

        <SearchBar className="max-w-md flex-1" />

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="View notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-[var(--color-ink-soft)] transition-colors hover:bg-[var(--color-app)] hover:text-[var(--color-ink)]"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span
              className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--color-priority-high)]"
              aria-hidden="true"
            />
            <span className="sr-only">You have unread notifications</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-[var(--color-app)]"
            aria-label="Open profile menu for Alok Prajapati"
          >
            <CustomerAvatar name="Alok Prajapati" size="sm" />
            <span className="hidden text-sm font-medium text-[var(--color-ink)] sm:inline">
              Alok Prajapati
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
