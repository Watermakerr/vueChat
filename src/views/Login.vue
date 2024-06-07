<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const username = ref('')
const password = ref('')
const store = useAuthStore()
const router = useRouter()
const errorMessage = ref('')
const login = async () => {
	try {
		const response = await axios.post(
			'http://127.0.0.1:8000/api/v1/user/login/',
			{
				username: username.value,
				password: password.value
			}
		)

		store.login(
			response.data.access_token,
			response.data.refresh_token,
			response.data.user_id
		)
		console.log(response.data)
		console.log(store.accessToken)
		console.log(store.isAuthenticated)
		router.push('/')
	} catch (error) {
		console.error(error)
		errorMessage.value = `Sai tên đăng nhập hoặc mật khẩu`
	}
}
</script>
<template>
	<div class="body">
		<form @submit.prevent="login">
			<div class="login-welcome-row">
				<h1>Chào mừng trở lại &#x1F44F;</h1>
				<p>Hãy nhập thông tin của bạn!</p>
			</div>

			<div class="input__wrapper">
				<input
					type="text"
					id="username"
					name="username"
					class="input__field"
					placeholder="Your username"
					v-model="username"
					required
				/>
				<label for="username" class="input__label">Tên đăng nhập:</label>
				<svg
					class="input__icon"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
					<path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
					<path
						d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28"
					></path>
				</svg>
			</div>
			<div class="input__wrapper">
				<input
					id="password"
					type="password"
					class="input__field"
					placeholder="Your Password"
					v-model="password"
					required
				/>
				<label for="password" class="input__label">Mật khẩu: </label>
				<svg
					class="input__icon"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
					<path
						d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"
					></path>
					<path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path>
					<path d="M8 11v-4a4 4 0 1 1 8 0v4"></path>
				</svg>
				<div v-if="errorMessage" class="alert alert-danger">
					{{ errorMessage }}
				</div>
			</div>

			<button type="submit" class="my-form__button">Đăng nhập</button>

			<div class="my-form__actions">
				<div class="my-form__row">
					<span>Bạn không có tài khoản?</span>
					<router-link to="/signup" title="Create Account">
						Tao tài khoản mới
					</router-link>
				</div>
			</div>
		</form>
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

.body {
	font-size: 20px;
	font-family:
		system-ui,
		-apple-system,
		BlinkMacSystemFont,
		'Segoe UI',
		Roboto,
		Oxygen,
		Ubuntu,
		Cantarell,
		'Open Sans',
		'Helvetica Neue',
		sans-serif;
	height: 100vh;
	padding: 1rem;
	display: flex;
	height: 100vh;
	justify-content: center;
	align-items: center;
}
.login-welcome-row {
	margin-bottom: 1rem;
	text-align: center;
}

.welcome-message {
	max-width: 24rem;
}

.my-form {
	display: flex;
	flex-direction: column;
	justify-content: start;
	position: relative;
	gap: 1rem;
	width: 100%;
	max-width: 32rem;
	padding: 3rem 2rem;
	border-radius: 2rem;
	height: fit-content;
	margin: center;
}

.my-form__button {
	background-color: black;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 1.5rem;
	line-height: 2.75rem;
	font-size: 1.125rem;
	cursor: pointer;
	width: 100%;
	border-radius: 0.5rem;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
	transition: all 0.3s ease;
	border: 2px solid black;
	font-weight: bold;
}
.my-form__button:hover {
	background-color: white;
	color: black;
}
.input__wrapper {
	position: relative;
	padding: 0.9375rem 0 0;
	margin-bottom: 0.5rem;
}

.input__field {
	font-size: 1.5rem;
	padding: 0.375rem 0;
	padding-right: 2rem;
	padding-bottom: 0.5rem;
	line-height: 2rem;
	height: 2rem;
	outline: 0;
	border: 0;
	width: 100%;
	vertical-align: middle;
	padding-bottom: 0.7rem;
	border-bottom: 3px solid black;
	background: transparent;
	transition: border-color 0.2s;
}

.input__field::placeholder {
	color: transparent;
}

.input__label {
	user-select: none;
}

.input__field:placeholder-shown ~ .input__label {
	cursor: text;
	color: black;
	top: 0.8rem;
	font-size: 1.2rem;
}

.input__label,
.input__field:focus ~ .input__label {
	position: absolute;
	top: -0.8rem;
	display: block;
	font-size: 1.2rem;
	color: black;
	transition: 0.3s;
}

.input__field:focus ~ .input__label {
	color: grey;
}

.input__field:focus {
	border-bottom: 3px solid grey;
}

.input__field:focus ~ svg {
	stroke: grey;
}

.input__icon {
	position: absolute;
	right: -0.875rem;
	bottom: -0.6875rem;
	width: 2.25rem;
	height: 2.25rem;
	padding: 0.125rem;
	transform: translate(-50%, -50%);
	transform-origin: center;
	cursor: pointer;
}

.input__icon:hover {
	border-radius: 50%;
}

.my-form__actions {
	display: flex;
	flex-direction: column;
	align-self: center;
	color: var(--secondary);
	gap: 1rem;
	margin-top: 0.5rem;
}

.my-form__actions a {
	color: var(--secondary);
	font-weight: 600;
	text-decoration: none;
}

.my-form__actions a:hover {
	text-decoration: underline;
}

.my-form__row {
	display: flex;
	gap: 0.5rem;
	justify-content: space-between;
}
</style>
