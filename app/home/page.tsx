'use client'
import { Cards } from '@/components/Cards'
import { Footer } from '@/components/Footer'
import { Games } from '@/components/Games'
import { Header } from '@/components/Header'
import { Highlights } from '@/components/HighLights'
import { NoPlan } from '@/components/Noplan'
import { Recomendations } from '@/components/Recomendations'
import { useFilter } from '@/Store/useFilter'
import {} from 'lucide-react'
import { PiSoccerBall } from 'react-icons/pi'

export default function Home() {
  const { userPlan } = useFilter()

  return userPlan === undefined ? (
    <div className="flex justify-center h-[100vh] items-center">
      <PiSoccerBall size={150} className="text-[#D2FD01] animate-spin" />
    </div>
  ) : userPlan === 'Sem plano' ? (
    <NoPlan />
  ) : (
    <div className="max-w-[1200px] mobile:overflow-x-hidden mx-auto gap-10 flex flex-col">
      <div>
        <Header />
      </div>
      {userPlan === 'Panzer Pro Hot' ? (
        <div>
          <Highlights />
        </div>
      ) : (
        ''
      )}
      <div>
        <Recomendations />
      </div>
      <div>
        <Cards />
      </div>
      <div>
        <Games />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}
