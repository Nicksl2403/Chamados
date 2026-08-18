const express = require('express');
const cors = require('cors');
const { neon } = require('@neondatabase/serverless');

const app = express();

app.use(cors());
app.use(express.json());

// Conexão com o banco Neon usando a variável de ambiente cadastrada na Vercel
const sql = neon(process.env.DATABASE_URL);

// Rota de teste
app.get('/api', (req, res) => {
  res.json({ status: 'API Online!' });
});

// ==========================================
// COLE AQUI AS SUAS ROTAS REAIS (LOGIN, CHAMADOS, ETC.)
// Exemplo:
// app.post('/api/login', async (req, res) => { ... });
// app.get('/api/chamados', async (req, res) => { ... });
// ==========================================

// OBRIGATÓRIO PARA A VERCEL: Exportar o app no final
module.exports = app;   