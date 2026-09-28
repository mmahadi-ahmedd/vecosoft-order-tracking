import type { ReactNode } from 'react'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-canvas sm:border-x sm:border-line">
        {children}
      </div>
    </div>
  )
}