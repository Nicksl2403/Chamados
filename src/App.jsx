import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
import equipamentos from "./assets/Equipamentos.svg";
import redefalha from "./assets/RedeFalha.svg";
import logo from "./assets/gcf-logo-02-scaled.png";
import logoPROBUS from "./assets/PROBUSlogo.svg";
import empresamenos from "./assets/Empresa2.svg";
import empresamais from "./assets/Empresa1.svg";
import addsite from "./assets/addsite.svg";
import geral from "./assets/geral.svg";
import redeAviso from "./assets/wifiAviso.svg";


// ==========================================
// URL DO BACKEND
// ==========================================

const URL_BACKEND = "COLE_A_URL_DO_SEU_BACKEND_AQUI";


function App() {

  const [focusText, setFocusText] = useState("");

  const [urgencia, setUrgencia] = useState("");

  const [necessidade, setNecessidade] = useState(false);

  const [equipamento, setEquipamento] = useState("");

  const [descricao, setDescricao] = useState("");

  const [enviando, setEnviando] = useState(false);

  const [aberto, setAberto] = useState(false);

  const [equipamentoAberto, setEquipamentoAberto] = useState(false);

  const [redeAberto, setRedeAberto] = useState(false);

  const [problemaRede, setProblemaRede] = useState(false);

  const [PROBUS, setPROBUS] = useState(false);


  const locate = useLocation();


  // ==========================================
  // ENVIAR CHAMADO
  // ==========================================

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


      const resposta = await fetch(
        `${URL_BACKEND}/api/chamados`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            equipamento: equipamento,
            urgencia: urgencia,
            descricao: descricao,
          }),
        }
      );


      const dados = await resposta.json();


      if (!resposta.ok) {

        throw new Error(
          dados.erro || "Erro ao enviar chamado"
        );

      }


      alert("Dados enviados com sucesso!");


      console.log(
        "Chamado criado:",
        dados
      );


      setEquipamento("");

      setUrgencia("");

      setNecessidade(false);

      setDescricao("");


    } catch (erro) {

      console.error(
        "Erro:",
        erro
      );


      alert(
        "Não foi possível enviar o chamado."
      );


    } finally {

      setEnviando(false);

    }
  }


  // ==========================================
  // ENTER PARA ENVIAR
  // ==========================================

  useEffect(() => {

    const Enter = (evento) => {

      if (evento.key === "Enter") {

        if (!enviando && !focusText) {

          enviarDados();

        }

      }

    };


    window.addEventListener(
      "keydown",
      Enter
    );


    return () => {

      window.removeEventListener(
        "keydown",
        Enter
      );

    };

  }, [
    enviando,
    equipamento,
    urgencia,
    descricao,
    focusText
  ]);


  return (

    <>

      {locate.pathname === "/Chamados" && (

        <>

          <div className="fundo">

            <div className="box">

              {(equipamentoAberto ||
                redeAberto ||
                problemaRede ||
                PROBUS) && (

                <button
                  className="voltar"

                  onClick={() => {

                    setEquipamentoAberto(false);

                    setEquipamento("");

                    setRedeAberto(false);

                    setProblemaRede(false);

                    setPROBUS(false);

                  }}
                >
                  <b>Voltar</b>
                </button>

              )}


              <div
                className={`box2 ${
                  problemaRede
                    ? "redeProblema"
                    : redeAberto
                    ? "rede"
                    : equipamentoAberto
                    ? "equipamento"
                    : ""
                }`}
              >


                {/* =====================================
                    PROBLEMAS DE REDE
                ====================================== */}

                {problemaRede && (

                  <>

                    <button
                      className={`icones1 ${
                        equipamento ===
                        "Falha rede celular"
                          ? "selecionado"
                          : ""
                      }`}

                      onClick={() =>
                        setEquipamento(
                          "Falha rede celular"
                        )
                      }
                    >

                      <img src={redefalha} />

                      <p>
                        <b>Falha celular</b>
                      </p>

                    </button>


                    <button
                      className={`icones1 ${
                        equipamento ===
                        "Falha rede notebook"
                          ? "selecionado"
                          : ""
                      }`}

                      onClick={() =>
                        setEquipamento(
                          "Falha rede notebook"
                        )
                      }
                    >

                      <img src={redefalha} />

                      <p>
                        <b>Falha notebook</b>
                      </p>

                    </button>


                    <button
                      className={`icones1 ${
                        equipamento ===
                        "Falha rede desktop"
                          ? "selecionado"
                          : ""
                      }`}

                      onClick={() =>
                        setEquipamento(
                          "Falha rede desktop"
                        )
                      }
                    >

                      <img src={redefalha} />

                      <p>
                        <b>Falha desktop</b>
                      </p>

                    </button>

                  </>

                )}


                {/* =====================================
                    PROBUS
                ====================================== */}

                {PROBUS &&
                  !problemaRede &&
                  !redeAberto &&
                  !equipamentoAberto && (

                    <>

                      <button
                        className={`icones1 ${
                          equipamento ===
                          "Adicionar Empresa"
                            ? "selecionado"
                            : ""
                        }`}

                        onClick={() =>
                          setEquipamento(
                            "Adicionar Empresa"
                          )
                        }
                      >

                        <img src={empresamais} />

                        <p>
                          <b>
                            Adicionar empresa
                          </b>
                        </p>

                      </button>


                      <button
                        className={`icones1 ${
                          equipamento ===
                          "Remover Empresa"
                            ? "selecionado"
                            : ""
                        }`}

                        onClick={() =>
                          setEquipamento(
                            "Remover Empresa"
                          )
                        }
                      >

                        <img src={empresamenos} />

                        <p>
                          <b>
                            Remover empresa
                          </b>
                        </p>

                      </button>


                      <button
                        className={`icones1 ${
                          equipamento ===
                          "Problemas(PROBUS)"
                            ? "selecionado"
                            : ""
                        }`}

                        onClick={() =>
                          setEquipamento(
                            "Problemas(PROBUS)"
                          )
                        }
                      >

                        <img src={geral} />

                        <p>
                          <b>
                            Problemas gerais
                          </b>
                        </p>

                      </button>

                    </>

                  )}


                {/* =====================================
                    REDE
                ====================================== */}

                {redeAberto &&
                  !problemaRede &&
                  !PROBUS && (

                    <>

                      <button
                        className={`icones1 ${
                          equipamento ===
                          "Conexão na rede"
                            ? "selecionado"
                            : ""
                        }`}

                        onClick={() =>
                          setProblemaRede(true)
                        }
                      >

                        <img src={redefalha} />

                        <p>
                          <b>
                            Problemas de rede
                          </b>
                        </p>

                      </button>


                      <button
                        className={`icones1 ${
                          equipamento ===
                          "Adicionar Site"
                            ? "selecionado"
                            : ""
                        }`}

                        onClick={() =>
                          setEquipamento(
                            "Adicionar Site"
                          )
                        }
                      >

                        <img src={addsite} />

                        <p>
                          <b>
                            Adicionar site
                          </b>
                        </p>

                      </button>


                      <button
                        className={`icones1 ${
                          equipamento ===
                          "Rede Lenta"
                            ? "selecionado"
                            : ""
                        }`}

                        onClick={() =>
                          setEquipamento(
                            "Rede Lenta"
                          )
                        }
                      >

                        <img src={redeAviso} />

                        <p>
                          <b>
                            Rede lenta
                          </b>
                        </p>

                      </button>

                    </>

                  )}


                {/* =====================================
                    EQUIPAMENTOS
                ====================================== */}

                {equipamentoAberto && (

                  <>

                    <button
                      className={`icones1 ${
                        equipamento === "mouse"
                          ? "selecionado"
                          : ""
                      }`}

                      onClick={() =>
                        setEquipamento("mouse")
                      }
                    >

                      <img src={mouse} />

                      <p>Mouse</p>

                    </button>


                    <button
                      className={`icones1 ${
                        equipamento === "teclado"
                          ? "selecionado"
                          : ""
                      }`}

                      onClick={() =>
                        setEquipamento("teclado")
                      }
                    >

                      <img src={teclado} />

                      <p>Teclado</p>

                    </button>


                    <button
                      className={`icones1 ${
                        equipamento === "fone"
                          ? "selecionado"
                          : ""
                      }`}

                      onClick={() =>
                        setEquipamento("fone")
                      }
                    >

                      <img src={headset} />

                      <p>Fone</p>

                    </button>


                    <button
                      className={`icones1 ${
                        equipamento === "celular"
                          ? "selecionado"
                          : ""
                      }`}

                      onClick={() =>
                        setEquipamento("celular")
                      }
                    >

                      <img src={cell} />

                      <p>Celular</p>

                    </button>


                    <button
                      className={`icones1 ${
                        equipamento === "impressora"
                          ? "selecionado"
                          : ""
                      }`}

                      onClick={() =>
                        setEquipamento("impressora")
                      }
                    >

                      <img src={impressora} />

                      <p>Impressora</p>

                    </button>


                    <button
                      className={`icones1 ${
                        equipamento === "notebook"
                          ? "selecionado"
                          : ""
                      }`}

                      onClick={() =>
                        setEquipamento("notebook")
                      }
                    >

                      <img src={note} />

                      <p>Notebook</p>

                    </button>


                    <button
                      className={`icones1 ${
                        equipamento === "desktop"
                          ? "selecionado"
                          : ""
                      }`}

                      onClick={() =>
                        setEquipamento("desktop")
                      }
                    >

                      <img src={desk} />

                      <p>Desktop</p>

                    </button>


                    <button
                      className={`icones1 ${
                        equipamento === "outro"
                          ? "selecionado"
                          : ""
                      }`}

                      onClick={() =>
                        setEquipamento("outro")
                      }
                    >

                      <img src={outro} />

                      <p>Outros</p>

                    </button>

                  </>

                )}


                {/* =====================================
                    MENU PRINCIPAL
                ====================================== */}

                {!equipamentoAberto &&
                  !redeAberto &&
                  !PROBUS && (

                    <>

                      <button
                        className={`icones1 ${
                          equipamento ===
                          "equipamentos"
                            ? "selecionado"
                            : ""
                        }`}

                        onClick={() =>
                          setEquipamentoAberto(true)
                        }
                      >

                        <img src={equipamentos} />

                        <p>
                          <b>Aparelhos</b>
                        </p>

                      </button>


                      <button
                        className={`icones1 ${
                          equipamento === "Rede"
                            ? "selecionado"
                            : ""
                        }`}

                        onClick={() =>
                          setRedeAberto(true)
                        }
                      >

                        <img src={rede} />

                        <p>
                          <b>Rede</b>
                        </p>

                      </button>


                      <button
                        className={`icones1 ${
                          equipamento === "PROBUS"
                            ? "selecionado"
                            : ""
                        }`}

                        onClick={() =>
                          setPROBUS(true)
                        }
                      >

                        <img src={logoPROBUS} />

                        <p>
                          <b>ERM</b>
                        </p>

                        <p>
                          <b>(PROBUS)</b>
                        </p>

                      </button>

                    </>

                  )}

              </div>

            </div>


            {/* =====================================
                OPÇÕES DE URGÊNCIA
            ====================================== */}

            <div
              className={`opcoes ${
                equipamentoAberto
                  ? "equipamento"
                  : ""
              }`}
            >

              <div className="dropdown">

                <p className="dica">
                  <b>
                    Por favor selecione a urgência do seu caso:
                  </b>
                </p>


                {!aberto && (

                  <>

                    <button
                      className={`botao ${
                        necessidade
                          ? "desativado"
                          : ""
                      }`}

                      onClick={() => {

                        if (!necessidade) {

                          setAberto(true);

                        }

                      }}
                    >

                      <b>

                        {urgencia

                          ? urgencia
                              .charAt(0)
                              .toUpperCase() +
                            urgencia.slice(1)

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

              </div>


              {aberto && (

                <div className="menu">

                  <div
                    className="leve"

                    onClick={() => {

                      setAberto(false);

                      setUrgencia("baixa");

                      setNecessidade(true);

                    }}
                  >

                    <b>Baixa</b>

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
                    className="urgente"

                    onClick={() => {

                      setAberto(false);

                      setUrgencia("Alta");

                      setNecessidade(true);

                    }}
                  >

                    <b>Alta</b>

                  </div>

                </div>

              )}


              <button
                className={`enviar ${
                  enviando
                    ? "desativado"
                    : ""
                }`}

                onClick={() => {

                  if (!enviando) {

                    enviarDados();

                  }

                }}
              >

                <b>
                  {enviando
                    ? "Enviando..."
                    : "Enviar"}
                </b>

              </button>

            </div>

          </div>


          {/* =====================================
              DESCRIÇÃO
          ====================================== */}

          <div className="desc">

            <b>
              Descrição do problema
            </b>


            <textarea
              className="descInput"

              placeholder="Descreva o problema..."

              rows="3"

              spellCheck="false"

              value={descricao}

              onChange={(e) =>
                setDescricao(e.target.value)
              }

              onFocus={() =>
                setFocusText(true)
              }

              onBlur={() =>
                setFocusText(false)
              }

            />

          </div>

        </>

      )}

    </>

  );
}

export default App;