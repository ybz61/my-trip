import apiRequest from '../request'

// 详情相关

export function getDetailInfo(houseId) {
	return apiRequest.get({ url: '/detail/infos', params: { houseId } })
}
