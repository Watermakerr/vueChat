import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
	const activeSidebarComponent = ref(
		localStorage.getItem('activeSidebarComponent') || 'messages'
	)
	const activeConversation = ref(
		localStorage.getItem('activeConversation') || null
	)
	const setActiveConversation = id => {
		activeConversation.value = id
		localStorage.setItem('activeConversation', id)
	}

	return {
		activeSidebarComponent,
		activeConversation,
		setActiveConversation
	}
})
