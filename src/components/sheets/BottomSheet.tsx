import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  children: ReactNode
}

export function BottomSheet({ open, onOpenChange, title, description, children }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-fade-in fixed inset-0 z-40 bg-ink/50" />
        <Dialog.Content className="animate-sheet-up fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[90dvh] w-full max-w-[430px] overflow-y-auto rounded-t-3xl bg-surface p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-xl">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">
                {description}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close"
              className="-mt-1 -mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-canvas"
            >
              <X className="h-5 w-5" aria-hidden />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}