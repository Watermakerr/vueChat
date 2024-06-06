<template>
	<div class="msg-header">
		<div class="container1">
			<img :src="ProfileImg" class="msgimg" />
			<div class="active" @click="showProfileFriend()">
				<p>Nguyễn A</p>
			</div>
		</div>
		<button class="close-btn" @click="closeChat">x</button>
	</div>
</template>

<script setup>
import Profile from '@/assets/profile.jpg'
import { ref, onMounted } from 'vue'
import axiosInstance from '@/api/axios.js'
import { useStore } from '@/stores/store'
import { useAuthStore } from '@/stores/auth'

const ProfileImg = ref(Profile)
const store = useStore()
const auth = useAuthStore()

const user = ref(null)

// onMounted(() => {
// 	const fetchUserProfile = async () => {
// 		try {
// 			const response = await axiosInstance.get(
// 				`/api/v1/user/profile/${store.profile_id}`,
// 				{
// 					headers: {
// 						Authorization: `Bearer ${auth.accessToken}`
// 					}
// 				}
// 			)
// 			user.value = response.data
// 			console.log(response.data)
// 		} catch (error) {
// 			console.error(error)
// 			try {
// 				const response = await axiosInstance.post('/api/v1/user/refresh/', {
// 					refresh: auth.refreshToken
// 				})
// 				auth.setAcesstoken(response.data.access) // update the access token
// 				// Retry fetching user profile after refreshing the token
// 				fetchUserProfile()
// 			} catch (error) {
// 				// log out the user
// 				auth.logout()
// 			}
// 		}
// 	}
// 	fetchUserProfile()
// })
const closeChat = () => {
	store.setActiveConversation(null)
}

const showProfileFriend = () => {
	store.goToProfileFriend = true
}
</script>

<style lang="scss" scoped>
/* Styling the msg-header container */
.msg-header {
	border: 1px solid #e0e0e0;
	width: 100%;
	height: 60px; /* Adjusted height */
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #f5f5f5;
	padding: 0 10px;
}

/* Styling the profile picture */
.msgimg {
	width: 40px; /* Adjusted size */
	height: 40px; /* Adjusted size */
	border-radius: 50%;
	object-fit: cover;
}

.container1 {
	display: flex;
	align-items: center;
}

.close-btn {
	border: none;
	background: #333;
	color: white;
	font-size: 16px;
	width: 25px;
	height: 25px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.close-btn:hover {
	background-color: white;
	color: #333;
}

.active {
	margin-left: 10px;
	font-size: 16px;
	color: #333;
}

/* Additional styles for better appearance */
p {
	margin: 0;
	color: #555; /* Darker font color for better readability */
}

/* Enhance overall padding and margin for a cleaner look */
.container1 {
	padding: 0 15px;
}
</style>
