const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',       // endereço do banco de dados
    user: process.env.DB_USER || 'root',            // seu usuário do banco
    password: process.env.DB_PASSWORD || 'Banco_2025',  // sua senha do banco
    database: process.env.DB_NAME || 'meubanco',    // nome do banco de dados
    port: process.env.DB_PORT || 3306               // porta do banco (opcional)
});

module.exports = pool.promise();

