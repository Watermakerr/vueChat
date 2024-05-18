<template>
	<div class="all">
		<div class="form-wrapper">
			<main class="form-side">
				<form class="my-form" @submit.prevent="register">
					<div class="form-welcome-row">
						<h1>Sign up</h1>
						<h2>Create a new account</h2>
					</div>
					<div class="text-field-row">
						<div class="text-field">
							<label for="firstname">First name</label>
							<input
								id="firstname"
								type="text"
								name="firstname"
								placeholder="First name"
								v-model="firstname"
								required
							/>
						</div>
						<div class="text-field">
							<label for="lastname">Last name</label>
							<input
								id="lastname"
								type="text"
								name="lastname"
								placeholder="Last name"
								v-model="lastname"
								required
							/>
						</div>
					</div>
					<div class="text-field">
						<label for="username">Username</label>
						<input
							type="text"
							id="username"
							name="username"
							autocomplete="off"
							placeholder="Username"
							v-model="username"
							@input="checkUsername"
							required
						/>
						<div v-if="!isUsernameValid" class="error-message">
							Username must contain at least one letter and one number
						</div>
					</div>
					<div class="text-field">
						<label for="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							autocomplete="off"
							placeholder="Email"
							v-model="email"
							required
						/>
					</div>
					<div class="text-field">
						<label for="password">Password</label>
						<input
							id="password"
							type="password"
							name="password"
							v-model="password"
							required
						/>
					</div>
					<!-- <div class="text-field">
						<label for="birthday">Birthday</label>
						<input
							id="birthday"
							type="date"
							name="birthday"
							placeholder="Birthday"
							v-model="birthday"
							required
						/>
					</div>
					<div class="text-field">
						<label for="gender">Gender</label>
						<select id="gender" name="gender" v-model="gender" required>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Khác</option>
						</select>
					</div> -->
					<button class="my-form__button" type="submit">Sign up</button>
					<div class="my-form__actions">
						<div class="my-form__row">
							<span>Have an account?</span>
							<router-link to="/login" title="Login"> Login </router-link>
						</div>
					</div>
				</form>
			</main>
		</div>
	</div>
	<div v-if="isSuccess" class="notification">
		<div class="notification__body">
			Your account has been created! &#128640;
		</div>
		<div class="notification__progress"></div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { authStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const firstname = ref('')
const lastname = ref('')
// const birthday = ref('')
// const gender = ref('')
const email = ref('')
const store = authStore()
const router = useRouter()
const isUsernameValid = ref(false)
const isSuccess = ref(false)

const checkUsername = () => {
	const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{2,}$/
	isUsernameValid.value = regex.test(username.value)
}
const showSuccessNotification = () => {
	isSuccess.value = true
	setTimeout(() => {
		isSuccess.value = false
	}, 5000)
	console.log('User registered successfully!')
}

const register = async () => {
	try {
		const response = await axios.post(
			'http://127.0.0.1:8000/api/v1/user/register/',
			{
				username: username.value,
				email: email.value,
				first_name: firstname.value,
				last_name: lastname.value,
				// birthday: birthday.value,
				// gender: gender.value,
				password: password.value
			}
		)
		console.log(response.data)
		isSuccess.value = true
		showSuccessNotification()
		router.push('/login')
	} catch (error) {
		console.error(error)
	}
}
</script>

<style lang="scss" scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

*::selection {
	background-color: var(--primary-light);
}

.form-welcome-row {
	margin-bottom: 1rem;
}

.form-welcome-row h1 {
	color: var(--text);
	// text-align: center;
	font-size: 3rem;
	line-height: 2rem;
	font-weight: bold;
	margin-top: 3rem;
	margin-bottom: 2rem;
}

.form-welcome-row h2 {
	color: var(--text-gray);
	font-size: 1.5rem;
	font-weight: normal;
}

.divider {
	display: flex;
	flex-direction: row;
	color: var(--secondary);
	gap: 1rem;
	align-items: center;
}

.divider-line {
	width: 100%;
	height: 1px;
	background-color: var(--secondary);
	opacity: 0.2;
}

.form-wrapper {
	position: relative;
	display: grid;
	// grid-template-columns: 6fr 5fr;
	margin: 0 auto;
	height: 100%;
}

.form-side {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 2rem;
	background-color: var(--main-side-background);
	box-shadow: rgba(99, 99, 99, 0.1) 3px 2px 2px -1px;
}
.my-form {
	display: flex;
	flex-direction: column;
	justify-content: start;
	position: relative;
	gap: 1.25rem;
	max-width: 23rem;
	width: 100%;
}

.my-form__button {
	background-color: var(--primary);
	border: 1px solid var(--primary-light);
	color: white;
	white-space: nowrap;
	border: none;
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

.my-form:invalid .my-form__button {
	pointer-events: none;
	background-color: rgb(3, 101, 47);
	border: 1px solid var(--primary-light);
}

.my-form__actions {
	display: flex;
	flex-direction: column;
	color: var(--secondary);
	gap: 1rem;
	margin-top: 0.5rem;
}

.my-form__actions a {
	color: var(--text);
}

.my-form__actions a:hover {
	color: var(--text-gray);
	text-decoration: underline;
}

.my-form__row {
	display: flex;
	justify-content: center;
	gap: 1rem;
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
.text-field select {
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
	color: var(--text-gray);
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

/* aside */
.info-side {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 3rem;
}

.info-side .blockquote-wrapper {
	gap: 1rem;
	position: relative;
}

.info-side .blockquote-wrapper blockquote {
	margin-bottom: 1rem;
	max-width: 30rem;
	width: 100%;
	font-size: 1.25rem;
	line-height: 2.25rem;
}

.info-side .blockquote-wrapper blockquote::before {
	content: open-quote;
	font-size: 4rem;
	line-height: 0;
	margin-right: 0.5rem;
	position: absolute;
	left: -1.5rem;
}

.info-side .author {
	display: flex;
	flex-direction: row;
	gap: 0.75rem;
	align-items: center;
}

.info-side .author img {
	border-radius: 50%;
	width: 3rem;
	height: 3rem;
}

.info-side .author-name {
	font-size: 1.125rem;
	line-height: 1.75rem;
	font-weight: 600;
	color: var(--text-gray);
}
.text-field-row {
	display: flex;
	gap: 1rem; /* Đặt khoảng cách giữa các trường nhập liệu */
}

.text-field {
	flex: 1; /* Mỗi trường nhập liệu chiếm phần bằng nhau của hàng */
}

@media (max-width: 720px) {
	.form-wrapper {
		grid-template-columns: 1fr;
		height: 100vh;
	}

	.info-side {
		display: none;
	}
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
	background-color: var(--notification-background);
	color: var(--notification-primary);
	box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
	transform: translateY(1.875rem);
	opacity: 0;
	visibility: hidden;
	animation: fade-in 3s linear;
}

.notification__icon {
	height: 1.625rem;
	width: 1.625rem;
	margin-right: 0.25rem;
}

.notification__body {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 1rem 0.5rem;
}

.notification__progress {
	position: absolute;
	left: 0.25rem;
	bottom: 0.25rem;
	width: calc(100% - 0.5rem);
	height: 0.2rem;
	transform: scaleX(0);
	transform-origin: left;
	background: linear-gradient(
		to right,
		var(--notification-background),
		var(--notification-primary)
	);
	border-radius: inherit;
	animation: progress 2.5s 0.3s linear;
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
