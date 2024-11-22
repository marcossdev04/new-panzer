import { LoginForm } from '@/components/LoginForm'
import backgroundImage from '@/assets/backgroundBg.png'

export default function Home() {
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover relative bg-center "
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
      }}
    >
      <LoginForm />
    </div>
  )
}
