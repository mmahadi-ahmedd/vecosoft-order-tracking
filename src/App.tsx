import { useMemo, useState } from 'react'
import { ScenarioSwitcher } from './components/dev/ScenarioSwitcher'
import { AppShell } from './components/layout/AppShell'
import { Header } from './components/layout/Header'
import { DEMO_NOW, mockOrders } from './data/mockOrders'
import { deriveTrackingView } from './lib/deriveTrackingView'
import type { ScenarioId } from './types/order'
import { StatusHero } from './components/tracking/StatusHero'


export default function App() {
  const [scenario, setScenario] = useState<ScenarioId>('on-track')
  const order = mockOrders[scenario]
  const view = useMemo(() => deriveTrackingView(order, DEMO_NOW), [order])

  return (
    <AppShell>
      <Header orderId={order.id} />
      <ScenarioSwitcher value={scenario} onChange={setScenario} />
      <main className="space-y-4 p-4">
       <StatusHero view={view} />
      </main>
    </AppShell>
  )
}