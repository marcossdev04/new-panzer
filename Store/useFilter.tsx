/* eslint-disable @typescript-eslint/no-explicit-any */
// src/Store/useFilter.tsx

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import moment from 'moment'
import data from '@/data/filters.json'
import { api } from '@/api/api'
import { User } from '@/types/User'
import { useQuery } from 'react-query'

export type PanzerPlan =
  | 'Panzer Pro Hot'
  | 'Panzer Pro'
  | 'Panzer Novice'
  | 'Panzer Corner'
  | 'Sem plano'
export interface IOption {
  label: string
  value: string
}
export interface IFilterOptions {
  market: IOption[]
  gols: IOption[]
  country: IOption[]
  league: IOption[]
  homeTeam: IOption[]
  awayTeam: IOption[]
}

export interface FilterState {
  startDate: string
  endDate: string
  country: string[]
  league: string[]
  bet: string[]
  result: string[]
  homeTeam: string[]
  awayTeam: string[]
  goalLine: string[]
  probGreenMin: number
  probGreenMax: number
  probGreenDevMin: number
  probGreenDevMax: number
  oddMin: number
  oddMax: number
}

export interface FilterContextData {
  filters: FilterState
  tempFilters: FilterState
  updateTempFilter: (field: keyof FilterState, value: any) => void
  clearTempFilters: () => void
  applyFilters: () => void
  getFilterParams: () => Record<string, string | undefined | number | boolean>
  filterOptions?: IFilterOptions
  userPlan?: PanzerPlan
  setUserPlan: (newPlan: PanzerPlan) => void
}

export const FILTER_OPTIONS = {
  bet: [
    { label: 'Over', value: 'Over' },
    { label: 'Under', value: 'Under' },
    { label: 'All', value: 'All' },
  ],
  result: [
    { label: 'Win', value: 'Win' },
    { label: 'Lose', value: 'Lose' },
    { label: 'Returned', value: 'Returned' },
    { label: 'Canceled', value: 'Canceled' },
  ],
} satisfies Record<string, readonly IOption[]>

const getOptions = (list: string[]) =>
  list.map((element) => ({
    label: element,
    value: element,
  }))

