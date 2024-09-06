<template>
  <div class="historico">
    <h2>Histórico de Pedidos</h2>
    <div v-if="orders.length > 0">
      <table>
        <thead>
          <tr>
            <th>Tamanho</th>
            <th>Sabor</th>
            <th>Data e Hora</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.size }}</td>
            <td>{{ order.flavor }}</td>
            <td>{{ formatarData(order.created_at) }}</td>
            <td>
              <button @click="editOrder(order)">Editar</button>
              <button @click="deleteOrder(order.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Nenhum pedido registrado.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import dayjs from 'dayjs';

const store = useStore();
const orders = computed(() => store.getters.allOrders);


const formatarData =(date) => {
  return dayjs(date).format('YYYY/MM/DD HH:mm:ss')
}      

onMounted(() => {
  store.dispatch('fetchOrders');
});

const editOrder = (order) => {
  const updatedOrder = prompt('Editar pedido (formato: Tamanho, Sabor)', `${order.size}, ${order.flavor}`);
  if (updatedOrder) {
    const [size, flavor] = updatedOrder.split(',').map(item => item.trim());
    formatarData(store.dispatch('saveOrder', { ...order, size, flavor}));
  }
};

const deleteOrder = (orderId) => {
  if (confirm('Tem certeza de que deseja excluir este pedido?')) {
    store.dispatch('deleteOrder', orderId);
  }
};
</script>

<style scoped>
.historico {
  max-width: 800px;
  margin: 250px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

button {
  background-color: #4CAF50; /* Cor do botão */
  color: white;
  border: none;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049; /* Cor do botão ao passar o mouse */
}
</style>
