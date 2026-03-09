import { Button } from "../ui/button"
import { Select } from "../ui/select"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { Download, GitCompare } from "lucide-react"

interface ChartControlsProps {
  filters?: { options: { value: string; label: string }[]; defaultValue?: string }[]
  tabs?: { value: string; label: string }[]
  defaultTab?: string
  onTabChange?: (v: string) => void
  showCompare?: boolean
  showExport?: boolean
}

export function ChartControls({ filters, tabs, defaultTab, onTabChange, showCompare = true, showExport = true }: ChartControlsProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {tabs && defaultTab && (
        <Tabs defaultValue={defaultTab} onValueChange={onTabChange}>
          <TabsList>
            {tabs.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
      {filters?.map((f, i) => (
        <Select key={i} options={f.options} defaultValue={f.defaultValue} />
      ))}
      {showCompare && (
        <Button variant="outline" size="sm">
          <GitCompare className="w-3.5 h-3.5" />
          Compare last period
        </Button>
      )}
      {showExport && (
        <Button variant="outline" size="sm">
          <Download className="w-3.5 h-3.5" />
          Export
        </Button>
      )}
    </div>
  )
}
