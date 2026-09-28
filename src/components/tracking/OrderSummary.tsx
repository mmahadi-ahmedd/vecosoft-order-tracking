import { ChevronDown, Package } from 'lucide-react'
import clsx from 'clsx'
import { formatMoney } from '../../lib/format'
import type { Order } from '../../types/order'

interface Props {
  order: Order
  open: boolean
  onToggle: () => void
}

export function OrderSummary({ order, open, onToggle }: Props) {
  const [first, ...rest] = order.items
  const extra = rest.length

  return (
    <section
      id="order-summary"
      aria-labelledby="summary-title"
      className="scroll-mt-20 rounded-2xl border border-line bg-surface p-5"
    >
      <h2 id="summary-title" className="mb-4 text-sm font-semibold">
        Order summary
      </h2>

      {!open && first && (
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-canvas text-muted">
            <Package className="h-6 w-6" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{first.name}</p>
            <p className="text-xs text-muted">
              {extra > 0 ? `+ ${extra} more ${extra === 1 ? 'item' : 'items'}` : `Qty ${first.quantity}`}
            </p>
          </div>
          <p className="text-sm font-semibold">{formatMoney(order.total, order.currency)}</p>
        </div>
      )}

      {open && (
        <div className="space-y-4">
          <ul className="space-y-3">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-canvas text-muted">
                  <Package className="h-6 w-6" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted">
                    {item.variant ? `${item.variant} · ` : ''}Qty {item.quantity}
                  </p>
                </div>
                <p className="text-sm">{formatMoney(item.price * item.quantity, order.currency)}</p>
              </li>
            ))}
          </ul>

          <dl className="space-y-3 border-t border-line pt-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Total</dt>
              <dd className="font-semibold">{formatMoney(order.total, order.currency)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="shrink-0 text-muted">Delivering to</dt>
              <dd className="text-right">{order.address}</dd>
            </div>
            {order.tracking && (
              <div className="flex justify-between gap-4">
                <dt className="shrink-0 text-muted">Tracking no.</dt>
                <dd className="text-right break-all">{order.tracking.number}</dd>
              </div>
            )}
          </dl>
        </div>
      )}

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="order-summary"
        className="mt-4 flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg text-sm font-medium text-brand hover:bg-brand/5"
      >
        {open ? 'Hide order details' : 'View order details'}
        <ChevronDown
          className={clsx('h-4 w-4 transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>
    </section>
  )
}