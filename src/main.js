import { createApp } from 'vue';
import App from './App.vue';
import store from "./vuex";
import VueSweetalert2 from 'vue-sweetalert2';
import VueApexCharts from 'vue3-apexcharts';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import './assets/responsive.css';
import './assets/admin.css';
import './assets/style.css';
import './assets/styles.css';
import './assets/main_styles.css';

import router from "./router";


const app = createApp(App)

app.use(router)
   .use(store)
   .use(VueSweetalert2)
   .use(VueApexCharts)
   .mount('#app')