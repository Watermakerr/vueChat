<template>
	<div class="container">
		<form @submit.prevent="submitForm">
			<h1>Tạo mật khẩu mới</h1>
			<div class="mb-3">
				<!-- <label for="password" class="form-label">Password</label> -->
				<input
					type="password"
					class="form-control"
					id="password"
					placeholder="Nhập mật khẩu mới"
					v-model="password"
					required
				/>
			</div>
			<div class="mb-3">
				<!-- <label for="confirmPassword" class="form-label">Confirm Password</label> -->
				<input
					type="password"
					class="form-control"
					id="confirmPassword"
					v-model="confirmPassword"
					placeholder="Nhập lại mật khẩu mới"
					required
				/>
			</div>
			<button type="submit" class="btn btn-dark" :disabled="!isPasswordMatch">
				Xác nhận
			</button>
		</form>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axiosInstance from '@/api/axios.js'

const password = ref('')
const confirmPassword = ref('')
const isPasswordMatch = computed(() => password.value === confirmPassword.value)

const route = useRoute()
const router = useRouter()
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
		alert('Mật khẩu đã được reset')
		router.push('/login')
	} catch (error) {
		console.error(error)
	}
}
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
}
form {
	width: 100%;
	max-width: 350px;
}
button {
	margin-top: 10px;
	width: 100%;
}
h1 {
	text-align: center;
	font-size: 2.5rem;
	margin-bottom: 40px;
}
</style>
