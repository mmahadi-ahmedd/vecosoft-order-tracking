import { CircleCheck } from 'lucide-react'
import { useEffect } from 'react'

interface Props {
  message: string | null
  onDismiss: () => void
}

export function Toast({ message, onDismiss }: Props) {
  useEffect(() => {
    if (!message) return
    const id = window.setTimeout(onDismiss, 3500)
    return () => window.clearTimeout(id)
  }, [message, onDismiss])

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-24 z-[60] mx-auto max-w-[398px]"
    >
      {message && (
        <div className="animate-fade-in flex items-center gap-3 rounded-xl bg-ink px-4 py-3 text-sm text-white shadow-lg">
          <CircleCheck className="h-5 w-5 shrink-0 text-done" aria-hidden />
          {message}
        </div>
      )}
    </div>
  )
}