import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import "./app/style/globalStyles.scss"

const app = createApp(App)
app.config.globalProperties.window = window
app.use(createPinia()).use(router).mount('#app')
