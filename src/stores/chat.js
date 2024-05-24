// stores/chat.js

import { defineStore } from 'pinia'

export const useChatStore = defineStore({
	id: 'chat',
	state: () => ({
		newMessage: null
	}),
	actions: {
		sendMessage(message) {
			// Here you can perform any additional actions before setting the new message
			this.newMessage = message
		}
	}
})
