import { LoginForm } from '@/components/LoginForm'
import backgroundImage from '@/assets/backgroundBg.png'

export default function Home() {
  return (
    <div
      className="flex justify-center items-center mobile:overflow-hidden h-screen bg-cover relative desktop:bg-center laptop:bg-center tablet:bg-center  "
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
      }}
    >
      <LoginForm />
    </div>
  )
}
