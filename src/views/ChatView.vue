<template>
	<div class="d-flex" style="height: 100vh">
		<LeftBar :key="leftBarKey" :newMessage="newMessage" />
		<NoChatSelected v-if="!getActiveConversation()" class="flex-grow-1" />
		<ChatWindow v-else @message-sent="updateLeftBar" />
		<div v-if="showProfileFriend()" class="overlay"></div>
		<ProfileFriend v-if="showProfileFriend()" class="profile-friend" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import LeftBar from '@/components/Navigation/LeftBar.vue'
import NoChatSelected from '@/components/Chat/NoChatSelected.vue'
import ChatWindow from '@/components/Chat/ChatWindow.vue'
import ProfileFriend from '@/components/partial/ProfileFriend.vue'

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
.overlay {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
}

.profile-friend {
	position: fixed;
	display: grid;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1000;
}
</style>
