import clsx from 'clsx'
import { CircleCheck, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { ViewKind } from '../../types/order'
import { BottomSheet } from './BottomSheet'

const REASONS = [
  { id: 'not-received', label: "Marked delivered, but I didn't receive it" },
  { id: 'late', label: 'My order is very late' },
  { id: 'damaged', label: 'The package arrived damaged' },
  { id: 'wrong-address', label: 'It was delivered to the wrong address' },
  { id: 'other', label: 'Something else' },
] as const

type ReasonId = (typeof REASONS)[number]['id']

function defaultReason(kind: ViewKind): ReasonId {
  if (kind === 'delayed') return 'late'
  if (kind === 'delivered' || kind === 'delivered-not-received') return 'not-received'
  return 'other'
}

interface FormProps {
  orderId: string
  kind: ViewKind
  onClose: () => void
}

function ReportForm({ orderId, kind, onClose }: FormProps) {
  const [reason, setReason] = useState<ReasonId>(defaultReason(kind))
  const [note, setNote] = useState('')
  const [phase, setPhase] = useState<'form' | 'sending' | 'sent'>('form')
  const [ticket, setTicket] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPhase('sending')
    window.setTimeout(() => {
      setTicket(`SUP-${Math.floor(10000 + Math.random() * 90000)}`)
      setPhase('sent')
    }, 900)
  }

  if (phase === 'sent') {
    return (
      <div className="flex flex-col items-center py-4 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-done/10 text-done-ink">
          <CircleCheck className="h-8 w-8" aria-hidden />
        </span>
        <h3 className="mt-4 text-base font-semibold">Report received</h3>
        <p className="mt-1 text-sm text-muted">
          Ticket {ticket} for order #{orderId}. We'll email you an update within 24 hours.
        </p>
        <button
          type="button"
          autoFocus
          onClick={onClose}
          className="mt-6 min-h-12 w-full rounded-xl bg-ink text-sm font-semibold text-white"
        >
          Done
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <fieldset className="space-y-2">
        <legend className="mb-2 text-sm font-medium">What went wrong?</legend>
        {REASONS.map((r) => (
          <label
            key={r.id}
            className={clsx(
              'flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-2 text-sm',
              reason === r.id ? 'border-brand bg-brand/5' : 'border-line',
            )}
          >
            <input
              type="radio"
              name="reason"
              value={r.id}
              checked={reason === r.id}
              onChange={() => setReason(r.id)}
              className="h-4 w-4 shrink-0 accent-brand"
            />
            {r.label}
          </label>
        ))}
      </fieldset>

      {reason === 'not-received' && (
        <div className="rounded-xl bg-warn/10 p-4 text-sm">
          <p className="font-semibold text-warn-ink">Quick checks before you submit</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-ink/80">
            <li>Ask neighbors or household members</li>
            <li>Check your mailbox, porch and building reception</li>
            <li>Look for a delivery photo or note from the courier</li>
          </ul>
        </div>
      )}

      <div>
        <label htmlFor="report-note" className="mb-2 block text-sm font-medium">
          Details <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id="report-note"
          rows={3}
          maxLength={500}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Anything that helps us investigate"
          className="w-full rounded-xl border border-line p-3 text-base placeholder:text-muted"
        />
      </div>

      <button
        type="submit"
        disabled={phase === 'sending'}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink text-sm font-semibold text-white disabled:opacity-70"
      >
        {phase === 'sending' && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />}
        {phase === 'sending' ? 'Sending…' : 'Submit report'}
      </button>
    </form>
  )
}

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  orderId: string
  kind: ViewKind
}

export function ReportIssueSheet({ open, onOpenChange, orderId, kind }: Props) {
  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Report a delivery problem"
      description="Tell us what happened and we'll look into it."
    >
      <ReportForm orderId={orderId} kind={kind} onClose={() => onOpenChange(false)} />
    </BottomSheet>
  )
}