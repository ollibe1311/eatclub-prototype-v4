import { useEffect } from "react"
import { X } from "lucide-react"
import type { ReactNode } from "react"

interface DetailDrawerProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function DetailDrawer({ open, onClose, title, children }: DetailDrawerProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (open) {
      document.addEventListener("keydown", handleEsc)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose} />
      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-xl z-50 overflow-y-auto animate-slide-in">
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          <button className="p-2 hover:bg-black/5 rounded-lg cursor-pointer" onClick={onClose}>
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </>
  )
}
