import data from '@/app/data/filters.json'

export const getOptions = (list: string[]) =>
  list.map((element) => ({
    label: element,
    value: element,
  }))

const marketList = data.markets
export const marketOptions = getOptions(marketList)

export const golsLineList = data.golsLine
export const golsLineOptions = getOptions(golsLineList)

const countryList = data.countrys
export const countryOptions = getOptions(countryList)

const leagueList = data.leagues
export const leagueOptions = getOptions(leagueList)

export const betOptions = [
  {
    label: 'Todas',
    value: 'All',
  },
  {
    label: 'Mais de',
    value: 'Over',
  },
  {
    label: 'Menos de',
    value: 'Under',
  },
]

const resultList = ['Dev', 'Green', 'No-Res.', 'Red']
export const resultOptions = getOptions(resultList)

const homeTeamList = data.homes
export const homeTeamOptions = getOptions(homeTeamList)

const awayTeamList = data.aways
export const awayTeamOptions = getOptions(awayTeamList)

export const oddValues = [1, 3]
