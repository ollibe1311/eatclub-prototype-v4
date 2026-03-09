import { cn } from "../../lib/utils"
import type { ReactNode } from "react"

interface SectionHeaderProps {
  icon: ReactNode
  title: string
  className?: string
  children?: ReactNode
}

export function SectionHeader({ icon, title, className, children }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-6", className)}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent-olive/10 flex items-center justify-center text-accent-olive">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
      </div>
      {children}
    </div>
  )
}
