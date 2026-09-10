import CustomerAvatar from './CustomerAvatar'
import { formatDateTime } from '../../utils/date'

export default function Conversation({ messages }) {
  if (!messages || messages.length === 0) {
    return (
      <p className="text-sm text-[var(--color-ink-soft)]">No messages have been exchanged on this ticket yet.</p>
    )
  }

  return (
    <ol className="space-y-4">
      {messages.map((message) => {
        const isSupport = message.sender === 'support'
        return (
          <li
            key={message.id}
            className={`flex gap-3 ${isSupport ? 'flex-row-reverse text-right' : ''}`}
          >
            <CustomerAvatar name={message.name} size="sm" />
            <div className={`flex max-w-[85%] flex-col gap-1 ${isSupport ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)]">
                {isSupport ? (
                  <>
                    <time dateTime={message.timestamp}>{formatDateTime(message.timestamp)}</time>
                    <span className="font-medium text-[var(--color-brand)]">{message.name} · Support</span>
                  </>
                ) : (
                  <>
                    <span className="font-medium text-[var(--color-ink)]">{message.name} · Customer</span>
                    <time dateTime={message.timestamp}>{formatDateTime(message.timestamp)}</time>
                  </>
                )}
              </div>
              <p
                className={`rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  isSupport
                    ? 'bg-[var(--color-brand-soft)] text-[var(--color-ink)]'
                    : 'bg-[var(--color-app)] text-[var(--color-ink)]'
                }`}
              >
                {message.message}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
