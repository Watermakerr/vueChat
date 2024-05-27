<template>
	<div style="display: flex" class="border-end">
		<div class="icon-bar d-flex flex-column justify-content-between">
			<div>
				<button
					:class="{
						active: store.activeSidebarComponent.valueOf === 'messages'
					}"
					@click="setActiveComponent('messages')"
				>
					<FontAwesomeIcon :icon="faEnvelope" />
				</button>
				<button
					:class="{
						active: store.activeSidebarComponent.valueOf === 'Contact'
					}"
					@click="setActiveComponent('Contact')"
				>
					<FontAwesomeIcon :icon="faAddressBook" />
				</button>
				<button
					:class="{
						active: store.activeSidebarComponent.valueOf === 'AddFriend'
					}"
					@click="setActiveComponent('AddFriend')"
				>
					<FontAwesomeIcon :icon="faUserPlus" />
				</button>
			</div>
			<div>
				<button>
					<FontAwesomeIcon :icon="faGear" />
				</button>

				<button>
					<FontAwesomeIcon :icon="faUser" @click="profile()" />
				</button>

				<button><FontAwesomeIcon :icon="faSignOut" @click="logout" /></button>
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
	faSearch,
	faEnvelope,
	faGear,
	faUser,
	faSignOut,
	faAddressBook,
	faUserPlus
} from '@fortawesome/free-solid-svg-icons'
import { ref, computed, watchEffect } from 'vue'
import { useStore } from '@/stores/store.js'
import { useAuthStore } from '@/stores/auth.js'
import MessageBar from './MessageBar.vue'
import Contact from './Contact.vue'
import Addfriend from './AddFriend.vue'

const store = useStore()
const auth = useAuthStore()
const router = useRouter()

const setActiveComponent = component => {
	localStorage.setItem('activeSidebarComponent', component)
	store.activeSidebarComponent = component
	console.log(store.activeSidebarComponent)
}

const activeComponent = computed(() => {
	if (store.activeSidebarComponent === 'messages') {
		return MessageBar
	} else if (store.activeSidebarComponent === 'Contact') {
		return Contact
	} else if (store.activeSidebarComponent === 'AddFriend') {
		return Addfriend
	}
})
const profile = () => {
	router.push('/profile')
}

const logout = () => {
	auth.logout()
	router.push('/login')
}
const props = defineProps({
	newMessage: Object
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
