import { FaqComponent } from './FaqComponent'

export function SupportComponent() {
  return (
    <div className="mt-10">
      <div className="border-l-4 pl-2 border-[#D2FD01] text-2xl">Suporte</div>
      <div className="mt-5">
        <FaqComponent />
      </div>
      <div className="flex flex-col mt-10 gap-4  justify-center items-center">
        <div>Ainda com dúvidas? Entre em contato com nosso suporte</div>
        <div className="bg-[#D2FD01] hover:bg-opacity-80 transition-colors duration-300 px-20 text-black text-lg py-3">
          SUPORTE
        </div>
      </div>
    </div>
  )
}
