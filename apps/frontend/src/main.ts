import { createApp } from 'vue';
import App from './App.vue';
import './main.css';
import router from './router';
import { setupPinia } from './stores';

const app = createApp(App);
app.use(router);
setupPinia(app);

app.mount('#app');
