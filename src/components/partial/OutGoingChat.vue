<template>
	<div class="outgoing-chats">
		<div class="outgoing-msg">
			<div class="outgoing-chats-msg">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
					architecto corrupti. Odit iure atque voluptas accusantium nihil
					incidunt cupiditate reiciendis saepe vero, ratione quae perferendis
					impedit veritatis nobis laborum ut.
				</p>

				<span class="time">17:24</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import Profile from '@/assets/profile.jpg'
import { ref } from 'vue'

const ProfileImg = ref(Profile)
const props = defineProps({
	content: String,
	time: String
})
</script>

<style lang="scss" scoped>
.time {
	color: #777;
	display: block;
	font-size: 12px;
	margin: 8px 0 0;
}
.outgoing-chats {
	overflow: hidden;
	margin: 26px 20px;
}

.outgoing-chats-msg p {
	background-color: #3a12ff;
	background-image: linear-gradient(
		45deg,
		#ee087f 0%,
		#dd2a7b 25%,
		#9858ac 50%,
		#8134af 75%,
		#515bd4 100%
	);
	color: #fff;
	border-radius: 10px;
	font-size: 14px;
	color: #fff;
	padding: 5px 10px 5px 12px;
	width: 100%;
	padding: 1rem;
	box-shadow: rgb(0 0 0 / 25%) 0px 2px 5px 2px;
}
.outgoing-chats-msg {
	float: right;
	width: 80%;
}

/* Styling the avatar */
</style>
