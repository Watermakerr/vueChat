<template>
	<div class="container">
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
					<p class="info-text">Ngày sinh:</p>
					<p class="info-text">Giới tính:</p>
					<p class="info-text">Email:</p>
					<p class="info-text">Số điện thoại:</p>
				</div>
				<div class="column-large">
					<p class="info-text">{{ user?.first_name }} {{ user?.last_name }}</p>
					<p class="info-text">{{ user?.birth_date }}</p>
					<p class="info-text">{{ user?.gender === 0 ? 'Nam' : 'Nữ' }}</p>
					<p class="info-text">{{ user?.email }}</p>
					<p class="info-text">{{ user?.phoneNumber }}</p>
				</div>
			</div>
			<div v-if="store.profile_id !== auth.currentUserId" class="button">
				<button
					v-if="user && user.is_friend === false"
					class="card__btn"
					@click="addFriend"
				>
					Thêm bạn
				</button>
				<button class="card__btn" @click="message">Nhắn tin</button>
			</div>
			<div v-else>
				<div class="d-flex justify-content-center align-items-center">
					<button class="card__btn" @click="changeInfo" style="width: 300px">
						Thay đổi thông tin
					</button>
				</div>
			</div>
			<button class="close-btn" @click="closeProfileFriend">x</button>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axiosInstance from '@/api/axios.js'
import { useAuthStore } from '@/stores/auth'
import { useStore } from '@/stores/store'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
const auth = useAuthStore()

const user = ref(null)

onMounted(() => {
	const fetchUserProfile = async () => {
		try {
			const response = await axiosInstance.get(
				`/api/v1/user/profile/${store.profile_id}`,
				{
					headers: {
						Authorization: `Bearer ${auth.accessToken}`
					}
				}
			)
			user.value = response.data
			console.log(response.data)
		} catch (error) {
			console.error(error)
			try {
				const response = await axiosInstance.post('/api/v1/user/refresh/', {
					refresh: auth.refreshToken
				})
				auth.setAcesstoken(response.data.access) // update the access token
				// Retry fetching user profile after refreshing the token
				fetchUserProfile()
			} catch (error) {
				// log out the user
				auth.logout()
			}
		}
	}
	fetchUserProfile()
})

const closeProfileFriend = () => {
	store.setProfileId(null)
}
const message = () => {
	store.setActiveConversation(store.profile_id)
	store.setActiveConversationName(
		`${user.value.first_name} ${user.value.last_name}`
	)
	closeProfileFriend()
}

const addFriend = async () => {
	try {
		const response = await axiosInstance.post(
			`/api/v1/user/send-friend-request/`,
			{
				id: user.value.id // include the user's ID in the request body
			},
			{
				headers: {
					Authorization: `Bearer ${auth.accessToken}`
				}
			}
		)
		console.log(response.data)
	} catch (error) {
		console.error(error)
	}
}
const changeInfo = () => {
	router.push('/changeInformation')
}
</script>

<style>
/* Add your styles here */
.button {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px; /* Adjust this value as needed */
	margin-top: 30px;
	margin-left: 0px;
}

.container {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	right: 0;
	width: 400vh;
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

.card__btn {
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
.close-btn {
	position: absolute;
	top: 10px;
	right: 10px;
	background: none;
	border: none;
	font-size: 20px;
	color: #fff;
	cursor: pointer;
	transition: color 0.3s ease;
}

.close-btn:hover {
	color: #ff0000; /* Change the color to red when hovered */
}
</style>
