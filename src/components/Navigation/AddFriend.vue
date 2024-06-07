<template>
	<div class="container1">
		<h1>Lời mời kết bạn</h1>
		<FriendRequest />
	</div>
</template>

<script setup>
import axiosInstance from '@/api/axios.js'
import { useAuthStore } from '@/stores/auth.js'
import FriendRequest from '@/components/partial/FriendRequest.vue'
const auth = useAuthStore()

const friendRequest = async () => {
	try {
		const response = await axiosInstance.get('/api/v1/user/friend-requests/', {
			headers: { Authorization: `Bearer ${auth.accessToken}` }
		})
		console.log(response.data)
		console.log()
	} catch (error) {
		console.error(error)
	}
}
</script>

<style lang="scss" scoped>
.container1 {
	display: flex;
	width: 100%;
	flex-direction: column;
}
</style>
