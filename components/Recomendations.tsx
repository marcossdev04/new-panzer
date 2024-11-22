import { api } from '@/api/api'
import { useQuery } from 'react-query'
import { Assertiveness } from './Acertivity'
import recomendationsImage from '@/assets/recomendacoes-jogador.png'
import { ChangeEvent, useState } from 'react'
import { Input } from './ui/input'
import { FilterComponent } from './FilterComponent'
import { useFilter } from '@/Store/useFilter'
import { Skeleton } from './ui/skeleton'

interface IStats {
  returns: number
  hit_rate: number
  bets_count: number
  bets_wins: number
  bets_canceled: number
  bets_returned: number
  bets_losts: number
}

export function Recomendations() {
  const { getFilterParams } = useFilter()
  const params = getFilterParams()
  const [value, setValue] = useState(100)

  const formatCurrency = (amount: number): string => {
    return `R$ ${amount.toFixed(2).replace('.', ',')}`
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value.replace(/\D/g, '')
    const numericValue = parseFloat(inputValue) / 100
    setValue(numericValue || 0)
  }

  const { data: results, isLoading } = useQuery<IStats>(
    ['getStats', params],
    async () => {
      const response = await api.get('results/pred1x', { params })
      return response.data.stats
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    },
  )
  console.log(params)

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="border-l-4 pl-2 border-[#D2FD01] text-2xl">
            Recomendações
          </div>
          <div className="flex gap-2 items-center">
            <Input
              onChange={handleChange}
              value={formatCurrency(value)}
              className="w-[140px] text-xl"
            />
            <FilterComponent />
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${recomendationsImage.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
          className="flex mt-8 justify-around h-[400px] p-3"
        >
          <div className="flex items-end justify-around w-[800px] relative">
            <div className="flex gap-3 items-center">
              <Skeleton className="h-[50px] w-[120px]" />
              <div className="w-[60%] text-sm max-w-[110px]">
                Tips encontradas
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <Skeleton className="h-[50px] w-[200px]" />
              <div className="w-[60%] text-sm max-w-[220px]">
                Em ganhos baseados em apostas de R$ {value} (1 unidade)
              </div>
            </div>
          </div>
          <div className="w-[300px] my-auto">
            <Skeleton className="h-[300px] w-[300px] rounded-full" />
          </div>
        </div>
        <div className="bg-[#25232B] py-4 mt-5 px-11 flex justify-around rounded-lg shadow-lg">
          <div className="flex w-[200px] items-center px-5 gap-3 py-3">
            <Skeleton className="h-[50px] w-[100px]" />
            <div className="text-sm">apostas ganhas</div>
          </div>
          <div className="flex w-[200px] items-center px-5 gap-3 py-3">
            <Skeleton className="h-[50px] w-[100px]" />
            <div className="text-sm">apostas perdidas</div>
          </div>
          <div className="flex w-[200px] items-center px-5 gap-3 py-3">
            <Skeleton className="h-[50px] w-[100px]" />
            <div className="text-sm">apostas devolvidas</div>
          </div>
          <div className="flex w-[210px] items-center px-5 gap-3 py-3">
            <Skeleton className="h-[50px] w-[100px]" />
            <div className="text-sm">apostas em curso</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="border-l-4 pl-2 border-[#D2FD01] text-2xl">
          Recomendações
        </div>
        <div className="flex gap-2 items-center">
          <Input
            onChange={handleChange}
            value={formatCurrency(value)}
            className="w-[140px] text-xl"
          />
          <FilterComponent />
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${recomendationsImage.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        className="flex mt-8 justify-around h-[400px] p-3"
      >
        <div className="flex items-end justify-around w-[800px] relative">
          <div className="flex gap-3 items-center">
            <div className="text-[41px] text-[#D2FD01]">
              {results?.bets_count}
            </div>
            <div className="w-[60%] text-sm max-w-[110px]">
              Tips encontradas
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="text-[41px] text-[#D2FD01]">
              {results?.returns
                ? new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                  }).format(results.returns * value)
                : ''}
            </div>
            <div className="w-[60%] text-sm max-w-[220px]">
              Em ganhos baseados em apostas de R$ {value} (1 unidade)
            </div>
          </div>
        </div>
        <div className="w-[300px] my-auto">
          <Assertiveness hitHate={results?.hit_rate} />
        </div>
      </div>
      <div className="bg-[#25232B] py-4 mt-5 px-11 flex justify-around rounded-lg shadow-lg">
        <div className="flex w-[200px] items-center px-5 gap-3 py-3">
          <div className="text-[41px] text-[#76FBB3]">{results?.bets_wins}</div>
          <div className="text-sm">apostas ganhas</div>
        </div>
        <div className="flex w-[200px] items-center px-5 gap-3 py-3">
          <div className="text-[41px] text-[#F94E63]">
            {results?.bets_losts}
          </div>
          <div className="text-sm">apostas perdidas</div>
        </div>
        <div className="flex w-[200px] items-center px-5 gap-3 py-3">
          <div className="text-[41px] text-[#91CCF8]">
            {results?.bets_returned}
          </div>
          <div className="text-sm">apostas devolvidas</div>
        </div>
        <div className="flex w-[210px] items-center px-5 gap-3 py-3">
          <div className="text-[41px]">{results?.bets_canceled}</div>
          <div className="text-sm">apostas em curso</div>
        </div>
      </div>
    </div>
  )
}
