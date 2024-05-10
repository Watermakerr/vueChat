<template>
	<div class="msg-header">
		<div class="container1">
			<img :src="ProfileImg" class="msgimg" />
			<div class="active">
				<p>User name</p>
			</div>
		</div>
		<button class="close-btn" @click="closeChat">X</button>
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
</script>

<style lang="scss" scoped>
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
	top: 50%;
	right: 2%;
	transform: translateY(-50%);
	border: 1px solid #000; /* Add this line */
	background: none;
	font-size: 1.5em;
	cursor: pointer;
	transition:
		background-color 0.3s ease,
		color 0.3s ease; /* Add this line */
}

.close-btn:hover {
	background-color: #000; /* Add this line */
	color: #fff; /* Add this line */
}
</style>
