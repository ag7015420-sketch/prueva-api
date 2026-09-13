const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: 'Hola desde mi API en Render' });
});

app.get('/', (req, res) => {
  res.send('API funcionando. Prueba /api/saludo');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Escuchando en ' + PORT));
