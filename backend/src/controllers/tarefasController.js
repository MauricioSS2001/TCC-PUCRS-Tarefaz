const tarefaModel = require('../models/tarefasModel');

exports.criarTarefa = (req, res) => {
  const nova = tarefaModel.criar(req.body);
  res.status(201).json(nova);
};

exports.listarTarefas = (req, res) => {
  res.json(tarefaModel.listar());
};

exports.buscarTarefa = (req, res) => {
  const tarefa = tarefaModel.buscarPorId(req.params.id);
  tarefa ? res.json(tarefa) : res.status(404).json({ erro: 'Tarefa não encontrada' });
};

exports.atualizarTarefa = (req, res) => {
  const tarefa = tarefaModel.atualizar(req.params.id, req.body);
  tarefa ? res.json(tarefa) : res.status(404).json({ erro: 'Tarefa não encontrada' });
};

exports.removerTarefa = (req, res) => {
  const removida = tarefaModel.remover(req.params.id);
  removida ? res.json(removida) : res.status(404).json({ erro: 'Tarefa não encontrada' });
};

exports.concluirTarefa = (req, res) => {
  const tarefa = tarefaModel.concluir(req.params.id);
  tarefa ? res.json(tarefa) : res.status(404).json({ erro: 'Tarefa não encontrada' });
};