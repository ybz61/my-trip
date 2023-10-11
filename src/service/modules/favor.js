import apiRequest from '../request'

// 收藏相关

// 收藏列表
export function getFavorList(params) {
	return apiRequest.get({ url: '/favor/list' })
}

// 浏览历史
export function getFavorHistory(params) {
	return apiRequest.get({ url: '/favor/history' })
}
