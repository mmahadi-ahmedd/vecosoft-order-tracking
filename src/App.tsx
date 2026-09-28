import { useCallback, useMemo, useState } from 'react'
import { ScenarioSwitcher } from './components/dev/ScenarioSwitcher'
import { AppShell } from './components/layout/AppShell'
import { Header } from './components/layout/Header'
import { ContactSupportSheet } from './components/sheets/ContactSupportSheet'
import { ReportIssueSheet } from './components/sheets/ReportIssueSheet'
import { ErrorState } from './components/states/ErrorState'
import { TrackingSkeleton } from './components/states/TrackingSkeleton'
import { AlertBanner } from './components/tracking/AlertBanner'
import { EtaCard } from './components/tracking/EtaCard'
import { OrderSummary } from './components/tracking/OrderSummary'
import { StatusHero } from './components/tracking/StatusHero'
import { SupportActions } from './components/tracking/SupportActions'
import { Timeline } from './components/tracking/Timeline'
import { Toast } from './components/ui/Toast'
import { DEMO_NOW, SCENARIOS } from './data/mockOrders'
import { useOrderTracking } from './hooks/useOrderTracking'
import type { DemoKey } from './hooks/useOrderTracking'
import { deriveTrackingView } from './lib/deriveTrackingView'
import type { ActionId } from './types/order'

const DEMO_OPTIONS: { id: DemoKey; label: string }[] = [
  ...SCENARIOS,
  { id: 'error', label: 'Load error' },
]

export default function App() {
  const { scenario, state, select, retry } = useOrderTracking()
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [notified, setNotified] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const dismissToast = useCallback(() => setToast(null), [])

  const order = state.status === 'ready' ? state.order : null
  const view = useMemo(() => (order ? deriveTrackingView(order, DEMO_NOW) : null), [order])

  function handleSelect(next: DemoKey) {
    setDetailsOpen(false)
    setNotified(false)
    select(next)
  }

  function handleAction(id: ActionId) {
    switch (id) {
      case 'view-details':
        setDetailsOpen(true)
        requestAnimationFrame(() =>
          document
            .getElementById('order-summary')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        )
        break
      case 'contact-support':
        setContactOpen(true)
        break
      case 'report-issue':
        setReportOpen(true)
        break
      case 'notify-me':
        setToast(
          notified
            ? "You're already on the list. We'll notify you when it ships."
            : "Done! We'll notify you as soon as your order ships.",
        )
        setNotified(true)
        break
    }
  }

  return (
    <AppShell>
      <Header orderId={order?.id} />
      <ScenarioSwitcher options={DEMO_OPTIONS} value={scenario} onChange={handleSelect} />

      {state.status === 'loading' && <TrackingSkeleton />}

      {state.status === 'error' && (
        <ErrorState onRetry={retry} onContact={() => setContactOpen(true)} />
      )}

      {order && view && (
        <>
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
          <ReportIssueSheet
            open={reportOpen}
            onOpenChange={setReportOpen}
            orderId={order.id}
            kind={view.kind}
          />
        </>
      )}

      <ContactSupportSheet
        open={contactOpen}
        onOpenChange={setContactOpen}
        orderId={order?.id}
        onChat={() => setToast('Connecting you to an agent…')}
      />
      <Toast message={toast} onDismiss={dismissToast} />
    </AppShell>
  )
}