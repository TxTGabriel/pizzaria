import { Service } from 'moleculer';
import connection from '../conexao/banco.js'; // Importa a conexão com o banco de dados
import dayjs from 'dayjs';


export default {
  name: 'orders',
  actions: {
    async create(ctx) {
      const { size, flavor } = ctx.params;
      const created_at = dayjs().format('YYYY-MM-DD HH:mm:ss');      

      return new Promise((resolve, reject) => {
        try{
        connection.query(
          'INSERT INTO pedidos (size, flavor, created_at) VALUES (?, ?, ?)',
          [size, flavor, created_at],
          (error, results) => {
            if (error) {
              console.error('Erro ao inserir pedido:', error);
              reject(error);
            } else {
              resolve({ id: results.insertId, size, flavor, created_at});
            }
          }
        );
        } catch(error)
        {
          this.erro = error;
        }
      });
    },

    async list() {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM pedidos', (error, results) => {
          if (error) {
            console.error('Erro ao buscar pedidos:', error);
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    },

    async remove(ctx) {
      const { id } = ctx.params;
      return new Promise((resolve, reject) => {
        connection.query('DELETE FROM pedidos WHERE id = ?', [id], (error, results) => {
          if (error) {
            console.error('Erro ao excluir pedido:', error);
            reject(error);
          } else if (results.affectedRows > 0) {
            resolve({ message: 'Pedido excluído com sucesso' });
          } else {
            resolve({ error: 'Pedido não encontrado' });
          }
        });
      });
    }
  }
};
