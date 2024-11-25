import { Header } from '@/components/Header'
import { ProfileComponent } from '@/components/ProfileComponent'

export default function Profile() {
  return (
    <div className="w-[1100px] mobile:w-[350px] mx-auto">
      <Header />
      <ProfileComponent />
    </div>
  )
}
