<template>
	<div class="home" ref="homeRef">
		<home-nav-bar />
		<div class="banner">
			<img src="@/assets/img/home/banner.webp" alt="img" />
		</div>
		<home-search-box />
		<home-category />
		<div class="search-bar" v-if="isShowSearchBar">
			<search-bar :start-date="'09.19'" :end-date="'09.20'" />
		</div>
		<home-content />
		<!-- <home-search-box :hot-suggests="hotSuggests" /> -->
		<!-- <home-category :categories="categories" /> -->
		<!-- <home-content :houselist="houselist" /> -->
	</div>
</template>

<script>
	export default {
		name: 'home'
	}
</script>
<script setup>
	import { onMounted, onUnmounted, ref, watch, computed, onActivated } from 'vue'
	import { useRouter } from 'vue-router'

	import HomeNavBar from './cpns/home-nav-bar.vue'
	import HomeSearchBox from './cpns/home-search-box.vue'
	import HomeCategory from './cpns/home-category.vue'
	import HomeContent from './cpns/home-content.vue'
	import SearchBar from '@/components/search-bar/search-bar.vue'

	import useHomeStore from '@/stores/modules/home'
	import { getHomeHotSuggests, getHomeCategories, getHomeHouselist } from '@/service/index'
	import useScroll from '@/hooks/useScroll'

	const router = useRouter()

	// 发送网络请求
	const homeStore = useHomeStore()
	homeStore.fetchHotSuggestData()
	homeStore.fetchCategoriesData()
	homeStore.fetchHouselistData()

	// 监听滚动到底部
	const homeRef = ref()
	const { isReachBottom, scrollTop } = useScroll(homeRef)
	watch(isReachBottom, (newValue) => {
		if (newValue) {
			// 有js逻辑相关
			homeStore.fetchHouselistData().then(() => {
				isReachBottom.value = false
			})
		}
	})
	// isReachBottom 改用计算属性 不适合用于上面需要的js逻辑
	// const isReachBottom = computed(() => {
	//   const clientHeight = document.documentElement.clientHeight
	//   const scrollTop = document.documentElement.scrollTop
	//   const scrollHeight = document.documentElement.scrollHeight
	//   return clientHeight + scrollTop >= scrollHeight
	// })

	// 定义的可响应式数据, 依赖另外一个可响应式的数据, 那么可以使用计算函数(computed)

	// 搜索框显示的控制 watch
	// const isShowSearchBar = ref(false)
	// watch(scrollTop, (newTop) => {
	// 	isShowSearchBar.value = newTop > 100
	// })
	// 搜索框显示的控制 改用计算属性 标识符 变量等关系
	const isShowSearchBar = computed(() => scrollTop.value > 100)

	// 跳转回home页面时, 保留之前的滚动位置
	onActivated(() => {
		homeRef.value?.scrollTo({
			top: scrollTop.value,
			behavior: 'auto'
		})
	})

	// useScroll(() => {
	// 	homeStore.fetchHouselistData()
	// })

	// 监听window窗口的滚动
	// 1.当我们离开页面时, 我们移除监听
	// 2.如果别的页面也进行类似的监听, 会编写重复代码
	// const scrollListenerHandler = () => {
	// 	const clientHeight = document.documentElement.clientHeight
	// 	const scrollTop = document.documentElement.scrollTop
	// 	const scrollHeight = document.documentElement.scrollHeight
	// 	if (clientHeight + scrollTop >= scrollHeight) {
	// 		homeStore.fetchHouselistData()
	// 	}
	// }
	// onMounted(() => {
	// 	window.addEventListener('scroll', scrollListenerHandler)
	// })
	// onUnmounted(() => {
	// 	window.removeEventListener('scroll', scrollListenerHandler)
	// })

	// 热门建议
	// const hotSuggests = ref([])
	// getHomeHotSuggests()
	// 	.then((res) => {
	// 		hotSuggests.value = res.data
	// 	})
	// 	.catch((err) => {
	// 		console.log('[ getHomeHotSuggests err ] >', err)
	// 	})

	// 推荐类别
	// const categories = ref([])
	// getHomeCategories()
	// 	.then((res) => {
	// 		categories.value = res.data
	// 	})
	// 	.catch((err) => {
	// 		console.log('[ getHomeCategories err ] >', err)
	// 	})

	// 房源列表
	// const houselist = ref([])
	// const currentPage = ref(1)
	// getHomeHouselist(currentPage.value)
	// 	.then((res) => {
	// 		console.log('[ getHomeHouselist res ] >', res)
	// 		houselist.value.push(...res.data)
	// 		currentPage.value++
	// 	})
	// 	.catch((err) => {
	// 		console.log('[ getHomeHouselist err ] >', err)
	// 	})
</script>

<style lang="less" scoped>
	.home {
		height: 100vh;
		overflow-y: auto;
		box-sizing: border-box;
		padding-bottom: 60px;
	}
	.banner {
		img {
			display: block;
			width: 100%;
		}
	}
	.search-bar {
		position: fixed;
		z-index: 9;
		top: 0;
		left: 0;
		right: 0;
		height: 45px;
		padding: 16px 16px 10px;
		background-color: #fff;
	}
</style>
