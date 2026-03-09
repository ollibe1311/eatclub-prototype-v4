import { cn } from "../../lib/utils"
import { ChevronDown } from "lucide-react"
import type { SelectHTMLAttributes } from "react"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
}

export function Select({ className, options, ...props }: SelectProps) {
  return (
    <div className="relative inline-flex">
      <select
        className={cn(
          "appearance-none bg-white border border-border rounded-[var(--radius-pill)] px-4 py-2 pr-8 text-sm text-text-primary cursor-pointer hover:bg-gray-50",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
    </div>
  )
}
