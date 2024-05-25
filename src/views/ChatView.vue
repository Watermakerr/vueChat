<template>
	<div class="d-flex" style="height: 100vh">
		<LeftBar :key="leftBarKey" :newMessage="newMessage" />
		<NoChatSelected v-if="!getActiveConversation()" class="flex-grow-1" />
		<ChatWindow v-else @message-sent="updateLeftBar" />
		<ProfileFriend v-if="showProfileFriend()" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import LeftBar from '@/components/Navigation/LeftBar.vue'
import NoChatSelected from '@/components/Chat/NoChatSelected.vue'
import ChatWindow from '@/components/Chat/ChatWindow.vue'
import ProfileFriend from '@/views/ProfileFriend.vue'

const store = useStore()

const showProfileFriend = () => {
	return store.profile_id ? true : false
}

const getActiveConversation = () => {
	return store.activeConversation ? true : false
}
const leftBarKey = ref(0)
const newMessage = ref(null)

const updateLeftBar = message => {
	// Update the newMessage reactive property
	newMessage.value = { ...message }

	// Force re-render the LeftBar component
	leftBarKey.value++

	// Emit the 'message-sent' event with the sent message
	emit('message-sent', message)
}
</script>

<style lang="scss" scoped>
.profile-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1000;
}
</style>
