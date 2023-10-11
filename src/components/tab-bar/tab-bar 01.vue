<template>
	<div class="tab-bar">
		<template v-for="(item, index) in tabbarList" :key="index">
			<div class="tab-bar-item" :class="{ active: currentIndex === index }" @click="itemClick(item, index)">
				<img v-if="currentIndex !== index" :src="getAssetUrl(item.image)" :alt="item.text" />
				<img v-else :src="getAssetUrl(item.imageActive)" :alt="item.text" />
				<span class="text">{{ item.text }}</span>
			</div>
		</template>
	</div>
</template>

<script setup>
	import tabbarList from '@/assets/data/tabbar.js'
	import { getAssetUrl } from '@/utils/getAssets.js'
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'

	const currentIndex = ref(0)
	const router = useRouter()
	const itemClick = (item, index) => {
		currentIndex.value = index
		router.push(item.path)
	}
</script>

<style lang="less" scoped>
	.tab-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 55px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 30px;
		// background-color: pink;
		border-top: 1px solid #f3f3f3;
		.tab-bar-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			&.active {
				color: var(--primary-color);
			}
			img {
				display: block;
				width: 36px;
			}
			.text {
				font-size: 0.12rem;
				// color: ;
			}
		}
	}
</style>
