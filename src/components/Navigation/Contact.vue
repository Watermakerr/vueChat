<template>
	<div class="container1">
		<h1>Danh bạ</h1>
		<div class="friend-container">
			<Friend class="friend1" />
		</div>
	</div>
</template>

<script setup>
import Friend from '@/components/partial/Friend.vue'
</script>

<style scoped>
.container1 {
	display: flex;
	width: 100%;
	flex-direction: column;
}

.friend-container {
	max-height: calc(
		100vh - 50px
	); /* Adjust 50px to the height of your SearchBar */
	overflow-y: auto; /* Enable vertical scrolling */
}
</style>
