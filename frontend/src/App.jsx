import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  //const api = import.meta.env.PORTA_FRONTEND + "/tarefas";
  const API = import.meta.env.VITE_API_URL;

  // Carrega tarefas ao iniciar
  useEffect(() => {
    buscarTarefas();
  }, []);

const buscarTarefas = async () => {
  try {
    const resposta = await fetch(`${API}/tarefas`);

    const raw = await resposta.text();
    console.log("RAW RESPONSE:", raw);

    let json;
    try {
      json = JSON.parse(raw);
    } catch (e) {
      console.error("ERRO: Backend não retornou JSON válido!");
      setTarefas([]);
      return;
    }

    console.log("JSON PARSED:", json);
    console.log("É array?", Array.isArray(json));

    if (!Array.isArray(json)) {
      console.error("ERRO: Backend retornou algo que NÃO é array!");
      setTarefas([]);
      return;
    }

    setTarefas(json);
  } catch (erro) {
    console.error("Erro ao buscar tarefas:", erro);
    setTarefas([]);
  }
};

  const adicionarTarefa = async () => {
    if (!novaTarefa.trim()) return;
    await axios.post(`${API}/tarefas`, { titulo: novaTarefa });
    setNovaTarefa("");
    buscarTarefas();
  };

  const alternarStatus = async (id, concluida) => {
    await axios.put(`${API}/tarefas/${id}`, { concluida: !concluida });
    buscarTarefas();
  };

  const removerTarefa = async (id) => {
    await axios.delete(`${API}/tarefas/${id}`);
    buscarTarefas();
  };

  return (
    <div style={{ margin: "40px auto", width: "400px", textAlign: "center" }}>
      <h2>📋 Minhas Tarefas</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Digite uma nova tarefa"
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tarefas.map((t) => (
          <li key={t.id} style={{ margin: "10px 0" }}>
            <span
              onClick={() => alternarStatus(t.id, t.concluida)}
              style={{
                textDecoration: t.concluida ? "line-through" : "none",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              {t.titulo}
            </span>
            <button onClick={() => removerTarefa(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
