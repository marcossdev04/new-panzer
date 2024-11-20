import backgroundImage from '@/assets/backgroundBg.png'
import { RegisterForm } from '@/components/RegisterForm'

export default function Register() {
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover relative bg-center "
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
      }}
    >
      <RegisterForm />
    </div>
  )
}
