import express from 'express'
import axios from 'axios'
import cors from 'cors'

const app = express()
app.use(cors())

app.get('/finance', async (_, res) => {
  try {
    const response = await axios.get('https://api.hgbrasil.com/finance')
    res.json(response.data)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados da HG Brasil' })
  }
})

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001')
})
