<template>
	<div class="d-flex" style="height: 100vh">
		<LeftBar />
		<NoChatSelected v-if="!getActiveConversation()" class="flex-grow-1" />
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import LeftBar from '@/components/Chat/leftBar.vue'
import NoChatSelected from '@/components/Chat/NoChatSelected.vue'

const getActiveConversation = () => {
	const route = useRouter()
	return route.currentRoute.value.params.id ? true : false
}
</script>

<style lang="scss" scoped></style>
