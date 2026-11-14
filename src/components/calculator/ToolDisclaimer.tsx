import type { ReactNode } from 'react'
import { Callout } from '@/components/ui'

// The "estimate, not advice" note. Keep it short and honest.
export default function ToolDisclaimer({ children }: { children: ReactNode }) {
  return <Callout label="Estimate, not advice">{children}</Callout>
}
