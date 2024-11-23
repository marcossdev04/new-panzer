import { GraphicCard } from './GraphicCard'
import { StatsTable } from './StatsTable'

export function Cards() {
  return (
    <div className="flex justify-between">
      <GraphicCard />
      <StatsTable />
    </div>
  )
}
