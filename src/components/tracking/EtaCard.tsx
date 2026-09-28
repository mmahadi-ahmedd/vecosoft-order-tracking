import { CalendarClock, MapPin } from 'lucide-react'
import { formatDateTime } from '../../lib/format'
import type { EtaView, Tracking } from '../../types/order'

interface Props {
  eta: EtaView
  tracking: Tracking | null
}

export function EtaCard({ eta, tracking }: Props) {
  return (
    <section
      aria-labelledby="eta-title"
      className="rounded-2xl border border-line bg-surface p-5"
    >
      <div className="flex items-start gap-3">
        <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-muted" aria-hidden />
        <div className="min-w-0">
          <h2 id="eta-title" className="text-xs font-medium text-muted">
            {eta.label}
          </h2>
          <p className="mt-0.5 text-base font-semibold">{eta.value}</p>
          {eta.note && <p className="mt-1 text-xs text-muted">{eta.note}</p>}
        </div>
      </div>

      {tracking?.lastUpdate && (
        <div className="mt-4 flex items-start gap-3 border-t border-line pt-4">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-muted" aria-hidden />
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted">Latest update</p>
            <p className="mt-0.5 text-sm font-medium">{tracking.lastUpdate.message}</p>
            <p className="text-xs text-muted">
              {tracking.lastUpdate.location} · {formatDateTime(tracking.lastUpdate.at)}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}