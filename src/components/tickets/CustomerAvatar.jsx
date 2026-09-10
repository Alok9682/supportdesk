import { getInitials, getAvatarColors } from '../../utils/ticketUtils'

const SIZE_CLASSES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
}

export default function CustomerAvatar({ name, size = 'md' }) {
  const { bg, fg } = getAvatarColors(name)
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${sizeClass}`}
      style={{ backgroundColor: bg, color: fg }}
      aria-hidden="true"
    >
      {getInitials(name)}
    </span>
  )
}
