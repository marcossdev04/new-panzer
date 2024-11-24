export interface Bets {
  match_id: string
  match_date: string
  country_name: string
  league_id: string
  league_name: string
  away_name: string
  home_name: string
  stats_total_corners: number
  stats_total_goals: number
  stats_score: string
  stats_home_goals: number
  stats_away_goals: number
  odd_market: string
  odd_bet: 'Under' | 'Over'
  odd_line: string
  odd_value: string
  valid_0: 0 | 1
  valid_1: 0 | 1
  valid_2: 0 | 1
  valid_3: 0 | 1
  probability_green: string
  probability_green_devolution: string
  result: 'Black' | 'Green' | 'Red' | 'Orange'
  bookmaker_link: string
  is_product_pro?: boolean
  is_product_starter?: boolean
  is_product_lite?: boolean
  is_product_corner?: boolean
}
