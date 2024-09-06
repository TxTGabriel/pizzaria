import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store'; // Certifique-se de importar o store

const app = createApp(App);

app.use(router);
app.use(store); // Certifique-se de usar o store

app.mount('#app');