const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// CONEXÃO COM O MYSQL
// ===============================

const banco = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chamados"
});

banco.connect((erro) => {
    if (erro) {
        console.error("Erro ao conectar no MySQL:", erro);
        return;
    }

    console.log("MySQL conectado!");
});


// ===============================
// ADICIONAR CHAMADO
// ===============================
app.delete("/api/chamados/resetar", (req, res) => {
    const sql = "TRUNCATE TABLE chamados";

    banco.query(sql, (erro) => {
        if (erro) {
            console.error("Erro ao resetar chamados:", erro);

            return res.status(500).json({
                erro: "Erro ao resetar chamados."
            });
        }

        res.json({
            mensagem: "Chamados resetados com sucesso!"
        });
    });
});

app.post("/api/chamados", (req, res) => {

    const {
        equipamento,
        urgencia,
        descricao
    } = req.body;

    // Verifica se os dados necessários foram enviados
    if (!equipamento || !urgencia || !descricao) {
        return res.status(400).json({
            erro: "Preencha todos os campos."
        });
    }

    const sql = `
        INSERT INTO chamados
        (equipamento, urgencia, descricao)
        VALUES (?, ?, ?)
    `;

    banco.query(
        sql,
        [equipamento, urgencia, descricao],
        (erro, resultado) => {

            if (erro) {
                console.error("Erro ao adicionar chamado:", erro);

                return res.status(500).json({
                    erro: "Erro ao adicionar chamado."
                });
            }

            res.status(201).json({
                mensagem: "Chamado adicionado com sucesso!",
                id: resultado.insertId
            });
        }
    );
});


// ===============================
// LISTAR CHAMADOS
// ===============================

app.get("/api/chamados", (req, res) => {

    const sql = `
        SELECT *
        FROM chamados
        ORDER BY id DESC
    `;

    banco.query(sql, (erro, resultados) => {

        if (erro) {
            console.error("Erro ao buscar chamados:", erro);

            return res.status(500).json({
                erro: "Erro ao buscar chamados."
            });
        }

        res.json(resultados);
    });
});

// ===============================
// DELETAR CHAMADO
// ===============================

app.delete("/api/chamados/:id", (req, res) => {

    const id = Number(req.params.id);

    // Verifica se o ID é válido
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            erro: "ID inválido."
        });
    }

    const sql = `
        DELETE FROM chamados
        WHERE id = ?
    `;

    banco.query(sql, [id], (erro, resultado) => {

        if (erro) {
            console.error("Erro ao deletar chamado:", erro);

            return res.status(500).json({
                erro: "Erro ao deletar chamado."
            });
        }

        // Nenhuma linha foi deletada
        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: "Chamado não encontrado."
            });
        }

        res.json({
            mensagem: "Chamado deletado com sucesso!"
        });
    });
});

// ===============================
// INICIAR SERVIDOR
// ===============================

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});