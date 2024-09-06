import { createRouter, createWebHistory } from 'vue-router';
import Inicio from '../views/Inicio.vue';
import Pedido from '../views/Pedido.vue';
import Historico from '../views/Historico.vue';

const routes = [
  { path: '/', component: Inicio, name: 'Inicio' },
  { path: '/pedido', component: Pedido, name: 'Pedido' },
  { path: '/historico', component: Historico, name: 'Historico' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
