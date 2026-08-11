import type { ReactNode } from 'react'

// Concise estimate disclaimer — keep it short and honest, not a legal wall.
export default function ToolDisclaimer({ children }: { children: ReactNode }) {
  return <p className="mt-10 max-w-3xl text-xs text-white/35 leading-relaxed">{children}</p>
}
