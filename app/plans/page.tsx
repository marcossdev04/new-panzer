import { Header } from '@/components/Header'
import { MyPlansComponent } from '@/components/MyPlansComponent'

export default function MyPlans() {
  return (
    <div className=" max-w-[1100px] mx-auto gap-10 flex flex-col">
      <Header />
      <MyPlansComponent />
    </div>
  )
}
