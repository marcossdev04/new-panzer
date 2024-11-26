/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flame, SmilePlus } from 'lucide-react'
import { PiSoccerBallFill } from 'react-icons/pi'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import { api } from '@/api/api'
import { Bets } from '@/types/Bets'
import { useQuery } from 'react-query'
import { useFilter } from '@/Store/useFilter'
import Link from 'next/link'
import moment from 'moment'

export function Highlights() {
  const { getFilterParams } = useFilter()
  const params = {
    ...getFilterParams(),
  }
  const { data } = useQuery<{ results: Bets[]; count: number }>(
    ['getBets', params],
    async () => {
      const response = await api.get('results/pred1x', { params })
      return {
        results: response.data.results,
        count: response.data.count_results,
      }
    },
  )
  const [apii, setApi] = useState<any>()

  useEffect(() => {
    if (!apii) {
      return
    }

    // Configura o carousel para mover um item completo
    apii.scrollTo = (index: number) => {
      apii.scrollTo(index * apii.scrollSnapSize)
    }
  }, [apii])
  console.log(data?.results)
  const hasHighLigth = data?.results
    .filter((filter) => {
      return filter.valid_3
    })
    .filter((filter) => {
      const today = moment()
      return moment(filter.match_date).utc().local().isSame(today, 'day')
    })

  return (
    <div>
      <div className="flex justify-between">
        <div className="border-l-4 pl-2 border-[#D2FD01] text-2xl">
          Destaques
        </div>
      </div>
      <div>
        {hasHighLigth?.length !== undefined ? (
          hasHighLigth.length > 0 ? (
            <Carousel
              opts={{
                align: 'start',
                loop: true,
                skipSnaps: false,
                dragFree: false,
              }}
              className="w-full"
              setApi={setApi}
            >
              <CarouselContent className="-ml-1">
                {hasHighLigth?.map((highligth, index) => {
                  return (
                    <CarouselItem
                      key={index}
                      className="pl-1 md:basis-1/2 lg:basis-1/4"
                    >
                      <div className="p-1">
                        <Card className="mt-6 bg-[#25232B]">
                          <CardContent className="flex flex-col gap-6">
                            <div className="flex justify-between border-b border-[#3F3E4A] py-6">
                              <div className="flex gap-1">
                                <div>
                                  <Flame className="text-[#D2FD01]" size={25} />
                                </div>
                                <div>Liga Quente</div>
                              </div>
                              <div className="flex gap-1">
                                <div>
                                  <PiSoccerBallFill
                                    className="text-[#D2FD01]"
                                    size={25}
                                  />
                                </div>
                                <div>Linha Boa</div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex flex-col w-[65%] gap-1 text-lg">
                                <div className="truncate">
                                  {highligth.home_name}
                                </div>
                                <div className="truncate">
                                  {highligth.away_name}
                                </div>
                              </div>
                              <div className="text-3xl w-[30%] text-[#D2FD01]">
                                {new Date(highligth.match_date)
                                  .toLocaleDateString('pt-BR')
                                  .slice(0, 5)}
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <div>
                                <div className="text-[#717171]">Mercado</div>
                                <div>
                                  {highligth.odd_market === 'Gols o/u'
                                    ? 'Gols'
                                    : 'Escanteios'}
                                </div>
                              </div>
                              <div>
                                <div className="text-[#717171]">Aposta</div>
                                <div>
                                  {highligth.odd_bet === 'Under'
                                    ? 'Menos'
                                    : 'Mais'}{' '}
                                  de {highligth.odd_line} gols
                                </div>
                              </div>
                            </div>
                            <Link
                              href={`${highligth.bookmaker_link}/li`}
                              className="hover:bg-opacity-90 cursor-pointer transition-all w-full bg-[#D2FD01] text-black text-center py-4 rounded-lg"
                            >
                              APOSTAR
                            </Link>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          ) : (
            <Card className="mt-6">
              <CardContent className="flex hover:bg-opacity-80 transition-colors duration-300 h-[150px] p-0 bg-[#25232B] gap-3 justify-center items-center">
                <div className="mobile:text-center">
                  Sem destaques para hoje ainda, Estamos encontrando a melhor
                  aposta para você!
                </div>
                <div>
                  <SmilePlus className="mobile:hidden text-[#D2FD01]" />
                </div>
              </CardContent>
            </Card>
          )
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
