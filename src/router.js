import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue"; // Importa tus componentes de vista
import About from "./views/About.vue";
import Error from "./views/Error.vue";
import CoinDetail from "./views/CoinDetail.vue";
const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/about", name: "about", component: About },
  { path: "/:catchAll(.*)", name: "error", component: Error },
  { path: "/coin/:id", name: "coin-detail", component: CoinDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
