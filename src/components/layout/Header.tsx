import { ArrowLeft } from 'lucide-react'

export function Header({ orderId }: { orderId?: string }) {
    return (
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-surface/90 px-4 py-3 backdrop-blur">
            <button
                type="button"
                aria-label="Go back"
                className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full hover:bg-canvas"
            >
                <ArrowLeft className="h-5 w-5" aria-hidden />
            </button>
            <div className="min-w-0">
                <h1 className="text-base font-semibold leading-tight">Track order</h1>
                <p className="truncate text-xs text-muted">
                    {orderId ? `Order #${orderId}` : 'Loading order…'}
                </p>
            </div>
        </header>
    )
}