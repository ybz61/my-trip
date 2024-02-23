<template>
	<div class="order_item">
		<van-card :num="itemData.cityTerritoryType" :price="itemData.prepayAmount+'.00'" :desc="itemData.hotelName" :title="itemData.unitName" :thumb="itemData.unitPicture">
			<template #tags>
				<van-tag plain type="danger">{{ itemData.cityName }}</van-tag>
        &nbsp&nbsp
				<van-tag plain type="danger">{{ itemData.orderStatusDesc }}</van-tag>
			</template>
			<!-- <template #footer>
				<van-button size="mini">按钮</van-button>
				<van-button size="mini">按钮</van-button>
			</template> -->
		</van-card>
	</div>
</template>

<script setup>
	const props = defineProps({
		itemData: {
			type: Object,
			default: () => {}
		}
	})
</script>

<style scoped lang="less">
	.order_item {
		color: red;
    margin-bottom: 10px;
	}
</style>
