import axios from 'axios'
import { useStore } from '@/stores/store.js'

const store = useStore()

const instance = axios.create({
	baseURL: 'http://127.0.0.1:8000/'
})

instance.interceptors.request.use(
	config => {
		if (store.accessToken) {
			config.headers['Authorization'] = `Bearer ${store.accessToken}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

export default instance
