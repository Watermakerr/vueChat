<template>
	<div class="list-group">
		<button
			class="list-group-item list-group-item-action d-flex align-items-center"
			v-for="user in users"
			:key="user.id"
			@click="selectUser(user.id)"
			:class="{ active: selectedUserId === user.id }"
		>
			<img
				:src="user.avatar"
				alt="User avatar"
				class="rounded-circle me-3"
				style="width: 50px; height: 50px"
			/>
			<div class="flex-grow-1">
				<div class="d-flex justify-content-between">
					<h6 class="mb-1">{{ user.first_name }} {{ user.last_name }}</h6>
					<small>{{ formatDate(user.last_message.timestamp) }}</small>
				</div>
				<p class="mb-0">{{ user.last_message.message }}</p>
			</div>
		</button>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import profileImage from '@/assets/profile.jpg'
import { useStore } from '@/stores/store'
import { useAuthStore } from '@/stores/auth'
import axiosInstance from '@/api/axios.js'

const store = useStore()
const auth = useAuthStore()

let users = ref([])

const recentChats = async () => {
	try {
		const response = await axiosInstance.get('/api/v1/chat/messaged-users/', {
			headers: { Authorization: `Bearer ${auth.accessToken}` }
		})
		users.value = response.data.map(user => ({
			...user,
			avatar: profileImage
		}))
		console.log(users.value)
	} catch (error) {
		console.error(error)
	}
}

const formatDate = timestamp => {
	let date = new Date(timestamp)
	let day = String(date.getDate()).padStart(2, '0') // pad single digit day with 0
	let month = String(date.getMonth() + 1).padStart(2, '0') // pad single digit month with 0
	let year = date.getFullYear()
	let hours = String(date.getHours()).padStart(2, '0') // pad single digit hours with 0
	let minutes = String(date.getMinutes()).padStart(2, '0') // pad single digit minutes with 0

	return `${day}-${month}-${year} ${hours}:${minutes}`
}

onMounted(() => {
	recentChats()
	console.log(auth.accessToken) // Use auth instead of authStore
})

const selectedUserId = ref(store.activeConversation)

const selectUser = id => {
	selectedUserId.value = id
	store.setActiveConversation(id)
	console.log(store.activeConversation)
}
</script>

<style lang="scss" scoped>
.list-group-item.active {
	background-color: #007bff;
	color: white;
}
</style>
