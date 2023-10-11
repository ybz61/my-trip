<template>
	<div class="city">
		<div class="top">
			<van-search
				v-model="searchVal"
				placeholder="城市/区域/位置"
				shape="round"
				show-action
				@cancel="cancelClick"
			/>
			<van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
				<template v-for="(val, key, index) in allCities" :key="key">
					<van-tab :title="val.title" :name="key"></van-tab>
				</template>
			</van-tabs>
		</div>
		<div class="cont">
			<template v-for="(val, key, index) in allCities">
				<city-group v-show="tabActive === key" :group-data="val" />
			</template>
		</div>
	</div>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { storeToRefs } from 'pinia'
	import useCityStore from '@/stores/modules/city'
	import { getCityAll } from '@/service/index'

	import CityGroup from './cpns/city-group.vue'

	const router = useRouter()

	// 搜索框
	const searchVal = ref('')
	const cancelClick = () => {
		router.back()
	}

	// tab切换
	const tabActive = ref()

	// 城市获取
	const allCities = ref({})
	/**
	 * 这个位置发送网络请求有两个缺点:
	 *   1.如果网络请求太多, 那么页面组件中就包含大量的对于网络请求和数据的处理逻辑
	 *   2.如果页面封装了很多的子组件, 子组件需要这些数据, 我们必须一步步将数据传递过去(props)
	 */
	getCityAll()
		.then((res) => {
			// console.log('[ getCityAll res ] >', res)
			allCities.value = res.data
		})
		.catch((err) => {
			console.log('[ getCityAll err ] >', err)
		})

	// 从Store中获取数据
	// const cityStore = useCityStore()
	// cityStore.fetchAllCitiesData()
	// const { allCities } = storeToRefs(cityStore)

	// 获取选中标签后的数据
	// 1 获取正确的key：将tabs中绑定的tabActive正确绑定
	// 2 根据key从allCities获取数据，默认直接获取的数据不是响应式的，所以必须包裹computed
	// 方式一
	// const currentGroup = allCities.value[tabActive.value] // 不是响应式
	const currentGroup = computed(() => allCities.value[tabActive.value])
	// console.log('[  currentGroup] >', currentGroup)
</script>

<style lang="less" scoped>
	.city {
		position: relative;
		.top {
			position: relative;
			z-index: 9;
		}
		.cont {
			height: calc(100vh - 100px);
			min-height: calc(100vh - 100px);
			overflow-y: auto;
		}
	}
</style>
