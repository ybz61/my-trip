<template>
	<div class="user">
		<van-nav-bar title="我的" left-arrow left-text="民宿" fixed placeholder @click-left="onClickLeft" />
		<h2>user</h2>
		<p>{{ userInfo.name }}</p>
		<p>{{ userInfo.age }}</p>
		<img :src="userInfo.photo" :alt="userInfo.name" />
	</div>
</template>

<script setup>
	import { useRouter } from 'vue-router'
	import useMainStore from '@/stores/modules/main'
	import { storeToRefs } from 'pinia'
	const router = useRouter()
	const mainStore = useMainStore()
	const { token, userInfo } = storeToRefs(mainStore)

	// 监听返回按钮的点击
	const onClickLeft = () => {
		router.back()
		// router.go(-1)
	}
</script>

<style scoped lang="less">
	.user {
		color: red;
	}
  img {
    width:200px;
    height:200px;
  }
</style>
