<template>
	<div class="input-section">
		<input
			type="text"
			v-model="message"
			@keyup.enter="sendMessage"
			placeholder="Nhập tin nhắn..."
		/>
		<button @click="sendMessage">Gửi</button>
	</div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const message = ref('')

const emit = defineEmits(['send-message'])

const sendMessage = () => {
	emit('send-message', {
		message: message.value,
		sender_id: auth.currentUserId
	})
	message.value = ''
}
</script>

<style scoped>
.input-section {
	display: flex;
	justify-content: space-between;
	padding: 10px;
	border-top: 1px solid #ccc;
}

.input-section input {
	flex-grow: 1;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
}

.input-section button {
	margin-left: 10px;
	padding: 10px 20px;
	border: none;
	background-color: #007bff;
	color: white;
	cursor: pointer;
}
</style>
