import { SlidersHorizontal, ChevronsUpDown } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { useFilter, FILTER_OPTIONS } from '@/Store/useFilter'
import { useState } from 'react'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '@/lib/utils'
import { ScrollArea } from './ui/scroll-area'
import { Checkbox } from './ui/checkbox'
import { Slider } from './ui/slider'
import moment from 'moment'

interface FilterOption {
  label: string
  value: string
  options: Array<{ label: string; value: string }>
  placeholder: string
}

export function FilterComponent() {
  const {
    tempFilters,
    updateTempFilter,
    clearTempFilters,
    applyFilters,
    filterOptions,
  } = useFilter()

  const [open, setOpen] = useState(false)
  const [openSelect, setOpenSelect] = useState<string | null>(null)

  const commonFilters: FilterOption[] = [
    {
      label: 'País',
      value: 'country',
      options: filterOptions?.country || [],
      placeholder: 'Pesquisar um país',
    },
    {
      label: 'Liga',
      value: 'league',
      options: filterOptions?.league || [],
      placeholder: 'Pesquisar uma liga',
    },
    {
      label: 'Aposta',
      value: 'bet',
      options: FILTER_OPTIONS.bet,
      placeholder: 'Pesquisar uma aposta',
    },
    {
      label: 'Resultado',
      value: 'result',
      options: FILTER_OPTIONS.result,
      placeholder: 'Pesquisar um resultado',
    },
    {
      label: 'Time casa',
      value: 'homeTeam',
      options: filterOptions?.homeTeam || [],
      placeholder: 'Pesquisar um time',
    },
    {
      label: 'Time fora',
      value: 'awayTeam',
      options: filterOptions?.awayTeam || [],
      placeholder: 'Pesquisar um time',
    },
    {
      label: 'Linha de gol',
      value: 'goalLine',
      options: filterOptions?.gols || [],
      placeholder: 'Pesquisar uma linha',
    },
  ]

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    const formattedDate = value ? moment(value).format('DD/MM/YY') : ''
    updateTempFilter(field, formattedDate)
  }

  const handleMultiSelect = (field: string, value: string) => {
    const currentValues = tempFilters[
      field as keyof typeof tempFilters
    ] as string[]
    if (!Array.isArray(currentValues)) return

    const isSelected = currentValues.includes(value)

    if (isSelected) {
      updateTempFilter(
        field as keyof typeof tempFilters,
        currentValues.filter((item) => item !== value),
      )
    } else {
      updateTempFilter(field as keyof typeof tempFilters, [
        ...currentValues,
        value,
      ])
    }
  }
  console.log(commonFilters)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="border border-white px-3 py-1 rounded-md text-xl flex items-center gap-3">
        <div>Filtros</div>
        <div>
          <SlidersHorizontal size={20} />
        </div>
      </DialogTrigger>
      <DialogContent className="h-2/3 px-5">
        <DialogTitle>Filtros</DialogTitle>
        <div className="overflow-auto h-[100%] px-2">
          <div className="flex flex-col gap-6 w-full">
            {/* Data Controls */}
            <div className="flex flex-col w-full gap-1">
              <Label className="text-base">Data inicial</Label>
              <input
                type="date"
                className="px-5 py-2 rounded-lg"
                onChange={(e) => handleDateChange('startDate', e.target.value)}
                value={moment(tempFilters.startDate, 'DD/MM/YY').format(
                  'YYYY-MM-DD',
                )}
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <Label className="text-base">Data final</Label>
              <input
                type="date"
                className="px-5 py-2 rounded-lg"
                onChange={(e) => handleDateChange('endDate', e.target.value)}
                value={moment(tempFilters.endDate, 'DD/MM/YY').format(
                  'YYYY-MM-DD',
                )}
              />
            </div>

            {/* Probability Green Range */}
            <div className="space-y-4">
              <Label>Probabilidade Green (Min-Max)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[tempFilters.probGreenMin, tempFilters.probGreenMax]}
                  onValueChange={([min, max]) => {
                    updateTempFilter('probGreenMin', min)
                    updateTempFilter('probGreenMax', max)
                  }}
                  className="relative flex items-center select-none touch-none w-full transition-colors"
                  thumbClassName="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  rangeClassName="absolute h-2 rounded-full bg-primary"
                />
                <div className="min-w-[90px] text-sm">
                  {tempFilters.probGreenMin}% - {tempFilters.probGreenMax}%
                </div>
              </div>
            </div>

            {/* Probability Green Dev Range */}
            <div className="space-y-4">
              <Label>Probabilidade Green Dev (Min-Max)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[
                    tempFilters.probGreenDevMin,
                    tempFilters.probGreenDevMax,
                  ]}
                  onValueChange={([min, max]) => {
                    updateTempFilter('probGreenDevMin', min)
                    updateTempFilter('probGreenDevMax', max)
                  }}
                  className="relative flex items-center select-none touch-none w-full transition-colors"
                  thumbClassName="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  rangeClassName="absolute h-2 rounded-full bg-primary"
                />
                <div className="min-w-[90px] text-sm">
                  {tempFilters.probGreenDevMin}% - {tempFilters.probGreenDevMax}
                  %
                </div>
              </div>
            </div>

            {/* Odd Range */}
            <div className="space-y-4">
              <Label>Odd (Min-Max)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  min={1}
                  max={5}
                  step={0.01}
                  value={[tempFilters.oddMin, tempFilters.oddMax]}
                  onValueChange={([min, max]) => {
                    updateTempFilter('oddMin', min)
                    updateTempFilter('oddMax', max)
                  }}
                  className="relative flex items-center select-none touch-none w-full transition-colors"
                  thumbClassName="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  rangeClassName="absolute h-2 rounded-full bg-primary"
                />
                <div className="min-w-[90px] text-sm">
                  {tempFilters.oddMin.toFixed(2)} -{' '}
                  {tempFilters.oddMax.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Multi-select filters */}
            {commonFilters.map((filter) => (
              <div key={filter.value} className="flex flex-col gap-2">
                <Label>{filter.label}</Label>
                <Popover
                  open={openSelect === filter.value}
                  onOpenChange={(isOpen) =>
                    setOpenSelect(isOpen ? filter.value : null)
                  }
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-full justify-between',
                        'px-3 py-2 h-auto',
                      )}
                    >
                      <div className="flex flex-wrap gap-1">
                        {(
                          tempFilters[
                            filter.value as keyof typeof tempFilters
                          ] as string[]
                        )?.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {(
                              tempFilters[
                                filter.value as keyof typeof tempFilters
                              ] as string[]
                            ).map((item) => (
                              <span
                                key={item}
                                className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                              >
                                {filter.options.find(
                                  (option) => option.value === item,
                                )?.label || item}
                              </span>
                            ))}
                          </div>
                        ) : (
                          filter.placeholder
                        )}
                      </div>
                      <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <ScrollArea className="h-80 p-4">
                      <div className="space-y-4">
                        {filter.options.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`${filter.value}-${option.value}`}
                              checked={(
                                tempFilters[
                                  filter.value as keyof typeof tempFilters
                                ] as string[]
                              )?.includes(option.value)}
                              onCheckedChange={() =>
                                handleMultiSelect(filter.value, option.value)
                              }
                            />
                            <label
                              htmlFor={`${filter.value}-${option.value}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-4 items-center">
          <button
            onClick={clearTempFilters}
            className="text-[#F94E63] underline"
          >
            Redefinir
          </button>
          <button
            onClick={() => {
              applyFilters()
              setOpen(false)
            }}
            className="text-[#91CCF8] underline"
          >
            Aplicar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
