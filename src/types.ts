
export interface SymbolResponse {
  success: boolean
  symbols: CurrencySymbols
}

export interface ConvertResponse {
  success: boolean
  date: string
  historical: string
  info: {
    rate: number
    timestamp: number
  },
  query: {
    amount: number
    from: string
    to: string
  },
  result: number
}

export interface RatesResponse {
  success: boolean
  date: string
  rates: Rates,
}

export interface ConvertPayload {
  from: string
  to: string
  amount: string
}

export type CurrencySymbols = Record<string, string>

export type Rates = Record<string, number>


export type RatesPayload = string

