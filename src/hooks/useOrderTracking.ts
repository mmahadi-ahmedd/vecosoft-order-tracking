import { useEffect, useState } from 'react'
import { mockOrders } from '../data/mockOrders'
import type { Order, ScenarioId } from '../types/order'

export type DemoKey = ScenarioId | 'error'

const LATENCY_MS = 900

type Result = Order | 'error'

interface Loaded {
  key: DemoKey
  attempt: number
  result: Result
}

export type OrderState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; order: Order }

/** Simulates a network call: the "error" demo fails once, then succeeds on retry. */
function fetchMockOrder(key: DemoKey, attempt: number): Result {
  if (key === 'error') return attempt === 0 ? 'error' : mockOrders['on-track']
  return mockOrders[key]
}

export function useOrderTracking() {
  const [key, setKey] = useState<DemoKey>('on-track')
  const [attempt, setAttempt] = useState(0)
  const [loaded, setLoaded] = useState<Loaded | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoaded({ key, attempt, result: fetchMockOrder(key, attempt) })
    }, LATENCY_MS)
    return () => window.clearTimeout(timer)
  }, [key, attempt])

  // Loading is derived: whenever the latest result doesn't match what was requested.
  const current = loaded && loaded.key === key && loaded.attempt === attempt ? loaded.result : null

  let state: OrderState = { status: 'loading' }
  if (current === 'error') state = { status: 'error' }
  else if (current) state = { status: 'ready', order: current }

  return {
    scenario: key,
    state,
    select: (next: DemoKey) => {
      setKey(next)
      setAttempt(0)
    },
    retry: () => setAttempt((a) => a + 1),
  }
}