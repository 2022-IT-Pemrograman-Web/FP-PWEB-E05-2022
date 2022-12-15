import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/tickets",
    name: "tickets",
    component: () => import("../views/TicketsView.vue"),
  },
  {
    path: "/tickets/:id",
    name: "detailticket",
    params: true,
    component: () => import("../views/DetailTicketView.vue"),
  },
  {
    path: "/tickets/add",
    name: "addticket",
    component: () => import("../views/AddView.vue"),
  },
  {
    path: "/orders",
    name: "orderSummary",
    component: () => import("../views/OrderSummary.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
