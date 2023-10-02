import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/data', (req, res) => {
  const { temperatura, umidade } = req.body;

  console.log(`Temperatura: ${temperatura}°C, Umidade: ${umidade}%`);
  res.status(200).send('Dados recebidos com sucesso');
});

app.listen(port, () => {
  console.log(`Servidor da API está rodando na porta ${port}`);
});