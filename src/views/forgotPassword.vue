<template>
	<div class="container">
		<form @submit.prevent="submitForm">
			<div class="mb-3">
				<label for="phoneNumber" class="form-label">Phone Number</label>
				<input
					type="tel"
					class="form-control"
					id="phoneNumber"
					v-model="phoneNumber"
					required
				/>
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import axiosInstance from '@/api/axios.js'

const phoneNumber = ref('')

const submitForm = async () => {
	try {
		const response = await axiosInstance.post('/api/v1/user/password_reset/', {
			phoneNumber: phoneNumber.value
		})
		console.log(response.data)
		alert('Đường link reset password đã được gửi đến email của bạn')
	} catch (error) {
		console.error(error)
	}
}
</script>

<style lang="scss" scoped></style>
