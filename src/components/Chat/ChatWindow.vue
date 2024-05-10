<template>
	<div class="w-100 d-flex flex-column">
		<ChatTop />
		<div class="chat-container flex-grow-1 overflow-auto" ref="chatContainer">
			<OutGoingChat />
			<ReceivedChat />
			<OutGoingChat />
			<ReceivedChat />
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

const store = useStore()
const chatContainer = ref(null)

onMounted(() => {
	nextTick(() => {
		scrollToBottom()
	})
})

onUpdated(() => {
	scrollToBottom()
})

function scrollToBottom() {
	chatContainer.value.scrollTop = chatContainer.value.scrollHeight
}

watch(
	() => store.activeConversation,
	() => {
		nextTick(() => {
			scrollToBottom()
		})
	}
)
</script>

<style lang="scss" scoped>
.w-100 {
	height: 100vh; // Adjust this value as needed
}
</style>
