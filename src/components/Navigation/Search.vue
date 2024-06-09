<template>
	<div class="search">
		<h1>Tìm kiếm</h1>
		<SearchBar v-model="phoneNumber" style="width: 98%" />
		<SearchFriend :friends="searchResults.users" />
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import axiosInstance from '@/api/axios.js'
import SearchBar from '@/components/partial/SearchBar.vue'
import SearchFriend from '@/components/partial/SearchFriend.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const phoneNumber = ref('')
const searchResults = ref([])

watch(phoneNumber, async (newVal, oldVal) => {
	console.log(`Phone number changed to: ${newVal}`) // print the new phone number
	if (newVal.length > 9) {
		console.log('Making API request') // print a message before making the API request
		try {
			const response = await axiosInstance.get(
				`/api/v1/user/search-profile?phone=${newVal}`,
				{
					headers: {
						Authorization: `Bearer ${auth.accessToken}`
					}
				}
			)
			searchResults.value = response.data
			console.log(response.data)
		} catch (error) {
			console.error(error)
		}
	}
})
</script>

<style lang="scss" scoped>
.search {
	max-height: 100vh; /* Adjust this value according to your needs */
	overflow-y: auto;
}
</style>
