import { cn } from "../../lib/utils"
import type { HTMLAttributes } from "react"

export function KPIRow({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("grid grid-cols-4 gap-4 mb-6", className)} {...props} />
  )
}
