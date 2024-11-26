import { SlidersHorizontal } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { useFilter, FILTER_OPTIONS } from '@/Store/useFilter'
import React, { useMemo, useState, useEffect } from 'react'
import { Checkbox } from './ui/checkbox'
import moment from 'moment'
import { Input } from './ui/input'
import { Slider } from './ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useVirtualizer } from '@tanstack/react-virtual'
import { addDays, addMonths } from 'date-fns'

interface FilterOption {
  label: string
  value: string
  options: Array<{ label: string; value: string }>
  placeholder: string
  placehoder2: string
}

const dateRangeOptions = [
  { value: '1d', label: '1 dia' },
  { value: '3d', label: '3 dias' },
  { value: '7d', label: '7 dias' },
  { value: '1m', label: '1 mês' },
  { value: '3m', label: '3 meses' },
] as const

export function FilterComponent() {
  const {
    tempFilters,
    updateTempFilter,
    clearTempFilters,
    applyFilters,
    filterOptions,
    userPlan,
  } = useFilter()

  const [open, setOpen] = useState(false)
  const [openSelect, setOpenSelect] = useState<string | null>(null)
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({})
  const [selectedRange, setSelectedRange] = useState<string>('')

  const commonFilters: FilterOption[] = [
    {
      label: 'País',
      value: 'country',
      options: filterOptions?.country || [],
      placeholder: 'Pesquisar um país',
      placehoder2: 'Disponível no plano Corner e Pro',
    },
    {
      label: 'Liga',
      value: 'league',
      options: filterOptions?.league || [],
      placeholder: 'Pesquisar uma liga',
      placehoder2: 'Disponível no plano Corner e Pro',
    },
    {
      label: 'Aposta',
      value: 'bet',
      options: FILTER_OPTIONS.bet,
      placeholder: 'Pesquisar uma aposta',
      placehoder2: 'Disponível no plano Corner e Pro',
    },
    {
      label: 'Resultado',
      value: 'result',
      options: FILTER_OPTIONS.result,
      placeholder: 'Pesquisar um resultado',
      placehoder2: 'Disponível no plano Corner e Pro',
    },
    {
      label: 'Time casa',
      value: 'homeTeam',
      options: filterOptions?.homeTeam || [],
      placeholder: 'Pesquisar um time',
      placehoder2: 'Disponível no plano Corner e Pro',
    },
    {
      label: 'Time fora',
      value: 'awayTeam',
      options: filterOptions?.awayTeam || [],
      placeholder: 'Pesquisar um time',
      placehoder2: 'Disponível no plano Corner e Pro',
    },
    {
      label: 'Linha de gol',
      value: 'goalLine',
      options: filterOptions?.gols || [],
      placeholder: 'Pesquisar uma linha',
      placehoder2: 'Disponível no plano Corner e Pro',
    },
  ]

  const handleDateRangeChange = (value: string) => {
    const endDate = new Date()
    let startDate: Date

    switch (value) {
      case '1d':
        startDate = addDays(endDate, -1)
        break
      case '3d':
        startDate = addDays(endDate, -3)
        break
      case '7d':
        startDate = addDays(endDate, -7)
        break
      case '1m':
        startDate = addMonths(endDate, -1)
        break
      case '3m':
        startDate = addMonths(endDate, -3)
        break
      default:
        return
    }

    setSelectedRange(value)
    updateTempFilter('startDate', moment(startDate).format('DD/MM/YY'))
    updateTempFilter('endDate', moment(endDate).format('DD/MM/YY'))
  }

  useEffect(() => {
    const start = moment(tempFilters.startDate, 'DD/MM/YY')
    const end = moment(tempFilters.endDate, 'DD/MM/YY')
    const diffDays = end.diff(start, 'days')

    if (diffDays === 1) setSelectedRange('1d')
    else if (diffDays === 3) setSelectedRange('3d')
    else if (diffDays === 7) setSelectedRange('7d')
    else if (diffDays === 30) setSelectedRange('1m')
    else if (diffDays === 90) setSelectedRange('3m')
    else setSelectedRange('')
  }, [tempFilters.startDate, tempFilters.endDate])

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
    updateTempFilter(
      field as keyof typeof tempFilters,
      isSelected
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value],
    )
  }

  const handleSearch = (field: string, searchTerm: string) => {
    setSearchTerms((prev) => ({
      ...prev,
      [field]: searchTerm.toLowerCase(),
    }))
  }

  const getFilteredOptions = (filter: FilterOption) => {
    const searchTerm = searchTerms[filter.value] || ''
    return filter.options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm),
    )
  }
  const VirtualizedOptions = ({ filter }: { filter: FilterOption }) => {
    const filteredOptions = useMemo(
      () => getFilteredOptions(filter),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [filter, searchTerms[filter.value]],
    )

    const parentRef = React.useRef<HTMLDivElement>(null)

    const rowVirtualizer = useVirtualizer({
      count: filteredOptions.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 35,
      overscan: 5,
    })

    return (
      <div ref={parentRef} className="h-72 overflow-auto">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const option = filteredOptions[virtualItem.index]
            return (
              <div
                key={virtualItem.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <div className="flex items-center space-x-2 p-4">
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
                    className="text-sm font-medium leading-none"
                  >
                    {option.label}
                  </label>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="border border-white mobile:text-xs px-3 py-1 mobile:py-2 rounded-md text-xl flex items-center gap-3">
        <div>Filtros</div>
        <div>
          <SlidersHorizontal className="mobile:hidden" size={20} />
          <SlidersHorizontal
            className="desktop:hidden laptop:hidden tablet:hidden"
            size={16}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="h-2/3 mobile:max-w-[350px] px-5">
        <DialogTitle>Filtros</DialogTitle>
        <div className="overflow-auto h-[100%] px-2">
          <div className="flex flex-col gap-6 w-full">
            {/* Date Range Select */}
            <div className="flex flex-col w-full gap-1">
              <Label className="text-base">Período</Label>
              <Select
                value={selectedRange}
                onValueChange={handleDateRangeChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um período" />
                </SelectTrigger>
                <SelectContent>
                  {dateRangeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Controls */}
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

            {/* Probability Ranges */}
            <div className="space-y-4">
              <Label>Probabilidade Green (Min-Max)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  disabled={userPlan === 'Panzer Novice'}
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

            {/* Other filters */}
            {commonFilters.map((filter) => (
              <div key={filter.value} className="flex flex-col gap-2">
                <Label>{filter.label}</Label>
                <Select
                  disabled={userPlan === 'Panzer Novice'}
                  open={openSelect === filter.value}
                  onOpenChange={(isOpen) =>
                    setOpenSelect(isOpen ? filter.value : null)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        userPlan === 'Panzer Novice'
                          ? filter.placehoder2
                          : filter.placeholder
                      }
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
                                className="bg-secondary text-secondary-foreground px-2 py-0 rounded-md text-sm"
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
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent align="start">
                    <div className="p-4 border-b">
                      <Input
                        placeholder={filter.placeholder}
                        value={searchTerms[filter.value] || ''}
                        onChange={(e) =>
                          handleSearch(filter.value, e.target.value)
                        }
                        className="h-8"
                      />
                    </div>
                    <VirtualizedOptions filter={filter} />
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-4 items-center">
          <button
            onClick={() => {
              clearTempFilters()
              setSelectedRange('')
            }}
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
