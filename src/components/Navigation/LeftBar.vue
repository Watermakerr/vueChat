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
				<button
					:class="{
						active: store.activeSidebarComponent.valueOf === 'Search'
					}"
					@click="setActiveComponent('Search')"
				>
					<FontAwesomeIcon :icon="faSearch" />
				</button>
			</div>
			<div>
				<div class="settings-container">
					<div
						class="settings"
						@mouseover="showSettings = true"
						@mouseleave="showSettings = false"
					>
						<button class="settings-button">
							<FontAwesomeIcon :icon="faGear" />
						</button>
						<transition name="slide">
							<div v-show="showSettings" class="submenu" style="width: 62.5px">
								<button
									@click="changePassword"
									style="font-size: 14px; padding: 0"
								>
									Đổi mật khẩu
								</button>
							</div>
						</transition>
					</div>
				</div>

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
import { ref, computed, watch } from 'vue'
import { useStore } from '@/stores/store.js'
import { useAuthStore } from '@/stores/auth.js'
import MessageBar from './MessageBar.vue'
import Contact from './Contact.vue'
import Addfriend from './AddFriend.vue'
import Search from './Search.vue'

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
	} else if (store.activeSidebarComponent === 'Search') {
		return Search
	}
})
const profile = () => {
	store.setProfileId(auth.currentUserId)
}

const logout = () => {
	auth.logout()
	router.push('/login')
}
let showSettings = ref(false)
const changePassword = () => {
	router.push('/changePassword')
}
</script>

<style lang="scss" scoped>
.settings-container {
	position: relative;
}
.settings {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}
.settings-button {
	background: none;
	border: none;
	cursor: pointer;
}
.submenu {
	position: absolute;
	left: 100%;
	top: 0;
	background-color: #333;
	font-size: 20px; /* make font size smaller */
	min-width: 160px;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	padding: 12px 16px;
	z-index: 1;
}
.submenu button {
	padding: 8px 12px; /* reduce padding to make button smaller */
	display: flex; /* center content and make it fill the button */
	align-items: center;
	justify-content: center;
	border: none;
	cursor: pointer;
	background-color: transparent; /* make button background transparent */
	color: #fff; /* change font color to white */
	width: 100%; /* make content fill the button */
}

.submenu button:hover {
	background-color: #555; /* change background color to a slightly lighter grey on hover */
	color: #fff; /* keep font color white on hover */
}
.slide-enter-active,
.slide-leave-active {
	transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
	transform: translateX(100%);
}
.icon-bar {
	width: 60px; /* Adjust as needed */
	background-color: #555;
	height: 100vh;
}

.icon-bar button {
	display: block;
	text-align: center;
	padding: 8px; /* Adjust as needed */
	transition: all 0.3s ease;
	color: white;
	font-size: 24px; /* Adjust as needed */
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
	width: calc(100% - 60px); /* Adjust as needed */
	height: 100vh;
}
</style>
