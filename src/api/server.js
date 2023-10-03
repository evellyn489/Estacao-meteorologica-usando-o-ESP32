import express from 'express';
import cors from 'cors';
import { json } from 'express';

const app = express();
const port = 3000;

app.use(json());

app.use(cors());


let sensorData = null;

app.post('/data', (req, res) => {
  const { temperatura, umidade, tempo } = req.body;

  console.log(`Temperatura: ${temperatura}°C, Umidade: ${umidade}%, Tempo: ${tempo}`);

  sensorData = { temperatura, umidade, tempo };

  res.status(200).send('Dados recebidos com sucesso');
});

app.get('/data', (req, res) => {
  if (sensorData) {
    res.json(sensorData);
  } else {
    res.status(404).send('Dados não encontrados');
  }
});

app.listen(port, () => {
  console.log(`Servidor da API está rodando na porta ${port}`);
});
