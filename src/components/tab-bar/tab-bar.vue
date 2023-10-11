<template>
	<div class="tab-bar">
		<van-tabbar v-model="currentIndex" active-color="#ff9854" route>
			<template v-for="(item, index) in tabbarList" :key="index">
				<van-tabbar-item :to="item.path">
					<!-- 默认插槽 -->
					<template #default>
						<span>{{ item.text }}</span>
					</template>
					<!-- 具名插槽 -->
					<template #icon>
						<img v-if="currentIndex !== index" :src="getAssetUrl(item.image)" :alt="item.text" />
						<img v-else :src="getAssetUrl(item.imageActive)" :alt="item.text" />
					</template>
				</van-tabbar-item>
			</template>
		</van-tabbar>
	</div>
</template>

<script setup>
	import { ref, watch } from 'vue'
	import tabbarList from '@/assets/data/tabbar.js'
	import { getAssetUrl } from '@/utils/getAssets.js'
	import { useRoute } from 'vue-router'

	const route = useRoute()
	const currentIndex = ref(0)
	// 监听路由改变时, 找到对应的索引, 设置 currentIndex
	watch(
		() => route.path,
		(val) => {
			const index = tabbarList.findIndex((item) => item.path === val)
			currentIndex.value = index
		}
	)
	// watch(
	// 	route,
	// 	(newRoute) => {
	// 		const index = tabbarList.findIndex((item) => item.path === newRoute.path)
	// 		currentIndex.value = index
	// 	}
	// )
</script>

<style lang="less" scoped>
	.tab-bar {
		img {
			height: 26px;
		}
		// :deep(.class #id) {}
	}
</style>
