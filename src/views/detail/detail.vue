<template>
	<div class="detail" ref="detailRef">
		<tab-control v-if="showTabControl" class="tabs" :titles="names" @tabItemClick="tabClick" ref="tabControlRef" />
		<van-nav-bar title="房屋详情" left-arrow left-text="旅途" @click-left="onClickLeft" />
		<div class="detail_cont" v-if="mainPart" v-memo="[mainPart]">
			<detail-swiper :swiper-data="mainPart.topModule.housePicture.housePics" />
			<detail-info name="描述" :ref="getSectionRef" :top-info="mainPart.topModule" />
			<detail-facility
				name="设施"
				:ref="getSectionRef"
				:house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
			/>
			<detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule" />
			<detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule" />
			<detail-notice
				name="须知"
				:ref="getSectionRef"
				:order-rules="mainPart.dynamicModule.rulesModule.orderRules"
			/>
			<detail-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule" />
			<detail-intro :price-intro="mainPart.introductionModule" />
		</div>
		<div class="footer">
			<img src="@/assets/img/detail/icon_ensure.png" alt="" />
			<div class="text">弘源旅途, 永无止境!</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, watch } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { getDetailInfo } from '@/service'

	import TabControl from '@/components/tab-control/tab-control.vue'
	import DetailSwiper from './cpns/detail_01-swiper.vue'
	import DetailInfo from './cpns/detail_02-info.vue'
	import DetailFacility from './cpns/detail_03-facility.vue'
	import DetailLandlord from './cpns/detail_04-landload.vue'
	import DetailComment from './cpns/detail_05-comment.vue'
	import DetailNotice from './cpns/detail_06-notice.vue'
	import DetailMap from './cpns/detail_07-map.vue'
	import DetailIntro from './cpns/detail_08-intro.vue'

	import useScroll from '@/hooks/useScroll'

	const route = useRoute()
	const router = useRouter()
	const houseId = route.params.id

	// 请求房屋详情数据
	const detailInfo = ref({})
	const mainPart = computed(() => detailInfo.value.mainPart)
	// const currentHouse = computed(() => detailInfo.value.currentHouse)
	// const pricePart = computed(() => detailInfo.value.pricePart)
	getDetailInfo(houseId).then((res) => {
		console.log('[ getDetailInfo res ] >', res)
		detailInfo.value = res.data
	})

	// 监听返回按钮的点击
	const onClickLeft = () => {
		router.back()
		// router.go(-1)
	}

	// tabControl相关的操作
	const detailRef = ref()
	const { scrollTop } = useScroll(detailRef)
	const showTabControl = computed(() => {
		return scrollTop.value >= 300
	})

	// const landlordRef = ref()
	// const sectionEls = []
	// const getSectionRef = (value) => {
	//   sectionEls.push(value.$el)
	// }
	const sectionEls = ref({})
	const names = computed(() => {
		return Object.keys(sectionEls.value)
	})
	const getSectionRef = (value) => {
		if (!value) return
		const name = value.$el.getAttribute('name')
		sectionEls.value[name] = value.$el
	}

	let isClick = false
	let currentDistance = -1
	const tabClick = (index) => {
		const key = Object.keys(sectionEls.value)[index]
		const el = sectionEls.value[key]
		let distance = el.offsetTop
		if (index !== 0) {
			distance = distance - 44
		}

		isClick = true
		currentDistance = distance

		detailRef.value.scrollTo({
			top: distance,
			behavior: 'smooth'
		})
	}

	// 页面滚动, 滚动时匹配对应的tabControll的index
	const tabControlRef = ref()
	watch(scrollTop, (newValue) => {
		if (newValue === currentDistance) {
			isClick = false
		}
		if (isClick) return

		// 1.获取所有的区域的offsetTops
		const els = Object.values(sectionEls.value)
		const values = els.map((el) => el.offsetTop)

		// 2.根据newValue去匹配想要索引
		let index = values.length - 1
		for (let i = 0; i < values.length; i++) {
			if (values[i] > newValue + 44) {
				index = i - 1
				break
			}
		}
		// console.log(index)
		tabControlRef.value?.setCurrentIndex(index)
	})
</script>

<style lang="less" scoped>
	.detail {
		// position: relative;
		height: 100vh;
		overflow-y: auto;
		// .detail_cont {
		//   min-height: 100vh;
		// }
	}
	.tabs {
		position: fixed;
		z-index: 10;
		left: 0;
		right: 0;
		top: 0;
	}

	.footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 120px;

		img {
			width: 123px;
		}

		.text {
			margin-top: 12px;
			font-size: 12px;
			color: #7688a7;
		}
	}
</style>
