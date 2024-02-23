<template>
	<div class="favor_item">
		<div class="top_img">
			<img :src="itemData.defaultPicture" />
			<div class="info">
				<span>{{ itemData.commentBrief.overall }}分 / {{ itemData.commentBrief.scoreTitle }}</span>
			</div>
		</div>

		<div class="bottom_info">
			<div class="title">
				<div class="info">
					<span>{{ itemData.unitInfor }}</span>
					<span>{{ itemData.unitSummeries[0]?.text }}-{{ itemData.unitSummeries[1]?.text }}</span>
				</div>
				<div class="title_h2">
					{{ itemData.unitName }}
				</div>
			</div>
			<div class="price_info">
				<div class="info_hint">
					<span v-for="(iten, indey) in itemData.houseTags" :key="indey">{{ iten.text }}</span>
				</div>
				<div class="info_price">
					<span>￥{{ itemData.finalPrice }}</span>
					<span>￥{{ itemData.productPrice }}</span>
					<div class="notice" v-if="itemData.priceTipBadge?.text">
						{{ itemData.priceTipBadge?.text }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		itemData: {
			type: Object,
			default: () => {}
		}
	})
</script>

<style scoped lang="less">
	.favor_item {
		border-radius: 10px;
		padding: 10px;
		border-bottom: 1px solid #d6d6d8;
		margin: 10px;
		.top_img {
			display: flex;
			flex-direction: column;
			align-items: center;
			img {
				width: 320px;
				height: 20vh;
				border-radius: 2vh;
			}
			.info {
				width: 80px;
				padding: 5px;
				font-size: 14px;
				text-align: center;
				border-radius: 10px;
				color: #000;
				margin-top: 10px;
				margin-bottom: 10px;
				align-items: flex-start;
				font-weight: bold;
				background: #e8e8e8;
			}
		}

		.bottom_info {
			margin-top: 16px;
			.title {
				display: flex;
				flex-direction: column;
				.info {
					margin: 5px 0;
					span:nth-child(1) {
						font-size: 12px;
						color: #fff;
						background: #3f4954;
						padding: 2px 12px;
						margin-right: 20px;
						border-radius: 2px;
						font-weight: bold;
					}

					span:nth-child(2) {
						opacity: 0.6;
						font-size: 10px;
						font-weight: bold;
					}
				}

				.title_h2 {
					font-weight: bold;
					margin-top: 10px;
					font-size: 16px;
					margin-bottom: 10px;
				}
			}
			.price_info {
				margin-top: 10px;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				.info_hint {
					margin-bottom: 10px;
					span {
						border-radius: 2px;
						color: #fc756d;
						padding: 2px 6px;
						background: #f9e9eb;
						margin-right: 6px;
						font-size: 12px;
						font-weight: bold;
					}
				}
				.info_price {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					span:nth-child(1) {
						font-size: 24px;
						font-weight: bold;
						color: #fe9b4e;
						margin-right: 10px;
					}
					span:nth-child(2) {
						font-size: 16px;
						color: #6a5a5a;
						text-decoration: line-through;
						margin-left: 10px;
					}
					.notice {
						color: #fff;
						margin-left: 10px;
						font-size: 12px;
						display: flex;
						padding: 2px 6px;
						align-items: center;
						background: #fe9b4e;
						border-radius: 10px;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
