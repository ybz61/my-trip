import 'normalize.css'
import './assets/css/index.css'

import { createApp } from 'vue'
import router from './router'
import pinia from './stores'

import App from './App.vue'

createApp(App).use(router).use(pinia).mount('#app')
// const app = createApp(App)
// app.use(router)
// app.use(pinia)
// app.mount('#app')
