<template>
	<div class="message">
		<van-nav-bar title="消息" fixed placeholder />
		<div class="content">
			<van-notice-bar left-icon="volume-o" text="暂无更多消息" />
			<img src="@/assets/img/message/icon_message.png" alt="" srcset="" />
		</div>
	</div>
</template>

<script setup></script>

<style lang="less" scoped>
	.content {
		img {
			width: 100%;
			height: 100%;
		}
		h2 {
			text-align: center;
		}
	}
</style>
