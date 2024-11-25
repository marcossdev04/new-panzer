import { GraphicCard } from './GraphicCard'
import { StatsTable } from './StatsTable'

export function Cards() {
  return (
    <div className="flex mobile:flex-col mobile:gap-5 justify-between">
      <GraphicCard />
      <StatsTable />
    </div>
  )
}
