<template>
	<div class="body">
		<div v-if="isSuccess" class="notification">
			<div class="notification__body">
				Your account has been created! &#128640;
			</div>
			<div class="notification__progress"></div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Đặt isSuccess và showSuccessNotification ở đây
const isSuccess = ref(false)

const showSuccessNotification = () => {
	isSuccess.value = true
	setTimeout(() => {
		isSuccess.value = false
	}, 5000)
}

// Lắng nghe sự kiện show-notification
onMounted(() => {
	// Giả định có một event bus toàn cầu
	const eventBus = window.eventBus || { $on: () => {} }
	eventBus.$on('show-notification', showSuccessNotification)
})
</script>

<style>
:root {
	--notification-background: #313e2c;
	--notification-primary: #aaec8a;
	--background: #faf9ff;
}

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

body {
	font-family: 'Poppins', sans-serif;
	height: 100vh;
	background-color: var(--background);
}

.notification {
	position: absolute;
	width: max-content;
	left: 0;
	right: 0;
	bottom: 1.5rem;
	margin-left: auto;
	margin-right: auto;
	border-radius: 0.375rem;
	background-color: var(--notification-background);
	color: var(--notification-primary);
	box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
	transform: translateY(1.875rem);
	opacity: 0;
	visibility: hidden;
	animation: fade-in 3s linear;
}

.notification__icon {
	height: 1.625rem;
	width: 1.625rem;
	margin-right: 0.25rem;
}

.notification__body {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 1rem 0.5rem;
}

.notification__progress {
	position: absolute;
	left: 0.25rem;
	bottom: 0.25rem;
	width: calc(100% - 0.5rem);
	height: 0.2rem;
	transform: scaleX(0);
	transform-origin: left;
	background: linear-gradient(
		to right,
		var(--notification-background),
		var(--notification-primary)
	);
	border-radius: inherit;
	animation: progress 2.5s 0.3s linear;
}

@keyframes fade-in {
	5% {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
	}
	95% {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes progress {
	to {
		transform: scaleX(1);
	}
}
</style>
