<template>
	<div class="list-group">
		<button
			class="list-group-item list-group-item-action d-flex align-items-center"
			v-for="user in users"
			:key="user.id"
			@click="selectUser(user.id)"
			:class="{ active: selectedUserId === user.id }"
		>
			<img
				:src="user.avatar"
				alt="User avatar"
				class="rounded-circle me-3"
				style="width: 50px; height: 50px"
			/>
			<div class="flex-grow-1">
				<div class="d-flex justify-content-between">
					<h6 class="mb-1">{{ user.name }}</h6>
					<small>{{ user.lastChatTime }}</small>
				</div>
				<p class="mb-0">Last message...</p>
			</div>
		</button>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import profileImage from '@/assets/profile.jpg'
import { useStore } from '@/stores/store'

const store = useStore()

const users = [
	{
		id: 1,
		name: 'User 1',
		avatar: profileImage,
		lastChatTime: '10:00 AM'
	},
	{
		id: 2,
		name: 'User 2',
		avatar: profileImage,
		lastChatTime: '11:00 AM'
	}
]

const selectedUserId = ref(null)

const selectUser = id => {
	selectedUserId.value = id
	store.setActiveConversation(id)
	console.log(store.activeConversation)
}
</script>

<style lang="scss" scoped>
.list-group-item.active {
	background-color: #007bff;
	color: white;
}
</style>
