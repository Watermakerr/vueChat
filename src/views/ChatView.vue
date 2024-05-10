<template>
	<div class="d-flex" style="height: 100vh">
		<LeftBar />
		<NoChatSelected v-if="!getActiveConversation()" class="flex-grow-1" />
		<ChatWindow v-else />
	</div>
</template>

<script setup>
import { useStore } from '@/stores/store'
import LeftBar from '@/components/Navigation/LeftBar.vue'
import NoChatSelected from '@/components/Chat/NoChatSelected.vue'
import ChatWindow from '@/components/Chat/ChatWindow.vue'

const store = useStore()

const getActiveConversation = () => {
	return store.activeConversation ? true : false
}
</script>

<style lang="scss" scoped></style>
