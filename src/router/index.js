import { createRouter, createWebHistory } from 'vue-router'
import Test from '@/views/test.vue'
import SignupView from '@/views/SignupView.vue'
import ChatView from '@/views/ChatView.vue'
import SignUpTest from '@/views/SignUpTest.vue'

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
		},
		{
			path: '/signup',
			name: 'signup',
			component: SignupView
		},
		{
			path: '/signup-test',
			name: 'signup-test',
			component: SignUpTest
		}
	]
})

export default router
