import { useState } from "react";
import {useLocation} from "react-router-dom"
import "./index.css";

import teclado from "./assets/Teclado.svg";
import mouse from "./assets/Mouse.svg";
import headset from "./assets/Headseat.svg";
import cell from "./assets/Celular.svg";
import impressora from "./assets/Impressora.svg";
import note from "./assets/Notebook.svg";

function App() {
  const [aberto, setAberto] = useState(false);

  const [urgencia, setUrgencia] = useState("");
  const [necessidade, setNecessidade] = useState(false);

  const [equipamento, setEquipamento] = useState("");

  const [descricao, setDescricao] = useState("");

  const [enviando, setEnviando] = useState(false); 
  let locate = useLocation();
  async function enviarDados() {
    // Verifica se o equipamento foi selecionado
    if (!equipamento) {
      alert("Selecione um equipamento.");
      return;
    }

    // Verifica se a urgência foi selecionada
    if (!urgencia) {
      alert("Selecione a urgência.");
      return;
    }

    // Verifica se foi escrita uma descrição
    if (!descricao.trim()) {
      alert("Descreva o problema.");
      return;
    }

    try {
      setEnviando(true);

      const resposta = await fetch("http://localhost:3000/api/chamados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          equipamento: equipamento,
          urgencia: urgencia,
          descricao: descricao,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.erro || "Erro ao enviar chamado");
      }

      alert("Dados enviados com sucesso!");

      console.log("Chamado criado:", dados);

      // Limpa o formulário
      setEquipamento("");
      setUrgencia("");
      setNecessidade(false);
      setDescricao("");
    } catch (erro) {
      console.error("Erro:", erro);

      alert("Não foi possível enviar o chamado.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
    {locate.pathname === "/Chamados" && (
      <>
      <div className="fundo">
        <div className="box">
          <div className="box2">

            {/* MOUSE */}
            <div
              className={`icones1 ${
                equipamento === "mouse" ? "selecionado" : ""
              }`}
            >
              <img
                src={mouse}
                onClick={() => setEquipamento("mouse")}
              />
              <p>Mouse</p>
            </div>

            {/* TECLADO */}
            <div
              className={`icones1 ${
                equipamento === "teclado" ? "selecionado" : ""
              }`}
            >
              <img
                src={teclado}
                onClick={() => setEquipamento("teclado")}
              />
              <p>Teclado</p>
            </div>

            {/* FONE */}
            <div
              className={`icones1 ${
                equipamento === "fone" ? "selecionado" : ""
              }`}
            >
              <img
                src={headset}
                onClick={() => setEquipamento("fone")}
              />
              <p>Fone</p>
            </div>

            {/* CELULAR */}
            <div
              className={`icones1 ${
                equipamento === "celular" ? "selecionado" : ""
              }`}
            >
              <img
                src={cell}
                onClick={() => setEquipamento("celular")}
              />
              <p>Celular</p>
            </div>

            {/* IMPRESSORA */}
            <div
              className={`icones1 ${
                equipamento === "impressora" ? "selecionado" : ""
              }`}
            >
              <img
                src={impressora}
                onClick={() => setEquipamento("impressora")}
              />
              <p>Impressora</p>
            </div>

            {/* NOTEBOOK */}
            <div
              className={`icones1 ${
                equipamento === "notebook" ? "selecionado" : ""
              }`}
            >
              <img
                src={note}
                onClick={() => setEquipamento("notebook")}
              />
              <p>Notebook</p>
            </div>

          </div>
        </div>
      </div>

      {/* OPÇÕES */}
      <div className="opcoes">

        <div className="dropdown">

          <p className="dica">
            <b>Por favor selecione a urgência do seu caso abaixo</b>
          </p>

          {!aberto && (
            <>
              <div
                className={`botao ${
                  necessidade ? "desativado" : ""
                }`}
                onClick={() => {
                  if (!necessidade) {
                    setAberto(true);
                  }
                }}
              >
                <b>
                  {urgencia
                    ? urgencia.charAt(0).toUpperCase() +
                      urgencia.slice(1)
                    : "Selecione"}
                </b>
              </div>

              {necessidade && (
                <div
                  className="botaoReset"
                  onClick={() => {
                    setNecessidade(false);
                    setUrgencia("");
                  }}
                >
                  Reiniciar
                </div>
              )}
            </>
          )}

          {aberto && (
            <div className="menu">

              {/* URGENTE */}
              <div
                className="urgente"
                onClick={() => {
                  setAberto(false);
                  setUrgencia("urgente");
                  setNecessidade(true);
                }}
              >
                <b>Urgente</b>
              </div>

              {/* MÉDIO */}
              <div
                className="medio"
                onClick={() => {
                  setAberto(false);
                  setUrgencia("medio");
                  setNecessidade(true);
                }}
              >
                <b>Médio</b>
              </div>

              {/* LEVE */}
              <div
                className="leve"
                onClick={() => {
                  setAberto(false);
                  setUrgencia("leve");
                  setNecessidade(true);
                }}
              >
                <b>Leve</b>
              </div>

            </div>
          )}

        </div>

        {/* ENVIAR */}
        <div
          className={`enviar ${enviando ? "desativado" : ""}`}
          onClick={() => {
            if (!enviando) {
              enviarDados();
            }
          }}
        >
          <b>
            {enviando ? "Enviando..." : "Enviar"}
          </b>
        </div>

      </div>

      {/* DESCRIÇÃO */}
      <div className="desc">

        <b>Descrição do problema</b>

        <textarea
          className="descInput"
          placeholder="Descreva o problema..."
          rows="3"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

      </div>
    </>
  )}
</>
  )}

export default App;