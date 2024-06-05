<template>
	<div class="container">
		<img class="full-screen-image" :src="image" alt="404 Not Found" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import NotFound from '@/assets/404NotFound.png'

// Use the imported image in your code
const image = ref(NotFound)
</script>

<style lang="scss" scoped>
.container {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}

.full-screen-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
