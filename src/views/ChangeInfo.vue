<script setup>
// import { ref } from 'vue'
// import axios from 'axios'
// import { useRouter } from 'vue-router'

// const currentPassword = ref('')
// const newPassword = ref('')
// const confirmPassword = ref('')
// const lastname = ref('')

// const router = useRouter()
// const isSuccess = ref(false)
// import Notification from './Notification.vue'

// const checkUsername = () => {
// 	const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{2,}$/
// 	isUsernameValid.value = regex.test(username.value)
// }
// const showSuccessNotification = () => {
// 	isSuccess.value = true
// 	setTimeout(() => {
// 		isSuccess.value = false
// 	}, 5000)
// 	console.log('User registered successfully!')
// }

// const changePassword = async () => {
// 	try {
// 		const response = await axios.post(
// 			,
// 			{

// 			}
// 		)
// 		console.log(response.data)
// 		isSuccess.value = true
// 		setTimeout(() => {
// 			router.push('/login')
// 		}, 5000)
// 	} catch (error) {
// 		console.error(error)
// 	}
// }
</script>
<template>
	<div class="form-wrapper">
		<main class="form-side">
			<form class="my-form" @submit.prevent="changeInfomation">
				<div class="form-welcome-row">
					<h1>Update infomation</h1>
				</div>
				<div class="text-field-row">
					<div class="text-field">
						<label for="firstname">First name</label>
						<input
							id="firstname"
							type="text"
							name="firstname"
							value="Nguyẽn Văn"
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
							value="A"
							v-model="lastname"
							required
						/>
					</div>
				</div>
				<div class="text-field">
					<label for="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						autocomplete="off"
						value="abcd"
						v-model="email"
						required
					/>
				</div>
				<div class="text-field">
					<label for="birthday">Birthday</label>
					<input
						id="birthday"
						type="date"
						name="birthday"
						value="2000-01-01"
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
				</div>
				<button class="my-form__button" type="submit">Undate</button>
			</form>
		</main>
	</div>
	<!-- <div v-if="isSuccess" class="notification">
		<div class="notification__body">
			Your account has been created! &#128640;
		</div>
		<div class="notification__progress"></div>
	</div> -->
	<Notification v-if="isSuccess" />
</template>

<style lang="scss" scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.form-welcome-row {
	margin-bottom: 1rem;
}

.form-welcome-row h1 {
	font-size: 2.5rem;
	line-height: 2rem;
	font-weight: bold;
	margin-top: 3rem;
	margin-bottom: 2rem;
}
.form-wrapper {
	position: relative;
	display: grid;
	// grid-template-columns: 6fr 5fr;
	margin: 0 auto;
	height: 100%;
	justify-content: center;
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
	justify-content: center;
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