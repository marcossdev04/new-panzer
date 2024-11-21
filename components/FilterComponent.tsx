'use client'

import { SlidersHorizontal } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { MultiSelect, IOption } from './MultiSelect'
import { useFilters } from '@/Store/useFilters'

const countryOptions: IOption[] = [
  { label: 'Brasil', value: 'BR' },
  { label: 'Argentina', value: 'AR' },
  { label: 'Inglaterra', value: 'EN' },
]

const leagueOptions: IOption[] = [
  { label: 'Série A', value: 'serie-a' },
  { label: 'Premier League', value: 'premier-league' },
]

const betTypeOptions: IOption[] = [
  { label: 'Over', value: 'over' },
  { label: 'Under', value: 'under' },
  { label: 'All', value: 'All' },
]

const resultOptions: IOption[] = [
  { label: 'Green', value: 'green' },
  { label: 'Red', value: 'red' },
]

const homeTeamOptions: IOption[] = [
  { label: 'Flamengo', value: 'flamengo' },
  { label: 'Santos', value: 'santos' },
]

const awayTeamOptions: IOption[] = [
  { label: 'Corinthians', value: 'corinthians' },
  { label: 'São Paulo', value: 'sao-paulo' },
]

const golLineOptions: IOption[] = [
  { label: '0.5', value: '0.5' },
  { label: '1.5', value: '1.5' },
  { label: '2.5', value: '2.5' },
]

export function FilterComponent() {
  const { filters, updateFilter, clearFilters, getFilterParams } = useFilters()

  const handleDateChange = (type: 'startDate' | 'endDate', value: string) => {
    updateFilter(type, value)
  }

  const handleApplyFilters = () => {
    const params = getFilterParams()
    // Use params to fetch filtered data
    console.log(params)
  }

  return (
    <Dialog>
      <DialogTrigger className="border border-white px-3 py-1 rounded-md text-xl flex items-center gap-3">
        <div>Filtros</div>
        <div>
          <SlidersHorizontal size={20} />
        </div>
      </DialogTrigger>
      <DialogContent className="h-2/3">
        <DialogTitle>Filtros</DialogTitle>
        <div className="overflow-auto h-[100%]">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col w-full gap-1">
              <Label className="text-base">Data inicial</Label>
              <input
                type="date"
                className="px-5 py-2 rounded-lg"
                value={filters.startDate}
                onChange={(e) => handleDateChange('startDate', e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full gap-1">
              <Label className="text-base">Data final</Label>
              <input
                type="date"
                className="px-5 py-2 rounded-lg"
                value={filters.endDate}
                onChange={(e) => handleDateChange('endDate', e.target.value)}
              />
            </div>

            <div>
              <Label className="text-base">País</Label>
              <MultiSelect
                options={countryOptions}
                selected={filters.country}
                onChange={(value) => updateFilter('country', value)}
                placeholder="Pesquisar um país"
              />
            </div>

            <div>
              <Label className="text-base">Liga</Label>
              <MultiSelect
                options={leagueOptions}
                selected={filters.league}
                onChange={(value) => updateFilter('league', value)}
                placeholder="Pesquisar uma liga"
              />
            </div>

            <div>
              <Label className="text-base">Aposta</Label>
              <MultiSelect
                options={betTypeOptions}
                selected={filters.betType}
                onChange={(value) => updateFilter('betType', value)}
                placeholder="Pesquisar uma aposta"
              />
            </div>

            <div>
              <Label className="text-base">Resultado</Label>
              <MultiSelect
                options={resultOptions}
                selected={filters.result}
                onChange={(value) => updateFilter('result', value)}
                placeholder="Pesquisar um resultado"
              />
            </div>

            <div>
              <Label className="text-base">Time casa</Label>
              <MultiSelect
                options={homeTeamOptions}
                selected={filters.homeTeam}
                onChange={(value) => updateFilter('homeTeam', value)}
                placeholder="Pesquisar um time"
              />
            </div>

            <div>
              <Label className="text-base">Time Fora</Label>
              <MultiSelect
                options={awayTeamOptions}
                selected={filters.awayTeam}
                onChange={(value) => updateFilter('awayTeam', value)}
                placeholder="Pesquisar um time"
              />
            </div>

            <div>
              <Label className="text-base">Linha de gol</Label>
              <MultiSelect
                options={golLineOptions}
                selected={filters.golLine}
                onChange={(value) => updateFilter('golLine', value)}
                placeholder="Pesquisar uma linha"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 items-center">
          <Button
            variant="ghost"
            className="text-[#F94E63] underline"
            onClick={clearFilters}
          >
            Redefinir
          </Button>
          <Button
            variant="ghost"
            className="text-[#91CCF8] underline"
            onClick={handleApplyFilters}
          >
            Aplicar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
