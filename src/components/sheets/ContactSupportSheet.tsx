import { Headset, Mail, MessageCircle, Phone } from 'lucide-react'
import { BottomSheet } from './BottomSheet'

const ROW =
  'flex min-h-16 w-full items-center gap-4 rounded-xl border border-line px-4 py-3 text-left hover:bg-canvas'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  orderId?: string
  onChat: () => void
}

export function ContactSupportSheet({ open, onOpenChange, orderId, onChat }: Props) {
  const subject = encodeURIComponent(orderId ? `Order #${orderId}` : 'Order support')

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Contact support"
      description={orderId ? `We'll have order #${orderId} ready.` : 'Choose how you would like to reach us.'}
    >
      <div className="space-y-3">
        <button
          type="button"
          className={ROW}
          onClick={() => {
            onOpenChange(false)
            onChat()
          }}
        >
          <MessageCircle className="h-5 w-5 shrink-0 text-brand" aria-hidden />
          <span>
            <span className="block text-sm font-semibold">Live chat</span>
            <span className="block text-xs text-muted">Usually replies in under 2 minutes</span>
          </span>
        </button>

        <a href="tel:+8801000000000" className={ROW}>
          <Phone className="h-5 w-5 shrink-0 text-brand" aria-hidden />
          <span>
            <span className="block text-sm font-semibold">Call us</span>
            <span className="block text-xs text-muted">Daily, 9 AM to 9 PM</span>
          </span>
        </a>

        <a href={`mailto:support@example.com?subject=${subject}`} className={ROW}>
          <Mail className="h-5 w-5 shrink-0 text-brand" aria-hidden />
          <span>
            <span className="block text-sm font-semibold">Email us</span>
            <span className="block text-xs text-muted">We reply within 24 hours</span>
          </span>
        </a>

        <p className="flex items-center justify-center gap-2 pt-1 text-xs text-muted">
          <Headset className="h-4 w-4" aria-hidden />
          Have your order number handy
        </p>
      </div>
    </BottomSheet>
  )
}