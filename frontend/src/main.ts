import { createApp } from 'vue';
import App from '../../frontend/App.vue';
import router from '../../backend/router';
import store from './store/store'; 

const app = createApp(App);

app.use(router);
app.use(store); // Certifique-se de usar o store

app.mount('#app');