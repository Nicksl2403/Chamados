require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { neon } = require("@neondatabase/serverless");

const app = express();

app.use(cors());
app.use(express.json());

// ===============================
// CONEXÃO COM O NEON POSTGRESQL
// ===============================

const sql = neon(process.env.DATABASE_URL);


// ===============================
// ADICIONAR CHAMADO
// ===============================

app.post("/api/chamados", async (req, res) => {

    const {
        equipamento,
        urgencia,
        descricao
    } = req.body;

    // Verifica se os dados foram enviados
    if (!equipamento || !urgencia || !descricao) {
        return res.status(400).json({
            erro: "Preencha todos os campos."
        });
    }

    try {

        const resultado = await sql`
            INSERT INTO chamados
            (equipamento, urgencia, descricao)
            VALUES
            (${equipamento}, ${urgencia}, ${descricao})
            RETURNING id
        `;

        res.status(201).json({
            mensagem: "Chamado adicionado com sucesso!",
            id: resultado[0].id
        });

    } catch (erro) {

        console.error("Erro ao adicionar chamado:", erro);

        res.status(500).json({
            erro: "Erro ao adicionar chamado."
        });
    }
});


// ===============================
// LISTAR CHAMADOS
// ===============================

app.get("/api/chamados", async (req, res) => {

    try {

        const resultados = await sql`
            SELECT *
            FROM chamados
            ORDER BY id DESC
        `;

        res.json(resultados);

    } catch (erro) {

        console.error("Erro ao buscar chamados:", erro);

        res.status(500).json({
            erro: "Erro ao buscar chamados."
        });
    }
});


// ===============================
// DELETAR CHAMADO
// ===============================

app.delete("/api/chamados/:id", async (req, res) => {

    const id = Number(req.params.id);

    // Verifica se o ID é válido
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            erro: "ID inválido."
        });
    }

    try {

        const resultado = await sql`
            DELETE FROM chamados
            WHERE id = ${id}
            RETURNING id
        `;

        // Nenhum chamado encontrado
        if (resultado.length === 0) {
            return res.status(404).json({
                erro: "Chamado não encontrado."
            });
        }

        res.json({
            mensagem: "Chamado deletado com sucesso!"
        });

    } catch (erro) {

        console.error("Erro ao deletar chamado:", erro);

        res.status(500).json({
            erro: "Erro ao deletar chamado."
        });
    }
});


// ===============================
// RESETAR CHAMADOS
// ===============================

app.delete("/api/chamados/resetar", async (req, res) => {

    try {

        await sql`
            TRUNCATE TABLE chamados RESTART IDENTITY
        `;

        res.json({
            mensagem: "Chamados resetados com sucesso!"
        });

    } catch (erro) {

        console.error("Erro ao resetar chamados:", erro);

        res.status(500).json({
            erro: "Erro ao resetar chamados."
        });
    }
});


// ===============================
// INICIAR SERVIDOR
// ===============================

// Para testar localmente
if (process.env.NODE_ENV !== "production") {

    app.listen(3000, () => {
        console.log("Servidor rodando em http://localhost:3000");
    });

}


// ===============================
// EXPORTAR PARA A VERCEL
// ===============================

module.exports = app;