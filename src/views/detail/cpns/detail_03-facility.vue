<template>
	<div class="facility">
		<detail-section title="房屋设施" more-text="查看全部设施">
			<div class="facility_inner">
				<template v-for="(item, index) in houseFacility.houseFacilitys" :key="index">
					<div class="item" v-if="houseFacility.facilitySort?.includes(index)">
						<div class="head">
							<img :src="item.icon" :alt="item.name" />
							<div class="text">{{ item.groupName }}</div>
						</div>
						<div class="list">
							<template v-for="(iten, indey) in item.facilitys.slice(0, 4)" :key="indey">
								<div class="iten">
									<!-- <van-icon name="passed" color="#3dc9b5" class="icon" /> -->
									<i class="icon_check icon"></i>
									<span>{{ iten.name }}</span>
								</div>
							</template>
						</div>
					</div>
				</template>
			</div>
		</detail-section>
	</div>
</template>

<script setup>
	import { defineProps } from 'vue'

	import DetailSection from './detail-section.vue'

	const props = defineProps({
		houseFacility: {
			type: Object,
			default: () => ({})
		}
	})
</script>

<style lang="less" scoped>
	.facility_inner {
		padding: 5px 0;
		border-radius: 6px;
		font-size: 12px;
		background-color: #f7f9fb;

		.item {
			display: flex;
			margin: 25px 0;

			.head {
				width: 90px;
				text-align: center;

				img {
					width: 20px;
					height: 20px;
				}

				.text {
					margin-top: 5px;
					color: #000;
				}
			}

			.list {
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				align-items: center;

				.iten {
					display: flex;
					align-items: center;
					box-sizing: border-box;
					width: 50%;
					margin: 4px 0;

					.icon {
						margin: 0 6px;
					}

					.text {
						color: #333;
					}
				}
			}
		}
	}
</style>
