import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import ('../views/HomeView.vue')
  },
  {
    path: '/admin-panel',
    name: 'Admin Panel',
    component: () => import ('../views/AdminPanelView.vue')
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import ('../views/CourseListView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
