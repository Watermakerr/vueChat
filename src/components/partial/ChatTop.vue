<template>
	<div class="msg-header">
		<div class="container1">
			<img :src="ProfileImg" class="msgimg" />
			<div class="active">
				<p>User name</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import Profile from '@/assets/profile.jpg'
import { ref } from 'vue'

const ProfileImg = ref(Profile)
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
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
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
</style>
