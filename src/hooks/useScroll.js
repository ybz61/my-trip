import { onMounted, onUnmounted, ref } from 'vue'
import { throttle, debounce } from 'underscore'

// console.log('[ throttle ] >', throttle)
// console.log('[ debounce ] >', debounce)

// 方式二：返回值 变量控制
export default function useScroll(elRef) {
	let el = window

	const isReachBottom = ref(false)

	const clientHeight = ref(0)
	const scrollTop = ref(0)
	const scrollHeight = ref(0)

	// 防抖/节流
	const scrollListenerHandler = throttle(() => {
		if (el === window) {
			clientHeight.value = document.documentElement.clientHeight
			scrollTop.value = document.documentElement.scrollTop
			scrollHeight.value = document.documentElement.scrollHeight
		} else {
			clientHeight.value = el.clientHeight
			scrollTop.value = el.scrollTop
			scrollHeight.value = el.scrollHeight
		}

		if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
			console.log('滚动到底部了')
			isReachBottom.value = true
		}
	}, 100)

	onMounted(() => {
		if (elRef) el = elRef.value
		el.addEventListener('scroll', scrollListenerHandler)
	})

	onUnmounted(() => {
		el.removeEventListener('scroll', scrollListenerHandler)
	})

	return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}

// 方式一：回调函数
// export default function useScroll(reachBottomCB) {
// 	const scrollListenerHandler = () => {
// 		const clientHeight = document.documentElement.clientHeight
// 		const scrollTop = document.documentElement.scrollTop
// 		const scrollHeight = document.documentElement.scrollHeight
// 		console.log('-------')
// 		if (clientHeight + scrollTop >= scrollHeight) {
// 			console.log('滚动到底部了')
// 			if (reachBottomCB) reachBottomCB()
// 		}
// 	}

// 	onMounted(() => {
// 		window.addEventListener('scroll', scrollListenerHandler)
// 	})

// 	onUnmounted(() => {
// 		window.removeEventListener('scroll', scrollListenerHandler)
// 	})
// }
