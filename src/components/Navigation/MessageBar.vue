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
import { ref, onMounted, watch, computed } from 'vue'
import profileImage from '@/assets/profile.jpg'
import { useStore } from '@/stores/store'
import { useAuthStore } from '@/stores/auth'
import axiosInstance from '@/api/axios.js'

const store = useStore()
const auth = useAuthStore()

let users = ref([])
let selectedUserId = ref(store.activeConversation)
let sendSocket = ref(null)

let truncatedUsers = computed(() => {
	return users.value.map(user => ({
		...user,
		last_message: {
			...user.last_message,
			message:
				user.last_message.message.length > 20
					? user.last_message.message.slice(0, 20) + '...'
					: user.last_message.message
		}
	}))
})

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
		try {
			const response = await axiosInstance.post('/api/v1/user/refresh/', {
				refresh: auth.refreshToken
			})
			auth.setAcesstoken(response.data.access) // update the access token
			// Retry fetching recent chats after refreshing the token
			recentChats()
		} catch (error) {
			// log out the user
			auth.logout()
		}
	}
}

onMounted(() => {
	recentChats()
})

const selectUser = id => {
	selectedUserId.value = id
	store.setActiveConversation(id)
}

const formatDate = timestamp => {
	let date = new Date(timestamp)
	let day = String(date.getDate()).padStart(2, '0')
	let month = String(date.getMonth() + 1).padStart(2, '0')
	let year = date.getFullYear()
	let hours = String(date.getHours()).padStart(2, '0')
	let minutes = String(date.getMinutes()).padStart(2, '0')

	return `${day}-${month}-${year} ${hours}:${minutes}`
}

// Create the receiveSocket
const receiveSocket = new WebSocket(
	`ws://127.0.0.1:8000/ws/chat/${auth.currentUserId}/?token=${auth.accessToken}`
)

// Handle incoming messages from the receiveSocket
receiveSocket.onmessage = event => {
	const { message, sender_id, receiver_id } = JSON.parse(event.data)
	updateMessageBar(sender_id, receiver_id, message)
}

// Watch for changes to store.activeConversation
// Watch for changes to store.activeConversation
watch(
	() => store.activeConversation,
	newConversationId => {
		// Close the old sendSocket if it exists
		if (sendSocket.value) {
			sendSocket.value.close()
		}

		// Create a new sendSocket with the updated conversationId
		sendSocket.value = new WebSocket(
			`ws://127.0.0.1:8000/ws/chat/${newConversationId}/?token=${auth.accessToken}`
		)

		// Handle incoming messages from the sendSocket
		sendSocket.value.onmessage = event => {
			const { message, sender_id, receiver_id } = JSON.parse(event.data)
			updateMessageBar(sender_id, receiver_id, message, 'send')
		}
	},
	{ immediate: true }
)

// Function to update the message bar
const updateMessageBar = (
	sender_id,
	receiver_id,
	message,
	source // 'send' or 'receive'
) => {
	const targetId = source === 'send' ? receiver_id : sender_id
	console.log('targetId:', targetId)

	const userIndex = users.value.findIndex(user => user.id === targetId)
	console.log('userIndex:', userIndex)

	if (userIndex !== -1) {
		// Update existing user if found
		users.value[userIndex].last_message = { message, timestamp: new Date() }
	} else {
		// Add the user to the list if not found
		users.value.push({
			id: targetId,
			first_name: 'Unknown',
			last_name: 'Unknown',
			last_message: { message, timestamp: new Date() },
			avatar: profileImage
		})
	}

	// Sort the users array so that the user with the most recent message is at the top
	users.value.sort(
		(a, b) =>
			new Date(b.last_message.timestamp) - new Date(a.last_message.timestamp)
	)
}
</script>

<style lang="scss" scoped>
.list-group-item.active {
	background-color: #007bff;
	color: white;
}
</style>
