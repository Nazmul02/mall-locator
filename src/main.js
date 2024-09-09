import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css'; // Import Tailwind CSS
import '@fortawesome/fontawesome-free/css/all.css'; // Import FontAwesome

createApp(App).use(router).mount('#app');
