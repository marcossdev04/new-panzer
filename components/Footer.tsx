import logotipo from '@/assets/logotipo.svg'
import { ArrowBigRightDashIcon } from 'lucide-react'
import Image from 'next/image'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { BsTwitterX } from 'react-icons/bs'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Isso fará a rolagem ser suave
    })
  }

  return (
    <div className="flex mobile:grid mobile:grid-cols-12 items-center w-full justify-between mobile:h-[400px] rounded-t-[32px] border-b-0 border h-[250px] px-4 sm:px-8 border-[#D2FD01]">
      <div className="mobile:col-span-12 mobile:items-center">
        <Image
          className="mobile:flex mobile:justify-center mobile:mx-auto"
          src={logotipo}
          alt="logo"
        />
        <div className="flex justify-evenly">
          <div>
            <FaFacebook className="text-[#D2FD01]" />
          </div>
          <div>
            <FaInstagram className="text-[#D2FD01]" />
          </div>
          <div>
            <BsTwitterX className="text-[#D2FD01]" />
          </div>
        </div>
      </div>
      <div className="flex mobile:w-full mobile:text-center mobile:mt-2 mobile:grid mobile:grid-cols-12 mobile:col-span-12 justify-between w-1/2">
        <div className="flex flex-col gap-5 mobile:col-span-4">
          <div className="text-[#D2FD01] text-lg">Empresa</div>
          <div className="mobile:text-sm">Sobre a panzer</div>
          <div className="mobile:text-sm">Trabalhe conosco</div>
        </div>
        <div className="flex flex-col gap-5 mobile:col-span-4">
          <div className="text-[#D2FD01] text-lg">Produtos</div>
          <div className="mobile:text-sm">Panzer Pro</div>
          <div className="mobile:text-sm">Panzer Corner</div>
          <div className="mobile:text-sm">Panzer Novice</div>
        </div>
        <div className="flex flex-col gap-5 mobile:col-span-4">
          <div className="text-[#D2FD01] text-lg">Contato</div>
          <div className="mobile:text-sm">Fale com a gente no Whatsapp</div>
          <div className="mobile:text-sm">+55 (98) 98920-2782</div>
        </div>
      </div>
      <div
        onClick={scrollToTop}
        className="-rotate-90 mobile:rotate-0 mobile:col-span-12 mobile:justify-center border flex items-center gap-2 border-white p-2 rounded-lg cursor-pointer hover:bg-[#D2FD01] hover:text-black transition-colors"
      >
        <div>Voltar ao topo</div>
        <div className="mobile:-rotate-90">
          <ArrowBigRightDashIcon />
        </div>
      </div>
    </div>
  )
}
