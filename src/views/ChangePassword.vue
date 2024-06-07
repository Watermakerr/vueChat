<script setup>
import { ref } from 'vue'
import axiosInstance from '@/api/axios.js'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Notification from '../components/partial/Notification.vue'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPasword = ref('')
const isSuccess = ref(false)
const auth = useAuthStore()
const router = useRouter()

const showSuccessNotification = () => {
	isSuccess.value = true
	console.log('User registered successfully!')
}

const changePassword = async () => {
	// Check if new password and confirm password match
	if (newPassword.value !== confirmPasword.value) {
		window.alert('Mật khẩu lần 2 không đúng')
		return
	}

	try {
		const response = await axiosInstance.post(
			'/api/v1/user/change-password/',
			{
				old_password: currentPassword.value,
				new_password: newPassword.value
			},
			{
				headers: {
					Authorization: `Bearer ${auth.accessToken}`
				}
			}
		)
		console.log(response.data)
		showSuccessNotification()
		setTimeout(() => {
			router.push('/')
		}, 3000)
	} catch (error) {
		console.error(error)
		window.alert('Mật khẩu cũ không đúng')
	}
}
</script>
<template>
	<div class="all">
		<div class="form-wrapper">
			<main class="form-side">
				<form class="my-form" @submit.prevent="changePassword">
					<div class="form-welcome-row">
						<h1>Đổi mật khẩu</h1>
					</div>
					<div class="text-field">
						<input
							type="password"
							id="currentPassword"
							name="currentPassword"
							placeholder="Nhập mật khẩu hiện tại"
							v-model="currentPassword"
							required
						/>
					</div>
					<div class="text-field">
						<input
							id="newPassword"
							type="password"
							name="newPassword"
							placeholder="Nhập mật khẩu mới"
							v-model="newPassword"
							required
						/>
					</div>
					<div class="text-field">
						<input
							id="confirmPasword"
							type="password"
							name="confirmPasword"
							placeholder="Nhập lại mật khẩu mới"
							v-model="confirmPasword"
							required
						/>
					</div>
					<button type="submit" class="my-form__button">Đổi mật khẩu</button>
				</form>
			</main>
		</div>
	</div>
	<div class="notification-wrapper">
		<Notification v-if="isSuccess" />
	</div>
</template>

<style scoped>
.notification-wrapper {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1000; /* This ensures the notification stays on top of other elements */
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.form-welcome-row h1 {
	text-align: center;
	font-size: 2.5rem;
	line-height: 2rem;
	font-weight: bold;
	margin-top: 3rem;
	margin-bottom: 1rem;
}
.form-wrapper {
	position: relative;
	display: flex; /* Use flexbox */
	justify-content: center; /* Center horizontally */
	align-items: center; /* Center vertically */
	height: 100vh; /* Take full viewport height */
	margin: auto auto;
}

.form-side {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 2rem;
}
.my-form {
	display: flex;
	flex-direction: column;
	justify-content: start;
	position: relative;
	gap: 1.25rem;
	max-width: 23rem;
	width: 45rem;
}

.my-form__button {
	font-weight: bold;
	background-color: black;
	color: white;
	white-space: nowrap;
	border: 2px solid black;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 1.5rem;
	line-height: 2.75rem;
	outline: none;
	font-size: 1.125rem;
	text-decoration: none;
	cursor: pointer;
	width: 100%;
	border-radius: 0.5rem;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
	transition: all 0.3s ease;
}
.my-form__button:hover {
	background-color: white;
	color: black;
}
.my-form:invalid .my-form__button {
	pointer-events: none;
}

.my-form__actions a:hover {
	text-decoration: underline;
}

.my-form__row {
	display: flex;
	gap: 0.5rem;
	justify-content: space-between;
}

.text-field {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.text-field input {
	color: var(--secondary);
	max-width: 100%;
	width: 100%;
	border: 1px solid var(--border);
	min-height: 2.75rem;
	letter-spacing: 0.03rem;
	outline: none;
	background-color: var(--input-bg);
	transition: 0.25s;
	border-radius: 0.5rem;
	text-indent: 1.25rem;
}
.text-field label {
	color: black;
}

.text-field input:user-invalid {
	background-color: var(--white);
	color: var(--error);
	border: 1px solid var(--error);
}

.error-message {
	display: none;
}

.text-field input:user-invalid ~ .error-message {
	display: block;
	margin-top: 0.25rem;
	font-size: 0.8rem;
	color: var(--error);
}

.text-field input:focus {
	border: 1px solid var(--text);
	box-shadow: rgba(99, 99, 99, 0.2) 0px 1px 4px 0px;
}
.notification {
	position: absolute;
	width: max-content;
	left: 0;
	right: 0;
	bottom: 1.5rem;
	margin-left: auto;
	margin-right: auto;
	border-radius: 0.375rem;
	background-color: black;
	color: white;
	box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
	transform: translateY(1.875rem);
	opacity: 0;
	visibility: hidden;
	animation: fade-in 3s linear;
}

@keyframes fade-in {
	5% {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
	}
	95% {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes progress {
	to {
		transform: scaleX(1);
	}
}
</style>
