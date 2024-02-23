<template>
	<div class="home-nav-bar">
		<div class="left"></div>
		<div class="title">北海民宿</div>
		<div class="right"></div>
	</div>
</template>

<script setup></script>

<style lang="less" scoped>
	.home-nav-bar {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 46px;
		border-bottom: 1px solid #f2f2f2;
		.title {
			color: var(--primary-color);
			font-size: 16px;
			font-weight: bold;
		}
	}
</style>
