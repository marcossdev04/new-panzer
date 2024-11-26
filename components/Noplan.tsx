import { ChevronRight } from 'lucide-react'
import { Header } from './Header'
import { Card, CardContent } from './ui/card'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

export function NoPlan() {
  return (
    <div className="max-w-[1200px] mobile:overflow-x-hidden mx-auto gap-10 flex flex-col">
      <div>
        <Header />
      </div>
      <div className="grid gap-3 grid-cols-4 mobile:grid-cols-1">
        <Card className="bg-[#25232B]">
          <CardContent className="flex flex-col justify-between h-[850px] mobile:h-full mobile:gap-2">
            <div>
              <div className="text-center text-3xl pt-5">Pazner Novice</div>
              <div className="text-[#D2FD01] text-4xl pt-3 text-center">
                R$39,45
              </div>
              <div className="text-center text-lg pt-2 text-[#D2FD01]">
                Tips em Gols
              </div>
              <div className="flex flex-col gap-5 pt-5">
                <div className="flex items-center gap-1 ">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Média 10 Tips/Dia</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>ODD mínima: 1.7</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Rankings Básicos</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Tips Pré Live</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Suporte 8 horas</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Novas atualizações</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Histórico 3 anos</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Melhorias na IA</div>
                </div>
              </div>
            </div>
            <div className="bg-[#D2FD01] hover:bg-opacity-80 transition-colors duration-300 text-center py-3 rounded-lg text-black">
              <div className="flex justify-center">
                <div>Quero este plano</div>
                <div>
                  <ChevronRight />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#25232B]">
          <CardContent className="flex flex-col justify-between h-[850px] mobile:h-full mobile:gap-2">
            <div>
              <div className="text-center text-3xl pt-5">Panzer Corner</div>
              <div className="text-[#D2FD01] text-4xl pt-3 text-center">
                R$143,58
              </div>
              <div className="text-center text-lg pt-2 text-[#D2FD01]">
                Tips em Escanteios
              </div>
              <div className="flex flex-col gap-5 pt-5">
                <div className="flex items-center gap-1 ">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Média 15 Tips/Dia</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Filtros e Gráficos PRO;</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>ODD mínima 1.9;</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Rankings PRO;</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Tips Pré Live;</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Suporte 12 horas;</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Histórico 1 ano;</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Tips Telegram + Email;</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Atualizações Gratuitas</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Todas as tips e escanteios</div>
                </div>
              </div>
            </div>
            <div className="bg-[#D2FD01] hover:bg-opacity-80 transition-colors duration-300 text-center py-3 rounded-lg text-black">
              <div className="flex justify-center">
                <div>Quero este plano</div>
                <div>
                  <ChevronRight />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#25232B]">
          <CardContent className="flex flex-col justify-between h-[850px] mobile:h-full mobile:gap-2">
            <div>
              <div className="text-center text-3xl pt-5">Panzer Pro</div>
              <div className="text-[#D2FD01] text-4xl pt-3 text-center">
                R$180,72
              </div>
              <div className="text-center text-lg pt-2 text-[#D2FD01]">
                Tips em Gols
              </div>
              <div className="flex flex-col gap-5 pt-5">
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Média 15 Tips/Dia</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Filtros e Gráficos PRO</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>ODD mínima 1.9</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Rankings PRO;</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Tips Pré Live</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Suporte 12 horas</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Histórico 3 anos</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Tips Telegram + Email</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>TAtualizações Gratuitas</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Todas as tips e gols</div>
                </div>
              </div>
            </div>
            <div className="bg-[#D2FD01] hover:bg-opacity-80 transition-colors duration-300 text-center py-3 rounded-lg text-black">
              <div className="flex justify-center">
                <div>Quero este plano</div>
                <div>
                  <ChevronRight />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#25232B]">
          <CardContent className="flex flex-col justify-between h-[850px] mobile:h-full mobile:gap-2">
            <div>
              <div className="text-center text-3xl pt-5">Panzer Black</div>
              <div className="text-[#D2FD01] text-4xl pt-3 text-center">
                R$270,08
              </div>
              <div className="text-center text-lg pt-2 text-[#D2FD01]">
                Tips em Gols e Escanteios
              </div>
              <div className="flex flex-col gap-4 pt-5">
                <div className="flex items-center gap-1 ">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Média 15 Tips/Dia</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Filtros e Gráficos PRO</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>ODD mínima 1.9</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Rankings PRO</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Tips Pré Live</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Suporte 12 horas</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Histórico 3 anos</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Tips Telegram + Email</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Atualizações Gratuitas</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Todas as tips e escanteios</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Todas as tips e gols</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Atendimento técnico individual</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>Consultoria de 60 minutos</div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <IoMdCheckmarkCircleOutline
                      size={25}
                      className="text-[#D2FD01]"
                    />
                  </div>
                  <div>[Bônus] Análise Avançada</div>
                </div>
              </div>
            </div>
            <div className="bg-[#D2FD01] hover:bg-opacity-80 transition-colors duration-300 text-center py-3 rounded-lg text-black">
              <div className="flex justify-center">
                <div>Quero este plano</div>
                <div>
                  <ChevronRight />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
