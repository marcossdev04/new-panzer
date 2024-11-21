'use client'

import * as React from 'react'
import { Label, Pie, PieChart } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

interface Props {
  hitHate: number | undefined
}

export function Assertiveness({ hitHate }: Props) {
  // Garante um valor válido para hitHate, mesmo se undefined
  const hitRate = hitHate ?? 0
  const complement = 100 - hitRate

  // Atualiza os dados dinamicamente
  const chartData = [
    { browser: 'chrome', AS: hitRate, fill: 'url(#gradientFill)' }, // Gradiente para Chrome
    { browser: 'complement', AS: complement, fill: 'rgba(0, 0, 0, 0.5)' }, // Preto com opacidade 50%
  ]

  return (
    <Card className="flex flex-col bg-transparent border-none">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{
            AS: {
              label: 'AS',
            },
            chrome: {
              label: 'Chrome',
              color: 'hsl(var(--chart-1))',
            },
          }}
          className="mx-auto aspect-square max-h-[400px]" // Aumenta o contêiner
        >
          <PieChart width={350} height={350}>
            {/* Definição de gradiente */}
            <defs>
              <linearGradient
                id="gradientFill"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#D2FF00" />
                <stop offset="100%" stopColor="#58D764" />
              </linearGradient>
            </defs>
            {/* Tooltip */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* Gráfico */}
            <Pie
              data={chartData}
              dataKey="AS"
              nameKey="browser"
              innerRadius={70} // Define o raio interno para balancear espessura
              outerRadius={100} // Controla o tamanho do gráfico
              strokeWidth={3} // Barra de progresso mais fina
              startAngle={90}
              endAngle={-270}
            >
              {/* Label personalizada */}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-[#d2ff00] text-4xl font-bold"
                        >
                          {hitRate}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-white text-base"
                        >
                          Assertividade
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
