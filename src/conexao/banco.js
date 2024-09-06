// src/conexao/banco.js
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'pizzaria'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como ID ' + connection.threadId);
});

export default connection;
