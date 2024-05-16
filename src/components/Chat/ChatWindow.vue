<template>
	<div class="w-100 d-flex flex-column">
		<ChatTop />
		<div class="chat-container flex-grow-1 overflow-auto" ref="chatContainer">
			<div v-for="message in messages" :key="message.id">
				<OutGoingChat
					v-if="message.sender === auth.currentUserId"
					:message="message"
				/>
				<ReceivedChat v-else :message="message" />
			</div>
		</div>
		<!-- Your input section here -->
		<ChatInput />
	</div>
</template>

<script setup>
import { ref, onUpdated, onMounted, watch, nextTick } from 'vue'
import ChatTop from '@/components/partial/ChatTop.vue'
import OutGoingChat from '@/components/partial/OutGoingChat.vue'
import ReceivedChat from '../partial/ReceivedChat.vue'
import ChatInput from '../partial/ChatInput.vue'
import { useStore } from '@/stores/store'
import { useAuthStore } from '@/stores/auth'
import axiosInstance from '@/api/axios.js'

const store = useStore()
const auth = useAuthStore()
const chatContainer = ref(null)
const messages = ref([])

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
