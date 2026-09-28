import clsx from 'clsx'
import { SCENARIOS } from '../../data/mockOrders'
import type { ScenarioId } from '../../types/order'

interface Props {
  value: ScenarioId
  onChange: (id: ScenarioId) => void
}

export function ScenarioSwitcher({ value, onChange }: Props) {
  return (
    <div className="border-b border-dashed border-line bg-canvas px-4 py-3">
      <p
        id="scenario-label"
        className="mb-2 text-[11px] font-semibold tracking-wide text-muted uppercase"
      >
        Demo scenario
      </p>
      <div role="radiogroup" aria-labelledby="scenario-label" className="grid grid-cols-2 gap-2">
        {SCENARIOS.map((s) => {
          const active = value === s.id
          return (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(s.id)}
              className={clsx(
                'min-h-11 rounded-lg border px-3 text-sm font-medium transition-colors',
                active
                  ? 'border-ink bg-ink text-white'
                  : 'border-line bg-surface text-ink hover:bg-canvas',
              )}
            >
              {s.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}