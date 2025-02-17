import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import OtherView from '@/views/SlsBonusView.vue'
import CalcView from '@/views/CalcView.vue'
import SlsBonusView from '@/views/SlsBonusView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/sls-bns',
      name: 'sls-bns',
      component: SlsBonusView,
    },
    {
      path: '/vw-calc',
      name: 'vw-calc',
      component: CalcView
    }
  ],
})

export default router
