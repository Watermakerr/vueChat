<template>
	<div class="container">
		<form @submit.prevent="submitForm">
			<h1>Quên mật khẩu</h1>
			<div class="mb-3">
				<!-- <label for="phoneNumber" class="form-label">Phone Number</label> -->
				<input
					type="tel"
					class="form-control"
					id="phoneNumber"
					v-model="phoneNumber"
					placeholder="Nhập số điện thoại của bạn"
					required
				/>
			</div>
			<button type="submit" class="btn btn-dark">Xác nhận</button>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import axiosInstance from '@/api/axios.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const phoneNumber = ref('')

const submitForm = async () => {
	try {
		const response = await axiosInstance.post('/api/v1/user/password_reset/', {
			phoneNumber: phoneNumber.value
		})
		console.log(response.data)
		alert('Đường link reset password đã được gửi đến email của bạn')
		router.push('/login')
	} catch (error) {
		console.error(error)
		alert('Số điện thoại này không tồn tại')
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
