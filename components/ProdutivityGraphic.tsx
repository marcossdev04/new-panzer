import { CartesianGrid, XAxis, Area, AreaChart } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart'
import React from 'react'
import { Graphs } from './GraphicCard'
import { useFilter } from '@/Store/useFilter'
import { LockKeyholeIcon, UnlockKeyholeIcon } from 'lucide-react'

interface Props {
  results: Graphs | undefined
  isLoading: boolean | undefined
}
export function ProdutivityGraphic({ results, isLoading }: Props) {
  const { userPlan } = useFilter()
  const chartConfig = {
    visitors: {
      label: 'Visitors',
    },
    quantityGreen: {
      label: 'Green',
      color: '#64DA5C',
    },
    quantityRed: {
      label: 'Red',
      color: '#FF0000',
    },
  } satisfies ChartConfig

  const filteredData = React.useMemo(() => {
    if (!results?.productivity) return []

    return results.productivity.map((item) => ({
      date: new Date(item.date).toISOString().split('T')[0],
      quantityGreen: item.quantityGreen,
      quantityRed: item.quantityRed,
    }))
  }, [results?.productivity])

  const dateFormatter = React.useCallback((value: string) => {
    return new Date(value).toLocaleDateString('pt-BR', {
      month: 'short',
      day: 'numeric',
    })
  }, [])
  return (
    <Card className="mobile:max-w-[300px]">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Produtividade - Interativo</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {userPlan === 'Panzer Novice' ? (
          <div className="h-[250px] flex gap-3 justify-center items-center">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
              <div className="mobile:text-xs text-center">
                  Funcionalidade desbloqueada apenas para planos Corner e Pro
                </div>
                <div>
                  <LockKeyholeIcon className='mobile:hidden' size={25} />
                </div>
              </div>
              <div className="w-2/3 mx-auto mobile:w-full bg-[#D2FD01] hover:bg-opacity-80 transition-colors duration-300 py-3 flex gap-2 justify-center rounded-lg text-black">
                <div>Desbloquear funcionalidade</div>
                <div>
                  <UnlockKeyholeIcon />
                </div>
              </div>
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center h-[250px]">
            Carregando...
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64DA5C" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#64DA5C" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF0000" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF0000" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={dateFormatter}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={dateFormatter}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="quantityRed"
                type="natural"
                fill="url(#fillRed)"
                stroke="#FF0000"
                stackId="a"
              />
              <Area
                dataKey="quantityGreen"
                type="natural"
                fill="url(#fillGreen)"
                stroke="#64DA5C"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
