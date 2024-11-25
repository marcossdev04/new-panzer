import { Flame } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { PiSoccerBallFill } from 'react-icons/pi'

export function Highlights() {
  return (
    <div>
      <div className="flex justify-between">
        <div className="border-l-4 pl-2 border-[#D2FD01] text-2xl">
          Destaques
        </div>
      </div>
      <div>
        <Card className="max-w-[300px] mt-6 bg-[#25232B]">
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
                  <PiSoccerBallFill className="text-[#D2FD01]" size={25} />
                </div>
                <div>Linha Boa</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1 text-lg">
                <div>Real Madrid</div>
                <div>Man City</div>
              </div>
              <div className="text-3xl text-[#D2FD01]">12/04</div>
            </div>
            <div className="flex justify-between">
              <div>
                <div className="text-[#717171]">Mercado</div>
                <div>Gols +/-</div>
              </div>
              <div>
                <div className="text-[#717171]">Aposta</div>
                <div>Mais de 2 gols</div>
              </div>
            </div>
            <div className="w-full bg-[#D2FD01] text-black text-center py-4 rounded-lg">
              APOSTAR
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
