import apiRequest from '../request'

// 订单相关

// 订单列表
export function getOrderList(type) {
	return apiRequest.get({
		url: '/order/list',
		params: {
			type
		}
	})
}
