import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
	  strict: true,
    },
    {
      path: "/country/:id",
      name: "country",
      component: () => import("../views/CountryView.vue"),
    }
  ]
})

export default router
