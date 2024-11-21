import { UpdateUser } from './UpdateUser'

export function ProfileComponent() {
  return (
    <div className="mt-10">
      <div className="border-l-4 pl-2 border-[#D2FD01] text-2xl">
        Meu Perfil
      </div>
      <UpdateUser />
    </div>
  )
}
