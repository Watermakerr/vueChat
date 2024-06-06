<template>
	<div class="friend-list">
		<div class="friend-card card" v-for="friend in friends" :key="friend.id">
			<div class="row g-0 align-items-center">
				<div class="col-md-2">
					<img
						:src="ProfileImg"
						class="profile-img img-fluid rounded-start"
						alt="Profile image"
					/>
				</div>
				<div class="col-md-8 d-flex">
					<h5>{{ friend.username }}</h5>
					<div style="margin-left: 70px">
						<button class="" @click="acceptRequest(friend.id)">
							<font-awesome-icon :icon="faCheck" />
						</button>
						<button class="ms-4" @click="rejectRequest(friend.id)">
							<font-awesome-icon :icon="faTimes" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, onMounted } from 'vue'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import ProfileImg from '@/assets/profile.jpg'
import axiosInstance from '@/api/axios.js'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

let friends = ref([])

onMounted(async () => {
	try {
		const response = await axiosInstance.get('/api/v1/user/friend-requests/', {
			headers: {
				Authorization: `Bearer ${auth.accessToken}`
			}
		})
		friends.value = response.data.friend_requests
		console.log(friends.value)
	} catch (error) {
		console.log(error)
	}
})

const acceptRequest = async id => {
	try {
		console.log(`Accept request: ${id}`)
		const response = await axiosInstance.post(
			'/api/v1/user/accept-friend-request/',
			{ id },
			{
				headers: {
					Authorization: `Bearer ${auth.accessToken}`
				}
			}
		)
		console.log(response.data)
		// Remove the accepted friend request from the list
		friends.value = friends.value.filter(friend => friend.id !== id)
	} catch (error) {
		console.error(error)
	}
}
const rejectRequest = id => {
	// handle reject request
	console.log(`Reject request: ${id}`)
}
</script>

<style scoped>
.friend-card {
	width: 100%;
	height: 50px;
	overflow: hidden;
	display: flex;
}

.profile-img {
	width: 50px;
	height: 50px;
}
</style>
