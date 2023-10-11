import apiRequest from '../request'

// 城市相关

// 所有城市
export function getCityAll(params) {
	return apiRequest.get({ url: '/city/all' })
}
