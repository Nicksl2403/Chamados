import { useEffect, useState } from "react";
import "./indexADM.css";

function Admin() {
  const [chamados, setChamados] = useState([]);

  const [equipamento, setEquipamento] = useState("Notebook");
  const [urgencia, setUrgencia] = useState("leve");
  const [descricao, setDescricao] = useState("");

  const [carregando, setCarregando] = useState(false);

  // ==========================================
  // BUSCAR CHAMADOS
  // ==========================================
  async function resetarChamados() {
    const confirmar = window.confirm(
      "Tem certeza? Isso vai apagar TODOS os chamados.",
    );
    if (!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(
        "http://localhost:3000/api/chamados/resetar",
        {
          method: "DELETE",
        },
      );

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
  async function buscarChamados() {
    try {
      const resposta = await fetch("http://localhost:3000/api/chamados", {
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
    }
  }

  // ==========================================
  // BUSCAR AUTOMATICAMENTE AO ABRIR A PÁGINA
  // ==========================================

  useEffect(() => {
    buscarChamados();

    const intervalo = setInterval(() => {
        buscarChamados();
    }, 5000);

    return () => {
        clearInterval(intervalo);
    };
  }, []);

  async function deletar(id) {
    const confirmar = window.confirm(
      `Tem certeza que deseja deletar o chamado #${id}?`,
    );

    if (!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(`http://localhost:3000/api/chamados/${id}`, {
        method: "DELETE",
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro);
        return;
      }

      alert(dados.mensagem);

      // Remove da tela imediatamente
      setChamados(chamados.filter((chamado) => chamado.id !== id));
    } catch (erro) {
      console.error(erro);

      alert("Erro ao conectar com o servidor.");
    }
  }

  return (
    <div className="tudo">
      <div className="admin">
        <header className="adminHeader">
          <button className="atualizar" onClick={() => resetarChamados()}>Resetar IDS</button>
          <h1>Gerenciamento de Chamados</h1>

          <button className="atualizar" onClick={buscarChamados}>
            Atualizar
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
                    <span><b>Urgência: </b></span>
                    <span className={`urgencia ${chamado.urgencia}`}>
                      {chamado.urgencia}
                    </span>
                    <span><b>Status: </b></span>
                    <span className="status">{chamado.status}</span>
                  </div>

                  <div className="chamadoInfo">
                    <h3>
                    <span><b>Problema: </b></span>
                    <b>{chamado.equipamento.toUpperCase()}</b></h3>
                    <span><b>Descrição: </b></span>
                    <p>{chamado.descricao}</p>
                  </div>

                  <div className="chamadoRodape">
                    <span>
                      {chamado.data_criacao
                        ? new Date(chamado.data_criacao).toLocaleString("pt-BR")
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
      </div>
    </div>
  );
}

export default Admin;
