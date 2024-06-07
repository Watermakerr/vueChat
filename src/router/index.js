import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axiosInstance from '@/api/axios.js'
import SignupView from '@/views/SignupView.vue'
import ChatView from '@/views/ChatView.vue'
import Login from '@/views/Login.vue'
import ChangePassword from '@/views/ChangePassword.vue'
import ChangeInfomation from '@/views/ChangeInfo.vue'
import ProfileFriend from '@/components/partial/ProfileFriend.vue'
import NotFound from '@/views/NotFound.vue'
import forgotPassword from '@/views/forgotPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'

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
			path: '/profileFriend',
			name: 'profileFriend',
			component: ProfileFriend
		},
		{
			path: '/changePassword',
			name: 'changePassword',
			component: ChangePassword
		},
		{
			path: '/changeInformation',
			name: 'changeInfomation',
			component: ChangeInfomation
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'notFound',
			component: NotFound
		},
		{
			path: '/forgotPassword',
			name: 'forgotPassword',
			component: forgotPassword
		},
		{
			path: '/reset-password/:uid/:token',
			name: 'resetPassword',
			component: ResetPassword
		}
	]
})

router.beforeEach((to, from, next) => {
	const publicPages = [
		'login',
		'signup',
		'notFound',
		'resetPassword',
		'forgotPassword'
	]
	const authRequired = !publicPages.includes(to.name)

	// Check if the user is authenticated
	const token = localStorage.getItem('accessToken')
	const isAuthenticated = token !== null

	if (authRequired && !isAuthenticated) {
		return next({ name: 'login' })
	}

	if (!authRequired && isAuthenticated) {
		return next({ name: 'home' })
	}

	next()
})

export default router
