import { createApp } from 'vue';
import App from '../src/views/App.vue';
import router from '../router';
import store from '../Controller/ControllerStore'; 

const app = createApp(App);

app.use(router);
app.use(store); // Certifique-se de usar o store

app.mount('#app');