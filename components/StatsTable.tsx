import {
  ChartBarIncreasing,
  ChevronDown,
  ChevronUp,
  LockKeyholeIcon,
  UnlockKeyholeIcon,
} from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import bgStats from '@/assets/backgroundStatistics.png'
import { useQuery } from 'react-query'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { api } from '@/api/api'
import { useFilter } from '@/Store/useFilter'
import { FilterComponent } from './FilterComponent'

interface ITableLeague {
  league_name: string
  profit: number
  quantityBlack: number
  quantityGreen: number
  quantityOrange: number
  quantityRed: number
  recommend: number
  assertiveness: number
}

interface ITableProbability {
  assertivity: number
  probability: number
  profit: number
  recommendations: number
}

interface ITableLineStats {
  assertivity: number
  line: number
  profit: number
  recommendations: number
}

interface ITableHomeTeam {
  assertivity: number
  home_name: string
  profit: number
  recommendations: number
}

interface ITableAwayTeam {
  assertivity: number
  away_name: string
  profit: number
  recommendations: number
}

type SortDirection = 'asc' | 'desc'

interface SortState {
  column: string
  direction: SortDirection
}

interface PaginationState {
  totalPages: number
  actualPage: number
}
interface ITables {
  table_leagues: ITableLeague[]
  table_probabilities: ITableProbability[]
  table_line_stats: ITableLineStats[]
  table_away_team: ITableAwayTeam[]
  table_home_team: ITableHomeTeam[]
}
type TableType = keyof ITables

const tableOptions = {
  table_leagues: {
    label: 'Ligas',
    headers: [
      { label: 'Liga', key: 'league_name', cols: 5, sortable: true },
      { label: 'Tips', key: 'recommend', cols: 2, sortable: true },
      { label: 'Green', key: 'quantityGreen', cols: 1, sortable: true },
      { label: 'Red', key: 'quantityRed', cols: 1, sortable: true },
      { label: '%', key: 'assertiveness', cols: 2, sortable: true },
      { label: 'Lucro', key: 'profit', cols: 1, sortable: true },
    ],
  },
  table_probabilities: {
    label: 'Probabilidades',
    headers: [
      { label: 'Probabilidade', key: 'probability', cols: 3, sortable: true },
      {
        label: 'Recomendações',
        key: 'recommendations',
        cols: 3,
        sortable: true,
      },
      { label: 'Assertividade', key: 'assertivity', cols: 3, sortable: true },
      { label: 'Lucro', key: 'profit', cols: 3, sortable: true },
    ],
  },
  table_line_stats: {
    label: 'Linhas',
    headers: [
      {
        label: 'Recomendações',
        key: 'recommendations',
        cols: 3,
        sortable: true,
      },
      {
        label: 'Gols',
        key: 'gols',
        cols: 3,
        sortable: true,
      },
      { label: 'Assertividade', key: 'assertiveness', cols: 3, sortable: true },
      { label: 'Lucro', key: 'profit', cols: 3, sortable: true },
    ],
  },
  table_away_team: {
    label: 'Times Visitantes',
    headers: [
      { label: 'Time', key: 'away_name', cols: 3, sortable: true },
      {
        label: 'Recomendações',
        key: 'recommendations',
        cols: 3,
        sortable: true,
      },
      { label: 'Assertividade', key: 'assertivity', cols: 3, sortable: true },
      { label: 'Lucro', key: 'profit', cols: 3, sortable: true },
    ],
  },
  table_home_team: {
    label: 'Times Mandantes',
    headers: [
      { label: 'Time', key: 'home_name', cols: 3, sortable: true },
      {
        label: 'Recomendações',
        key: 'recommendations',
        cols: 3,
        sortable: true,
      },
      { label: 'Assertividade', key: 'assertivity', cols: 3, sortable: true },
      { label: 'Lucro', key: 'profit', cols: 3, sortable: true },
    ],
  },
} as const

