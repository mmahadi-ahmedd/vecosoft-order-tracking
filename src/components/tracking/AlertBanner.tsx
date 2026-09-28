import clsx from 'clsx'
import { Info, TriangleAlert } from 'lucide-react'
import { toneStyles } from '../../lib/tone'
import type { BannerView } from '../../types/order'

export function AlertBanner({ banner }: { banner: BannerView }) {
  const t = toneStyles[banner.tone]
  const Icon = banner.tone === 'neutral' || banner.tone === 'brand' ? Info : TriangleAlert

  return (
    <div
      role="status"
      className={clsx('flex gap-3 rounded-2xl border p-4', t.soft, t.border)}
    >
      <Icon className={clsx('mt-0.5 h-5 w-5 shrink-0', t.text)} aria-hidden />
      <div className="min-w-0">
        <p className={clsx('text-sm font-semibold', t.text)}>{banner.title}</p>
        <p className="mt-1 text-sm text-ink/80">{banner.message}</p>
      </div>
    </div>
  )
}