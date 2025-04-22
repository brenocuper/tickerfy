export type CurrencyItem = {
  name: string
  buy: number
  sell: number
  variation: number
}

type HistoryCurrencyPrice = {
  buy: number
  variation: number
  time: string
}

export type CurrencyHistory = {
  name: string
  historyPrice: HistoryCurrencyPrice[]
}

export type CurrenciesWithHistory = Record<string, CurrencyHistory>

export type StockItem = {
  location: string
  name: string
  points: number
  variation: number
}

type HistoryStockPrice = {
  points: number
  variation: number
  time: string
}

export type StockHistory = {
  name: string
  historyPrice: HistoryStockPrice[]
}

export type StockWithHistory = Record<string, StockHistory>