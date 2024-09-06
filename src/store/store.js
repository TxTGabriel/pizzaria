// src/store/store.js
import { createStore } from 'vuex';
import axios from 'axios';
import dayjs from 'dayjs';

export default createStore({
  state: {
    orders: [],
  },
  mutations: {
    SET_ORDERS(state, orders) {
      state.orders = orders;
    },
    ADD_ORDER(state, order) {
      state.orders.push(order);
    },
    DELETE_ORDER(state, orderId) {
      state.orders = state.orders.filter(order => order.id !== orderId);
    },
  },
  actions: {
    async fetchOrders({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/api/orders');
        commit('SET_ORDERS', response.data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    },
    async saveOrder({ commit }, order) {
      try {
        const response = await axios.post('http://localhost:3000/api/orders', { order });
        commit('ADD_ORDER', response.data);
      } catch (error) {
        console.error('Erro ao salvar pedido:', error);
      }
    },
    async deleteOrder({ commit }, orderId) {
      try {
        await axios.delete(`http://localhost:3000/api/orders/${orderId}`);
        commit('DELETE_ORDER', orderId);
      } catch (error) {
        console.error('Erro ao excluir pedido:', error);
      }
    },
  },
  getters: {
    allOrders: state => state.orders,
  },
});
