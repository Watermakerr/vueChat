<template>
	<div>
		<form @submit.prevent="register">
			<label for="username">Username:</label>
			<input type="text" id="username" v-model="username" required />

			<label for="password">Password:</label>
			<input type="password" id="password" v-model="password" required />

			<button type="submit">Register</button>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const password = ref('')

const register = async () => {
	try {
		const response = await axios.post('http://127.0.0.1:8000/user/register/', {
			username: username.value,
			password: password.value
		})

		console.log(response.data)
	} catch (error) {
		console.error(error)
	}
}
</script>

<style scoped>
form {
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 200px;
}

button {
	cursor: pointer;
}
</style>
