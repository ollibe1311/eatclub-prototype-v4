import { cn } from "../../lib/utils"
import type { HTMLAttributes, ButtonHTMLAttributes } from "react"
import { createContext, useContext, useState } from "react"

const TabsContext = createContext<{
  value: string
  onChange: (v: string) => void
}>({ value: "", onChange: () => {} })

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string
  onValueChange?: (v: string) => void
}

export function Tabs({ defaultValue, onValueChange, children, className, ...props }: TabsProps) {
  const [value, setValue] = useState(defaultValue)
  const onChange = (v: string) => {
    setValue(v)
    onValueChange?.(v)
  }
  return (
    <TabsContext.Provider value={{ value, onChange }}>
      <div className={cn("", className)} {...props}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-[var(--radius-pill)] bg-gray-100 p-1",
        className
      )}
      {...props}
    />
  )
}

interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export function TabsTrigger({ value, className, ...props }: TabsTriggerProps) {
  const ctx = useContext(TabsContext)
  const isActive = ctx.value === value
  return (
    <button
      className={cn(
        "px-4 py-1.5 text-sm font-medium rounded-[var(--radius-pill)] transition-colors cursor-pointer",
        isActive ? "bg-white text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary",
        className
      )}
      onClick={() => ctx.onChange(value)}
      {...props}
    />
  )
}

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string
}

export function TabsContent({ value, className, ...props }: TabsContentProps) {
  const ctx = useContext(TabsContext)
  if (ctx.value !== value) return null
  return <div className={cn("mt-4", className)} {...props} />
}
