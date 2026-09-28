import clsx from 'clsx'

function Block({ className }: { className: string }) {
  return <div className={clsx('animate-pulse rounded-lg bg-line', className)} />
}

const CARD = 'rounded-2xl border border-line bg-surface p-5'

export function TrackingSkeleton() {
  return (
    <div role="status" className="space-y-4 p-4">
      <span className="sr-only">Loading tracking information…</span>

      <div className={CARD}>
        <div className="flex gap-4">
          <Block className="h-12 w-12 shrink-0 rounded-full" />
          <div className="flex-1 space-y-3">
            <Block className="h-4 w-24" />
            <Block className="h-6 w-4/5" />
            <Block className="h-4 w-full" />
          </div>
        </div>
      </div>

      <div className={CARD}>
        <div className="space-y-3">
          <Block className="h-3 w-28" />
          <Block className="h-5 w-3/5" />
        </div>
      </div>

      <div className={CARD}>
        <Block className="mb-5 h-4 w-32" />
        <div className="space-y-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-3">
              <Block className="h-7 w-7 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Block className="h-4 w-1/2" />
                <Block className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}