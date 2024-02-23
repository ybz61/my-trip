import { defineStore } from 'pinia'
import { getOrderList } from '@/service'

const useOrderStore = defineStore('order', {
	state: () => ({
		typeParams: 'all', // type=pend 未完成订单 type=recent 最近订单 type=all 全部订单
		orderList: []
	}),
	actions: {
		async fetchOrderList() {
			const res = await getOrderList(this.typeParams)
			// console.log('[ res ] >', res)
			this.orderList = res.data.data
		}
	}
})

export default useOrderStore
