import clsx from 'clsx'
import { Check, TriangleAlert } from 'lucide-react'
import { formatDateTime } from '../../lib/format'
import { toneStyles } from '../../lib/tone'
import type { StepView, Tone } from '../../types/order'

const STATE_LABEL = { done: 'Completed', current: 'Current step', upcoming: 'Upcoming' }

function Node({ step, tone }: { step: StepView; tone: Tone }) {
  const base = 'relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full'

  if (step.warning) {
    return (
      <span className={clsx(base, toneStyles[tone].bg, 'text-white')}>
        <TriangleAlert className="h-4 w-4" aria-hidden />
      </span>
    )
  }
  if (step.state === 'done') {
    return (
      <span className={clsx(base, 'bg-done text-white')}>
        <Check className="h-4 w-4" aria-hidden />
      </span>
    )
  }
  if (step.state === 'current') {
    return (
      <span className={clsx(base, 'bg-brand/15')}>
        <span className="h-3 w-3 animate-pulse rounded-full bg-brand" />
      </span>
    )
  }
  return <span className={clsx(base, 'border-2 border-upcoming bg-surface')} />
}

export function Timeline({ steps, tone }: { steps: StepView[]; tone: Tone }) {
  return (
    <section
      aria-labelledby="timeline-title"
      className="rounded-2xl border border-line bg-surface p-5"
    >
      <h2 id="timeline-title" className="mb-4 text-sm font-semibold">
        Delivery progress
      </h2>
      <ol>
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1
          return (
            <li
              key={step.key}
              aria-current={step.state === 'current' ? 'step' : undefined}
              className="relative flex gap-3 pb-6 last:pb-0"
            >
              {!isLast && (
                <span
                  aria-hidden
                  className={clsx(
                    'absolute top-7 bottom-0 left-[13px] w-0.5',
                    step.state === 'done' ? 'bg-done' : 'bg-upcoming',
                  )}
                />
              )}
              <Node step={step} tone={tone} />
              <div className="min-w-0 pt-0.5">
                <p
                  className={clsx(
                    'text-sm font-medium',
                    step.state === 'upcoming' && 'text-muted',
                  )}
                >
                  {step.label}
                  <span className="sr-only"> ({STATE_LABEL[step.state]})</span>
                </p>
                <p className="text-xs text-muted">
                  {step.timestamp ? formatDateTime(step.timestamp) : step.description}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}