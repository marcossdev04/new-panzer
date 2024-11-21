import { Assertiveness } from './Acertivity'
import recomendationsImage from '@/assets/recomendacoes-jogador.png'

export function Recomendations() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="border-l-4 pl-2 border-[#D2FD01] text-2xl">
          Recomendações
        </div>
        <div></div>
      </div>
      <div
        style={{
          backgroundImage: `url(${recomendationsImage.src})`,
          backgroundRepeat: 'no-repeat',
        }}
        className="flex mt-8 justify-around h-[400px] p-3"
      >
        <div className="flex items-end justify-around w-[800px] relative">
          <div className="flex gap-3 items-center">
            <div className="text-[41px] text-[#D2FD01]">2878</div>
            <div className="w-[60%] text-sm max-w-[110px]">
              Tips encontradas
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="text-[41px] text-[#D2FD01]">R$ 27.970,00</div>
            <div className="w-[60%] text-sm max-w-[220px]">
              Em ganhos baseados em apostas de R$ 100 (1 unidade)
            </div>
          </div>
        </div>
        <div className="w-[300px] my-auto ">
          <Assertiveness />
        </div>
      </div>
      <div></div>
      <div className="bg-[#25232B] py-4 mt-5 px-11 flex justify-around rounded-lg shadow-lg">
        <div className="flex w-[200px] items-center px-5 gap-3 py-3">
          <div className="text-[41px] text-[#76FBB3]">1436</div>
          <div className="text-sm">apostas ganhas</div>
        </div>
        <div className="flex w-[200px] items-center px-5 gap-3 py-3">
          <div className="text-[41px] text-[#F94E63]">1436</div>
          <div className="text-sm">apostas ganhas</div>
        </div>
        <div className="flex w-[200px] items-center px-5 gap-3 py-3">
          <div className="text-[41px] text-[#91CCF8]">1436</div>
          <div className="text-sm">apostas ganhas</div>
        </div>
        <div className="flex w-[200px] items-center px-5 gap-3 py-3">
          <div className="text-[41px]">1436</div>
          <div className="text-sm">apostas ganhas</div>
        </div>
      </div>
    </div>
  )
}
