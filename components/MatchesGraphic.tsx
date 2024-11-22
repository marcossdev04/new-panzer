import { MatchForDate } from '@/types/MatchForDate'
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

interface MatchesGraphicProps {
  isLoading: boolean
  matches?: MatchForDate[]
}

export function MatchesGraphic({ isLoading, matches }: MatchesGraphicProps) {
  const chartConfig = {
    matches: {
      label: 'Partidas',
      color: '#D2FD01',
    },
  } satisfies ChartConfig

  const chartData = React.useMemo(
    () =>
      matches?.map((item) => ({
        date: new Date(item.date).toISOString().split('T')[0],
        matches: item.count,
      })) ?? [],
    [matches],
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
          <CardTitle>Quantidade de partidas</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillMatches" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D2FD01" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#D2FD01" stopOpacity={0.1} />
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
              dataKey="matches"
              type="natural"
              fill="url(#fillMatches)"
              stroke="#D2FD01"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}