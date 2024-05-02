<template>
	<div class="received-chats">
		<div class="received-msg">
			<div class="received-msg-inbox">
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
					vel cumque repellendus hic, est enim! Iste laudantium architecto
					veritatis odio molestiae dignissimos dolor repudiandae eum quos,
					suscipit, vitae tempore vel.
				</p>
				<span class="time"> time </span>
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
.received-chats-img {
	width: 50px;
	float: left;
	height: auto;
}

.received-msg {
	display: inline-block;
	padding: 0 0 0 10px;
	vertical-align: top;
	width: 92%;
}
.received-msg-inbox {
	width: 80%;
}

.received-msg-inbox p {
	background: #efefef none repeat scroll 0 0;
	border-radius: 10px;
	color: #646464;
	font-size: 14px;
	margin-left: 1rem;
	padding: 1rem;
	width: 100%;
	box-shadow: rgb(0 0 0 / 25%) 0px 5px 5px 2px;
}
p {
	overflow-wrap: break-word;
}
.time {
	color: #777;
	display: block;
	font-size: 12px;
	margin: 8px 0 0;
}
@media only screen and (max-device-width: 850px) {
	*,
	.time {
		font-size: 28px;
	}
	img {
		width: 65px;
	}
	.msg-header {
		height: 5%;
	}
	.msg-page {
		max-height: none;
	}
	.received-msg-inbox p {
		font-size: 28px;
	}
	.outgoing-chats-msg p {
		font-size: 28px;
	}
}

@media only screen and (max-device-width: 450px) {
	*,
	.time {
		font-size: 28px;
	}
	img {
		width: 65px;
	}
	.msg-header {
		height: 5%;
	}
	.msg-page {
		max-height: none;
	}
	.received-msg-inbox p {
		font-size: 28px;
	}
	.outgoing-chats-msg p {
		font-size: 28px;
	}
}
</style>
