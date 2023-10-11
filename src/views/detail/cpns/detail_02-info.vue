<template>
	<div class="detail_info">
		<div class="name"></div>
		<div class="tags">
			<template v-for="(item, index) in topInfo.houseTags" :key="index">
				<span
					class="item"
					v-if="item.tagText"
					:style="{ color: item.tagText.color, background: item.tagText.background.color }"
				>
					{{ item.tagText.text }}
				</span>
			</template>
		</div>
		<div class="comment extra">
			<div class="left">
				<span class="score">{{ topInfo.commentBrief.overall }}</span>
				<span class="title">{{ topInfo.commentBrief.scoreTitle }}</span>
				<span class="brief">{{ topInfo.commentBrief.commentBrief }}</span>
			</div>
			<div class="right">
				<span class="count">
					{{ topInfo.commentBrief.totalCount }}条评论
					<van-icon name="arrow" />
				</span>
			</div>
		</div>
		<div class="position extra">
			<div class="left address">
				{{ topInfo.nearByPosition.address }}
			</div>
			<div class="right">
				地图·周边
				<van-icon name="arrow" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { defineProps } from 'vue'

	const props = defineProps({
		topInfo: {
			type: Object,
			default: () => ({})
		}
	})
</script>

<style lang="less" scoped>
	.detail_info {
		padding: 16px;
		background-color: #fff;

		.name {
			font-weight: 700;
			font-size: 20px;
			color: #333;
			text-align: justify;
			line-height: 24px;
			overflow: hidden;
			margin-bottom: 6px;
		}

		.tags {
			margin: 10px 0;

			.item {
				font-size: 12px;
				margin: 0 2px;
				padding: 1px 3px;
			}
		}

		.extra {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 8px 12px;
			margin: 12px 0;
			border-radius: 5px;
			font-size: 12px;
			background-color: #f5f7fa;

			.right {
				color: #ff9645;
			}
		}

		.comment {
			.score {
				font-size: 18px;
				font-weight: 700;
				color: #333;
			}

			.title {
				color: #333;
				font-weight: 700;
				margin: 0 3px;
			}

			.brief {
				color: #666;
			}
		}

		.position {
			.address {
				font-size: 14px;
				font-weight: 700;
				color: #333;
				width: 78%;
			}
		}
	}
</style>
