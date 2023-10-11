<template>
	<div class="city-group">
		<van-index-bar :sticky="false" highlight-color="#ff9854" :index-list="indexList">
			<van-index-anchor index="热门" />
			<div class="list">
				<template v-for="(city, index) in groupData.hotCities" :key="index">
					<div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
				</template>
			</div>

			<template v-for="(group, index) in groupData.cities" :key="index">
				<van-index-anchor :index="group.group" />
				<template v-for="(city, key) in group.cities" :key="key">
					<van-cell :title="city.cityName" @click="cityClick(city)" />
				</template>
			</template>
		</van-index-bar>
	</div>
</template>

<script setup>
	import { computed, defineProps } from 'vue'
	import { useRouter } from 'vue-router'
	import useCityStore from '@/stores/modules/city'

	// 定义组件的props
	const props = defineProps({
		groupData: {
			type: Object,
			default: () => {}
			// required: true
		}
	})

	// 动态索引列表
	const indexList = computed(() => {
		const list = props.groupData.cities.map((item) => item.group)
		list.unshift('#')
		return list
	})

	// 城市点击事件
	const router = useRouter()
	const cityStore = useCityStore()
	const cityClick = (city) => {
		// console.log('[ cityClick city ] >', city)
		// 选中当前城市
		cityStore.currentCity = city
		// 返回上一级
		router.back()
	}
</script>

<style lang="less" scoped>
	.list {
		display: flex;
		flex-wrap: wrap;
		// justify-content: space-around;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 10px 25px 10px 10px;
		.city {
			width: 70px;
			height: 28px;
			background-color: #fdf0e7;
			border-radius: 14px;
			font-size: 12px;
			color: #000;
			text-align: center;
			line-height: 28px;
			margin: 10px 0;
		}
	}
</style>
