import { ChartBarIncreasing, ChartNoAxesCombined } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import bgChart from '@/assets/backgroundChart.png'
import bgStats from '@/assets/backgroundStatistics.png'

export function Cards() {
  return (
    <div className="flex justify-between">
      <Dialog>
        <DialogTrigger
          style={{
            backgroundImage: `url(${bgChart.src})`,
          }}
          className="w-[510px] h-[233px] relative"
        >
          <div className="flex flex-col items-start gap-4 max-w-[230px] p-8 ">
            <div className="bg-[#D2FD01] flex w-fit p-1 rounded-lg">
              <ChartNoAxesCombined size={32} className="text-black" />
            </div>
            <div className="text-3xl text-start">Gráficos</div>
            <div className="text-base text-[#D2FD01] underline">Explorar</div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[1600px]">
          <DialogTitle>Produtividade</DialogTitle>
          <div>teste</div>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger
          style={{
            backgroundImage: `url(${bgStats.src})`,
          }}
          className="w-[510px] h-[233px] relative"
        >
          <div className="flex flex-col items-start gap-4 max-w-[230px] p-8 ">
            <div className="bg-[#D2FD01] flex w-fit p-1 rounded-lg">
              <ChartBarIncreasing size={32} className="text-black" />
            </div>
            <div className="text-3xl text-start">Estatísticas</div>
            <div className="text-base text-[#D2FD01] underline">Explorar</div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[1600px]">
          <DialogTitle>Liga</DialogTitle>
          <div>
            <div className="bg-gradient-to-r text-black from-[#D2FF00] py-3 to-[#58d764] w-full grid grid-cols-12">
              <div className="col-span-4 flex justify-center">Liga</div>
              <div className="col-span-2 flex justify-center">Tips</div>
              <div className="col-span-2 flex justify-center">Green</div>
              <div className="col-span-2 flex justify-center">%</div>
              <div className="col-span-2 flex justify-center">Lucro</div>
            </div>
            <div className="flex flex-col mt-1 gap-2">
              <div className="bg-[#3B3A40] py-2 w-full grid grid-cols-12">
                <div className="col-span-4 flex justify-center">
                  Europe Friendlies
                </div>
                <div className="col-span-2 flex justify-center">204</div>
                <div className="col-span-2 flex justify-center">112</div>
                <div className="col-span-2 flex justify-center">64.74</div>
                <div className="col-span-2 flex justify-center">39.80</div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