export function StatsTable() {
  const { getFilterParams } = useFilter()
  const params = {
    ...getFilterParams(),
  }
  const { userPlan } = useFilter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [tableType, setTableType] = useState<TableType>('table_leagues')
  const [sortState, setSortState] = useState<SortState>({
    column: 'league_name',
    direction: 'asc',
  })
  const [pagination, setPagination] = useState<PaginationState>({
    totalPages: 1,
    actualPage: 1,
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [paginatedData, setPaginatedData] = useState<any[]>([])

  const { data, isLoading } = useQuery<{ tables: ITables }>(
    ['stats'],
    async () => {
      const response = await api.get('results/pred1x', { params })
      return response.data
    },
    {
      keepPreviousData: true,
      enabled: dialogOpen,
    },
  )

  const sortedData = React.useMemo(() => {
    if (!data?.tables?.[tableType]) return []

    return [...data.tables[tableType]].sort((a, b) => {
      const aValue = a[sortState.column as keyof typeof a] as string | number
      const bValue = b[sortState.column as keyof typeof b] as string | number

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortState.direction === 'asc' ? aValue - bValue : bValue - aValue
      }

      const aStr = String(aValue)
      const bStr = String(bValue)
      return sortState.direction === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr)
    })
  }, [data?.tables, tableType, sortState])

  useEffect(() => {
    if (sortedData.length > 0) {
      setPagination({
        totalPages: Math.ceil(sortedData.length / 50),
        actualPage: 1,
      })
      setPaginatedData(sortedData.slice(0, 50))
    }
  }, [sortedData])

  const handleNextPage = () => {
    if (pagination.actualPage === pagination.totalPages) return

    const nextPage = pagination.actualPage + 1
    setPagination((prev) => ({
      ...prev,
      actualPage: nextPage,
    }))
    setPaginatedData(sortedData.slice((nextPage - 1) * 50, nextPage * 50))
  }

  const handlePreviousPage = () => {
    if (pagination.actualPage === 1) return

    const prevPage = pagination.actualPage - 1
    setPagination((prev) => ({
      ...prev,
      actualPage: prevPage,
    }))
    setPaginatedData(sortedData.slice((prevPage - 1) * 50, prevPage * 50))
  }

  const handleSort = (key: string) => {
    setSortState((prev) => ({
      column: key,
      direction:
        prev.column === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger
        style={{
          backgroundImage: `url(${bgStats.src})`,
        }}
        className="w-[510px] mobile:w-[350px] mobile:rounded-lg  h-[233px] relative"
      >
        <div className="flex flex-col items-start gap-4 max-w-[230px] p-8">
          <div className="bg-[#D2FD01] flex w-fit p-1 rounded-lg">
            <ChartBarIncreasing size={32} className="text-black" />
          </div>
          <div className="text-3xl text-start">Estatísticas</div>
          <div className="text-base text-[#D2FD01] underline">Explorar</div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[1200px] mobile:max-w-[95vw] px-4 max-h-[90vh]">
        <div className="flex justify-between items-center mb-4 pr-5">
          <DialogTitle className="mobile:hidden">Estatísticas</DialogTitle>
          <div className="flex items-center gap-2 mobile:justify-start mobile:w-full">
            <FilterComponent />
            <Select
              value={tableType}
              onValueChange={(value: TableType) => setTableType(value)}
            >
              <SelectTrigger className="w-[200px] h-11 mobile:h-10 mobile:w-[150px]">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(tableOptions).map(([value, { label }]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <div className="bg-gradient-to-r mobile:text-[10px] text-black from-[#D2FF00] py-3 to-[#58d764] w-full grid grid-cols-12">
            {tableOptions[tableType].headers.map((header) => (
              <div
                key={header.key}
                className={`${header.cols === 5 ? 'col-span-5' : header.cols === 3 ? 'col-span-3' : header.cols === 2 ? 'col-span-2' : 'col-span-1'} flex justify-center items-center gap-1 mobile:gap-0 ${
                  header.sortable ? 'cursor-pointer' : ''
                }`}
                onClick={() => header.sortable && handleSort(header.key)}
              >
                {header.label}
                {header.sortable && (
                  <span className="flex flex-col mobile:hidden">
                    <ChevronUp
                      size={12}
                      className={
                        sortState.column === header.key &&
                        sortState.direction === 'asc'
                          ? 'text-black'
                          : 'text-gray-500'
                      }
                    />
                    <ChevronDown
                      size={12}
                      className={
                        sortState.column === header.key &&
                        sortState.direction === 'desc'
                          ? 'text-black'
                          : 'text-gray-500'
                      }
                    />
                  </span>
                )}
              </div>
            ))}
          </div>

          {userPlan === 'Panzer Novice' ? (
            <div className="h-[250px] flex gap-3 justify-center items-center">
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <div className="mobile:text-xs text-center">
                    Funcionalidade desbloqueada apenas para planos Corner e Pro
                  </div>
                  <div>
                    <LockKeyholeIcon className="mobile:hidden" size={25} />
                  </div>
                </div>
                <div className="w-2/3 mx-auto bg-gradient-to-r mobile:w-full mobile:text-sm mobile:items-center from-[#D2FF00] hover:bg-opacity-80 to-[#58d764] transition-colors duration-300 py-3 flex gap-2 justify-center rounded-lg text-black">
                  <div>Desbloquear funcionalidade</div>
                  <div>
                    <UnlockKeyholeIcon />
                  </div>
                </div>
              </div>
            </div>
          ) : isLoading ? (
            <div className="flex justify-center py-4">Carregando...</div>
          ) : (
            <div className="flex flex-col mt-1 gap-2 overflow-auto max-h-[41%]">
              {paginatedData.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#3B3A40] mobile:text-[10px] py-2 w-full grid grid-cols-12"
                >
                  {tableOptions[tableType].headers.map((header) => {
                    // Determina o colspan baseado no tipo da tabela e na coluna
                    return (
                      <div
                        key={header.key}
                        className={`${header.cols === 5 ? 'col-span-5' : header.cols === 3 ? 'col-span-3' : header.cols === 2 ? 'col-span-2' : 'col-span-1'} flex justify-center mobile:text-center mobile:items-center w-full `}
                      >
                        {typeof item[header.key as keyof typeof item] ===
                        'number'
                          ? Number(
                              item[header.key as keyof typeof item],
                            ).toFixed(1)
                          : item[header.key as keyof typeof item]}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-end mobile:justify-center gap-4 mt-4">
            <Button
              onClick={handlePreviousPage}
              disabled={pagination.actualPage === 1}
              variant="outline"
            >
              Anterior
            </Button>
            <span className="py-2 mobile:text-xs">
              Página {pagination.actualPage} de {pagination.totalPages}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={pagination.actualPage === pagination.totalPages}
              variant="outline"
            >
              Próxima
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
