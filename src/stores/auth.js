import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
	const accessToken = ref(localStorage.getItem('accessToken') || '')
	const refreshToken = ref(localStorage.getItem('refreshToken') || '')
	const isAuthenticated = ref(!!accessToken.value)
	const currentUserId = ref(
		Number(localStorage.getItem('currentUserId')) || null
	)

	function login(access, refresh, id) {
		accessToken.value = access
		refreshToken.value = refresh
		currentUserId.value = Number(id)
		isAuthenticated.value = true
		localStorage.setItem('accessToken', access)
		localStorage.setItem('refreshToken', refresh)
		localStorage.setItem('currentUserId', String(id))
	}

	function logout() {
		accessToken.value = ''
		refreshToken.value = ''
		isAuthenticated.value = false
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')
		localStorage.removeItem('currentUserId')
	}

	return {
		accessToken,
		refreshToken,
		isAuthenticated,
		currentUserId,
		login,
		logout
	}
})
