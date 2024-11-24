import { api } from '@/api/api'
import { useFilter } from '@/Store/useFilter'
import { Bets } from '@/types/Bets'
import Link from 'next/link'
import { useQuery } from 'react-query'

function GamesSkeleton() {
  return (
    <div className="flex flex-col gap-3 col-span-12">
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className="w-full col-span-12 grid grid-cols-12 py-4 px-8 shadow-lg rounded-xl bg-[#24232b] animate-pulse"
        >
          {/* Time/Date */}
          <div className="flex flex-col gap-1">
            <div className="h-8 w-16 bg-gray-600 rounded" />
            <div className="h-4 w-16 bg-gray-600 rounded mt-1" />
          </div>

          {/* Team Names */}
          <div className="flex flex-col col-span-3">
            <div className="h-6 w-48 bg-gray-600 rounded" />
            <div className="h-6 w-48 bg-gray-600 rounded mt-2" />
          </div>

          {/* League */}
          <div className="flex flex-col col-span-2 gap-2">
            <div className="h-4 w-16 bg-gray-600 rounded" />
            <div className="h-5 w-32 bg-gray-600 rounded" />
          </div>

          {/* Bet Type */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-16 bg-gray-600 rounded" />
            <div className="h-5 w-20 bg-gray-600 rounded" />
          </div>

          {/* Goals */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-12 bg-gray-600 rounded" />
            <div className="h-5 w-12 bg-gray-600 rounded" />
          </div>

          {/* Odds */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-16 bg-gray-600 rounded" />
            <div className="h-5 w-16 bg-gray-600 rounded" />
          </div>

          {/* Result */}
          <div className="flex flex-col col-span-1 gap-2">
            <div className="h-4 w-24 bg-gray-600 rounded" />
            <div className="h-5 w-24 bg-gray-600 rounded" />
          </div>

          {/* Precision */}
          <div className="flex flex-col gap-2 items-end">
            <div className="h-4 w-16 bg-gray-600 rounded" />
            <div className="h-5 w-20 bg-gray-600 rounded" />
          </div>

          {/* Button */}
          <div className="flex flex-col my-auto items-end justify-center">
            <div className="h-8 w-20 bg-gray-600 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function Games() {
  const { getFilterParams } = useFilter()
  const params = getFilterParams()
  const { data: results, isLoading } = useQuery<Bets[]>(
    ['getBets', params],
    async () => {
      const response = await api.get('results/pred1x', { params })
      return response.data.results
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    },
  )
  return (
    <div className="flex flex-col">
      <div className="flex ">
        <div className="border-l-4 pl-2 border-[#D2FD01] text-2xl">
          Lista de jogos
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-10 items-start ">
        {isLoading ? (
          <GamesSkeleton />
        ) : (
          results?.map((bet, index) => {
            function formatDateTime(dateString: string) {
              const date = new Date(dateString)

              const time = date.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })

              const fullDate = date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })

              return {
                time,
                date: fullDate,
              }
            }

            const resultsByColor = {
              Black: {
                name: 'Em curso',
                color: '#FAFAFA',
              },
              Green: {
                name: 'Ganho',
                color: '#24ff6f',
              },
              Orange: {
                name: 'Devolvido',
                color: '#91cdf8',
              },
              Red: { name: 'Perdido', color: '#ff4e63' },
            }
            const { time, date } = formatDateTime(bet.match_date)
            return (
              <div
                key={index}
                className="w-full col-span-12 grid grid-cols-12 py-4 px-8 shadow-lg rounded-xl bg-[#24232b]"
              >
                <div className="flex flex-col gap-1">
                  <div className="text-2xl text-[#d2ff00]">{time}</div>
                  <div className="text-sm">{date}</div>
                </div>
                <div className="flex flex-col col-span-3 ">
                  <div className="text-lg text-ellipsis truncate pr-4">
                    {bet.home_name}
                  </div>
                  <div className="text-lg mt-0.5 truncate pr-4">
                    {bet.away_name}
                  </div>
                </div>
                <div className="flex flex-col col-span-2 gap-2 ">
                  <div className="text-[#a6acbe] mt-1">Liga</div>
                  <div className="text-sm truncate pr-4">{bet.league_name}</div>
                </div>
                <div className="flex flex-col gap-2 ">
                  <div className="text-[#a6acbe] mt-1">Aposta</div>
                  <div className="text-sm">
                    {bet.odd_bet === 'Over' ? 'Mais de' : 'Menos de'}
                  </div>
                </div>
                <div className="flex flex-col gap-2 ">
                  <div className="text-[#a6acbe] mt-1">Gols</div>
                  <div className="text-sm">
                    +{parseFloat(bet.odd_line).toFixed(1)}
                  </div>
                </div>
                <div className="flex flex-col gap-2 ">
                  <div className="text-[#a6acbe] mt-1">Odd</div>
                  <div className="text-sm">
                    {parseFloat(bet.odd_value).toFixed(2)}
                  </div>
                </div>
                <div className="flex flex-col col-span-1 gap-2 ">
                  <div className="text-[#a6acbe] mt-1">Resultado</div>
                  <div
                    className={`text-sm ${bet.stats_score === '' ? 'text-zinc-300' : ''}`}
                  >
                    {bet.stats_score === '' ? 'Não definido' : bet.stats_score}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end ">
                  <div className="text-[#a6acbe] mt-1">Precisão</div>
                  <div
                    className={`text-sm ${bet.result === 'Black' ? 'text-[#FAFAFA]' : bet.result === 'Green' ? 'text-[#24ff6f]' : bet.result === 'Orange' ? 'text-[#91cdf8]' : 'text-[#ff4e63]'}`}
                  >
                    {resultsByColor[bet.result].name}
                  </div>
                </div>
                <div className="flex flex-col my-auto items-end justify-center">
                  <Link
                    href={bet.bookmaker_link}
                    target="_blank"
                    className="bg-[#d2ff00] text-sm p-2 rounded-md hover:bg-opacity-80 transition-colors duration-300 text-black"
                  >
                    APOSTAR
                  </Link>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
