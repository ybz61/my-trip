import apiRequest from '../request'

// 首页相关

// 热门建议
export function getHomeHotSuggests() {
	return apiRequest.get({
		url: '/home/hotSuggests'
	})
}

// 推荐类别
export function getHomeCategories() {
	return apiRequest.get({
		url: '/home/categories'
	})
}

// 房屋列表
export function getHomeHouselist(currentPage) {
	return apiRequest.get({
		url: '/home/houselist',
		params: {
			page: currentPage
		}
	})
}
