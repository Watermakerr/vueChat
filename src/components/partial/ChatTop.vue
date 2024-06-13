<template>
	<div class="msg-header">
		<div class="container1">
			<img
				:src="ProfileImg"
				class="msgimg"
				style="cursor: pointer"
				@click="showProfileFriend"
			/>
			<!-- Add @click here -->
			<div class="active" @click="showProfileFriend">
				<!-- Add @click here -->
				<p>{{ store.activeConversationName }}</p>
			</div>
		</div>
		<button class="close-btn" @click="closeChat" style="color: black">x</button>
	</div>
</template>

<script setup>
import Profile from '@/assets/profile.jpg'
import { ref } from 'vue'
import { useStore } from '@/stores/store'

const store = useStore()
const ProfileImg = ref(Profile)

const closeChat = () => {
	store.setActiveConversation(null)
}

const showProfileFriend = () => {
	store.setProfileId(store.activeConversation)
}
</script>

<style lang="scss" scoped>
.active {
	margin-top: 12px;
	margin-bottom: auto;
	cursor: pointer;
}
img {
	width: 50px;
	vertical-align: middle;
	border-style: none;
	border-radius: 100%;
}
/* Styling the msg-header container */
.msg-header {
	border: 1px solid #ccc;
	width: 100%;
	height: 10%;
	border-bottom: none;
	display: inline-block;
	background-color: #efefef;
	margin: 0;
	position: relative;
}
/* Styling the profile picture */
.msgimg {
	margin-left: 2%;
	float: left;
}

.container1 {
	width: 270px;
	height: 100%;
	float: left;
	margin: 0;
}
.close-btn {
	position: absolute;
	display: flex; /* Add this line */
	justify-content: center; /* Add this line */
	align-items: center; /* Add this line */
	top: 20%;
	right: 2%;
	border: 1px solid #000;
	background: none;
	width: 30px;
	height: 30px;
	transition:
		background-color 0.3s ease,
		color 0.3s ease;
}

.close-btn:hover {
	background-color: #fff; /* Add this line */
	color: #000; /* Add this line */
}
</style>
