import { defineStore } from 'pinia'

import { localCache } from '@/utils/cache'
localCache.setCache('tripToken', '123456')
localCache.setCache('tripUserInfo', { name: 'iKun', age: 18, photo: 'https://avatars.githubusercontent.com/u/88810970' })

const startDate = new Date()
const endDate = new Date()
endDate.setDate(startDate.getDate() + 1)

const useMainStore = defineStore('main', {
	state: () => ({
		token: localCache.getCache('tripToken') || '',
		userInfo: localCache.getCache('tripUserInfo') || {},

		startDate: startDate,
		endDate: endDate,

		isLoading: false
	})
})

export default useMainStore
