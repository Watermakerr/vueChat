import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axiosInstance from '@/api/axios.js'
import SignupView from '@/views/SignupView.vue'
import ChatView from '@/views/ChatView.vue'
import Login from '@/views/Login.vue'
import Notification from '@/views/Notification.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: ChatView
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/signup',
			name: 'signup',
			component: SignupView
		},
		{
			path: '/notification',
			name: 'notification',
			component: Notification
		}
	]
})

// router.beforeEach(async (to, from, next) => {
// 	const auth = useAuthStore()
// 	console.log(auth.isAuthenticated)

// 	if (to.name !== 'login' && to.name !== 'signup' && !auth.isAuthenticated) {
// 		next({ name: 'login' })
// 	} else if (
// 		(to.name === 'login' || to.name === 'signup') &&
// 		auth.isAuthenticated
// 	) {
// 		next({ name: 'home' })
// 	} else if (auth.accessToken && !auth.isAuthenticated) {
// 		try {
// 			await axiosInstance.get('/api/v1/validate-token/', {
// 				headers: { Authorization: `Bearer ${auth.accessToken}` }
// 			})
// 			next()
// 		} catch (error) {
// 			if (auth.refreshToken) {
// 				try {
// 					const response = await axiosInstance.post('/api/v1/refresh-token/', {
// 						refresh: auth.refreshToken
// 					})
// 					auth.login(response.data.access, auth.refreshToken)
// 					next()
// 				} catch (error) {
// 					auth.logout()
// 					next({ name: 'login' })
// 				}
// 			} else {
// 				auth.logout()
// 				next({ name: 'login' })
// 			}
// 		}
// 	} else {
// 		next()
// 	}
// })

export default router
