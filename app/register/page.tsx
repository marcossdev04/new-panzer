import backgroundImage from '@/assets/backgroundBg.png'
import { RegisterForm } from '@/components/RegisterForm'

export default function Register() {
  return (
    <div
            className="flex justify-center items-center mobile:overflow-hidden h-screen bg-cover relative desktop:bg-center laptop:bg-center tablet:bg-center  "
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
      }}
    >
      <RegisterForm />
    </div>
  )
}
