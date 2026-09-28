import { CloudOff, RefreshCw } from 'lucide-react'

interface Props {
  onRetry: () => void
  onContact: () => void
}

export function ErrorState({ onRetry, onContact }: Props) {
  return (
    <div role="alert" className="p-4">
      <div className="rounded-2xl border border-line bg-surface p-6 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-danger/10 text-danger-ink">
          <CloudOff className="h-7 w-7" aria-hidden />
        </span>
        <h2 className="mt-4 text-lg font-semibold">We couldn't load your tracking</h2>
        <p className="mt-1 text-sm text-muted">
          This is usually a connection hiccup. Your order is safe, so please try again.
        </p>
        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={onRetry}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink text-sm font-semibold text-white hover:bg-ink/90"
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            Try again
          </button>
          <button
            type="button"
            onClick={onContact}
            className="min-h-12 w-full rounded-xl border border-line text-sm font-semibold hover:bg-canvas"
          >
            Contact support
          </button>
        </div>
      </div>
    </div>
  )
}