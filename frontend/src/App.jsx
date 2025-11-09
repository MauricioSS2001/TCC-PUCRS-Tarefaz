import { useState, useEffect } from "react";

function App() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tarefas")
      .then(res => res.json())
      .then(data => setTarefas(data))
      .catch(err => console.error("Erro ao buscar tarefas:", err));
  }, []);

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <ul>
        {tarefas.map(t => (
          <li key={t.id}>
            <strong>{t.titulo}</strong> - {t.concluida ? "✅" : "⏳"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
