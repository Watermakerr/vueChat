<template>
	<div class="container1">
		<h1 class="contact-header">Danh sách bạn bè</h1>
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
	align-items: center; /* Center align items horizontally */
}

.contact-header {
	font-family: 'Arial', sans-serif; /* Choose a modern font */
	font-size: 2.5rem; /* Make the font size larger */
	font-weight: bold; /* Make the font bold */
	color: black; /* Choose a primary color */
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
	margin-top: 15px; /* Add space above the heading */
	margin-bottom: 15px; /* Add space below the heading */
	letter-spacing: 1px; /* Add space between letters */
}

.friend-container {
	max-height: calc(
		100vh - 50px
	); /* Adjust 50px to the height of your SearchBar */
	overflow-y: auto; /* Enable vertical scrolling */
	width: 100%; /* Ensure the container takes full width */
	padding: 10px; /* Add some padding */
}
</style>
