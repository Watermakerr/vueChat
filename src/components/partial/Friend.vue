<template>
	<div class="friend-list">
		<div class="friend-card card" v-for="friend in friends" :key="friend.id">
			<div class="row g-0 align-items-start">
				<div class="col-md-2">
					<img
						:src="ProfileImg"
						class="profile-img img-fluid rounded-start"
						alt="Profile image"
					/>
				</div>
				<div class="col-md-8">
					<div class="card-body">
						<h5>{{ friend.username }}</h5>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="friend-list">
		<div class="friend-card card" v-for="friend in friends" :key="friend.id">
			<div class="row g-0 align-items-start">
				<div class="col-md-2">
					<img
						:src="ProfileImg"
						class="profile-img img-fluid rounded-start"
						alt="Profile image"
					/>
				</div>
				<div class="col-md-8">
					<div class="card-body">
						<h5>{{ friend.username }}</h5>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="friend-list">
		<div class="friend-card card" v-for="friend in friends" :key="friend.id">
			<div class="row g-0 align-items-start">
				<div class="col-md-2">
					<img
						:src="ProfileImg"
						class="profile-img img-fluid rounded-start"
						alt="Profile image"
					/>
				</div>
				<div class="col-md-8">
					<div class="card-body">
						<h5>{{ friend.username }}</h5>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="friend-list">
		<div class="friend-card card" v-for="friend in friends" :key="friend.id">
			<div class="row g-0 align-items-start">
				<div class="col-md-2">
					<img
						:src="ProfileImg"
						class="profile-img img-fluid rounded-start"
						alt="Profile image"
					/>
				</div>
				<div class="col-md-8">
					<div class="card-body">
						<h5>{{ friend.username }}</h5>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="friend-list">
		<div class="friend-card card" v-for="friend in friends" :key="friend.id">
			<div class="row g-0 align-items-start">
				<div class="col-md-2">
					<img
						:src="ProfileImg"
						class="profile-img img-fluid rounded-start"
						alt="Profile image"
					/>
				</div>
				<div class="col-md-8">
					<div class="card-body">
						<h5>{{ friend.username }}</h5>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="friend-list">
		<div class="friend-card card" v-for="friend in friends" :key="friend.id">
			<div class="row g-0 align-items-start">
				<div class="col-md-2">
					<img
						:src="ProfileImg"
						class="profile-img img-fluid rounded-start"
						alt="Profile image"
					/>
				</div>
				<div class="col-md-8">
					<div class="card-body">
						<h5>{{ friend.username }}</h5>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="friend-list">
		<div class="friend-card card" v-for="friend in friends" :key="friend.id">
			<div class="row g-0 align-items-start">
				<div class="col-md-2">
					<img
						:src="ProfileImg"
						class="profile-img img-fluid rounded-start"
						alt="Profile image"
					/>
				</div>
				<div class="col-md-8">
					<div class="card-body">
						<h5>{{ friend.username }}</h5>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="friend-list">
		<div class="friend-card card" v-for="friend in friends" :key="friend.id">
			<div class="row g-0 align-items-start">
				<div class="col-md-2">
					<img
						:src="ProfileImg"
						class="profile-img img-fluid rounded-start"
						alt="Profile image"
					/>
				</div>
				<div class="col-md-8">
					<div class="card-body">
						<h5>{{ friend.username }}</h5>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="friend-list">
		<div class="friend-card card" v-for="friend in friends" :key="friend.id">
			<div class="row g-0 align-items-start">
				<div class="col-md-2">
					<img
						:src="ProfileImg"
						class="profile-img img-fluid rounded-start"
						alt="Profile image"
					/>
				</div>
				<div class="col-md-8">
					<div class="card-body">
						<h5>{{ friend.username }}</h5>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProfileImg from '@/assets/profile.jpg'
import axiosInstance from '@/api/axios.js'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

let friends = ref([])

onMounted(() => {
	const fetchFriends = async () => {
		try {
			const response = await axiosInstance.get('/api/v1/user/friends/', {
				headers: {
					Authorization: `Bearer ${auth.accessToken}`
				}
			})
			friends.value = response.data.friends
			console.log(friends.value)
		} catch (error) {
			console.error(error)
		}
	}
	fetchFriends()
})
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
