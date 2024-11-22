'use client'
import { api } from '@/api/api'
import { Cards } from '@/components/Cards'
import { Games } from '@/components/Games'
import { Header } from '@/components/Header'
import { Highlights } from '@/components/HighLights'
import { Recomendations } from '@/components/Recomendations'
import { useFilter } from '@/Store/useFilter'
import { User } from '@/types/User'
import { useQuery } from 'react-query'

export default function Home() {
  const { getFilterParams } = useFilter()
  const paramss = getFilterParams()

  const params = { params: paramss }
  async function fetchUserData() {
    const response = await api.get('/users/me', params)
    return response.data
  }
  const { data: user } = useQuery<User>(['getUser'], fetchUserData)
  console.log(user)
  return (
    <div className="max-w-[1100px] mx-auto gap-10 flex flex-col">
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
