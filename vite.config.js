import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果是基于 vite 的项目，在 vite.config.js 文件中配置插件：
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Components({
			resolvers: [VantResolver()]
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {}
			}
		},
		// 关闭生成map文件 可以达到缩小打包体积
		sourcemap: false,
		// 关闭文件计算
		reportCompressedSize: false
	},
	// 配置静态资源路径
	base: './',
	// 配置代理
	// server: {
	//   proxy: {
	//     '/proxy': {
	//       target: 'http://codercba.com:1888/api', // 代理地址
	//       changeOrigin: true, // 是否跨域
	//       rewrite: (path) => path.replace(/^\/proxy/, '') // 将 /proxy 重写为空
	//     }
	//   }
	// }
})
