const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('API funcionando. Prueba /api/saludo');
});

app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: 'Hola desde mi API en Render' });
});

// Precio USDT/BRL desde Binance Spot
app.get('/api/usdt-brl', async (req, res) => {
  try {
    const r = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=USDTBRL');
    const data = await r.json();
    res.json(data); // {symbol:"USDTBRL", price:"5.79..."}
  } catch (e) {
    res.status(500).json({ error: 'No se pudo obtener BRL' });
  }
});

// Precio USDT/BOB desde Binance P2P
app.get('/api/usdt-bob', async (req, res) => {
  try {
    const r = await fetch('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: 1,
        rows: 1,
        asset: 'USDT',
        fiat: 'BOB',
        tradeType: 'BUY'
      })
    });
    const data = await r.json();
    const price = data?.data?.[0]?.adv?.price;
    res.json({ symbol: 'USDTBOB', price });
  } catch (e) {
    res.status(500).json({ error: 'No se pudo obtener BOB' });
  }
});

app.listen(PORT, () => {
  console.log(`Escuchando en ${PORT}`);
});
