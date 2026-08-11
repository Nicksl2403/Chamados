import { useState, useEffect } from "react";
import { BrowserRouter, useResolvedPath } from "react-router-dom";
import "./index.css";
import teclado from "./assets/Teclado.svg";
import mouse from "./assets/Mouse.svg";
import headset from "./assets/Headseat.svg";
function App() {
  const [aberto, setAberto] = useState(false);
  const [valor, setValor] = useState("");
  const [necessidade, setNecessidade] = useState(false);
  const [selecionadoMouse, setSelecionadoMouse] = useState(false);
  const [selecionadoTeclado, setSelecionadoTeclado] = useState(false);
  const [selecionadoHeadseat, setSelecionadoHeadseat] = useState(false);
  useEffect(() => {
    console.log(valor);
  }, [valor]);
  return (
    <>
      <div className="fundo">
        <div className="box">
          <div className="box2">
            <div className={`icones1${selecionadoMouse ? " selecionado" : ""}`}>
              <img
                src={mouse}
                width="100px"
                onClick={() => {
                  setSelecionadoTeclado(false);
                  setSelecionadoHeadseat(false);
                  setSelecionadoMouse(true);
                }}
              ></img>
            </div>
            <div
              className={`icones1${selecionadoTeclado ? " selecionado" : ""}`}
            >
              <img
                src={teclado}
                width="100px"
                onClick={() => {
                  setSelecionadoMouse(false);
                  setSelecionadoHeadseat(false);
                  setSelecionadoTeclado(true);
                }}
              ></img>
            </div>
            <div
              className={`icones1${selecionadoHeadseat ? " selecionado" : ""}`}
            >
              <img
                src={headset}
                width="90px"
                onClick={() => {
                  setSelecionadoMouse(false);
                  setSelecionadoTeclado(false);
                  setSelecionadoHeadseat(!selecionadoHeadseat);
                }}
              ></img>
            </div>
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
              <div
                className={`botao${necessidade ? " desativado" : ""}`}
                onClick={() => {
                  if (!necessidade) {
                    setAberto(!aberto);
                  }
                }}
              >
                <b>Selecione</b>
              </div>
              {necessidade && (
                <div
                  className="botaoReset"
                  onClick={() => setNecessidade(false)}
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
                  setValor("urgente");
                  setNecessidade(true);
                }}
              >
                <b>Urgente</b>
              </div>
              <div
                className="medio"
                onClick={() => {
                  setAberto(false);
                  setValor("medio");
                  setNecessidade(true);
                }}
              >
                <b>Médio</b>
              </div>
              <div
                className="leve"
                onClick={() => {
                  setAberto(false);
                  setValor("leve");
                  setNecessidade(true);
                }}
              >
                <b>Leve</b>
              </div>
            </div>
          )}
        </div>
        <div className="enviar" onClick={() => {
          alerta = alert("Dados Enviados")
         }}><b>Enviar</b></div>
        </div>
           <div className="desc">
          <b>Descrição do problema</b>
          <textarea
            className="descInput"
            placeholder="Descreva o problema..."
            rows="3"
          ></textarea>
         </div>
    </>
  );
}

export default App;
