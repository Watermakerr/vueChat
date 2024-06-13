<template>
	<div class="friend-list">
		<div
			class="friend-card card"
			v-for="friend in friends"
			:key="friend.id"
			@click="displayFriend(friend)"
		>
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
						<h5>{{ friend.first_name }} {{ friend.last_name }}</h5>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue'
import ProfileImg from '@/assets/profile.jpg'
import axiosInstance from '@/api/axios.js'
import { useAuthStore } from '@/stores/auth'
import { useStore } from '@/stores/store' // import your store
const store = useStore() // use your store

const props = defineProps({
	friends: Array
})
const displayFriend = friend => {
	console.log(friend)
	store.setProfileId(friend.id) // set profile_id to the id of the clicked friend
	console.log(store.profile_id)
}
</script>

<style scoped>
.friend-card {
	width: 100%;
	height: 50px;
	overflow: hidden;
	display: flex;
}
.friend-list {
	height: 100%;
	overflow-y: auto;
}

.profile-img {
	width: 50px;
	height: 50px;
}
</style>
