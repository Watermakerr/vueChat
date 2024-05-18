<template>
	<div class="card-client">
		<div class="user-picture">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
				<path
					d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
				></path>
			</svg>
		</div>
		<p class="infomation">
			<p class="info-text">First name: {{ user.first_name }}</p>
			<p class="info-text">Last name: {{ user.last_name }}</p>
			<p class="info-text">Username: {{ user.username }}</p>
			<!-- <p class="info-text">Birtday: {{ user.birthday }}</p>
			<p class="info-text">Gender: {{ user.gender }}</p> -->
			<p class="info-text">Email: {{ user.email }}</p>
		</p>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const user = ref(null)
const user_id =  ref() // Thay thế bằng ID người dùng thực tế hoặc nhận từ route hoặc props

const fetchUserProfile = async () => {
	try {
		const response = await axios.get(
			`http://127.0.0.1:8000/api/v1/user/profile/${user_id}`
		)
		user.value = response.data // Đảm bảo rằng response.data có cấu trúc { first_name, last_name, email }
	} catch (error) {
		console.error('Failed to fetch user profile:', error)
	}
}

onMounted(() => {
	fetchUserProfile()
})
</script>

<style>
.card-client {
	background: #555;
	width: 13rem;
	padding-top: 25px;
	padding-bottom: 25px;
	padding-left: 20px;
	padding-right: 20px;
	border: 4px solid #fff;
	box-shadow: 0 6px 10px #212121;
	border-radius: 10px;
	text-align: center;
	color: #fff;
	font-family: 'Poppins', sans-serif;
	transition: all 0.3s ease;
}

.card-client:hover {
	transform: translateY(-10px);
}

.user-picture {
	overflow: hidden;
	object-fit: cover;
	width: 5rem;
	height: 5rem;
	border: 4px solid #fff;
	border-radius: 999px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
}

.user-picture svg {
	width: 2.5rem;
	fill: currentColor;
}

.infomation {
	margin: 0;
	margin-top: 20px;
	font-weight: 600;
	font-size: 18px;
}

.infomation span {
	display: block;
	font-weight: 200;
	font-size: 16px;
}
</style>
