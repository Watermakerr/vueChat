<template>
	<div class="d-flex" style="height: 100vh">
		<LeftBar />
		<NoChatSelected v-if="!getActiveConversation()" class="flex-grow-1" />
		<ChatWindow v-else />
		<ProfileFriend v-if="showProfileFriend()" class="profile-overlay" />
	</div>
</template>

<script setup>
import { useStore } from '@/stores/store'
import LeftBar from '@/components/Navigation/LeftBar.vue'
import NoChatSelected from '@/components/Chat/NoChatSelected.vue'
import ChatWindow from '@/components/Chat/ChatWindow.vue'
import ProfileFriend from '@/views/ProfileFriend.vue'

const store = useStore()

const showProfileFriend = () => {
	return store.goToProfileFriend ? true : false
}

const getActiveConversation = () => {
	return store.activeConversation ? true : false
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
