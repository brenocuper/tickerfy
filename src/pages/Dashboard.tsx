import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useRef, useState } from "react"

import { api } from "../lib/axios"
import { logout } from '../utils/auth'
import { pointsFormatter, priceFormatter } from "../utils/formatter"
import { ChartHistory } from "../components/ChartHistory"
import { useAuthRedirect } from "../hooks/useAuthRedirect"

import { CurrenciesWithHistory, CurrencyItem, StockItem, StockWithHistory } from "../types/finance"

export function Dashboard() {

  const [currenciesHistory, setCurrenciesHistory] = useState<CurrenciesWithHistory>({})
  const [stocksHistory, setStocksHistory] = useState<StockWithHistory>({})

  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<'currency' | 'stock' | null>(null)

  const intervalRef = useRef<number | null>(null)
  const navigate = useNavigate()

  useAuthRedirect()

  const fetchFinanceData = useCallback(async () => {
    const data = await fetchFinance()

    const filteredCurrencies = filterCurrencies(data.currencies, ['USD', 'EUR', 'CAD', 'AUD', 'JPY'])
    const filteredStocks = filterStocks(data.stocks, ['CAC', 'DOWJONES', 'IBOVESPA', 'IFIX', 'NASDAQ'])

    updateCurrenciesHistory(filteredCurrencies)
    updateStocksHistory(filteredStocks)
  }, [])

  useEffect(() => {

    fetchFinanceData()

    intervalRef.current = setInterval(fetchFinanceData, 10000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [fetchFinanceData])

  async function fetchFinance() {

    const key = import.meta.env.VITE_HG_API_KEY
    const url = key
      ? `/finance?key=${key}`
      : '/finance'

    const response = await api.get(url)
    return response.data.results
  }

  function filterCurrencies(
    currencies: Record<string, CurrencyItem>,
    keys: string[]
  ): Record<string, CurrencyItem> {
    return Object.fromEntries(
      Object.entries(currencies)
        .filter(([key]) => key !== 'source')
        .filter(([key]) => keys.includes(key))
    )
  }

  function filterStocks(
    stocks: Record<string, StockItem>,
    keys: string[]
  ): Record<string, StockItem> {
    return Object.fromEntries(
      Object.entries(stocks).filter(([key]) => keys.includes(key))
    )
  }

  function updateCurrenciesHistory(filtered: Record<string, CurrencyItem>) {
    const now = new Date().toLocaleTimeString()

    setCurrenciesHistory(prev => {
      const updated: CurrenciesWithHistory = { ...prev }

      for (const [key, item] of Object.entries(filtered)) {
        const { name, ...rest } = item
        const previous = updated[key]?.historyPrice || []

        updated[key] = {
          name,
          historyPrice: [...previous, { ...rest, time: now }]
        }
      }

      return updated
    })
  }

  function updateStocksHistory(filtered: Record<string, StockItem>) {
    const now = new Date().toLocaleTimeString()

    setStocksHistory(prev => {
      const updated: StockWithHistory = { ...prev }

      for (const [key, item] of Object.entries(filtered)) {
        const { name, ...rest } = item
        const previous = updated[key]?.historyPrice || []

        updated[key] = {
          name,
          historyPrice: [...previous, { ...rest, time: now }]
        }
      }

      return updated
    })
  }


  function renderVariation(variation: number | null) {
    if (variation === null) return '—'
    const color = variation > 0 ? 'text-green-600' : variation < 0 ? 'text-red-600' : 'text-gray-600'
    return <span className={`font-medium ${color}`}>{variation.toFixed(2)}%</span>
  }

  function showChart(key: string, type: 'currency' | 'stock') {
    setSelectedKey(key)
    setSelectedType(type)
  }

  return (
    <main className="p-4 max-w-5xl mx-auto">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tickerfy</h1>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => {
            logout()
            navigate('/login')
          }}
        >
          Sair
        </button>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Moedas</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 font-semibold">Nome</th>
                <th className="text-left px-4 py-2 font-semibold">Compra (R$)</th>
                <th className="text-left px-4 py-2 font-semibold">Variação</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(currenciesHistory).map(([key, item]) =>
                <tr
                  key={key}
                  onClick={() => showChart(key, 'currency')}
                  className={`cursor-pointer border-t transition-colors duration-150 ${selectedKey === key && selectedType === 'currency'
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-50'}`}>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{priceFormatter.format(Number(item.historyPrice.at(-1)?.buy))}</td>
                  <td className="px-4 py-2">{renderVariation(Number(item.historyPrice.at(-1)?.variation))}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Índices</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 font-semibold">Nome</th>
                <th className="text-left px-4 py-2 font-semibold">Pontos</th>
                <th className="text-left px-4 py-2 font-semibold">Variação</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stocksHistory).map(([key, item]) =>
                <tr
                  key={key}
                  onClick={() => showChart(key, 'stock')}
                  className={`cursor-pointer border-t transition-colors duration-150 ${selectedKey === key && selectedType === 'stock'
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-50'}`}>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{pointsFormatter.format(Number(item.historyPrice.at(-1)?.points))}</td>
                  <td className="px-4 py-2">{renderVariation(Number(item.historyPrice.at(-1)?.variation))}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Histórico</h2>
        <ChartHistory
          selectedKey={selectedKey}
          selectedType={selectedType}
          currenciesHistory={currenciesHistory}
          stocksHistory={stocksHistory}
        />
      </section>
    </main >
  )
}