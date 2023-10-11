<template>
	<div class="home-content">
		<h2 class="title">热门精选</h2>
		<div class="list">
			<template v-for="(item, index) in houselist" :key="item.data.houseId">
				<house-item-v9 @click="itemClick(item)" v-if="item.discoveryContentType === 9" :item-data="item.data" />
				<house-item-v3
					@click="itemClick(item)"
					v-else-if="item.discoveryContentType === 3"
					:item-data="item.data"
				/>
			</template>
		</div>
	</div>
</template>

<script setup>
	import HouseItemV9 from '../cpns/house-item-v9.vue'
	import HouseItemV3 from '../cpns/house-item-v3.vue'
	import useHomeStore from '@/stores/modules/home'
	import { storeToRefs } from 'pinia'
	// import router from '@/router'
	import { useRouter } from 'vue-router'

	const homeStore = useHomeStore()
	const { houselist } = storeToRefs(homeStore)

	const router = useRouter()
	const itemClick = (item) => {
		// console.log('[ item ] >', item)
		router.push({
			name: 'Detail',
			params: {
				id: item.data.houseId
			}
		})
	}

	// const props = defineProps({
	//   houselist: {
	//     type: Array,
	//     default: () => []
	//   }
	// })
</script>

<style lang="less" scoped>
	.home-content {
		padding: 10px 8px;
		.title {
			font-size: 22px;
			padding: 10px;
		}
		.list {
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>
