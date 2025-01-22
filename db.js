const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',       // endereço do banco de dados
    user: 'root',            // seu usuário do banco
    password: 'Banco_2025',  // sua senha do banco
    database: 'meubanco'     // nome do banco de dados
});

module.exports = pool.promise();
