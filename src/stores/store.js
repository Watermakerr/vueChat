import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
	const activeSidebarComponent = ref(
		localStorage.getItem('activeSidebarComponent') || 'messages'
	)

	return {
		activeSidebarComponent
	}
})
