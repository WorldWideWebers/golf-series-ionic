import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home-page",
    component: HomePage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/admin-panel",
    name: "admin-panel",
    component: () => import("../views/AdminPanel.vue"),
  },
  {
    path: "/edit-user",
    name: "edit-user",
    component: () => import("../views/UserEdit.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterPage.vue"),
  },
  {
    path: "/course-list",
    name: "course-list",
    component: () => import("../views/CourseList.vue"),
  },
  {
    path: "/add-course",
    name: "add-course",
    component: () => import("../views/CourseAdd.vue"),
  },
  {
    path: "/view-course/:id",
    name: "view-course",
    component: () => import("../views/CourseView.vue"),
  },
  {
    path: "/edit-course/:id",
    name: "edit-course",
    component: () => import("../views/CourseEdit.vue"),
  },
  {
    path: "/series-list",
    name: "series-list",
    component: () => import("../views/SeriesList.vue"),
  },
  {
    path: "/add-series",
    name: "add-series",
    component: () => import("../views/SeriesAdd.vue"),
  },
  {
    path: "/view-series/:id",
    name: "view-series",
    component: () => import("../views/SeriesView.vue"),
  },
  {
    path: "/edit-series/:id",
    name: "edit-series",
    component: () => import("../views/SeriesEdit.vue"),
  },
  {
    path: "/add-event/:seriesId",
    name: "add-event",
    component: () => import("../views/EventAdd.vue"),
  },
  {
    path: "/view-event/:seriesId/:eventId",
    name: "view-event",
    component: () => import("../views/EventView.vue"),
  },
  {
    path: "/edit-event/:seriesId/:eventId",
    name: "edit-event",
    component: () => import("../views/EventEdit.vue"),
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
