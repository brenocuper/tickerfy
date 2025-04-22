import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { CurrencyHistory, StockHistory } from "../types/finance"

type ChartHistoryProps = {
  selectedKey: string | null
  selectedType: 'currency' | 'stock' | null
  currenciesHistory: Record<string, CurrencyHistory>
  stocksHistory: Record<string, StockHistory>
}

export function ChartHistory({
  selectedKey,
  selectedType,
  currenciesHistory,
  stocksHistory,
}: ChartHistoryProps) {

  if (!selectedKey) {

    return (
      <p className="text-gray-600 mt-2">
        Selecione um item na tabela para visualizar o gráfico com o histórico de variação.
      </p>
    )
  }

  if (selectedType === 'currency' && currenciesHistory[selectedKey]) {

    const currency = currenciesHistory[selectedKey]

    return (
      <div className="bg-white p-4 mt-2 mb-10 border rounded shadow-md">
        <h3 className="text-lg font-semibold mb-2">{currency.name}</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={currency.historyPrice}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="buy" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (selectedType === 'stock' && stocksHistory[selectedKey]) {

    const stock = stocksHistory[selectedKey]

    return (
      <div className="bg-white p-4 mt-2 mb-10 border rounded shadow-md">
        <h3 className="text-lg font-semibold mb-2">{stock.name}</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stock.historyPrice}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="points" stroke="#f59e0b" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return null
}