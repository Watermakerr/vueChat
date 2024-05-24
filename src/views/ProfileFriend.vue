<template>
	<div class="container">
		<div class="background-overlay"></div>
		<div class="card-client">
			<div class="user-picture">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
					<path
						d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
					></path>
				</svg>
			</div>
			<div class="infomation">
				<div class="column-small">
					<p class="info-text">Họ và tên:</p>
					<p class="info-text">Tên đăng nhập:</p>
					<p class="info-text">Ngày sinh:</p>
					<p class="info-text">Giới tính:</p>
					<p class="info-text">Email:</p>
					<p class="info-text">Số điện thoại:</p>
				</div>
				<div class="column-large">
					<p class="info-text">Nguyễn Văn A</p>
					<p class="info-text">abcd9@</p>
					<p class="info-text">01/01/2000</p>
					<p class="info-text">Nam</p>
					<p class="info-text">nguyenvana@gmail.com</p>
				</div>
			</div>
			<div class="button">
				<button class="card__btn">Thêm bạn</button>
				<button class="card__btn">Nhắn tin</button>
			</div>
			<button class="close-btn" @click="closeProfileFriend">x</button>
		</div>
	</div>
</template>

<script setup>
// import { ref, onMounted } from 'vue'
// import axios from 'axios'
// import { useAuthStore } from '@/stores/auth'
// import { useRouter } from 'vue-router'
import { useStore } from '@/stores/store'
const store = useStore()

// const password = ref('')
// const firstname = ref('')
// const lastname = ref('')
// const birthday = ref('')
// const gender = ref('')
// const email = ref('')
// const phoneNumber = ref('')
// const user = ref(null)
// const user_id = ref() // Thay thế bằng ID người dùng thực tế hoặc nhận từ route hoặc props

const closeProfileFriend = () => {
	store.goToProfileFriend = false
}

// const fetchUserProfile = async () => {
// 	try {
// 		const response = await axios.get(
// 			`http://127.0.0.1:8000/api/v1/user/profile/${user_id}`
// 		)
// 		user.value = response.data // Đảm bảo rằng response.data có cấu trúc { first_name, last_name, email }
// 	} catch (error) {
// 		console.error('Không thể lấy thông tin hồ sơ người dùng:', error)
// 	}
// }

// onMounted(() => {
// 	fetchUserProfile()
// })
</script>

<style>
.container {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	right: 0;
}

.background-overlay {
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1;
}

.card-client {
	position: relative;
	background: black;
	width: 30rem;
	padding: 25px 20px;
	border: 5px solid black;
	box-shadow: 0 6px 10px #2c2b2b;
	border-radius: 10px;
	color: #fff;
	font-family: 'Poppins', sans-serif;
	transition: all 0.3s ease;
	z-index: 2; /* Ensure it's above the overlay */
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
	display: flex;
	justify-content: space-between;
	margin-top: 35px;
}
.column-small {
	flex: 1;
}

.column-large {
	flex: 2;
}

.info-text {
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
	font-size: 18px;
	font-weight: bolder;
	margin-bottom: 10px;
}
.button {
	margin-left: 65px;
	margin-top: 30px;
}
.card__btn {
	margin-left: 30px;
	width: 100px;
	height: 37px;
	border: 2px solid black;
	border-radius: 4px;
	font-weight: 700;
	font-size: 15px;
	color: black;
	background: white;
	transition: all 0.3s;
}

.card__btn:hover {
	background: black;
	color: white;
	border: 2px solid white;
	border-radius: 4px;
}
</style>
