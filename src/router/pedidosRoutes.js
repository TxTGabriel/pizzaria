import express from 'express';
import { getAllOrders, addOrder, updateOrder, deleteOrder } from '../controllers/pedidosController.js';

const router = express.Router();

router.get('/', getAllOrders);
router.post('/', addOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
