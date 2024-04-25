import ref from 'vue'

import { defineStore } from 'pinia'

export const authStore = defineStore('auth', () => {
  const accessToken = ref('')
  const refreshToken = ref('')
  const isAuthenticated = ref(false)
  function login(token) {
    accessToken.value = token
    isAuthenticated.value = true
  }
  function logout() {
    accessToken.value = ''
    isAuthenticated.value = false
  }
  return { accessToken, refreshToken, isAuthenticated, login, logout }
})
