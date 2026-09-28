import type { Order, OrderItem, ScenarioId } from '../types/order'

/** Fixed "now" so the demo scenarios stay deterministic. */
export const DEMO_NOW = new Date('2026-09-28T10:00:00+06:00')

const items: OrderItem[] = [
  {
    id: 'i1',
    name: 'Aero Wireless Headphones',
    variant: 'Midnight Black',
    quantity: 1,
    price: 129,
  },
  {
    id: 'i2',
    name: 'USB-C Fast Charging Cable',
    variant: '2 m',
    quantity: 2,
    price: 12.5,
  },
]

const shared = {
  items,
  total: 154,
  currency: 'USD',
  address: '24 Lake Road, Dhanmondi, Dhaka',
  dispute: null,
}

export const mockOrders: Record<ScenarioId, Order> = {
  'on-track': {
    ...shared,
    id: 'VS-104582',
    placedAt: '2026-09-25T18:20:00+06:00',
    status: 'out-for-delivery',
    timestamps: {
      placed: '2026-09-25T18:20:00+06:00',
      processing: '2026-09-26T09:05:00+06:00',
      shipped: '2026-09-27T13:40:00+06:00',
      'out-for-delivery': '2026-09-28T08:15:00+06:00',
    },
    estimatedDelivery: {
      start: '2026-09-28T14:00:00+06:00',
      end: '2026-09-28T18:00:00+06:00',
    },
    tracking: {
      carrier: 'SwiftShip Express',
      number: 'SS-7741-3390-2211',
      lastUpdate: {
        message: 'Out for delivery with courier',
        location: 'Dhanmondi Hub, Dhaka',
        at: '2026-09-28T08:15:00+06:00',
      },
    },
  },

  delayed: {
    ...shared,
    id: 'VS-104377',
    placedAt: '2026-09-20T11:00:00+06:00',
    status: 'shipped',
    timestamps: {
      placed: '2026-09-20T11:00:00+06:00',
      processing: '2026-09-21T10:20:00+06:00',
      shipped: '2026-09-22T16:45:00+06:00',
    },
    estimatedDelivery: {
      start: '2026-09-25T10:00:00+06:00',
      end: '2026-09-26T18:00:00+06:00',
    },
    delayReason: 'A backlog at the sorting hub is holding your parcel.',
    tracking: {
      carrier: 'SwiftShip Express',
      number: 'SS-6620-1187-9034',
      lastUpdate: {
        message: 'Parcel held at sorting hub',
        location: 'Chattogram Sorting Hub',
        at: '2026-09-24T21:30:00+06:00',
      },
    },
  },

  'delivered-not-received': {
    ...shared,
    id: 'VS-104201',
    placedAt: '2026-09-23T14:10:00+06:00',
    status: 'delivered',
    timestamps: {
      placed: '2026-09-23T14:10:00+06:00',
      processing: '2026-09-24T09:30:00+06:00',
      shipped: '2026-09-25T17:00:00+06:00',
      'out-for-delivery': '2026-09-27T08:40:00+06:00',
      delivered: '2026-09-27T15:12:00+06:00',
    },
    estimatedDelivery: {
      start: '2026-09-27T10:00:00+06:00',
      end: '2026-09-27T18:00:00+06:00',
    },
    tracking: {
      carrier: 'SwiftShip Express',
      number: 'SS-5590-4471-1203',
      lastUpdate: {
        message: 'Delivered, left at front door',
        location: 'Dhanmondi, Dhaka',
        at: '2026-09-27T15:12:00+06:00',
      },
    },
    dispute: {
      reportedAt: '2026-09-28T09:30:00+06:00',
      ticketId: 'SUP-58213',
    },
  },

  'tracking-pending': {
    ...shared,
    id: 'VS-104690',
    placedAt: '2026-09-28T09:41:00+06:00',
    status: 'processing',
    timestamps: {
      placed: '2026-09-28T09:41:00+06:00',
      processing: '2026-09-28T09:44:00+06:00',
    },
    estimatedDelivery: null,
    tracking: null,
  },
}

export const SCENARIOS: { id: ScenarioId; label: string }[] = [
  { id: 'on-track', label: 'On track' },
  { id: 'delayed', label: 'Delayed' },
  { id: 'delivered-not-received', label: 'Not received' },
  { id: 'tracking-pending', label: 'No tracking' },
]