import { useMemo, useState } from 'react'
import { ScenarioSwitcher } from './components/dev/ScenarioSwitcher'
import { AppShell } from './components/layout/AppShell'
import { Header } from './components/layout/Header'
import { AlertBanner } from './components/tracking/AlertBanner'
import { EtaCard } from './components/tracking/EtaCard'
import { OrderSummary } from './components/tracking/OrderSummary'
import { StatusHero } from './components/tracking/StatusHero'
import { SupportActions } from './components/tracking/SupportActions'
import { Timeline } from './components/tracking/Timeline'
import { DEMO_NOW, mockOrders } from './data/mockOrders'
import { deriveTrackingView } from './lib/deriveTrackingView'
import type { ActionId, ScenarioId } from './types/order'

export default function App() {
  const [scenario, setScenario] = useState<ScenarioId>('on-track')
  const [detailsOpen, setDetailsOpen] = useState(false)

  const order = mockOrders[scenario]
  const view = useMemo(() => deriveTrackingView(order, DEMO_NOW), [order])

  function handleAction(id: ActionId) {
    if (id === 'view-details') {
      setDetailsOpen(true)
      requestAnimationFrame(() =>
        document
          .getElementById('order-summary')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      )
      return
    }
    // Sheets for the remaining actions arrive in the next commits.
    console.log('action:', id)
  }

  return (
    <AppShell>
      <Header orderId={order.id} />
      <ScenarioSwitcher value={scenario} onChange={setScenario} />
      <main className="space-y-4 p-4">
        <StatusHero view={view} />
        {view.banner && <AlertBanner banner={view.banner} />}
        <EtaCard eta={view.eta} tracking={order.tracking} />
        <Timeline steps={view.steps} tone={view.tone} />
        <OrderSummary
          order={order}
          open={detailsOpen}
          onToggle={() => setDetailsOpen((v) => !v)}
        />
      </main>
      <SupportActions
        primary={view.primaryAction}
        secondary={view.secondaryAction}
        onAction={handleAction}
      />
    </AppShell>
  )
}