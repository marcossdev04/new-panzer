import { api } from '@/api/api'
import { useFilter } from '@/Store/useFilter'
import { Bets } from '@/types/Bets'
import Link from 'next/link'
import { useState } from 'react'
import { useQuery } from 'react-query'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from './ui/pagination'
import { FilterComponent } from './FilterComponent'

export function Games() {
  const [page, setPage] = useState(1)
  const { getFilterParams } = useFilter()
  const params = {
    ...getFilterParams(),
    page,
  }

  const { data, isLoading } = useQuery<{ results: Bets[]; count: number }>(
    ['getBets', params],
    async () => {
      const response = await api.get('results/pred1x', { params })
      return {
        results: response.data.results,
        count: response.data.count_results,
      }
    },
  )

  const totalPages = Math.ceil((data?.count || 0) / 50)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  function GamesSkeleton() {
    return (
      <div className="flex flex-col gap-3 col-span-12">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className="w-full col-span-12 grid grid-cols-12 py-4 px-8 shadow-lg rounded-xl bg-[#24232b] animate-pulse"
          >
            {/* Time/Date */}
            <div className="flex flex-col mobile:py-2 gap-1 mobile:col-span-12">
              <div className="h-8 w-16 mobile:w-full bg-gray-600 rounded" />
              <div className="h-4 w-16 mobile:hidden bg-gray-600 rounded mt-1" />
            </div>

            {/* Team Names */}
            <div className="flex flex-col col-span-3 mobile:pb-2 mobile:col-span-12">
              <div className="h-6 w-48 mobile:w-full bg-gray-600 rounded" />
              <div className="h-6 w-48 mobile:hidden  bg-gray-600 rounded mt-2" />
            </div>

            {/* League */}
            <div className="flex flex-col col-span-2 gap-2 mobile:hidden">
              <div className="h-4 w-16 bg-gray-600 rounded" />
              <div className="h-5 w-32 bg-gray-600 rounded" />
            </div>

            {/* Bet Type */}
            <div className="flex flex-col gap-2 mobile:col-span-3 mobile:pb-2">
              <div className="h-4 w-16 mobile:w-full bg-gray-600 rounded" />
              <div className="h-5 w-20 mobile:w-full bg-gray-600 rounded" />
            </div>

            {/* Goals */}
            <div className="flex flex-col gap-2 mobile:col-span-2">
              <div className="h-4 w-12 mobile:w-full bg-gray-600 rounded" />
              <div className="h-5 w-12 mobile:w-full bg-gray-600 rounded" />
            </div>

            {/* Odds */}
            <div className="flex flex-col gap-2 mobile:col-span-3">
              <div className="h-4 w-16 mobile:w-full bg-gray-600 rounded" />
              <div className="h-5 w-16 mobile:w-full bg-gray-600 rounded" />
            </div>

            {/* Result */}
            <div className="flex flex-col col-span-1 gap-2 mobile:col-span-2">
              <div className="h-4 w-24 bg-gray-600 rounded" />
              <div className="h-5 w-24 bg-gray-600 rounded" />
            </div>

            {/* Precision */}
            <div className="flex flex-col gap-2 items-end mobile:col-span-2">
              <div className="h-4 w-16 mobile:w-full bg-gray-600 rounded" />
              <div className="h-5 w-20 mobile:w-full bg-gray-600 rounded" />
            </div>

            {/* Button */}
            <div className="flex flex-col my-auto items-end justify-center mobile:col-span-12">
              <div className="h-8 w-20 bg-gray-600 rounded mobile:w-full" />
            </div>
          </div>
        ))}
        <div className="col-span-12 mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(page - 1)}
                  className={
                    page === 1
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>

              {/* Primeira página */}
              {page > 2 && (
                <PaginationItem>
                  <PaginationLink onClick={() => handlePageChange(1)}>
                    1
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Ellipsis se necessário */}
              {page > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Página anterior se não for primeira página */}
              {page > 1 && (
                <PaginationItem>
                  <PaginationLink onClick={() => handlePageChange(page - 1)}>
                    {page - 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Página atual */}
              <PaginationItem>
                <PaginationLink isActive>{page}</PaginationLink>
              </PaginationItem>

              {/* Próxima página se não for última */}
              {page < totalPages && (
                <PaginationItem>
                  <PaginationLink onClick={() => handlePageChange(page + 1)}>
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Ellipsis se necessário */}
              {page < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Última página */}
              {page < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(page + 1)}
                  className={
                    page === totalPages
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col">
      <div className="flex justify-between ">
        <div className="border-l-4 pl-2 mobile:text-lg border-[#D2FD01] text-2xl">
          Lista de jogos
        </div>
        <div>
          <FilterComponent />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-10 items-start ">
        {isLoading ? (
          <GamesSkeleton />
        ) : (
          <>
            {data?.results?.map((bet, index) => {
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
                  className="w-full col-span-12 grid grid-cols-12 py-4 px-8 mobile:px-4 shadow-lg rounded-xl bg-[#24232b]"
                >
                  <div className="flex desktop:flex-col laptop:flex-col mobile:bg-[#35363E] tablet:flex-col mobile:items-center mobile:flex-row-reverse mobile:justify-center  gap-1 mobile:col-span-12 ">
                    <div className="text-2xl mobile:text-base  text-[#d2ff00]">
                      {time}{' '}
                    </div>
                    <div className="text-sm">
                      {date}{' '}
                      <span className="desktop:hidden laptop:hidden tablet:hidden">
                        -
                      </span>
                    </div>
                  </div>
                  <div className="flex mobile:items-center flex-col mobile:flex-row mobile:col-span-12 mobile:justify-center col-span-3 ">
                    <div className="text-lg mobile:text-sm text-ellipsis truncate pr-4 mobile:pr-0">
                      {bet.home_name}
                    </div>
                    <div className="desktop:hidden laptop:hidden tablet:hidden text-sm px-3">
                      X
                    </div>
                    <div className="text-lg mt-0.5 mobile:text-sm truncate pr-4 mobile:pr-0">
                      {''}
                      {bet.away_name}
                    </div>
                  </div>
                  <div className="flex flex-col col-span-2 gap-2 mobile:col-span-12  mobile:justify-center mobile:flex-row mobile:items-center ">
                    <div className="text-[#a6acbe] mt-1 mobile:hidden">
                      Liga
                    </div>
                    <div className="text-sm truncate pr-4">
                      {bet.league_name}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mobile:col-span-2 ">
                    <div className="text-[#a6acbe] mobile:text-xs mt-1">
                      Aposta
                    </div>
                    <div className="text-sm mobile:text-[11px]">
                      {bet.odd_bet === 'Over' ? 'Mais de' : 'Menos de'}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mobile:col-span-2 mobile:text-center">
                    <div className="text-[#a6acbe] mobile:text-xs mt-1">
                      Gols
                    </div>
                    <div className="text-sm mobile:text-xs">
                      +{parseFloat(bet.odd_line).toFixed(1)}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2  mobile:col-span-1 mobile:items-center">
                    <div className="text-[#a6acbe] mobile:text-xs mt-1">
                      Odd
                    </div>
                    <div className="text-sm mobile:text-xs">
                      {parseFloat(bet.odd_value).toFixed(2)}
                    </div>
                  </div>
                  <div className="flex flex-col col-span-1 gap-2 mobile:col-span-4 mobile:text-end">
                    <div className="text-[#a6acbe] mobile:text-xs mt-1">
                      Resultado
                    </div>
                    <div
                      className={`text-sm mobile:text-xs ${bet.stats_score === '' ? 'text-zinc-300' : ''}`}
                    >
                      {bet.stats_score === ''
                        ? 'Não definido'
                        : bet.stats_score}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end mobile:col-span-3">
                    <div className="text-[#a6acbe] mt-1 mobile:text-xs">
                      Precisão
                    </div>
                    <div
                      className={`text-sm mobile:text-xs ${bet.result === 'Black' ? 'text-[#FAFAFA]' : bet.result === 'Green' ? 'text-[#24ff6f]' : bet.result === 'Orange' ? 'text-[#91cdf8]' : 'text-[#ff4e63]'}`}
                    >
                      {resultsByColor[bet.result].name}
                    </div>
                  </div>
                  <div className="flex flex-col mobile:col-span-12 my-auto items-end justify-center">
                    <Link
                      href={bet.bookmaker_link}
                      target="_blank"
                      className="bg-[#d2ff00] mobile:w-full mobile:text-center text-sm p-2 rounded-md hover:bg-opacity-80 transition-colors duration-300 text-black"
                    >
                      APOSTAR
                    </Link>
                  </div>
                </div>
              )
            })}
            <div className="col-span-12 mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(page - 1)}
                      className={
                        page === 1
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>

                  {/* Primeira página */}
                  {page > 2 && (
                    <PaginationItem>
                      <PaginationLink onClick={() => handlePageChange(1)}>
                        1
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Ellipsis se necessário */}
                  {page > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {/* Página anterior se não for primeira página */}
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => handlePageChange(page - 1)}
                      >
                        {page - 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Página atual */}
                  <PaginationItem>
                    <PaginationLink isActive>{page}</PaginationLink>
                  </PaginationItem>

                  {/* Próxima página se não for última */}
                  {page < totalPages && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => handlePageChange(page + 1)}
                      >
                        {page + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Ellipsis se necessário */}
                  {page < totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {/* Última página */}
                  {page < totalPages - 1 && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => handlePageChange(totalPages)}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(page + 1)}
                      className={
                        page === totalPages
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
