<template>
	<div class="d-flex" style="height: 100%; overflow: hidden">
		<LeftBar />
		<NoChatSelected v-if="!getActiveConversation()" class="flex-grow-1" />
		<ChatWindow v-else />
		<div v-if="showProfileFriend()" class="overlay"></div>
		<ProfileFriend v-if="showProfileFriend()" class="profile-friend" />
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from '@/stores/store'
import LeftBar from '@/components/Navigation/LeftBar.vue'
import NoChatSelected from '@/components/Chat/NoChatSelected.vue'
import ChatWindow from '@/components/Chat/ChatWindow.vue'
import ProfileFriend from '@/components/partial/ProfileFriend.vue'
import { useAuthStore } from '@/stores/auth'
import axiosInstance from '@/api/axios.js'

const auth = useAuthStore()

const store = useStore()

const showProfileFriend = () => {
	return store.profile_id ? true : false
}

const getActiveConversation = () => {
	return store.activeConversation ? true : false
}

onMounted(async () => {
	console.log(auth.refreshToken)
	console.log('here')
	try {
		await axiosInstance.post('/api/v1/user/token/', {
			token: auth.accessToken
		})
	} catch (error) {
		try {
			const response = await axiosInstance.post('/api/v1/user/refresh/', {
				refresh: auth.refreshToken
			})
			auth.setAcesstoken(response.data.access) // update the access token
		} catch (error) {
			// log out the user
			auth.logout()
		}
	}
})
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
