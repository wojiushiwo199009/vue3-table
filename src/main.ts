import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
// main.ts
// 如果您正在使用CDN引入，请删除下面一行。

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import { MyBasicTable } from 'npm-vue3-element-table'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(MyBasicTable)

app.mount('#app')
