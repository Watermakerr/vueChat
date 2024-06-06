import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
	const profile_id = ref(null)
	const activeSidebarComponent = ref(
		localStorage.getItem('activeSidebarComponent') || 'messages'
	)
	const activeConversation = ref(
		localStorage.getItem('activeConversation') || null
	)
	const activeProfile = ref(localStorage.getItem('activeProfile') || null)

	const setProfileId = id => {
		profile_id.value = id
	}

	const setActiveConversation = id => {
		activeConversation.value = id
		localStorage.setItem('activeConversation', id)
	}

	const setActiveProfile = name => {
		activeProfile.value = name
		localStorage.setItem('activeProfile', name)
	}

	return {
		profile_id,
		activeSidebarComponent,
		activeConversation,
		activeProfile,
		setProfileId,
		setActiveConversation,
		setActiveProfile
	}
})
