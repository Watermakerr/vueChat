import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
	const profile_id = ref(null)
	const activeConversationName = ref(
		localStorage.getItem('activeConversationName') || null
	)
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
	const setActiveConversationName = name => {
		activeConversationName.value = name
		localStorage.setItem('activeConversationName', name)
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
		activeConversationName,
		setProfileId,
		setActiveConversation,
		setActiveProfile,
		setActiveConversationName
	}
})
