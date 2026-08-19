import { useEffect, useState } from "react";
import "./indexADM.css";
import "./naologado.css";

const URL_BACKEND = "http://localhost:3000";
function Admin() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [focus, setFocus] = useState(false);
  const [chamados, setChamados] = useState([]);
  const [logado, setLogado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function buscarChamados() {
    try {
      setCarregando(true);

      const resposta = await fetch(`${URL_BACKEND}/api/chamados`, {
        method: "GET",
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro);
        return;
      }

      setChamados(dados);
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }
  async function testaLogin() {
    const nomeTeste = nome.toLowerCase();
    const retorno = await fetch(`${URL_BACKEND}/api/senha`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        nome: nomeTeste,
        senha: senha,
      }),
    });
    const obj = await retorno.json();
    if (retorno.ok && obj.sucesso) {
      setLogado(true);
    } else {
      alert("Nome/Senha Invalidos");
    } 
  }
  async function resetarChamados() {
    const confirmar = window.confirm(
      "Tem certeza? Isso vai apagar TODOS os chamados.",
    );

    if (!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(`${URL_BACKEND}/api/chamados/resetar`, {
        method: "DELETE",
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro);
        return;
      }

      setChamados([]);
      alert(dados.mensagem);
    } catch (erro) {
      console.error(erro);
      alert("Erro ao resetar chamados.");
    }
  }

  async function deletar(id) {
    const confirmar = window.confirm(
      `Tem certeza que deseja deletar o chamado #${id}?`,
    );

    if (!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(`${URL_BACKEND}/api/chamados/${id}`, {
        method: "DELETE",
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro);
        return;
      }

      alert(dados.mensagem);

      setChamados(chamados.filter((chamado) => chamado.id !== id));
    } catch (erro) {
      console.error(erro);
      alert("Erro ao conectar com o servidor.");
    }
  }

  useEffect(() => {
    buscarChamados();
    const Enter = (evento) => {
      if (evento.key === "Enter" && !focus && !logado) {
        testaLogin();
      }
    };
    const intervalo = setInterval(() => {
      buscarChamados();
    }, 5000);
    window.addEventListener("keydown", Enter);
    return () => {
      clearInterval(intervalo);
      window.removeEventListener("keydown", Enter);
    };
  }, [focus]);

  return (
    <div className="tudo">
      <div className="admin">
        {!logado && (
          <>
            <div className="centralizar">
              <div className="caixa">
                <p>Login Painel Admin</p>
                <div className="inputs">
                  <input
                    spellCheck="false"
                    placeholder="Digite seu nome"
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  ></input>
                  <input
                  spellCheck="false"
                    type="password"
                    placeholder="Digite sua senha"
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  ></input>
                </div>
                <button onClick={() => {
                  testaLogin();
                }}>Enviar</button>
              </div>
            </div>
          </>
        )}
        {logado && (
          <>
            <header className="adminHeader">
              <button className="atualizar" onClick={resetarChamados}>
                Resetar IDS
              </button>

              <h1>Gerenciamento de Chamados</h1>

              <button className="atualizar" onClick={buscarChamados}>
                {carregando ? "Atualizando..." : "Atualizar"}
              </button>
            </header>

            <section className="lista">
              <div className="listaTitulo">
                <h2>Chamados</h2>

                <span>{chamados.length} chamados</span>
              </div>

              {chamados.length === 0 ? (
                <div className="vazio">Nenhum chamado cadastrado.</div>
              ) : (
                <div className="chamados">
                  {chamados.map((chamado) => (
                    <div className="chamado" key={chamado.id}>
                      <div className="chamadoTopo">
                        <strong>ID: {chamado.id}</strong>

                        <span>
                          <b>Urgência: </b>
                        </span>

                        <span
                          className={`urgencia ${chamado.urgencia.toLowerCase()}`}
                        >
                          {chamado.urgencia}
                        </span>

                        <span>
                          <b>Status: </b>
                        </span>

                        <span className="status">{chamado.status}</span>
                      </div>

                      <div className="chamadoInfo">
                        <h3>
                          <span
                            style={{
                              color: "black",
                            }}
                          >
                            <b>Problema: </b>
                          </span>

                          <b>{chamado.equipamento.toUpperCase()}</b>
                        </h3>

                        <span>
                          <b>Descrição: </b>
                        </span>

                        <p>{chamado.descricao}</p>
                      </div>

                      <div className="chamadoRodape">
                        <span>
                          {chamado.data_criacao
                            ? new Date(chamado.data_criacao).toLocaleString(
                                "pt-BR",
                              )
                            : ""}
                        </span>

                        <button
                          className="deletar"
                          onClick={() => deletar(chamado.id)}
                        >
                          Deletar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;
