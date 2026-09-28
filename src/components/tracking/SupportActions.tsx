import clsx from 'clsx'
import { BellRing, CircleHelp, FileText, Headset, TriangleAlert } from 'lucide-react'
import type { ActionId, ActionView } from '../../types/order'

const ICONS = {
  'contact-support': Headset,
  'report-issue': TriangleAlert,
  'notify-me': BellRing,
  'view-details': FileText,
}

interface Props {
  primary: ActionView
  secondary?: ActionView
  onAction: (id: ActionId) => void
}

function ActionButton({
  action,
  variant,
  onAction,
}: {
  action: ActionView
  variant: 'primary' | 'secondary'
  onAction: (id: ActionId) => void
}) {
  const Icon = ICONS[action.id] ?? CircleHelp
  return (
    <button
      type="button"
      onClick={() => onAction(action.id)}
      className={clsx(
        'flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold transition-colors',
        variant === 'primary'
          ? 'bg-ink text-white hover:bg-ink/90'
          : 'border border-line bg-surface text-ink hover:bg-canvas',
      )}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      <span className="truncate">{action.label}</span>
    </button>
  )
}

export function SupportActions({ primary, secondary, onAction }: Props) {
  return (
    <div className="sticky bottom-0 z-10 border-t border-line bg-surface/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur">
      <div className="flex gap-3">
        {secondary && <ActionButton action={secondary} variant="secondary" onAction={onAction} />}
        <ActionButton action={primary} variant="primary" onAction={onAction} />
      </div>
    </div>
  )
}