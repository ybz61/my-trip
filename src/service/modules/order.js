import apiRequest from '../request'

// 订单相关

export function orderlist(params) {
	return apiRequest.get({ url: '/order/list', params })
}
