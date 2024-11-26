import React from 'react'
import { CartesianGrid, XAxis, Area, AreaChart } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from './ui/chart'
import { Profit } from '@/types/Profit'
import { useFilter } from '@/Store/useFilter'
import { LockKeyholeIcon, UnlockKeyholeIcon } from 'lucide-react'

interface ProfitGraphicProps {
  isLoading: boolean
  profit?: Profit[]
}

export function ProfitGraphic({ isLoading, profit }: ProfitGraphicProps) {
  const { userPlan } = useFilter()
  const chartConfig = {
    profit: {
      label: 'Lucro',
      color: '#D2FD01',
    },
  } satisfies ChartConfig

  const chartData = React.useMemo(
    () =>
      profit?.map((item) => ({
        date: new Date(item.date).toISOString().split('T')[0],
        profit: item.profit,
      })) ?? [],
    [profit],
  )

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[250px]">
        Carregando...
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Lucro</CardTitle>
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
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#91CCF8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#91CCF8" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  return new Date(value).toLocaleDateString('pt-BR', {
                    month: 'short',
                    day: 'numeric',
                  })
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString('pt-BR', {
                        month: 'short',
                        day: 'numeric',
                      })
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="profit"
                type="natural"
                fill="url(#fillProfit)"
                stroke="#91CCF8"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
