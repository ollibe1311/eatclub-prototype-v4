import { cn } from "../../lib/utils"
import { useState, useRef, useEffect } from "react"
import type { HTMLAttributes, ReactNode } from "react"

interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode
}

export function DropdownMenu({ trigger, children, className, ...props }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div ref={ref} className={cn("relative inline-flex", className)} {...props}>
      <div onClick={() => setOpen(!open)} className="cursor-pointer">{trigger}</div>
      {open && (
        <div className="absolute top-full mt-1 left-0 min-w-[180px] bg-white border border-border rounded-2xl shadow-lg py-2 z-50">
          {children}
        </div>
      )}
    </div>
  )
}

export function DropdownMenuItem({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-4 py-2 text-sm text-text-primary hover:bg-gray-50 cursor-pointer", className)}
      {...props}
    />
  )
}
