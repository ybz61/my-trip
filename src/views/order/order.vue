<template>
	<div class="order">
		<van-nav-bar title="订单" fixed placeholder />
		<template v-for="(item, index) in orderList.orders" :key="item.orderId">
			<OrderItem :itemData="item" />
		</template>
	</div>
</template>

<script setup>
	import useOrderStore from '@/stores/modules/order'
	import OrderItem from './cpns/order-item.vue'
	import { storeToRefs } from 'pinia'

	const orderStore = useOrderStore()
	orderStore.fetchOrderList()
	const { orderList } = storeToRefs(orderStore)
</script>

<style lang="less" scoped>
	.order {
		box-sizing: border-box;
		padding-bottom: 60px;
	}
</style>
