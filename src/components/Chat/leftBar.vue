<template>
	<div style="display: flex">
		<div class="icon-bar d-flex flex-column justify-content-between">
			<div>
				<a
					href="#"
					:class="{ active: store.activeSidebarComponent === 'home' }"
					@click="setActiveComponent('home')"
				>
					<FontAwesomeIcon :icon="faHome" />
				</a>
				<a
					href="#"
					:class="{ active: store.activeSidebarComponent === 'message' }"
					@click="setActiveComponent('message')"
				>
					<FontAwesomeIcon :icon="faEnvelope" />
				</a>
			</div>
			<div>
				<a href="#"><FontAwesomeIcon :icon="faGear" /></a>
				<a href="#"><FontAwesomeIcon :icon="faUser" /></a>
				<a href="#"><FontAwesomeIcon :icon="faSignOut" /></a>
			</div>
		</div>
		<div class="content">
			<component :is="activeComponent" style="width: 30vw" />
		</div>
	</div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faHome,
	faEnvelope,
	faGear,
	faUser,
	faSignOut
} from '@fortawesome/free-solid-svg-icons'
import { ref, computed } from 'vue'
import { useStore } from '@/stores/store.js'
import Message from './message.vue'
import Home from './Home.vue'

const store = useStore()

const setActiveComponent = component => {
	localStorage.setItem('activeSidebarComponent', component)
	store.activeSidebarComponent = component
}

const activeComponent = computed(() => {
	if (store.activeSidebarComponent === 'message') {
		return Message
	} else if (store.activeSidebarComponent === 'home') {
		return Home
	} else {
		return Message
	}
})
</script>

<style lang="scss" scoped>
.icon-bar {
	width: 90px;
	background-color: #555;
	height: 100vh;
}

.icon-bar a {
	display: block;
	text-align: center;
	padding: 16px;
	transition: all 0.3s ease;
	color: white;
	font-size: 36px;
}

.icon-bar a:hover {
	background-color: #000;
}

.active {
	background-color: #04aa6d;
}

.content {
	width: calc(100% - 90px);
	height: 100vh;
}
</style>
