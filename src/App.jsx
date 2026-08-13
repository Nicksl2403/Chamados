import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./index.css";

import teclado from "./assets/Teclado.svg";
import mouse from "./assets/Mouse.svg";
import headset from "./assets/Headseat.svg";
import cell from "./assets/Celular.svg";
import impressora from "./assets/Impressora.svg";
import note from "./assets/Notebook.svg";
import desk from "./assets/Desktop.svg";
import outro from "./assets/Outro.svg";
import rede from "./assets/Rede.svg";
import equipamentos from "./assets/Equipamentos.svg"
import redefalha from "./assets/RedeFalha.svg";
import logo from "./assets/gcf-logo-02-scaled.png";

function App() {
  const [urgencia, setUrgencia] = useState("");
  const [necessidade, setNecessidade] = useState(false);
  const [equipamento, setEquipamento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [equipamentoAberto, setEquipamentoAberto] = useState(false);
  const [redeAberto, setRedeAberto] = useState(false);

  const locate = useLocation();

  async function enviarDados() {
    if (!equipamento) {
      alert("Selecione um equipamento.");
      return;
    }

    if (!urgencia) {
      alert("Selecione a urgência.");
      return;
    }

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
            <Link className="logo" to="https://grupocropfield.com.br/">
              <img src={logo} width="600px" height="300px" />
            </Link>
            <div className="box">
                 {(equipamentoAberto || redeAberto) && (
              <button className="voltar" onClick={() => {setEquipamentoAberto(false); setEquipamento(""); setRedeAberto(false)}}><b>Voltar</b></button>
              )}
              <div className="box2">
                {redeAberto && (
                  <>
                   <button
                      className={`icones1 ${
                        equipamento === "Conexão na rede" ? "selecionado" : ""
                      }`}
                      onClick={() => setEquipamento("Conexão na rede")}
                    >
                      <img src={redefalha} />
                      <p><b>Problema de rede</b></p>
                    </button>
                  </>
                )}
                {equipamentoAberto && (
                  <>
                   {/*EQUIPAMENTOS*/}
                    <button
                      className={`icones1 ${
                        equipamento === "mouse" ? "selecionado" : ""
                      }`}
                      onClick={() => setEquipamento("mouse")}
                    >
                      <img src={mouse} />
                      <p>Mouse</p>
                    </button>

                    <button
                      className={`icones1 ${
                        equipamento === "teclado" ? "selecionado" : ""
                      }`}
                      onClick={() => setEquipamento("teclado")}
                    >
                      <img src={teclado} />
                      <p>Teclado</p>
                    </button>

                    <button
                      className={`icones1 ${
                        equipamento === "fone" ? "selecionado" : ""
                      }`}
                      onClick={() => setEquipamento("fone")}
                    >
                      <img src={headset} />
                      <p>Fone</p>
                    </button>

                    <button
                      className={`icones1 ${
                        equipamento === "celular" ? "selecionado" : ""
                      }`}
                      onClick={() => setEquipamento("celular")}
                    >
                      <img src={cell} />
                      <p>Celular</p>
                    </button>

                    <button
                      className={`icones1 ${
                        equipamento === "impressora" ? "selecionado" : ""
                      }`}
                      onClick={() => setEquipamento("impressora")}
                    >
                      <img src={impressora} />
                      <p>Impressora</p>
                    </button>

                    <button
                      className={`icones1 ${
                        equipamento === "notebook" ? "selecionado" : ""
                      }`}
                      onClick={() => setEquipamento("notebook")}
                    >
                      <img src={note} />
                      <p>Notebook</p>
                    </button>

                    <button
                      className={`icones1 ${
                        equipamento === "desktop" ? "selecionado" : ""
                      }`}
                      onClick={() => setEquipamento("desktop")}
                    >
                      <img src={desk} />
                      <p>Desktop</p>
                    </button>

                    <button
                      className={`icones1 ${
                        equipamento === "outro" ? "selecionado" : ""
                      }`}
                      onClick={() => setEquipamento("outro")}
                    >
                      <img src={outro} />
                      <p>Outros</p>
                    </button>
                  </>
                )}
                {/*REDE*/}
                {!equipamentoAberto && !redeAberto && (
                  <>
                  <button
                      className={`icones1 ${
                        equipamento === "equipamentos" ? "selecionado" : ""
                      }`}
                      onClick={() => setEquipamentoAberto(true)}
                    >
                      <img src={equipamentos} />
                      <p><b>Aparelhos</b></p>
                    </button>
                      <button
                      className={`icones1 ${
                        equipamento === "Rede" ? "selecionado" : ""
                      }`}
                      onClick={() => setRedeAberto(true)}
                    >
                      <img src={rede} />
                      <p><b>Rede</b></p>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="opcoes">
            <div className="dropdown">
              <p className="dica">
                <b>Por favor selecione a urgência do seu caso abaixo</b>
              </p>

              {!aberto && (
                <>
                  <button
                    className={`botao ${necessidade ? "desativado" : ""}`}
                    onClick={() => {
                      if (!necessidade) {
                        setAberto(true);
                      }
                    }}
                  >
                    <b>
                      {urgencia
                        ? urgencia.charAt(0).toUpperCase() + urgencia.slice(1)
                        : "Selecione"}
                    </b>
                  </button>

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

            <button
              className={`enviar ${enviando ? "desativado" : ""}`}
              onClick={() => {
                if (!enviando) {
                  enviarDados();
                }
              }}
            >
              <b>{enviando ? "Enviando..." : "Enviar"}</b>
            </button>
          </div>

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
  );
}

export default App;
