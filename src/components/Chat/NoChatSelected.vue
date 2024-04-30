<template>
	<div
		class="d-flex align-items-center justify-content-center"
		style="height: 100vh"
	>
		<div class="text-center">
			<FontAwesomeIcon :icon="faComment" />
			<h2>No chat selected</h2>
			<p>Select a chat to start messaging</p>
		</div>
	</div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
</script>

<style lang="scss" scoped>
.no-chat-selected {
	color: #8e8e8e;
}
</style>
