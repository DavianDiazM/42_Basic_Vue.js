import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";
import { VueSpinners } from "@saeris/vue-spinners"; //Cuando lo instale lo force, porque esta viejito, asi que puede que de bateo
//Falta instalar el Chart.js
import router from "./router";

createApp(App)
  .use(router)
  .use(VueSpinners)
  .use(Chartkick.use(Chart))
  .mount("#app");
