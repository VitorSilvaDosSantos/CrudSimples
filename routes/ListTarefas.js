const express = require('express')
const router = express.Router()

// Lista de tarefas
let listaTarefas = [
    {
        id: 1,
        descricao: "Comprar leite",
        concluida: false
    },
    {
        id: 2,
        descricao: "Estudar para o exame",
        concluida: false
    },
    {
        id: 3,
        descricao: "Fazer exercícios de programação",
        concluida: true
    }
]

// READ -> Buscar todas as tarefas
router.get('/tarefas', (req, res) => {
    res.json(listaTarefas)
})

// READ -> Buscar a tarefa pelo ID
router.get('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const tarefa = listaTarefas.find(tarefa => tarefa.id === id)
    if (!tarefa) {
        res.status(404).json({ mensagem: "Tarefa não encontrada" })
    } else {
        res.json(tarefa)
    }
})

// CREATE -> Criar uma nova tarefa
router.post('/tarefas', (req, res) => {
    const novaTarefa = req.body

    const tarefa = {
        id: listaTarefas.length > 0 ? listaTarefas[listaTarefas.length - 1].id + 1 : 1,
        descricao: novaTarefa.descricao,
        concluida: novaTarefa.concluida || false
    }

    listaTarefas.push(tarefa)

    res.status(201).json({ mensagem: "Tarefa cadastrada com sucesso!" })
})

// DELETE -> Deletar uma tarefa
router.delete('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = listaTarefas.findIndex(tarefa => tarefa.id === id)
    if (index === -1) {
        res.status(404).json({ mensagem: "Tarefa não encontrada" })
    } else {
        listaTarefas.splice(index, 1)
        res.json({ mensagem: "Tarefa excluída com sucesso" })
    }
})

// UPDATE -> Atualizar uma tarefa
router.put('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const novosDados = req.body

    const index = listaTarefas.findIndex(tarefa => tarefa.id === id)

    if (index === -1) {
        res.status(404).json({ mensagem: "Tarefa não encontrada" })
    } else {
        listaTarefas[index] = {
            id: id,
            descricao: novosDados.descricao,
            concluida: novosDados.concluida || false
        }
        res.json({ mensagem: "Tarefa atualizada com sucesso!" })
    }
})

module.exports = router
