import Image from 'next/image'
import logo from '@/assets/logotipo.svg'

export function Header() {
  return (
    <div className="flex items-center w-full justify-between rounded-b-[32px] border-t-0 border h-[86px] px-8 border-[#D2FD01]">
      <div>
        <Image src={logo} alt="logo" />
      </div>
      <div className="flex gap-10">
        <div>Panzer Pro Hot</div>
        <div>Meu Plano</div>
        <div>Suporte</div>
        <div>Turoriais</div>
      </div>
      <div>Bem vindo, Marcos</div>
    </div>
  )
}
