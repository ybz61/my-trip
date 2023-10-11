<template>
	<div class="app">
		<!-- name属性 -->
		<!-- 推荐写法 -->
		<router-view v-slot="props">
			<keep-alive include="home">
				<component :is="props.Component"></component>
			</keep-alive>
		</router-view>

		<!-- <keep-alive include="home">
			<router-view />
		</keep-alive> -->

		<tab-bar v-show="!route.meta.hideTabBar" />

		<loading />
	</div>
</template>

<script setup>
	import TabBar from '@/components/tab-bar/tab-bar.vue'
	import Loading from '@/components/loading/loading.vue'
	import { useRoute } from 'vue-router'

	const route = useRoute()
</script>

<style lang="less" scoped></style>
