// src/controllers/pedidosController.js
import connection from '../conexao/banco.js';

export const getAllOrders = (req, res) => {
  connection.query('SELECT * FROM pedidos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

export const addOrder = (req, res) => {
  const { size, flavor, date } = req.body;
  connection.query('INSERT INTO pedidos (size, flavor, date) VALUES (?, ?, ?)', [size, flavor, date], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, size, flavor, date });
  });
};

export const updateOrder = (req, res) => {
  const { id } = req.params;
  const { size, flavor, date } = req.body;
  connection.query('UPDATE pedidos SET size = ?, flavor = ?, date = ? WHERE id = ?', [size, flavor, date, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ id, size, flavor, date });
  });
};

export const deleteOrder = (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM pedidos WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send();
  });
};
