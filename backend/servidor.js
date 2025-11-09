require("dotenv").config({ path: "./src/.env" });

const express = require('express')
const app = express()

const porta = process.env.PORTA

const rotasTarefas = require('./src/routes/rotasTarefas');

app.use(express.json());
app.use('/tarefas', rotasTarefas);
// Rota de teste

app.get('/', (req, res) => {
  res.send('Olá Mundo!')
})

// Rota padrão
app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`)
})
