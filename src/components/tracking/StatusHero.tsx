import clsx from 'clsx'
import { Clock, PackageCheck, PackageSearch, PackageX, Truck } from 'lucide-react'
import { toneStyles } from '../../lib/tone'
import type { TrackingView, ViewKind } from '../../types/order'

const ICONS = {
  'on-track': Truck,
  delayed: Clock,
  delivered: PackageCheck,
  'delivered-not-received': PackageX,
  'tracking-pending': PackageSearch,
} satisfies Record<ViewKind, unknown>

const BADGES: Record<ViewKind, string> = {
  'on-track': 'On track',
  delayed: 'Delayed',
  delivered: 'Delivered',
  'delivered-not-received': 'Needs attention',
  'tracking-pending': 'Tracking pending',
}

export function StatusHero({ view }: { view: TrackingView }) {
  const t = toneStyles[view.tone]
  const Icon = ICONS[view.kind]

  return (
    <section aria-live="polite" className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-start gap-4">
        <span
          className={clsx(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
            t.soft,
            t.text,
          )}
        >
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <div className="min-w-0">
          <span
            className={clsx(
              'inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold',
              t.soft,
              t.text,
            )}
          >
            {BADGES[view.kind]}
          </span>
          <h2 className="mt-2 text-xl leading-snug font-semibold">{view.headline}</h2>
          <p className="mt-1 text-sm text-muted">{view.subline}</p>
        </div>
      </div>
    </section>
  )
}