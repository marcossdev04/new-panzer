import { SlidersHorizontal } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export function FilterComponent() {
  return (
    <Dialog>
      <DialogTrigger className=" border border-white px-3 py-1 rounded-md text-xl flex items-center gap-3">
        <div>Filtros</div>
        <div>
          <SlidersHorizontal size={20} />
        </div>
      </DialogTrigger>
      <DialogContent className="h-2/3 ">
        <DialogTitle>Filtros</DialogTitle>
        <div className="overflow-auto h-[100%]">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col w-full gap-1">
              <Label className="text-base">Data inicial</Label>
              <input type="date" className="px-5 py-2 rounded-lg" />
            </div>
            <div className="flex flex-col w-full gap-1">
              <Label className="text-base">Data final</Label>
              <input type="date" className="px-5 py-2 rounded-lg" />
            </div>
            <div>
              <Label className="text-base">País</Label>
              <Select>
                <SelectTrigger className="w-full py-5">
                  <SelectValue placeholder="Pesquisar um país" />
                </SelectTrigger>
                <SelectContent>
                  <input
                    placeholder="pesquisar"
                    className=" w-full py-1 px-3 mb-1"
                  />
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-base">Liga</Label>
              <Select>
                <SelectTrigger className="w-full py-5">
                  <SelectValue placeholder="pesquisar uma liga" />
                </SelectTrigger>
                <SelectContent>
                  <input
                    placeholder="pesquisar"
                    className=" w-full py-1 px-3 mb-1"
                  />
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-base">Aposta</Label>
              <Select>
                <SelectTrigger className="w-full py-5">
                  <SelectValue placeholder="Pesquisar uma apoosta" />
                </SelectTrigger>
                <SelectContent>
                  <input
                    placeholder="pesquisar"
                    className=" w-full py-1 px-3 mb-1"
                  />
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-base">Resultado</Label>
              <Select>
                <SelectTrigger className="w-full py-5">
                  <SelectValue placeholder="Pesquisar um resultado" />
                </SelectTrigger>
                <SelectContent>
                  <input
                    placeholder="pesquisar"
                    className=" w-full py-1 px-3 mb-1"
                  />
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-base">Time casa</Label>
              <Select>
                <SelectTrigger className="w-full py-5">
                  <SelectValue placeholder="Pesquisar um time" />
                </SelectTrigger>
                <SelectContent>
                  <input
                    placeholder="pesquisar"
                    className=" w-full py-1 px-3 mb-1"
                  />
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-base">Time Fora</Label>
              <Select>
                <SelectTrigger className="w-full py-5">
                  <SelectValue placeholder="Pesquisar um time" />
                </SelectTrigger>
                <SelectContent>
                  <input
                    placeholder="pesquisar"
                    className=" w-full py-1 px-3 mb-1"
                  />
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-base">Linha de gol</Label>
              <Select>
                <SelectTrigger className="w-full py-5">
                  <SelectValue placeholder="Pesquisar uma linha" />
                </SelectTrigger>
                <SelectContent>
                  <input
                    placeholder="pesquisar"
                    className=" w-full py-1 px-3 mb-1"
                  />
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 items-center">
          <div className="text-[#F94E63] underline">Redefinir</div>
          <div className="text-[#91CCF8] underline">Aplicar</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
