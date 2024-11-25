import { ChartNoAxesCombined } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import bgChart from '@/assets/backgroundChart.png'
import { api } from '@/api/api'
import { MatchForDate } from '@/types/MatchForDate'
import { Produtivity } from '@/types/Produtivity'
import { Profit } from '@/types/Profit'
import { useFilter } from '@/Store/useFilter'
import { useQuery } from 'react-query'
import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ProdutivityGraphic } from './ProdutivityGraphic'
import { MatchesGraphic } from './MatchesGraphic'
import { ProfitGraphic } from './ ProfitGraphic'

export interface Graphs {
  match_for_date: MatchForDate[]
  productivity: Produtivity[]
  profit: Profit[]
}
type ChartType = 'productivity' | 'matches' | 'profit'

const chartTypeOptions = {
  productivity: 'Produtividade',
  matches: 'Quantidade de Partidas',
  profit: 'Lucro',
} as const

const timeRangeOptions = {
  '1d': { label: '1 dia', days: 1 },
  '3d': { label: '3 dias', days: 3 },
  '7d': { label: '7 dias', days: 7 },
  '30d': { label: '1 mês', days: 30 },
  '90d': { label: '3 meses', days: 90 },
} as const

export function GraphicCard() {
  const [chartType, setChartType] = React.useState<ChartType>('productivity')
  const { userPlan } = useFilter()
  const [timeRange, setTimeRange] = React.useState('30d')

  const [dialogOpen, setDialogOpen] = React.useState(false)

  const dateRanges = React.useMemo(() => {
    const now = new Date()
    const startDate = new Date(now)
    startDate.setDate(
      now.getDate() -
        timeRangeOptions[timeRange as keyof typeof timeRangeOptions].days,
    )

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: now.toISOString().split('T')[0],
    }
  }, [timeRange])

  const configFetchGraphics = React.useMemo(
    () => ({
      params: {
        is_filter_hot: userPlan === 'Panzer Pro Hot' ? true : undefined,
        is_product_pro: userPlan === 'Panzer Pro' ? true : undefined,
        is_product_novice: userPlan === 'Panzer Novice' ? true : undefined,
        is_product_corner: userPlan === 'Panzer Corner' ? true : undefined,
        match_date_after: dateRanges.startDate,
        match_date_before: dateRanges.endDate,
      },
    }),
    [userPlan, dateRanges],
  )

  const { data: results, isLoading } = useQuery<Graphs>(
    ['getGraphs', configFetchGraphics],
    async () => {
      const response = await api.get('results/pred1x', configFetchGraphics)
      return response.data.graphs
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: false,
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      enabled: dialogOpen,
    },
  )

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger
        style={{
          backgroundImage: `url(${bgChart.src})`,
        }}
        className="w-[510px] mobile:w-[350px] mobile:rounded-lg h-[233px] relative"
      >
        <div className="flex flex-col items-start gap-4 max-w-[230px] p-8">
          <div className="bg-[#D2FD01] flex w-fit p-1 rounded-lg">
            <ChartNoAxesCombined size={32} className="text-black" />
          </div>
          <div className="text-3xl text-start">Gráficos</div>
          <div className="text-base text-[#D2FD01] underline">Explorar</div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[1200px] mobile:max-w-[350px]">
        <DialogTitle>Gráficos</DialogTitle>
        <div className="flex gap-4 mb-4">
          <Select
            value={chartType}
            onValueChange={(value: ChartType) => setChartType(value)}
          >
            <SelectTrigger className="w-[200px] mobile:w-[140px]">
              <SelectValue placeholder="Selecione o tipo de gráfico" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(chartTypeOptions).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px] mobile:w-[140px]">
              <SelectValue placeholder="Últimos 3 meses" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(timeRangeOptions).map(([value, { label }]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {chartType === 'productivity' ? (
          <ProdutivityGraphic isLoading={isLoading} results={results} />
        ) : chartType === 'matches' ? (
          <MatchesGraphic
            isLoading={isLoading}
            matches={results?.match_for_date}
          />
        ) : (
          <ProfitGraphic isLoading={isLoading} profit={results?.profit} />
        )}
      </DialogContent>
    </Dialog>
  )
}
