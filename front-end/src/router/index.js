import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
