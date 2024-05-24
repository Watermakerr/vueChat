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
import { ref, onMounted, watch, defineProps } from 'vue'
import profileImage from '@/assets/profile.jpg'
import { useStore } from '@/stores/store'
import { useAuthStore } from '@/stores/auth'
import axiosInstance from '@/api/axios.js'

const store = useStore()
const auth = useAuthStore()
const props = defineProps(['message-sent'])

let users = ref([])
let selectedUserId = ref(store.activeConversation)

const recentChats = async () => {
	try {
		const response = await axiosInstance.get('/api/v1/chat/messaged-users/', {
			headers: { Authorization: `Bearer ${auth.accessToken}` }
		})
		users.value = response.data
			.map(user => ({
				...user,
				avatar: profileImage
			}))
			.sort((a, b) => b.last_message.id - a.last_message.id)
	} catch (error) {
		console.error(error)
	}
}

onMounted(() => {
	recentChats()
})

const selectUser = id => {
	selectedUserId.value = id
	store.setActiveConversation(id)
}

watch(
	() => store.activeConversation,
	(newVal, oldVal) => {
		selectedUserId.value = newVal
	}
)

watch(
	() => props['message-sent'],
	(newVal, oldVal) => {
		const { receiver_id, receiver, message, timestamp } = newVal
		const userIndex = users.value.findIndex(user => user.id === receiver_id)
		if (userIndex !== -1) {
			// Update existing user if found
			users.value[userIndex].last_message = { receiver, message, timestamp }
		} else {
			// Add the user to the list if not found
			users.value.unshift({
				id: receiver_id,
				first_name: receiver.first_name,
				last_name: receiver.last_name,
				last_message: { receiver, message, timestamp },
				avatar: profileImage
			})
		}
	}
)

const formatDate = timestamp => {
	let date = new Date(timestamp)
	let day = String(date.getDate()).padStart(2, '0')
	let month = String(date.getMonth() + 1).padStart(2, '0')
	let year = date.getFullYear()
	let hours = String(date.getHours()).padStart(2, '0')
	let minutes = String(date.getMinutes()).padStart(2, '0')

	return `${day}-${month}-${year} ${hours}:${minutes}`
}
</script>

<style lang="scss" scoped>
.list-group-item.active {
	background-color: #007bff;
	color: white;
}
</style>
