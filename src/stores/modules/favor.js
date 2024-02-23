import { defineStore } from 'pinia'
import { getFavorList } from '@/service'

const useFavorStore = defineStore('favor', {
	state: () => ({
		favorList: []
	}),
	actions: {
		async fetchFavorList() {
			const res = await getFavorList()
			this.favorList = res.data.data
		}
	}
})

export default useFavorStore
