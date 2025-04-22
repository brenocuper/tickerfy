import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

const baseCurrencies = {
  USD: { name: 'Dollar', buy: 5.8067, sell: 5.8072 },
  EUR: { name: 'Euro', buy: 6.6142, sell: 6.6138 },
  GBP: { name: 'Pound Sterling', buy: 7.7121, sell: null },
  ARS: { name: 'Argentine Peso', buy: 0.0049, sell: null },
  CAD: { name: 'Canadian Dollar', buy: 4.193, sell: null },
  AUD: { name: 'Australian Dollar', buy: 3.7009, sell: null },
  JPY: { name: 'Japanese Yen', buy: 0.0407, sell: null },
  CNY: { name: 'Renminbi', buy: 0.7954, sell: null },
  BTC: { name: 'Bitcoin', buy: 520167.239, sell: 520167.239 },
}

const baseStocks = {
  IBOVESPA: { name: 'BM&F BOVESPA', location: 'Sao Paulo, Brazil', points: 129650.03 },
  IFIX: { name: 'Índice de Fundos de Investimentos Imobiliários B3', location: 'Sao Paulo, Brazil', points: 3333.34 },
  NASDAQ: { name: 'NASDAQ Stock Market', location: 'New York City, United States', points: 16286.45 },
  DOWJONES: { name: 'Dow Jones Industrial Average', location: 'New York City, United States', points: 39142.23 },
  CAC: { name: 'CAC 40', location: 'Paris, French', points: 7285.86 },
  NIKKEI: { name: 'Nikkei 225', location: 'Tokyo, Japan', points: 34730.28 },
}

function getRandomVariation() {
  return +(Math.random() * 2 - 1).toFixed(3) // -1.000 to +1.000
}

function applyVariation(value, variation) {
  return +(value * (1 + variation / 100)).toFixed(4)
}

app.get('/finance', (req, res) => {
  const currencies = {}
  for (const [key, item] of Object.entries(baseCurrencies)) {
    const variation = getRandomVariation()
    currencies[key] = {
      name: item.name,
      buy: applyVariation(item.buy, variation),
      sell: item.sell ? applyVariation(item.sell, variation) : null,
      variation: +variation.toFixed(3),
    }
  }

  const stocks = {}
  for (const [key, item] of Object.entries(baseStocks)) {
    const variation = getRandomVariation()
    stocks[key] = {
      name: item.name,
      location: item.location,
      points: applyVariation(item.points, variation),
      variation: +variation.toFixed(3),
    }
  }

  res.json({
    by: 'mock',
    valid_key: true,
    results: {
      currencies: {
        source: 'BRL',
        ...currencies,
      },
      stocks,
      available_sources: ['BRL'],
      taxes: [],
    },
    execution_time: 0,
    from_cache: false,
  })
})

app.listen(3001, () => {
  console.log('✅ Mock financeiro atualizado rodando em http://localhost:3001/finance')
})