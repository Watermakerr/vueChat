<template>
	<div style="display: flex" class="border-end">
		<div class="icon-bar d-flex flex-column justify-content-between">
			<div>
				<button
					:class="{ active: store.activeSidebarComponent.valueOf === 'home' }"
					@click="setActiveComponent('home')"
				>
					<FontAwesomeIcon :icon="faHome" />
				</button>
				<button
					:class="{
						active: store.activeSidebarComponent.valueOf === 'message'
					}"
					@click="setActiveComponent('message')"
				>
					<FontAwesomeIcon :icon="faEnvelope" />
				</button>
			</div>
			<div>
				<button @click="login">
					<FontAwesomeIcon :icon="faGear" />
				</button>

				<button><FontAwesomeIcon :icon="faUser" /></button>

				<button><FontAwesomeIcon :icon="faSignOut" /></button>
			</div>
		</div>
		<div class="content">
			<component :is="activeComponent" style="width: 30vw" />
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
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
import MessageBar from './MessageBar.vue'
import Home from '@/components/Chat/Home.vue'
import Login from '@/views/Login.vue'
const store = useStore()
const router = useRouter() // Thêm dòng này để khai báo biến router

const login = () => {
	router.push('/login') // Sử dụng biến router để thực hiện chuyển hướng
}

const setActiveComponent = component => {
	localStorage.setItem('activeSidebarComponent', component)
	store.activeSidebarComponent = component
	console.log(store.activeSidebarComponent)
}

const activeComponent = computed(() => {
	if (store.activeSidebarComponent === 'message') {
		return MessageBar
	} else if (store.activeSidebarComponent === 'home') {
		return Home
	}
})
</script>

<style lang="scss" scoped>
.icon-bar {
	width: 90px;
	background-color: #555;
	height: 100vh;
}

.icon-bar button {
	display: block;
	text-align: center;
	padding: 16px;
	transition: all 0.3s ease;
	color: white;
	font-size: 36px;
	background: none;
	border: none;
	width: 100%;
}

.icon-bar button:hover {
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