const initialFilterState: FilterState = {
  startDate: '06/01/21',
  endDate: moment().format('DD/MM/YY'),
  country: [],
  league: [],
  bet: [],
  result: [],
  homeTeam: [],
  awayTeam: [],
  goalLine: [],
  probGreenMin: 47,
  probGreenMax: 85,
  probGreenDevMin: 65,
  probGreenDevMax: 95,
  oddMin: 1.55,
  oddMax: 2.38,
}

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>({ ...initialFilterState })
  const [tempFilters, setTempFilters] = useState<FilterState>({
    ...initialFilterState,
  })
  const [currentPlan, setCurrentPlan] = useState<PanzerPlan | undefined>(
    undefined,
  )

  const setUserPlan = (newPlan: PanzerPlan) => {
    setCurrentPlan(newPlan)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('userPlan', newPlan)
    }
  }

  const [filterOptions, setFilterOptions] = useState<IFilterOptions>()

  useEffect(() => {
    // Carregar dados do JSON
    const marketList = data.markets
    const marketOptions = getOptions(marketList)

    const golsLineList = data.golsLine
    const golsLineOptions = getOptions(golsLineList)

    const countryList = data.countrys
    const countryOptions = getOptions(countryList)

    const leagueList = data.leagues
    const leagueOptions = getOptions(leagueList)

    const homeTeamList = data.homes
    const homeTeamOptions = getOptions(homeTeamList)

    const awayTeamList = data.aways
    const awayTeamOptions = getOptions(awayTeamList)

    setFilterOptions({
      market: marketOptions,
      gols: golsLineOptions,
      country: countryOptions,
      league: leagueOptions,
      homeTeam: homeTeamOptions,
      awayTeam: awayTeamOptions,
    })
  }, [])

  // Fetch user data and determine plan
  const { data: user } = useQuery<User>(
    ['getUser'],
    async () => {
      const response = await api.get('/users/me')
      return response.data
    },
    {
      refetchInterval: 30000, // Refetch a cada 30 segundos
      refetchIntervalInBackground: true,
      onSuccess: (data) => {
        const newPlan = getUserPlan(data)
        if (newPlan && newPlan !== currentPlan) {
          setUserPlan(newPlan)
        }
      },
    },
  )

  const getUserPlan = (user?: User): PanzerPlan | undefined => {
    // Se já tiver um plano selecionado no localStorage, retorna ele
    if (currentPlan) return currentPlan

    // Se não tiver usuário, retorna undefined
    if (!user) return undefined

    // Verifica se tem products e se o array não está vazio
    if (
      !user.products ||
      !Array.isArray(user.products) ||
      user.products.length <= 0
    ) {
      return 'Sem plano'
    }

    // Procura por um produto ativo
    const activeProduct = user.products.find(
      (product) => product.status === 'active',
    )

    // Se não encontrar produto ativo, retorna undefined
    if (!activeProduct) return undefined

    const productName = activeProduct.resources.product_name.toLowerCase()

    let plan: PanzerPlan
    if (productName.includes('pro hot')) plan = 'Panzer Pro Hot'
    else if (productName.includes('pro')) plan = 'Panzer Pro'
    else if (productName.includes('novice')) plan = 'Panzer Novice'
    else if (productName.includes('corner')) plan = 'Panzer Corner'
    else plan = 'Panzer Novice'

    // Salva o plano inicial no localStorage se estivermos no cliente
    if (
      typeof window !== 'undefined' &&
      !window.localStorage.getItem('userPlan')
    ) {
      window.localStorage.setItem('userPlan', plan)
    }

    return plan
  }

  const userPlan = getUserPlan(user)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Se tiver um plano, salva no localStorage
      if (userPlan === 'Sem plano') {
        localStorage.setItem('userPlan', userPlan)
      }
    }
  }, [userPlan])

  const updateTempFilter = (field: keyof FilterState, value: any) => {
    setTempFilters((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const clearTempFilters = () => {
    setTempFilters({ ...initialFilterState })
    getFilterParams()
  }

  const applyFilters = () => {
    setFilters({ ...tempFilters })
  }

  const getFilterParams = () => {
    const params: Record<string, string | undefined | number | boolean> = {
      match_date_after: moment(filters.startDate, 'DD/MM/YY').format(
        'YYYY-MM-DD',
      ),
      match_date_before: moment(filters.endDate, 'DD/MM/YY').format(
        'YYYY-MM-DD',
      ),
      country_name__in:
        filters.country?.length > 0 ? filters.country.join(',') : undefined,
      league_name__in:
        filters.league?.length > 0 ? filters.league.join(',') : undefined,
      away_name__in:
        filters.awayTeam?.length > 0 ? filters.awayTeam.join(',') : undefined,
      home_name__in:
        filters.homeTeam?.length > 0 ? filters.homeTeam.join(',') : undefined,
      odd_line:
        filters.goalLine?.length > 0 ? filters.goalLine.join(',') : undefined,
      odd_value_max: filters.oddMax,
      odd_value_min: filters.oddMin,
      result__in:
        filters.result?.length > 0 ? filters.result.join(',') : undefined,
      probability_green_min: filters.probGreenMin,
      probability_green_max: filters.probGreenMax,
      probability_green_devolution_min: filters.probGreenDevMin,
      probability_green_devolution_max: filters.probGreenDevMax,
      is_filter_hot: userPlan === 'Panzer Pro Hot',
      is_product_pro: userPlan === 'Panzer Pro' || undefined,
      is_product_novice: userPlan === 'Panzer Novice' ? true : undefined,
      is_product_corner: userPlan === 'Panzer Corner' ? true : undefined,
    }

    Object.keys(params).forEach((key) => {
      if (params[key] === undefined) {
        delete params[key]
      }
    })

    return params
  }
  useEffect(() => {
    setUserPlan(
      userPlan === undefined
        ? 'Sem plano'
        : userPlan === 'Sem plano'
          ? 'Sem plano'
          : userPlan,
    )
  }, [userPlan])

  return (
    <FilterContext.Provider
      value={{
        filters,
        tempFilters,
        updateTempFilter,
        clearTempFilters,
        applyFilters,
        getFilterParams,
        filterOptions,
        userPlan,
        setUserPlan,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

const FilterContext = createContext<FilterContextData>({} as FilterContextData)

export function useFilter(): FilterContextData {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider')
  }

  return context
}
