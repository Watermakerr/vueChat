<template>
	<div class="w-100 d-flex flex-column">
		<ChatTop />
		<div class="chat-container flex-grow-1 overflow-auto" ref="chatContainer">
			<div v-for="message in messages" :key="message.id">
				<OutGoingChat
					v-if="message.sender.id === auth.currentUserId"
					:message="message"
				/>
				<ReceivedChat v-else :message="message" />
			</div>
		</div>
		<ChatInput @send-message="handleSendMessage" />
	</div>
</template>

<script setup>
import { ref, onUpdated, onMounted, watch, nextTick, onUnmounted } from 'vue'
import ChatTop from '@/components/partial/ChatTop.vue'
import OutGoingChat from '@/components/partial/OutGoingChat.vue'
import ReceivedChat from '../partial/ReceivedChat.vue'
import ChatInput from '../partial/ChatInput.vue'
import { useStore } from '@/stores/store'
import { useAuthStore } from '@/stores/auth'
import axiosInstance from '@/api/axios.js'

// State
const store = useStore()
const auth = useAuthStore()
const chatContainer = ref(null)
const messages = ref([])

// WebSocket setup
let sendSocket = null
let receiveSocket = null

const handleSendMessage = ({ message, sender_id }) => {
	if (sendSocket && sendSocket.readyState === WebSocket.OPEN) {
		console.log('Sending message')
		sendSocket.send(
			JSON.stringify({
				message,
				sender_id,
				receiver_id: store.activeConversation,
				timestamp: new Date()
			})
		)
	}
	// Add the new message to the messages array
	messages.value.push({
		message,
		sender: { id: sender_id },
		timestamp: new Date()
	})
}

const setupWebSocket = conversationId => {
	// Close the old WebSocket connections
	if (sendSocket) {
		sendSocket.close()
	}
	if (receiveSocket) {
		receiveSocket.close()
	}

	// Open new WebSocket connections
	sendSocket = new WebSocket(
		`ws://127.0.0.1:8000/ws/chat/${conversationId}/?token=${auth.accessToken}`
	)
	receiveSocket = new WebSocket(
		`ws://127.0.0.1:8000/ws/chat/${auth.currentUserId}/?token=${auth.accessToken}`
	)

	sendSocket.onopen = () => {
		console.log('Connected to send socket')
	}
	receiveSocket.onopen = () => {
		console.log('Connected to receive socket')
	}

	sendSocket.onerror = error => {
		console.error('Error in send socket', error)
	}
	receiveSocket.onerror = error => {
		console.error('Error in receive socket', error)
	}

	// Add an event listener for incoming messages
	receiveSocket.onmessage = event => {
		const incomingMessage = JSON.parse(event.data)
		console.log('Incoming message', incomingMessage)
		// Check if the sender's ID matches the active conversation ID
		if (incomingMessage.sender_id === store.activeConversation) {
			// Create a new message object with sender and receiver objects
			const newMessage = {
				...incomingMessage,
				sender: { id: incomingMessage.sender_id },
				receiver: { id: incomingMessage.receiver_id },
				timestamp: new Date()
			}
			// Add the new message to the messages array
			messages.value.push(newMessage)
		}
	}
}

onMounted(() => {
	setupWebSocket(store.activeConversation)
})

watch(
	() => store.activeConversation,
	(newConversationId, oldConversationId) => {
		setupWebSocket(newConversationId)
	}
)

// Fetch messages
const fetchMessages = async () => {
	try {
		const response = await axiosInstance.get(
			`/api/v1/chat/messages/${store.activeConversation}/`,
			{
				headers: { Authorization: `Bearer ${auth.accessToken}` }
			}
		)
		messages.value = response.data
	} catch (error) {
		console.error(error)
	}
}

onMounted(async () => {
	await fetchMessages(store.activeConversation)
	nextTick(() => {
		scrollToBottom()
	})
})

watch(
	() => store.activeConversation,
	async newConversationId => {
		await fetchMessages(newConversationId)
	}
)

// Scroll to bottom
onUpdated(() => {
	scrollToBottom()
})

function scrollToBottom() {
	chatContainer.value.scrollTop = chatContainer.value.scrollHeight
}
</script>

<style lang="scss" scoped>
.w-100 {
	height: 100vh; // Adjust this value as needed
}
</style>
