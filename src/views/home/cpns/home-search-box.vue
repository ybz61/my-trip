<template>
	<div class="search-box">
		<!-- 位置信息 -->
		<div class="location bottom_gray_line">
			<div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
			<div class="position" @click="positionClick">
				<span class="text">我的位置</span>
				<img src="@/assets/img/home/icon_location.png" alt="img" />
			</div>
		</div>

		<!-- 日期范围 -->
		<div class="section date-range bottom_gray_line" @click="showCalendar = true">
			<div class="start">
				<div class="date">
					<span class="tip">入住</span>
					<span class="time">{{ startDateStr }}</span>
				</div>
				<div class="stay">共{{ stayCount }}晚</div>
			</div>
			<div class="end">
				<div class="date">
					<span class="tip">离店</span>
					<span class="time">{{ endDateStr }}</span>
				</div>
			</div>
		</div>
		<!-- 日历组件 -->
		<van-calendar
			v-model:show="showCalendar"
			color="#ff9854"
			type="range"
			:formatter="formatter"
			:show-confirm="false"
			@confirm="onConfirm"
		/>

		<!-- 价格/人数选择 -->
		<div class="section price-counter bottom_gray_line">
			<div class="start">价格不限</div>
			<div class="end">人数不限</div>
		</div>
		<!-- 关键字 -->
		<div class="section keyword bottom_gray_line">关键字/位置/民宿名</div>

		<!-- 热门建议 -->
		<div class="section hot-suggests">
			<template v-for="(item, index) in hotSuggests" :key="index">
				<div class="item" :style="{ color: item.tagText.color, background: item.tagText.background.color }">
					{{ item.tagText.text }}
				</div>
			</template>
		</div>

		<!-- 搜索按钮 -->
		<div class="section search-btn">
			<div class="btn" @click="searchBtnClick">开始搜索</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed } from 'vue'
	import { useRouter } from 'vue-router'
	import { storeToRefs } from 'pinia'
	import useCityStore from '@/stores/modules/city'
	import { formatMonthDay, getDiffDays } from '@/utils/format_date'
	import useHomeStore from '@/stores/modules/home'
	import useMainStore from '@/stores/modules/main'

	const router = useRouter()

	// 定义组件的props
	// const props = defineProps({
	// 	hotSuggests: {
	// 		type: Array,
	// 		default: () => []
	// 	}
	// })

	// 位置信息
	const cityClick = () => {
		router.push('city')
	}
	const positionClick = () => {
		// window系统不可以 mac系统可以
		navigator.geolocation.getCurrentPosition(
			(res) => {
				console.log('[ 获取位置成功 res ] >', res)
			},
			(err) => {
				console.log('[ 获取位置失败 err ] >', err)
			},
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			}
		)
	}
	const cityStore = useCityStore()
	const { currentCity } = storeToRefs(cityStore)

	// 日期范围
	const mainStore = useMainStore()
	let { startDate, endDate } = storeToRefs(mainStore)
	const startDateStr = computed(() => formatMonthDay(startDate.value))
	const endDateStr = computed(() => formatMonthDay(endDate.value))
	const stayCount = ref(getDiffDays(startDate.value, endDate.value))
	// 日历组件
	const showCalendar = ref(false)
	const formatter = (day) => {
		const month = day.date.getMonth() + 1
		const date = day.date.getDate()
		if (day.type === 'start') {
			day.bottomInfo = '入住'
		} else if (day.type === 'end') {
			day.bottomInfo = '离店'
		}
		// if (month === 5) {
		//   if (date === 1) {
		//     day.topInfo = '劳动节';
		//   } else if (date === 4) {
		//     day.topInfo = '青年节';
		//   } else if (date === 11) {
		//     day.text = '今天';
		//   }
		// }
		return day
	}
	const onConfirm = (val) => {
		// 1 设置日期
		// console.log('[ onConfirm val ] >', val)
		const selectStartDate = val[0]
		const selectEndDate = val[1]
		mainStore.startDate = selectStartDate
		mainStore.endDate = selectEndDate
		// 2 计算天数
		stayCount.value = getDiffDays(selectStartDate, selectEndDate)
		// 3 隐藏日历
		showCalendar.value = false
	}

	// 热门建议
	const homeStore = useHomeStore()
	const { hotSuggests } = storeToRefs(homeStore)

	// 开始搜索
	const searchBtnClick = () => {
		router.push({
			path: '/search',
			query: {
				startDate: startDate.value,
				endDate: endDate.value,
				currentCity: currentCity.value.cityName
			}
		})
	}
</script>

<style lang="less" scoped>
	// .search-box {
	// 	--van-calendar-popup-height: 100%;
	// }

	.location {
		display: flex;
		align-items: center;
		height: 44px;
		padding: 0 20px;

		.city {
			flex: 1;
			color: #333;
			font-size: 15px;
		}

		.position {
			width: 74px;
			display: flex;
			align-items: center;

			.text {
				position: relative;
				top: 2px;
				color: #666;
				font-size: 12px;
			}

			img {
				margin-left: 5px;
				width: 18px;
				height: 18px;
			}
		}
	}

	.section {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		padding: 0 20px;
		box-sizing: border-box;
		color: #999;
		height: 44px;

		.start {
			flex: 1;
			display: flex;
			height: 44px;
			align-items: center;
		}

		.end {
			min-width: 30%;
			padding-left: 20px;
		}

		.date {
			display: flex;
			flex-direction: column;

			.tip {
				font-size: 12px;
				color: #999;
			}

			.time {
				margin-top: 3px;
				color: #333;
				font-size: 15px;
				font-weight: 500;
			}
		}
	}

	.date-range {
		height: 44px;
		.stay {
			flex: 1;
			text-align: center;
			font-size: 12px;
			color: #666;
		}
	}

	.price-counter {
		.start {
			border-right: 1px solid var(--line-color);
		}
	}

	.hot-suggests {
		margin: 10px 0;
		height: auto;

		.item {
			padding: 4px 8px;
			margin: 4px;
			border-radius: 14px;
			font-size: 12px;
			line-height: 1;
		}
	}

	.search-btn {
		width: 100%;
		.btn {
			// width: 342px;
			width: 100%;
			height: 38px;
			max-height: 50px;
			font-weight: 500;
			font-size: 18px;
			line-height: 38px;
			text-align: center;
			border-radius: 20px;
			color: #fff;
			background-image: var(--theme-linear-gradient);
		}
	}
</style>
