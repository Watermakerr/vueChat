<template>
	<div class="container">
		<form @submit.prevent="submitForm">
			<div class="mb-3">
				<label for="password" class="form-label">Password</label>
				<input
					type="password"
					class="form-control"
					id="password"
					v-model="password"
					required
				/>
			</div>
			<div class="mb-3">
				<label for="confirmPassword" class="form-label">Confirm Password</label>
				<input
					type="password"
					class="form-control"
					id="confirmPassword"
					v-model="confirmPassword"
					required
				/>
			</div>
			<button
				type="submit"
				class="btn btn-primary"
				:disabled="!isPasswordMatch"
			>
				Submit
			</button>
		</form>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import axiosInstance from '@/api/axios.js'

const password = ref('')
const confirmPassword = ref('')
const isPasswordMatch = computed(() => password.value === confirmPassword.value)

const route = useRoute()
const uid = route.params.uid
const token = route.params.token

const submitForm = async () => {
	if (!isPasswordMatch.value) {
		alert('Passwords do not match')
		return
	}
	try {
		const response = await axiosInstance.post(
			`/api/v1/user/reset/${uid}/${token}/`,
			{
				new_password: password.value
			}
		)
		console.log(response.data)
		alert('Password has been reset successfully')
	} catch (error) {
		console.error(error)
	}
}
</script>

<style lang="scss" scoped></style>
