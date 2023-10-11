<template>
	<div class="tab_control">
		<template v-for="(item, index) in titles" :key="item">
			<div class="tab_control_item" :class="{ active: index === currentIndex }" @click="itemClick(index)">
				<span>{{ item }}</span>
			</div>
		</template>
	</div>
</template>

<script>
	export default {
		props: {
			titles: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				currentIndex: 0
			}
		},
		emits: ['tabItemClick'],
		methods: {
			itemClick(index) {
				this.currentIndex = index
				this.$emit('tabItemClick', index)
			},
			setCurrentIndex(index) {
				this.currentIndex = index
			}
		}
	}
</script>

<style lang="less" scoped>
	.tab_control {
		display: flex;
		height: 44px;
		line-height: 44px;
		text-align: center;
		background-color: #fff;
		.tab_control_item {
			flex: 1;
			&.active {
				color: var(--primary-color);
				font-weight: 700;
				span {
					border-bottom: 3px solid var(--primary-color);
					padding: 8px;
				}
			}
		}
	}
</style>
