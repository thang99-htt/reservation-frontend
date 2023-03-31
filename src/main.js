import { createApp } from 'vue';
import App from './App.vue';
import VueSweetalert2 from 'vue-sweetalert2';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import './assets/responsive.css';
import './assets/admin.css';
import './assets/style.css';
import './assets/styles.css';
import './assets/main_styles.css';

import router from "./router";


createApp(App).use(router).use(VueSweetalert2).mount("#app");
