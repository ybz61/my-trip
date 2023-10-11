import { defineStore } from 'pinia'

const useCityStore = defineStore('city', {
	state: () => ({
		allCities: {},
		currentCity: {
			cityId: 45,
			cityName: '广州',
			pinYin: 'guangzhou',
			gangAoTai: false,
			hot: false,
			longitude: '113.271',
			latitude: '23.1354'
		}
	}),
	actions: {
		async fetchAllCitiesData() {
			const res = await getCityAll()
			this.allCities = res.data
		}
	}
})

export default useCityStore
