import { createRouter, createWebHistory } from 'vue-router'
import Test from '../views/test.vue'
import SignupView from '@/views/SignupView.vue'
import Chat from '../views/chat.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Chat
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    }
  ]
})

export default router
