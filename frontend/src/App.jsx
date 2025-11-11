import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const api = "http://localhost:3000/tarefas";

  // Carrega tarefas ao iniciar
  useEffect(() => {
    buscarTarefas();
  }, []);

  const buscarTarefas = async () => {
    const res = await axios.get(api);
    setTarefas(res.data);
  };

  const adicionarTarefa = async () => {
    if (!novaTarefa.trim()) return;
    await axios.post(api, { titulo: novaTarefa });
    setNovaTarefa("");
    buscarTarefas();
  };

  const alternarStatus = async (id, concluida) => {
    await axios.put(`${api}/${id}`, { concluida: !concluida });
    buscarTarefas();
  };

  const removerTarefa = async (id) => {
    await axios.delete(`${api}/${id}`);
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
