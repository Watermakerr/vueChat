<template>
	<div class="all">
		<div class="form-wrapper">
			<main class="form-side">
				<form class="my-form" @submit.prevent="register">
					<div class="form-welcome-row">
						<h1>Đăng kí</h1>
						<h2>Tạo một tài khoản mới</h2>
					</div>
					<div class="text-field-row">
						<div class="text-field">
							<label for="firstname">Họ</label>
							<input
								id="firstname"
								type="text"
								name="firstname"
								placeholder="VD: Nguyễn Văn"
								v-model="firstname"
								required
							/>
						</div>
						<div class="text-field">
							<label for="lastname">Tên</label>
							<input
								id="lastname"
								type="text"
								name="lastname"
								placeholder="VD: A"
								v-model="lastname"
								required
							/>
						</div>
					</div>
					<div class="text-field">
						<label for="username">Tên đăng nhập</label>
						<input
							type="text"
							id="username"
							name="username"
							autocomplete="off"
							placeholder="VD: nguyenvana123"
							v-model="username"
							@input="checkUsername"
							required
						/>
						<div v-if="!isUsernameValid" class="error-message">
							Tên đăng nhập bao gồm ít nhất một chữ cái, một số và một ký tự đặc
							biệt
						</div>
					</div>
					<div class="text-field">
						<label for="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							autocomplete="off"
							placeholder="VD: nguyena@gmail.com"
							v-model="email"
							required
						/>
					</div>
					<div class="text-field">
						<label for="password">Mật khẩu</label>
						<input
							id="password"
							type="password"
							name="password"
							v-model="password"
							required
						/>
					</div>
					<div class="text-field">
						<label for="birthday">Ngày sinh</label>
						<input
							id="birthday"
							type="date"
							name="birthday"
							placeholder="VD 01/01/2000"
							v-model="birthday"
							required
						/>
					</div>
					<div class="text-field">
						<label for="gender">Giới tính</label>
						<select id="gender" name="gender" v-model="gender" required>
							<option value="0">Male</option>
							<option value="1">Female</option>
							<option value="2">Khác</option>
						</select>
					</div>
					<div class="text-field">
						<label for="phoneNumber">Số điện thoại</label>
						<input
							id="phoneNumber"
							type="text"
							name="phoneNumber"
							placeholder="VD: 0123456789"
							v-model="phoneNumber"
							required
						/>
					</div>
					<button class="my-form__button" type="submit">Đăng kí</button>
					<div class="my-form__actions">
						<div class="my-form__row">
							<span>Bạn đã có tài khoản?</span>
							<router-link to="/login" title="Login"> Đăng nhập </router-link>
						</div>
					</div>
				</form>
			</main>
		</div>
	</div>
	<div class="notification-wrapper">
		<Notification v-if="isSuccess" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const firstname = ref('')
const lastname = ref('')
const birthday = ref('')
const gender = ref('')
const email = ref('')
const phoneNumber = ref('')
const router = useRouter()
const isUsernameValid = ref(false)
const isSuccess = ref(false)
import Notification from '../components/partial/Notification.vue'

const checkUsername = () => {
	const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{2,}$/
	isUsernameValid.value = regex.test(username.value)
}
const showSuccessNotification = () => {
	isSuccess.value = true
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
				birth_date: birthday.value,
				gender: gender.value,
				password: password.value,
				phoneNumber: phoneNumber.value
			}
		)
		console.log(response.data)
		showSuccessNotification()
		setTimeout(() => {
			router.push('/login')
		}, 3000)
	} catch (error) {
		console.error(error)
		if (error.response && error.response.data) {
			let errorMessage = ''
			if (error.response.data.username) {
				errorMessage += 'Tên đăng nhập đã sử dụng'
			} else if (error.response.data.phoneNumber) {
				errorMessage += 'Số điện thoại đã sử dụng'
			}
			if (errorMessage) {
				alert(errorMessage)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
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

.form-welcome-row {
	margin-bottom: 1rem;
}

.form-welcome-row h1 {
	font-size: 3rem;
	line-height: 2rem;
	font-weight: bold;
	margin-top: 3rem;
	margin-bottom: 2rem;
}

.form-welcome-row h2 {
	color: gray;
	font-size: 1.5rem;
	font-weight: normal;
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

.my-form__actions {
	font-size: larger;
	display: flex;
	flex-direction: column;
	align-self: center;
	color: var(--secondary);
	gap: 1rem;
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

.text-field-row {
	display: flex;
	gap: 1rem; /* Đặt khoảng cách giữa các trường nhập liệu */
}

.text-field {
	flex: 1; /* Mỗi trường nhập liệu chiếm phần bằng nhau của hàng */
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
