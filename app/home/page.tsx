'use client'
import { Cards } from '@/components/Cards'
import { Games } from '@/components/Games'
import { Header } from '@/components/Header'
import { Highlights } from '@/components/HighLights'
import { Recomendations } from '@/components/Recomendations'
export default function Home() {
  return (
    <div className="max-w-[1200px] mobile:overflow-x-hidden mx-auto gap-10 flex flex-col">
      <div>
        <Header />
      </div>
      <div>
        <Highlights />
      </div>
      <div>
        <Recomendations />
      </div>
      <div>
        <Cards />
      </div>
      <div>
        <Games />
      </div>
    </div>
  )
}
