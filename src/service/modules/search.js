import apiRequest from '../request'

// 搜索相关

export function searchTop(params) {
	return apiRequest.get({ url: '/search/top', params })
}
