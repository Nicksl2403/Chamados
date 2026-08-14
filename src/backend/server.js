const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());


// PEGA O ARQUIVO E INTERPRETA DIREITO JA QUE ELE TINHA VIRADO UM JSON STRING //

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
// Detecta se der erro
banco.connect((erro) => {
    if (erro) {
        console.error("Erro ao conectar no MySQL:", erro);
        return;
    }
});


// ===============================
// RESETAR CHAMADO
// ===============================
app.delete("/api/chamados/resetar", (req, res) => {
    const sql = "TRUNCATE TABLE chamados";
// SE ERRO PT 2
    banco.query(sql, (erro) => {
        if (erro) {
            console.error("Erro ao resetar chamados:", erro);

            return res.status(500).json({
                erro: "Erro ao resetar chamados."
            });
        }
        //RESPOSTA QUE ELE RETORNA PRO FRONT
        res.json({
            mensagem: "Chamados resetados com sucesso!"
        });
    });
});
//ADICIONAR
app.post("/api/chamados", (req, res) => {
    //OBJETO
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
    //SEGURANÇA DO SQL
    const sql = `
        INSERT INTO chamados
        (equipamento, urgencia, descricao)
        VALUES (?, ?, ?)
    `;
    // TENTAR ADICIONAR NO SQL
    banco.query(
        sql,
        [equipamento, urgencia, descricao],
        (erro, resultado) => {
            //RESPOSTA AOS ERROS
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
//SEGURANÇA DO SQL
    const sql = `
        SELECT *
        FROM chamados
        ORDER BY id DESC
    `;
//INFORMAR ERROS
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
});