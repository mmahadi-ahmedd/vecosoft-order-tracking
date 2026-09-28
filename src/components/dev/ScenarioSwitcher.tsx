import clsx from 'clsx'

interface Option<T extends string> {
  id: T
  label: string
}

interface Props<T extends string> {
  options: Option<T>[]
  value: T
  onChange: (id: T) => void
}

export function ScenarioSwitcher<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <div className="border-b border-dashed border-line bg-canvas px-4 py-3">
      <p
        id="scenario-label"
        className="mb-2 text-[11px] font-semibold tracking-wide text-muted uppercase"
      >
        Demo scenario
      </p>
      <div role="radiogroup" aria-labelledby="scenario-label" className="grid grid-cols-2 gap-2">
        {options.map((o, i) => {
          const active = value === o.id
          const spanFull = options.length % 2 === 1 && i === options.length - 1
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o.id)}
              className={clsx(
                'min-h-11 rounded-lg border px-3 text-sm font-medium transition-colors',
                spanFull && 'col-span-2',
                active
                  ? 'border-ink bg-ink text-white'
                  : 'border-line bg-surface text-ink hover:bg-canvas',
              )}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}