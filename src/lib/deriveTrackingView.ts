import type {
  Order,
  StepKey,
  StepState,
  StepView,
  TrackingView,
  ViewKind,
} from '../types/order'
import { formatDate, formatDateTime, formatWindow } from './format'

const DAY_MS = 86_400_000

export const STEPS: { key: StepKey; label: string; description: string }[] = [
  { key: 'placed', label: 'Order placed', description: 'We received your order' },
  { key: 'processing', label: 'Processing', description: 'Packing your items' },
  { key: 'shipped', label: 'Shipped', description: 'Handed to the carrier' },
  { key: 'out-for-delivery', label: 'Out for delivery', description: 'On its way to you' },
  { key: 'delivered', label: 'Delivered', description: 'Package arrived' },
]

const ON_TRACK_HEADLINE: Partial<Record<StepKey, string>> = {
  placed: 'Order confirmed',
  processing: 'Preparing your order',
  shipped: 'On its way',
  'out-for-delivery': 'Out for delivery',
}

function getKind(order: Order, now: Date): ViewKind {
  if (!order.tracking) return 'tracking-pending'
  if (order.status === 'delivered') {
    return order.dispute ? 'delivered-not-received' : 'delivered'
  }
  if (order.estimatedDelivery && new Date(order.estimatedDelivery.end) < now) {
    return 'delayed'
  }
  return 'on-track'
}

function buildSteps(order: Order, kind: ViewKind): StepView[] {
  const currentIndex = STEPS.findIndex((s) => s.key === order.status)
  return STEPS.map((step, i) => {
    let state: StepState = 'upcoming'
    if (i < currentIndex) state = 'done'
    else if (i === currentIndex) {
      state = order.status === 'delivered' ? 'done' : 'current'
    }
    const warning =
      (kind === 'delayed' && state === 'current') ||
      (kind === 'delivered-not-received' && step.key === 'delivered')
    return { ...step, state, timestamp: order.timestamps[step.key], warning }
  })
}

export function deriveTrackingView(order: Order, now: Date = new Date()): TrackingView {
  const kind = getKind(order, now)
  const steps = buildSteps(order, kind)
  const window = order.estimatedDelivery
  const deliveredAt = order.timestamps.delivered

  switch (kind) {
    case 'delayed': {
      const end = window!.end
      const daysLate = Math.max(1, Math.ceil((now.getTime() - new Date(end).getTime()) / DAY_MS))
      return {
        kind,
        steps,
        tone: 'warn',
        headline: 'Your order is running late',
        subline: `Expected ${formatDate(end)}, now ${daysLate} ${daysLate === 1 ? 'day' : 'days'} late`,
        banner: {
          tone: 'warn',
          title: 'Delivery is delayed',
          message: `${order.delayReason ?? 'Your carrier reported a delay.'} We're sorry for the wait. Contact support and we'll help track it down.`,
        },
        eta: {
          label: 'Originally expected',
          value: formatDate(end),
          note: 'A new estimate will appear once the carrier confirms it.',
        },
        primaryAction: { id: 'contact-support', label: 'Contact support' },
        secondaryAction: { id: 'report-issue', label: 'Report a problem' },
      }
    }

    case 'delivered-not-received':
      return {
        kind,
        steps,
        tone: 'danger',
        headline: 'Marked delivered, but not received',
        subline: `Delivered ${formatDateTime(deliveredAt!)}. You reported it missing ${formatDate(order.dispute!.reportedAt)}.`,
        banner: {
          tone: 'danger',
          title: "We're looking into your missing package",
          message: `Ticket ${order.dispute!.ticketId} is open and we'll update you within 24 hours. In the meantime, check with neighbors and around your entrance.`,
        },
        eta: { label: 'Marked delivered', value: formatDateTime(deliveredAt!) },
        primaryAction: { id: 'contact-support', label: 'Contact support' },
        secondaryAction: { id: 'view-details', label: 'View order details' },
      }

    case 'delivered':
      return {
        kind,
        steps,
        tone: 'done',
        headline: 'Delivered',
        subline: `Arrived ${formatDateTime(deliveredAt!)}`,
        eta: { label: 'Delivered', value: formatDateTime(deliveredAt!) },
        primaryAction: { id: 'view-details', label: 'View order details' },
        secondaryAction: { id: 'report-issue', label: "I didn't receive it" },
      }

    case 'tracking-pending':
      return {
        kind,
        steps,
        tone: 'neutral',
        headline: 'Tracking not available yet',
        subline: 'Your order is confirmed. Tracking appears once it ships, usually within 24 hours.',
        banner: {
          tone: 'neutral',
          title: 'What happens next',
          message: "We'll notify you the moment your order ships.",
        },
        eta: { label: 'Estimated delivery', value: 'Confirmed once shipped' },
        primaryAction: { id: 'notify-me', label: 'Notify me when it ships' },
        secondaryAction: { id: 'contact-support', label: 'Contact support' },
      }

    default:
      return {
        kind: 'on-track',
        steps,
        tone: 'brand',
        headline: ON_TRACK_HEADLINE[order.status] ?? 'On its way',
        subline: window
          ? `Estimated arrival ${formatWindow(window.start, window.end)}`
          : 'We will share an estimate soon.',
        eta: {
          label: 'Estimated delivery',
          value: window ? formatWindow(window.start, window.end) : 'To be confirmed',
        },
        primaryAction: { id: 'view-details', label: 'View order details' },
        secondaryAction: { id: 'contact-support', label: 'Contact support' },
      }
  }
}