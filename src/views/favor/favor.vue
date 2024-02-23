<template>
	<div class="favor">
		<van-nav-bar title="收藏" fixed placeholder />
		<template v-for="(item, index) in favorList.items" :key="index">
			<FavorItem :itemData="item" />
		</template>
	</div>
</template>

<script setup>
	import { storeToRefs } from 'pinia'
	import useFavorStore from '@/stores/modules/favor'

	import FavorItem from './cpns/favor-item.vue'

	const favorStore = useFavorStore()
	favorStore.fetchFavorList()
	const { favorList } = storeToRefs(favorStore)
</script>

<style lang="less" scoped></style>
