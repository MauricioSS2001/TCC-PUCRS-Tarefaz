const fs = require('fs');
const path = require('path');
const arquivo = path.join(__dirname, '../data/tarefas.json');

function lerTarefas() {
  if (!fs.existsSync(arquivo)) return [];
  const dados = fs.readFileSync(arquivo, 'utf8');
  return JSON.parse(dados || '[]');
}

function salvarTarefas(tarefas) {
  fs.writeFileSync(arquivo, JSON.stringify(tarefas, null, 2));
}

exports.listar = () => lerTarefas();

exports.buscarPorId = (id) => {
  const tarefas = lerTarefas();
  return tarefas.find(t => t.id == id);
};

exports.criar = (dados) => {
  const tarefas = lerTarefas();
  const nova = {
    id: Date.now().toString(),
    titulo: dados.titulo,
    descricao: dados.descricao || '',
    concluida: false,
    criadaEm: new Date().toISOString()
  };
  tarefas.push(nova);
  salvarTarefas(tarefas);
  return nova;
};

exports.atualizar = (id, novosDados) => {
  const tarefas = lerTarefas();
  const index = tarefas.findIndex(t => t.id == id);
  if (index === -1) return null;
  tarefas[index] = { ...tarefas[index], ...novosDados };
  salvarTarefas(tarefas);
  return tarefas[index];
};

exports.remover = (id) => {
  const tarefas = lerTarefas();
  const index = tarefas.findIndex(t => t.id == id);
  if (index === -1) return null;
  const removida = tarefas.splice(index, 1)[0];
  salvarTarefas(tarefas);
  return removida;
};

exports.concluir = (id) => {
  const tarefas = lerTarefas();
  const tarefa = tarefas.find(t => t.id == id);
  if (!tarefa) return null;
  tarefa.concluida = true;
  salvarTarefas(tarefas);
  return tarefa;
};
