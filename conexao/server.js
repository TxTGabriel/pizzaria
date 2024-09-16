import express from 'express';
import cors from 'cors';
import connection from './banco.js';  

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/orders', (req, res) => {
  connection.query('SELECT * FROM orders', (err, results) => {
    if (err) {
      console.error('Erro ao buscar pedidos:', err);
      return res.status(500).send('Erro ao buscar pedidos.');
    }
    res.json(results);
  });
});

app.post('/api/orders', (req, res) => {
  console.log(req.body);
  const { order } = req.body;   

  if (!order || !order.size || !order.flavor) {
   return res.status(400).send('Dados do pedido inválidos.');
  }
      


  connection.query('INSERT INTO orders SET ?', order, (err, results) => {
    if (err) {
      console.error('Erro ao salvar pedido:', err);
      return res.status(500).send('Erro ao salvar pedido.');
      
    }
    res.json({ id: results.insertId, order});
  });
});

app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM orders WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao excluir pedido:', err);
      return res.status(500).send('Erro ao excluir pedido.');
    }
    res.sendStatus(204);
  });
});

app.put('/api/orders/:id', (req, res) => {
  const {id} = req.params;
  if (!req.body || !req.body.order){
    return res.status(400).send('Dados do pedido inválidos.')
  }
  const { size, flavor} = req.body.order;
  if(!size || !flavor){
    return res.status(400).send('Dados do pedido inválidos.')
  }
  connection.query(
    'UPDATE orders SET size = ?, flavor = ? WHERE id = ?',
    [size, flavor, id],
    (err, results) => {
      if (err){
        console.error('Erro ao atualizar pedido: ', err);
        return res.status(500).send('Erro ao atualizar pedido.');
      }
      if (results.affectedRows > 0){
        res.json ({ id, size, flavor})
        
      } else {
        res.status(404).send('Pedido não encontrado');
      }
    }
  )
})

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
