export function Games() {
  return (
    <div className="flex flex-col">
      <div className="flex ">
        <div className="border-l-4 pl-2 border-[#D2FD01] text-2xl">
          Lista de jogos
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-10 items-start py-6 px-8 shadow-lg rounded-xl bg-[#24232b]">
        <div className="flex flex-col gap-1">
          <div className="text-2xl text-[#d2ff00]">14:00</div>
          <div className="text-xs">15/11/2024</div>
        </div>
        <div className="flex flex-col col-span-2 ">
          <div className="text-lg text-ellipsis">FCM Traiskirchen</div>
          <div className="text-lg">FK Austria Vienna</div>
        </div>
        <div className="flex flex-col col-span-2 gap-2 ">
          <div className="text-[#a6acbe] mt-1">Liga</div>
          <div className="text-sm">Europe Friendlies</div>
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="text-[#a6acbe] mt-1">Aposta</div>
          <div className="text-sm">Menos de</div>
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="text-[#a6acbe] mt-1">Gols</div>
          <div className="text-sm">4.0</div>
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="text-[#a6acbe] mt-1">Odd</div>
          <div className="text-sm">1.80</div>
        </div>
        <div className="flex flex-col col-span-2 gap-2 ">
          <div className="text-[#a6acbe] mt-1">Resultado</div>
          <div></div>
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="text-[#a6acbe] mt-1">Precisão</div>
          <div className="text-sm">Em curso</div>
        </div>
        <div className="flex flex-col my-auto items-center  justify-center">
          <div className="bg-[#d2ff00] text-sm p-2 rounded-md hover:bg-opacity-80 transition-colors duration-300 text-black">
            APOSTAR
          </div>
        </div>
      </div>
    </div>
  )
}
