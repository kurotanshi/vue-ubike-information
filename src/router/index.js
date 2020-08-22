import { createRouter, createWebHistory } from 'vue-router'
import List from '../views/List.vue';

const routes = [
  {
    path: '/',
    name: 'List',
    component: List
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../views/Map.vue')
  }
]

//const publicPath = (process.env.NODE_ENV === 'production') ? '/vue-ubike-information/complete/' : process.env.BASE_URL;

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
