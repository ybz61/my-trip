import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
	history: createWebHashHistory(),
	// 映射关系:path -> component
	routes: [
		{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/home',
			component: () => import('@/views/home/home.vue'),
			name: 'Home'
		},
		{
			path: '/favor',
			component: () => import('@/views/favor/favor.vue'),
			name: 'Favor'
		},
		{
			path: '/order',
			component: () => import('@/views/order/order.vue'),
			name: 'Order'
		},
		{
			path: '/message',
			component: () => import('@/views/message/message.vue'),
			name: 'Message'
		},
		{
			path: '/city',
			component: () => import('@/views/city/city.vue'),
			name: 'City',
			meta: {
				// 部分页面需要隐藏tabbar的方案一
				hideTabBar: true
			}
		},
		{
			path: '/search',
			component: () => import('@/views/search/search.vue'),
			name: 'Search',
			meta: {
				hideTabBar: true
			}
		},
		{
			path: '/detail/:id',
			component: () => import('@/views/detail/detail.vue'),
			name: 'Detail',
			meta: {
				hideTabBar: true
			}
		}
	]
})

export default router
