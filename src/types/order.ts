export type StepKey =
  | 'placed'
  | 'processing'
  | 'shipped'
  | 'out-for-delivery'
  | 'delivered'

export type StepState = 'done' | 'current' | 'upcoming'

export type ScenarioId =
  | 'on-track'
  | 'delayed'
  | 'delivered-not-received'
  | 'tracking-pending'

export type ViewKind =
  | 'on-track'
  | 'delayed'
  | 'delivered'
  | 'delivered-not-received'
  | 'tracking-pending'

export type Tone = 'brand' | 'done' | 'warn' | 'danger' | 'neutral'

export type ActionId =
  | 'contact-support'
  | 'report-issue'
  | 'notify-me'
  | 'view-details'

export interface OrderItem {
  id: string
  name: string
  variant?: string
  quantity: number
  price: number
  image?: string
}

export interface DeliveryWindow {
  start: string
  end: string
}

export interface Tracking {
  carrier: string
  number: string
  lastUpdate?: { message: string; location: string; at: string }
}

export interface Dispute {
  reportedAt: string
  ticketId: string
}

export interface Order {
  id: string
  placedAt: string
  status: StepKey
  timestamps: Partial<Record<StepKey, string>>
  estimatedDelivery: DeliveryWindow | null
  delayReason?: string
  tracking: Tracking | null
  items: OrderItem[]
  total: number
  currency: string
  address: string
  dispute: Dispute | null
}

export interface StepView {
  key: StepKey
  label: string
  description: string
  state: StepState
  timestamp?: string
  warning: boolean
}

export interface ActionView {
  id: ActionId
  label: string
}

export interface BannerView {
  tone: Tone
  title: string
  message: string
}

export interface EtaView {
  label: string
  value: string
  note?: string
}

export interface TrackingView {
  kind: ViewKind
  tone: Tone
  headline: string
  subline: string
  banner?: BannerView
  eta: EtaView
  steps: StepView[]
  primaryAction: ActionView
  secondaryAction?: ActionView
}