<template>
	<div class="input-section">
		<input type="text" v-model="message" placeholder="Type a message..." />
		<button @click="sendMessage">Send</button>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')

const sendMessage = () => {
	console.log(message.value)
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
