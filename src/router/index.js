import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/poll.vue'
 const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
   ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
