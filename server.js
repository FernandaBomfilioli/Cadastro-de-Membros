
const express = require('express');
const pool = require('./db'); // Importa a conexão com o banco
const app = express();

app.use(express.json()); // Permite trabalhar com JSON no corpo da requisição
app.use(express.static('public')); // Serve o front-end na pasta "public"

const PORT = 3002;

// Rota para cadastrar membros
app.post('/membros', async (req, res) => {
    const { nome, data_nascimento, telefone, endereco } = req.body;

    // Validação básica
    if (!nome || !data_nascimento || !telefone || !endereco) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO membros (nome, data_nascimento, telefone, endereco) VALUES (?, ?, ?, ?)',
            [nome, data_nascimento, telefone, endereco]
        );
        res.status(201).json({ message: 'Membro cadastrado com sucesso.', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar membro.', details: error.message });
    }
});

// Rota para listar membros
app.get('/membros', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, nome, data_nascimento, telefone, endereco FROM membros');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar membros.', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
