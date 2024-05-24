<template>
	<div class="container1">
		<SearchBar style="width: 30vw" />
		<div class="friend-container">
			<Friend class="friend1" />
		</div>
	</div>
</template>

<script setup>
import SearchBar from '@/components/partial/SearchBar.vue'
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
