import { api } from '@/api/api'
import { useQuery } from 'react-query'
import { Assertiveness } from './Acertivity'
import recomendationsImage from '@/assets/recomendacoes-jogador.png'
import { ChangeEvent, useState } from 'react'
import { Input } from './ui/input'
import { FilterComponent } from './FilterComponent'
import { useFilter } from '@/Store/useFilter'
import { Skeleton } from './ui/skeleton'
import { Card } from './ui/card'

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

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="border-l-4 pl-2 border-[#D2FD01] text-2xl mobile:text-lg">
            Recomendações
          </div>
          <div className="flex gap-2 items-center">
            <Input
              onChange={handleChange}
              value={formatCurrency(value)}
              className="w-[140px] mobile:w-[85px] mobile:h-[34px] mobile:text-xs text-xl"
            />
            <FilterComponent />
          </div>
        </div>

        {/* Desktop Skeleton */}
        <div
          style={{
            backgroundImage: `url(${recomendationsImage.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
          className="flex mt-8 mobile:hidden justify-around h-[400px] p-3"
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

        {/* Mobile Skeleton */}
        <Card className="laptop:hidden bg-[#25232B] p-3 mt-2 desktop:hidden tablet:hidden">
          <div>
            <Skeleton className="h-[300px] w-[300px] mx-auto rounded-full" />
          </div>
          <div className="flex justify-between gap-5">
            <div className="flex flex-col justify-center items-center">
              <Skeleton className="h-[30px] w-[100px] mb-2" />
              <div className="text-xs text-center">Apostas encontradas</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Skeleton className="h-[30px] w-[120px] mb-2" />
              <div className="text-xs text-center">
                Em ganhos baseados em apostas de R$ {value} (1 unidade)
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid Skeleton */}
        <div className="bg-[#25232B] py-4 mt-5 px-11 mobile:px-2 flex mobile:grid mobile:grid-cols-2 justify-around rounded-lg shadow-lg">
          <div className="flex w-[200px] items-center px-5 mobile:px-1 gap-3 py-3">
            <Skeleton className="h-[50px] w-[100px] mobile:h-[30px] mobile:w-[70px]" />
            <div className="text-sm mobile:w-[70px]">apostas ganhas</div>
          </div>
          <div className="flex w-[200px] items-center px-5 mobile:px-1 gap-3 py-3">
            <Skeleton className="h-[50px] w-[100px] mobile:h-[30px] mobile:w-[70px]" />
            <div className="text-sm mobile:w-[70px]">apostas perdidas</div>
          </div>
          <div className="flex w-[200px] items-center px-5 mobile:px-1 gap-3 py-3">
            <Skeleton className="h-[50px] w-[100px] mobile:h-[30px] mobile:w-[70px]" />
            <div className="text-sm mobile:w-[70px]">apostas devolvidas</div>
          </div>
          <div className="flex w-[210px] items-center px-5 mobile:px-1 gap-3 py-3">
            <Skeleton className="h-[50px] w-[100px] mobile:h-[30px] mobile:w-[70px]" />
            <div className="text-sm mobile:w-[70px]">apostas em curso</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="border-l-4 pl-2 border-[#D2FD01] text-2xl mobile:text-lg">
          Recomendações
        </div>
        <div className="flex gap-2 items-center">
          <Input
            onChange={handleChange}
            value={formatCurrency(value)}
            className="w-[140px] mobile:w-[85px] mobile:h-[34px] mobile:text-xs text-xl"
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
        className="flex mt-8 mobile:hidden justify-around mobile:bg-center h-[400px] p-3"
      >
        <div className="flex items-end mobile:grid mobile:grid-cols-1 justify-around w-[800px] mobile:w-[350px] relative">
          <div className="flex mobile:flex-col gap-3 items-center">
            <div className="text-[41px] mobile:text-2xl text-[#D2FD01]">
              {results?.bets_count}
            </div>
            <div className="w-[60%] mobile:w-full mobile:max-w-full text-sm max-w-[110px]">
              Tips encontradas
            </div>
          </div>
          <div className="flex mobile:flex-col gap-3 items-center">
            <div className="text-[41px] mobile:text-xl text-[#D2FD01]">
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
      <Card
        style={{
          backgroundImage: `url(${recomendationsImage.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        className="laptop:hidden bg-[#25232B] bg-center p-3 mt-2 desktop:hidden tablet:hidden"
      >
        <div>
          <Assertiveness hitHate={results?.hit_rate} />
        </div>
        <div className="flex justify-between gap-5">
          <div className="flex flex-col justify-center items-center">
            <div className="text-[#D2FD01] text-3xl">{results?.bets_count}</div>
            <div className="text-xs text-center">Apostas encontradas</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="text-3xl text-[#D3FD01]">
              {results?.returns
                ? new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                  }).format(results.returns * value)
                : ''}
            </div>
            <div className="text-xs text-center">
              Em ganhos baseados em apostas de R$ {value} (1 unidade)
            </div>
          </div>
        </div>
      </Card>
      <div className="bg-[#25232B] py-4 mt-5 px-11 mobile:px-2 flex mobile:grid mobile:grid-cols-2 justify-around rounded-lg shadow-lg">
        <div className="flex w-[200px] mobile:text-center mobile:w-full mobile:flex-col items-center px-5 mobile:px-1 mobile:gap-1 gap-3 py-3">
          <div className="text-[41px] mobile:text-2xl mobile:w-[70px] text-[#76FBB3]">
            {results?.bets_wins}
          </div>
          <div className="text-sm">Ganhas</div>
        </div>
        <div className="flex w-[200px] mobile:text-center mobile:w-full mobile:flex-col items-center px-5 mobile:px-1 mobile:gap-1 gap-3 py-3">
          <div className="text-[41px] mobile:text-2xl mobile:w-[70px] text-[#F94E63]">
            {results?.bets_losts}
          </div>
          <div className="text-sm ">Perdidas</div>
        </div>
        <div className="flex w-[200px] mobile:text-center mobile:w-full mobile:flex-col items-center px-5 mobile:px-1 mobile:gap-1 gap-3 py-3">
          <div className="text-[41px] mobile:text-2xl mobile:w-[70px] text-[#91CCF8]">
            {results?.bets_returned}
          </div>
          <div className="text-sm">Devolvidas</div>
        </div>
        <div className="flex w-[210px] mobile:text-center mobile:w-full mobile:flex-col  items-center px-5 mobile:px-1 gap-3 mobile:gap-1 py-3">
          <div className="text-[41px]  mobile:text-2xl">
            {results?.bets_canceled}
          </div>
          <div className="text-sm ">Aguardando</div>
        </div>
      </div>
    </div>
  )
}
