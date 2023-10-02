import express from 'express';
import cors from 'cors';
import { json } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(json());

// Habilitando o CORS
app.use(cors());

// Variável para armazenar os dados temporariamente
let sensorData = null;

app.post('/data', (req, res) => {
  const { temperatura, umidade } = req.body;

  console.log(`Temperatura: ${temperatura}°C, Umidade: ${umidade}%`);

  // Armazene os dados recebidos na variável sensorData
  sensorData = { temperatura, umidade };

  res.status(200).send('Dados recebidos com sucesso');
});

// Rota GET para recuperar os dados
app.get('/data', (req, res) => {
  // Verifique se há dados na variável sensorData
  if (sensorData) {
    res.json(sensorData);
  } else {
    res.status(404).send('Dados não encontrados');
  }
});

app.listen(port, () => {
  console.log(`Servidor da API está rodando na porta ${port}`);
});
