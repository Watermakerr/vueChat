<template>
	<div class="outgoing-chats">
		<div class="outgoing-msg">
			<div class="outgoing-chats-msg">
				<p>
					{{ props.message.message }}
				</p>

				<span class="time">{{ formatDate(props.message.timestamp) }}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import Profile from '@/assets/profile.jpg'
import { ref } from 'vue'

const ProfileImg = ref(Profile)
const props = defineProps({
	message: {
		type: Object,
		required: true,
		default: () => ({ message: '', timestamp: '' })
	}
})
const formatDate = timestamp => {
	let date = new Date(timestamp)
	let day = String(date.getDate()).padStart(2, '0') // pad single digit day with 0
	let month = String(date.getMonth() + 1).padStart(2, '0') // pad single digit month with 0
	let year = date.getFullYear()
	let hours = String(date.getHours()).padStart(2, '0') // pad single digit hours with 0
	let minutes = String(date.getMinutes()).padStart(2, '0') // pad single digit minutes with 0

	return `${day}-${month}-${year} ${hours}:${minutes}`
}
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
