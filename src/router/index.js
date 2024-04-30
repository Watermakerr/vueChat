import { createRouter, createWebHistory } from 'vue-router'
import Test from '@/views/test.vue'
import SignupView from '@/views/SignupView.vue'
import ChatView from '@/views/ChatView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/:catchAll(.*)',
			name: 'home',
			component: ChatView,
			alias: ['/chat', '/chat/:id']
		},
		{
			path: '/test',
			name: 'test',
			component: Test
		}
	]
})

export default router
