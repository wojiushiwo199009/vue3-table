import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import basicTable from './pages/index'
// main.ts
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(basicTable)
app.use(router)

app.mount('#app')
