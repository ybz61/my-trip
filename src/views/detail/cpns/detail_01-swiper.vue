<template>
	<div class="detail_swiper">
		<van-swipe class="swiper_list" :autoplay="3000" indicator-color="white">
			<template v-for="(item, index) in swiperData" :key="index">
				<van-swipe-item class="item">
					<img :src="item.url" :alt="item.title" />
				</van-swipe-item>
			</template>

			<template #indicator="{ active, total }">
				<!-- <div class="indicator">{{ active }}/{{ swiperData.length }}-{{ total }}</div> -->

				<div class="indicator">
					<template v-for="(value, key, index) in swiperGroup" :key="key">
						<span
							class="item"
							:class="{ active: swiperData[active]?.enumPictureCategory == key }"
							@click="itemClick(value, key, index)"
						>
							<span class="text">{{ getName(value[0].title) }}</span>
							<span class="count" v-if="swiperData[active]?.enumPictureCategory == key">
								{{ getCategoryIndex(swiperData[active]) }}/{{ value.length }}
							</span>
						</span>
					</template>
				</div>
			</template>
		</van-swipe>
	</div>
</template>

<script setup>
	import { defineProps } from 'vue'

	const props = defineProps({
		swiperData: {
			type: Array,
			default: () => []
		}
	})

	// 对数据进行转换
	const swiperGroup = {}
	// {
	//   "2":[item1,item2,item3],
	//   "4":[itemx,itemy,itemz],
	//   "5":[itema,itemb,itemc],
	// }
	// 思路二：一次遍历
	for (const item of props.swiperData) {
		let valueArray = swiperGroup[item.enumPictureCategory]
		if (!valueArray) {
			valueArray = []
			swiperGroup[item.enumPictureCategory] = valueArray
		}
		valueArray.push(item)
	}
	// console.log('[ swiperGroup ] >', swiperGroup)

	// 思路一：好理解，两次遍历
	// for (const item of props.swiperData) {
	// 	swiperGroup[item.enenumPictureCategory] = swiperGroup[item.enenumPictureCategory] || []
	// }
	// for (const item of props.swiperData) {
	// 	swiperGroup[item.enenumPictureCategory].push(item)
	// }

	// 定义点击事件
	const itemClick = (value, key, index) => {
		// console.log('[ itemClick ] >', value, key, index)
	}

	// 定义转换数据的方法
	const nameReg = /【(.*?)】/i
	const getName = (name) => {
		// return name.replace('：', '').replace('【', '').replace('】', '')
		const results = nameReg.exec(name)
		return results[1]
	}
	const getCategoryIndex = (item) => {
		const valueArray = swiperGroup[item.enumPictureCategory]
		return valueArray.findIndex((data) => data === item) + 1
	}
</script>

<style lang="less" scoped>
	.detail_swiper {
		.swiper_list {
			.item {
				img {
					display: block;
					width: 100%;
				}
			}
			.indicator {
				position: absolute;
				right: 5px;
				bottom: 5px;
				display: flex;
				padding: 2px 5px;
				font-size: 12px;
				color: #fff;
				background: rgba(0, 0, 0, 0.8);
				.item {
					margin: 0 3px;
					&.active {
						padding: 0 3px;
						border-radius: 5px;
						background-color: #fff;
						color: #333;
					}
				}
			}
		}
	}
</style>
