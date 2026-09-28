import type { Tone } from '../types/order'

interface ToneStyle {
  text: string
  bg: string
  soft: string
  border: string
}

export const toneStyles: { [K in Tone]: ToneStyle } = {
  brand: { text: 'text-brand', bg: 'bg-brand', soft: 'bg-brand/10', border: 'border-brand/30' },
  done: { text: 'text-done-ink', bg: 'bg-done', soft: 'bg-done/10', border: 'border-done/30' },
  warn: { text: 'text-warn-ink', bg: 'bg-warn', soft: 'bg-warn/10', border: 'border-warn/30' },
  danger: { text: 'text-danger-ink', bg: 'bg-danger', soft: 'bg-danger/10', border: 'border-danger/30' },
  neutral: { text: 'text-muted', bg: 'bg-muted', soft: 'bg-ink/5', border: 'border-line' },
}